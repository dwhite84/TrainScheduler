var config = {
    apiKey: "AIzaSyDhw6aBNGEbQ0aYcWtbktnkycih3TjaISY",
    authDomain: "trainschedule-4cf75.firebaseapp.com",
    databaseURL: "https://trainschedule-4cf75.firebaseio.com",
    projectId: "trainschedule-4cf75",
    storageBucket: "",
    messagingSenderId: "139824687068"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var Destination = "";
  var Frequency = "";
  var firsttrainTime = "";
  var minutesAway = "";
  

  $("#submit").on("click", function(event){
      event.preventDefault();

  name = $("#trainName").val().trim();
  Destination = $("#destination").val().trim();
  Frequency = $("#frequency").val().trim();
  firsttrainTime = $("#arrival").val().trim();
  
  console.log(name);
  console.log(Destination);
  console.log(Frequency);
  console.log(firsttrainTime);

  database.ref().push({
      name: name,
      Destination: Destination,
      Frequency: Frequency,
      firsttrainTime: firsttrainTime
  });
  
  $("#trainName").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#arrival").val("");

});

database.ref().on("child_added",function(snapshot){

    var tFrequency = "";

    var firstTime = "00:05";

    var firstTimeConverted = moment(firsttrainTime, "HH:mm").subtract(1, "years");

    var currentTime = moment()

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency

    var tMinutesTillTrain = tFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var nextArrival = moment.unix(nextTrain).format("HH:mm");

    console.log(snapshot.val());

    var tableRow = $("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().Destination + "</td><td>" + snapshot.val().Frequency + "</td><td>" + snapshot.val().firsttrainTime + "</td><td>" + snapshot.val().tMinutesTillTrain + "</td><td>" + nextTrain +  "</td></tr>" );
    $("#traininfo").append(tableRow);

},function(errorObject){
    console.log("Errors handled:" + errorObject);

});

