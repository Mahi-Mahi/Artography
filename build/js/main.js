! function() {
	! function(n, e, t) {
		function r(n) {
			return n && "number" == typeof n.length ? "function" != typeof n.hasOwnProperty && "function" != typeof n.constructor ? !0 : n instanceof ae || Kt && n instanceof Kt || "[object Object]" !== nr.call(n) || "function" == typeof n.callee : !1
		}

		function i(n, e, t) {
			var o;
			if (n)
				if (C(n))
					for (o in n) "prototype" != o && "length" != o && "name" != o && n.hasOwnProperty(o) && e.call(t, n[o], o);
				else
			if (n.forEach && n.forEach !== i) n.forEach(e, t);
			else if (r(n))
				for (o = 0; o < n.length; o++) e.call(t, n[o], o);
			else
				for (o in n) n.hasOwnProperty(o) && e.call(t, n[o], o);
			return n
		}

		function o(n) {
			var e = [];
			for (var t in n) n.hasOwnProperty(t) && e.push(t);
			return e.sort()
		}

		function u(n, e, t) {
			for (var r = o(n), i = 0; i < r.length; i++) e.call(t, n[r[i]], r[i]);
			return r
		}

		function a(n) {
			return function(e, t) {
				n(t, e)
			}
		}

		function c() {
			for (var n, e = tr.length; e;) {
				if (e--, n = tr[e].charCodeAt(0), 57 == n) return tr[e] = "A", tr.join("");
				if (90 != n) return tr[e] = String.fromCharCode(n + 1), tr.join("");
				tr[e] = "0"
			}
			return tr.unshift("0"), tr.join("")
		}

		function s(n, e) {
			e ? n.$$hashKey = e : delete n.$$hashKey
		}

		function l(n) {
			var e = n.$$hashKey;
			return i(arguments, function(e) {
				e !== n && i(e, function(e, t) {
					n[t] = e
				})
			}), s(n, e), n
		}

		function f(n) {
			return parseInt(n, 10)
		}

		function h(n, e) {
			return l(new(l(function() {}, {
				prototype: n
			})), e)
		}

		function p() {}

		function $(n) {
			return n
		}

		function d(n) {
			return function() {
				return n
			}
		}

		function v(n) {
			return "undefined" == typeof n
		}

		function m(n) {
			return "undefined" != typeof n
		}

		function g(n) {
			return null != n && "object" == typeof n
		}

		function y(n) {
			return "string" == typeof n
		}

		function w(n) {
			return "number" == typeof n
		}

		function b(n) {
			return "[object Date]" == nr.apply(n)
		}

		function x(n) {
			return "[object Array]" == nr.apply(n)
		}

		function C(n) {
			return "function" == typeof n
		}

		function S(n) {
			return "[object RegExp]" == nr.apply(n)
		}

		function E(n) {
			return n && n.document && n.location && n.alert && n.setInterval
		}

		function A(n) {
			return n && n.$evalAsync && n.$watch
		}

		function M(n) {
			return "[object File]" === nr.apply(n)
		}

		function T(n) {
			return n && (n.nodeName || n.bind && n.find)
		}

		function O(n, e, t) {
			var r = [];
			return i(n, function(n, i, o) {
				r.push(e.call(t, n, i, o))
			}), r
		}

		function k(n, e) {
			return -1 != j(n, e)
		}

		function j(n, e) {
			if (n.indexOf) return n.indexOf(e);
			for (var t = 0; t < n.length; t++)
				if (e === n[t]) return t;
			return -1
		}

		function P(n, e) {
			var t = j(n, e);
			return t >= 0 && n.splice(t, 1), e
		}

		function N(n, e) {
			if (E(n) || A(n)) throw Error("Can't copy Window or Scope");
			if (e) {
				if (n === e) throw Error("Can't copy equivalent objects or arrays");
				if (x(n)) {
					e.length = 0;
					for (var t = 0; t < n.length; t++) e.push(N(n[t]))
				} else {
					var r = e.$$hashKey;
					i(e, function(n, t) {
						delete e[t]
					});
					for (var o in n) e[o] = N(n[o]);
					s(e, r)
				}
			} else e = n, n && (x(n) ? e = N(n, []) : b(n) ? e = new Date(n.getTime()) : S(n) ? e = new RegExp(n.source) : g(n) && (e = N(n, {})));
			return e
		}

		function V(n, e) {
			e = e || {};
			for (var t in n) n.hasOwnProperty(t) && "$$" !== t.substr(0, 2) && (e[t] = n[t]);
			return e
		}

		function R(n, e) {
			if (n === e) return !0;
			if (null === n || null === e) return !1;
			if (n !== n && e !== e) return !0;
			var r, i, o, u = typeof n,
				a = typeof e;
			if (u == a && "object" == u) {
				if (!x(n)) {
					if (b(n)) return b(e) && n.getTime() == e.getTime();
					if (S(n) && S(e)) return n.toString() == e.toString();
					if (A(n) || A(e) || E(n) || E(e) || x(e)) return !1;
					o = {};
					for (i in n)
						if ("$" !== i.charAt(0) && !C(n[i])) {
							if (!R(n[i], e[i])) return !1;
							o[i] = !0
						}
					for (i in e)
						if (!o[i] && "$" !== i.charAt(0) && e[i] !== t && !C(e[i])) return !1;
					return !0
				}
				if (!x(e)) return !1;
				if ((r = n.length) == e.length) {
					for (i = 0; r > i; i++)
						if (!R(n[i], e[i])) return !1;
					return !0
				}
			}
			return !1
		}

		function q(n, e, t) {
			return n.concat(Gt.call(e, t))
		}

		function U(n, e) {
			return Gt.call(n, e || 0)
		}

		function D(n, e) {
			var t = arguments.length > 2 ? U(arguments, 2) : [];
			return !C(e) || e instanceof RegExp ? e : t.length ? function() {
				return arguments.length ? e.apply(n, t.concat(Gt.call(arguments, 0))) : e.apply(n, t)
			} : function() {
				return arguments.length ? e.apply(n, arguments) : e.call(n)
			}
		}

		function H(n, r) {
			var i = r;
			return /^\$+/.test(n) ? i = t : E(r) ? i = "$WINDOW" : r && e === r ? i = "$DOCUMENT" : A(r) && (i = "$SCOPE"), i
		}

		function I(n, e) {
			return "undefined" == typeof n ? t : JSON.stringify(n, H, e ? "  " : null)
		}

		function L(n) {
			return y(n) ? JSON.parse(n) : n
		}

		function _(n) {
			if (n && 0 !== n.length) {
				var e = Ft("" + n);
				n = !("f" == e || "0" == e || "false" == e || "no" == e || "n" == e || "[]" == e)
			} else n = !1;
			return n
		}

		function F(n) {
			n = Jt(n).clone();
			try {
				n.html("")
			} catch (e) {}
			var t = 3,
				r = Jt("<div>").append(n).html();
			try {
				return n[0].nodeType === t ? Ft(r) : r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(n, e) {
					return "<" + Ft(e)
				})
			} catch (e) {
				return Ft(r)
			}
		}

		function B(n) {
			try {
				return decodeURIComponent(n)
			} catch (e) {}
		}

		function z(n) {
			var e, t, r = {};
			return i((n || "").split("&"), function(n) {
				n && (e = n.split("="), t = B(e[0]), m(t) && (r[t] = m(e[1]) ? B(e[1]) : !0))
			}), r
		}

		function X(n) {
			var e = [];
			return i(n, function(n, t) {
				e.push(K(t, !0) + (n === !0 ? "" : "=" + K(n, !0)))
			}), e.length ? e.join("&") : ""
		}

		function J(n) {
			return K(n, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
		}

		function K(n, e) {
			return encodeURIComponent(n).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, e ? "%20" : "+")
		}

		function W(n, t) {
			function r(n) {
				n && a.push(n)
			}
			var o, u, a = [n],
				c = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
				s = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
			i(c, function(t) {
				c[t] = !0, r(e.getElementById(t)), t = t.replace(":", "\\:"), n.querySelectorAll && (i(n.querySelectorAll("." + t), r), i(n.querySelectorAll("." + t + "\\:"), r), i(n.querySelectorAll("[" + t + "]"), r))
			}), i(a, function(n) {
				if (!o) {
					var e = " " + n.className + " ",
						t = s.exec(e);
					t ? (o = n, u = (t[2] || "").replace(/\s+/g, ",")) : i(n.attributes, function(e) {
						!o && c[e.name] && (o = n, u = e.value)
					})
				}
			}), o && t(o, u ? [u] : [])
		}

		function Z(e, t) {
			var r = function() {
				e = Jt(e), t = t || [], t.unshift(["$provide",
					function(n) {
						n.value("$rootElement", e)
					}
				]), t.unshift("ng");
				var n = Ae(t);
				return n.invoke(["$rootScope", "$rootElement", "$compile", "$injector",
					function(n, e, t, r) {
						n.$apply(function() {
							e.data("$injector", r), t(e)(n)
						})
					}
				]), n
			}, o = /^NG_DEFER_BOOTSTRAP!/;
			return n && !o.test(n.name) ? r() : (n.name = n.name.replace(o, ""), void(er.resumeBootstrap = function(n) {
				i(n, function(n) {
					t.push(n)
				}), r()
			}))
		}

		function Y(n, e) {
			return e = e || "_", n.replace(ir, function(n, t) {
				return (t ? e : "") + n.toLowerCase()
			})
		}

		function G() {
			Kt = n.jQuery, Kt ? (Jt = Kt, l(Kt.fn, {
				scope: pr.scope,
				controller: pr.controller,
				injector: pr.injector,
				inheritedData: pr.inheritedData
			}), ue("remove", !0, !0, !1), ue("empty", !1, !1, !1), ue("html", !1, !1, !0)) : Jt = ae, er.element = Jt
		}

		function Q(n, e, t) {
			if (!n) throw new Error("Argument '" + (e || "?") + "' is " + (t || "required"));
			return n
		}

		function ne(n, e, t) {
			return t && x(n) && (n = n[n.length - 1]), Q(C(n), e, "not a function, got " + (n && "object" == typeof n ? n.constructor.name || "Object" : typeof n)), n
		}

		function ee(n, e, t) {
			if (!e) return n;
			for (var r, i = e.split("."), o = n, u = i.length, a = 0; u > a; a++) r = i[a], n && (n = (o = n)[r]);
			return !t && C(n) ? D(o, n) : n
		}

		function te(n) {
			function e(n, e, t) {
				return n[e] || (n[e] = t())
			}
			return e(e(n, "angular", Object), "module", function() {
				var n = {};
				return function(t, r, i) {
					return r && n.hasOwnProperty(t) && (n[t] = null), e(n, t, function() {
						function n(n, t, r) {
							return function() {
								return e[r || "push"]([n, t, arguments]), a
							}
						}
						if (!r) throw Error("No module: " + t);
						var e = [],
							o = [],
							u = n("$injector", "invoke"),
							a = {
								_invokeQueue: e,
								_runBlocks: o,
								requires: r,
								name: t,
								provider: n("$provide", "provider"),
								factory: n("$provide", "factory"),
								service: n("$provide", "service"),
								value: n("$provide", "value"),
								constant: n("$provide", "constant", "unshift"),
								filter: n("$filterProvider", "register"),
								controller: n("$controllerProvider", "register"),
								directive: n("$compileProvider", "directive"),
								config: u,
								run: function(n) {
									return o.push(n), this
								}
							};
						return i && u(i), a
					})
				}
			})
		}

		function re(e) {
			l(e, {
				bootstrap: Z,
				copy: N,
				extend: l,
				equals: R,
				element: Jt,
				forEach: i,
				injector: Ae,
				noop: p,
				bind: D,
				toJson: I,
				fromJson: L,
				identity: $,
				isUndefined: v,
				isDefined: m,
				isString: y,
				isFunction: C,
				isObject: g,
				isNumber: w,
				isElement: T,
				isArray: x,
				version: or,
				isDate: b,
				lowercase: Ft,
				uppercase: Bt,
				callbacks: {
					counter: 0
				}
			}), Wt = te(n);
			try {
				Wt("ngLocale")
			} catch (t) {
				Wt("ngLocale", []).provider("$locale", mt)
			}
			Wt("ng", ["ngLocale"], ["$provide",
				function(n) {
					n.provider("$compile", Pe).directive({
						a: qr,
						input: Xr,
						textarea: Xr,
						form: Ir,
						script: Mi,
						select: Oi,
						style: ji,
						option: ki,
						ngBind: ii,
						ngBindHtmlUnsafe: ui,
						ngBindTemplate: oi,
						ngClass: ai,
						ngClassEven: si,
						ngClassOdd: ci,
						ngCsp: hi,
						ngCloak: li,
						ngController: fi,
						ngForm: Lr,
						ngHide: wi,
						ngInclude: $i,
						ngInit: di,
						ngNonBindable: vi,
						ngPluralize: mi,
						ngRepeat: gi,
						ngShow: yi,
						ngStyle: bi,
						ngSwitch: xi,
						ngSwitchWhen: Ci,
						ngSwitchDefault: Si,
						ngOptions: Ti,
						ngView: Ai,
						ngTransclude: Ei,
						ngModel: Gr,
						ngList: ei,
						ngChange: Qr,
						required: ni,
						ngRequired: ni,
						ngValue: ri
					}).directive(Ur).directive(pi), n.provider({
						$anchorScroll: Me,
						$browser: Oe,
						$cacheFactory: ke,
						$controller: Ve,
						$document: Re,
						$exceptionHandler: qe,
						$filter: yt,
						$interpolate: Ue,
						$http: $t,
						$httpBackend: dt,
						$location: We,
						$log: Ze,
						$parse: tt,
						$route: ot,
						$routeParams: ut,
						$rootScope: at,
						$q: rt,
						$sniffer: ct,
						$templateCache: je,
						$timeout: gt,
						$window: st
					})
				}
			])
		}

		function ie() {
			return ++cr
		}

		function oe(n) {
			return n.replace(fr, function(n, e, t, r) {
				return r ? t.toUpperCase() : t
			}).replace(hr, "Moz$1")
		}

		function ue(n, e, t, r) {
			function i(n) {
				var i, u, a, c, s, l, f, h = t && n ? [this.filter(n)] : [this],
					p = e;
				if (!r || null != n)
					for (; h.length;)
						for (i = h.shift(), u = 0, a = i.length; a > u; u++)
							for (c = Jt(i[u]), p ? c.triggerHandler("$destroy") : p = !p, s = 0, l = (f = c.children()).length; l > s; s++) h.push(Kt(f[s]));
				return o.apply(this, arguments)
			}
			var o = Kt.fn[n];
			o = o.$original || o, i.$original = o, Kt.fn[n] = i
		}

		function ae(n) {
			if (n instanceof ae) return n;
			if (!(this instanceof ae)) {
				if (y(n) && "<" != n.charAt(0)) throw Error("selectors not implemented");
				return new ae(n)
			}
			if (y(n)) {
				var t = e.createElement("div");
				t.innerHTML = "<div>&#160;</div>" + n, t.removeChild(t.firstChild), me(this, t.childNodes), this.remove()
			} else me(this, n)
		}

		function ce(n) {
			return n.cloneNode(!0)
		}

		function se(n) {
			fe(n);
			for (var e = 0, t = n.childNodes || []; e < t.length; e++) se(t[e])
		}

		function le(n, e, t) {
			var r = he(n, "events"),
				o = he(n, "handle");
			o && (v(e) ? i(r, function(e, t) {
				lr(n, t, e), delete r[t]
			}) : v(t) ? (lr(n, e, r[e]), delete r[e]) : P(r[e] || [], t))
		}

		function fe(n) {
			var e = n[ar],
				r = ur[e];
			r && (r.handle && (r.events.$destroy && r.handle({}, "$destroy"), le(n)), delete ur[e], n[ar] = t)
		}

		function he(n, e, t) {
			var r = n[ar],
				i = ur[r || -1];
			return m(t) ? (i || (n[ar] = r = ie(), i = ur[r] = {}), void(i[e] = t)) : i && i[e]
		}

		function pe(n, e, t) {
			var r = he(n, "data"),
				i = m(t),
				o = !i && m(e),
				u = o && !g(e);
			if (r || u || he(n, "data", r = {}), i) r[e] = t;
			else {
				if (!o) return r;
				if (u) return r && r[e];
				l(r, e)
			}
		}

		function $e(n, e) {
			return (" " + n.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ") > -1
		}

		function de(n, e) {
			e && i(e.split(" "), function(e) {
				n.className = rr((" " + n.className + " ").replace(/[\n\t]/g, " ").replace(" " + rr(e) + " ", " "))
			})
		}

		function ve(n, e) {
			e && i(e.split(" "), function(e) {
				$e(n, e) || (n.className = rr(n.className + " " + rr(e)))
			})
		}

		function me(n, e) {
			if (e) {
				e = e.nodeName || !m(e.length) || E(e) ? [e] : e;
				for (var t = 0; t < e.length; t++) n.push(e[t])
			}
		}

		function ge(n, e) {
			return ye(n, "$" + (e || "ngController") + "Controller")
		}

		function ye(n, e, t) {
			for (n = Jt(n), 9 == n[0].nodeType && (n = n.find("html")); n.length;) {
				if (t = n.data(e)) return t;
				n = n.parent()
			}
		}

		function we(n, e) {
			var t = $r[e.toLowerCase()];
			return t && dr[n.nodeName] && t
		}

		function be(n, t) {
			var r = function(r, o) {
				if (r.preventDefault || (r.preventDefault = function() {
					r.returnValue = !1
				}), r.stopPropagation || (r.stopPropagation = function() {
					r.cancelBubble = !0
				}), r.target || (r.target = r.srcElement || e), v(r.defaultPrevented)) {
					var u = r.preventDefault;
					r.preventDefault = function() {
						r.defaultPrevented = !0, u.call(r)
					}, r.defaultPrevented = !1
				}
				r.isDefaultPrevented = function() {
					return r.defaultPrevented
				}, i(t[o || r.type], function(e) {
					e.call(n, r)
				}), 8 >= Yt ? (r.preventDefault = null, r.stopPropagation = null, r.isDefaultPrevented = null) : (delete r.preventDefault, delete r.stopPropagation, delete r.isDefaultPrevented)
			};
			return r.elem = n, r
		}

		function xe(n) {
			var e, r = typeof n;
			return "object" == r && null !== n ? "function" == typeof(e = n.$$hashKey) ? e = n.$$hashKey() : e === t && (e = n.$$hashKey = c()) : e = n, r + ":" + e
		}

		function Ce(n) {
			i(n, this.put, this)
		}

		function Se() {}

		function Ee(n) {
			var e, t, r, o;
			return "function" == typeof n ? (e = n.$inject) || (e = [], t = n.toString().replace(yr, ""), r = t.match(vr), i(r[1].split(mr), function(n) {
				n.replace(gr, function(n, t, r) {
					e.push(r)
				})
			}), n.$inject = e) : x(n) ? (o = n.length - 1, ne(n[o], "fn"), e = n.slice(0, o)) : ne(n, "fn", !0), e
		}

		function Ae(n) {
			function e(n) {
				return function(e, t) {
					return g(e) ? void i(e, a(n)) : n(e, t)
				}
			}

			function t(n, e) {
				if ((C(e) || x(e)) && (e = b.instantiate(e)), !e.$get) throw Error("Provider " + n + " must define $get factory method.");
				return w[n + $] = e
			}

			function r(n, e) {
				return t(n, {
					$get: e
				})
			}

			function o(n, e) {
				return r(n, ["$injector",
					function(n) {
						return n.instantiate(e)
					}
				])
			}

			function u(n, e) {
				return r(n, d(e))
			}

			function c(n, e) {
				w[n] = e, S[n] = e
			}

			function s(n, e) {
				var t = b.get(n + $),
					r = t.$get;
				t.$get = function() {
					var n = E.invoke(r, t);
					return E.invoke(e, null, {
						$delegate: n
					})
				}
			}

			function l(n) {
				var e = [];
				return i(n, function(n) {
					if (!m.get(n))
						if (m.put(n, !0), y(n)) {
							var t = Wt(n);
							e = e.concat(l(t.requires)).concat(t._runBlocks);
							try {
								for (var r = t._invokeQueue, i = 0, o = r.length; o > i; i++) {
									var u = r[i],
										a = "$injector" == u[0] ? b : b.get(u[0]);
									a[u[1]].apply(a, u[2])
								}
							} catch (c) {
								throw c.message && (c.message += " from " + n), c
							}
						} else
					if (C(n)) try {
						e.push(b.invoke(n))
					} catch (c) {
						throw c.message && (c.message += " from " + n), c
					} else if (x(n)) try {
						e.push(b.invoke(n))
					} catch (c) {
						throw c.message && (c.message += " from " + String(n[n.length - 1])), c
					} else ne(n, "module")
				}), e
			}

			function f(n, e) {
				function t(t) {
					if ("string" != typeof t) throw Error("Service name expected");
					if (n.hasOwnProperty(t)) {
						if (n[t] === h) throw Error("Circular dependency: " + v.join(" <- "));
						return n[t]
					}
					try {
						return v.unshift(t), n[t] = h, n[t] = e(t)
					} finally {
						v.shift()
					}
				}

				function r(n, e, r) {
					var i, o, u, a = [],
						c = Ee(n);
					for (o = 0, i = c.length; i > o; o++) u = c[o], a.push(r && r.hasOwnProperty(u) ? r[u] : t(u));
					switch (n.$inject || (n = n[i]), e ? -1 : a.length) {
						case 0:
							return n();
						case 1:
							return n(a[0]);
						case 2:
							return n(a[0], a[1]);
						case 3:
							return n(a[0], a[1], a[2]);
						case 4:
							return n(a[0], a[1], a[2], a[3]);
						case 5:
							return n(a[0], a[1], a[2], a[3], a[4]);
						case 6:
							return n(a[0], a[1], a[2], a[3], a[4], a[5]);
						case 7:
							return n(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
						case 8:
							return n(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
						case 9:
							return n(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
						case 10:
							return n(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
						default:
							return n.apply(e, a)
					}
				}

				function i(n, e) {
					var t, i, o = function() {};
					return o.prototype = (x(n) ? n[n.length - 1] : n).prototype, t = new o, i = r(n, t, e), g(i) ? i : t
				}
				return {
					invoke: r,
					instantiate: i,
					get: t,
					annotate: Ee
				}
			}
			var h = {}, $ = "Provider",
				v = [],
				m = new Ce,
				w = {
					$provide: {
						provider: e(t),
						factory: e(r),
						service: e(o),
						value: e(u),
						constant: e(c),
						decorator: s
					}
				}, b = f(w, function() {
					throw Error("Unknown provider: " + v.join(" <- "))
				}),
				S = {}, E = S.$injector = f(S, function(n) {
					var e = b.get(n + $);
					return E.invoke(e.$get, e)
				});
			return i(l(n), function(n) {
				E.invoke(n || p)
			}), E
		}

		function Me() {
			var n = !0;
			this.disableAutoScrolling = function() {
				n = !1
			}, this.$get = ["$window", "$location", "$rootScope",
				function(e, t, r) {
					function o(n) {
						var e = null;
						return i(n, function(n) {
							e || "a" !== Ft(n.nodeName) || (e = n)
						}), e
					}

					function u() {
						var n, r = t.hash();
						r ? (n = a.getElementById(r)) ? n.scrollIntoView() : (n = o(a.getElementsByName(r))) ? n.scrollIntoView() : "top" === r && e.scrollTo(0, 0) : e.scrollTo(0, 0)
					}
					var a = e.document;
					return n && r.$watch(function() {
						return t.hash()
					}, function() {
						r.$evalAsync(u)
					}), u
				}
			]
		}

		function Te(n, e, r, o) {
			function u(n) {
				try {
					n.apply(null, U(arguments, 1))
				} finally {
					if (g--, 0 === g)
						for (; w.length;) try {
							w.pop()()
						} catch (e) {
							r.error(e)
						}
				}
			}

			function a(n, e) {
				! function t() {
					i(x, function(n) {
						n()
					}), b = e(t, n)
				}()
			}

			function c() {
				C != s.url() && (C = s.url(), i(A, function(n) {
					n(s.url())
				}))
			}
			var s = this,
				l = e[0],
				f = n.location,
				h = n.history,
				$ = n.setTimeout,
				d = n.clearTimeout,
				m = {};
			s.isMock = !1;
			var g = 0,
				w = [];
			s.$$completeOutstandingRequest = u, s.$$incOutstandingRequestCount = function() {
				g++
			}, s.notifyWhenNoOutstandingRequests = function(n) {
				i(x, function(n) {
					n()
				}), 0 === g ? n() : w.push(n)
			};
			var b, x = [];
			s.addPollFn = function(n) {
				return v(b) && a(100, $), x.push(n), n
			};
			var C = f.href,
				S = e.find("base"),
				E = null;
			s.url = function(n, e) {
				if (n) {
					if (C == n) return;
					return C = n, o.history ? e ? h.replaceState(null, "", n) : (h.pushState(null, "", n), S.attr("href", S.attr("href"))) : e ? (f.replace(n), E = n) : (f.href = n, E = null), s
				}
				return E || f.href.replace(/%27/g, "'")
			};
			var A = [],
				M = !1;
			s.onUrlChange = function(e) {
				return M || (o.history && Jt(n).bind("popstate", c), o.hashchange ? Jt(n).bind("hashchange", c) : s.addPollFn(c), M = !0), A.push(e), e
			}, s.baseHref = function() {
				var n = S.attr("href");
				return n ? n.replace(/^https?\:\/\/[^\/]*/, "") : ""
			};
			var T = {}, O = "",
				k = s.baseHref();
			s.cookies = function(n, e) {
				var i, o, u, a, c;
				if (!n) {
					if (l.cookie !== O)
						for (O = l.cookie, o = O.split("; "), T = {}, a = 0; a < o.length; a++)
							if (u = o[a], c = u.indexOf("="), c > 0) {
								var n = unescape(u.substring(0, c));
								T[n] === t && (T[n] = unescape(u.substring(c + 1)))
							}
					return T
				}
				e === t ? l.cookie = escape(n) + "=;path=" + k + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : y(e) && (i = (l.cookie = escape(n) + "=" + escape(e) + ";path=" + k).length + 1, i > 4096 && r.warn("Cookie '" + n + "' possibly not set or overflowed because it was too large (" + i + " > 4096 bytes)!"))
			}, s.defer = function(n, e) {
				var t;
				return g++, t = $(function() {
					delete m[t], u(n)
				}, e || 0), m[t] = !0, t
			}, s.defer.cancel = function(n) {
				return m[n] ? (delete m[n], d(n), u(p), !0) : !1
			}
		}

		function Oe() {
			this.$get = ["$window", "$log", "$sniffer", "$document",
				function(n, e, t, r) {
					return new Te(n, r, e, t)
				}
			]
		}

		function ke() {
			this.$get = function() {
				function n(n, t) {
					function r(n) {
						n != f && (h ? h == n && (h = n.n) : h = n, i(n.n, n.p), i(n, f), f = n, f.n = null)
					}

					function i(n, e) {
						n != e && (n && (n.p = e), e && (e.n = n))
					}
					if (n in e) throw Error("cacheId " + n + " taken");
					var o = 0,
						u = l({}, t, {
							id: n
						}),
						a = {}, c = t && t.capacity || Number.MAX_VALUE,
						s = {}, f = null,
						h = null;
					return e[n] = {
						put: function(n, e) {
							var t = s[n] || (s[n] = {
								key: n
							});
							r(t), v(e) || (n in a || o++, a[n] = e, o > c && this.remove(h.key))
						},
						get: function(n) {
							var e = s[n];
							if (e) return r(e), a[n]
						},
						remove: function(n) {
							var e = s[n];
							e && (e == f && (f = e.p), e == h && (h = e.n), i(e.n, e.p), delete s[n], delete a[n], o--)
						},
						removeAll: function() {
							a = {}, o = 0, s = {}, f = h = null
						},
						destroy: function() {
							a = null, u = null, s = null, delete e[n]
						},
						info: function() {
							return l({}, u, {
								size: o
							})
						}
					}
				}
				var e = {};
				return n.info = function() {
					var n = {};
					return i(e, function(e, t) {
						n[t] = e.info()
					}), n
				}, n.get = function(n) {
					return e[n]
				}, n
			}
		}

		function je() {
			this.$get = ["$cacheFactory",
				function(n) {
					return n("templates")
				}
			]
		}

		function Pe(n) {
			var r = {}, o = "Directive",
				u = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
				c = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
				s = "Template must have exactly one root element. was: ",
				f = /^\s*(https?|ftp|mailto|file):/;
			this.directive = function h(e, t) {
				return y(e) ? (Q(t, "directive"), r.hasOwnProperty(e) || (r[e] = [], n.factory(e + o, ["$injector", "$exceptionHandler",
					function(n, t) {
						var o = [];
						return i(r[e], function(r) {
							try {
								var i = n.invoke(r);
								C(i) ? i = {
									compile: d(i)
								} : !i.compile && i.link && (i.compile = d(i.link)), i.priority = i.priority || 0, i.name = i.name || e, i.require = i.require || i.controller && i.name, i.restrict = i.restrict || "A", o.push(i)
							} catch (u) {
								t(u)
							}
						}), o
					}
				])), r[e].push(t)) : i(e, a(h)), this
			}, this.urlSanitizationWhitelist = function(n) {
				return m(n) ? (f = n, this) : f
			}, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document",
				function(n, a, h, p, v, m, w, b, S) {
					function E(n, e, t) {
						n instanceof Jt || (n = Jt(n)), i(n, function(e, t) {
							3 == e.nodeType && e.nodeValue.match(/\S+/) && (n[t] = Jt(e).wrap("<span></span>").parent()[0])
						});
						var r = M(n, e, n, t);
						return function(e, t) {
							Q(e, "scope");
							for (var i = t ? pr.clone.call(n) : n, o = 0, u = i.length; u > o; o++) {
								var a = i[o];
								(1 == a.nodeType || 9 == a.nodeType) && i.eq(o).data("$scope", e)
							}
							return A(i, "ng-scope"), t && t(i, e), r && r(e, i, i), i
						}
					}

					function A(n, e) {
						try {
							n.addClass(e)
						} catch (t) {}
					}

					function M(n, e, r, i) {
						function o(n, r, i, o) {
							var u, a, c, s, l, h, p, $, d = [];
							for (h = 0, p = r.length; p > h; h++) d.push(r[h]);
							for (h = 0, $ = 0, p = f.length; p > h; $++) c = d[$], u = f[h++], a = f[h++], u ? (u.scope ? (s = n.$new(g(u.scope)), Jt(c).data("$scope", s)) : s = n, l = u.transclude, l || !o && e ? u(a, s, c, i, function(e) {
								return function(t) {
									var r = n.$new();
									return r.$$transcluded = !0, e(r, t).bind("$destroy", D(r, r.$destroy))
								}
							}(l || e)) : u(a, s, c, t, o)) : a && a(n, c.childNodes, t, o)
						}
						for (var u, a, c, s, l, f = [], h = 0; h < n.length; h++) s = new I, c = T(n[h], [], s, i), u = c.length ? O(c, n[h], s, e, r) : null, a = u && u.terminal || !n[h].childNodes || !n[h].childNodes.length ? null : M(n[h].childNodes, u ? u.transclude : e), f.push(u), f.push(a), l = l || u || a;
						return l ? o : null
					}

					function T(n, e, t, r) {
						var i, o, a = n.nodeType,
							s = t.$attr;
						switch (a) {
							case 1:
								k(e, Ne(Zt(n).toLowerCase()), "E", r);
								for (var l, f, h, p, $ = n.attributes, d = 0, v = $ && $.length; v > d; d++) l = $[d], (!Yt || Yt >= 8 || l.specified) && (f = l.name, h = Ne(f.toLowerCase()), s[h] = f, t[h] = p = rr(Yt && "href" == f ? decodeURIComponent(n.getAttribute(f, 2)) : l.value), we(n, h) && (t[h] = !0), U(n, e, p, h), k(e, h, "A", r));
								if (o = n.className, y(o) && "" !== o)
									for (; i = c.exec(o);) h = Ne(i[2]), k(e, h, "C", r) && (t[h] = rr(i[3])), o = o.substr(i.index + i[0].length);
								break;
							case 3:
								q(e, n.nodeValue);
								break;
							case 8:
								try {
									i = u.exec(n.nodeValue), i && (h = Ne(i[1]), k(e, h, "M", r) && (t[h] = rr(i[2])))
								} catch (m) {}
						}
						return e.sort(N), e
					}

					function O(n, r, o, u, a) {
						function c(n, e) {
							n && (n.require = p.require, k.push(n)), e && (e.require = p.require, N.push(e))
						}

						function l(n, e) {
							var t, r = "data",
								o = !1;
							if (y(n)) {
								for (;
									"^" == (t = n.charAt(0)) || "?" == t;) n = n.substr(1), "^" == t && (r = "inheritedData"), o = o || "?" == t;
								if (t = e[r]("$" + n + "Controller"), !t && !o) throw Error("No controller: " + n);
								return t
							}
							return x(n) && (t = [], i(n, function(n) {
								t.push(l(n, e))
							})), t
						}

						function f(n, e, u, a, c) {
							var s, f, p, $, d, v;
							if (s = r === u ? o : V(o, new I(Jt(u), o.$attr)), f = s.$$element, U) {
								var g = /^\s*([@=&])\s*(\w*)\s*$/,
									y = e.$parent || e;
								i(U.scope, function(n, t) {
									var r, i, o, u = n.match(g) || [],
										a = u[2] || t,
										c = u[1];
									switch (e.$$isolateBindings[t] = c + a, c) {
										case "@":
											s.$observe(a, function(n) {
												e[t] = n
											}), s.$$observers[a].$$scope = y;
											break;
										case "=":
											i = m(s[a]), o = i.assign || function() {
												throw r = e[t] = i(y), Error(wr + s[a] + " (directive: " + U.name + ")")
											}, r = e[t] = i(y), e.$watch(function() {
												var n = i(y);
												return n !== e[t] && (n !== r ? r = e[t] = n : o(y, n = r = e[t])), n
											});
											break;
										case "&":
											i = m(s[a]), e[t] = function(n) {
												return i(y, n)
											};
											break;
										default:
											throw Error("Invalid isolate scope definition for directive " + U.name + ": " + n)
									}
								})
							}
							for (b && i(b, function(n) {
								var t = {
									$scope: e,
									$element: f,
									$attrs: s,
									$transclude: c
								};
								v = n.controller, "@" == v && (v = s[n.name]), f.data("$" + n.name + "Controller", w(v, t))
							}), p = 0, $ = k.length; $ > p; p++) try {
								d = k[p], d(e, f, s, d.require && l(d.require, f))
							} catch (x) {
								h(x, F(f))
							}
							for (n && n(e, u.childNodes, t, c), p = 0, $ = N.length; $ > p; p++) try {
								d = N[p], d(e, f, s, d.require && l(d.require, f))
							} catch (x) {
								h(x, F(f))
							}
						}
						for (var p, $, d, v, b, S, M, O = -Number.MAX_VALUE, k = [], N = [], q = null, U = null, D = null, L = o.$$element = Jt(r), _ = u, B = 0, X = n.length; X > B && (p = n[B], d = t, !(O > p.priority)); B++) {
							if ((M = p.scope) && (R("isolated scope", U, p, L), g(M) && (A(L, "ng-isolate-scope"), U = p), A(L, "ng-scope"), q = q || p), $ = p.name, (M = p.controller) && (b = b || {}, R("'" + $ + "' controller", b[$], p, L), b[$] = p), (M = p.transclude) && (R("transclusion", v, p, L), v = p, O = p.priority, "element" == M ? (d = Jt(r), L = o.$$element = Jt(e.createComment(" " + $ + ": " + o[$] + " ")), r = L[0], H(a, Jt(d[0]), r), _ = E(d, u, O)) : (d = Jt(ce(r)).contents(), L.html(""), _ = E(d, u))), M = p.template)
								if (R("template", D, p, L), D = p, M = z(M), p.replace) {
									if (d = Jt("<div>" + rr(M) + "</div>").contents(), r = d[0], 1 != d.length || 1 !== r.nodeType) throw new Error(s + M);
									H(a, L, r);
									var J = {
										$attr: {}
									};
									n = n.concat(T(r, n.splice(B + 1, n.length - (B + 1)), J)), j(o, J), X = n.length
								} else L.html(M);
							if (p.templateUrl) R("template", D, p, L), D = p, f = P(n.splice(B, n.length - B), f, L, o, a, p.replace, _), X = n.length;
							else if (p.compile) try {
								S = p.compile(L, o, _), C(S) ? c(null, S) : S && c(S.pre, S.post)
							} catch (K) {
								h(K, F(L))
							}
							p.terminal && (f.terminal = !0, O = Math.max(O, p.priority))
						}
						return f.scope = q && q.scope, f.transclude = v && _, f
					}

					function k(e, i, u, a) {
						var c = !1;
						if (r.hasOwnProperty(i))
							for (var s, l = n.get(i + o), f = 0, p = l.length; p > f; f++) try {
								s = l[f], (a === t || a > s.priority) && -1 != s.restrict.indexOf(u) && (e.push(s), c = !0)
							} catch ($) {
								h($)
							}
						return c
					}

					function j(n, e) {
						var t = e.$attr,
							r = n.$attr,
							o = n.$$element;
						i(n, function(r, i) {
							"$" != i.charAt(0) && (e[i] && (r += ("style" === i ? ";" : " ") + e[i]), n.$set(i, r, !0, t[i]))
						}), i(e, function(e, i) {
							"class" == i ? (A(o, e), n["class"] = (n["class"] ? n["class"] + " " : "") + e) : "style" == i ? o.attr("style", o.attr("style") + ";" + e) : "$" == i.charAt(0) || n.hasOwnProperty(i) || (n[i] = e, r[i] = t[i])
						})
					}

					function P(n, e, t, r, i, o, u) {
						var a, c, f = [],
							h = t[0],
							$ = n.shift(),
							d = l({}, $, {
								controller: null,
								templateUrl: null,
								transclude: null,
								scope: null
							});
						return t.html(""), p.get($.templateUrl, {
							cache: v
						}).success(function(l) {
							var p, $, v;
							if (l = z(l), o) {
								if (v = Jt("<div>" + rr(l) + "</div>").contents(), p = v[0], 1 != v.length || 1 !== p.nodeType) throw new Error(s + l);
								$ = {
									$attr: {}
								}, H(i, t, p), T(p, n, $), j(r, $)
							} else p = h, t.html(l);
							for (n.unshift(d), a = O(n, p, r, u), c = M(t[0].childNodes, u); f.length;) {
								var m = f.pop(),
									g = f.pop(),
									y = f.pop(),
									w = f.pop(),
									b = p;
								y !== h && (b = ce(p), H(g, Jt(y), b)), a(function() {
									e(c, w, b, i, m)
								}, w, b, i, m)
							}
							f = null
						}).error(function(n, e, t, r) {
							throw Error("Failed to load template: " + r.url)
						}),

						function(n, t, r, i, o) {
							f ? (f.push(t), f.push(r), f.push(i), f.push(o)) : a(function() {
								e(c, t, r, i, o)
							}, t, r, i, o)
						}
					}

					function N(n, e) {
						return e.priority - n.priority
					}

					function R(n, e, t, r) {
						if (e) throw Error("Multiple directives [" + e.name + ", " + t.name + "] asking for " + n + " on: " + F(r))
					}

					function q(n, e) {
						var t = a(e, !0);
						t && n.push({
							priority: 0,
							compile: d(function(n, e) {
								var r = e.parent(),
									i = r.data("$binding") || [];
								i.push(t), A(r.data("$binding", i), "ng-binding"), n.$watch(t, function(n) {
									e[0].nodeValue = n
								})
							})
						})
					}

					function U(n, e, r, i) {
						var o = a(r, !0);
						o && e.push({
							priority: 100,
							compile: d(function(n, e, r) {
								var u = r.$$observers || (r.$$observers = {});
								"class" === i && (o = a(r[i], !0)), r[i] = t, (u[i] || (u[i] = [])).$$inter = !0, (r.$$observers && r.$$observers[i].$$scope || n).$watch(o, function(n) {
									r.$set(i, n)
								})
							})
						})
					}

					function H(n, e, t) {
						var r, i, o = e[0],
							u = o.parentNode;
						if (n)
							for (r = 0, i = n.length; i > r; r++)
								if (n[r] == o) {
									n[r] = t;
									break
								}
						u && u.replaceChild(t, o), t[Jt.expando] = o[Jt.expando], e[0] = t
					}
					var I = function(n, e) {
						this.$$element = n, this.$attr = e || {}
					};
					I.prototype = {
						$normalize: Ne,
						$set: function(n, e, r, o) {
							var u, a = we(this.$$element[0], n),
								c = this.$$observers;
							a && (this.$$element.prop(n, e), o = a), this[n] = e, o ? this.$attr[n] = o : (o = this.$attr[n], o || (this.$attr[n] = o = Y(n, "-"))), "A" === Zt(this.$$element[0]) && "href" === n && (L.setAttribute("href", e), u = L.href, "" === u || u.match(f) || (this[n] = e = "unsafe:" + u)), r !== !1 && (null === e || e === t ? this.$$element.removeAttr(o) : this.$$element.attr(o, e)), c && i(c[n], function(n) {
								try {
									n(e)
								} catch (t) {
									h(t)
								}
							})
						},
						$observe: function(n, e) {
							var t = this,
								r = t.$$observers || (t.$$observers = {}),
								i = r[n] || (r[n] = []);
							return i.push(e), b.$evalAsync(function() {
								i.$$inter || e(t[n])
							}), e
						}
					};
					var L = S[0].createElement("a"),
						_ = a.startSymbol(),
						B = a.endSymbol(),
						z = "{{" == _ || "}}" == B ? $ : function(n) {
							return n.replace(/\{\{/g, _).replace(/}}/g, B)
					};
					return E
				}
			]
		}

		function Ne(n) {
			return oe(n.replace(br, ""))
		}

		function Ve() {
			var n = {};
			this.register = function(e, t) {
				g(e) ? l(n, e) : n[e] = t
			}, this.$get = ["$injector", "$window",
				function(e, t) {
					return function(r, i) {
						if (y(r)) {
							var o = r;
							r = n.hasOwnProperty(o) ? n[o] : ee(i.$scope, o, !0) || ee(t, o, !0), ne(r, o, !0)
						}
						return e.instantiate(r, i)
					}
				}
			]
		}

		function Re() {
			this.$get = ["$window",
				function(n) {
					return Jt(n.document)
				}
			]
		}

		function qe() {
			this.$get = ["$log",
				function(n) {
					return function() {
						n.error.apply(n, arguments)
					}
				}
			]
		}

		function Ue() {
			var n = "{{",
				e = "}}";
			this.startSymbol = function(e) {
				return e ? (n = e, this) : n
			}, this.endSymbol = function(n) {
				return n ? (e = n, this) : e
			}, this.$get = ["$parse",
				function(r) {
					function i(i, a) {
						for (var c, s, l, f, h = 0, p = [], $ = i.length, d = !1, v = []; $ > h;) - 1 != (c = i.indexOf(n, h)) && -1 != (s = i.indexOf(e, c + o)) ? (h != c && p.push(i.substring(h, c)), p.push(l = r(f = i.substring(c + o, s))), l.exp = f, h = s + u, d = !0) : (h != $ && p.push(i.substring(h)), h = $);
						return ($ = p.length) || (p.push(""), $ = 1), !a || d ? (v.length = $, l = function(n) {
							for (var e, r = 0, i = $; i > r; r++) "function" == typeof(e = p[r]) && (e = e(n), null == e || e == t ? e = "" : "string" != typeof e && (e = I(e))), v[r] = e;
							return v.join("")
						}, l.exp = i, l.parts = p, l) : void 0
					}
					var o = n.length,
						u = e.length;
					return i.startSymbol = function() {
						return n
					}, i.endSymbol = function() {
						return e
					}, i
				}
			]
		}

		function De(n) {
			for (var e = n.split("/"), t = e.length; t--;) e[t] = J(e[t]);
			return e.join("/")
		}

		function He(n, e) {
			var t = xr.exec(n);
			return t = {
				protocol: t[1],
				host: t[3],
				port: f(t[5]) || Er[t[1]] || null,
				path: t[6] || "/",
				search: t[8],
				hash: t[10]
			}, e && (e.$$protocol = t.protocol, e.$$host = t.host, e.$$port = t.port), t
		}

		function Ie(n, e, t) {
			return n + "://" + e + (t == Er[n] ? "" : ":" + t)
		}

		function Le(n) {
			return n.substr(0, n.lastIndexOf("/"))
		}

		function _e(n, e, t) {
			var r = He(n);
			return decodeURIComponent(r.path) != e || v(r.hash) || 0 !== r.hash.indexOf(t) ? n : Ie(r.protocol, r.host, r.port) + Le(e) + r.hash.substr(t.length)
		}

		function Fe(n, e, t) {
			var r = He(n);
			if (decodeURIComponent(r.path) != e || v(r.hash) || 0 !== r.hash.indexOf(t)) {
				var i = r.search && "?" + r.search || "",
					o = r.hash && "#" + r.hash || "",
					u = Le(e),
					a = r.path.substr(u.length);
				if (0 !== r.path.indexOf(u)) throw Error('Invalid url "' + n + '", missing path prefix "' + u + '" !');
				return Ie(r.protocol, r.host, r.port) + e + "#" + t + a + i + o
			}
			return n
		}

		function Be(n, e, t) {
			e = e || "", this.$$parse = function(n) {
				var t = He(n, this);
				if (0 !== t.path.indexOf(e)) throw Error('Invalid url "' + n + '", missing path prefix "' + e + '" !');
				this.$$path = decodeURIComponent(t.path.substr(e.length)), this.$$search = z(t.search), this.$$hash = t.hash && decodeURIComponent(t.hash) || "", this.$$compose()
			}, this.$$compose = function() {
				var n = X(this.$$search),
					t = this.$$hash ? "#" + J(this.$$hash) : "";
				this.$$url = De(this.$$path) + (n ? "?" + n : "") + t, this.$$absUrl = Ie(this.$$protocol, this.$$host, this.$$port) + e + this.$$url
			}, this.$$rewriteAppUrl = function(n) {
				return 0 == n.indexOf(t) ? n : void 0
			}, this.$$parse(n)
		}

		function ze(n, e, t) {
			var r;
			this.$$parse = function(n) {
				var t = He(n, this);
				if (t.hash && 0 !== t.hash.indexOf(e)) throw Error('Invalid url "' + n + '", missing hash prefix "' + e + '" !');
				r = t.path + (t.search ? "?" + t.search : ""), t = Sr.exec((t.hash || "").substr(e.length)), this.$$path = t[1] ? ("/" == t[1].charAt(0) ? "" : "/") + decodeURIComponent(t[1]) : "", this.$$search = z(t[3]), this.$$hash = t[5] && decodeURIComponent(t[5]) || "", this.$$compose()
			}, this.$$compose = function() {
				var n = X(this.$$search),
					t = this.$$hash ? "#" + J(this.$$hash) : "";
				this.$$url = De(this.$$path) + (n ? "?" + n : "") + t, this.$$absUrl = Ie(this.$$protocol, this.$$host, this.$$port) + r + (this.$$url ? "#" + e + this.$$url : "")
			}, this.$$rewriteAppUrl = function(n) {
				return 0 == n.indexOf(t) ? n : void 0
			}, this.$$parse(n)
		}

		function Xe(n, e, t, r) {
			ze.apply(this, arguments), this.$$rewriteAppUrl = function(n) {
				return 0 == n.indexOf(t) ? t + r + "#" + e + n.substr(t.length) : void 0
			}
		}

		function Je(n) {
			return function() {
				return this[n]
			}
		}

		function Ke(n, e) {
			return function(t) {
				return v(t) ? this[n] : (this[n] = e(t), this.$$compose(), this)
			}
		}

		function We() {
			var e = "",
				t = !1;
			this.hashPrefix = function(n) {
				return m(n) ? (e = n, this) : e
			}, this.html5Mode = function(n) {
				return m(n) ? (t = n, this) : t
			}, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement",
				function(r, i, o, u) {
					function a(n) {
						r.$broadcast("$locationChangeSuccess", c.absUrl(), n)
					}
					var c, s, l, f, h = i.url(),
						p = He(h);
					t ? (s = i.baseHref() || "/", l = Le(s), f = Ie(p.protocol, p.host, p.port) + l + "/", c = o.history ? new Be(_e(h, s, e), l, f) : new Xe(Fe(h, s, e), e, f, s.substr(l.length + 1))) : (f = Ie(p.protocol, p.host, p.port) + (p.path || "") + (p.search ? "?" + p.search : "") + "#" + e + "/", c = new ze(h, e, f)), u.bind("click", function(e) {
						if (!e.ctrlKey && !e.metaKey && 2 != e.which) {
							for (var t = Jt(e.target);
								"a" !== Ft(t[0].nodeName);)
								if (t[0] === u[0] || !(t = t.parent())[0]) return;
							var i = t.prop("href"),
								o = c.$$rewriteAppUrl(i);
							i && !t.attr("target") && o && (c.$$parse(o), r.$apply(), e.preventDefault(), n.angular["ff-684208-preventDefault"] = !0)
						}
					}), c.absUrl() != h && i.url(c.absUrl(), !0), i.onUrlChange(function(n) {
						if (c.absUrl() != n) {
							if (r.$broadcast("$locationChangeStart", n, c.absUrl()).defaultPrevented) return void i.url(c.absUrl());
							r.$evalAsync(function() {
								var e = c.absUrl();
								c.$$parse(n), a(e)
							}), r.$$phase || r.$digest()
						}
					});
					var $ = 0;
					return r.$watch(function() {
						var n = i.url(),
							e = c.$$replace;
						return $ && n == c.absUrl() || ($++, r.$evalAsync(function() {
							r.$broadcast("$locationChangeStart", c.absUrl(), n).defaultPrevented ? c.$$parse(n) : (i.url(c.absUrl(), e), a(n))
						})), c.$$replace = !1, $
					}), c
				}
			]
		}

		function Ze() {
			this.$get = ["$window",
				function(n) {
					function e(n) {
						return n instanceof Error && (n.stack ? n = n.message && -1 === n.stack.indexOf(n.message) ? "Error: " + n.message + "\n" + n.stack : n.stack : n.sourceURL && (n = n.message + "\n" + n.sourceURL + ":" + n.line)), n
					}

					function t(t) {
						var r = n.console || {}, o = r[t] || r.log || p;
						return o.apply ? function() {
							var n = [];
							return i(arguments, function(t) {
								n.push(e(t))
							}), o.apply(r, n)
						} : function(n, e) {
							o(n, e)
						}
					}
					return {
						log: t("log"),
						warn: t("warn"),
						info: t("info"),
						error: t("error")
					}
				}
			]
		}

		function Ye(n, e) {
			function t(n) {
				return -1 != n.indexOf(d)
			}

			function r(n) {
				return -1 != n.indexOf(w)
			}

			function i() {
				return g + 1 < n.length ? n.charAt(g + 1) : !1
			}

			function o(n) {
				return n >= "0" && "9" >= n
			}

			function u(n) {
				return " " == n || "\r" == n || "	" == n || "\n" == n || "" == n || " " == n
			}

			function a(n) {
				return n >= "a" && "z" >= n || n >= "A" && "Z" >= n || "_" == n || "$" == n
			}

			function c(n) {
				return "-" == n || "+" == n || o(n)
			}

			function s(e, t, r) {
				throw r = r || g, Error("Lexer Error: " + e + " at column" + (m(t) ? "s " + t + "-" + g + " [" + n.substring(t, r) + "]" : " " + r) + " in expression [" + n + "].")
			}

			function f() {
				for (var e = "", t = g; g < n.length;) {
					var r = Ft(n.charAt(g));
					if ("." == r || o(r)) e += r;
					else {
						var u = i();
						if ("e" == r && c(u)) e += r;
						else if (c(r) && u && o(u) && "e" == e.charAt(e.length - 1)) e += r;
						else {
							if (!c(r) || u && o(u) || "e" != e.charAt(e.length - 1)) break;
							s("Invalid exponent")
						}
					}
					g++
				}
				e = 1 * e, v.push({
					index: t,
					text: e,
					json: !0,
					fn: function() {
						return e
					}
				})
			}

			function h() {
				for (var t, r, i, c, s = "", f = g; g < n.length && (c = n.charAt(g), "." == c || a(c) || o(c));) "." == c && (t = g), s += c, g++;
				if (t)
					for (r = g; r < n.length;) {
						if (c = n.charAt(r), "(" == c) {
							i = s.substr(t - f + 1), s = s.substr(0, t - f), g = r;
							break
						}
						if (!u(c)) break;
						r++
					}
				var h = {
					index: f,
					text: s
				};
				if (Ar.hasOwnProperty(s)) h.fn = h.json = Ar[s];
				else {
					var p = et(s, e);
					h.fn = l(function(n, e) {
						return p(n, e)
					}, {
						assign: function(n, e) {
							return Qe(n, s, e)
						}
					})
				}
				v.push(h), i && (v.push({
					index: t,
					text: ".",
					json: !1
				}), v.push({
					index: t + 1,
					text: i,
					json: !1
				}))
			}

			function p(e) {
				var t = g;
				g++;
				for (var r = "", i = e, o = !1; g < n.length;) {
					var u = n.charAt(g);
					if (i += u, o) {
						if ("u" == u) {
							var a = n.substring(g + 1, g + 5);
							a.match(/[\da-f]{4}/i) || s("Invalid unicode escape [\\u" + a + "]"), g += 4, r += String.fromCharCode(parseInt(a, 16))
						} else {
							var c = Mr[u];
							r += c ? c : u
						}
						o = !1
					} else if ("\\" == u) o = !0;
					else {
						if (u == e) return g++, void v.push({
							index: t,
							text: i,
							string: r,
							json: !0,
							fn: function() {
								return r
							}
						});
						r += u
					}
					g++
				}
				s("Unterminated quote", t)
			}
			for (var $, d, v = [], g = 0, y = [], w = ":"; g < n.length;) {
				if (d = n.charAt(g), t("\"'")) p(d);
				else if (o(d) || t(".") && o(i())) f();
				else if (a(d)) h(), r("{,") && "{" == y[0] && ($ = v[v.length - 1]) && ($.json = -1 == $.text.indexOf("."));
				else if (t("(){}[].,;:")) v.push({
					index: g,
					text: d,
					json: r(":[,") && t("{[") || t("}]:,")
				}), t("{[") && y.unshift(d), t("}]") && y.shift(), g++;
				else {
					if (u(d)) {
						g++;
						continue
					}
					var b = d + i(),
						x = Ar[d],
						C = Ar[b];
					C ? (v.push({
						index: g,
						text: b,
						fn: C
					}), g += 2) : x ? (v.push({
						index: g,
						text: d,
						fn: x,
						json: r("[,:") && t("+-")
					}), g += 1) : s("Unexpected next character ", g, g + 1)
				}
				w = d
			}
			return v
		}

		function Ge(n, e, r, i) {
			function o(e, t) {
				throw Error("Syntax Error: Token '" + t.text + "' " + e + " at column " + (t.index + 1) + " of the expression [" + n + "] starting at [" + n.substring(t.index) + "].")
			}

			function u() {
				if (0 === R.length) throw Error("Unexpected end of expression: " + n);
				return R[0]
			}

			function a(n, e, t, r) {
				if (R.length > 0) {
					var i = R[0],
						o = i.text;
					if (o == n || o == e || o == t || o == r || !n && !e && !t && !r) return i
				}
				return !1
			}

			function c(n, t, r, i) {
				var u = a(n, t, r, i);
				return u ? (e && !u.json && o("is not valid json", u), R.shift(), u) : !1
			}

			function s(n) {
				c(n) || o("is unexpected, expecting [" + n + "]", a())
			}

			function f(n, e) {
				return function(t, r) {
					return n(t, r, e)
				}
			}

			function h(n, e, t) {
				return function(r, i) {
					return e(r, i, n, t)
				}
			}

			function $() {
				for (var n = [];;)
					if (R.length > 0 && !a("}", ")", ";", "]") && n.push(I()), !c(";")) return 1 == n.length ? n[0] : function(e, t) {
						for (var r, i = 0; i < n.length; i++) {
							var o = n[i];
							o && (r = o(e, t))
						}
						return r
					}
			}

			function v() {
				for (var n, e = g();;) {
					if (!(n = c("|"))) return e;
					e = h(e, n.fn, m())
				}
			}

			function m() {
				for (var n = c(), e = r(n.text), t = [];;) {
					if (!(n = c(":"))) {
						var i = function(n, r, i) {
							for (var o = [i], u = 0; u < t.length; u++) o.push(t[u](n, r));
							return e.apply(n, o)
						};
						return function() {
							return i
						}
					}
					t.push(g())
				}
			}

			function g() {
				return q()
			}

			function y() {
				var e, t, r = w();
				return (t = c("=")) ? (r.assign || o("implies assignment but [" + n.substring(0, t.index) + "] can not be assigned to", t), e = w(), function(n, t) {
					return r.assign(n, e(n, t), t)
				}) : r
			}

			function w() {
				for (var n, e = b();;) {
					if (!(n = c("||"))) return e;
					e = h(e, n.fn, b())
				}
			}

			function b() {
				var n, e = x();
				return (n = c("&&")) && (e = h(e, n.fn, b())), e
			}

			function x() {
				var n, e = C();
				return (n = c("==", "!=")) && (e = h(e, n.fn, x())), e
			}

			function C() {
				var n, e = S();
				return (n = c("<", ">", "<=", ">=")) && (e = h(e, n.fn, C())), e
			}

			function S() {
				for (var n, e = E(); n = c("+", "-");) e = h(e, n.fn, E());
				return e
			}

			function E() {
				for (var n, e = A(); n = c("*", "/", "%");) e = h(e, n.fn, A());
				return e
			}

			function A() {
				var n;
				return c("+") ? M() : (n = c("-")) ? h(V, n.fn, A()) : (n = c("!")) ? f(n.fn, A()) : M()
			}

			function M() {
				var n;
				if (c("(")) n = I(), s(")");
				else if (c("[")) n = j();
				else if (c("{")) n = P();
				else {
					var e = c();
					n = e.fn, n || o("not a primary expression", e)
				}
				for (var t, r; t = c("(", "[", ".");) "(" === t.text ? (n = U(n, r), r = null) : "[" === t.text ? (r = n, n = H(n)) : "." === t.text ? (r = n, n = D(n)) : o("IMPOSSIBLE");
				return n
			}

			function T(n) {
				var e = c().text,
					t = et(e, i);
				return l(function(e, r, i) {
					return t(i || n(e, r), r)
				}, {
					assign: function(t, r, i) {
						return Qe(n(t, i), e, r)
					}
				})
			}

			function O(n) {
				var e = g();
				return s("]"), l(function(r, i) {
					var o, u, a = n(r, i),
						c = e(r, i);
					return a ? (o = a[c], o && o.then && (u = o, "$$v" in o || (u.$$v = t, u.then(function(n) {
						u.$$v = n
					})), o = o.$$v), o) : t
				}, {
					assign: function(t, r, i) {
						return n(t, i)[e(t, i)] = r
					}
				})
			}

			function k(n, e) {
				var t = [];
				if (")" != u().text)
					do t.push(g()); while (c(","));
				return s(")"),

				function(r, i) {
					for (var o = [], u = e ? e(r, i) : r, a = 0; a < t.length; a++) o.push(t[a](r, i));
					var c = n(r, i, u) || p;
					return c.apply ? c.apply(u, o) : c(o[0], o[1], o[2], o[3], o[4])
				}
			}

			function j() {
				var n = [];
				if ("]" != u().text)
					do n.push(g()); while (c(","));
				return s("]"),

				function(e, t) {
					for (var r = [], i = 0; i < n.length; i++) r.push(n[i](e, t));
					return r
				}
			}

			function P() {
				var n = [];
				if ("}" != u().text)
					do {
						var e = c(),
							t = e.string || e.text;
						s(":");
						var r = g();
						n.push({
							key: t,
							value: r
						})
					} while (c(","));
				return s("}"),

				function(e, t) {
					for (var r = {}, i = 0; i < n.length; i++) {
						var o = n[i];
						r[o.key] = o.value(e, t)
					}
					return r
				}
			}
			var N, V = d(0),
				R = Ye(n, i),
				q = y,
				U = k,
				D = T,
				H = O,
				I = v;
			return e ? (q = w, U = D = H = I = function() {
				o("is not valid json", {
					text: n,
					index: 0
				})
			}, N = M()) : N = $(), 0 !== R.length && o("is an unexpected token", R[0]), N
		}

		function Qe(n, e, t) {
			for (var r = e.split("."), i = 0; r.length > 1; i++) {
				var o = r.shift(),
					u = n[o];
				u || (u = {}, n[o] = u), n = u
			}
			return n[r.shift()] = t, t
		}

		function nt(n, e, r, i, o) {
			return function(u, a) {
				var c, s = a && a.hasOwnProperty(n) ? a : u;
				return null === s || s === t ? s : (s = s[n], s && s.then && ("$$v" in s || (c = s, c.$$v = t, c.then(function(n) {
					c.$$v = n
				})), s = s.$$v), e && null !== s && s !== t ? (s = s[e], s && s.then && ("$$v" in s || (c = s, c.$$v = t, c.then(function(n) {
					c.$$v = n
				})), s = s.$$v), r && null !== s && s !== t ? (s = s[r], s && s.then && ("$$v" in s || (c = s, c.$$v = t, c.then(function(n) {
					c.$$v = n
				})), s = s.$$v), i && null !== s && s !== t ? (s = s[i], s && s.then && ("$$v" in s || (c = s, c.$$v = t, c.then(function(n) {
					c.$$v = n
				})), s = s.$$v), o && null !== s && s !== t ? (s = s[o], s && s.then && ("$$v" in s || (c = s, c.$$v = t, c.then(function(n) {
					c.$$v = n
				})), s = s.$$v), s) : s) : s) : s) : s)
			}
		}

		function et(n, e) {
			if (Tr.hasOwnProperty(n)) return Tr[n];
			var r, o = n.split("."),
				u = o.length;
			if (e) r = 6 > u ? nt(o[0], o[1], o[2], o[3], o[4]) : function(n, e) {
				var r, i = 0;
				do r = nt(o[i++], o[i++], o[i++], o[i++], o[i++])(n, e), e = t, n = r; while (u > i);
				return r
			};
			else {
				var a = "var l, fn, p;\n";
				i(o, function(n, e) {
					a += "if(s === null || s === undefined) return s;\nl=s;\ns=" + (e ? "s" : '((k&&k.hasOwnProperty("' + n + '"))?k:s)') + '["' + n + '"];\nif (s && s.then) {\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n'
				}), a += "return s;", r = Function("s", "k", a), r.toString = function() {
					return a
				}
			}
			return Tr[n] = r
		}

		function tt() {
			var n = {};
			this.$get = ["$filter", "$sniffer",
				function(e, t) {
					return function(r) {
						switch (typeof r) {
							case "string":
								return n.hasOwnProperty(r) ? n[r] : n[r] = Ge(r, !1, e, t.csp);
							case "function":
								return r;
							default:
								return p
						}
					}
				}
			]
		}

		function rt() {
			this.$get = ["$rootScope", "$exceptionHandler",
				function(n, e) {
					return it(function(e) {
						n.$evalAsync(e)
					}, e)
				}
			]
		}

		function it(n, e) {
			function r(n) {
				return n
			}

			function o(n) {
				return s(n)
			}

			function u(n) {
				var e = a(),
					t = n.length,
					r = [];
				return t ? i(n, function(n, i) {
					c(n).then(function(n) {
						i in r || (r[i] = n, --t || e.resolve(r))
					}, function(n) {
						i in r || e.reject(n)
					})
				}) : e.resolve(r), e.promise
			}
			var a = function() {
				var i, u, l = [];
				return u = {
					resolve: function(e) {
						if (l) {
							var r = l;
							l = t, i = c(e), r.length && n(function() {
								for (var n, e = 0, t = r.length; t > e; e++) n = r[e], i.then(n[0], n[1])
							})
						}
					},
					reject: function(n) {
						u.resolve(s(n))
					},
					promise: {
						then: function(n, t) {
							var u = a(),
								c = function(t) {
									try {
										u.resolve((n || r)(t))
									} catch (i) {
										u.reject(i), e(i)
									}
								}, s = function(n) {
									try {
										u.resolve((t || o)(n))
									} catch (r) {
										u.reject(r), e(r)
									}
								};
							return l ? l.push([c, s]) : i.then(c, s), u.promise
						}
					}
				}
			}, c = function(e) {
					return e && e.then ? e : {
						then: function(t) {
							var r = a();
							return n(function() {
								r.resolve(t(e))
							}), r.promise
						}
					}
				}, s = function(e) {
					return {
						then: function(t, r) {
							var i = a();
							return n(function() {
								i.resolve((r || o)(e))
							}), i.promise
						}
					}
				}, l = function(t, i, u) {
					var l, f = a(),
						h = function(n) {
							try {
								return (i || r)(n)
							} catch (t) {
								return e(t), s(t)
							}
						}, p = function(n) {
							try {
								return (u || o)(n)
							} catch (t) {
								return e(t), s(t)
							}
						};
					return n(function() {
						c(t).then(function(n) {
							l || (l = !0, f.resolve(c(n).then(h, p)))
						}, function(n) {
							l || (l = !0, f.resolve(p(n)))
						})
					}), f.promise
				};
			return {
				defer: a,
				reject: s,
				when: l,
				all: u
			}
		}

		function ot() {
			var n = {};
			this.when = function(e, t) {
				if (n[e] = l({
					reloadOnSearch: !0
				}, t), e) {
					var r = "/" == e[e.length - 1] ? e.substr(0, e.length - 1) : e + "/";
					n[r] = {
						redirectTo: e
					}
				}
				return this
			}, this.otherwise = function(n) {
				return this.when(null, n), this
			}, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache",
				function(e, t, r, o, u, a, c) {
					function s(n, e) {
						e = "^" + e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$";
						for (var t, r = "", o = [], u = {}, a = /:(\w+)/g, c = 0; null !== (t = a.exec(e));) r += e.slice(c, t.index), r += "([^\\/]*)", o.push(t[1]), c = a.lastIndex;
						r += e.substr(c);
						var s = n.match(new RegExp(r));
						return s && i(o, function(n, e) {
							u[n] = s[e + 1]
						}), s ? u : null
					}

					function f() {
						var n = p(),
							s = v.current;
						n && s && n.$$route === s.$$route && R(n.pathParams, s.pathParams) && !n.reloadOnSearch && !d ? (s.params = n.params, N(s.params, r), e.$broadcast("$routeUpdate", s)) : (n || s) && (d = !1, e.$broadcast("$routeChangeStart", n, s), v.current = n, n && n.redirectTo && (y(n.redirectTo) ? t.path($(n.redirectTo, n.params)).search(n.params).replace() : t.url(n.redirectTo(n.pathParams, t.path(), t.search())).replace()), o.when(n).then(function() {
							if (n) {
								var e, t = [],
									r = [];
								return i(n.resolve || {}, function(n, e) {
									t.push(e), r.push(y(n) ? u.get(n) : u.invoke(n))
								}), m(e = n.template) || m(e = n.templateUrl) && (e = a.get(e, {
									cache: c
								}).then(function(n) {
									return n.data
								})), m(e) && (t.push("$template"), r.push(e)), o.all(r).then(function(n) {
									var e = {};
									return i(n, function(n, r) {
										e[t[r]] = n
									}), e
								})
							}
						}).then(function(t) {
							n == v.current && (n && (n.locals = t, N(n.params, r)), e.$broadcast("$routeChangeSuccess", n, s))
						}, function(t) {
							n == v.current && e.$broadcast("$routeChangeError", n, s, t)
						}))
					}

					function p() {
						var e, r;
						return i(n, function(n, i) {
							!r && (e = s(t.path(), i)) && (r = h(n, {
								params: l({}, t.search(), e),
								pathParams: e
							}), r.$$route = n)
						}), r || n[null] && h(n[null], {
							params: {},
							pathParams: {}
						})
					}

					function $(n, e) {
						var t = [];
						return i((n || "").split(":"), function(n, r) {
							if (0 == r) t.push(n);
							else {
								var i = n.match(/(\w+)(.*)/),
									o = i[1];
								t.push(e[o]), t.push(i[2] || ""), delete e[o]
							}
						}), t.join("")
					}
					var d = !1,
						v = {
							routes: n,
							reload: function() {
								d = !0, e.$evalAsync(f)
							}
						};
					return e.$on("$locationChangeSuccess", f), v
				}
			]
		}

		function ut() {
			this.$get = d({})
		}

		function at() {
			var n = 10;
			this.digestTtl = function(e) {
				return arguments.length && (n = e), n
			}, this.$get = ["$injector", "$exceptionHandler", "$parse",
				function(e, t, r) {
					function i() {
						this.$id = c(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$listeners = {}, this.$$isolateBindings = {}
					}

					function o(n) {
						if (l.$$phase) throw Error(l.$$phase + " already in progress");
						l.$$phase = n
					}

					function u() {
						l.$$phase = null
					}

					function a(n, e) {
						var t = r(n);
						return ne(t, e), t
					}

					function s() {}
					i.prototype = {
						$new: function(n) {
							var e, t;
							if (C(n)) throw Error("API-CHANGE: Use $controller to instantiate controllers.");
							return n ? (t = new i, t.$root = this.$root) : (e = function() {}, e.prototype = this, t = new e, t.$id = c()), t["this"] = t, t.$$listeners = {}, t.$parent = this, t.$$asyncQueue = [], t.$$watchers = t.$$nextSibling = t.$$childHead = t.$$childTail = null, t.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = t, this.$$childTail = t) : this.$$childHead = this.$$childTail = t, t
						},
						$watch: function(n, e, t) {
							var r = this,
								i = a(n, "watch"),
								o = r.$$watchers,
								u = {
									fn: e,
									last: s,
									get: i,
									exp: n,
									eq: !! t
								};
							if (!C(e)) {
								var c = a(e || p, "listener");
								u.fn = function(n, e, t) {
									c(t)
								}
							}
							return o || (o = r.$$watchers = []), o.unshift(u),

							function() {
								P(o, u)
							}
						},
						$digest: function() {
							var e, r, i, a, c, l, f, h, p, $, d, v = n,
								m = this,
								g = [];
							o("$digest");
							do {
								f = !1, p = m;
								do {
									for (c = p.$$asyncQueue; c.length;) try {
										p.$eval(c.shift())
									} catch (y) {
										t(y)
									}
									if (a = p.$$watchers)
										for (l = a.length; l--;) try {
											e = a[l], e && (r = e.get(p)) !== (i = e.last) && !(e.eq ? R(r, i) : "number" == typeof r && "number" == typeof i && isNaN(r) && isNaN(i)) && (f = !0, e.last = e.eq ? N(r) : r, e.fn(r, i === s ? r : i, p), 5 > v && ($ = 4 - v, g[$] || (g[$] = []), d = C(e.exp) ? "fn: " + (e.exp.name || e.exp.toString()) : e.exp, d += "; newVal: " + I(r) + "; oldVal: " + I(i), g[$].push(d)))
										} catch (y) {
											t(y)
										}
									if (!(h = p.$$childHead || p !== m && p.$$nextSibling))
										for (; p !== m && !(h = p.$$nextSibling);) p = p.$parent
								} while (p = h);
								if (f && !v--) throw u(), Error(n + " $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: " + I(g))
							} while (f || c.length);
							u()
						},
						$destroy: function() {
							if (l != this && !this.$$destroyed) {
								var n = this.$parent;
								this.$broadcast("$destroy"), this.$$destroyed = !0, n.$$childHead == this && (n.$$childHead = this.$$nextSibling), n.$$childTail == this && (n.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null
							}
						},
						$eval: function(n, e) {
							return r(n)(this, e)
						},
						$evalAsync: function(n) {
							this.$$asyncQueue.push(n)
						},
						$apply: function(n) {
							try {
								return o("$apply"), this.$eval(n)
							} catch (e) {
								t(e)
							} finally {
								u();
								try {
									l.$digest()
								} catch (e) {
									throw t(e), e
								}
							}
						},
						$on: function(n, e) {
							var t = this.$$listeners[n];
							return t || (this.$$listeners[n] = t = []), t.push(e),

							function() {
								t[j(t, e)] = null
							}
						},
						$emit: function(n) {
							var e, r, i, o = [],
								u = this,
								a = !1,
								c = {
									name: n,
									targetScope: u,
									stopPropagation: function() {
										a = !0
									},
									preventDefault: function() {
										c.defaultPrevented = !0
									},
									defaultPrevented: !1
								}, s = q([c], arguments, 1);
							do {
								for (e = u.$$listeners[n] || o, c.currentScope = u, r = 0, i = e.length; i > r; r++)
									if (e[r]) try {
										if (e[r].apply(null, s), a) return c
									} catch (l) {
										t(l)
									} else e.splice(r, 1), r--, i--;
								u = u.$parent
							} while (u);
							return c
						},
						$broadcast: function(n) {
							var e, r, i, o = this,
								u = o,
								a = o,
								c = {
									name: n,
									targetScope: o,
									preventDefault: function() {
										c.defaultPrevented = !0
									},
									defaultPrevented: !1
								}, s = q([c], arguments, 1);
							do {
								for (u = a, c.currentScope = u, e = u.$$listeners[n] || [], r = 0, i = e.length; i > r; r++)
									if (e[r]) try {
										e[r].apply(null, s)
									} catch (l) {
										t(l)
									} else e.splice(r, 1), r--, i--;
								if (!(a = u.$$childHead || u !== o && u.$$nextSibling))
									for (; u !== o && !(a = u.$$nextSibling);) u = u.$parent
							} while (u = a);
							return c
						}
					};
					var l = new i;
					return l
				}
			]
		}

		function ct() {
			this.$get = ["$window",
				function(n) {
					var e = {}, t = f((/android (\d+)/.exec(Ft(n.navigator.userAgent)) || [])[1]);
					return {
						history: !(!n.history || !n.history.pushState || 4 > t),
						hashchange: "onhashchange" in n && (!n.document.documentMode || n.document.documentMode > 7),
						hasEvent: function(t) {
							if ("input" == t && 9 == Yt) return !1;
							if (v(e[t])) {
								var r = n.document.createElement("div");
								e[t] = "on" + t in r
							}
							return e[t]
						},
						csp: !1
					}
				}
			]
		}

		function st() {
			this.$get = d(n)
		}

		function lt(n) {
			var e, t, r, o = {};
			return n ? (i(n.split("\n"), function(n) {
				r = n.indexOf(":"), e = Ft(rr(n.substr(0, r))), t = rr(n.substr(r + 1)), e && (o[e] ? o[e] += ", " + t : o[e] = t)
			}), o) : o
		}

		function ft(n) {
			var e = g(n) ? n : t;
			return function(t) {
				return e || (e = lt(n)), t ? e[Ft(t)] || null : e
			}
		}

		function ht(n, e, t) {
			return C(t) ? t(n, e) : (i(t, function(t) {
				n = t(n, e)
			}), n)
		}

		function pt(n) {
			return n >= 200 && 300 > n
		}

		function $t() {
			var n = /^\s*(\[|\{[^\{])/,
				e = /[\}\]]\s*$/,
				r = /^\)\]\}',?\n/,
				o = this.defaults = {
					transformResponse: [
						function(t) {
							return y(t) && (t = t.replace(r, ""), n.test(t) && e.test(t) && (t = L(t, !0))), t
						}
					],
					transformRequest: [
						function(n) {
							return g(n) && !M(n) ? I(n) : n
						}
					],
					headers: {
						common: {
							Accept: "application/json, text/plain, */*",
							"X-Requested-With": "XMLHttpRequest"
						},
						post: {
							"Content-Type": "application/json;charset=utf-8"
						},
						put: {
							"Content-Type": "application/json;charset=utf-8"
						}
					}
				}, a = this.responseInterceptors = [];
			this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector",
				function(n, e, r, c, s, f) {
					function h(n) {
						function t(n) {
							var e = l({}, n, {
								data: ht(n.data, n.headers, p)
							});
							return pt(n.status) ? e : s.reject(e)
						}
						n.method = Bt(n.method);
						var r, u, a, c, f, h = n.transformRequest || o.transformRequest,
							p = n.transformResponse || o.transformResponse,
							$ = l({}, n.headers),
							m = l({
								"X-XSRF-TOKEN": e.cookies()["XSRF-TOKEN"]
							}, o.headers.common, o.headers[Ft(n.method)]);
						n: for (u in m) {
							a = Ft(u);
							for (c in n.headers)
								if (Ft(c) === a) continue n;
							$[u] = m[u]
						}
						if (v(n.data))
							for (var g in $)
								if ("content-type" === Ft(g)) {
									delete $[g];
									break
								}
						return r = ht(n.data, ft($), h),
						f = d(n, r, $),
						f = f.then(t, t),
						i(b, function(n) {
							f = n(f)
						}),
						f.success = function(e) {
							return f.then(function(t) {
								e(t.data, t.status, t.headers, n)
							}), f
						},
						f.error = function(e) {
							return f.then(null, function(t) {
								e(t.data, t.status, t.headers, n)
							}), f
						},
						f
					}

					function p() {
						i(arguments, function(n) {
							h[n] = function(e, t) {
								return h(l(t || {}, {
									method: n,
									url: e
								}))
							}
						})
					}

					function $() {
						i(arguments, function(n) {
							h[n] = function(e, t, r) {
								return h(l(r || {}, {
									method: n,
									url: e,
									data: t
								}))
							}
						})
					}

					function d(e, t, r) {
						function i(n, e, t) {
							a && (pt(n) ? a.put($, [n, e, lt(t)]) : a.remove($)), o(e, n, t), c.$apply()
						}

						function o(n, t, r) {
							t = Math.max(t, 0), (pt(t) ? f.resolve : f.reject)({
								data: n,
								status: t,
								headers: ft(r),
								config: e
							})
						}

						function u() {
							var n = j(h.pendingRequests, e); - 1 !== n && h.pendingRequests.splice(n, 1)
						}
						var a, l, f = s.defer(),
							p = f.promise,
							$ = m(e.url, e.params);
						if (h.pendingRequests.push(e), p.then(u, u), e.cache && "GET" == e.method && (a = g(e.cache) ? e.cache : w), a)
							if (l = a.get($)) {
								if (l.then) return l.then(u, u), l;
								x(l) ? o(l[1], l[0], N(l[2])) : o(l, 200, {})
							} else a.put($, p);
						return l || n(e.method, $, t, i, r, e.timeout, e.withCredentials), p
					}

					function m(n, e) {
						if (!e) return n;
						var r = [];
						return u(e, function(n, e) {
							null != n && n != t && (g(n) && (n = I(n)), r.push(encodeURIComponent(e) + "=" + encodeURIComponent(n)))
						}), n + (-1 == n.indexOf("?") ? "?" : "&") + r.join("&")
					}
					var w = r("$http"),
						b = [];
					return i(a, function(n) {
						b.push(y(n) ? f.get(n) : f.invoke(n))
					}), h.pendingRequests = [], p("get", "delete", "head", "jsonp"), $("post", "put"), h.defaults = o, h
				}
			]
		}

		function dt() {
			this.$get = ["$browser", "$window", "$document",
				function(n, e, t) {
					return vt(n, Or, n.defer, e.angular.callbacks, t[0], e.location.protocol.replace(":", ""))
				}
			]
		}

		function vt(n, e, t, r, o, u) {
			function a(n, e) {
				var t = o.createElement("script"),
					r = function() {
						o.body.removeChild(t), e && e()
					};
				t.type = "text/javascript", t.src = n, Yt ? t.onreadystatechange = function() {
					/loaded|complete/.test(t.readyState) && r()
				} : t.onload = t.onerror = r, o.body.appendChild(t)
			}
			return function(o, c, s, l, f, h, $) {
				function d(e, t, r, i) {
					var o = (c.match(xr) || ["", u])[1];
					t = "file" == o ? r ? 200 : 404 : t, t = 1223 == t ? 204 : t, e(t, r, i), n.$$completeOutstandingRequest(p)
				}
				if (n.$$incOutstandingRequestCount(), c = c || n.url(), "jsonp" == Ft(o)) {
					var v = "_" + (r.counter++).toString(36);
					r[v] = function(n) {
						r[v].data = n
					}, a(c.replace("JSON_CALLBACK", "angular.callbacks." + v), function() {
						r[v].data ? d(l, 200, r[v].data) : d(l, -2), delete r[v]
					})
				} else {
					var m = new e;
					m.open(o, c, !0), i(f, function(n, e) {
						n && m.setRequestHeader(e, n)
					});
					var g;
					m.onreadystatechange = function() {
						if (4 == m.readyState) {
							var n = m.getAllResponseHeaders(),
								e = ["Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma"];
							n || (n = "", i(e, function(e) {
								var t = m.getResponseHeader(e);
								t && (n += e + ": " + t + "\n")
							})), d(l, g || m.status, m.responseText, n)
						}
					}, $ && (m.withCredentials = !0), m.send(s || ""), h > 0 && t(function() {
						g = -1, m.abort()
					}, h)
				}
			}
		}

		function mt() {
			this.$get = function() {
				return {
					id: "en-us",
					NUMBER_FORMATS: {
						DECIMAL_SEP: ".",
						GROUP_SEP: ",",
						PATTERNS: [{
							minInt: 1,
							minFrac: 0,
							maxFrac: 3,
							posPre: "",
							posSuf: "",
							negPre: "-",
							negSuf: "",
							gSize: 3,
							lgSize: 3
						}, {
							minInt: 1,
							minFrac: 2,
							maxFrac: 2,
							posPre: "¤",
							posSuf: "",
							negPre: "(¤",
							negSuf: ")",
							gSize: 3,
							lgSize: 3
						}],
						CURRENCY_SYM: "$"
					},
					DATETIME_FORMATS: {
						MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
						SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
						DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
						SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
						AMPMS: ["AM", "PM"],
						medium: "MMM d, y h:mm:ss a",
						"short": "M/d/yy h:mm a",
						fullDate: "EEEE, MMMM d, y",
						longDate: "MMMM d, y",
						mediumDate: "MMM d, y",
						shortDate: "M/d/yy",
						mediumTime: "h:mm:ss a",
						shortTime: "h:mm a"
					},
					pluralCat: function(n) {
						return 1 === n ? "one" : "other"
					}
				}
			}
		}

		function gt() {
			this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler",
				function(n, e, t, r) {
					function i(i, u, a) {
						var c, s = t.defer(),
							l = s.promise,
							f = m(a) && !a;
						return c = e.defer(function() {
							try {
								s.resolve(i())
							} catch (e) {
								s.reject(e), r(e)
							} finally {
								delete o[l.$$timeoutId]
							}
							f || n.$apply()
						}, u), l.$$timeoutId = c, o[c] = s, l
					}
					var o = {};
					return i.cancel = function(n) {
						return n && n.$$timeoutId in o ? (o[n.$$timeoutId].reject("canceled"), delete o[n.$$timeoutId], e.defer.cancel(n.$$timeoutId)) : !1
					}, i
				}
			]
		}

		function yt(n) {
			function e(e, r) {
				return n.factory(e + t, r)
			}
			var t = "Filter";
			this.register = e, this.$get = ["$injector",
				function(n) {
					return function(e) {
						return n.get(e + t)
					}
				}
			], e("currency", bt), e("date", Ot), e("filter", wt), e("json", kt), e("limitTo", jt), e("lowercase", Vr), e("number", xt), e("orderBy", Pt), e("uppercase", Rr)
		}

		function wt() {
			return function(n, e) {
				if (!x(n)) return n;
				var t = [];
				t.check = function(n) {
					for (var e = 0; e < t.length; e++)
						if (!t[e](n)) return !1;
					return !0
				};
				var r = function(n, e) {
					if ("!" === e.charAt(0)) return !r(n, e.substr(1));
					switch (typeof n) {
						case "boolean":
						case "number":
						case "string":
							return ("" + n).toLowerCase().indexOf(e) > -1;
						case "object":
							for (var t in n)
								if ("$" !== t.charAt(0) && r(n[t], e)) return !0;
							return !1;
						case "array":
							for (var i = 0; i < n.length; i++)
								if (r(n[i], e)) return !0;
							return !1;
						default:
							return !1
					}
				};
				switch (typeof e) {
					case "boolean":
					case "number":
					case "string":
						e = {
							$: e
						};
					case "object":
						for (var i in e) "$" == i ? ! function() {
							var n = ("" + e[i]).toLowerCase();
							n && t.push(function(e) {
								return r(e, n)
							})
						}() : ! function() {
							var n = i,
								o = ("" + e[i]).toLowerCase();
							o && t.push(function(e) {
								return r(ee(e, n), o)
							})
						}();
						break;
					case "function":
						t.push(e);
						break;
					default:
						return n
				}
				for (var o = [], u = 0; u < n.length; u++) {
					var a = n[u];
					t.check(a) && o.push(a)
				}
				return o
			}
		}

		function bt(n) {
			var e = n.NUMBER_FORMATS;
			return function(n, t) {
				return v(t) && (t = e.CURRENCY_SYM), Ct(n, e.PATTERNS[1], e.GROUP_SEP, e.DECIMAL_SEP, 2).replace(/\u00A4/g, t)
			}
		}

		function xt(n) {
			var e = n.NUMBER_FORMATS;
			return function(n, t) {
				return Ct(n, e.PATTERNS[0], e.GROUP_SEP, e.DECIMAL_SEP, t)
			}
		}

		function Ct(n, e, t, r, i) {
			if (isNaN(n) || !isFinite(n)) return "";
			var o = 0 > n;
			n = Math.abs(n);
			var u = n + "",
				a = "",
				c = [],
				s = !1;
			if (-1 !== u.indexOf("e")) {
				var l = u.match(/([\d\.]+)e(-?)(\d+)/);
				l && "-" == l[2] && l[3] > i + 1 ? u = "0" : (a = u, s = !0)
			}
			if (s) i > 0 && n > -1 && 1 > n && (a = n.toFixed(i));
			else {
				var f = (u.split(kr)[1] || "").length;
				v(i) && (i = Math.min(Math.max(e.minFrac, f), e.maxFrac));
				var h = Math.pow(10, i);
				n = Math.round(n * h) / h;
				var p = ("" + n).split(kr),
					$ = p[0];
				p = p[1] || "";
				var d = 0,
					m = e.lgSize,
					g = e.gSize;
				if ($.length >= m + g) {
					d = $.length - m;
					for (var y = 0; d > y; y++)(d - y) % g === 0 && 0 !== y && (a += t), a += $.charAt(y)
				}
				for (y = d; y < $.length; y++)($.length - y) % m === 0 && 0 !== y && (a += t), a += $.charAt(y);
				for (; p.length < i;) p += "0";
				i && "0" !== i && (a += r + p.substr(0, i))
			}
			return c.push(o ? e.negPre : e.posPre), c.push(a), c.push(o ? e.negSuf : e.posSuf), c.join("")
		}

		function St(n, e, t) {
			var r = "";
			for (0 > n && (r = "-", n = -n), n = "" + n; n.length < e;) n = "0" + n;
			return t && (n = n.substr(n.length - e)), r + n
		}

		function Et(n, e, t, r) {
			return t = t || 0,

			function(i) {
				var o = i["get" + n]();
				return (t > 0 || o > -t) && (o += t), 0 === o && -12 == t && (o = 12), St(o, e, r)
			}
		}

		function At(n, e) {
			return function(t, r) {
				var i = t["get" + n](),
					o = Bt(e ? "SHORT" + n : n);
				return r[o][i]
			}
		}

		function Mt(n) {
			var e = -1 * n.getTimezoneOffset(),
				t = e >= 0 ? "+" : "";
			return t += St(Math[e > 0 ? "floor" : "ceil"](e / 60), 2) + St(Math.abs(e % 60), 2)
		}

		function Tt(n, e) {
			return n.getHours() < 12 ? e.AMPMS[0] : e.AMPMS[1]
		}

		function Ot(n) {
			function e(n) {
				var e;
				if (e = n.match(t)) {
					var r = new Date(0),
						i = 0,
						o = 0;
					return e[9] && (i = f(e[9] + e[10]), o = f(e[9] + e[11])), r.setUTCFullYear(f(e[1]), f(e[2]) - 1, f(e[3])), r.setUTCHours(f(e[4] || 0) - i, f(e[5] || 0) - o, f(e[6] || 0), f(e[7] || 0)), r
				}
				return n
			}
			var t = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
			return function(t, r) {
				var o, u, a = "",
					c = [];
				if (r = r || "mediumDate", r = n.DATETIME_FORMATS[r] || r, y(t) && (t = Nr.test(t) ? f(t) : e(t)), w(t) && (t = new Date(t)), !b(t)) return t;
				for (; r;) u = Pr.exec(r), u ? (c = q(c, u, 1), r = c.pop()) : (c.push(r), r = null);
				return i(c, function(e) {
					o = jr[e], a += o ? o(t, n.DATETIME_FORMATS) : e.replace(/(^'|'$)/g, "").replace(/''/g, "'")
				}), a
			}
		}

		function kt() {
			return function(n) {
				return I(n, !0)
			}
		}

		function jt() {
			return function(n, e) {
				if (!(n instanceof Array)) return n;
				e = f(e);
				var t, r, i = [];
				if (!(n && n instanceof Array)) return i;
				for (e > n.length ? e = n.length : e < -n.length && (e = -n.length), e > 0 ? (t = 0, r = e) : (t = n.length + e, r = n.length); r > t; t++) i.push(n[t]);
				return i
			}
		}

		function Pt(n) {
			return function(e, t, r) {
				function i(n, e) {
					for (var r = 0; r < t.length; r++) {
						var i = t[r](n, e);
						if (0 !== i) return i
					}
					return 0
				}

				function o(n, e) {
					return _(e) ? function(e, t) {
						return n(t, e)
					} : n
				}

				function u(n, e) {
					var t = typeof n,
						r = typeof e;
					return t == r ? ("string" == t && (n = n.toLowerCase(), e = e.toLowerCase()), n === e ? 0 : e > n ? -1 : 1) : r > t ? -1 : 1
				}
				if (!x(e)) return e;
				if (!t) return e;
				t = x(t) ? t : [t], t = O(t, function(e) {
					var t = !1,
						r = e || $;
					return y(e) && (("+" == e.charAt(0) || "-" == e.charAt(0)) && (t = "-" == e.charAt(0), e = e.substring(1)), r = n(e)), o(function(n, e) {
						return u(r(n), r(e))
					}, t)
				});
				for (var a = [], c = 0; c < e.length; c++) a.push(e[c]);
				return a.sort(o(i, r))
			}
		}

		function Nt(n) {
			return C(n) && (n = {
				link: n
			}), n.restrict = n.restrict || "AC", d(n)
		}

		function Vt(n, e) {
			function t(e, t) {
				t = t ? "-" + Y(t, "-") : "", n.removeClass((e ? Kr : Jr) + t).addClass((e ? Jr : Kr) + t)
			}
			var r = this,
				o = n.parent().controller("form") || Dr,
				u = 0,
				a = r.$error = {};
			r.$name = e.name || e.ngForm, r.$dirty = !1, r.$pristine = !0, r.$valid = !0, r.$invalid = !1, o.$addControl(r), n.addClass(Wr), t(!0), r.$addControl = function(n) {
				n.$name && !r.hasOwnProperty(n.$name) && (r[n.$name] = n)
			}, r.$removeControl = function(n) {
				n.$name && r[n.$name] === n && delete r[n.$name], i(a, function(e, t) {
					r.$setValidity(t, !0, n)
				})
			}, r.$setValidity = function(n, e, i) {
				var c = a[n];
				if (e) c && (P(c, i), c.length || (u--, u || (t(e), r.$valid = !0, r.$invalid = !1), a[n] = !1, t(!0, n), o.$setValidity(n, !0, r)));
				else {
					if (u || t(e), c) {
						if (k(c, i)) return
					} else a[n] = c = [], u++, t(!1, n), o.$setValidity(n, !1, r);
					c.push(i), r.$valid = !1, r.$invalid = !0
				}
			}, r.$setDirty = function() {
				n.removeClass(Wr).addClass(Zr), r.$dirty = !0, r.$pristine = !1, o.$setDirty()
			}
		}

		function Rt(n) {
			return v(n) || "" === n || null === n || n !== n
		}

		function qt(n, e, r, i, o, u) {
			var a = function() {
				var t = rr(e.val());
				i.$viewValue !== t && n.$apply(function() {
					i.$setViewValue(t)
				})
			};
			if (o.hasEvent("input")) e.bind("input", a);
			else {
				var c, s = function() {
						c || (c = u.defer(function() {
							a(), c = null
						}))
					};
				e.bind("keydown", function(n) {
					var e = n.keyCode;
					91 === e || e > 15 && 19 > e || e >= 37 && 40 >= e || s()
				}), e.bind("change", a), o.hasEvent("paste") && e.bind("paste cut", s)
			}
			i.$render = function() {
				e.val(Rt(i.$viewValue) ? "" : i.$viewValue)
			};
			var l, h = r.ngPattern,
				p = function(n, e) {
					return Rt(e) || n.test(e) ? (i.$setValidity("pattern", !0), e) : (i.$setValidity("pattern", !1), t)
				};
			if (h && (h.match(/^\/(.*)\/$/) ? (h = new RegExp(h.substr(1, h.length - 2)), l = function(n) {
				return p(h, n)
			}) : l = function(e) {
				var t = n.$eval(h);
				if (!t || !t.test) throw new Error("Expected " + h + " to be a RegExp but was " + t);
				return p(t, e)
			}, i.$formatters.push(l), i.$parsers.push(l)), r.ngMinlength) {
				var $ = f(r.ngMinlength),
					d = function(n) {
						return !Rt(n) && n.length < $ ? (i.$setValidity("minlength", !1), t) : (i.$setValidity("minlength", !0), n)
					};
				i.$parsers.push(d), i.$formatters.push(d)
			}
			if (r.ngMaxlength) {
				var v = f(r.ngMaxlength),
					m = function(n) {
						return !Rt(n) && n.length > v ? (i.$setValidity("maxlength", !1), t) : (i.$setValidity("maxlength", !0), n)
					};
				i.$parsers.push(m), i.$formatters.push(m)
			}
		}

		function Ut(n, e, r, i, o, u) {
			if (qt(n, e, r, i, o, u), i.$parsers.push(function(n) {
				var e = Rt(n);
				return e || Br.test(n) ? (i.$setValidity("number", !0), "" === n ? null : e ? n : parseFloat(n)) : (i.$setValidity("number", !1), t)
			}), i.$formatters.push(function(n) {
				return Rt(n) ? "" : "" + n
			}), r.min) {
				var a = parseFloat(r.min),
					c = function(n) {
						return !Rt(n) && a > n ? (i.$setValidity("min", !1), t) : (i.$setValidity("min", !0), n)
					};
				i.$parsers.push(c), i.$formatters.push(c)
			}
			if (r.max) {
				var s = parseFloat(r.max),
					l = function(n) {
						return !Rt(n) && n > s ? (i.$setValidity("max", !1), t) : (i.$setValidity("max", !0), n)
					};
				i.$parsers.push(l), i.$formatters.push(l)
			}
			i.$formatters.push(function(n) {
				return Rt(n) || w(n) ? (i.$setValidity("number", !0), n) : (i.$setValidity("number", !1), t)
			})
		}

		function Dt(n, e, r, i, o, u) {
			qt(n, e, r, i, o, u);
			var a = function(n) {
				return Rt(n) || _r.test(n) ? (i.$setValidity("url", !0), n) : (i.$setValidity("url", !1), t)
			};
			i.$formatters.push(a), i.$parsers.push(a)
		}

		function Ht(n, e, r, i, o, u) {
			qt(n, e, r, i, o, u);
			var a = function(n) {
				return Rt(n) || Fr.test(n) ? (i.$setValidity("email", !0), n) : (i.$setValidity("email", !1), t)
			};
			i.$formatters.push(a), i.$parsers.push(a)
		}

		function It(n, e, t, r) {
			v(t.name) && e.attr("name", c()), e.bind("click", function() {
				e[0].checked && n.$apply(function() {
					r.$setViewValue(t.value)
				})
			}), r.$render = function() {
				var n = t.value;
				e[0].checked = n == r.$viewValue
			}, t.$observe("value", r.$render)
		}

		function Lt(n, e, t, r) {
			var i = t.ngTrueValue,
				o = t.ngFalseValue;
			y(i) || (i = !0), y(o) || (o = !1), e.bind("click", function() {
				n.$apply(function() {
					r.$setViewValue(e[0].checked)
				})
			}), r.$render = function() {
				e[0].checked = r.$viewValue
			}, r.$formatters.push(function(n) {
				return n === i
			}), r.$parsers.push(function(n) {
				return n ? i : o
			})
		}

		function _t(n, e) {
			return n = "ngClass" + n, Nt(function(r, i, o) {
				function u(n) {
					(e === !0 || r.$index % 2 === e) && (s && !R(n, s) && a(s), c(n)), s = N(n)
				}

				function a(n) {
					g(n) && !x(n) && (n = O(n, function(n, e) {
						return n ? e : void 0
					})), i.removeClass(x(n) ? n.join(" ") : n)
				}

				function c(n) {
					g(n) && !x(n) && (n = O(n, function(n, e) {
						return n ? e : void 0
					})), n && i.addClass(x(n) ? n.join(" ") : n)
				}
				var s = t;
				r.$watch(o[n], u, !0), o.$observe("class", function() {
					var e = r.$eval(o[n]);
					u(e, e)
				}), "ngClass" !== n && r.$watch("$index", function(t, i) {
					var u = 1 & t;
					u !== i & 1 && (u === e ? c(r.$eval(o[n])) : a(r.$eval(o[n])))
				})
			})
		}
		var Ft = function(n) {
			return y(n) ? n.toLowerCase() : n
		}, Bt = function(n) {
				return y(n) ? n.toUpperCase() : n
			}, zt = function(n) {
				return y(n) ? n.replace(/[A-Z]/g, function(n) {
					return String.fromCharCode(32 | n.charCodeAt(0))
				}) : n
			}, Xt = function(n) {
				return y(n) ? n.replace(/[a-z]/g, function(n) {
					return String.fromCharCode(-33 & n.charCodeAt(0))
				}) : n
			};
		"i" !== "I".toLowerCase() && (Ft = zt, Bt = Xt);
		var Jt, Kt, Wt, Zt, Yt = f((/msie (\d+)/.exec(Ft(navigator.userAgent)) || [])[1]),
			Gt = [].slice,
			Qt = [].push,
			nr = Object.prototype.toString,
			er = n.angular || (n.angular = {}),
			tr = ["0", "0", "0"];
		p.$inject = [], $.$inject = [];
		var rr = function() {
			return String.prototype.trim ? function(n) {
				return y(n) ? n.trim() : n
			} : function(n) {
				return y(n) ? n.replace(/^\s*/, "").replace(/\s*$/, "") : n
			}
		}();
		Zt = 9 > Yt ? function(n) {
			return n = n.nodeName ? n : n[0], n.scopeName && "HTML" != n.scopeName ? Bt(n.scopeName + ":" + n.nodeName) : n.nodeName
		} : function(n) {
			return n.nodeName ? n.nodeName : n[0].nodeName
		};
		var ir = /[A-Z]/g,
			or = {
				full: "1.0.8",
				major: 1,
				minor: 0,
				dot: 8,
				codeName: "bubble-burst"
			}, ur = ae.cache = {}, ar = ae.expando = "ng-" + (new Date).getTime(),
			cr = 1,
			sr = n.document.addEventListener ? function(n, e, t) {
				n.addEventListener(e, t, !1)
		} : function(n, e, t) {
			n.attachEvent("on" + e, t)
		}, lr = n.document.removeEventListener ? function(n, e, t) {
			n.removeEventListener(e, t, !1)
		} : function(n, e, t) {
			n.detachEvent("on" + e, t)
		}, fr = /([\:\-\_]+(.))/g,
			hr = /^moz([A-Z])/,
			pr = ae.prototype = {
				ready: function(e) {
					function t() {
						r || (r = !0, e())
					}
					var r = !1;
					this.bind("DOMContentLoaded", t), ae(n).bind("load", t)
				},
				toString: function() {
					var n = [];
					return i(this, function(e) {
						n.push("" + e)
					}), "[" + n.join(", ") + "]"
				},
				eq: function(n) {
					return Jt(n >= 0 ? this[n] : this[this.length + n])
				},
				length: 0,
				push: Qt,
				sort: [].sort,
				splice: [].splice
			}, $r = {};
		i("multiple,selected,checked,disabled,readOnly,required".split(","), function(n) {
			$r[Ft(n)] = n
		});
		var dr = {};
		i("input,select,option,textarea,button,form".split(","), function(n) {
			dr[Bt(n)] = !0
		}), i({
			data: pe,
			inheritedData: ye,
			scope: function(n) {
				return ye(n, "$scope")
			},
			controller: ge,
			injector: function(n) {
				return ye(n, "$injector")
			},
			removeAttr: function(n, e) {
				n.removeAttribute(e)
			},
			hasClass: $e,
			css: function(n, e, r) {
				if (e = oe(e), !m(r)) {
					var i;
					return 8 >= Yt && (i = n.currentStyle && n.currentStyle[e], "" === i && (i = "auto")), i = i || n.style[e], 8 >= Yt && (i = "" === i ? t : i), i
				}
				n.style[e] = r
			},
			attr: function(n, e, r) {
				var i = Ft(e);
				if ($r[i]) {
					if (!m(r)) return n[e] || (n.attributes.getNamedItem(e) || p).specified ? i : t;
					r ? (n[e] = !0, n.setAttribute(e, i)) : (n[e] = !1, n.removeAttribute(i))
				} else if (m(r)) n.setAttribute(e, r);
				else if (n.getAttribute) {
					var o = n.getAttribute(e, 2);
					return null === o ? t : o
				}
			},
			prop: function(n, e, t) {
				return m(t) ? void(n[e] = t) : n[e]
			},
			text: l(9 > Yt ? function(n, e) {
				if (1 == n.nodeType) {
					if (v(e)) return n.innerText;
					n.innerText = e
				} else {
					if (v(e)) return n.nodeValue;
					n.nodeValue = e
				}
			} : function(n, e) {
				return v(e) ? n.textContent : void(n.textContent = e)
			}, {
				$dv: ""
			}),
			val: function(n, e) {
				if (v(e)) {
					if ("SELECT" === Zt(n) && n.multiple) {
						var t = [];
						return i(n.options, function(n) {
							n.selected && t.push(n.value || n.text)
						}), 0 === t.length ? null : t
					}
					return n.value
				}
				n.value = e
			},
			html: function(n, e) {
				if (v(e)) return n.innerHTML;
				for (var t = 0, r = n.childNodes; t < r.length; t++) se(r[t]);
				n.innerHTML = e
			}
		}, function(n, e) {
			ae.prototype[e] = function(e, r) {
				var i, o;
				if ((2 == n.length && n !== $e && n !== ge ? e : r) !== t) {
					for (i = 0; i < this.length; i++) n(this[i], e, r);
					return this
				}
				if (g(e)) {
					for (i = 0; i < this.length; i++)
						if (n === pe) n(this[i], e);
						else
							for (o in e) n(this[i], o, e[o]);
					return this
				}
				return this.length ? n(this[0], e, r) : n.$dv
			}
		}), i({
			removeData: fe,
			dealoc: se,
			bind: function Pi(n, t, r) {
				var o = he(n, "events"),
					u = he(n, "handle");
				o || he(n, "events", o = {}), u || he(n, "handle", u = be(n, o)), i(t.split(" "), function(t) {
					var i = o[t];
					if (!i) {
						if ("mouseenter" == t || "mouseleave" == t) {
							var a = e.body.contains || e.body.compareDocumentPosition ? function(n, e) {
								var t = 9 === n.nodeType ? n.documentElement : n,
									r = e && e.parentNode;
								return n === r || !(!r || 1 !== r.nodeType || !(t.contains ? t.contains(r) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(r)))
							} : function(n, e) {
								if (e)
									for (; e = e.parentNode;)
										if (e === n) return !0;
								return !1
							};
							o[t] = [];
							var c = {
								mouseleave: "mouseout",
								mouseenter: "mouseover"
							};
							Pi(n, c[t], function(n) {
								var e = this,
									r = n.relatedTarget;
								(!r || r !== e && !a(e, r)) && u(n, t)
							})
						} else sr(n, t, u), o[t] = [];
						i = o[t]
					}
					i.push(r)
				})
			},
			unbind: le,
			replaceWith: function(n, e) {
				var t, r = n.parentNode;
				se(n), i(new ae(e), function(e) {
					t ? r.insertBefore(e, t.nextSibling) : r.replaceChild(e, n), t = e
				})
			},
			children: function(n) {
				var e = [];
				return i(n.childNodes, function(n) {
					1 === n.nodeType && e.push(n)
				}), e
			},
			contents: function(n) {
				return n.childNodes || []
			},
			append: function(n, e) {
				i(new ae(e), function(e) {
					1 === n.nodeType && n.appendChild(e)
				})
			},
			prepend: function(n, e) {
				if (1 === n.nodeType) {
					var t = n.firstChild;
					i(new ae(e), function(e) {
						n.insertBefore(e, t)
					})
				}
			},
			wrap: function(n, e) {
				e = Jt(e)[0];
				var t = n.parentNode;
				t && t.replaceChild(e, n), e.appendChild(n)
			},
			remove: function(n) {
				se(n);
				var e = n.parentNode;
				e && e.removeChild(n)
			},
			after: function(n, e) {
				var t = n,
					r = n.parentNode;
				i(new ae(e), function(n) {
					r.insertBefore(n, t.nextSibling), t = n
				})
			},
			addClass: ve,
			removeClass: de,
			toggleClass: function(n, e, t) {
				v(t) && (t = !$e(n, e)), (t ? ve : de)(n, e)
			},
			parent: function(n) {
				var e = n.parentNode;
				return e && 11 !== e.nodeType ? e : null
			},
			next: function(n) {
				if (n.nextElementSibling) return n.nextElementSibling;
				for (var e = n.nextSibling; null != e && 1 !== e.nodeType;) e = e.nextSibling;
				return e
			},
			find: function(n, e) {
				return n.getElementsByTagName(e)
			},
			clone: ce,
			triggerHandler: function(n, e) {
				var t = (he(n, "events") || {})[e];
				i(t, function(e) {
					e.call(n, null)
				})
			}
		}, function(n, e) {
			ae.prototype[e] = function(e, r) {
				for (var i, o = 0; o < this.length; o++) i == t ? (i = n(this[o], e, r), i !== t && (i = Jt(i))) : me(i, n(this[o], e, r));
				return i == t ? this : i
			}
		}), Ce.prototype = {
			put: function(n, e) {
				this[xe(n)] = e
			},
			get: function(n) {
				return this[xe(n)]
			},
			remove: function(n) {
				var e = this[n = xe(n)];
				return delete this[n], e
			}
		}, Se.prototype = {
			push: function(n, e) {
				var t = this[n = xe(n)];
				t ? t.push(e) : this[n] = [e]
			},
			shift: function(n) {
				var e = this[n = xe(n)];
				return e ? 1 == e.length ? (delete this[n], e[0]) : e.shift() : void 0
			},
			peek: function(n) {
				var e = this[xe(n)];
				return e ? e[0] : void 0
			}
		};
		var vr = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
			mr = /,/,
			gr = /^\s*(_?)(\S+?)\1\s*$/,
			yr = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
			wr = "Non-assignable model expression: ";
		Pe.$inject = ["$provide"];
		var br = /^(x[\:\-_]|data[\:\-_])/i,
			xr = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/,
			Cr = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/,
			Sr = Cr,
			Er = {
				http: 80,
				https: 443,
				ftp: 21
			};
		Be.prototype = {
			$$replace: !1,
			absUrl: Je("$$absUrl"),
			url: function(n, e) {
				if (v(n)) return this.$$url;
				var t = Cr.exec(n);
				return t[1] && this.path(decodeURIComponent(t[1])), (t[2] || t[1]) && this.search(t[3] || ""), this.hash(t[5] || "", e), this
			},
			protocol: Je("$$protocol"),
			host: Je("$$host"),
			port: Je("$$port"),
			path: Ke("$$path", function(n) {
				return "/" == n.charAt(0) ? n : "/" + n
			}),
			search: function(n, e) {
				return v(n) ? this.$$search : (m(e) ? null === e ? delete this.$$search[n] : this.$$search[n] = e : this.$$search = y(n) ? z(n) : n, this.$$compose(), this)
			},
			hash: Ke("$$hash", $),
			replace: function() {
				return this.$$replace = !0, this
			}
		}, ze.prototype = h(Be.prototype), Xe.prototype = h(ze.prototype);
		var Ar = {
			"null": function() {
				return null
			},
			"true": function() {
				return !0
			},
			"false": function() {
				return !1
			},
			undefined: p,
			"+": function(n, e, r, i) {
				return r = r(n, e), i = i(n, e), m(r) ? m(i) ? r + i : r : m(i) ? i : t
			},
			"-": function(n, e, t, r) {
				return t = t(n, e), r = r(n, e), (m(t) ? t : 0) - (m(r) ? r : 0)
			},
			"*": function(n, e, t, r) {
				return t(n, e) * r(n, e)
			},
			"/": function(n, e, t, r) {
				return t(n, e) / r(n, e)
			},
			"%": function(n, e, t, r) {
				return t(n, e) % r(n, e)
			},
			"^": function(n, e, t, r) {
				return t(n, e) ^ r(n, e)
			},
			"=": p,
			"==": function(n, e, t, r) {
				return t(n, e) == r(n, e)
			},
			"!=": function(n, e, t, r) {
				return t(n, e) != r(n, e)
			},
			"<": function(n, e, t, r) {
				return t(n, e) < r(n, e)
			},
			">": function(n, e, t, r) {
				return t(n, e) > r(n, e)
			},
			"<=": function(n, e, t, r) {
				return t(n, e) <= r(n, e)
			},
			">=": function(n, e, t, r) {
				return t(n, e) >= r(n, e)
			},
			"&&": function(n, e, t, r) {
				return t(n, e) && r(n, e)
			},
			"||": function(n, e, t, r) {
				return t(n, e) || r(n, e)
			},
			"&": function(n, e, t, r) {
				return t(n, e) & r(n, e)
			},
			"|": function(n, e, t, r) {
				return r(n, e)(n, e, t(n, e))
			},
			"!": function(n, e, t) {
				return !t(n, e)
			}
		}, Mr = {
				n: "\n",
				f: "\f",
				r: "\r",
				t: "	",
				v: "",
				"'": "'",
				'"': '"'
			}, Tr = {}, Or = n.XMLHttpRequest || function() {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP.6.0")
				} catch (n) {}
				try {
					return new ActiveXObject("Msxml2.XMLHTTP.3.0")
				} catch (e) {}
				try {
					return new ActiveXObject("Msxml2.XMLHTTP")
				} catch (t) {}
				throw new Error("This browser does not support XMLHttpRequest.")
		};
		yt.$inject = ["$provide"], bt.$inject = ["$locale"], xt.$inject = ["$locale"];
		var kr = ".",
			jr = {
				yyyy: Et("FullYear", 4),
				yy: Et("FullYear", 2, 0, !0),
				y: Et("FullYear", 1),
				MMMM: At("Month"),
				MMM: At("Month", !0),
				MM: Et("Month", 2, 1),
				M: Et("Month", 1, 1),
				dd: Et("Date", 2),
				d: Et("Date", 1),
				HH: Et("Hours", 2),
				H: Et("Hours", 1),
				hh: Et("Hours", 2, -12),
				h: Et("Hours", 1, -12),
				mm: Et("Minutes", 2),
				m: Et("Minutes", 1),
				ss: Et("Seconds", 2),
				s: Et("Seconds", 1),
				EEEE: At("Day"),
				EEE: At("Day", !0),
				a: Tt,
				Z: Mt
			}, Pr = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
			Nr = /^\d+$/;
		Ot.$inject = ["$locale"];
		var Vr = d(Ft),
			Rr = d(Bt);
		Pt.$inject = ["$parse"];
		var qr = d({
			restrict: "E",
			compile: function(n, t) {
				return 8 >= Yt && (t.href || t.name || t.$set("href", ""), n.append(e.createComment("IE fix"))),

				function(n, e) {
					e.bind("click", function(n) {
						e.attr("href") || n.preventDefault()
					})
				}
			}
		}),
			Ur = {};
		i($r, function(n, e) {
			var t = Ne("ng-" + e);
			Ur[t] = function() {
				return {
					priority: 100,
					compile: function() {
						return function(n, r, i) {
							n.$watch(i[t], function(n) {
								i.$set(e, !! n)
							})
						}
					}
				}
			}
		}), i(["src", "href"], function(n) {
			var e = Ne("ng-" + n);
			Ur[e] = function() {
				return {
					priority: 99,
					link: function(t, r, i) {
						i.$observe(e, function(e) {
							e && (i.$set(n, e), Yt && r.prop(n, i[n]))
						})
					}
				}
			}
		});
		var Dr = {
			$addControl: p,
			$removeControl: p,
			$setValidity: p,
			$setDirty: p
		};
		Vt.$inject = ["$element", "$attrs", "$scope"];
		var Hr = function(n) {
			return ["$timeout", function(e) {
				var r = {
					name: "form",
					restrict: "E",
					controller: Vt,
					compile: function() {
						return {
							pre: function(n, r, i, o) {
								if (!i.action) {
									var u = function(n) {
										n.preventDefault ? n.preventDefault() : n.returnValue = !1
									};
									sr(r[0], "submit", u), r.bind("$destroy", function() {
										e(function() {
											lr(r[0], "submit", u)
										}, 0, !1)
									})
								}
								var a = r.parent().controller("form"),
									c = i.name || i.ngForm;
								c && (n[c] = o), a && r.bind("$destroy", function() {
									a.$removeControl(o), c && (n[c] = t), l(o, Dr)
								})
							}
						}
					}
				};
				return n ? l(N(r), {
					restrict: "EAC"
				}) : r
			}]
		}, Ir = Hr(),
			Lr = Hr(!0),
			_r = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
			Fr = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
			Br = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
			zr = {
				text: qt,
				number: Ut,
				url: Dt,
				email: Ht,
				radio: It,
				checkbox: Lt,
				hidden: p,
				button: p,
				submit: p,
				reset: p
			}, Xr = ["$browser", "$sniffer",
				function(n, e) {
					return {
						restrict: "E",
						require: "?ngModel",
						link: function(t, r, i, o) {
							o && (zr[Ft(i.type)] || zr.text)(t, r, i, o, e, n)
						}
					}
				}
			],
			Jr = "ng-valid",
			Kr = "ng-invalid",
			Wr = "ng-pristine",
			Zr = "ng-dirty",
			Yr = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse",
				function(n, e, t, r, o) {
					function u(n, e) {
						e = e ? "-" + Y(e, "-") : "", r.removeClass((n ? Kr : Jr) + e).addClass((n ? Jr : Kr) + e)
					}
					this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = t.name;
					var a = o(t.ngModel),
						c = a.assign;
					if (!c) throw Error(wr + t.ngModel + " (" + F(r) + ")");
					this.$render = p;
					var s = r.inheritedData("$formController") || Dr,
						l = 0,
						f = this.$error = {};
					r.addClass(Wr), u(!0), this.$setValidity = function(n, e) {
						f[n] !== !e && (e ? (f[n] && l--, l || (u(!0), this.$valid = !0, this.$invalid = !1)) : (u(!1), this.$invalid = !0, this.$valid = !1, l++), f[n] = !e, u(e, n), s.$setValidity(n, e, this))
					}, this.$setViewValue = function(t) {
						this.$viewValue = t, this.$pristine && (this.$dirty = !0, this.$pristine = !1, r.removeClass(Wr).addClass(Zr), s.$setDirty()), i(this.$parsers, function(n) {
							t = n(t)
						}), this.$modelValue !== t && (this.$modelValue = t, c(n, t), i(this.$viewChangeListeners, function(n) {
							try {
								n()
							} catch (t) {
								e(t)
							}
						}))
					};
					var h = this;
					n.$watch(function() {
						var e = a(n);
						if (h.$modelValue !== e) {
							var t = h.$formatters,
								r = t.length;
							for (h.$modelValue = e; r--;) e = t[r](e);
							h.$viewValue !== e && (h.$viewValue = e, h.$render())
						}
					})
				}
			],
			Gr = function() {
				return {
					require: ["ngModel", "^?form"],
					controller: Yr,
					link: function(n, e, t, r) {
						var i = r[0],
							o = r[1] || Dr;
						o.$addControl(i), e.bind("$destroy", function() {
							o.$removeControl(i)
						})
					}
				}
			}, Qr = d({
				require: "ngModel",
				link: function(n, e, t, r) {
					r.$viewChangeListeners.push(function() {
						n.$eval(t.ngChange)
					})
				}
			}),
			ni = function() {
				return {
					require: "?ngModel",
					link: function(n, e, t, r) {
						if (r) {
							t.required = !0;
							var i = function(n) {
								return t.required && (Rt(n) || n === !1) ? void r.$setValidity("required", !1) : (r.$setValidity("required", !0), n)
							};
							r.$formatters.push(i), r.$parsers.unshift(i), t.$observe("required", function() {
								i(r.$viewValue)
							})
						}
					}
				}
			}, ei = function() {
				return {
					require: "ngModel",
					link: function(n, e, r, o) {
						var u = /\/(.*)\//.exec(r.ngList),
							a = u && new RegExp(u[1]) || r.ngList || ",",
							c = function(n) {
								var e = [];
								return n && i(n.split(a), function(n) {
									n && e.push(rr(n))
								}), e
							};
						o.$parsers.push(c), o.$formatters.push(function(n) {
							return x(n) ? n.join(", ") : t
						})
					}
				}
			}, ti = /^(true|false|\d+)$/,
			ri = function() {
				return {
					priority: 100,
					compile: function(n, e) {
						return ti.test(e.ngValue) ? function(n, e, t) {
							t.$set("value", n.$eval(t.ngValue))
						} : function(n, e, t) {
							n.$watch(t.ngValue, function(n) {
								t.$set("value", n)
							})
						}
					}
				}
			}, ii = Nt(function(n, e, r) {
				e.addClass("ng-binding").data("$binding", r.ngBind), n.$watch(r.ngBind, function(n) {
					e.text(n == t ? "" : n)
				})
			}),
			oi = ["$interpolate",
				function(n) {
					return function(e, t, r) {
						var i = n(t.attr(r.$attr.ngBindTemplate));
						t.addClass("ng-binding").data("$binding", i), r.$observe("ngBindTemplate", function(n) {
							t.text(n)
						})
					}
				}
			],
			ui = [
				function() {
					return function(n, e, t) {
						e.addClass("ng-binding").data("$binding", t.ngBindHtmlUnsafe), n.$watch(t.ngBindHtmlUnsafe, function(n) {
							e.html(n || "")
						})
					}
				}
			],
			ai = _t("", !0),
			ci = _t("Odd", 0),
			si = _t("Even", 1),
			li = Nt({
				compile: function(n, e) {
					e.$set("ngCloak", t), n.removeClass("ng-cloak")
				}
			}),
			fi = [
				function() {
					return {
						scope: !0,
						controller: "@"
					}
				}
			],
			hi = ["$sniffer",
				function(n) {
					return {
						priority: 1e3,
						compile: function() {
							n.csp = !0
						}
					}
				}
			],
			pi = {};
		i("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave submit".split(" "), function(n) {
			var e = Ne("ng-" + n);
			pi[e] = ["$parse",
				function(t) {
					return function(r, i, o) {
						var u = t(o[e]);
						i.bind(Ft(n), function(n) {
							r.$apply(function() {
								u(r, {
									$event: n
								})
							})
						})
					}
				}
			]
		});
		var $i = ["$http", "$templateCache", "$anchorScroll", "$compile",
			function(n, e, t, r) {
				return {
					restrict: "ECA",
					terminal: !0,
					compile: function(i, o) {
						var u = o.ngInclude || o.src,
							a = o.onload || "",
							c = o.autoscroll;
						return function(i, o) {
							var s, l = 0,
								f = function() {
									s && (s.$destroy(), s = null), o.html("")
								};
							i.$watch(u, function(u) {
								var h = ++l;
								u ? n.get(u, {
									cache: e
								}).success(function(n) {
									h === l && (s && s.$destroy(), s = i.$new(), o.html(n), r(o.contents())(s), !m(c) || c && !i.$eval(c) || t(), s.$emit("$includeContentLoaded"), i.$eval(a))
								}).error(function() {
									h === l && f()
								}) : f()
							})
						}
					}
				}
			}
		],
			di = Nt({
				compile: function() {
					return {
						pre: function(n, e, t) {
							n.$eval(t.ngInit)
						}
					}
				}
			}),
			vi = Nt({
				terminal: !0,
				priority: 1e3
			}),
			mi = ["$locale", "$interpolate",
				function(n, e) {
					var t = /{}/g;
					return {
						restrict: "EA",
						link: function(r, o, u) {
							var a = u.count,
								c = o.attr(u.$attr.when),
								s = u.offset || 0,
								l = r.$eval(c),
								f = {}, h = e.startSymbol(),
								p = e.endSymbol();
							i(l, function(n, r) {
								f[r] = e(n.replace(t, h + a + "-" + s + p))
							}), r.$watch(function() {
								var e = parseFloat(r.$eval(a));
								return isNaN(e) ? "" : (e in l || (e = n.pluralCat(e - s)), f[e](r, o, !0))
							}, function(n) {
								o.text(n)
							})
						}
					}
				}
			],
			gi = Nt({
				transclude: "element",
				priority: 1e3,
				terminal: !0,
				compile: function(n, e, t) {
					return function(n, e, r) {
						var i, o, u, a, c = r.ngRepeat,
							s = c.match(/^\s*(.+)\s+in\s+(.*)\s*$/);
						if (!s) throw Error("Expected ngRepeat in form of '_item_ in _collection_' but got '" + c + "'.");
						if (i = s[1], o = s[2], s = i.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !s) throw Error("'item' in 'item in collection' should be identifier or (key, value) but got '" + i + "'.");
						u = s[3] || s[1], a = s[2];
						var l = new Se;
						n.$watch(function(n) {
							var r, i, c, s, f, h, p, $, d = n.$eval(o),
								v = e,
								m = new Se;
							if (x(d)) p = d || [];
							else {
								p = [];
								for (f in d) d.hasOwnProperty(f) && "$" != f.charAt(0) && p.push(f);
								p.sort()
							}
							for (c = p.length - 1, r = 0, i = p.length; i > r; r++) f = d === p ? r : p[r], h = d[f], $ = l.shift(h), $ ? (s = $.scope, m.push(h, $), r === $.index ? v = $.element : ($.index = r, v.after($.element), v = $.element)) : s = n.$new(), s[u] = h, a && (s[a] = f), s.$index = r, s.$first = 0 === r, s.$last = r === c, s.$middle = !(s.$first || s.$last), $ || t(s, function(n) {
								v.after(n), $ = {
									scope: s,
									element: v = n,
									index: r
								}, m.push(h, $)
							});
							for (f in l)
								if (l.hasOwnProperty(f))
									for (p = l[f]; p.length;) h = p.pop(), h.element.remove(), h.scope.$destroy();
							l = m
						})
					}
				}
			}),
			yi = Nt(function(n, e, t) {
				n.$watch(t.ngShow, function(n) {
					e.css("display", _(n) ? "" : "none")
				})
			}),
			wi = Nt(function(n, e, t) {
				n.$watch(t.ngHide, function(n) {
					e.css("display", _(n) ? "none" : "")
				})
			}),
			bi = Nt(function(n, e, t) {
				n.$watch(t.ngStyle, function(n, t) {
					t && n !== t && i(t, function(n, t) {
						e.css(t, "")
					}), n && e.css(n)
				}, !0)
			}),
			xi = d({
				restrict: "EA",
				require: "ngSwitch",
				controller: ["$scope",
					function() {
						this.cases = {}
					}
				],
				link: function(n, e, t, r) {
					var i, o, u, a = t.ngSwitch || t.on;
					n.$watch(a, function(a) {
						o && (u.$destroy(), o.remove(), o = u = null), (i = r.cases["!" + a] || r.cases["?"]) && (n.$eval(t.change), u = n.$new(), i(u, function(n) {
							o = n, e.append(n)
						}))
					})
				}
			}),
			Ci = Nt({
				transclude: "element",
				priority: 500,
				require: "^ngSwitch",
				compile: function(n, e, t) {
					return function(n, r, i, o) {
						o.cases["!" + e.ngSwitchWhen] = t
					}
				}
			}),
			Si = Nt({
				transclude: "element",
				priority: 500,
				require: "^ngSwitch",
				compile: function(n, e, t) {
					return function(n, e, r, i) {
						i.cases["?"] = t
					}
				}
			}),
			Ei = Nt({
				controller: ["$transclude", "$element",
					function(n, e) {
						n(function(n) {
							e.append(n)
						})
					}
				]
			}),
			Ai = ["$http", "$templateCache", "$route", "$anchorScroll", "$compile", "$controller",
				function(n, e, t, r, i, o) {
					return {
						restrict: "ECA",
						terminal: !0,
						link: function(n, e, u) {
							function a() {
								l && (l.$destroy(), l = null)
							}

							function c() {
								e.html(""), a()
							}

							function s() {
								var u = t.current && t.current.locals,
									s = u && u.$template;
								if (s) {
									e.html(s), a();
									var h, p = i(e.contents()),
										$ = t.current;
									l = $.scope = n.$new(), $.controller && (u.$scope = l, h = o($.controller, u), e.children().data("$ngControllerController", h)), p(l), l.$emit("$viewContentLoaded"), l.$eval(f), r()
								} else c()
							}
							var l, f = u.onload || "";
							n.$on("$routeChangeSuccess", s), s()
						}
					}
				}
			],
			Mi = ["$templateCache",
				function(n) {
					return {
						restrict: "E",
						terminal: !0,
						compile: function(e, t) {
							if ("text/ng-template" == t.type) {
								var r = t.id,
									i = e[0].text;
								n.put(r, i)
							}
						}
					}
				}
			],
			Ti = d({
				terminal: !0
			}),
			Oi = ["$compile", "$parse",
				function(n, r) {
					var u = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/,
						a = {
							$setViewValue: p
						};
					return {
						restrict: "E",
						require: ["select", "?ngModel"],
						controller: ["$element", "$scope", "$attrs",
							function(n, e, t) {
								var r, i, o = this,
									u = {}, c = a;
								o.databound = t.ngModel, o.init = function(n, e, t) {
									c = n, r = e, i = t
								}, o.addOption = function(e) {
									u[e] = !0, c.$viewValue == e && (n.val(e), i.parent() && i.remove())
								}, o.removeOption = function(n) {
									this.hasOption(n) && (delete u[n], c.$viewValue == n && this.renderUnknownOption(n))
								}, o.renderUnknownOption = function(e) {
									var t = "? " + xe(e) + " ?";
									i.val(t), n.prepend(i), n.val(t), i.prop("selected", !0)
								}, o.hasOption = function(n) {
									return u.hasOwnProperty(n)
								}, e.$on("$destroy", function() {
									o.renderUnknownOption = p
								})
							}
						],
						link: function(a, c, s, l) {
							function f(n, e, t, r) {
								t.$render = function() {
									var n = t.$viewValue;
									r.hasOption(n) ? (S.parent() && S.remove(), e.val(n), "" === n && $.prop("selected", !0)) : v(n) && $ ? e.val("") : r.renderUnknownOption(n)
								}, e.bind("change", function() {
									n.$apply(function() {
										S.parent() && S.remove(), t.$setViewValue(e.val())
									})
								})
							}

							function h(n, e, t) {
								var r;
								t.$render = function() {
									var n = new Ce(t.$viewValue);
									i(e.find("option"), function(e) {
										e.selected = m(n.get(e.value))
									})
								}, n.$watch(function() {
									R(r, t.$viewValue) || (r = N(t.$viewValue), t.$render())
								}), e.bind("change", function() {
									n.$apply(function() {
										var n = [];
										i(e.find("option"), function(e) {
											e.selected && n.push(e.value)
										}), t.$setViewValue(n)
									})
								})
							}

							function p(e, i, a) {
								function c() {
									var n, r, u, c, s, m, g, w, S, E, A, M, T, O, k = {
											"": []
										}, j = [""],
										P = a.$modelValue,
										N = d(e) || [],
										V = h ? o(N) : N,
										R = {}, q = !1;
									for (y && (q = new Ce(P)), E = 0; w = V.length, w > E; E++) R[f] = N[h ? R[h] = V[E] : E], n = p(e, R) || "", (r = k[n]) || (r = k[n] = [], j.push(n)), y ? A = q.remove($(e, R)) != t : (A = P === $(e, R), q = q || A), O = l(e, R), O = O === t ? "" : O, r.push({
										id: h ? V[E] : E,
										label: O,
										selected: A
									});
									for (y || (b || null === P ? k[""].unshift({
										id: "",
										label: "",
										selected: !q
									}) : q || k[""].unshift({
										id: "?",
										label: "",
										selected: !0
									})), S = 0, g = j.length; g > S; S++) {
										for (n = j[S], r = k[n], v.length <= S ? (c = {
											element: C.clone().attr("label", n),
											label: r.label
										}, s = [c], v.push(s), i.append(c.element)) : (s = v[S], c = s[0], c.label != n && c.element.attr("label", c.label = n)), M = null, E = 0, w = r.length; w > E; E++) u = r[E], (m = s[E + 1]) ? (M = m.element, m.label !== u.label && M.text(m.label = u.label), m.id !== u.id && M.val(m.id = u.id), M[0].selected !== u.selected && M.prop("selected", m.selected = u.selected)) : ("" === u.id && b ? T = b : (T = x.clone()).val(u.id).attr("selected", u.selected).text(u.label), s.push(m = {
											element: T,
											label: u.label,
											id: u.id,
											selected: u.selected
										}), M ? M.after(T) : c.element.append(T), M = T);
										for (E++; s.length > E;) s.pop().element.remove()
									}
									for (; v.length > S;) v.pop()[0].element.remove()
								}
								var s;
								if (!(s = w.match(u))) throw Error("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '" + w + "'.");
								var l = r(s[2] || s[1]),
									f = s[4] || s[6],
									h = s[5],
									p = r(s[3] || ""),
									$ = r(s[2] ? s[1] : f),
									d = r(s[7]),
									v = [
										[{
											element: i,
											label: ""
										}]
									];
								b && (n(b)(e), b.removeClass("ng-scope"), b.remove()), i.html(""), i.bind("change", function() {
									e.$apply(function() {
										var n, r, o, u, c, s, l, p, m = d(e) || [],
											g = {};
										if (y)
											for (o = [], s = 0, p = v.length; p > s; s++)
												for (n = v[s], c = 1, l = n.length; l > c; c++)(u = n[c].element)[0].selected && (r = u.val(), h && (g[h] = r), g[f] = m[r], o.push($(e, g)));
										else r = i.val(), "?" == r ? o = t : "" == r ? o = null : (g[f] = m[r], h && (g[h] = r), o = $(e, g));
										a.$setViewValue(o)
									})
								}), a.$render = c, e.$watch(c)
							}
							if (l[1]) {
								for (var $, d = l[0], g = l[1], y = s.multiple, w = s.ngOptions, b = !1, x = Jt(e.createElement("option")), C = Jt(e.createElement("optgroup")), S = x.clone(), E = 0, A = c.children(), M = A.length; M > E; E++)
									if ("" == A[E].value) {
										$ = b = A.eq(E);
										break
									}
								if (d.init(g, b, S), y && (s.required || s.ngRequired)) {
									var T = function(n) {
										return g.$setValidity("required", !s.required || n && n.length), n
									};
									g.$parsers.push(T), g.$formatters.unshift(T), s.$observe("required", function() {
										T(g.$viewValue)
									})
								}
								w ? p(a, c, g) : y ? h(a, c, g) : f(a, c, g, d)
							}
						}
					}
				}
			],
			ki = ["$interpolate",
				function(n) {
					var e = {
						addOption: p,
						removeOption: p
					};
					return {
						restrict: "E",
						priority: 100,
						compile: function(t, r) {
							if (v(r.value)) {
								var i = n(t.text(), !0);
								i || r.$set("value", t.text())
							}
							return function(n, t, r) {
								var o = "$selectController",
									u = t.parent(),
									a = u.data(o) || u.parent().data(o);
								a && a.databound ? t.prop("selected", !1) : a = e, i ? n.$watch(i, function(n, e) {
									r.$set("value", n), n !== e && a.removeOption(e), a.addOption(n)
								}) : a.addOption(r.value), t.bind("$destroy", function() {
									a.removeOption(r.value)
								})
							}
						}
					}
				}
			],
			ji = d({
				restrict: "E",
				terminal: !0
			});
		G(), re(er), Jt(e).ready(function() {
			W(e, Z)
		})
	}(window, document), angular.element(document).find("head").append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none !important;}ng\\:form{display:block;}</style>'), define("angular", function(n) {
		return function() {
			var e;
			return e || n.angular
		}
	}(this)), define("config", ["angular"], function(n) {
		return n.module("app.constants", []).constant("CONFIG", {})
	}), define("modules/home/module", ["angular", "../../config"], function(n) {
		return n.module("app.home", ["app.constants"])
	}), define("modules/home/home-ctrl", ["./module"], function(n) {
		n.controller("HomeController", ["$scope",
			function(n) {
				n.twoTimesTwo = 4
			}
		])
	}), define("modules/home/index", ["./home-ctrl"], function() {}), define("modules/artists/module", ["angular", "../../config"], function(n) {
		return n.module("app.artists", ["app.constants"])
	}), define("modules/artists/artists-ctrl", ["./module"], function(n) {
		n.controller("ArtistsController", ["$scope",
			function(n) {
				n.twoTimesTwo = 4
			}
		])
	}), define("modules/artists/index", ["./artists-ctrl"], function() {}), define("app", ["angular", "./config", "./modules/home/index", "./modules/artists/index"], function(n) {
		return n.module("app", ["app.constants", "app.home", "app.artists"])
	}), define("routes", ["./app", "./config"], function(n) {
		n.config(["$locationProvider",
			function(n) {
				n.html5Mode(!0), n.hashPrefix("!")
			}
		]), n.config(["$routeProvider",
			function(n) {
				n.when("/", {
					templateUrl: "/js/modules/home/home.html",
					controller: "HomeController"
				}), n.when("/artistes", {
					templateUrl: "/js/modules/artists/artists.html",
					controller: "ArtistsController"
				}), n.otherwise({
					redirectTo: "/"
				})
			}
		])
	}), define("main", ["require", "angular", "./app", "./routes"], function(n, e) {
		n(["domReady!"], function(n) {
			e.bootstrap(n, ["app"])
		})
	})
}();