! function ($) {
	$.fn.dynamo = function (options) {
		return this.each(function (i, v) {
			options = options || {};
			var v$ = $(v);
			if (v$.data("initialized") === "true") {
				return
			}
			var delay = options.delay || parseInt(v$.data("delay"), 10) || 3e3;
			var speed = options.speed || parseInt(v$.data("speed"), 10) || 350;
			var pause = options.pause || v$.data("pause") || false;
			var lines = options.lines || v$.data("lines").split(v$.data("delimiter") || ",");
			var callback = options.callback || v$.data("callback") || function () {};
			var centered = options.centered || v$.data("center") || false;
			v$.html($("<span></span>").html(v$.html())).data("initialized", "true");
			lines.forEach(function (line) {
				v$.append($("<span></span>").html(line))
			});
			v$.find("span").each(function (i, ele) {
				var old$ = $(ele).remove();
				var div$ = $("<div></div>").html(old$.html());
				if (!i) {
					div$.data("trigger", "true")
				}
				v$.append(div$)
			});
			var height = v$.find(">:first-child").height();
			v$.height(height).css({
				display: "inline-block",
				position: "relative",
				overflow: "hidden",
				"vertical-align": "bottom",
				"text-align": "left"
			});
			if (centered) {
				v$.css("text-align", "center")
			}
			var transition = function () {
				v$.dynamo_trigger({
					speed: speed,
					callback: callback
				})
			};
			if (!pause) {
				setInterval(transition, delay)
			}
		})
	};
	$.fn.dynamo_trigger = function (options) {
		return this.each(function (i, v) {
			options = options || {};
			var v$ = $(v);
			var speed = options.speed || v$.data("speed") || 350;
			var callback = options.callback || new Function(v$.data("callback")) || function () {};
			v$.find("div:first").slideUp(speed, function () {
				v$.append($(this).show());
				if (v$.find("div:first").data("trigger") === "true") {
					callback()
				}
			})
		})
	};
	$(".dynamo").dynamo()
}(jQuery);
