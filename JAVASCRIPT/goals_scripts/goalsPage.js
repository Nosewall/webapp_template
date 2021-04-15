
function getGoals() {
  var goalsDiv = document.getElementById("goalsDiv"); // Get the goals div to append goals onto.
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid)
      .collection("goals") // grabs goals from database
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          // grabs Goal title
          var t = doc.data().Name;
          // grabs the id of the goal
          var id = doc.id;
          var goalButton = document.createElement("button");
          goalButton.innerHTML = t;
          goalsDiv.appendChild(goalButton);

        })
      })
  })
}

function addStep() {
  var stepDiv = document.getElementById("stepsDiv");
  var textBox = document.createElement("input");
  textBox.type = "text";
  textBox.className = "stepBox";
  stepDiv.appendChild(textBox);

}

function newGoal() {
  window.location.replace("new_goal.html");
}

function submitGoal() {

  //Add goal name to firebase
  firebase.auth().onAuthStateChanged(function (user) {
    //Get the goal name
    var goalName = document.getElementById("goalName").value;
    // Writes data to DB
    if (user) {
      var newGoal = db.collection("users")
        .doc(user.uid).collection("goals");

      newGoal.add({
        Name: goalName,

      }).then(function (newGoal) {
        console.log("Goal added to firebase by name");
        var stepsDiv = document.getElementById("stepsDiv");
        var stepCount = document.getElementById("stepsDiv").childElementCount;
        var allSteps = stepsDiv.childNodes;
        var index = 0;
        console.log("Stepcount - " + stepCount);
        console.log(index < stepCount);
        while (index < stepCount) {
          console.log("In the while loop");
          var stepToAdd = allSteps[index].value;
          index++;
          console.log("Trying to add " + stepToAdd);
          console.log(typeof (stepToAdd));
          if (user) {
            var newSteps = newGoal.collection("steps");

            newSteps.add({
              step: stepToAdd,

            }).then(function () {
              console.log("Step added to firebase");

            });

          } else {
            // no user
          }
        }
      }
      )
    }
  })
}
function submitSteps(documentId) {
  //Add steps to firebase
  firebase.auth().onAuthStateChanged(function (user) {

    var stepsDiv = document.getElementById("stepsDiv");
    var stepCount = document.getElementById("stepsDiv").childElementCount;
    var allSteps = stepsDiv.childNodes;
    var index = 0;
    console.log("Stepcount - " + stepCount);
    console.log(index < stepCount);
    while (index < stepCount) {
      console.log("In the while loop");
      console.log(allSteps[index]);
      console.log(allSteps[index].value);
      console.log(typeof (allSteps[index]));
      console.log(typeof (allSteps[index].value));
      var stepToAdd = allSteps[index].value;
      index++;
      if (user) {
        var newSteps = db.collection("users")
          .doc(user.uid).collection("goals")
          .doc("steps");

        newSteps.add({
          step: stepToAdd,

        }).then(function () {
          console.log("Step added to firebase");
        });

      } else {
        // no user
      }
    }
  })
}

function getGoalInfo() {

}

function cancelGoal() {
  window.location.replace("goals.html");
}