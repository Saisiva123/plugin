$(function() {
  var stepperObj = $("#container").stepper({
    //if new form is created the step has to be added.
    steps: ["step 1", "step 2", "step 3", "step 4"],
    stepButtonContent: ["1", "#", "$", "%"],
    navigation: {
      previous: {
        text: "Prev Page",
        class: ""
      },
      next: {
        text: "Next Page",
        class: ""
      }
    },
    formClassName:".slide",
    orientation:{vertical:false},
    startingIndex: 0,
    disabledClass: "",
    currentClass: "",
    visitedClass: "",
    notvisitedClass: "",
    active: ""
  });

  $("input[type=submit").click(function() {
    stepperObj.goTo(1, true);
  });
  //  stepperObj.goTo(2);
  //  stepperObj.thisObj;
});
