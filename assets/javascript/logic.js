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
var frequency = 0;
var nextArrival = "" //this will be a set time;
var minutesAway = 0; //this is based on frequency and next arrival time

//Function to push values to firebase database
$(".btn").on("click", function (event) {
    trainName = $("#trainName").val().trim();
    trainDestination = $("#destination").val().trim();
    frequency = $("#trainTime").val().trim();

    // Grabbed values from text boxes
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        frequency: frequency,

    })

});

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().frequency);


});