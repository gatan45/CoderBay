// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
    apiKey: "AIzaSyCqC0lyfPS3JcbaIV9eqMizeroB0_rjTwQ",
    authDomain: "auctionthing-bd676.firebaseapp.com",
    databaseURL: "https://auctionthing-bd676.firebaseio.com",
    projectId: "auctionthing-bd676",
    storageBucket: "",
    messagingSenderId: "900757205555"
  };
  firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highestBidder").exists() && snapshot.child("highestPrice").exists()) {

    // Set the local variables for highBidder equal to the stored values in firebase.
    highPrice = snapshot.val().highestPrice;
    highBidder = snapshot.val().highestBidder;

    // change the HTML to reflect the newly updated local values (most recent information from firebase)
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);

    // Print the local data to the console.


  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {
    // Change the HTML to reflect the local value in firebase
    $("#highest-bidder").text(initialBidder);
    $("#highest-price").text(initialBid);

    // Print the local data to the console.


  }


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var biddersName = $("#bidder-name").val().trim();
  var bidderPrice = $("#bidder-price").val().trim();

  // Log the Bidder and Price (Even if not the highest)
  console.log(typeof(biddersName));
  console.log(typeof(bidderPrice));
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({highestBidder: biddersName, highestPrice: bidderPrice});

    // Log the new High Price


    // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)


    // Change the HTML to reflect the new high price and bidder
    $("#bidder-name").text(biddersName);
    $("#bidder-price").text(bidderPrice);
  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
