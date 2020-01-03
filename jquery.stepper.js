(function ($) {
  $.fn.stepper = function (options) {

    var container = $(this);
    var settings = $.extend(
      {
        stepperbgcolor: 'bgcolor',
        steppercompletioncolor: 'completioncolor',
        stepperprocesscolor: 'processcolor',
        steps: ['first', 'second', 'third', 'fourth'],
        stepButtonContent: ["o", "#", "$", "*"],
        pagebuttons: ['Prev Page', 'Next Page'],
        startingindex: '2',

      },
      options
    );
    //all varibles which been used
    var buttons = $("input[type=submit],button,select");
    var initialstep = settings.startingindex - 1;
    $stepperMain = $("<ul></ul>").addClass("stepperBody");
    container.prepend($stepperMain);
    $count = settings.steps.length;

    //set content,classes for lists and buttons
    for (i = 0; i < $count; i++) {

      $stepperMain.append(createList(i));
    }

    for (i = 0; i < settings.pagebuttons.length; i++) {
      container.append($("<button></button").text(settings.pagebuttons[i]).addClass("pageButtons"));
    }

    //list created and classes were added
    function createList(i) {
      return $("<li></li>").addClass('stepperList' + ' ' + settings.stepperbgcolor).text(settings.steps[i]).attr("content", settings.stepButtonContent[i]);
    }
    container.children().not(".stepperBody,.pageButtons").addClass("form");
    //initially notvisited 
    for (i = initialstep; i < $count; i++) {
      $(".stepperList").eq(i).addClass("notvisited");
    }
    //for active class
    $(".stepperList").eq(initialstep).addClass("current" + ' ' + settings.stepperprocesscolor).removeClass("notvisited");
    $(".form").eq(initialstep).show();
    //initially first form and stepperList will be active

    $(".stepperList").click(function () {
      $num = $(this).index();
      console.log($num);
      
      $(this).addClass("current").removeClass("isnotvisited").siblings().removeClass("current");
      
      if (($(this).hasClass("current") && $(this).prev().hasClass('visited')) || $(this).hasClass("visited")) {
        $(".form").hide();
        $(".form").eq($num).show();
      }
    });

    $(".pageButtons").eq(0).click(function () {
      $(".form").each(function () {
        if ($(this).css("display") == "block") {
          if ($(this).prevAll().length - 1 > 0) {
            $(this).fadeOut().prev().fadeIn();
          }
        }
      });
    });

    $(".pageButtons").eq(1).click(function () {
      $(".stepperList").each(function () {
        if ($(this).hasClass("current")) {
          $index=$(this).index();
          console.log($index);
          if ($(".form").eq($index+1).nextAll().length -1> 0) {
            
            $(".form").eq($index).fadeOut("fast").next().fadeIn("slow");
          }
        }
      });
    });

    //when the buttons clicked

    buttons.click(function () {
      var buttonclick = $(this);
      $index = buttonclick
        .parents(".form")
        .index();

      if ($index < $count) {
        $(".form").eq($index - 1)
          .hide();
        $(".stepperList").eq($index - 1).addClass("visited").removeClass("notvisited current");
        $(".form").eq($index)
          .fadeIn('slow');
        if ($(".stepperList").eq($index).hasClass("notvisited")) {
          $(".stepperList").eq($index).addClass("current" + ' ' + settings.stepperprocesscolor).removeClass("notvisited");
        }
      }
      $(".stepperList:nth-child(" + $index + ")").removeClass(settings.stepperprocesscolor);
      $(".stepperList:nth-child(" + $index + ")").addClass(settings.steppercompletioncolor);
    });
  };
})(jQuery);

//current, notvisited, visited, disabled