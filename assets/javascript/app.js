$(document).ready(function(){
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAIRz279AJ1DrAOxOBpPOYuRvmIYQpN14Y",
    authDomain: "trainschedular-c65ae.firebaseapp.com",
    databaseURL: "https://trainschedular-c65ae.firebaseio.com",
    projectId: "trainschedular-c65ae",
    storageBucket: "",
    messagingSenderId: "446648931168",
    appId: "1:446648931168:web:0ce1098191e00de0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //create database
  var database = firebase.database();
//variables for train info
var trainName = "";
var destination = "";
var frequency = "";
var startTime = "";

$("#addTrain").on("click", function(event){
    event.preventDefault();

    //Capture the values inserted within the input lines

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    startTime = $("#first-input").val().trim();
    
//give them a temporary storing place
    var newTrain = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        startTime: startTime,
      };

      database.ref().push(newTrain);

        // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.startTime);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#first-input").val("");

});
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var newTrain = childSnapshot.val().trainName;
    var newDestination = childSnapshot.val().destination;
    var newFrequency = childSnapshot.val().frequency;
    var newFirst = childSnapshot.val().startTime;
  
    // Employee Info
    console.log(newTrain);
    console.log(newDestination);
    console.log(newFrequency);
    console.log(newFirst);

    // Assumptions
    var tFrequency = newFrequency;

    // Time is 3:30 AM
    var firstTime = newFirst;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("LT");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("LT"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(newTrain),
      $("<td>").text(newDestination),
      $("<td>").text(newFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });

});
