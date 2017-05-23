! function(e) {
	function t(n) {
		if (a[n]) return a[n].exports;
		var s = a[n] = {
			exports: {},
			id: n,
			loaded: !1
		};
		return e[n].call(s.exports, s, s.exports, t), s.loaded = !0, s.exports
	}
	var a = {};
	return t.m = e, t.c = a, t.p = "js/", t(0)
}([function(e, t, a) {
	e.exports = a(1)
}, function(e, t, a) {
	"use strict";
	a(2), a(3), a(4), a(5), a(6), a(7), a(8), a(9), a(10), a(11), a(12), a(13), a(14)
}, function(e, t) {
	"use strict";

	function a(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var n = function() {
			function e(e, t) {
				for (var a = 0; a < t.length; a++) {
					var n = t[a];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}
			return function(t, a, n) {
				return a && e(t.prototype, a), n && e(t, n), t
			}
		}(),
		s = function() {
			function e() {
				a(this, e), this._bindEvents()
			}
			return n(e, [{
				key: "_bindEvents",
				value: function() {
					$(document).on("ready", this._removeEmptyParagraphs)
				}
			}, {
				key: "_removeEmptyParagraphs",
				value: function() {
					$("p:empty").remove()
				}
			}]), e
		}();
	t["default"] = s
}, function(e, t) {
	"use strict";

	function a(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var n = function() {
			function e(e, t) {
				for (var a = 0; a < t.length; a++) {
					var n = t[a];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}
			return function(t, a, n) {
				return a && e(t.prototype, a), n && e(t, n), t
			}
		}(),
		s = function() {
			function e() {
				a(this, e), this._serializeObject()
			}
			return n(e, [{
				key: "_serializeObject",
				value: function() {
					$.fn.serializeObject = function() {
						var e = {},
							t = this.serializeArray();
						return $.each(t, function() {
							void 0 !== e[this.name] ? (e[this.name].push || (e[this.name] = [e[this.name]]), e[this.name].push(this.value || "")) : e[this.name] = this.value || ""
						}), e
					}
				}
			}]), e
		}();
	t["default"] = s, new s
}, function(e, t) {
	"use strict";

	function a(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var n = function() {
			function e(e, t) {
				for (var a = 0; a < t.length; a++) {
					var n = t[a];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}
			return function(t, a, n) {
				return a && e(t.prototype, a), n && e(t, n), t
			}
		}(),
		s = function() {
			function e() {
				a(this, e), this._bindEvents()
			}
			return n(e, [{
				key: "_bindEvents",
				value: function() {
					var e;
					$("#influencers-form").submit(function(t) {
						e && e.abort();
						var a = $(this),
							n = a.find("input, select, button, textarea"),
							s = a.serialize();
						n.prop("disabled", !0), e = $.ajax({
							url: "https://script.google.com/macros/s/AKfycbyfRyfYaoVywH1Faq2VOvx0afgn1gFDWHkSedn3WMOSiHd4XlU/exec",
							type: "post",
							data: s
						}), e.done(function(e, t, a) {}), e.fail(function(e, t, a) {
							console.error("The following error occurred: " + t, a)
						}), e.always(function() {
							n.prop("disabled", !1)
						}), t.preventDefault()
					})
				}
			}]), e
		}();

	t["default"] = s, new s
}, function(e, t) {
	"use strict";

	function a(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var n = function() {
			function e(e, t) {
				for (var a = 0; a < t.length; a++) {
					var n = t[a];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}
			return function(t, a, n) {
				return a && e(t.prototype, a), n && e(t, n), t
			}
		}(),
		s = function() {
			function e() {
				a(this, e), this.winW = $(window).width(), this.$hamburger = $(".hamburger"), this.$nav_wrapper = $(".nav-wrapper"), this.$simple_nav = $(".simple-nav"), this.$header_social_nav = $(".header-social-nav"), this._bindEvents()
			}
			return n(e, [{
				key: "_bindEvents",
				value: function() {
					$(window).on("resize", this._resized.bind(this)), this.$hamburger.on("click", this._toggleNav.bind(this))
				}
			}, {
				key: "_resized",
				value: function() {
					this.winW = $(window).width(), this.winW >= 768 && this.$hamburger.hasClass("nav-open") && this._closeNav()
				}
			}, {
				key: "_toggleNav",
				value: function() {
					this.$hamburger.hasClass("nav-open") ? this._closeNav() : this._openNav()
				}
			}, {
				key: "_openNav",
				value: function() {
					var e = this;
					e.$hamburger.addClass("nav-open"), e.$nav_wrapper.addClass("nav-open"), e.$nav_wrapper.fadeIn(350), setTimeout(function() {
						e.$simple_nav.addClass("nav-open"), e.$header_social_nav.addClass("nav-open")
					}, 350)
				}
			}, {
				key: "_closeNav",
				value: function() {
					var e = this;
					e.$simple_nav.removeClass("nav-open"), e.$header_social_nav.removeClass("nav-open"), setTimeout(function() {
						e.$hamburger.removeClass("nav-open"), e.$nav_wrapper.fadeOut(350, function() {
							e.$nav_wrapper.removeClass("nav-open"), e.$nav_wrapper.removeAttr("style")
						})
					}, 350)
				}
			}]), e
		}();
	t["default"] = s, new s
}, function(e, t) {
	"use strict";

	function a(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var n = function() {
			function e(e, t) {
				for (var a = 0; a < t.length; a++) {
					var n = t[a];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}
			return function(t, a, n) {
				return a && e(t.prototype, a), n && e(t, n), t
			}
		}(),
		s = function() {
			function e() {
				a(this, e), this.winW = $(window).width(), this.$articleBody = $(".article-body"), this.$dotInHead = $(".article-head .decorative-dot"), this.numOfDots, this.prevNumDots, this.dotSpacing = 1e3, this.dotSize = this.winW < 768 ? 260 : 360, this.dotTop, this._bindEvents()
			}
			return n(e, [{
				key: "_bindEvents",
				value: function() {
					$(document).ready(this._ready.bind(this)), $(window).on("load", this._loaded.bind(this)), $(window).on("resize", this._resized.bind(this))
				}
			}, {
				key: "_ready",
				value: function() {
					this._setupDots()
				}
			}, {
				key: "_loaded",
				value: function() {
					this._setupDots()
				}
			}, {
				key: "_resized",
				value: function() {
					this.winW = $(window).width(), this.numOfDots = Math.floor(this.$articleBody.outerHeight() / 1500), this.numOfDots !== this.prevNumDots && this._setupDots()
				}
			}, {
				key: "_setupDots",
				value: function() {
					if ($(".decorative-dot-article").remove(), this.numOfDots = Math.floor(this.$articleBody.outerHeight() / 1500), this.numOfDots >= 1)
						for (var e = 0; e < this.numOfDots; e++) this.dotTop = this.$dotInHead.offset().top + this.$dotInHead.height() + this.dotSpacing + (this.dotSpacing + this.dotSize) * e, e % 2 === 0 ? $(".article-wrapper").append("<span class='decorative-dot decorative-dot-article light-gray align-left' style='top:" + this.dotTop + "px'></span>") : $(".article-wrapper").append("<span class='decorative-dot decorative-dot-article light-gray align-right' style='top:" + this.dotTop + "px'></span>");
					this.prevNumDots = this.numOfDots
				}
			}]), e
		}();
	t["default"] = s, $(".article-body").length > 0 && new s
}, function(e, t) {
	"use strict";

	function a(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var n = function() {
			function e(e, t) {
				for (var a = 0; a < t.length; a++) {
					var n = t[a];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}
			return function(t, a, n) {
				return a && e(t.prototype, a), n && e(t, n), t
			}
		}(),
		s = function() {
			function e() {
				a(this, e), this.winW = $(window).width(), this.$articleWrapper = $(".articles-wrapper"), this.$loadMoreButton = $(".load-more-button"), this.loadMoreText = this.$loadMoreButton.html(), this.page = 1, this.totalPages = parseInt(this.$loadMoreButton.attr("data-total-pages")), this._bindEvents()
			}
			return n(e, [{
				key: "_bindEvents",
				value: function() {
					$(window).on("resize", this._resized.bind(this)), this.$loadMoreButton.on("click", this._loadMorePosts.bind(this)), $(".blog-categories").length > 0 && ($(".blog-categories .active").on("click", this._toggleCategoryNavMobile.bind(this)), $(".blog-categories .active-category").on("click", this._toggleCategoryNavMobile.bind(this)))
				}
			}, {
				key: "_resized",
				value: function() {
					this.winW = $(window).width(), $(".category-nav-mobile").hasClass("open") && $(".category-nav-mobile").removeClass("open")
				}
			}, {
				key: "_toggleCategoryNavMobile",
				value: function(e) {
					this.winW < 768 && (e.preventDefault(), $(".category-nav-mobile").hasClass("open") ? $(".category-nav-mobile").removeClass("open") : $(".category-nav-mobile").addClass("open"))
				}
			}, {
				key: "_loadMorePosts",
				value: function(e) {
					var t = this;
					e.preventDefault(), t.$loadMoreButton.hasClass("loading") || t.$loadMoreButton.hasClass("disabled") || (t.page++, t.$loadMoreButton.html("Loading...").addClass("loading"), $.get("/" + t.$loadMoreButton.attr("data-path") + "/p" + t.page, function(e) {
						t.$articleWrapper.append(e), t.page !== t.totalPages ? t.$loadMoreButton.html(t.loadMoreText).removeClass("loading") : t.$loadMoreButton.html("No More Posts").addClass("disabled")
					}))
				}
			}]), e
		}();

}]);