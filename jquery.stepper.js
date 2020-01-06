(function ($) {
  $.fn.stepper = function (options) {
    var pluginName = "stepperjs";
    var container = $(this);
    var settings = $.extend(
      {
        steps: ['first', 'second', 'third', 'fourth'],
        stepButtonContent: ["o", "#", "$", "*"],
        pageButtons: ['Prev Page', 'Next Page'],
        startingIndex: 1,
        formSelectorClass: ".form",
        disabledClass: "",
        currentClass: "",
        visitedClass: "",
        notvisitedClass: ""
      },
      options
    );

    $count = settings.steps.length;
    $stepperMain = createStepperBody();
    container.prepend($stepperMain);
    initialstep = settings.startingIndex - 1;
    var stateClasses={
      current: "current " + settings.currentClass,
    };
    var stepperList = [];
    var stepperListJQObj;

    for (i = 0; i < $count; i++) {
      stepperList.push(createStepperList(i));
    }
    $stepperMain.append(stepperList);
    stepperListJQObj = $(".stepperList");
    
    for (i = 0; i < settings.pagebuttons.length; i++) {
      //correct this
      //container.append(createButtonBody(i));
    }

    $(".pageButtons").eq(0).click(function () {
      clickpageButton(-1);
    });
    $(".pageButtons").eq(1).click(function () {
      clickpageButton(0);
    });
    stepperListJQObj.click(function () {
      $num = $(this).index();

      if ($(this).hasClass("notvisited")) {
      }else{
        setAsCurrent($(this));

        //correct this ...
        // $(".form").hide();
        // $(".form").eq($num).show();
      }
    });

    function createStepperBody() {
      return $("<ul></ul>").addClass("stepperBody").attr("data-stepper", pluginName);;
    }
    function createStepperList(i) {
      return $("<li></li>").addClass('stepperList ' + getnotvisitedClass()).text(settings.steps[i]).attr("content", settings.stepButtonContent[i]);
    }
    function createButtonBody(i) {
      return $("<button></button").text(settings.pagebuttons[i]).addClass("pageButtons").attr("data-stepper", pluginName);
    }
    function clickpageButton(i) {
      $(".form").each(function () {
        if ($(this).css("display") == "block") {
          $index = $(this).index() - 1;
          console.log($index);
          if (i == 0) {
            goToNext($index + i);
          }
          else {
            if ($index > 0) {
              $(".form").eq($index + i).fadeIn('slow');
              setAsCurrent(stepperListJQObj.eq($index + i));
              $(".form").eq($index).fadeOut('fast');
              setAsnotvisited(stepperListJQObj.eq($index));
            }
          }
          return false;
        }
      });
    }

    function goToNext(i) {
      console.log(i);
      if (i < $count - 1) {
        $(".form").eq(i).fadeOut('fast');
        setAsVisited(stepperListJQObj.eq(i));
        $(".form").eq(i + 1).fadeIn('slow');
        if (stepperListJQObj.eq(i + 1).hasClass("notvisited")) {
          setAsCurrent(stepperListJQObj.eq(i + 1));
        }
      }
      if (i == $count - 1) {
        setAsVisited(stepperListJQObj.eq(i));
      }
    }

    if ($(this).hasClass("current") != true) {
      setAsCurrent(stepperListJQObj.eq(initialstep));
      $(".form").eq(initialstep).show();
    }

    function setAsCurrent(ele) {
      stepperListJQObj.removeClass(stateClasses.current);
      ele.addClass(getcurrentClass())
        .removeClass(getvisitedClass() + " " + getnotvisitedClass() + " " + getdisabledClass());
    };
    function setAsVisited(ele) {
      ele.addClass(getvisitedClass())
        .removeClass(getcurrentClass() + " " + getnotvisitedClass() + " " + getdisabledClass())
    }
    function setAsnotvisited(ele) {
      ele.addClass(getnotvisitedClass())
        .removeClass(getcurrentClass() + " " + getvisitedClass() + " " + getdisabledClass())
    }
    function setAsDisabled(ele) {
      ele.addClass(getdisabledClass())
        .removeClass(getcurrentClass() + " " + getnotvisitedClass() + " " + getvisitedClass())
    }
    function getdisabledClass() {
      return "disabled " + settings.disabledClass;
    }
    // function getcurrentClass() {
    //   return "current " + settings.currentClass;
    // }
    // function getvisitedClass() {
    //   return "visited " + settings.visitedClass;
    // };
    // function getnotvisitedClass() {
    //   return "notvisited " + settings.notvisitedClass;
    // }

    var retObj = {
      thisObj: $(this),
      goToNext: goToNext
    };

    return retObj;
  };
})(jQuery);

//var / let / const

// u-d
// disabled
// u-c
// current
// u-n
// notvisited
// u-v
// visited