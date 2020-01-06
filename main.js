$(function () {
    var stepperObj = $("#container").stepper({
        stepperbgcolor: 'bgcolor',
        steppercompletioncolor: 'completioncolor',
        stepperprocesscolor:'processcolor',
        //if new form is created the step has to be added.
        steps: ['First', 'Second', 'Third','Fourth'],
        stepButtonContent: ["o", "#", "$", "*"],
        pagebuttons:['Prev Page','Next Page'],
        startingindex:1,
        formSelectorClass: "form",
        disabledClass:"",
        currentClass:"",
        visitedClass:"",
        notvisitedClass:""
    });
   
     $("input").click(function()
     {
        $index=$(this).parents(".form").index();
   
        stepperObj.goToNext($index-1);
     })
     stepperObj.thisObj;
});