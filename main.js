$(function () {
    $("#container").stepper({
        stepperbgcolor: 'bgcolor',
        steppercompletioncolor: 'completioncolor',
        stepperprocesscolor:'processcolor',
        //if new form is created the step has to be added.
        steps: ['first', 'second', 'third','fourth'],
        stepButtonContent: ["o", "#", "$", "*"],
        pagebuttons:['Prev Page','Next Page'],
        startingindex:'1'
    });
});