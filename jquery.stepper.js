(function($) {
  $.fn.stepper = function(options) {
    var container = $(this).addClass("ContainerBody");
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
        formClassName:".slide",
        orientation:{vertical:true},
        startingIndex: 0,
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
      disabled: { class: "disabled " + settings.disabled },
      current: { class: "current " + settings.currentClass },
      visited: { class: "visited " + settings.visitedClass },
      notvisited: { class: "notvisited " + settings.notvisitedClass },
      active: { class: "active " + settings.active }
    };
    var stepList = [];
    var stepJQObjList;
    var navigationBtns = [];
    var formJQObj=container.find(settings.formClassName).addClass("form");

    $stepperMain = createStepsContainer();
    for (i = 0; i < $count; i++) {
      stepList.push(createSteps(i));
    }
    $stepperMain.append(stepList);
    container.prepend($stepperMain);
    stepJQObjList = $(".step");

    if (settings.orientation.vertical) {
      $stepperMain.addClass("vertical");
    }
    else
    {
      $stepperMain.addClass("horizontal");
    }

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

    goTo(settings.startingIndex, true,true);

    var retObj = {
      thisObj: $(this),
      goTo: goTo,
      goToNext: goToNext
    };
    
    function createStepsContainer() {
      return $("<ul/>")
        .addClass("stepperBody")
        .attr("data-" + pluginName, true);
    }
    //recurcive
    function createSteps(i) {
      return $("<li/>")
        .addClass("step " + states.notvisited.class)
        .text(settings.steps[i])
        .attr("content", settings.stepButtonContent[i])
        .attr("data-stepper-index", i);
    }
    function onStepClick() {
      var thisObj = $(this);
      if (thisObj.hasClass("notvisited") || thisObj.hasClass("disabled")) {
        NotAccessibleForm();
      } else {
        var idx = thisObj.attr("data-stepper-index");
        setAsActive(stepJQObjList.filter("[data-stepper-index = " + idx + "]"));
        showForm(idx);
      }
    }
    function NotAccessibleForm() {
      throw "Requested form cant be accessed";
    }
    function getForm(idx) {
      console.log(idx);
      var form = $(".slide[data-stepper-index=" + idx + "]");
      if (form.length) {
        return form;
      } else {
        return formJQObj.eq(idx);
      }
    }
    function showForm(idx) {
      formJQObj.hide();
      getForm(idx).fadeIn("slow");
    }
    function goToNext() {
      var x = goTo(1, true);
    }
    function goToPrevious() {
      goTo(-1, false);
    }
    function goTo(dir, toSetAsCurrent,finVisited) {
      dir = Number(dir);
      var idx = stepJQObjList.filter(".active").attr("data-stepper-index");
      idx = Number(idx || 0);
      idx = idx + 1 * dir;
      console.log(idx);
    if(finVisited)
    {
      finVisited=stepJQObjList.filter("[data-stepper-index = " + idx + "]").hasClass(states.visited.class);
    }
      console.log(finVisited);
      findNotVisited = stepJQObjList.filter("[data-stepper-index = " + idx + "]").hasClass(states.notvisited.class);
      if (idx >= 0 && idx < $count) {
        if (toSetAsCurrent || findNotVisited) {
        if(finVisited)
        {
          setAsVisited(
            stepJQObjList.filter("[data-stepper-index = " + (idx - 1) + "]")
          );
          setAsCurrent(
            stepJQObjList.filter("[data-stepper-index = " + idx + "]")
          );
          showForm(idx);
        }
        } else {
           setAsActive(stepJQObjList.filter("[data-stepper-index = " + idx + "]")
           );
          showForm(idx);
        }
      } else {
        if (toSetAsCurrent) {
          stepJQObjList
            .filter("[data-stepper-index = " + (idx - 1) + "]")
            .removeClass(states.current.class);
        }
      }
    }
    //states of slides
    function setAsActive(ele) {
      stepJQObjList.removeClass(states.active.class);
      ele
        .addClass(states.active.class)
        .removeClass(states.notvisited.class + " " + states.disabled.class);
    }
    function setAsCurrent(ele) {
      stepJQObjList.removeClass(
        states.active.class + " " + states.current.class
      );
      setAsVisited(ele);
      ele
        .addClass(states.current.class + " " + states.active.class)
        .removeClass(states.notvisited.class + " " + states.disabled.class);
    }
    function setAsVisited(ele) {
      ele
        .addClass(states.visited.class)
        .removeClass(states.notvisited.class + " " + states.disabled.class);
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
