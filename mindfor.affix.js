// create namespace
window.mindfor = window.mindfor || {};

(function($) {
	var dataKey = "mindforAffix";
	
	// extend jquery
	$.fn.mindforAffix = function(options) {
		var result;
		this.each(function () {
			var self = this;
			var $self = $(this);
			
			var affix = $self.data(dataKey);
			if (!affix) {
				affix = new mindfor.Affix(self, options);
				$self.data(dataKey, affix);
			}
			if (!result)
				result = affix;
		});
		return result;
	};
	
	// mindfor affix class
	window.mindfor.Affix = function(obj, options) {
		var affix = this;
		this.obj = obj;
		this.options = $.extend({}, mindfor.Affix.defaults, options);
		
		this.$obj = $(obj);	
		this.$container = this.$obj.parent();
		this.$stop = this.$obj.closest(".mindfor-affix-stop");
		this.state = 0;
		this.updateProxy = function() {
			affix.update();
		};
		this.resizeProxy = function() {
			affix.update(true);
		};
		
		// set start css
		this.$obj.css("overflow", "auto");		
		
		// bind to scroll event
		$(window).bind({
			scroll: this.updateProxy,
			resize: this.resizeProxy
		});
		
		// start start position
		this.update();
	};
	
	window.mindfor.Affix.defaults = {
		marginTop: 40,
		marginBottom: 20
	};
	
	function makeNormal($obj, $container) {
		$obj.css({
			position: "static",
			width: "auto",
			top: "auto",
			left: "auto"
		});
		$container.css("min-height", "auto");
	}
	
	window.mindfor.Affix.prototype.remove = function () {
		makeNormal(this.$obj, this.$container);
		$(window).unbind({
			scroll: this.updateProxy,
			resize: this.resizeProxy
		});
		this.$obj.removeData(dataKey);
	}
	
	window.mindfor.Affix.prototype.update = function (force) {
		var windowTop = $(window).scrollTop();
		var containerOffset = this.$container.offset();
		var containerPaddingTop = parseInt(this.$container.css("padding-top"));
		var objOuterHeight = this.$obj.outerHeight();
		
		// get top min and max positions for affix
		var topMin = containerOffset.top + containerPaddingTop - this.options.marginTop;
		var topMax = -1;
		var topRelativeOffset = -1;
		if (this.$stop.length > 0) {
			var stopPaddingTop = parseInt(this.$stop.css("padding-top"));
			topRelativeOffset = this.$stop.height() - objOuterHeight - this.options.marginBottom;
			topMax = this.$stop.offset().top + stopPaddingTop + topRelativeOffset - this.options.marginTop;
		}
		
		// scrolled more than container
		if (topMax >= 0 && windowTop > topMax) {
			if (this.state != 2) {
				this.$obj.css({
					position: "relative",
					top: topRelativeOffset,
					left: "auto",
					width: "auto"
				});
				this.$container.css("min-height", objOuterHeight);
				this.state = 2;
			};
		}
		// scrolled more that container begins
		else if (windowTop > topMin) {
			if (this.state != 1 || force) {
				var containerPaddingLeft = parseInt(this.$container.css("padding-left"));
				this.$obj.css({
					position: "fixed",
					top: this.options.marginTop,
					left: containerOffset.left + containerPaddingLeft,
					width: this.$container.width()
				});
				this.$container.css("min-height", objOuterHeight);
				this.state = 1;
			}
		}
		// set normal position
		else if (this.state != 0) {
			makeNormal(this.$obj, this.$container);
			this.state = 0;
		}
	}
})(jQuery);