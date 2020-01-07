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
    var stateClasses = {
      disabled:"disabled "+settings.disabled,
      current: "current " + settings.currentClass,
      visited: "visited " + settings.visitedClass,
      notvisited: "notvisited " + settings.notvisitedClass
    };
    var stepperList = [];
    var stepperListJQObj;
    var buttonList = [];


    for (i = 0; i < $count; i++) {
      stepperList.push(createStepperList(i));
    }
    $stepperMain.append(stepperList);
    stepperListJQObj = $(".stepperList");
    for (i = 0; i < settings.pageButtons.length; i++) {
      buttonList.push(createStepperButton(i));
    }
    container.append(buttonList);
    
    $(".stepperButton_0").click(function()
    {clickpageButton(-1)});
    $(".stepperButton_1").click(function()
    {clickpageButton(0)});

    stepperListJQObj.click(function () {
      $num = $(this).attr("stepper-listindex");
      if ($(this).hasClass("notvisited")) {
      } else {
       
        setAsCurrent($(this));
         $(".form").hide();
         $(".form").eq($num).show();
      }
    });

    function createStepperBody() {
      return $("<ul></ul>").addClass("stepperBody").attr("data-stepper", pluginName);;
    }
    function createStepperList(i) {
      return $("<li></li>").addClass('stepperList ' + stateClasses.notvisited).text(settings.steps[i]).attr("content", settings.stepButtonContent[i]).attr('stepper-listindex',i);
    }
    function createStepperButton(i) {
      return $("<button></button").text(settings.pagebuttons[i]).addClass("stepperButton_" + i).data("stepper", pluginName);
    }

    function clickpageButton(i) {
      $index = $(".form").data('stepper-index');
      $(".form").each(function () {
        if ($(this).css("display") == "block") {
          $index = $(this).data('stepper-index');
          if (i == 0) {
            goToNext($index + i);
          }
          else {
            if ($index > 0) {
              $(".form").eq($index + i).fadeIn('slow');
              setAsCurrent(stepperListJQObj.eq($index + i));
              $(".form").eq($index).fadeOut('fast');
              }
          }
          return false;
        }
      });
    }

    function goToNext(i) {
      if (i < $count - 1) {
        $(".form").eq(i).fadeOut('fast');
        setAsVisited(stepperListJQObj.eq(i));
        $(".form").eq(i + 1).fadeIn('slow');
        setAsCurrent(stepperListJQObj.eq(i + 1));
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
      ele.addClass(stateClasses.current)
        .removeClass( stateClasses.notvisited + " " + stateClasses.disabled);
    };
    function setAsVisited(ele) {
      ele.addClass(stateClasses.visited)
        .removeClass(stateClasses.current + " " + stateClasses.notvisited + " " + stateClasses.disabled);
    }
    function setAsnotvisited(ele) {
      ele.addClass(stateClasses.notvisited)
        .removeClass(stateClasses.current + " " + stateClasses.visited + " " + stateClasses.disabled)
    }
    function setAsDisabled(ele) {
      ele.addClass(stateClasses.disabled)
        .removeClass(stateClasses.current + " " + stateClasses.notvisited + " " + stateClasses.visited )
    }
 

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