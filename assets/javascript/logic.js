// Initialize Firebase
var config = {
    apiKey: "AIzaSyA2NB5KOF3u9YoB2itEcCgUhjpEwzvW0wI",
    authDomain: "train-time-5afb2.firebaseapp.com",
    databaseURL: "https://train-time-5afb2.firebaseio.com",
    projectId: "train-time-5afb2",
    storageBucket: "train-time-5afb2.appspot.com",
    messagingSenderId: "858110863378"
};

firebase.initializeApp(config);

var database = firebase.database();

//Initial Values;

var trainName = "";
var trainDestination = "";
var departureTime = "";
var departureConverted = "";
var currentTime = "";
var frequency = "";
var nextArrival = "";
var remainder = "";
var minutesAway = ""; //this is based on frequency and next arrival time

//Function to push values to firebase database on click of submit button
$(".train-btn").on("click", function (event) {

    //Takes values from form and places them in variables
    trainName = $("#trainName").val().trim();
    trainDestination = $("#destination").val().trim();
    departureTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    // Setting current time
    currentTime = moment();

    // Converting departureTime into a time value
    departureConverted = moment(departureTime, "HH:mm");

    // Getting nextArrival time
    nextArrival = moment(departureConverted).add(minutesAway, "minutes").format("HH:mm");

    // Getting minutesAway value
    minutesAway = (moment(departureConverted)).diff(moment(), "minutes");

    // Pushes values from variables to firebase
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        departureTime: departureTime,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway
    })

});

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// Firebase watcher + initial loader
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().departureTime);
    console.log(childSnapshot.val().frequency);

    // full list of items to the well
    $(".all-trains").append("<tr><td class='train-name'> " + childSnapshot.val().trainName +
        " </td><td class='train-destination'> " + childSnapshot.val().trainDestination +
        " </td><td class='train-departure'> " + childSnapshot.val().departureTime +
        " </td><td class='train-frequency'> " + childSnapshot.val().frequency +
        " </td><td class='train-next-arrival'> " + childSnapshot.val().nextArrival +
        " </td><td class='train-minutes-away'> " + childSnapshot.val().minutesAway +
        " </td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});



