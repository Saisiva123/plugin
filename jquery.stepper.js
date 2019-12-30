(function ($) {
	var x = [];
	$.fn.stepper = function (options) {
		var settings = $.extend(
			{
				defaultcolor: "grey",
				completioncolor: "green",
				steps: ["step 1", "step 2", "step 3"]
			},
			options
		);
		$div = $("<ul></ul>");
		$(this).prepend($div);
		$count = settings.steps.length;

		for (i = 0; i < $count; i++) {
			x[i] = 0;
			$div.append("<li></li>");
			$div
				.children()
				.eq(i)
				.text(settings.steps[i]);
		}
		for (i = 0; i < $count; i++) {
			console.log(x[i]);
		}
		$div.prop("id", "unorderList");
		$div.children().each(function () {
			$(this).prop("id", "list");
		});
		$(this)
			.children("div")
			.each(function () {
				$(this).addClass("form");
			});

		if (x[0] == 0) {
			$(".form")
				.eq(0)
				.css("display", "block");
		}

		$("#unorderList")
			.children()
			.each(function () {
				$(this).click(function () {
					$num = $count - $(this).nextAll().length;
					console.log($num);
					if (x[$num - 2] == 1 || x[$num - 1] == 1) {
						$(this)
							.parent("#unorderList")
							.siblings("div")
							.css("display", "none");
						$(this)
							.parent("#unorderList")
							.siblings("div")
							.eq($num - 1)
							.css("display", "block");
					}
				});
			});

		$("input[type=submit]").click(function () {
			$("input[type=text]")
				.filter("[required]")
				.each(function () {
					if ($(this).val() != "") {
						$noofpresentform =
							$count -
							$(this)
								.parents()
								.filter(".form")
								.nextAll().length;
						x[$noofpresentform - 1] = 1;

						console.log($noofpresentform);
						if (
							$(this)
								.parents()
								.filter(".form")
								.next().length > 0
						) {
							$(this)
								.parents()
								.filter(".form")
								.css("display", "none");
							$(this)
								.parents()
								.filter(".form")
								.next()
								.css("display", "block");
						}
						$("#list:nth-child(" + $noofpresentform + ")").addClass("special");
					}
				});
		});
	};
})(jQuery);
