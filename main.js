$(function () {
    var stepperObj = $("#container").stepper({
        //if new form is created the step has to be added.
        steps: ['Step1', 'Step2', 'Step3','Step4','Step5'],
        stepButtonContent: ["o", "#", "$","#", "$"],
        pagebuttons:['Prev Page','Next Page'],
        startingindex:0,
        formSelectorClass: "form",
        disabledClass:"",
        currentClass:"",
        visitedClass:"",
        notvisitedClass:""
    });
   
     $("input[type=submit").click(function()
     {
        stepperObj.goTo(1);
     })
    //stepperObj.goTo(2);
    //  stepperObj.thisObj;
});