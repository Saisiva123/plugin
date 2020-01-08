(function($) {
  $.fn.stepper = function(options) {
    var container = $(this);
    var pluginName = "stepperjs";
    var settings = $.extend(
      {
        steps: ["first", "second", "third", "fourth"],
        stepButtonContent: ["o", "#", "$", "*"],
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
        startingIndex: 0,
        formSelectorClass: ".form",
        disabledClass: "",
        currentClass: "",
        visitedClass: "",
        notvisitedClass: "",
        active: ""
      },
      options
    );

    $count = settings.steps.length;
    var states = {
      disabled: { class: "disabled" + " " + settings.disabled },
      current: { class: "current" + " " + settings.currentClass },
      visited: { class: "visited" + " " + settings.visitedClass },
      notvisited: { class: "notvisited" + " " + settings.notvisitedClass },
      active: { class: "active" + " " + settings.active }
    };
    var stepList = [];
    var stepJQObjList;
    var navigationBtns = [];
    var stepperlength = parseInt(container.css("width")) / $count - 6 * $count;
    var formJQObj = $(".slide");

    $stepperMain = createStepsContainer();
    for (i = 0; i < $count; i++) {
      stepList.push(createSteps(i));
    }
    $stepperMain.append(stepList);
    container.prepend($stepperMain);

    stepJQObjList = $(".step");
    //TODO: Do this through CSS not JS code
    stepJQObjList.addClass("stepperListWidth");
    $(".stepperListWidth").css("--width", stepperlength + "px");

    navigationBtns.push(
      $("<button/>")
        .text(settings.navigation.previous.text)
        .addClass("navigation previous" + settings.navigation.previous.class)
        .attr("data-" + pluginName, true)
        .on("click", goToPrevious),
      $("<button/>")
        .text(settings.navigation.next.text)
        .addClass("navigation next" + settings.navigation.next.class)
        .attr("data-" + pluginName, true)
        .on("click", goToNext)
    );
    container.append(navigationBtns);

    stepJQObjList.click(onStepClick);

    goTo(settings.startingIndex);

    function onStepClick() {
      var thisObj = $(this);
      if (thisObj.hasClass("notvisited") || thisObj.hasClass("disabled")) {
        console.log("hey");
        //TODO: trigger custom event here "clickedOnNotVisited"
        NotAccessibleForm();
      } else {
        var idx = thisObj.attr("data-stepper-index");
        console.log("hiii");
        console.log(idx);
        setAsActive(stepJQObjList.filter("[data-stepper-index = " + idx + "]"));
        showForm(idx);
      }
    }
    function NotAccessibleForm() {
      throw "Requested form cant be accessed";
    }

    function getForm(idx) {
      var form = $(".form[data-stepper-index=" + idx + "]");
      console.log(form);
      if (form.length) {
        return form;
      } else {
        return formJQObj.eq(idx);
      }
    }
    function createStepsContainer() {
      return $("<ul/>")
        .addClass("stepperBody")
        .attr("data-" + pluginName, true);
    }
    function createSteps(i) {
      return $("<li/>")
        .addClass("step " + states.notvisited.class)
        .text(settings.steps[i])
        .attr("content", settings.stepButtonContent[i])
        .attr("data-stepper-index", i);
    }

    function showForm(idx) {
      if (idx < $count) {
        formJQObj.hide();
        getForm(idx).fadeIn("slow");
      } else {
        console.log("hello");
        setAsActive(stepJQObjList.last());
      }
    }

    //TOD: Add new GoTo function

    function goToNext() {
      var idx = stepJQObjList.filter(".active").attr("data-stepper-index");
      idx=Number(idx);
      if (idx < $count) {
        var x=getIndex(1);
        if(stepJQObjList.filter("[data-stepper-index = " + (idx+1) + "]").hasClass("notvisited"))
       {
        NotAccessibleForm();
       }
       else{
        setAsActive(stepJQObjList.filter("[data-stepper-index = " + x + "]"));
        showForm(x);
       }
      }
    }

    function goToPrevious() {
      var idx = stepJQObjList.filter(".active").prevAll().length;
      console.log(idx);
      if (idx > 0) {
        var x=getIndex(-1);
        setAsActive(stepJQObjList.filter("[data-stepper-index = " + x + "]"));
      showForm(x);
      }
    }

    function goTo(dir) {
      dir = Number(dir);
      var idx = stepJQObjList.filter(".active").attr("data-stepper-index");
      idx = Number(idx || 0);
      idx = idx + 1 * dir;
       setAsVisited(
         stepJQObjList.filter("[data-stepper-index = " + (idx - 1) + "]")
       );
      setAsCurrent(stepJQObjList.filter("[data-stepper-index = " + idx + "]"));
      showForm(idx);
    
    }
    function getIndex(dir)
    {
      dir = Number(dir);
      var idx = stepJQObjList.filter(".active").attr("data-stepper-index");
      idx = Number(idx || 0);
      idx = idx + 1 * dir;
      return idx;
    }

    function setAsActive(ele) {
      stepJQObjList.removeClass(states.active.class);
      ele
        .addClass(states.active.class)
        .removeClass(states.notvisited.class + " " + states.disabled.class);
  
    }
    function setAsCurrent(ele) {
      stepJQObjList.removeClass(states.current.class+" "+states.active.class);
      ele
        .addClass(states.current.class+" "+states.active.class)
        .removeClass(states.notvisited.class + " " + states.disabled.class);
    }
    function setAsVisited(ele) {
      ele
        .addClass(states.visited.class)
        .removeClass(
          states.notvisited.class +
            " " +
            states.disabled.class +
            " " +
            states.current.class
        );
    }
    function setAsnotvisited(ele) {
      ele
        .addClass(states.notvisited.class)
        .removeClass(
          states.current.class +
            " " +
            states.visited.class +
            " " +
            states.active.class
        );
    }
    function setAsDisabled(ele) {
      ele
        .addClass(states.disabled.class)
        .removeClass(
          states.current.class +
            " " +
            states.visited.class +
            " " +
            states.active.class
        );
    }

    var retObj = {
      thisObj: $(this),
      goTo: goTo,
      goToNext: goToNext
    };

    return retObj;
  };
})(jQuery);

// u-d
// disabled
// u-c
// current
// u-n
// notvisited
// u-v
// visited
