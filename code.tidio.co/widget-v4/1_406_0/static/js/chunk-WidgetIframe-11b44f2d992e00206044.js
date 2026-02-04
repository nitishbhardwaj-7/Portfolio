!(function () {
  try {
    var e =
        "undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof self
          ? self
          : {},
      t = new e.Error().stack;
    t &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[t] = "9f3a6139-3cdd-464a-9d5d-782e65041631"),
      (e._sentryDebugIdIdentifier =
        "sentry-dbid-9f3a6139-3cdd-464a-9d5d-782e65041631"));
  } catch (e) {}
})(),
  (function () {
    var e =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self
        ? self
        : {};
    (e._sentryModuleMetadata = e._sentryModuleMetadata || {}),
      (function () {
        var t,
          n = new e.Error().stack,
          i = e._sentryModuleMetadata[n] || {},
          a = { "_sentryBundlerPluginAppKey:tidio-sentry-widget-app-key": !0 },
          o = {};
        for (t in i) i.hasOwnProperty(t) && (o[t] = i[t]);
        for (t in a) a.hasOwnProperty(t) && (o[t] = a[t]);
        e._sentryModuleMetadata[n] = o;
      })();
  })();
var _global =
  "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof self
    ? self
    : {};
(_global.SENTRY_RELEASE = { id: "1.406.0" }),
  (self.webpackChunktidio_widget_v4 =
    self.webpackChunktidio_widget_v4 || []).push([
    [987],
    {
      103: function (e, t, n) {
        "use strict";
        n.d(t, {
          RV: function () {
            return A;
          },
          CS: function () {
            return Kn;
          },
          to: function () {
            return Mn;
          },
          n$: function () {
            return Yt;
          },
          zh: function () {
            return Cn;
          },
          U2: function () {
            return Sn;
          },
          pn: function () {
            return Dn;
          },
        });
        var i = x(),
          a = (e) => h(e, i),
          o = x();
        a.write = (e) => h(e, o);
        var r = x();
        a.onStart = (e) => h(e, r);
        var s = x();
        a.onFrame = (e) => h(e, s);
        var l = x();
        a.onFinish = (e) => h(e, l);
        var d = [];
        a.setTimeout = (e, t) => {
          const n = a.now() + t,
            i = () => {
              const e = d.findIndex((e) => e.cancel == i);
              ~e && d.splice(e, 1), (f -= ~e ? 1 : 0);
            },
            o = { time: n, handler: e, cancel: i };
          return d.splice(c(n), 0, o), (f += 1), g(), o;
        };
        var c = (e) => ~(~d.findIndex((t) => t.time > e) || ~d.length);
        (a.cancel = (e) => {
          r.delete(e), s.delete(e), l.delete(e), i.delete(e), o.delete(e);
        }),
          (a.sync = (e) => {
            (m = !0), a.batchedUpdates(e), (m = !1);
          }),
          (a.throttle = (e) => {
            let t;
            function n() {
              try {
                e(...t);
              } finally {
                t = null;
              }
            }
            function i() {
              for (
                var e = arguments.length, i = new Array(e), o = 0;
                o < e;
                o++
              )
                i[o] = arguments[o];
              (t = i), a.onStart(n);
            }
            return (
              (i.handler = e),
              (i.cancel = () => {
                r.delete(n), (t = null);
              }),
              i
            );
          });
        var u =
          "undefined" != typeof window
            ? window.requestAnimationFrame
            : () => {};
        (a.use = (e) => (u = e)),
          (a.now =
            "undefined" != typeof performance
              ? () => performance.now()
              : Date.now),
          (a.batchedUpdates = (e) => e()),
          (a.catch = console.error),
          (a.frameLoop = "always"),
          (a.advance = () => {
            "demand" !== a.frameLoop
              ? console.warn(
                  "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand"
                )
              : v();
          });
        var p = -1,
          f = 0,
          m = !1;
        function h(e, t) {
          m ? (t.delete(e), e(0)) : (t.add(e), g());
        }
        function g() {
          p < 0 && ((p = 0), "demand" !== a.frameLoop && u(b));
        }
        function b() {
          ~p && (u(b), a.batchedUpdates(v));
        }
        function v() {
          const e = p;
          p = a.now();
          const t = c(p);
          t && (y(d.splice(0, t), (e) => e.handler()), (f -= t)),
            f
              ? (r.flush(),
                i.flush(e ? Math.min(64, p - e) : 16.667),
                s.flush(),
                o.flush(),
                l.flush())
              : (p = -1);
        }
        function x() {
          let e = new Set(),
            t = e;
          return {
            add(n) {
              (f += t != e || e.has(n) ? 0 : 1), e.add(n);
            },
            delete(n) {
              return (f -= t == e && e.has(n) ? 1 : 0), e.delete(n);
            },
            flush(n) {
              t.size &&
                ((e = new Set()),
                (f -= t.size),
                y(t, (t) => t(n) && e.add(t)),
                (f += e.size),
                (t = e));
            },
          };
        }
        function y(e, t) {
          e.forEach((e) => {
            try {
              t(e);
            } catch (e) {
              a.catch(e);
            }
          });
        }
        var w = n(3480),
          k = Object.defineProperty,
          A = {};
        function C() {}
        ((e, t) => {
          for (var n in t) k(e, n, { get: t[n], enumerable: !0 });
        })(A, {
          assign: () => L,
          colors: () => R,
          createStringInterpolator: () => _,
          skipAnimation: () => O,
          to: () => I,
          willAdvance: () => j,
        });
        var E = {
          arr: Array.isArray,
          obj: (e) => !!e && "Object" === e.constructor.name,
          fun: (e) => "function" == typeof e,
          str: (e) => "string" == typeof e,
          num: (e) => "number" == typeof e,
          und: (e) => void 0 === e,
        };
        function S(e, t) {
          if (E.arr(e)) {
            if (!E.arr(t) || e.length !== t.length) return !1;
            for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
            return !0;
          }
          return e === t;
        }
        var D = (e, t) => e.forEach(t);
        function Y(e, t, n) {
          if (E.arr(e))
            for (let i = 0; i < e.length; i++) t.call(n, e[i], `${i}`);
          else for (const i in e) e.hasOwnProperty(i) && t.call(n, e[i], i);
        }
        var T = (e) => (E.und(e) ? [] : E.arr(e) ? e : [e]);
        function F(e, t) {
          if (e.size) {
            const n = Array.from(e);
            e.clear(), D(n, t);
          }
        }
        var _,
          I,
          M = function (e) {
            for (
              var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
              i < t;
              i++
            )
              n[i - 1] = arguments[i];
            return F(e, (e) => e(...n));
          },
          N = () =>
            "undefined" == typeof window ||
            !window.navigator ||
            /ServerSideRendering|^Deno\//.test(window.navigator.userAgent),
          R = null,
          O = !1,
          j = C,
          L = (e) => {
            e.to && (I = e.to),
              e.now && (a.now = e.now),
              void 0 !== e.colors && (R = e.colors),
              null != e.skipAnimation && (O = e.skipAnimation),
              e.createStringInterpolator && (_ = e.createStringInterpolator),
              e.requestAnimationFrame && a.use(e.requestAnimationFrame),
              e.batchedUpdates && (a.batchedUpdates = e.batchedUpdates),
              e.willAdvance && (j = e.willAdvance),
              e.frameLoop && (a.frameLoop = e.frameLoop);
          },
          z = new Set(),
          U = [],
          P = [],
          B = 0,
          H = {
            get idle() {
              return !z.size && !U.length;
            },
            start(e) {
              B > e.priority ? (z.add(e), a.onStart(q)) : ($(e), a(W));
            },
            advance: W,
            sort(e) {
              if (B) a.onFrame(() => H.sort(e));
              else {
                const t = U.indexOf(e);
                ~t && (U.splice(t, 1), V(e));
              }
            },
            clear() {
              (U = []), z.clear();
            },
          };
        function q() {
          z.forEach($), z.clear(), a(W);
        }
        function $(e) {
          U.includes(e) || V(e);
        }
        function V(e) {
          U.splice(
            (function (e, t) {
              const n = e.findIndex(t);
              return n < 0 ? e.length : n;
            })(U, (t) => t.priority > e.priority),
            0,
            e
          );
        }
        function W(e) {
          const t = P;
          for (let n = 0; n < U.length; n++) {
            const i = U[n];
            (B = i.priority),
              i.idle || (j(i), i.advance(e), i.idle || t.push(i));
          }
          return (B = 0), ((P = U).length = 0), (U = t).length > 0;
        }
        var K = "[-+]?\\d*\\.?\\d+",
          G = K + "%";
        function X() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
        }
        var Q = new RegExp("rgb" + X(K, K, K)),
          Z = new RegExp("rgba" + X(K, K, K, K)),
          J = new RegExp("hsl" + X(K, G, G)),
          ee = new RegExp("hsla" + X(K, G, G, K)),
          te = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          ne =
            /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          ie = /^#([0-9a-fA-F]{6})$/,
          ae = /^#([0-9a-fA-F]{8})$/;
        function oe(e, t, n) {
          return (
            n < 0 && (n += 1),
            n > 1 && (n -= 1),
            n < 1 / 6
              ? e + 6 * (t - e) * n
              : n < 0.5
              ? t
              : n < 2 / 3
              ? e + (t - e) * (2 / 3 - n) * 6
              : e
          );
        }
        function re(e, t, n) {
          const i = n < 0.5 ? n * (1 + t) : n + t - n * t,
            a = 2 * n - i,
            o = oe(a, i, e + 1 / 3),
            r = oe(a, i, e),
            s = oe(a, i, e - 1 / 3);
          return (
            (Math.round(255 * o) << 24) |
            (Math.round(255 * r) << 16) |
            (Math.round(255 * s) << 8)
          );
        }
        function se(e) {
          const t = parseInt(e, 10);
          return t < 0 ? 0 : t > 255 ? 255 : t;
        }
        function le(e) {
          return (((parseFloat(e) % 360) + 360) % 360) / 360;
        }
        function de(e) {
          const t = parseFloat(e);
          return t < 0 ? 0 : t > 1 ? 255 : Math.round(255 * t);
        }
        function ce(e) {
          const t = parseFloat(e);
          return t < 0 ? 0 : t > 100 ? 1 : t / 100;
        }
        function ue(e) {
          let t = (function (e) {
            let t;
            return "number" == typeof e
              ? e >>> 0 === e && e >= 0 && e <= 4294967295
                ? e
                : null
              : (t = ie.exec(e))
              ? parseInt(t[1] + "ff", 16) >>> 0
              : R && void 0 !== R[e]
              ? R[e]
              : (t = Q.exec(e))
              ? ((se(t[1]) << 24) |
                  (se(t[2]) << 16) |
                  (se(t[3]) << 8) |
                  255) >>>
                0
              : (t = Z.exec(e))
              ? ((se(t[1]) << 24) |
                  (se(t[2]) << 16) |
                  (se(t[3]) << 8) |
                  de(t[4])) >>>
                0
              : (t = te.exec(e))
              ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>>
                0
              : (t = ae.exec(e))
              ? parseInt(t[1], 16) >>> 0
              : (t = ne.exec(e))
              ? parseInt(
                  t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4],
                  16
                ) >>> 0
              : (t = J.exec(e))
              ? (255 | re(le(t[1]), ce(t[2]), ce(t[3]))) >>> 0
              : (t = ee.exec(e))
              ? (re(le(t[1]), ce(t[2]), ce(t[3])) | de(t[4])) >>> 0
              : null;
          })(e);
          if (null === t) return e;
          t = t || 0;
          return `rgba(${(4278190080 & t) >>> 24}, ${(16711680 & t) >>> 16}, ${
            (65280 & t) >>> 8
          }, ${(255 & t) / 255})`;
        }
        var pe = (e, t, n) => {
          if (E.fun(e)) return e;
          if (E.arr(e)) return pe({ range: e, output: t, extrapolate: n });
          if (E.str(e.output[0])) return _(e);
          const i = e,
            a = i.output,
            o = i.range || [0, 1],
            r = i.extrapolateLeft || i.extrapolate || "extend",
            s = i.extrapolateRight || i.extrapolate || "extend",
            l = i.easing || ((e) => e);
          return (e) => {
            const t = (function (e, t) {
              for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n);
              return n - 1;
            })(e, o);
            return (function (e, t, n, i, a, o, r, s, l) {
              let d = l ? l(e) : e;
              if (d < t) {
                if ("identity" === r) return d;
                "clamp" === r && (d = t);
              }
              if (d > n) {
                if ("identity" === s) return d;
                "clamp" === s && (d = n);
              }
              if (i === a) return i;
              if (t === n) return e <= t ? i : a;
              t === -1 / 0
                ? (d = -d)
                : n === 1 / 0
                ? (d -= t)
                : (d = (d - t) / (n - t));
              (d = o(d)),
                i === -1 / 0
                  ? (d = -d)
                  : a === 1 / 0
                  ? (d += i)
                  : (d = d * (a - i) + i);
              return d;
            })(e, o[t], o[t + 1], a[t], a[t + 1], l, r, s, i.map);
          };
        };
        var fe = 1.70158,
          me = 1.525 * fe,
          he = fe + 1,
          ge = (2 * Math.PI) / 3,
          be = (2 * Math.PI) / 4.5,
          ve = (e) => {
            const t = 7.5625,
              n = 2.75;
            return e < 1 / n
              ? t * e * e
              : e < 2 / n
              ? t * (e -= 1.5 / n) * e + 0.75
              : e < 2.5 / n
              ? t * (e -= 2.25 / n) * e + 0.9375
              : t * (e -= 2.625 / n) * e + 0.984375;
          },
          xe = {
            linear: (e) => e,
            easeInQuad: (e) => e * e,
            easeOutQuad: (e) => 1 - (1 - e) * (1 - e),
            easeInOutQuad: (e) =>
              e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2,
            easeInCubic: (e) => e * e * e,
            easeOutCubic: (e) => 1 - Math.pow(1 - e, 3),
            easeInOutCubic: (e) =>
              e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2,
            easeInQuart: (e) => e * e * e * e,
            easeOutQuart: (e) => 1 - Math.pow(1 - e, 4),
            easeInOutQuart: (e) =>
              e < 0.5 ? 8 * e * e * e * e : 1 - Math.pow(-2 * e + 2, 4) / 2,
            easeInQuint: (e) => e * e * e * e * e,
            easeOutQuint: (e) => 1 - Math.pow(1 - e, 5),
            easeInOutQuint: (e) =>
              e < 0.5
                ? 16 * e * e * e * e * e
                : 1 - Math.pow(-2 * e + 2, 5) / 2,
            easeInSine: (e) => 1 - Math.cos((e * Math.PI) / 2),
            easeOutSine: (e) => Math.sin((e * Math.PI) / 2),
            easeInOutSine: (e) => -(Math.cos(Math.PI * e) - 1) / 2,
            easeInExpo: (e) => (0 === e ? 0 : Math.pow(2, 10 * e - 10)),
            easeOutExpo: (e) => (1 === e ? 1 : 1 - Math.pow(2, -10 * e)),
            easeInOutExpo: (e) =>
              0 === e
                ? 0
                : 1 === e
                ? 1
                : e < 0.5
                ? Math.pow(2, 20 * e - 10) / 2
                : (2 - Math.pow(2, -20 * e + 10)) / 2,
            easeInCirc: (e) => 1 - Math.sqrt(1 - Math.pow(e, 2)),
            easeOutCirc: (e) => Math.sqrt(1 - Math.pow(e - 1, 2)),
            easeInOutCirc: (e) =>
              e < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * e, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * e + 2, 2)) + 1) / 2,
            easeInBack: (e) => he * e * e * e - fe * e * e,
            easeOutBack: (e) =>
              1 + he * Math.pow(e - 1, 3) + fe * Math.pow(e - 1, 2),
            easeInOutBack: (e) =>
              e < 0.5
                ? (Math.pow(2 * e, 2) * (7.189819 * e - me)) / 2
                : (Math.pow(2 * e - 2, 2) * ((me + 1) * (2 * e - 2) + me) + 2) /
                  2,
            easeInElastic: (e) =>
              0 === e
                ? 0
                : 1 === e
                ? 1
                : -Math.pow(2, 10 * e - 10) * Math.sin((10 * e - 10.75) * ge),
            easeOutElastic: (e) =>
              0 === e
                ? 0
                : 1 === e
                ? 1
                : Math.pow(2, -10 * e) * Math.sin((10 * e - 0.75) * ge) + 1,
            easeInOutElastic: (e) =>
              0 === e
                ? 0
                : 1 === e
                ? 1
                : e < 0.5
                ? (-Math.pow(2, 20 * e - 10) *
                    Math.sin((20 * e - 11.125) * be)) /
                  2
                : (Math.pow(2, -20 * e + 10) *
                    Math.sin((20 * e - 11.125) * be)) /
                    2 +
                  1,
            easeInBounce: (e) => 1 - ve(1 - e),
            easeOutBounce: ve,
            easeInOutBounce: (e) =>
              e < 0.5 ? (1 - ve(1 - 2 * e)) / 2 : (1 + ve(2 * e - 1)) / 2,
            steps: function (e) {
              let t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "end";
              return (n) => {
                const i =
                    (n =
                      "end" === t ? Math.min(n, 0.999) : Math.max(n, 0.001)) *
                    e,
                  a = "end" === t ? Math.floor(i) : Math.ceil(i);
                return (
                  (o = 0), (r = 1), (s = a / e), Math.min(Math.max(s, o), r)
                );
                var o, r, s;
              };
            },
          },
          ye = Symbol.for("FluidValue.get"),
          we = Symbol.for("FluidValue.observers"),
          ke = (e) => Boolean(e && e[ye]),
          Ae = (e) => (e && e[ye] ? e[ye]() : e),
          Ce = (e) => e[we] || null;
        function Ee(e, t) {
          const n = e[we];
          n &&
            n.forEach((e) => {
              !(function (e, t) {
                e.eventObserved ? e.eventObserved(t) : e(t);
              })(e, t);
            });
        }
        var Se = class {
            constructor(e) {
              if (!e && !(e = this.get)) throw Error("Unknown getter");
              De(this, e);
            }
          },
          De = (e, t) => _e(e, ye, t);
        function Ye(e, t) {
          if (e[ye]) {
            let n = e[we];
            n || _e(e, we, (n = new Set())),
              n.has(t) ||
                (n.add(t), e.observerAdded && e.observerAdded(n.size, t));
          }
          return t;
        }
        function Te(e, t) {
          const n = e[we];
          if (n && n.has(t)) {
            const i = n.size - 1;
            i ? n.delete(t) : (e[we] = null),
              e.observerRemoved && e.observerRemoved(i, t);
          }
        }
        var Fe,
          _e = (e, t, n) =>
            Object.defineProperty(e, t, {
              value: n,
              writable: !0,
              configurable: !0,
            }),
          Ie = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          Me =
            /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
          Ne = new RegExp(`(${Ie.source})(%|[a-z]+)`, "i"),
          Re = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
          Oe = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/,
          je = (e) => {
            const [t, n] = Le(e);
            if (!t || N()) return e;
            const i = window
              .getComputedStyle(document.documentElement)
              .getPropertyValue(t);
            if (i) return i.trim();
            if (n && n.startsWith("--")) {
              const t = window
                .getComputedStyle(document.documentElement)
                .getPropertyValue(n);
              return t || e;
            }
            return n && Oe.test(n) ? je(n) : n || e;
          },
          Le = (e) => {
            const t = Oe.exec(e);
            if (!t) return [,];
            const [, n, i] = t;
            return [n, i];
          },
          ze = (e, t, n, i, a) =>
            `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(i)}, ${a})`,
          Ue = (e) => {
            Fe ||
              (Fe = R
                ? new RegExp(`(${Object.keys(R).join("|")})(?!\\w)`, "g")
                : /^\b$/);
            const t = e.output.map((e) =>
                Ae(e).replace(Oe, je).replace(Me, ue).replace(Fe, ue)
              ),
              n = t.map((e) => e.match(Ie).map(Number)),
              i = n[0]
                .map((e, t) =>
                  n.map((e) => {
                    if (!(t in e))
                      throw Error(
                        'The arity of each "output" value must be equal'
                      );
                    return e[t];
                  })
                )
                .map((t) => pe({ ...e, output: t }));
            return (e) => {
              const n =
                !Ne.test(t[0]) && t.find((e) => Ne.test(e))?.replace(Ie, "");
              let a = 0;
              return t[0]
                .replace(Ie, () => `${i[a++](e)}${n || ""}`)
                .replace(Re, ze);
            };
          },
          Pe = "react-spring: ",
          Be = (e) => {
            const t = e;
            let n = !1;
            if ("function" != typeof t)
              throw new TypeError(`${Pe}once requires a function parameter`);
            return function () {
              n || (t(...arguments), (n = !0));
            };
          },
          He = Be(console.warn);
        var qe = Be(console.warn);
        function $e(e) {
          return (
            E.str(e) &&
            ("#" == e[0] ||
              /\d/.test(e) ||
              (!N() && Oe.test(e)) ||
              e in (R || {}))
          );
        }
        var Ve = N() ? w.useEffect : w.useLayoutEffect,
          We = () => {
            const e = (0, w.useRef)(!1);
            return (
              Ve(
                () => (
                  (e.current = !0),
                  () => {
                    e.current = !1;
                  }
                ),
                []
              ),
              e
            );
          };
        function Ke() {
          const e = (0, w.useState)()[1],
            t = We();
          return () => {
            t.current && e(Math.random());
          };
        }
        var Ge = (e) => (0, w.useEffect)(e, Xe),
          Xe = [];
        function Qe(e) {
          const t = (0, w.useRef)();
          return (
            (0, w.useEffect)(() => {
              t.current = e;
            }),
            t.current
          );
        }
        var Ze = Symbol.for("Animated:node"),
          Je = (e) => e && e[Ze],
          et = (e, t) => {
            return (
              (n = e),
              (i = Ze),
              (a = t),
              Object.defineProperty(n, i, {
                value: a,
                writable: !0,
                configurable: !0,
              })
            );
            var n, i, a;
          },
          tt = (e) => e && e[Ze] && e[Ze].getPayload(),
          nt = class {
            constructor() {
              et(this, this);
            }
            getPayload() {
              return this.payload || [];
            }
          },
          it = class extends nt {
            constructor(e) {
              super(),
                (this._value = e),
                (this.done = !0),
                (this.durationProgress = 0),
                E.num(this._value) && (this.lastPosition = this._value);
            }
            static create(e) {
              return new it(e);
            }
            getPayload() {
              return [this];
            }
            getValue() {
              return this._value;
            }
            setValue(e, t) {
              return (
                E.num(e) &&
                  ((this.lastPosition = e),
                  t &&
                    ((e = Math.round(e / t) * t),
                    this.done && (this.lastPosition = e))),
                this._value !== e && ((this._value = e), !0)
              );
            }
            reset() {
              const { done: e } = this;
              (this.done = !1),
                E.num(this._value) &&
                  ((this.elapsedTime = 0),
                  (this.durationProgress = 0),
                  (this.lastPosition = this._value),
                  e && (this.lastVelocity = null),
                  (this.v0 = null));
            }
          },
          at = class extends it {
            constructor(e) {
              super(0),
                (this._string = null),
                (this._toString = pe({ output: [e, e] }));
            }
            static create(e) {
              return new at(e);
            }
            getValue() {
              const e = this._string;
              return null == e
                ? (this._string = this._toString(this._value))
                : e;
            }
            setValue(e) {
              if (E.str(e)) {
                if (e == this._string) return !1;
                (this._string = e), (this._value = 1);
              } else {
                if (!super.setValue(e)) return !1;
                this._string = null;
              }
              return !0;
            }
            reset(e) {
              e && (this._toString = pe({ output: [this.getValue(), e] })),
                (this._value = 0),
                super.reset();
            }
          },
          ot = { dependencies: null },
          rt = class extends nt {
            constructor(e) {
              super(), (this.source = e), this.setValue(e);
            }
            getValue(e) {
              const t = {};
              return (
                Y(this.source, (n, i) => {
                  var a;
                  (a = n) && a[Ze] === a
                    ? (t[i] = n.getValue(e))
                    : ke(n)
                    ? (t[i] = Ae(n))
                    : e || (t[i] = n);
                }),
                t
              );
            }
            setValue(e) {
              (this.source = e), (this.payload = this._makePayload(e));
            }
            reset() {
              this.payload && D(this.payload, (e) => e.reset());
            }
            _makePayload(e) {
              if (e) {
                const t = new Set();
                return Y(e, this._addToPayload, t), Array.from(t);
              }
            }
            _addToPayload(e) {
              ot.dependencies && ke(e) && ot.dependencies.add(e);
              const t = tt(e);
              t && D(t, (e) => this.add(e));
            }
          },
          st = class extends rt {
            constructor(e) {
              super(e);
            }
            static create(e) {
              return new st(e);
            }
            getValue() {
              return this.source.map((e) => e.getValue());
            }
            setValue(e) {
              const t = this.getPayload();
              return e.length == t.length
                ? t.map((t, n) => t.setValue(e[n])).some(Boolean)
                : (super.setValue(e.map(lt)), !0);
            }
          };
        function lt(e) {
          return ($e(e) ? at : it).create(e);
        }
        function dt(e) {
          const t = Je(e);
          return t ? t.constructor : E.arr(e) ? st : $e(e) ? at : it;
        }
        var ct = (e, t) => {
            const n =
              !E.fun(e) || (e.prototype && e.prototype.isReactComponent);
            return (0, w.forwardRef)((i, o) => {
              const r = (0, w.useRef)(null),
                s =
                  n &&
                  (0, w.useCallback)(
                    (e) => {
                      r.current = (function (e, t) {
                        e && (E.fun(e) ? e(t) : (e.current = t));
                        return t;
                      })(o, e);
                    },
                    [o]
                  ),
                [l, d] = (function (e, t) {
                  const n = new Set();
                  (ot.dependencies = n),
                    e.style &&
                      (e = { ...e, style: t.createAnimatedStyle(e.style) });
                  return (e = new rt(e)), (ot.dependencies = null), [e, n];
                })(i, t),
                c = Ke(),
                u = () => {
                  const e = r.current;
                  if (n && !e) return;
                  !1 === (!!e && t.applyAnimatedValues(e, l.getValue(!0))) &&
                    c();
                },
                p = new ut(u, d),
                f = (0, w.useRef)();
              Ve(
                () => (
                  (f.current = p),
                  D(d, (e) => Ye(e, p)),
                  () => {
                    f.current &&
                      (D(f.current.deps, (e) => Te(e, f.current)),
                      a.cancel(f.current.update));
                  }
                )
              ),
                (0, w.useEffect)(u, []),
                Ge(() => () => {
                  const e = f.current;
                  D(e.deps, (t) => Te(t, e));
                });
              const m = t.getComponentProps(l.getValue());
              return w.createElement(e, { ...m, ref: s });
            });
          },
          ut = class {
            constructor(e, t) {
              (this.update = e), (this.deps = t);
            }
            eventObserved(e) {
              "change" == e.type && a.write(this.update);
            }
          };
        var pt = Symbol.for("AnimatedComponent"),
          ft = (e) =>
            E.str(e)
              ? e
              : e && E.str(e.displayName)
              ? e.displayName
              : (E.fun(e) && e.name) || null;
        function mt(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
            i < t;
            i++
          )
            n[i - 1] = arguments[i];
          return E.fun(e) ? e(...n) : e;
        }
        var ht = (e, t) =>
            !0 === e || !!(t && e && (E.fun(e) ? e(t) : T(e).includes(t))),
          gt = (e, t) => (E.obj(e) ? t && e[t] : e),
          bt = (e, t) =>
            !0 === e.default ? e[t] : e.default ? e.default[t] : void 0,
          vt = (e) => e,
          xt = function (e) {
            let t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : vt,
              n = yt;
            e.default &&
              !0 !== e.default &&
              ((e = e.default), (n = Object.keys(e)));
            const i = {};
            for (const a of n) {
              const n = t(e[a], a);
              E.und(n) || (i[a] = n);
            }
            return i;
          },
          yt = [
            "config",
            "onProps",
            "onStart",
            "onChange",
            "onPause",
            "onResume",
            "onRest",
          ],
          wt = {
            config: 1,
            from: 1,
            to: 1,
            ref: 1,
            loop: 1,
            reset: 1,
            pause: 1,
            cancel: 1,
            reverse: 1,
            immediate: 1,
            default: 1,
            delay: 1,
            onProps: 1,
            onStart: 1,
            onChange: 1,
            onPause: 1,
            onResume: 1,
            onRest: 1,
            onResolve: 1,
            items: 1,
            trail: 1,
            sort: 1,
            expires: 1,
            initial: 1,
            enter: 1,
            update: 1,
            leave: 1,
            children: 1,
            onDestroyed: 1,
            keys: 1,
            callId: 1,
            parentId: 1,
          };
        function kt(e) {
          const t = (function (e) {
            const t = {};
            let n = 0;
            if (
              (Y(e, (e, i) => {
                wt[i] || ((t[i] = e), n++);
              }),
              n)
            )
              return t;
          })(e);
          if (t) {
            const n = { to: t };
            return Y(e, (e, i) => i in t || (n[i] = e)), n;
          }
          return { ...e };
        }
        function At(e) {
          return (
            (e = Ae(e)),
            E.arr(e)
              ? e.map(At)
              : $e(e)
              ? A.createStringInterpolator({ range: [0, 1], output: [e, e] })(1)
              : e
          );
        }
        function Ct(e) {
          for (const t in e) return !0;
          return !1;
        }
        function Et(e) {
          return E.fun(e) || (E.arr(e) && E.obj(e[0]));
        }
        function St(e, t) {
          e.ref?.delete(e), t?.delete(e);
        }
        function Dt(e, t) {
          t && e.ref !== t && (e.ref?.delete(e), t.add(e), (e.ref = t));
        }
        function Yt(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : 1e3;
          Ve(() => {
            if (t) {
              let i = 0;
              D(e, (e, a) => {
                const o = e.current;
                if (o.length) {
                  let r = n * t[a];
                  isNaN(r) ? (r = i) : (i = r),
                    D(o, (e) => {
                      D(e.queue, (e) => {
                        const t = e.delay;
                        e.delay = (e) => r + mt(t || 0, e);
                      });
                    }),
                    e.start();
                }
              });
            } else {
              let t = Promise.resolve();
              D(e, (e) => {
                const n = e.current;
                if (n.length) {
                  const i = n.map((e) => {
                    const t = e.queue;
                    return (e.queue = []), t;
                  });
                  t = t.then(
                    () => (
                      D(n, (e, t) => D(i[t] || [], (t) => e.queue.push(t))),
                      Promise.all(e.start())
                    )
                  );
                }
              });
            }
          });
        }
        var Tt = {
            tension: 170,
            friction: 26,
            mass: 1,
            damping: 1,
            easing: xe.linear,
            clamp: !1,
          },
          Ft = class {
            constructor() {
              (this.velocity = 0), Object.assign(this, Tt);
            }
          };
        function _t(e, t) {
          if (E.und(t.decay)) {
            const n = !E.und(t.tension) || !E.und(t.friction);
            (!n && E.und(t.frequency) && E.und(t.damping) && E.und(t.mass)) ||
              ((e.duration = void 0), (e.decay = void 0)),
              n && (e.frequency = void 0);
          } else e.duration = void 0;
        }
        var It = [],
          Mt = class {
            constructor() {
              (this.changed = !1),
                (this.values = It),
                (this.toValues = null),
                (this.fromValues = It),
                (this.config = new Ft()),
                (this.immediate = !1);
            }
          };
        function Nt(e, t) {
          let { key: n, props: i, defaultProps: o, state: r, actions: s } = t;
          return new Promise((t, l) => {
            let d,
              c,
              u = ht(i.cancel ?? o?.cancel, n);
            if (u) m();
            else {
              E.und(i.pause) || (r.paused = ht(i.pause, n));
              let e = o?.pause;
              !0 !== e && (e = r.paused || ht(e, n)),
                (d = mt(i.delay || 0, n)),
                e ? (r.resumeQueue.add(f), s.pause()) : (s.resume(), f());
            }
            function p() {
              r.resumeQueue.add(f),
                r.timeouts.delete(c),
                c.cancel(),
                (d = c.time - a.now());
            }
            function f() {
              d > 0 && !A.skipAnimation
                ? ((r.delayed = !0),
                  (c = a.setTimeout(m, d)),
                  r.pauseQueue.add(p),
                  r.timeouts.add(c))
                : m();
            }
            function m() {
              r.delayed && (r.delayed = !1),
                r.pauseQueue.delete(p),
                r.timeouts.delete(c),
                e <= (r.cancelId || 0) && (u = !0);
              try {
                s.start({ ...i, callId: e, cancel: u }, t);
              } catch (e) {
                l(e);
              }
            }
          });
        }
        var Rt = (e, t) =>
            1 == t.length
              ? t[0]
              : t.some((e) => e.cancelled)
              ? Lt(e.get())
              : t.every((e) => e.noop)
              ? Ot(e.get())
              : jt(
                  e.get(),
                  t.every((e) => e.finished)
                ),
          Ot = (e) => ({ value: e, noop: !0, finished: !0, cancelled: !1 }),
          jt = function (e, t) {
            return {
              value: e,
              finished: t,
              cancelled:
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            };
          },
          Lt = (e) => ({ value: e, cancelled: !0, finished: !1 });
        function zt(e, t, n, i) {
          const { callId: o, parentId: r, onRest: s } = t,
            { asyncTo: l, promise: d } = n;
          return r || e !== l || t.reset
            ? (n.promise = (async () => {
                (n.asyncId = o), (n.asyncTo = e);
                const c = xt(t, (e, t) => ("onRest" === t ? void 0 : e));
                let u, p;
                const f = new Promise((e, t) => ((u = e), (p = t))),
                  m = (e) => {
                    const t =
                      (o <= (n.cancelId || 0) && Lt(i)) ||
                      (o !== n.asyncId && jt(i, !1));
                    if (t) throw ((e.result = t), p(e), e);
                  },
                  h = (e, t) => {
                    const a = new Pt(),
                      r = new Bt();
                    return (async () => {
                      if (A.skipAnimation)
                        throw (Ut(n), (r.result = jt(i, !1)), p(r), r);
                      m(a);
                      const s = E.obj(e) ? { ...e } : { ...t, to: e };
                      (s.parentId = o),
                        Y(c, (e, t) => {
                          E.und(s[t]) && (s[t] = e);
                        });
                      const l = await i.start(s);
                      return (
                        m(a),
                        n.paused &&
                          (await new Promise((e) => {
                            n.resumeQueue.add(e);
                          })),
                        l
                      );
                    })();
                  };
                let g;
                if (A.skipAnimation) return Ut(n), jt(i, !1);
                try {
                  let t;
                  (t = E.arr(e)
                    ? (async (e) => {
                        for (const t of e) await h(t);
                      })(e)
                    : Promise.resolve(e(h, i.stop.bind(i)))),
                    await Promise.all([t.then(u), f]),
                    (g = jt(i.get(), !0, !1));
                } catch (e) {
                  if (e instanceof Pt) g = e.result;
                  else {
                    if (!(e instanceof Bt)) throw e;
                    g = e.result;
                  }
                } finally {
                  o == n.asyncId &&
                    ((n.asyncId = r),
                    (n.asyncTo = r ? l : void 0),
                    (n.promise = r ? d : void 0));
                }
                return (
                  E.fun(s) &&
                    a.batchedUpdates(() => {
                      s(g, i, i.item);
                    }),
                  g
                );
              })())
            : d;
        }
        function Ut(e, t) {
          F(e.timeouts, (e) => e.cancel()),
            e.pauseQueue.clear(),
            e.resumeQueue.clear(),
            (e.asyncId = e.asyncTo = e.promise = void 0),
            t && (e.cancelId = t);
        }
        var Pt = class extends Error {
            constructor() {
              super(
                "An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."
              );
            }
          },
          Bt = class extends Error {
            constructor() {
              super("SkipAnimationSignal");
            }
          },
          Ht = (e) => e instanceof $t,
          qt = 1,
          $t = class extends Se {
            constructor() {
              super(...arguments), (this.id = qt++), (this._priority = 0);
            }
            get priority() {
              return this._priority;
            }
            set priority(e) {
              this._priority != e &&
                ((this._priority = e), this._onPriorityChange(e));
            }
            get() {
              const e = Je(this);
              return e && e.getValue();
            }
            to() {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return A.to(this, t);
            }
            interpolate() {
              He(
                `${Pe}The "interpolate" function is deprecated in v9 (use "to" instead)`
              );
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return A.to(this, t);
            }
            toJSON() {
              return this.get();
            }
            observerAdded(e) {
              1 == e && this._attach();
            }
            observerRemoved(e) {
              0 == e && this._detach();
            }
            _attach() {}
            _detach() {}
            _onChange(e) {
              Ee(this, {
                type: "change",
                parent: this,
                value: e,
                idle:
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1],
              });
            }
            _onPriorityChange(e) {
              this.idle || H.sort(this),
                Ee(this, { type: "priority", parent: this, priority: e });
            }
          },
          Vt = Symbol.for("SpringPhase"),
          Wt = (e) => (1 & e[Vt]) > 0,
          Kt = (e) => (2 & e[Vt]) > 0,
          Gt = (e) => (4 & e[Vt]) > 0,
          Xt = (e, t) => (t ? (e[Vt] |= 3) : (e[Vt] &= -3)),
          Qt = (e, t) => (t ? (e[Vt] |= 4) : (e[Vt] &= -5)),
          Zt = class extends $t {
            constructor(e, t) {
              if (
                (super(),
                (this.animation = new Mt()),
                (this.defaultProps = {}),
                (this._state = {
                  paused: !1,
                  delayed: !1,
                  pauseQueue: new Set(),
                  resumeQueue: new Set(),
                  timeouts: new Set(),
                }),
                (this._pendingCalls = new Set()),
                (this._lastCallId = 0),
                (this._lastToId = 0),
                (this._memoizedDuration = 0),
                !E.und(e) || !E.und(t))
              ) {
                const n = E.obj(e) ? { ...e } : { ...t, from: e };
                E.und(n.default) && (n.default = !0), this.start(n);
              }
            }
            get idle() {
              return !(Kt(this) || this._state.asyncTo) || Gt(this);
            }
            get goal() {
              return Ae(this.animation.to);
            }
            get velocity() {
              const e = Je(this);
              return e instanceof it
                ? e.lastVelocity || 0
                : e.getPayload().map((e) => e.lastVelocity || 0);
            }
            get hasAnimated() {
              return Wt(this);
            }
            get isAnimating() {
              return Kt(this);
            }
            get isPaused() {
              return Gt(this);
            }
            get isDelayed() {
              return this._state.delayed;
            }
            advance(e) {
              let t = !0,
                n = !1;
              const i = this.animation;
              let { toValues: a } = i;
              const { config: o } = i,
                r = tt(i.to);
              !r && ke(i.to) && (a = T(Ae(i.to))),
                i.values.forEach((s, l) => {
                  if (s.done) return;
                  const d =
                    s.constructor == at ? 1 : r ? r[l].lastPosition : a[l];
                  let c = i.immediate,
                    u = d;
                  if (!c) {
                    if (((u = s.lastPosition), o.tension <= 0))
                      return void (s.done = !0);
                    let t = (s.elapsedTime += e);
                    const n = i.fromValues[l],
                      a =
                        null != s.v0
                          ? s.v0
                          : (s.v0 = E.arr(o.velocity)
                              ? o.velocity[l]
                              : o.velocity);
                    let r;
                    const p =
                      o.precision ||
                      (n == d ? 0.005 : Math.min(1, 0.001 * Math.abs(d - n)));
                    if (E.und(o.duration))
                      if (o.decay) {
                        const e = !0 === o.decay ? 0.998 : o.decay,
                          i = Math.exp(-(1 - e) * t);
                        (u = n + (a / (1 - e)) * (1 - i)),
                          (c = Math.abs(s.lastPosition - u) <= p),
                          (r = a * i);
                      } else {
                        r = null == s.lastVelocity ? a : s.lastVelocity;
                        const t = o.restVelocity || p / 10,
                          i = o.clamp ? 0 : o.bounce,
                          l = !E.und(i),
                          f = n == d ? s.v0 > 0 : n < d;
                        let m,
                          h = !1;
                        const g = 1,
                          b = Math.ceil(e / g);
                        for (
                          let e = 0;
                          e < b &&
                          ((m = Math.abs(r) > t),
                          m || ((c = Math.abs(d - u) <= p), !c));
                          ++e
                        ) {
                          l &&
                            ((h = u == d || u > d == f),
                            h && ((r = -r * i), (u = d)));
                          (r +=
                            ((1e-6 * -o.tension * (u - d) +
                              0.001 * -o.friction * r) /
                              o.mass) *
                            g),
                            (u += r * g);
                        }
                      }
                    else {
                      let i = 1;
                      o.duration > 0 &&
                        (this._memoizedDuration !== o.duration &&
                          ((this._memoizedDuration = o.duration),
                          s.durationProgress > 0 &&
                            ((s.elapsedTime = o.duration * s.durationProgress),
                            (t = s.elapsedTime += e))),
                        (i = (o.progress || 0) + t / this._memoizedDuration),
                        (i = i > 1 ? 1 : i < 0 ? 0 : i),
                        (s.durationProgress = i)),
                        (u = n + o.easing(i) * (d - n)),
                        (r = (u - s.lastPosition) / e),
                        (c = 1 == i);
                    }
                    (s.lastVelocity = r),
                      Number.isNaN(u) &&
                        (console.warn("Got NaN while animating:", this),
                        (c = !0));
                  }
                  r && !r[l].done && (c = !1),
                    c ? (s.done = !0) : (t = !1),
                    s.setValue(u, o.round) && (n = !0);
                });
              const s = Je(this),
                l = s.getValue();
              if (t) {
                const e = Ae(i.to);
                (l === e && !n) || o.decay
                  ? n && o.decay && this._onChange(l)
                  : (s.setValue(e), this._onChange(e)),
                  this._stop();
              } else n && this._onChange(l);
            }
            set(e) {
              return (
                a.batchedUpdates(() => {
                  this._stop(), this._focus(e), this._set(e);
                }),
                this
              );
            }
            pause() {
              this._update({ pause: !0 });
            }
            resume() {
              this._update({ pause: !1 });
            }
            finish() {
              if (Kt(this)) {
                const { to: e, config: t } = this.animation;
                a.batchedUpdates(() => {
                  this._onStart(), t.decay || this._set(e, !1), this._stop();
                });
              }
              return this;
            }
            update(e) {
              return (this.queue || (this.queue = [])).push(e), this;
            }
            start(e, t) {
              let n;
              return (
                E.und(e)
                  ? ((n = this.queue || []), (this.queue = []))
                  : (n = [E.obj(e) ? e : { ...t, to: e }]),
                Promise.all(n.map((e) => this._update(e))).then((e) =>
                  Rt(this, e)
                )
              );
            }
            stop(e) {
              const { to: t } = this.animation;
              return (
                this._focus(this.get()),
                Ut(this._state, e && this._lastCallId),
                a.batchedUpdates(() => this._stop(t, e)),
                this
              );
            }
            reset() {
              this._update({ reset: !0 });
            }
            eventObserved(e) {
              "change" == e.type
                ? this._start()
                : "priority" == e.type && (this.priority = e.priority + 1);
            }
            _prepareNode(e) {
              const t = this.key || "";
              let { to: n, from: i } = e;
              (n = E.obj(n) ? n[t] : n),
                (null == n || Et(n)) && (n = void 0),
                (i = E.obj(i) ? i[t] : i),
                null == i && (i = void 0);
              const a = { to: n, from: i };
              return (
                Wt(this) ||
                  (e.reverse && ([n, i] = [i, n]),
                  (i = Ae(i)),
                  E.und(i) ? Je(this) || this._set(n) : this._set(i)),
                a
              );
            }
            _update(e, t) {
              let { ...n } = e;
              const { key: i, defaultProps: a } = this;
              n.default &&
                Object.assign(
                  a,
                  xt(n, (e, t) => (/^on/.test(t) ? gt(e, i) : e))
                ),
                rn(this, n, "onProps"),
                sn(this, "onProps", n, this);
              const o = this._prepareNode(n);
              if (Object.isFrozen(this))
                throw Error(
                  "Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?"
                );
              const r = this._state;
              return Nt(++this._lastCallId, {
                key: i,
                props: n,
                defaultProps: a,
                state: r,
                actions: {
                  pause: () => {
                    Gt(this) ||
                      (Qt(this, !0),
                      M(r.pauseQueue),
                      sn(
                        this,
                        "onPause",
                        jt(this, Jt(this, this.animation.to)),
                        this
                      ));
                  },
                  resume: () => {
                    Gt(this) &&
                      (Qt(this, !1),
                      Kt(this) && this._resume(),
                      M(r.resumeQueue),
                      sn(
                        this,
                        "onResume",
                        jt(this, Jt(this, this.animation.to)),
                        this
                      ));
                  },
                  start: this._merge.bind(this, o),
                },
              }).then((e) => {
                if (n.loop && e.finished && (!t || !e.noop)) {
                  const e = en(n);
                  if (e) return this._update(e, !0);
                }
                return e;
              });
            }
            _merge(e, t, n) {
              if (t.cancel) return this.stop(!0), n(Lt(this));
              const i = !E.und(e.to),
                o = !E.und(e.from);
              if (i || o) {
                if (!(t.callId > this._lastToId)) return n(Lt(this));
                this._lastToId = t.callId;
              }
              const { key: r, defaultProps: s, animation: l } = this,
                { to: d, from: c } = l;
              let { to: u = d, from: p = c } = e;
              !o || i || (t.default && !E.und(u)) || (u = p),
                t.reverse && ([u, p] = [p, u]);
              const f = !S(p, c);
              f && (l.from = p), (p = Ae(p));
              const m = !S(u, d);
              m && this._focus(u);
              const h = Et(t.to),
                { config: g } = l,
                { decay: b, velocity: v } = g;
              (i || o) && (g.velocity = 0),
                t.config &&
                  !h &&
                  (function (e, t, n) {
                    n && (_t((n = { ...n }), t), (t = { ...n, ...t })),
                      _t(e, t),
                      Object.assign(e, t);
                    for (const t in Tt) null == e[t] && (e[t] = Tt[t]);
                    let { frequency: i, damping: a } = e;
                    const { mass: o } = e;
                    E.und(i) ||
                      (i < 0.01 && (i = 0.01),
                      a < 0 && (a = 0),
                      (e.tension = Math.pow((2 * Math.PI) / i, 2) * o),
                      (e.friction = (4 * Math.PI * a * o) / i));
                  })(
                    g,
                    mt(t.config, r),
                    t.config !== s.config ? mt(s.config, r) : void 0
                  );
              let x = Je(this);
              if (!x || E.und(u)) return n(jt(this, !0));
              const y = E.und(t.reset)
                  ? o && !t.default
                  : !E.und(p) && ht(t.reset, r),
                w = y ? p : this.get(),
                k = At(u),
                A = E.num(k) || E.arr(k) || $e(k),
                C = !h && (!A || ht(s.immediate || t.immediate, r));
              if (m) {
                const e = dt(u);
                if (e !== x.constructor) {
                  if (!C)
                    throw Error(
                      `Cannot animate between ${x.constructor.name} and ${e.name}, as the "to" prop suggests`
                    );
                  x = this._set(k);
                }
              }
              const Y = x.constructor;
              let F = ke(u),
                _ = !1;
              if (!F) {
                const e = y || (!Wt(this) && f);
                (m || e) && ((_ = S(At(w), k)), (F = !_)),
                  ((S(l.immediate, C) || C) &&
                    S(g.decay, b) &&
                    S(g.velocity, v)) ||
                    (F = !0);
              }
              if (
                (_ &&
                  Kt(this) &&
                  (l.changed && !y ? (F = !0) : F || this._stop(d)),
                !h &&
                  ((F || ke(d)) &&
                    ((l.values = x.getPayload()),
                    (l.toValues = ke(u) ? null : Y == at ? [1] : T(k))),
                  l.immediate != C &&
                    ((l.immediate = C), C || y || this._set(d)),
                  F))
              ) {
                const { onRest: e } = l;
                D(on, (e) => rn(this, t, e));
                const i = jt(this, Jt(this, d));
                M(this._pendingCalls, i),
                  this._pendingCalls.add(n),
                  l.changed &&
                    a.batchedUpdates(() => {
                      (l.changed = !y),
                        e?.(i, this),
                        y ? mt(s.onRest, i) : l.onStart?.(i, this);
                    });
              }
              y && this._set(w),
                h
                  ? n(zt(t.to, t, this._state, this))
                  : F
                  ? this._start()
                  : Kt(this) && !m
                  ? this._pendingCalls.add(n)
                  : n(Ot(w));
            }
            _focus(e) {
              const t = this.animation;
              e !== t.to &&
                (Ce(this) && this._detach(),
                (t.to = e),
                Ce(this) && this._attach());
            }
            _attach() {
              let e = 0;
              const { to: t } = this.animation;
              ke(t) && (Ye(t, this), Ht(t) && (e = t.priority + 1)),
                (this.priority = e);
            }
            _detach() {
              const { to: e } = this.animation;
              ke(e) && Te(e, this);
            }
            _set(e) {
              let t =
                !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1];
              const n = Ae(e);
              if (!E.und(n)) {
                const e = Je(this);
                if (!e || !S(n, e.getValue())) {
                  const i = dt(n);
                  e && e.constructor == i
                    ? e.setValue(n)
                    : et(this, i.create(n)),
                    e &&
                      a.batchedUpdates(() => {
                        this._onChange(n, t);
                      });
                }
              }
              return Je(this);
            }
            _onStart() {
              const e = this.animation;
              e.changed ||
                ((e.changed = !0),
                sn(this, "onStart", jt(this, Jt(this, e.to)), this));
            }
            _onChange(e, t) {
              t || (this._onStart(), mt(this.animation.onChange, e, this)),
                mt(this.defaultProps.onChange, e, this),
                super._onChange(e, t);
            }
            _start() {
              const e = this.animation;
              Je(this).reset(Ae(e.to)),
                e.immediate ||
                  (e.fromValues = e.values.map((e) => e.lastPosition)),
                Kt(this) || (Xt(this, !0), Gt(this) || this._resume());
            }
            _resume() {
              A.skipAnimation ? this.finish() : H.start(this);
            }
            _stop(e, t) {
              if (Kt(this)) {
                Xt(this, !1);
                const n = this.animation;
                D(n.values, (e) => {
                  e.done = !0;
                }),
                  n.toValues && (n.onChange = n.onPause = n.onResume = void 0),
                  Ee(this, { type: "idle", parent: this });
                const i = t
                  ? Lt(this.get())
                  : jt(this.get(), Jt(this, e ?? n.to));
                M(this._pendingCalls, i),
                  n.changed && ((n.changed = !1), sn(this, "onRest", i, this));
              }
            }
          };
        function Jt(e, t) {
          const n = At(t);
          return S(At(e.get()), n);
        }
        function en(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : e.loop,
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : e.to;
          const i = mt(t);
          if (i) {
            const a = !0 !== i && kt(i),
              o = (a || e).reverse,
              r = !a || a.reset;
            return tn({
              ...e,
              loop: t,
              default: !1,
              pause: void 0,
              to: !o || Et(n) ? n : void 0,
              from: r ? e.from : void 0,
              reset: r,
              ...a,
            });
          }
        }
        function tn(e) {
          const { to: t, from: n } = (e = kt(e)),
            i = new Set();
          return (
            E.obj(t) && an(t, i),
            E.obj(n) && an(n, i),
            (e.keys = i.size ? Array.from(i) : null),
            e
          );
        }
        function nn(e) {
          const t = tn(e);
          return E.und(t.default) && (t.default = xt(t)), t;
        }
        function an(e, t) {
          Y(e, (e, n) => null != e && t.add(n));
        }
        var on = ["onStart", "onRest", "onChange", "onPause", "onResume"];
        function rn(e, t, n) {
          e.animation[n] = t[n] !== bt(t, n) ? gt(t[n], e.key) : void 0;
        }
        function sn(e, t) {
          for (
            var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2;
            a < n;
            a++
          )
            i[a - 2] = arguments[a];
          e.animation[t]?.(...i), e.defaultProps[t]?.(...i);
        }
        var ln = ["onStart", "onChange", "onRest"],
          dn = 1,
          cn = class {
            constructor(e, t) {
              (this.id = dn++),
                (this.springs = {}),
                (this.queue = []),
                (this._lastAsyncId = 0),
                (this._active = new Set()),
                (this._changed = new Set()),
                (this._started = !1),
                (this._state = {
                  paused: !1,
                  pauseQueue: new Set(),
                  resumeQueue: new Set(),
                  timeouts: new Set(),
                }),
                (this._events = {
                  onStart: new Map(),
                  onChange: new Map(),
                  onRest: new Map(),
                }),
                (this._onFrame = this._onFrame.bind(this)),
                t && (this._flush = t),
                e && this.start({ default: !0, ...e });
            }
            get idle() {
              return (
                !this._state.asyncTo &&
                Object.values(this.springs).every(
                  (e) => e.idle && !e.isDelayed && !e.isPaused
                )
              );
            }
            get item() {
              return this._item;
            }
            set item(e) {
              this._item = e;
            }
            get() {
              const e = {};
              return this.each((t, n) => (e[n] = t.get())), e;
            }
            set(e) {
              for (const t in e) {
                const n = e[t];
                E.und(n) || this.springs[t].set(n);
              }
            }
            update(e) {
              return e && this.queue.push(tn(e)), this;
            }
            start(e) {
              let { queue: t } = this;
              return (
                e ? (t = T(e).map(tn)) : (this.queue = []),
                this._flush ? this._flush(this, t) : (bn(this, t), un(this, t))
              );
            }
            stop(e, t) {
              if ((e !== !!e && (t = e), t)) {
                const n = this.springs;
                D(T(t), (t) => n[t].stop(!!e));
              } else
                Ut(this._state, this._lastAsyncId),
                  this.each((t) => t.stop(!!e));
              return this;
            }
            pause(e) {
              if (E.und(e)) this.start({ pause: !0 });
              else {
                const t = this.springs;
                D(T(e), (e) => t[e].pause());
              }
              return this;
            }
            resume(e) {
              if (E.und(e)) this.start({ pause: !1 });
              else {
                const t = this.springs;
                D(T(e), (e) => t[e].resume());
              }
              return this;
            }
            each(e) {
              Y(this.springs, e);
            }
            _onFrame() {
              const { onStart: e, onChange: t, onRest: n } = this._events,
                i = this._active.size > 0,
                a = this._changed.size > 0;
              ((i && !this._started) || (a && !this._started)) &&
                ((this._started = !0),
                F(e, (e) => {
                  let [t, n] = e;
                  (n.value = this.get()), t(n, this, this._item);
                }));
              const o = !i && this._started,
                r = a || (o && n.size) ? this.get() : null;
              a &&
                t.size &&
                F(t, (e) => {
                  let [t, n] = e;
                  (n.value = r), t(n, this, this._item);
                }),
                o &&
                  ((this._started = !1),
                  F(n, (e) => {
                    let [t, n] = e;
                    (n.value = r), t(n, this, this._item);
                  }));
            }
            eventObserved(e) {
              if ("change" == e.type)
                this._changed.add(e.parent),
                  e.idle || this._active.add(e.parent);
              else {
                if ("idle" != e.type) return;
                this._active.delete(e.parent);
              }
              a.onFrame(this._onFrame);
            }
          };
        function un(e, t) {
          return Promise.all(t.map((t) => pn(e, t))).then((t) => Rt(e, t));
        }
        async function pn(e, t, n) {
          const {
              keys: i,
              to: o,
              from: r,
              loop: s,
              onRest: l,
              onResolve: d,
            } = t,
            c = E.obj(t.default) && t.default;
          s && (t.loop = !1),
            !1 === o && (t.to = null),
            !1 === r && (t.from = null);
          const u = E.arr(o) || E.fun(o) ? o : void 0;
          u
            ? ((t.to = void 0), (t.onRest = void 0), c && (c.onRest = void 0))
            : D(ln, (n) => {
                const i = t[n];
                if (E.fun(i)) {
                  const a = e._events[n];
                  (t[n] = (e) => {
                    let { finished: t, cancelled: n } = e;
                    const o = a.get(i);
                    o
                      ? (t || (o.finished = !1), n && (o.cancelled = !0))
                      : a.set(i, {
                          value: null,
                          finished: t || !1,
                          cancelled: n || !1,
                        });
                  }),
                    c && (c[n] = t[n]);
                }
              });
          const p = e._state;
          t.pause === !p.paused
            ? ((p.paused = t.pause), M(t.pause ? p.pauseQueue : p.resumeQueue))
            : p.paused && (t.pause = !0);
          const f = (i || Object.keys(e.springs)).map((n) =>
              e.springs[n].start(t)
            ),
            m = !0 === t.cancel || !0 === bt(t, "cancel");
          (u || (m && p.asyncId)) &&
            f.push(
              Nt(++e._lastAsyncId, {
                props: t,
                state: p,
                actions: {
                  pause: C,
                  resume: C,
                  start(t, n) {
                    m
                      ? (Ut(p, e._lastAsyncId), n(Lt(e)))
                      : ((t.onRest = l), n(zt(u, t, p, e)));
                  },
                },
              })
            ),
            p.paused &&
              (await new Promise((e) => {
                p.resumeQueue.add(e);
              }));
          const h = Rt(e, await Promise.all(f));
          if (s && h.finished && (!n || !h.noop)) {
            const n = en(t, s, o);
            if (n) return bn(e, [n]), pn(e, n, !0);
          }
          return d && a.batchedUpdates(() => d(h, e, e.item)), h;
        }
        function fn(e, t) {
          const n = { ...e.springs };
          return (
            t &&
              D(T(t), (e) => {
                E.und(e.keys) && (e = tn(e)),
                  E.obj(e.to) || (e = { ...e, to: void 0 }),
                  gn(n, e, (e) => hn(e));
              }),
            mn(e, n),
            n
          );
        }
        function mn(e, t) {
          Y(t, (t, n) => {
            e.springs[n] || ((e.springs[n] = t), Ye(t, e));
          });
        }
        function hn(e, t) {
          const n = new Zt();
          return (n.key = e), t && Ye(n, t), n;
        }
        function gn(e, t, n) {
          t.keys &&
            D(t.keys, (i) => {
              (e[i] || (e[i] = n(i)))._prepareNode(t);
            });
        }
        function bn(e, t) {
          D(t, (t) => {
            gn(e.springs, t, (t) => hn(t, e));
          });
        }
        var vn,
          xn,
          yn = (e) => {
            let { children: t, ...n } = e;
            const i = (0, w.useContext)(wn),
              a = n.pause || !!i.pause,
              o = n.immediate || !!i.immediate;
            n = (function (e, t) {
              const [n] = (0, w.useState)(() => ({ inputs: t, result: e() })),
                i = (0, w.useRef)(),
                a = i.current;
              let o = a;
              o
                ? Boolean(
                    t &&
                      o.inputs &&
                      (function (e, t) {
                        if (e.length !== t.length) return !1;
                        for (let n = 0; n < e.length; n++)
                          if (e[n] !== t[n]) return !1;
                        return !0;
                      })(t, o.inputs)
                  ) || (o = { inputs: t, result: e() })
                : (o = n);
              return (
                (0, w.useEffect)(() => {
                  (i.current = o), a == n && (n.inputs = n.result = void 0);
                }, [o]),
                o.result
              );
            })(() => ({ pause: a, immediate: o }), [a, o]);
            const { Provider: r } = wn;
            return w.createElement(r, { value: n }, t);
          },
          wn =
            ((vn = yn),
            (xn = {}),
            Object.assign(vn, w.createContext(xn)),
            (vn.Provider._context = vn),
            (vn.Consumer._context = vn),
            vn);
        (yn.Provider = wn.Provider), (yn.Consumer = wn.Consumer);
        var kn = () => {
          const e = [],
            t = function (t) {
              qe(
                `${Pe}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`
              );
              const i = [];
              return (
                D(e, (e, a) => {
                  if (E.und(t)) i.push(e.start());
                  else {
                    const o = n(t, e, a);
                    o && i.push(e.start(o));
                  }
                }),
                i
              );
            };
          (t.current = e),
            (t.add = function (t) {
              e.includes(t) || e.push(t);
            }),
            (t.delete = function (t) {
              const n = e.indexOf(t);
              ~n && e.splice(n, 1);
            }),
            (t.pause = function () {
              return D(e, (e) => e.pause(...arguments)), this;
            }),
            (t.resume = function () {
              return D(e, (e) => e.resume(...arguments)), this;
            }),
            (t.set = function (t) {
              D(e, (e, n) => {
                const i = E.fun(t) ? t(n, e) : t;
                i && e.set(i);
              });
            }),
            (t.start = function (t) {
              const n = [];
              return (
                D(e, (e, i) => {
                  if (E.und(t)) n.push(e.start());
                  else {
                    const a = this._getProps(t, e, i);
                    a && n.push(e.start(a));
                  }
                }),
                n
              );
            }),
            (t.stop = function () {
              return D(e, (e) => e.stop(...arguments)), this;
            }),
            (t.update = function (t) {
              return D(e, (e, n) => e.update(this._getProps(t, e, n))), this;
            });
          const n = function (e, t, n) {
            return E.fun(e) ? e(n, t) : e;
          };
          return (t._getProps = n), t;
        };
        function An(e, t, n) {
          const i = E.fun(t) && t;
          i && !n && (n = []);
          const a = (0, w.useMemo)(
              () => (i || 3 == arguments.length ? kn() : void 0),
              []
            ),
            o = (0, w.useRef)(0),
            r = Ke(),
            s = (0, w.useMemo)(
              () => ({
                ctrls: [],
                queue: [],
                flush(e, t) {
                  const n = fn(e, t);
                  return o.current > 0 &&
                    !s.queue.length &&
                    !Object.keys(n).some((t) => !e.springs[t])
                    ? un(e, t)
                    : new Promise((i) => {
                        mn(e, n),
                          s.queue.push(() => {
                            i(un(e, t));
                          }),
                          r();
                      });
                },
              }),
              []
            ),
            l = (0, w.useRef)([...s.ctrls]),
            d = [],
            c = Qe(e) || 0;
          function u(e, n) {
            for (let a = e; a < n; a++) {
              const e = l.current[a] || (l.current[a] = new cn(null, s.flush)),
                n = i ? i(a, e) : t[a];
              n && (d[a] = nn(n));
            }
          }
          (0, w.useMemo)(() => {
            D(l.current.slice(e, c), (e) => {
              St(e, a), e.stop(!0);
            }),
              (l.current.length = e),
              u(c, e);
          }, [e]),
            (0, w.useMemo)(() => {
              u(0, Math.min(c, e));
            }, n);
          const p = l.current.map((e, t) => fn(e, d[t])),
            f = (0, w.useContext)(yn),
            m = Qe(f),
            h = f !== m && Ct(f);
          Ve(() => {
            o.current++, (s.ctrls = l.current);
            const { queue: e } = s;
            e.length && ((s.queue = []), D(e, (e) => e())),
              D(l.current, (e, t) => {
                a?.add(e), h && e.start({ default: f });
                const n = d[t];
                n && (Dt(e, n.ref), e.ref ? e.queue.push(n) : e.start(n));
              });
          }),
            Ge(() => () => {
              D(s.ctrls, (e) => e.stop(!0));
            });
          const g = p.map((e) => ({ ...e }));
          return a ? [g, a] : g;
        }
        function Cn(e, t) {
          const n = E.fun(e),
            [[i], a] = An(1, n ? e : [e], n ? t || [] : t);
          return n || 2 == arguments.length ? [i, a] : i;
        }
        var En = () => kn(),
          Sn = () => (0, w.useState)(En)[0];
        function Dn(e, t, n) {
          const i = E.fun(t) && t,
            {
              reset: a,
              sort: o,
              trail: r = 0,
              expires: s = !0,
              exitBeforeEnter: l = !1,
              onDestroyed: d,
              ref: c,
              config: u,
            } = i ? i() : t,
            p = (0, w.useMemo)(
              () => (i || 3 == arguments.length ? kn() : void 0),
              []
            ),
            f = T(e),
            m = [],
            h = (0, w.useRef)(null),
            g = a ? null : h.current;
          Ve(() => {
            h.current = m;
          }),
            Ge(
              () => (
                D(m, (e) => {
                  p?.add(e.ctrl), (e.ctrl.ref = p);
                }),
                () => {
                  D(h.current, (e) => {
                    e.expired && clearTimeout(e.expirationId),
                      St(e.ctrl, p),
                      e.ctrl.stop(!0);
                  });
                }
              )
            );
          const b = (function (e, t, n) {
              let { key: i, keys: a = i } = t;
              if (null === a) {
                const t = new Set();
                return e.map((e) => {
                  const i =
                    n &&
                    n.find(
                      (n) => n.item === e && "leave" !== n.phase && !t.has(n)
                    );
                  return i ? (t.add(i), i.key) : Yn++;
                });
              }
              return E.und(a) ? e : E.fun(a) ? e.map(a) : T(a);
            })(f, i ? i() : t, g),
            v = (a && h.current) || [];
          Ve(() =>
            D(v, (e) => {
              let { ctrl: t, item: n, key: i } = e;
              St(t, p), mt(d, n, i);
            })
          );
          const x = [];
          if (
            (g &&
              D(g, (e, t) => {
                e.expired
                  ? (clearTimeout(e.expirationId), v.push(e))
                  : ~(t = x[t] = b.indexOf(e.key)) && (m[t] = e);
              }),
            D(f, (e, t) => {
              m[t] ||
                ((m[t] = {
                  key: b[t],
                  item: e,
                  phase: "mount",
                  ctrl: new cn(),
                }),
                (m[t].ctrl.item = e));
            }),
            x.length)
          ) {
            let e = -1;
            const { leave: n } = i ? i() : t;
            D(x, (t, i) => {
              const a = g[i];
              ~t
                ? ((e = m.indexOf(a)), (m[e] = { ...a, item: f[t] }))
                : n && m.splice(++e, 0, a);
            });
          }
          E.fun(o) && m.sort((e, t) => o(e.item, t.item));
          let y = -r;
          const k = Ke(),
            A = xt(t),
            C = new Map(),
            S = (0, w.useRef)(new Map()),
            Y = (0, w.useRef)(!1);
          D(m, (e, n) => {
            const a = e.key,
              o = e.phase,
              d = i ? i() : t;
            let p, f;
            const m = mt(d.delay || 0, a);
            if ("mount" == o) (p = d.enter), (f = "enter");
            else {
              const e = b.indexOf(a) < 0;
              if ("leave" != o)
                if (e) (p = d.leave), (f = "leave");
                else {
                  if (!(p = d.update)) return;
                  f = "update";
                }
              else {
                if (e) return;
                (p = d.enter), (f = "enter");
              }
            }
            if (
              ((p = mt(p, e.item, n)),
              (p = E.obj(p) ? kt(p) : { to: p }),
              !p.config)
            ) {
              const t = u || A.config;
              p.config = mt(t, e.item, n, f);
            }
            y += r;
            const v = {
              ...A,
              delay: m + y,
              ref: c,
              immediate: d.immediate,
              reset: !1,
              ...p,
            };
            if ("enter" == f && E.und(v.from)) {
              const a = i ? i() : t,
                o = E.und(a.initial) || g ? a.from : a.initial;
              v.from = mt(o, e.item, n);
            }
            const { onResolve: x } = v;
            v.onResolve = (e) => {
              mt(x, e);
              const t = h.current,
                n = t.find((e) => e.key === a);
              if (n && (!e.cancelled || "update" == n.phase) && n.ctrl.idle) {
                const e = t.every((e) => e.ctrl.idle);
                if ("leave" == n.phase) {
                  const t = mt(s, n.item);
                  if (!1 !== t) {
                    const i = !0 === t ? 0 : t;
                    if (((n.expired = !0), !e && i > 0))
                      return void (
                        i <= 2147483647 && (n.expirationId = setTimeout(k, i))
                      );
                  }
                }
                e &&
                  t.some((e) => e.expired) &&
                  (S.current.delete(n), l && (Y.current = !0), k());
              }
            };
            const w = fn(e.ctrl, v);
            "leave" === f && l
              ? S.current.set(e, { phase: f, springs: w, payload: v })
              : C.set(e, { phase: f, springs: w, payload: v });
          });
          const F = (0, w.useContext)(yn),
            _ = Qe(F),
            I = F !== _ && Ct(F);
          Ve(() => {
            I &&
              D(m, (e) => {
                e.ctrl.start({ default: F });
              });
          }, [F]),
            D(C, (e, t) => {
              if (S.current.size) {
                const e = m.findIndex((e) => e.key === t.key);
                m.splice(e, 1);
              }
            }),
            Ve(
              () => {
                D(S.current.size ? S.current : C, (e, t) => {
                  let { phase: n, payload: i } = e;
                  const { ctrl: a } = t;
                  (t.phase = n),
                    p?.add(a),
                    I && "enter" == n && a.start({ default: F }),
                    i &&
                      (Dt(a, i.ref),
                      (!a.ref && !p) || Y.current
                        ? (a.start(i), Y.current && (Y.current = !1))
                        : a.update(i));
                });
              },
              a ? void 0 : n
            );
          const M = (e) =>
            w.createElement(
              w.Fragment,
              null,
              m.map((t, n) => {
                const { springs: i } = C.get(t) || t.ctrl,
                  a = e({ ...i }, t.item, t, n);
                return a && a.type
                  ? w.createElement(a.type, {
                      ...a.props,
                      key: E.str(t.key) || E.num(t.key) ? t.key : t.ctrl.id,
                      ref: a.ref,
                    })
                  : a;
              })
            );
          return p ? [M, p] : M;
        }
        var Yn = 1;
        var Tn = class extends $t {
          constructor(e, t) {
            super(),
              (this.source = e),
              (this.idle = !0),
              (this._active = new Set()),
              (this.calc = pe(...t));
            const n = this._get(),
              i = dt(n);
            et(this, i.create(n));
          }
          advance(e) {
            const t = this._get();
            S(t, this.get()) ||
              (Je(this).setValue(t), this._onChange(t, this.idle)),
              !this.idle && _n(this._active) && In(this);
          }
          _get() {
            const e = E.arr(this.source)
              ? this.source.map(Ae)
              : T(Ae(this.source));
            return this.calc(...e);
          }
          _start() {
            this.idle &&
              !_n(this._active) &&
              ((this.idle = !1),
              D(tt(this), (e) => {
                e.done = !1;
              }),
              A.skipAnimation
                ? (a.batchedUpdates(() => this.advance()), In(this))
                : H.start(this));
          }
          _attach() {
            let e = 1;
            D(T(this.source), (t) => {
              ke(t) && Ye(t, this),
                Ht(t) &&
                  (t.idle || this._active.add(t),
                  (e = Math.max(e, t.priority + 1)));
            }),
              (this.priority = e),
              this._start();
          }
          _detach() {
            D(T(this.source), (e) => {
              ke(e) && Te(e, this);
            }),
              this._active.clear(),
              In(this);
          }
          eventObserved(e) {
            "change" == e.type
              ? e.idle
                ? this.advance()
                : (this._active.add(e.parent), this._start())
              : "idle" == e.type
              ? this._active.delete(e.parent)
              : "priority" == e.type &&
                (this.priority = T(this.source).reduce(
                  (e, t) => Math.max(e, (Ht(t) ? t.priority : 0) + 1),
                  0
                ));
          }
        };
        function Fn(e) {
          return !1 !== e.idle;
        }
        function _n(e) {
          return !e.size || Array.from(e).every(Fn);
        }
        function In(e) {
          e.idle ||
            ((e.idle = !0),
            D(tt(e), (e) => {
              e.done = !0;
            }),
            Ee(e, { type: "idle", parent: e }));
        }
        var Mn = function (e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
            i < t;
            i++
          )
            n[i - 1] = arguments[i];
          return new Tn(e, n);
        };
        A.assign({ createStringInterpolator: Ue, to: (e, t) => new Tn(e, t) });
        H.advance;
        var Nn = n(9645),
          Rn = /^--/;
        function On(e, t) {
          return null == t || "boolean" == typeof t || "" === t
            ? ""
            : "number" != typeof t ||
              0 === t ||
              Rn.test(e) ||
              (Ln.hasOwnProperty(e) && Ln[e])
            ? ("" + t).trim()
            : t + "px";
        }
        var jn = {};
        var Ln = {
            animationIterationCount: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          zn = ["Webkit", "Ms", "Moz", "O"];
        Ln = Object.keys(Ln).reduce(
          (e, t) => (
            zn.forEach(
              (n) =>
                (e[
                  ((e, t) => e + t.charAt(0).toUpperCase() + t.substring(1))(
                    n,
                    t
                  )
                ] = e[t])
            ),
            e
          ),
          Ln
        );
        var Un = /^(matrix|translate|scale|rotate|skew)/,
          Pn = /^(translate)/,
          Bn = /^(rotate|skew)/,
          Hn = (e, t) => (E.num(e) && 0 !== e ? e + t : e),
          qn = (e, t) =>
            E.arr(e)
              ? e.every((e) => qn(e, t))
              : E.num(e)
              ? e === t
              : parseFloat(e) === t,
          $n = class extends rt {
            constructor(e) {
              let { x: t, y: n, z: i, ...a } = e;
              const o = [],
                r = [];
              (t || n || i) &&
                (o.push([t || 0, n || 0, i || 0]),
                r.push((e) => [
                  `translate3d(${e.map((e) => Hn(e, "px")).join(",")})`,
                  qn(e, 0),
                ])),
                Y(a, (e, t) => {
                  if ("transform" === t)
                    o.push([e || ""]), r.push((e) => [e, "" === e]);
                  else if (Un.test(t)) {
                    if ((delete a[t], E.und(e))) return;
                    const n = Pn.test(t) ? "px" : Bn.test(t) ? "deg" : "";
                    o.push(T(e)),
                      r.push(
                        "rotate3d" === t
                          ? (e) => {
                              let [t, i, a, o] = e;
                              return [
                                `rotate3d(${t},${i},${a},${Hn(o, n)})`,
                                qn(o, 0),
                              ];
                            }
                          : (e) => [
                              `${t}(${e.map((e) => Hn(e, n)).join(",")})`,
                              qn(e, t.startsWith("scale") ? 1 : 0),
                            ]
                      );
                  }
                }),
                o.length && (a.transform = new Vn(o, r)),
                super(a);
            }
          },
          Vn = class extends Se {
            constructor(e, t) {
              super(),
                (this.inputs = e),
                (this.transforms = t),
                (this._value = null);
            }
            get() {
              return this._value || (this._value = this._get());
            }
            _get() {
              let e = "",
                t = !0;
              return (
                D(this.inputs, (n, i) => {
                  const a = Ae(n[0]),
                    [o, r] = this.transforms[i](E.arr(a) ? a : n.map(Ae));
                  (e += " " + o), (t = t && r);
                }),
                t ? "none" : e
              );
            }
            observerAdded(e) {
              1 == e &&
                D(this.inputs, (e) => D(e, (e) => ke(e) && Ye(e, this)));
            }
            observerRemoved(e) {
              0 == e &&
                D(this.inputs, (e) => D(e, (e) => ke(e) && Te(e, this)));
            }
            eventObserved(e) {
              "change" == e.type && (this._value = null), Ee(this, e);
            }
          };
        A.assign({
          batchedUpdates: Nn.unstable_batchedUpdates,
          createStringInterpolator: Ue,
          colors: {
            transparent: 0,
            aliceblue: 4042850303,
            antiquewhite: 4209760255,
            aqua: 16777215,
            aquamarine: 2147472639,
            azure: 4043309055,
            beige: 4126530815,
            bisque: 4293182719,
            black: 255,
            blanchedalmond: 4293643775,
            blue: 65535,
            blueviolet: 2318131967,
            brown: 2771004159,
            burlywood: 3736635391,
            burntsienna: 3934150143,
            cadetblue: 1604231423,
            chartreuse: 2147418367,
            chocolate: 3530104575,
            coral: 4286533887,
            cornflowerblue: 1687547391,
            cornsilk: 4294499583,
            crimson: 3692313855,
            cyan: 16777215,
            darkblue: 35839,
            darkcyan: 9145343,
            darkgoldenrod: 3095792639,
            darkgray: 2846468607,
            darkgreen: 6553855,
            darkgrey: 2846468607,
            darkkhaki: 3182914559,
            darkmagenta: 2332068863,
            darkolivegreen: 1433087999,
            darkorange: 4287365375,
            darkorchid: 2570243327,
            darkred: 2332033279,
            darksalmon: 3918953215,
            darkseagreen: 2411499519,
            darkslateblue: 1211993087,
            darkslategray: 793726975,
            darkslategrey: 793726975,
            darkturquoise: 13554175,
            darkviolet: 2483082239,
            deeppink: 4279538687,
            deepskyblue: 12582911,
            dimgray: 1768516095,
            dimgrey: 1768516095,
            dodgerblue: 512819199,
            firebrick: 2988581631,
            floralwhite: 4294635775,
            forestgreen: 579543807,
            fuchsia: 4278255615,
            gainsboro: 3705462015,
            ghostwhite: 4177068031,
            gold: 4292280575,
            goldenrod: 3668254975,
            gray: 2155905279,
            green: 8388863,
            greenyellow: 2919182335,
            grey: 2155905279,
            honeydew: 4043305215,
            hotpink: 4285117695,
            indianred: 3445382399,
            indigo: 1258324735,
            ivory: 4294963455,
            khaki: 4041641215,
            lavender: 3873897215,
            lavenderblush: 4293981695,
            lawngreen: 2096890111,
            lemonchiffon: 4294626815,
            lightblue: 2916673279,
            lightcoral: 4034953471,
            lightcyan: 3774873599,
            lightgoldenrodyellow: 4210742015,
            lightgray: 3553874943,
            lightgreen: 2431553791,
            lightgrey: 3553874943,
            lightpink: 4290167295,
            lightsalmon: 4288707327,
            lightseagreen: 548580095,
            lightskyblue: 2278488831,
            lightslategray: 2005441023,
            lightslategrey: 2005441023,
            lightsteelblue: 2965692159,
            lightyellow: 4294959359,
            lime: 16711935,
            limegreen: 852308735,
            linen: 4210091775,
            magenta: 4278255615,
            maroon: 2147483903,
            mediumaquamarine: 1724754687,
            mediumblue: 52735,
            mediumorchid: 3126187007,
            mediumpurple: 2473647103,
            mediumseagreen: 1018393087,
            mediumslateblue: 2070474495,
            mediumspringgreen: 16423679,
            mediumturquoise: 1221709055,
            mediumvioletred: 3340076543,
            midnightblue: 421097727,
            mintcream: 4127193855,
            mistyrose: 4293190143,
            moccasin: 4293178879,
            navajowhite: 4292783615,
            navy: 33023,
            oldlace: 4260751103,
            olive: 2155872511,
            olivedrab: 1804477439,
            orange: 4289003775,
            orangered: 4282712319,
            orchid: 3664828159,
            palegoldenrod: 4008225535,
            palegreen: 2566625535,
            paleturquoise: 2951671551,
            palevioletred: 3681588223,
            papayawhip: 4293907967,
            peachpuff: 4292524543,
            peru: 3448061951,
            pink: 4290825215,
            plum: 3718307327,
            powderblue: 2967529215,
            purple: 2147516671,
            rebeccapurple: 1714657791,
            red: 4278190335,
            rosybrown: 3163525119,
            royalblue: 1097458175,
            saddlebrown: 2336560127,
            salmon: 4202722047,
            sandybrown: 4104413439,
            seagreen: 780883967,
            seashell: 4294307583,
            sienna: 2689740287,
            silver: 3233857791,
            skyblue: 2278484991,
            slateblue: 1784335871,
            slategray: 1887473919,
            slategrey: 1887473919,
            snow: 4294638335,
            springgreen: 16744447,
            steelblue: 1182971135,
            tan: 3535047935,
            teal: 8421631,
            thistle: 3636451583,
            tomato: 4284696575,
            turquoise: 1088475391,
            violet: 4001558271,
            wheat: 4125012991,
            white: 4294967295,
            whitesmoke: 4126537215,
            yellow: 4294902015,
            yellowgreen: 2597139199,
          },
        });
        var Wn = (function (e) {
            let {
              applyAnimatedValues: t = () => !1,
              createAnimatedStyle: n = (e) => new rt(e),
              getComponentProps: i = (e) => e,
            } = arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : {};
            const a = {
                applyAnimatedValues: t,
                createAnimatedStyle: n,
                getComponentProps: i,
              },
              o = (e) => {
                const t = ft(e) || "Anonymous";
                return (
                  ((e = E.str(e)
                    ? o[e] || (o[e] = ct(e, a))
                    : e[pt] ||
                      (e[pt] = ct(e, a))).displayName = `Animated(${t})`),
                  e
                );
              };
            return (
              Y(e, (t, n) => {
                E.arr(e) && (n = ft(t)), (o[n] = o(t));
              }),
              { animated: o }
            );
          })(
            [
              "a",
              "abbr",
              "address",
              "area",
              "article",
              "aside",
              "audio",
              "b",
              "base",
              "bdi",
              "bdo",
              "big",
              "blockquote",
              "body",
              "br",
              "button",
              "canvas",
              "caption",
              "cite",
              "code",
              "col",
              "colgroup",
              "data",
              "datalist",
              "dd",
              "del",
              "details",
              "dfn",
              "dialog",
              "div",
              "dl",
              "dt",
              "em",
              "embed",
              "fieldset",
              "figcaption",
              "figure",
              "footer",
              "form",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "head",
              "header",
              "hgroup",
              "hr",
              "html",
              "i",
              "iframe",
              "img",
              "input",
              "ins",
              "kbd",
              "keygen",
              "label",
              "legend",
              "li",
              "link",
              "main",
              "map",
              "mark",
              "menu",
              "menuitem",
              "meta",
              "meter",
              "nav",
              "noscript",
              "object",
              "ol",
              "optgroup",
              "option",
              "output",
              "p",
              "param",
              "picture",
              "pre",
              "progress",
              "q",
              "rp",
              "rt",
              "ruby",
              "s",
              "samp",
              "script",
              "section",
              "select",
              "small",
              "source",
              "span",
              "strong",
              "style",
              "sub",
              "summary",
              "sup",
              "table",
              "tbody",
              "td",
              "textarea",
              "tfoot",
              "th",
              "thead",
              "time",
              "title",
              "tr",
              "track",
              "u",
              "ul",
              "var",
              "video",
              "wbr",
              "circle",
              "clipPath",
              "defs",
              "ellipse",
              "foreignObject",
              "g",
              "image",
              "line",
              "linearGradient",
              "mask",
              "path",
              "pattern",
              "polygon",
              "polyline",
              "radialGradient",
              "rect",
              "stop",
              "svg",
              "text",
              "tspan",
            ],
            {
              applyAnimatedValues: function (e, t) {
                if (!e.nodeType || !e.setAttribute) return !1;
                const n =
                    "filter" === e.nodeName ||
                    (e.parentNode && "filter" === e.parentNode.nodeName),
                  {
                    className: i,
                    style: a,
                    children: o,
                    scrollTop: r,
                    scrollLeft: s,
                    viewBox: l,
                    ...d
                  } = t,
                  c = Object.values(d),
                  u = Object.keys(d).map((t) =>
                    n || e.hasAttribute(t)
                      ? t
                      : jn[t] ||
                        (jn[t] = t.replace(
                          /([A-Z])/g,
                          (e) => "-" + e.toLowerCase()
                        ))
                  );
                void 0 !== o && (e.textContent = o);
                for (const t in a)
                  if (a.hasOwnProperty(t)) {
                    const n = On(t, a[t]);
                    Rn.test(t) ? e.style.setProperty(t, n) : (e.style[t] = n);
                  }
                u.forEach((t, n) => {
                  e.setAttribute(t, c[n]);
                }),
                  void 0 !== i && (e.className = i),
                  void 0 !== r && (e.scrollTop = r),
                  void 0 !== s && (e.scrollLeft = s),
                  void 0 !== l && e.setAttribute("viewBox", l);
              },
              createAnimatedStyle: (e) => new $n(e),
              getComponentProps: (e) => {
                let { scrollTop: t, scrollLeft: n, ...i } = e;
                return i;
              },
            }
          ),
          Kn = Wn.animated;
      },
      146: function (e, t, n) {
        "use strict";
        n.d(t, {
          V: function () {
            return a;
          },
          b: function () {
            return i;
          },
        });
        const i = {
            name: "3vbsfx",
            styles:
              "padding:8px 12px;background:rgba(220, 233, 255, 0.40);color:#647491;width:100%;display:flex;align-items:flex-start;font-size:13px;line-height:14px;border-radius:4px 12px 12px 12px;gap:12px;svg{width:16px;height:16px;flex-shrink:0;}",
          },
          a = {
            name: "p9jer4",
            styles:
              "color:#0566FF;line-height:20px;margin-top:2px;&:focus{outline:none;}",
          };
      },
      232: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Frame = void 0);
        var i =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                  Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
              }
              return e;
            },
          a = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var i = t[n];
                (i.enumerable = i.enumerable || !1),
                  (i.configurable = !0),
                  "value" in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i);
              }
            }
            return function (t, n, i) {
              return n && e(t.prototype, n), i && e(t, i), t;
            };
          })(),
          o = n(3480),
          r = u(o),
          s = u(n(9645)),
          l = u(n(2200)),
          d = n(5409),
          c = u(n(7359));
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var p = (t.Frame = (function (e) {
          function t(e, n) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, t);
            var i = (function (e, t) {
              if (!e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return !t || ("object" != typeof t && "function" != typeof t)
                ? e
                : t;
            })(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
            );
            return (
              (i.setRef = function (e) {
                (i.nodeRef.current = e), e && (e.srcdoc || i.handleLoad());
                var t = i.props.forwardedRef;
                "function" == typeof t ? t(e) : t && (t.current = e);
              }),
              (i.handleLoad = function () {
                clearInterval(i.loadCheck),
                  i.state.iframeLoaded || i.setState({ iframeLoaded: !0 });
              }),
              (i.loadCheck = function () {
                return setInterval(function () {
                  i.handleLoad();
                }, 500);
              }),
              (i._isMounted = !1),
              (i.nodeRef = r.default.createRef()),
              (i.state = { iframeLoaded: !1 }),
              i
            );
          }
          return (
            (function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function, not " +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, e),
            a(t, [
              {
                key: "componentDidMount",
                value: function () {
                  (this._isMounted = !0),
                    this.getDoc() &&
                      this.nodeRef.current.contentWindow.addEventListener(
                        "DOMContentLoaded",
                        this.handleLoad
                      );
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  (this._isMounted = !1),
                    this.nodeRef.current.removeEventListener(
                      "DOMContentLoaded",
                      this.handleLoad
                    );
                },
              },
              {
                key: "getDoc",
                value: function () {
                  return this.nodeRef.current
                    ? this.nodeRef.current.contentDocument
                    : null;
                },
              },
              {
                key: "getMountTarget",
                value: function () {
                  var e = this.getDoc();
                  if (this.props.mountTarget)
                    return e.querySelector(this.props.mountTarget);
                  if (0 === e?.body?.children?.length) {
                    this.props.noSrcDocBodyProps &&
                      Object.entries(this.props.noSrcDocBodyProps).forEach(
                        (t) => {
                          let [n, i] = t;
                          e.body.setAttribute(n, i);
                        }
                      ),
                      this.props.noSrcDocHeadTags &&
                        (e.head.innerHTML = this.props.noSrcDocHeadTags);
                    var t = e.createElement("div");
                    e.body.appendChild(t);
                  }
                  return e.body.children[0];
                },
              },
              {
                key: "renderFrameContents",
                value: function () {
                  if (!this._isMounted) return null;
                  var e = this.getDoc();
                  if (!e) return null;
                  var t = this.props.contentDidMount,
                    n = this.props.contentDidUpdate,
                    i = e.defaultView || e.parentView,
                    a = r.default.createElement(
                      c.default,
                      { contentDidMount: t, contentDidUpdate: n },
                      r.default.createElement(
                        d.FrameContextProvider,
                        { value: { document: e, window: i } },
                        r.default.createElement(
                          "div",
                          { className: "frame-content" },
                          this.props.children
                        )
                      )
                    ),
                    o = this.getMountTarget();
                  return o
                    ? [
                        s.default.createPortal(
                          this.props.head,
                          this.getDoc().head
                        ),
                        s.default.createPortal(a, o),
                      ]
                    : null;
                },
              },
              {
                key: "render",
                value: function () {
                  var e = i({}, this.props, {
                    srcDoc: this.props.initialContent,
                    children: void 0,
                  });
                  return (
                    delete e.head,
                    delete e.initialContent,
                    delete e.mountTarget,
                    delete e.contentDidMount,
                    delete e.contentDidUpdate,
                    delete e.forwardedRef,
                    delete e.noSrcDocBodyProps,
                    delete e.noSrcDocHeadTags,
                    r.default.createElement(
                      "iframe",
                      i({}, e, { ref: this.setRef, onLoad: this.handleLoad }),
                      this.state.iframeLoaded && this.renderFrameContents()
                    )
                  );
                },
              },
            ]),
            t
          );
        })(o.Component));
        (p.propTypes = {
          style: l.default.object,
          head: l.default.node,
          initialContent: l.default.string,
          mountTarget: l.default.string,
          contentDidMount: l.default.func,
          contentDidUpdate: l.default.func,
          children: l.default.oneOfType([
            l.default.element,
            l.default.arrayOf(l.default.element),
          ]),
          noSrcDocBodyProps: l.default.object,
          noSrcDocHeadTags: l.default.string,
        }),
          (p.defaultProps = {
            style: {},
            head: null,
            children: void 0,
            mountTarget: void 0,
            contentDidMount: function () {},
            contentDidUpdate: function () {},
            initialContent:
              '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>',
            noSrcDocBodyProps: void 0,
            noSrcDocHeadTags: void 0,
          }),
          (t.default = r.default.forwardRef(function (e, t) {
            return r.default.createElement(p, i({}, e, { forwardedRef: t }));
          }));
      },
      1818: function (e, t, n) {
        "use strict";
        var i,
          a = n(8966),
          o = (i = a) && i.__esModule ? i : { default: i };
        var r = -1;
        function s(e, t) {
          if (e === r) return o.default.transform(t);
        }
        Object.defineProperty(s, "name", { value: "stylisRTLPlugin" }),
          (t.Ay = s);
      },
      2200: function (e, t, n) {
        e.exports = n(6002)();
      },
      3662: function (e, t, n) {
        "use strict";
        function i(e, t) {
          return (
            (i = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e;
                }),
            i(e, t)
          );
        }
        n.d(t, {
          A: function () {
            return i;
          },
        });
      },
      4019: function (e, t, n) {
        "use strict";
        n.d(t, {
          Ks: function () {
            return b;
          },
          lz: function () {
            return g;
          },
        });
        n(8356), n(5718), n(5855);
        var i = n(3480),
          a = n(4055),
          o = n(162),
          r = n.n(o),
          s = n(8948),
          l = n(8945),
          d = n(583),
          c = n(3650),
          u = n(9788),
          p = n(8289);
        const f = r()(),
          m = (0, i.createContext)({
            state: null,
            dispatch: () => {},
            iceCandidatesQueueRef: null,
          }),
          h = (e, t) => {
            switch (t.type) {
              case "SET_OPERATOR_VIDEO_CALL_OFFER":
                return e ? { ...e, ...t.payload } : t.payload;
              case "RESET_OPERATOR_VIDEO_CALL_OFFER":
                return null;
              case "SET_VIDEOCALL_INSTANCE_ID":
                return e ? { ...e, instanceId: t.payload.instanceId } : null;
              default:
                return e;
            }
          },
          g = () => {
            const e = (0, i.useContext)(m);
            if (void 0 === e)
              throw new Error(
                "useVideoCallOffer must be used within a VideoCallProvider"
              );
            const t = (0, a.wA)(),
              n = e.dispatch,
              { state: o } = e,
              r = o?.operatorId,
              s = Boolean(o?.offer),
              l = o?.instanceId === f;
            return {
              state: o,
              resetVideoCall: (0, i.useCallback)(
                (e) => {
                  r &&
                    s &&
                    (l || e?.force) &&
                    t((0, d.AjP)({ operatorId: r, offer: null })),
                    n({ type: "RESET_OPERATOR_VIDEO_CALL_OFFER" });
                },
                [n, t, r, s, l]
              ),
              instanceId: f,
            };
          },
          b = (e) => {
            const t = (0, i.useContext)(m);
            if (void 0 === t)
              throw new Error(
                "useVideoCallOffer must be used within a VideoCallProvider"
              );
            const { iceCandidatesQueueRef: n } = t;
            (0, i.useEffect)(
              () =>
                l.A.subscribe("operatorVideoCallIceCandidatesOffered", (t) => {
                  t.iceCandidates.forEach((t) => {
                    t && e(t);
                  });
                }),
              [e]
            );
            return {
              popInitialOperatorIceCandidatesPool: (0, i.useCallback)(() => {
                if (!n) return [];
                const e = (0, s.mg)(n.current);
                return (n.current = []), e;
              }, [n]),
            };
          };
        t.Ay = (e) => {
          let { children: t } = e;
          const [n, o] = (0, i.useReducer)(h, null),
            r = (0, i.useRef)([]),
            s = (0, a.d4)(c.KZ),
            g = (0, a.wA)(),
            b = n?.instanceId,
            v = (0, a.d4)(c.O1);
          (0, i.useEffect)(
            () =>
              l.A.subscribe("operatorVideoCallOffered", (e) => {
                e?.offer
                  ? (("string" == typeof e.offer.instanceId &&
                      e.offer.instanceId === f) ||
                      void 0 === e.offer.instanceId) &&
                    (s !== u.Ss.CHAT && g((0, d.g6Q)(u.Ss.CHAT)),
                    "conversations" !== v && g((0, d.q7v)("conversations")),
                    o({ type: "SET_OPERATOR_VIDEO_CALL_OFFER", payload: e }))
                  : (o({ type: "RESET_OPERATOR_VIDEO_CALL_OFFER" }),
                    (r.current = []));
              }),
            [s, v, g]
          ),
            (0, i.useEffect)(
              () =>
                l.A.subscribe("operatorVideoCallIceCandidatesOffered", (e) => {
                  e.iceCandidates.forEach((e) => {
                    e && r.current.push(e);
                  });
                }),
              []
            ),
            (0, i.useEffect)(
              () =>
                l.A.subscribe("visitorVideoCallOffer", (e) => {
                  const t = e?.offer?.instanceId;
                  t !== f
                    ? o({ type: "RESET_OPERATOR_VIDEO_CALL_OFFER" })
                    : b !== t &&
                      o({
                        type: "SET_VIDEOCALL_INSTANCE_ID",
                        payload: { instanceId: t },
                      });
                }),
              [b]
            );
          const x = (0, i.useMemo)(
            () => ({ state: n, dispatch: o, iceCandidatesQueueRef: r }),
            [n]
          );
          return (0, p.Y)(m.Provider, { value: x, children: t });
        };
      },
      5126: function (e, t, n) {
        "use strict";
        var i = n(232);
        Object.defineProperty(t, "Ay", {
          enumerable: !0,
          get: function () {
            return ((e = i), e && e.__esModule ? e : { default: e }).default;
            var e;
          },
        });
        var a = n(5409);
        Object.defineProperty(t, "j$", {
          enumerable: !0,
          get: function () {
            return a.useFrame;
          },
        });
      },
      5409: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.FrameContextConsumer =
            t.FrameContextProvider =
            t.useFrame =
            t.FrameContext =
              void 0);
        var i,
          a = n(3480),
          o = (i = a) && i.__esModule ? i : { default: i };
        var r = void 0,
          s = void 0;
        "undefined" != typeof document && (r = document),
          "undefined" != typeof window && (s = window);
        var l = (t.FrameContext = o.default.createContext({
            document: r,
            window: s,
          })),
          d =
            ((t.useFrame = function () {
              return o.default.useContext(l);
            }),
            l.Provider),
          c = l.Consumer;
        (t.FrameContextProvider = d), (t.FrameContextConsumer = c);
      },
      6002: function (e, t, n) {
        "use strict";
        var i = n(7793);
        function a() {}
        function o() {}
        (o.resetWarningCache = a),
          (e.exports = function () {
            function e(e, t, n, a, o, r) {
              if (r !== i) {
                var s = new Error(
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
                );
                throw ((s.name = "Invariant Violation"), s);
              }
            }
            function t() {
              return e;
            }
            e.isRequired = e;
            var n = {
              array: e,
              bigint: e,
              bool: e,
              func: e,
              number: e,
              object: e,
              string: e,
              symbol: e,
              any: e,
              arrayOf: t,
              element: e,
              elementType: e,
              instanceOf: t,
              node: e,
              objectOf: t,
              oneOf: t,
              oneOfType: t,
              shape: t,
              exact: t,
              checkPropTypes: o,
              resetWarningCache: a,
            };
            return (n.PropTypes = n), n;
          });
      },
      6141: function (e, t, n) {
        "use strict";
        n.r(t),
          n.d(t, {
            addImportantToDefaultStyles: function () {
              return vu;
            },
            default: function () {
              return Tu;
            },
          });
        var i = n(4467),
          a = (n(5718), n(5855), n(2020), n(3480)),
          o = n(5126),
          r = n(4055),
          s = n(7366),
          l = n(7888),
          d = n(6177),
          c = n(103),
          u = n(1818),
          p = n(9535),
          f = n(8948);
        const m = (e) => {
          let t = e.replace("#", "");
          3 === t.length &&
            (t = t
              .split("")
              .map((e) => e + e)
              .join(""));
          return (
            (299 * parseInt(t.slice(0, 2), 16) +
              587 * parseInt(t.slice(2, 4), 16) +
              114 * parseInt(t.slice(4, 6), 16)) /
              1e3 <
            155
          );
        };
        var h = n(1843),
          g = n(6924),
          b = n(2318),
          v = n(7326),
          x = n(6542),
          y = n(8448),
          w = n(2724),
          k = n(583),
          A = n(6058),
          C = n(3650);
        var E = n(8168),
          S = n(8587),
          D = n(3662);
        function Y(e, t) {
          (e.prototype = Object.create(t.prototype)),
            (e.prototype.constructor = e),
            (0, D.A)(e, t);
        }
        function T(e, t) {
          return e
            .replace(new RegExp("(^|\\s)" + t + "(?:\\s|$)", "g"), "$1")
            .replace(/\s+/g, " ")
            .replace(/^\s*|\s*$/g, "");
        }
        var F = n(9645),
          _ = !1,
          I = a.createContext(null),
          M = function (e) {
            return e.scrollTop;
          },
          N = "unmounted",
          R = "exited",
          O = "entering",
          j = "entered",
          L = "exiting",
          z = (function (e) {
            function t(t, n) {
              var i;
              i = e.call(this, t, n) || this;
              var a,
                o = n && !n.isMounting ? t.enter : t.appear;
              return (
                (i.appearStatus = null),
                t.in
                  ? o
                    ? ((a = R), (i.appearStatus = O))
                    : (a = j)
                  : (a = t.unmountOnExit || t.mountOnEnter ? N : R),
                (i.state = { status: a }),
                (i.nextCallback = null),
                i
              );
            }
            Y(t, e),
              (t.getDerivedStateFromProps = function (e, t) {
                return e.in && t.status === N ? { status: R } : null;
              });
            var n = t.prototype;
            return (
              (n.componentDidMount = function () {
                this.updateStatus(!0, this.appearStatus);
              }),
              (n.componentDidUpdate = function (e) {
                var t = null;
                if (e !== this.props) {
                  var n = this.state.status;
                  this.props.in
                    ? n !== O && n !== j && (t = O)
                    : (n !== O && n !== j) || (t = L);
                }
                this.updateStatus(!1, t);
              }),
              (n.componentWillUnmount = function () {
                this.cancelNextCallback();
              }),
              (n.getTimeouts = function () {
                var e,
                  t,
                  n,
                  i = this.props.timeout;
                return (
                  (e = t = n = i),
                  null != i &&
                    "number" != typeof i &&
                    ((e = i.exit),
                    (t = i.enter),
                    (n = void 0 !== i.appear ? i.appear : t)),
                  { exit: e, enter: t, appear: n }
                );
              }),
              (n.updateStatus = function (e, t) {
                if ((void 0 === e && (e = !1), null !== t))
                  if ((this.cancelNextCallback(), t === O)) {
                    if (this.props.unmountOnExit || this.props.mountOnEnter) {
                      var n = this.props.nodeRef
                        ? this.props.nodeRef.current
                        : F.findDOMNode(this);
                      n && M(n);
                    }
                    this.performEnter(e);
                  } else this.performExit();
                else
                  this.props.unmountOnExit &&
                    this.state.status === R &&
                    this.setState({ status: N });
              }),
              (n.performEnter = function (e) {
                var t = this,
                  n = this.props.enter,
                  i = this.context ? this.context.isMounting : e,
                  a = this.props.nodeRef ? [i] : [F.findDOMNode(this), i],
                  o = a[0],
                  r = a[1],
                  s = this.getTimeouts(),
                  l = i ? s.appear : s.enter;
                (!e && !n) || _
                  ? this.safeSetState({ status: j }, function () {
                      t.props.onEntered(o);
                    })
                  : (this.props.onEnter(o, r),
                    this.safeSetState({ status: O }, function () {
                      t.props.onEntering(o, r),
                        t.onTransitionEnd(l, function () {
                          t.safeSetState({ status: j }, function () {
                            t.props.onEntered(o, r);
                          });
                        });
                    }));
              }),
              (n.performExit = function () {
                var e = this,
                  t = this.props.exit,
                  n = this.getTimeouts(),
                  i = this.props.nodeRef ? void 0 : F.findDOMNode(this);
                t && !_
                  ? (this.props.onExit(i),
                    this.safeSetState({ status: L }, function () {
                      e.props.onExiting(i),
                        e.onTransitionEnd(n.exit, function () {
                          e.safeSetState({ status: R }, function () {
                            e.props.onExited(i);
                          });
                        });
                    }))
                  : this.safeSetState({ status: R }, function () {
                      e.props.onExited(i);
                    });
              }),
              (n.cancelNextCallback = function () {
                null !== this.nextCallback &&
                  (this.nextCallback.cancel(), (this.nextCallback = null));
              }),
              (n.safeSetState = function (e, t) {
                (t = this.setNextCallback(t)), this.setState(e, t);
              }),
              (n.setNextCallback = function (e) {
                var t = this,
                  n = !0;
                return (
                  (this.nextCallback = function (i) {
                    n && ((n = !1), (t.nextCallback = null), e(i));
                  }),
                  (this.nextCallback.cancel = function () {
                    n = !1;
                  }),
                  this.nextCallback
                );
              }),
              (n.onTransitionEnd = function (e, t) {
                this.setNextCallback(t);
                var n = this.props.nodeRef
                    ? this.props.nodeRef.current
                    : F.findDOMNode(this),
                  i = null == e && !this.props.addEndListener;
                if (n && !i) {
                  if (this.props.addEndListener) {
                    var a = this.props.nodeRef
                        ? [this.nextCallback]
                        : [n, this.nextCallback],
                      o = a[0],
                      r = a[1];
                    this.props.addEndListener(o, r);
                  }
                  null != e && setTimeout(this.nextCallback, e);
                } else setTimeout(this.nextCallback, 0);
              }),
              (n.render = function () {
                var e = this.state.status;
                if (e === N) return null;
                var t = this.props,
                  n = t.children,
                  i =
                    (t.in,
                    t.mountOnEnter,
                    t.unmountOnExit,
                    t.appear,
                    t.enter,
                    t.exit,
                    t.timeout,
                    t.addEndListener,
                    t.onEnter,
                    t.onEntering,
                    t.onEntered,
                    t.onExit,
                    t.onExiting,
                    t.onExited,
                    t.nodeRef,
                    (0, S.A)(t, [
                      "children",
                      "in",
                      "mountOnEnter",
                      "unmountOnExit",
                      "appear",
                      "enter",
                      "exit",
                      "timeout",
                      "addEndListener",
                      "onEnter",
                      "onEntering",
                      "onEntered",
                      "onExit",
                      "onExiting",
                      "onExited",
                      "nodeRef",
                    ]));
                return a.createElement(
                  I.Provider,
                  { value: null },
                  "function" == typeof n
                    ? n(e, i)
                    : a.cloneElement(a.Children.only(n), i)
                );
              }),
              t
            );
          })(a.Component);
        function U() {}
        (z.contextType = I),
          (z.propTypes = {}),
          (z.defaultProps = {
            in: !1,
            mountOnEnter: !1,
            unmountOnExit: !1,
            appear: !1,
            enter: !0,
            exit: !0,
            onEnter: U,
            onEntering: U,
            onEntered: U,
            onExit: U,
            onExiting: U,
            onExited: U,
          }),
          (z.UNMOUNTED = N),
          (z.EXITED = R),
          (z.ENTERING = O),
          (z.ENTERED = j),
          (z.EXITING = L);
        var P = z,
          B = function (e, t) {
            return (
              e &&
              t &&
              t.split(" ").forEach(function (t) {
                return (
                  (i = t),
                  void ((n = e).classList
                    ? n.classList.remove(i)
                    : "string" == typeof n.className
                    ? (n.className = T(n.className, i))
                    : n.setAttribute(
                        "class",
                        T((n.className && n.className.baseVal) || "", i)
                      ))
                );
                var n, i;
              })
            );
          },
          H = (function (e) {
            function t() {
              for (
                var t, n = arguments.length, i = new Array(n), a = 0;
                a < n;
                a++
              )
                i[a] = arguments[a];
              return (
                ((t =
                  e.call.apply(e, [this].concat(i)) || this).appliedClasses = {
                  appear: {},
                  enter: {},
                  exit: {},
                }),
                (t.onEnter = function (e, n) {
                  var i = t.resolveArguments(e, n),
                    a = i[0],
                    o = i[1];
                  t.removeClasses(a, "exit"),
                    t.addClass(a, o ? "appear" : "enter", "base"),
                    t.props.onEnter && t.props.onEnter(e, n);
                }),
                (t.onEntering = function (e, n) {
                  var i = t.resolveArguments(e, n),
                    a = i[0],
                    o = i[1] ? "appear" : "enter";
                  t.addClass(a, o, "active"),
                    t.props.onEntering && t.props.onEntering(e, n);
                }),
                (t.onEntered = function (e, n) {
                  var i = t.resolveArguments(e, n),
                    a = i[0],
                    o = i[1] ? "appear" : "enter";
                  t.removeClasses(a, o),
                    t.addClass(a, o, "done"),
                    t.props.onEntered && t.props.onEntered(e, n);
                }),
                (t.onExit = function (e) {
                  var n = t.resolveArguments(e)[0];
                  t.removeClasses(n, "appear"),
                    t.removeClasses(n, "enter"),
                    t.addClass(n, "exit", "base"),
                    t.props.onExit && t.props.onExit(e);
                }),
                (t.onExiting = function (e) {
                  var n = t.resolveArguments(e)[0];
                  t.addClass(n, "exit", "active"),
                    t.props.onExiting && t.props.onExiting(e);
                }),
                (t.onExited = function (e) {
                  var n = t.resolveArguments(e)[0];
                  t.removeClasses(n, "exit"),
                    t.addClass(n, "exit", "done"),
                    t.props.onExited && t.props.onExited(e);
                }),
                (t.resolveArguments = function (e, n) {
                  return t.props.nodeRef
                    ? [t.props.nodeRef.current, e]
                    : [e, n];
                }),
                (t.getClassNames = function (e) {
                  var n = t.props.classNames,
                    i = "string" == typeof n,
                    a = i ? "" + (i && n ? n + "-" : "") + e : n[e];
                  return {
                    baseClassName: a,
                    activeClassName: i ? a + "-active" : n[e + "Active"],
                    doneClassName: i ? a + "-done" : n[e + "Done"],
                  };
                }),
                t
              );
            }
            Y(t, e);
            var n = t.prototype;
            return (
              (n.addClass = function (e, t, n) {
                var i = this.getClassNames(t)[n + "ClassName"],
                  a = this.getClassNames("enter").doneClassName;
                "appear" === t && "done" === n && a && (i += " " + a),
                  "active" === n && e && M(e),
                  i &&
                    ((this.appliedClasses[t][n] = i),
                    (function (e, t) {
                      e &&
                        t &&
                        t.split(" ").forEach(function (t) {
                          return (
                            (i = t),
                            void ((n = e).classList
                              ? n.classList.add(i)
                              : (function (e, t) {
                                  return e.classList
                                    ? !!t && e.classList.contains(t)
                                    : -1 !==
                                        (
                                          " " +
                                          (e.className.baseVal || e.className) +
                                          " "
                                        ).indexOf(" " + t + " ");
                                })(n, i) ||
                                ("string" == typeof n.className
                                  ? (n.className = n.className + " " + i)
                                  : n.setAttribute(
                                      "class",
                                      ((n.className && n.className.baseVal) ||
                                        "") +
                                        " " +
                                        i
                                    )))
                          );
                          var n, i;
                        });
                    })(e, i));
              }),
              (n.removeClasses = function (e, t) {
                var n = this.appliedClasses[t],
                  i = n.base,
                  a = n.active,
                  o = n.done;
                (this.appliedClasses[t] = {}),
                  i && B(e, i),
                  a && B(e, a),
                  o && B(e, o);
              }),
              (n.render = function () {
                var e = this.props,
                  t = (e.classNames, (0, S.A)(e, ["classNames"]));
                return a.createElement(
                  P,
                  (0, E.A)({}, t, {
                    onEnter: this.onEnter,
                    onEntered: this.onEntered,
                    onEntering: this.onEntering,
                    onExit: this.onExit,
                    onExiting: this.onExiting,
                    onExited: this.onExited,
                  })
                );
              }),
              t
            );
          })(a.Component);
        (H.defaultProps = { classNames: "" }), (H.propTypes = {});
        var q = H,
          $ = n(8289);
        var V = (e) => {
          let { children: t, timeout: n = 200, classNames: i, in: a, ...o } = e;
          return (0, $.Y)(q, {
            ...o,
            in: a,
            timeout: n,
            classNames: i,
            mountOnEnter: !0,
            unmountOnExit: !0,
            appear: !0,
            children: t,
          });
        };
        var W = function () {
            let { disableScaling: e = !1 } =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            (0, a.useEffect)(() => {
              if (!e) return;
              let t = null,
                n = "";
              try {
                const i = (0, h.AL)();
                if (!i?.parent?.document) return;
                const a = i.parent.document;
                (t = a.querySelector('meta[name="viewport"]')),
                  (n = t?.getAttribute("content") || "");
                const o = n.includes("user-scalable=");
                if (!t) {
                  const e = a.createElement("meta");
                  e.setAttribute("name", "viewport"),
                    a.head.appendChild(e),
                    (t = e);
                }
                if (t) {
                  const e = o
                    ? n.replace(/user-scalable=(yes|no)/, "user-scalable=no")
                    : `${n}${n ? ", " : ""}user-scalable=no`;
                  t.setAttribute("content", e);
                }
                return () => {
                  e &&
                    (n ? o && t && t.setAttribute("content", n) : t?.remove());
                };
              } catch {
                return;
              }
            }, [e]);
          },
          K = (n(3147), n(8264), n(2200)),
          G = n.n(K);
        function X(e, t, n, i) {
          return new (n || (n = Promise))(function (a, o) {
            function r(e) {
              try {
                l(i.next(e));
              } catch (e) {
                o(e);
              }
            }
            function s(e) {
              try {
                l(i.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function l(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(r, s);
            }
            l((i = i.apply(e, t || [])).next());
          });
        }
        Object.create;
        Object.create;
        "function" == typeof SuppressedError && SuppressedError;
        const Q = new Map([
          ["1km", "application/vnd.1000minds.decision-model+xml"],
          ["3dml", "text/vnd.in3d.3dml"],
          ["3ds", "image/x-3ds"],
          ["3g2", "video/3gpp2"],
          ["3gp", "video/3gp"],
          ["3gpp", "video/3gpp"],
          ["3mf", "model/3mf"],
          ["7z", "application/x-7z-compressed"],
          ["7zip", "application/x-7z-compressed"],
          ["123", "application/vnd.lotus-1-2-3"],
          ["aab", "application/x-authorware-bin"],
          ["aac", "audio/x-acc"],
          ["aam", "application/x-authorware-map"],
          ["aas", "application/x-authorware-seg"],
          ["abw", "application/x-abiword"],
          ["ac", "application/vnd.nokia.n-gage.ac+xml"],
          ["ac3", "audio/ac3"],
          ["acc", "application/vnd.americandynamics.acc"],
          ["ace", "application/x-ace-compressed"],
          ["acu", "application/vnd.acucobol"],
          ["acutc", "application/vnd.acucorp"],
          ["adp", "audio/adpcm"],
          ["aep", "application/vnd.audiograph"],
          ["afm", "application/x-font-type1"],
          ["afp", "application/vnd.ibm.modcap"],
          ["ahead", "application/vnd.ahead.space"],
          ["ai", "application/pdf"],
          ["aif", "audio/x-aiff"],
          ["aifc", "audio/x-aiff"],
          ["aiff", "audio/x-aiff"],
          [
            "air",
            "application/vnd.adobe.air-application-installer-package+zip",
          ],
          ["ait", "application/vnd.dvb.ait"],
          ["ami", "application/vnd.amiga.ami"],
          ["amr", "audio/amr"],
          ["apk", "application/vnd.android.package-archive"],
          ["apng", "image/apng"],
          ["appcache", "text/cache-manifest"],
          ["application", "application/x-ms-application"],
          ["apr", "application/vnd.lotus-approach"],
          ["arc", "application/x-freearc"],
          ["arj", "application/x-arj"],
          ["asc", "application/pgp-signature"],
          ["asf", "video/x-ms-asf"],
          ["asm", "text/x-asm"],
          ["aso", "application/vnd.accpac.simply.aso"],
          ["asx", "video/x-ms-asf"],
          ["atc", "application/vnd.acucorp"],
          ["atom", "application/atom+xml"],
          ["atomcat", "application/atomcat+xml"],
          ["atomdeleted", "application/atomdeleted+xml"],
          ["atomsvc", "application/atomsvc+xml"],
          ["atx", "application/vnd.antix.game-component"],
          ["au", "audio/x-au"],
          ["avi", "video/x-msvideo"],
          ["avif", "image/avif"],
          ["aw", "application/applixware"],
          ["azf", "application/vnd.airzip.filesecure.azf"],
          ["azs", "application/vnd.airzip.filesecure.azs"],
          ["azv", "image/vnd.airzip.accelerator.azv"],
          ["azw", "application/vnd.amazon.ebook"],
          ["b16", "image/vnd.pco.b16"],
          ["bat", "application/x-msdownload"],
          ["bcpio", "application/x-bcpio"],
          ["bdf", "application/x-font-bdf"],
          ["bdm", "application/vnd.syncml.dm+wbxml"],
          ["bdoc", "application/x-bdoc"],
          ["bed", "application/vnd.realvnc.bed"],
          ["bh2", "application/vnd.fujitsu.oasysprs"],
          ["bin", "application/octet-stream"],
          ["blb", "application/x-blorb"],
          ["blorb", "application/x-blorb"],
          ["bmi", "application/vnd.bmi"],
          ["bmml", "application/vnd.balsamiq.bmml+xml"],
          ["bmp", "image/bmp"],
          ["book", "application/vnd.framemaker"],
          ["box", "application/vnd.previewsystems.box"],
          ["boz", "application/x-bzip2"],
          ["bpk", "application/octet-stream"],
          ["bpmn", "application/octet-stream"],
          ["bsp", "model/vnd.valve.source.compiled-map"],
          ["btif", "image/prs.btif"],
          ["buffer", "application/octet-stream"],
          ["bz", "application/x-bzip"],
          ["bz2", "application/x-bzip2"],
          ["c", "text/x-c"],
          ["c4d", "application/vnd.clonk.c4group"],
          ["c4f", "application/vnd.clonk.c4group"],
          ["c4g", "application/vnd.clonk.c4group"],
          ["c4p", "application/vnd.clonk.c4group"],
          ["c4u", "application/vnd.clonk.c4group"],
          ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
          ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
          ["cab", "application/vnd.ms-cab-compressed"],
          ["caf", "audio/x-caf"],
          ["cap", "application/vnd.tcpdump.pcap"],
          ["car", "application/vnd.curl.car"],
          ["cat", "application/vnd.ms-pki.seccat"],
          ["cb7", "application/x-cbr"],
          ["cba", "application/x-cbr"],
          ["cbr", "application/x-cbr"],
          ["cbt", "application/x-cbr"],
          ["cbz", "application/x-cbr"],
          ["cc", "text/x-c"],
          ["cco", "application/x-cocoa"],
          ["cct", "application/x-director"],
          ["ccxml", "application/ccxml+xml"],
          ["cdbcmsg", "application/vnd.contact.cmsg"],
          ["cda", "application/x-cdf"],
          ["cdf", "application/x-netcdf"],
          ["cdfx", "application/cdfx+xml"],
          ["cdkey", "application/vnd.mediastation.cdkey"],
          ["cdmia", "application/cdmi-capability"],
          ["cdmic", "application/cdmi-container"],
          ["cdmid", "application/cdmi-domain"],
          ["cdmio", "application/cdmi-object"],
          ["cdmiq", "application/cdmi-queue"],
          ["cdr", "application/cdr"],
          ["cdx", "chemical/x-cdx"],
          ["cdxml", "application/vnd.chemdraw+xml"],
          ["cdy", "application/vnd.cinderella"],
          ["cer", "application/pkix-cert"],
          ["cfs", "application/x-cfs-compressed"],
          ["cgm", "image/cgm"],
          ["chat", "application/x-chat"],
          ["chm", "application/vnd.ms-htmlhelp"],
          ["chrt", "application/vnd.kde.kchart"],
          ["cif", "chemical/x-cif"],
          ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
          ["cil", "application/vnd.ms-artgalry"],
          ["cjs", "application/node"],
          ["cla", "application/vnd.claymore"],
          ["class", "application/octet-stream"],
          ["clkk", "application/vnd.crick.clicker.keyboard"],
          ["clkp", "application/vnd.crick.clicker.palette"],
          ["clkt", "application/vnd.crick.clicker.template"],
          ["clkw", "application/vnd.crick.clicker.wordbank"],
          ["clkx", "application/vnd.crick.clicker"],
          ["clp", "application/x-msclip"],
          ["cmc", "application/vnd.cosmocaller"],
          ["cmdf", "chemical/x-cmdf"],
          ["cml", "chemical/x-cml"],
          ["cmp", "application/vnd.yellowriver-custom-menu"],
          ["cmx", "image/x-cmx"],
          ["cod", "application/vnd.rim.cod"],
          ["coffee", "text/coffeescript"],
          ["com", "application/x-msdownload"],
          ["conf", "text/plain"],
          ["cpio", "application/x-cpio"],
          ["cpp", "text/x-c"],
          ["cpt", "application/mac-compactpro"],
          ["crd", "application/x-mscardfile"],
          ["crl", "application/pkix-crl"],
          ["crt", "application/x-x509-ca-cert"],
          ["crx", "application/x-chrome-extension"],
          ["cryptonote", "application/vnd.rig.cryptonote"],
          ["csh", "application/x-csh"],
          ["csl", "application/vnd.citationstyles.style+xml"],
          ["csml", "chemical/x-csml"],
          ["csp", "application/vnd.commonspace"],
          ["csr", "application/octet-stream"],
          ["css", "text/css"],
          ["cst", "application/x-director"],
          ["csv", "text/csv"],
          ["cu", "application/cu-seeme"],
          ["curl", "text/vnd.curl"],
          ["cww", "application/prs.cww"],
          ["cxt", "application/x-director"],
          ["cxx", "text/x-c"],
          ["dae", "model/vnd.collada+xml"],
          ["daf", "application/vnd.mobius.daf"],
          ["dart", "application/vnd.dart"],
          ["dataless", "application/vnd.fdsn.seed"],
          ["davmount", "application/davmount+xml"],
          ["dbf", "application/vnd.dbf"],
          ["dbk", "application/docbook+xml"],
          ["dcr", "application/x-director"],
          ["dcurl", "text/vnd.curl.dcurl"],
          ["dd2", "application/vnd.oma.dd2+xml"],
          ["ddd", "application/vnd.fujixerox.ddd"],
          ["ddf", "application/vnd.syncml.dmddf+xml"],
          ["dds", "image/vnd.ms-dds"],
          ["deb", "application/x-debian-package"],
          ["def", "text/plain"],
          ["deploy", "application/octet-stream"],
          ["der", "application/x-x509-ca-cert"],
          ["dfac", "application/vnd.dreamfactory"],
          ["dgc", "application/x-dgc-compressed"],
          ["dic", "text/x-c"],
          ["dir", "application/x-director"],
          ["dis", "application/vnd.mobius.dis"],
          ["disposition-notification", "message/disposition-notification"],
          ["dist", "application/octet-stream"],
          ["distz", "application/octet-stream"],
          ["djv", "image/vnd.djvu"],
          ["djvu", "image/vnd.djvu"],
          ["dll", "application/octet-stream"],
          ["dmg", "application/x-apple-diskimage"],
          ["dmn", "application/octet-stream"],
          ["dmp", "application/vnd.tcpdump.pcap"],
          ["dms", "application/octet-stream"],
          ["dna", "application/vnd.dna"],
          ["doc", "application/msword"],
          ["docm", "application/vnd.ms-word.template.macroEnabled.12"],
          [
            "docx",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ],
          ["dot", "application/msword"],
          ["dotm", "application/vnd.ms-word.template.macroEnabled.12"],
          [
            "dotx",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
          ],
          ["dp", "application/vnd.osgi.dp"],
          ["dpg", "application/vnd.dpgraph"],
          ["dra", "audio/vnd.dra"],
          ["drle", "image/dicom-rle"],
          ["dsc", "text/prs.lines.tag"],
          ["dssc", "application/dssc+der"],
          ["dtb", "application/x-dtbook+xml"],
          ["dtd", "application/xml-dtd"],
          ["dts", "audio/vnd.dts"],
          ["dtshd", "audio/vnd.dts.hd"],
          ["dump", "application/octet-stream"],
          ["dvb", "video/vnd.dvb.file"],
          ["dvi", "application/x-dvi"],
          ["dwd", "application/atsc-dwd+xml"],
          ["dwf", "model/vnd.dwf"],
          ["dwg", "image/vnd.dwg"],
          ["dxf", "image/vnd.dxf"],
          ["dxp", "application/vnd.spotfire.dxp"],
          ["dxr", "application/x-director"],
          ["ear", "application/java-archive"],
          ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
          ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
          ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
          ["ecma", "application/ecmascript"],
          ["edm", "application/vnd.novadigm.edm"],
          ["edx", "application/vnd.novadigm.edx"],
          ["efif", "application/vnd.picsel"],
          ["ei6", "application/vnd.pg.osasli"],
          ["elc", "application/octet-stream"],
          ["emf", "image/emf"],
          ["eml", "message/rfc822"],
          ["emma", "application/emma+xml"],
          ["emotionml", "application/emotionml+xml"],
          ["emz", "application/x-msmetafile"],
          ["eol", "audio/vnd.digital-winds"],
          ["eot", "application/vnd.ms-fontobject"],
          ["eps", "application/postscript"],
          ["epub", "application/epub+zip"],
          ["es", "application/ecmascript"],
          ["es3", "application/vnd.eszigno3+xml"],
          ["esa", "application/vnd.osgi.subsystem"],
          ["esf", "application/vnd.epson.esf"],
          ["et3", "application/vnd.eszigno3+xml"],
          ["etx", "text/x-setext"],
          ["eva", "application/x-eva"],
          ["evy", "application/x-envoy"],
          ["exe", "application/octet-stream"],
          ["exi", "application/exi"],
          ["exp", "application/express"],
          ["exr", "image/aces"],
          ["ext", "application/vnd.novadigm.ext"],
          ["ez", "application/andrew-inset"],
          ["ez2", "application/vnd.ezpix-album"],
          ["ez3", "application/vnd.ezpix-package"],
          ["f", "text/x-fortran"],
          ["f4v", "video/mp4"],
          ["f77", "text/x-fortran"],
          ["f90", "text/x-fortran"],
          ["fbs", "image/vnd.fastbidsheet"],
          ["fcdt", "application/vnd.adobe.formscentral.fcdt"],
          ["fcs", "application/vnd.isac.fcs"],
          ["fdf", "application/vnd.fdf"],
          ["fdt", "application/fdt+xml"],
          ["fe_launch", "application/vnd.denovo.fcselayout-link"],
          ["fg5", "application/vnd.fujitsu.oasysgp"],
          ["fgd", "application/x-director"],
          ["fh", "image/x-freehand"],
          ["fh4", "image/x-freehand"],
          ["fh5", "image/x-freehand"],
          ["fh7", "image/x-freehand"],
          ["fhc", "image/x-freehand"],
          ["fig", "application/x-xfig"],
          ["fits", "image/fits"],
          ["flac", "audio/x-flac"],
          ["fli", "video/x-fli"],
          ["flo", "application/vnd.micrografx.flo"],
          ["flv", "video/x-flv"],
          ["flw", "application/vnd.kde.kivio"],
          ["flx", "text/vnd.fmi.flexstor"],
          ["fly", "text/vnd.fly"],
          ["fm", "application/vnd.framemaker"],
          ["fnc", "application/vnd.frogans.fnc"],
          ["fo", "application/vnd.software602.filler.form+xml"],
          ["for", "text/x-fortran"],
          ["fpx", "image/vnd.fpx"],
          ["frame", "application/vnd.framemaker"],
          ["fsc", "application/vnd.fsc.weblaunch"],
          ["fst", "image/vnd.fst"],
          ["ftc", "application/vnd.fluxtime.clip"],
          ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
          ["fvt", "video/vnd.fvt"],
          ["fxp", "application/vnd.adobe.fxp"],
          ["fxpl", "application/vnd.adobe.fxp"],
          ["fzs", "application/vnd.fuzzysheet"],
          ["g2w", "application/vnd.geoplan"],
          ["g3", "image/g3fax"],
          ["g3w", "application/vnd.geospace"],
          ["gac", "application/vnd.groove-account"],
          ["gam", "application/x-tads"],
          ["gbr", "application/rpki-ghostbusters"],
          ["gca", "application/x-gca-compressed"],
          ["gdl", "model/vnd.gdl"],
          ["gdoc", "application/vnd.google-apps.document"],
          ["geo", "application/vnd.dynageo"],
          ["geojson", "application/geo+json"],
          ["gex", "application/vnd.geometry-explorer"],
          ["ggb", "application/vnd.geogebra.file"],
          ["ggt", "application/vnd.geogebra.tool"],
          ["ghf", "application/vnd.groove-help"],
          ["gif", "image/gif"],
          ["gim", "application/vnd.groove-identity-message"],
          ["glb", "model/gltf-binary"],
          ["gltf", "model/gltf+json"],
          ["gml", "application/gml+xml"],
          ["gmx", "application/vnd.gmx"],
          ["gnumeric", "application/x-gnumeric"],
          ["gpg", "application/gpg-keys"],
          ["gph", "application/vnd.flographit"],
          ["gpx", "application/gpx+xml"],
          ["gqf", "application/vnd.grafeq"],
          ["gqs", "application/vnd.grafeq"],
          ["gram", "application/srgs"],
          ["gramps", "application/x-gramps-xml"],
          ["gre", "application/vnd.geometry-explorer"],
          ["grv", "application/vnd.groove-injector"],
          ["grxml", "application/srgs+xml"],
          ["gsf", "application/x-font-ghostscript"],
          ["gsheet", "application/vnd.google-apps.spreadsheet"],
          ["gslides", "application/vnd.google-apps.presentation"],
          ["gtar", "application/x-gtar"],
          ["gtm", "application/vnd.groove-tool-message"],
          ["gtw", "model/vnd.gtw"],
          ["gv", "text/vnd.graphviz"],
          ["gxf", "application/gxf"],
          ["gxt", "application/vnd.geonext"],
          ["gz", "application/gzip"],
          ["gzip", "application/gzip"],
          ["h", "text/x-c"],
          ["h261", "video/h261"],
          ["h263", "video/h263"],
          ["h264", "video/h264"],
          ["hal", "application/vnd.hal+xml"],
          ["hbci", "application/vnd.hbci"],
          ["hbs", "text/x-handlebars-template"],
          ["hdd", "application/x-virtualbox-hdd"],
          ["hdf", "application/x-hdf"],
          ["heic", "image/heic"],
          ["heics", "image/heic-sequence"],
          ["heif", "image/heif"],
          ["heifs", "image/heif-sequence"],
          ["hej2", "image/hej2k"],
          ["held", "application/atsc-held+xml"],
          ["hh", "text/x-c"],
          ["hjson", "application/hjson"],
          ["hlp", "application/winhlp"],
          ["hpgl", "application/vnd.hp-hpgl"],
          ["hpid", "application/vnd.hp-hpid"],
          ["hps", "application/vnd.hp-hps"],
          ["hqx", "application/mac-binhex40"],
          ["hsj2", "image/hsj2"],
          ["htc", "text/x-component"],
          ["htke", "application/vnd.kenameaapp"],
          ["htm", "text/html"],
          ["html", "text/html"],
          ["hvd", "application/vnd.yamaha.hv-dic"],
          ["hvp", "application/vnd.yamaha.hv-voice"],
          ["hvs", "application/vnd.yamaha.hv-script"],
          ["i2g", "application/vnd.intergeo"],
          ["icc", "application/vnd.iccprofile"],
          ["ice", "x-conference/x-cooltalk"],
          ["icm", "application/vnd.iccprofile"],
          ["ico", "image/x-icon"],
          ["ics", "text/calendar"],
          ["ief", "image/ief"],
          ["ifb", "text/calendar"],
          ["ifm", "application/vnd.shana.informed.formdata"],
          ["iges", "model/iges"],
          ["igl", "application/vnd.igloader"],
          ["igm", "application/vnd.insors.igm"],
          ["igs", "model/iges"],
          ["igx", "application/vnd.micrografx.igx"],
          ["iif", "application/vnd.shana.informed.interchange"],
          ["img", "application/octet-stream"],
          ["imp", "application/vnd.accpac.simply.imp"],
          ["ims", "application/vnd.ms-ims"],
          ["in", "text/plain"],
          ["ini", "text/plain"],
          ["ink", "application/inkml+xml"],
          ["inkml", "application/inkml+xml"],
          ["install", "application/x-install-instructions"],
          ["iota", "application/vnd.astraea-software.iota"],
          ["ipfix", "application/ipfix"],
          ["ipk", "application/vnd.shana.informed.package"],
          ["irm", "application/vnd.ibm.rights-management"],
          ["irp", "application/vnd.irepository.package+xml"],
          ["iso", "application/x-iso9660-image"],
          ["itp", "application/vnd.shana.informed.formtemplate"],
          ["its", "application/its+xml"],
          ["ivp", "application/vnd.immervision-ivp"],
          ["ivu", "application/vnd.immervision-ivu"],
          ["jad", "text/vnd.sun.j2me.app-descriptor"],
          ["jade", "text/jade"],
          ["jam", "application/vnd.jam"],
          ["jar", "application/java-archive"],
          ["jardiff", "application/x-java-archive-diff"],
          ["java", "text/x-java-source"],
          ["jhc", "image/jphc"],
          ["jisp", "application/vnd.jisp"],
          ["jls", "image/jls"],
          ["jlt", "application/vnd.hp-jlyt"],
          ["jng", "image/x-jng"],
          ["jnlp", "application/x-java-jnlp-file"],
          ["joda", "application/vnd.joost.joda-archive"],
          ["jp2", "image/jp2"],
          ["jpe", "image/jpeg"],
          ["jpeg", "image/jpeg"],
          ["jpf", "image/jpx"],
          ["jpg", "image/jpeg"],
          ["jpg2", "image/jp2"],
          ["jpgm", "video/jpm"],
          ["jpgv", "video/jpeg"],
          ["jph", "image/jph"],
          ["jpm", "video/jpm"],
          ["jpx", "image/jpx"],
          ["js", "application/javascript"],
          ["json", "application/json"],
          ["json5", "application/json5"],
          ["jsonld", "application/ld+json"],
          ["jsonl", "application/jsonl"],
          ["jsonml", "application/jsonml+json"],
          ["jsx", "text/jsx"],
          ["jxr", "image/jxr"],
          ["jxra", "image/jxra"],
          ["jxrs", "image/jxrs"],
          ["jxs", "image/jxs"],
          ["jxsc", "image/jxsc"],
          ["jxsi", "image/jxsi"],
          ["jxss", "image/jxss"],
          ["kar", "audio/midi"],
          ["karbon", "application/vnd.kde.karbon"],
          ["kdb", "application/octet-stream"],
          ["kdbx", "application/x-keepass2"],
          ["key", "application/x-iwork-keynote-sffkey"],
          ["kfo", "application/vnd.kde.kformula"],
          ["kia", "application/vnd.kidspiration"],
          ["kml", "application/vnd.google-earth.kml+xml"],
          ["kmz", "application/vnd.google-earth.kmz"],
          ["kne", "application/vnd.kinar"],
          ["knp", "application/vnd.kinar"],
          ["kon", "application/vnd.kde.kontour"],
          ["kpr", "application/vnd.kde.kpresenter"],
          ["kpt", "application/vnd.kde.kpresenter"],
          ["kpxx", "application/vnd.ds-keypoint"],
          ["ksp", "application/vnd.kde.kspread"],
          ["ktr", "application/vnd.kahootz"],
          ["ktx", "image/ktx"],
          ["ktx2", "image/ktx2"],
          ["ktz", "application/vnd.kahootz"],
          ["kwd", "application/vnd.kde.kword"],
          ["kwt", "application/vnd.kde.kword"],
          ["lasxml", "application/vnd.las.las+xml"],
          ["latex", "application/x-latex"],
          ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
          ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
          ["les", "application/vnd.hhe.lesson-player"],
          ["less", "text/less"],
          ["lgr", "application/lgr+xml"],
          ["lha", "application/octet-stream"],
          ["link66", "application/vnd.route66.link66+xml"],
          ["list", "text/plain"],
          ["list3820", "application/vnd.ibm.modcap"],
          ["listafp", "application/vnd.ibm.modcap"],
          ["litcoffee", "text/coffeescript"],
          ["lnk", "application/x-ms-shortcut"],
          ["log", "text/plain"],
          ["lostxml", "application/lost+xml"],
          ["lrf", "application/octet-stream"],
          ["lrm", "application/vnd.ms-lrm"],
          ["ltf", "application/vnd.frogans.ltf"],
          ["lua", "text/x-lua"],
          ["luac", "application/x-lua-bytecode"],
          ["lvp", "audio/vnd.lucent.voice"],
          ["lwp", "application/vnd.lotus-wordpro"],
          ["lzh", "application/octet-stream"],
          ["m1v", "video/mpeg"],
          ["m2a", "audio/mpeg"],
          ["m2v", "video/mpeg"],
          ["m3a", "audio/mpeg"],
          ["m3u", "text/plain"],
          ["m3u8", "application/vnd.apple.mpegurl"],
          ["m4a", "audio/x-m4a"],
          ["m4p", "application/mp4"],
          ["m4s", "video/iso.segment"],
          ["m4u", "application/vnd.mpegurl"],
          ["m4v", "video/x-m4v"],
          ["m13", "application/x-msmediaview"],
          ["m14", "application/x-msmediaview"],
          ["m21", "application/mp21"],
          ["ma", "application/mathematica"],
          ["mads", "application/mads+xml"],
          ["maei", "application/mmt-aei+xml"],
          ["mag", "application/vnd.ecowin.chart"],
          ["maker", "application/vnd.framemaker"],
          ["man", "text/troff"],
          ["manifest", "text/cache-manifest"],
          ["map", "application/json"],
          ["mar", "application/octet-stream"],
          ["markdown", "text/markdown"],
          ["mathml", "application/mathml+xml"],
          ["mb", "application/mathematica"],
          ["mbk", "application/vnd.mobius.mbk"],
          ["mbox", "application/mbox"],
          ["mc1", "application/vnd.medcalcdata"],
          ["mcd", "application/vnd.mcd"],
          ["mcurl", "text/vnd.curl.mcurl"],
          ["md", "text/markdown"],
          ["mdb", "application/x-msaccess"],
          ["mdi", "image/vnd.ms-modi"],
          ["mdx", "text/mdx"],
          ["me", "text/troff"],
          ["mesh", "model/mesh"],
          ["meta4", "application/metalink4+xml"],
          ["metalink", "application/metalink+xml"],
          ["mets", "application/mets+xml"],
          ["mfm", "application/vnd.mfmp"],
          ["mft", "application/rpki-manifest"],
          ["mgp", "application/vnd.osgeo.mapguide.package"],
          ["mgz", "application/vnd.proteus.magazine"],
          ["mid", "audio/midi"],
          ["midi", "audio/midi"],
          ["mie", "application/x-mie"],
          ["mif", "application/vnd.mif"],
          ["mime", "message/rfc822"],
          ["mj2", "video/mj2"],
          ["mjp2", "video/mj2"],
          ["mjs", "application/javascript"],
          ["mk3d", "video/x-matroska"],
          ["mka", "audio/x-matroska"],
          ["mkd", "text/x-markdown"],
          ["mks", "video/x-matroska"],
          ["mkv", "video/x-matroska"],
          ["mlp", "application/vnd.dolby.mlp"],
          ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
          ["mmf", "application/vnd.smaf"],
          ["mml", "text/mathml"],
          ["mmr", "image/vnd.fujixerox.edmics-mmr"],
          ["mng", "video/x-mng"],
          ["mny", "application/x-msmoney"],
          ["mobi", "application/x-mobipocket-ebook"],
          ["mods", "application/mods+xml"],
          ["mov", "video/quicktime"],
          ["movie", "video/x-sgi-movie"],
          ["mp2", "audio/mpeg"],
          ["mp2a", "audio/mpeg"],
          ["mp3", "audio/mpeg"],
          ["mp4", "video/mp4"],
          ["mp4a", "audio/mp4"],
          ["mp4s", "application/mp4"],
          ["mp4v", "video/mp4"],
          ["mp21", "application/mp21"],
          ["mpc", "application/vnd.mophun.certificate"],
          ["mpd", "application/dash+xml"],
          ["mpe", "video/mpeg"],
          ["mpeg", "video/mpeg"],
          ["mpg", "video/mpeg"],
          ["mpg4", "video/mp4"],
          ["mpga", "audio/mpeg"],
          ["mpkg", "application/vnd.apple.installer+xml"],
          ["mpm", "application/vnd.blueice.multipass"],
          ["mpn", "application/vnd.mophun.application"],
          ["mpp", "application/vnd.ms-project"],
          ["mpt", "application/vnd.ms-project"],
          ["mpy", "application/vnd.ibm.minipay"],
          ["mqy", "application/vnd.mobius.mqy"],
          ["mrc", "application/marc"],
          ["mrcx", "application/marcxml+xml"],
          ["ms", "text/troff"],
          ["mscml", "application/mediaservercontrol+xml"],
          ["mseed", "application/vnd.fdsn.mseed"],
          ["mseq", "application/vnd.mseq"],
          ["msf", "application/vnd.epson.msf"],
          ["msg", "application/vnd.ms-outlook"],
          ["msh", "model/mesh"],
          ["msi", "application/x-msdownload"],
          ["msl", "application/vnd.mobius.msl"],
          ["msm", "application/octet-stream"],
          ["msp", "application/octet-stream"],
          ["msty", "application/vnd.muvee.style"],
          ["mtl", "model/mtl"],
          ["mts", "model/vnd.mts"],
          ["mus", "application/vnd.musician"],
          ["musd", "application/mmt-usd+xml"],
          ["musicxml", "application/vnd.recordare.musicxml+xml"],
          ["mvb", "application/x-msmediaview"],
          ["mvt", "application/vnd.mapbox-vector-tile"],
          ["mwf", "application/vnd.mfer"],
          ["mxf", "application/mxf"],
          ["mxl", "application/vnd.recordare.musicxml"],
          ["mxmf", "audio/mobile-xmf"],
          ["mxml", "application/xv+xml"],
          ["mxs", "application/vnd.triscape.mxs"],
          ["mxu", "video/vnd.mpegurl"],
          ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
          ["n3", "text/n3"],
          ["nb", "application/mathematica"],
          ["nbp", "application/vnd.wolfram.player"],
          ["nc", "application/x-netcdf"],
          ["ncx", "application/x-dtbncx+xml"],
          ["nfo", "text/x-nfo"],
          ["ngdat", "application/vnd.nokia.n-gage.data"],
          ["nitf", "application/vnd.nitf"],
          ["nlu", "application/vnd.neurolanguage.nlu"],
          ["nml", "application/vnd.enliven"],
          ["nnd", "application/vnd.noblenet-directory"],
          ["nns", "application/vnd.noblenet-sealer"],
          ["nnw", "application/vnd.noblenet-web"],
          ["npx", "image/vnd.net-fpx"],
          ["nq", "application/n-quads"],
          ["nsc", "application/x-conference"],
          ["nsf", "application/vnd.lotus-notes"],
          ["nt", "application/n-triples"],
          ["ntf", "application/vnd.nitf"],
          ["numbers", "application/x-iwork-numbers-sffnumbers"],
          ["nzb", "application/x-nzb"],
          ["oa2", "application/vnd.fujitsu.oasys2"],
          ["oa3", "application/vnd.fujitsu.oasys3"],
          ["oas", "application/vnd.fujitsu.oasys"],
          ["obd", "application/x-msbinder"],
          ["obgx", "application/vnd.openblox.game+xml"],
          ["obj", "model/obj"],
          ["oda", "application/oda"],
          ["odb", "application/vnd.oasis.opendocument.database"],
          ["odc", "application/vnd.oasis.opendocument.chart"],
          ["odf", "application/vnd.oasis.opendocument.formula"],
          ["odft", "application/vnd.oasis.opendocument.formula-template"],
          ["odg", "application/vnd.oasis.opendocument.graphics"],
          ["odi", "application/vnd.oasis.opendocument.image"],
          ["odm", "application/vnd.oasis.opendocument.text-master"],
          ["odp", "application/vnd.oasis.opendocument.presentation"],
          ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
          ["odt", "application/vnd.oasis.opendocument.text"],
          ["oga", "audio/ogg"],
          ["ogex", "model/vnd.opengex"],
          ["ogg", "audio/ogg"],
          ["ogv", "video/ogg"],
          ["ogx", "application/ogg"],
          ["omdoc", "application/omdoc+xml"],
          ["onepkg", "application/onenote"],
          ["onetmp", "application/onenote"],
          ["onetoc", "application/onenote"],
          ["onetoc2", "application/onenote"],
          ["opf", "application/oebps-package+xml"],
          ["opml", "text/x-opml"],
          ["oprc", "application/vnd.palm"],
          ["opus", "audio/ogg"],
          ["org", "text/x-org"],
          ["osf", "application/vnd.yamaha.openscoreformat"],
          ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
          ["osm", "application/vnd.openstreetmap.data+xml"],
          ["otc", "application/vnd.oasis.opendocument.chart-template"],
          ["otf", "font/otf"],
          ["otg", "application/vnd.oasis.opendocument.graphics-template"],
          ["oth", "application/vnd.oasis.opendocument.text-web"],
          ["oti", "application/vnd.oasis.opendocument.image-template"],
          ["otp", "application/vnd.oasis.opendocument.presentation-template"],
          ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
          ["ott", "application/vnd.oasis.opendocument.text-template"],
          ["ova", "application/x-virtualbox-ova"],
          ["ovf", "application/x-virtualbox-ovf"],
          ["owl", "application/rdf+xml"],
          ["oxps", "application/oxps"],
          ["oxt", "application/vnd.openofficeorg.extension"],
          ["p", "text/x-pascal"],
          ["p7a", "application/x-pkcs7-signature"],
          ["p7b", "application/x-pkcs7-certificates"],
          ["p7c", "application/pkcs7-mime"],
          ["p7m", "application/pkcs7-mime"],
          ["p7r", "application/x-pkcs7-certreqresp"],
          ["p7s", "application/pkcs7-signature"],
          ["p8", "application/pkcs8"],
          ["p10", "application/x-pkcs10"],
          ["p12", "application/x-pkcs12"],
          ["pac", "application/x-ns-proxy-autoconfig"],
          ["pages", "application/x-iwork-pages-sffpages"],
          ["pas", "text/x-pascal"],
          ["paw", "application/vnd.pawaafile"],
          ["pbd", "application/vnd.powerbuilder6"],
          ["pbm", "image/x-portable-bitmap"],
          ["pcap", "application/vnd.tcpdump.pcap"],
          ["pcf", "application/x-font-pcf"],
          ["pcl", "application/vnd.hp-pcl"],
          ["pclxl", "application/vnd.hp-pclxl"],
          ["pct", "image/x-pict"],
          ["pcurl", "application/vnd.curl.pcurl"],
          ["pcx", "image/x-pcx"],
          ["pdb", "application/x-pilot"],
          ["pde", "text/x-processing"],
          ["pdf", "application/pdf"],
          ["pem", "application/x-x509-user-cert"],
          ["pfa", "application/x-font-type1"],
          ["pfb", "application/x-font-type1"],
          ["pfm", "application/x-font-type1"],
          ["pfr", "application/font-tdpfr"],
          ["pfx", "application/x-pkcs12"],
          ["pgm", "image/x-portable-graymap"],
          ["pgn", "application/x-chess-pgn"],
          ["pgp", "application/pgp"],
          ["php", "application/x-httpd-php"],
          ["php3", "application/x-httpd-php"],
          ["php4", "application/x-httpd-php"],
          ["phps", "application/x-httpd-php-source"],
          ["phtml", "application/x-httpd-php"],
          ["pic", "image/x-pict"],
          ["pkg", "application/octet-stream"],
          ["pki", "application/pkixcmp"],
          ["pkipath", "application/pkix-pkipath"],
          ["pkpass", "application/vnd.apple.pkpass"],
          ["pl", "application/x-perl"],
          ["plb", "application/vnd.3gpp.pic-bw-large"],
          ["plc", "application/vnd.mobius.plc"],
          ["plf", "application/vnd.pocketlearn"],
          ["pls", "application/pls+xml"],
          ["pm", "application/x-perl"],
          ["pml", "application/vnd.ctc-posml"],
          ["png", "image/png"],
          ["pnm", "image/x-portable-anymap"],
          ["portpkg", "application/vnd.macports.portpkg"],
          ["pot", "application/vnd.ms-powerpoint"],
          [
            "potm",
            "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
          ],
          [
            "potx",
            "application/vnd.openxmlformats-officedocument.presentationml.template",
          ],
          ["ppa", "application/vnd.ms-powerpoint"],
          ["ppam", "application/vnd.ms-powerpoint.addin.macroEnabled.12"],
          ["ppd", "application/vnd.cups-ppd"],
          ["ppm", "image/x-portable-pixmap"],
          ["pps", "application/vnd.ms-powerpoint"],
          ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"],
          [
            "ppsx",
            "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
          ],
          ["ppt", "application/powerpoint"],
          [
            "pptm",
            "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
          ],
          [
            "pptx",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          ],
          ["pqa", "application/vnd.palm"],
          ["prc", "application/x-pilot"],
          ["pre", "application/vnd.lotus-freelance"],
          ["prf", "application/pics-rules"],
          ["provx", "application/provenance+xml"],
          ["ps", "application/postscript"],
          ["psb", "application/vnd.3gpp.pic-bw-small"],
          ["psd", "application/x-photoshop"],
          ["psf", "application/x-font-linux-psf"],
          ["pskcxml", "application/pskc+xml"],
          ["pti", "image/prs.pti"],
          ["ptid", "application/vnd.pvi.ptid1"],
          ["pub", "application/x-mspublisher"],
          ["pvb", "application/vnd.3gpp.pic-bw-var"],
          ["pwn", "application/vnd.3m.post-it-notes"],
          ["pya", "audio/vnd.ms-playready.media.pya"],
          ["pyv", "video/vnd.ms-playready.media.pyv"],
          ["qam", "application/vnd.epson.quickanime"],
          ["qbo", "application/vnd.intu.qbo"],
          ["qfx", "application/vnd.intu.qfx"],
          ["qps", "application/vnd.publishare-delta-tree"],
          ["qt", "video/quicktime"],
          ["qwd", "application/vnd.quark.quarkxpress"],
          ["qwt", "application/vnd.quark.quarkxpress"],
          ["qxb", "application/vnd.quark.quarkxpress"],
          ["qxd", "application/vnd.quark.quarkxpress"],
          ["qxl", "application/vnd.quark.quarkxpress"],
          ["qxt", "application/vnd.quark.quarkxpress"],
          ["ra", "audio/x-realaudio"],
          ["ram", "audio/x-pn-realaudio"],
          ["raml", "application/raml+yaml"],
          ["rapd", "application/route-apd+xml"],
          ["rar", "application/x-rar"],
          ["ras", "image/x-cmu-raster"],
          ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
          ["rdf", "application/rdf+xml"],
          ["rdz", "application/vnd.data-vision.rdz"],
          ["relo", "application/p2p-overlay+xml"],
          ["rep", "application/vnd.businessobjects"],
          ["res", "application/x-dtbresource+xml"],
          ["rgb", "image/x-rgb"],
          ["rif", "application/reginfo+xml"],
          ["rip", "audio/vnd.rip"],
          ["ris", "application/x-research-info-systems"],
          ["rl", "application/resource-lists+xml"],
          ["rlc", "image/vnd.fujixerox.edmics-rlc"],
          ["rld", "application/resource-lists-diff+xml"],
          ["rm", "audio/x-pn-realaudio"],
          ["rmi", "audio/midi"],
          ["rmp", "audio/x-pn-realaudio-plugin"],
          ["rms", "application/vnd.jcp.javame.midlet-rms"],
          ["rmvb", "application/vnd.rn-realmedia-vbr"],
          ["rnc", "application/relax-ng-compact-syntax"],
          ["rng", "application/xml"],
          ["roa", "application/rpki-roa"],
          ["roff", "text/troff"],
          ["rp9", "application/vnd.cloanto.rp9"],
          ["rpm", "audio/x-pn-realaudio-plugin"],
          ["rpss", "application/vnd.nokia.radio-presets"],
          ["rpst", "application/vnd.nokia.radio-preset"],
          ["rq", "application/sparql-query"],
          ["rs", "application/rls-services+xml"],
          ["rsa", "application/x-pkcs7"],
          ["rsat", "application/atsc-rsat+xml"],
          ["rsd", "application/rsd+xml"],
          ["rsheet", "application/urc-ressheet+xml"],
          ["rss", "application/rss+xml"],
          ["rtf", "text/rtf"],
          ["rtx", "text/richtext"],
          ["run", "application/x-makeself"],
          ["rusd", "application/route-usd+xml"],
          ["rv", "video/vnd.rn-realvideo"],
          ["s", "text/x-asm"],
          ["s3m", "audio/s3m"],
          ["saf", "application/vnd.yamaha.smaf-audio"],
          ["sass", "text/x-sass"],
          ["sbml", "application/sbml+xml"],
          ["sc", "application/vnd.ibm.secure-container"],
          ["scd", "application/x-msschedule"],
          ["scm", "application/vnd.lotus-screencam"],
          ["scq", "application/scvp-cv-request"],
          ["scs", "application/scvp-cv-response"],
          ["scss", "text/x-scss"],
          ["scurl", "text/vnd.curl.scurl"],
          ["sda", "application/vnd.stardivision.draw"],
          ["sdc", "application/vnd.stardivision.calc"],
          ["sdd", "application/vnd.stardivision.impress"],
          ["sdkd", "application/vnd.solent.sdkm+xml"],
          ["sdkm", "application/vnd.solent.sdkm+xml"],
          ["sdp", "application/sdp"],
          ["sdw", "application/vnd.stardivision.writer"],
          ["sea", "application/octet-stream"],
          ["see", "application/vnd.seemail"],
          ["seed", "application/vnd.fdsn.seed"],
          ["sema", "application/vnd.sema"],
          ["semd", "application/vnd.semd"],
          ["semf", "application/vnd.semf"],
          ["senmlx", "application/senml+xml"],
          ["sensmlx", "application/sensml+xml"],
          ["ser", "application/java-serialized-object"],
          ["setpay", "application/set-payment-initiation"],
          ["setreg", "application/set-registration-initiation"],
          ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
          ["sfs", "application/vnd.spotfire.sfs"],
          ["sfv", "text/x-sfv"],
          ["sgi", "image/sgi"],
          ["sgl", "application/vnd.stardivision.writer-global"],
          ["sgm", "text/sgml"],
          ["sgml", "text/sgml"],
          ["sh", "application/x-sh"],
          ["shar", "application/x-shar"],
          ["shex", "text/shex"],
          ["shf", "application/shf+xml"],
          ["shtml", "text/html"],
          ["sid", "image/x-mrsid-image"],
          ["sieve", "application/sieve"],
          ["sig", "application/pgp-signature"],
          ["sil", "audio/silk"],
          ["silo", "model/mesh"],
          ["sis", "application/vnd.symbian.install"],
          ["sisx", "application/vnd.symbian.install"],
          ["sit", "application/x-stuffit"],
          ["sitx", "application/x-stuffitx"],
          ["siv", "application/sieve"],
          ["skd", "application/vnd.koan"],
          ["skm", "application/vnd.koan"],
          ["skp", "application/vnd.koan"],
          ["skt", "application/vnd.koan"],
          ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
          [
            "sldx",
            "application/vnd.openxmlformats-officedocument.presentationml.slide",
          ],
          ["slim", "text/slim"],
          ["slm", "text/slim"],
          ["sls", "application/route-s-tsid+xml"],
          ["slt", "application/vnd.epson.salt"],
          ["sm", "application/vnd.stepmania.stepchart"],
          ["smf", "application/vnd.stardivision.math"],
          ["smi", "application/smil"],
          ["smil", "application/smil"],
          ["smv", "video/x-smv"],
          ["smzip", "application/vnd.stepmania.package"],
          ["snd", "audio/basic"],
          ["snf", "application/x-font-snf"],
          ["so", "application/octet-stream"],
          ["spc", "application/x-pkcs7-certificates"],
          ["spdx", "text/spdx"],
          ["spf", "application/vnd.yamaha.smaf-phrase"],
          ["spl", "application/x-futuresplash"],
          ["spot", "text/vnd.in3d.spot"],
          ["spp", "application/scvp-vp-response"],
          ["spq", "application/scvp-vp-request"],
          ["spx", "audio/ogg"],
          ["sql", "application/x-sql"],
          ["src", "application/x-wais-source"],
          ["srt", "application/x-subrip"],
          ["sru", "application/sru+xml"],
          ["srx", "application/sparql-results+xml"],
          ["ssdl", "application/ssdl+xml"],
          ["sse", "application/vnd.kodak-descriptor"],
          ["ssf", "application/vnd.epson.ssf"],
          ["ssml", "application/ssml+xml"],
          ["sst", "application/octet-stream"],
          ["st", "application/vnd.sailingtracker.track"],
          ["stc", "application/vnd.sun.xml.calc.template"],
          ["std", "application/vnd.sun.xml.draw.template"],
          ["stf", "application/vnd.wt.stf"],
          ["sti", "application/vnd.sun.xml.impress.template"],
          ["stk", "application/hyperstudio"],
          ["stl", "model/stl"],
          ["stpx", "model/step+xml"],
          ["stpxz", "model/step-xml+zip"],
          ["stpz", "model/step+zip"],
          ["str", "application/vnd.pg.format"],
          ["stw", "application/vnd.sun.xml.writer.template"],
          ["styl", "text/stylus"],
          ["stylus", "text/stylus"],
          ["sub", "text/vnd.dvb.subtitle"],
          ["sus", "application/vnd.sus-calendar"],
          ["susp", "application/vnd.sus-calendar"],
          ["sv4cpio", "application/x-sv4cpio"],
          ["sv4crc", "application/x-sv4crc"],
          ["svc", "application/vnd.dvb.service"],
          ["svd", "application/vnd.svd"],
          ["svg", "image/svg+xml"],
          ["svgz", "image/svg+xml"],
          ["swa", "application/x-director"],
          ["swf", "application/x-shockwave-flash"],
          ["swi", "application/vnd.aristanetworks.swi"],
          ["swidtag", "application/swid+xml"],
          ["sxc", "application/vnd.sun.xml.calc"],
          ["sxd", "application/vnd.sun.xml.draw"],
          ["sxg", "application/vnd.sun.xml.writer.global"],
          ["sxi", "application/vnd.sun.xml.impress"],
          ["sxm", "application/vnd.sun.xml.math"],
          ["sxw", "application/vnd.sun.xml.writer"],
          ["t", "text/troff"],
          ["t3", "application/x-t3vm-image"],
          ["t38", "image/t38"],
          ["taglet", "application/vnd.mynfc"],
          ["tao", "application/vnd.tao.intent-module-archive"],
          ["tap", "image/vnd.tencent.tap"],
          ["tar", "application/x-tar"],
          ["tcap", "application/vnd.3gpp2.tcap"],
          ["tcl", "application/x-tcl"],
          ["td", "application/urc-targetdesc+xml"],
          ["teacher", "application/vnd.smart.teacher"],
          ["tei", "application/tei+xml"],
          ["teicorpus", "application/tei+xml"],
          ["tex", "application/x-tex"],
          ["texi", "application/x-texinfo"],
          ["texinfo", "application/x-texinfo"],
          ["text", "text/plain"],
          ["tfi", "application/thraud+xml"],
          ["tfm", "application/x-tex-tfm"],
          ["tfx", "image/tiff-fx"],
          ["tga", "image/x-tga"],
          ["tgz", "application/x-tar"],
          ["thmx", "application/vnd.ms-officetheme"],
          ["tif", "image/tiff"],
          ["tiff", "image/tiff"],
          ["tk", "application/x-tcl"],
          ["tmo", "application/vnd.tmobile-livetv"],
          ["toml", "application/toml"],
          ["torrent", "application/x-bittorrent"],
          ["tpl", "application/vnd.groove-tool-template"],
          ["tpt", "application/vnd.trid.tpt"],
          ["tr", "text/troff"],
          ["tra", "application/vnd.trueapp"],
          ["trig", "application/trig"],
          ["trm", "application/x-msterminal"],
          ["ts", "video/mp2t"],
          ["tsd", "application/timestamped-data"],
          ["tsv", "text/tab-separated-values"],
          ["ttc", "font/collection"],
          ["ttf", "font/ttf"],
          ["ttl", "text/turtle"],
          ["ttml", "application/ttml+xml"],
          ["twd", "application/vnd.simtech-mindmapper"],
          ["twds", "application/vnd.simtech-mindmapper"],
          ["txd", "application/vnd.genomatix.tuxedo"],
          ["txf", "application/vnd.mobius.txf"],
          ["txt", "text/plain"],
          ["u8dsn", "message/global-delivery-status"],
          ["u8hdr", "message/global-headers"],
          ["u8mdn", "message/global-disposition-notification"],
          ["u8msg", "message/global"],
          ["u32", "application/x-authorware-bin"],
          ["ubj", "application/ubjson"],
          ["udeb", "application/x-debian-package"],
          ["ufd", "application/vnd.ufdl"],
          ["ufdl", "application/vnd.ufdl"],
          ["ulx", "application/x-glulx"],
          ["umj", "application/vnd.umajin"],
          ["unityweb", "application/vnd.unity"],
          ["uoml", "application/vnd.uoml+xml"],
          ["uri", "text/uri-list"],
          ["uris", "text/uri-list"],
          ["urls", "text/uri-list"],
          ["usdz", "model/vnd.usdz+zip"],
          ["ustar", "application/x-ustar"],
          ["utz", "application/vnd.uiq.theme"],
          ["uu", "text/x-uuencode"],
          ["uva", "audio/vnd.dece.audio"],
          ["uvd", "application/vnd.dece.data"],
          ["uvf", "application/vnd.dece.data"],
          ["uvg", "image/vnd.dece.graphic"],
          ["uvh", "video/vnd.dece.hd"],
          ["uvi", "image/vnd.dece.graphic"],
          ["uvm", "video/vnd.dece.mobile"],
          ["uvp", "video/vnd.dece.pd"],
          ["uvs", "video/vnd.dece.sd"],
          ["uvt", "application/vnd.dece.ttml+xml"],
          ["uvu", "video/vnd.uvvu.mp4"],
          ["uvv", "video/vnd.dece.video"],
          ["uvva", "audio/vnd.dece.audio"],
          ["uvvd", "application/vnd.dece.data"],
          ["uvvf", "application/vnd.dece.data"],
          ["uvvg", "image/vnd.dece.graphic"],
          ["uvvh", "video/vnd.dece.hd"],
          ["uvvi", "image/vnd.dece.graphic"],
          ["uvvm", "video/vnd.dece.mobile"],
          ["uvvp", "video/vnd.dece.pd"],
          ["uvvs", "video/vnd.dece.sd"],
          ["uvvt", "application/vnd.dece.ttml+xml"],
          ["uvvu", "video/vnd.uvvu.mp4"],
          ["uvvv", "video/vnd.dece.video"],
          ["uvvx", "application/vnd.dece.unspecified"],
          ["uvvz", "application/vnd.dece.zip"],
          ["uvx", "application/vnd.dece.unspecified"],
          ["uvz", "application/vnd.dece.zip"],
          ["vbox", "application/x-virtualbox-vbox"],
          ["vbox-extpack", "application/x-virtualbox-vbox-extpack"],
          ["vcard", "text/vcard"],
          ["vcd", "application/x-cdlink"],
          ["vcf", "text/x-vcard"],
          ["vcg", "application/vnd.groove-vcard"],
          ["vcs", "text/x-vcalendar"],
          ["vcx", "application/vnd.vcx"],
          ["vdi", "application/x-virtualbox-vdi"],
          ["vds", "model/vnd.sap.vds"],
          ["vhd", "application/x-virtualbox-vhd"],
          ["vis", "application/vnd.visionary"],
          ["viv", "video/vnd.vivo"],
          ["vlc", "application/videolan"],
          ["vmdk", "application/x-virtualbox-vmdk"],
          ["vob", "video/x-ms-vob"],
          ["vor", "application/vnd.stardivision.writer"],
          ["vox", "application/x-authorware-bin"],
          ["vrml", "model/vrml"],
          ["vsd", "application/vnd.visio"],
          ["vsf", "application/vnd.vsf"],
          ["vss", "application/vnd.visio"],
          ["vst", "application/vnd.visio"],
          ["vsw", "application/vnd.visio"],
          ["vtf", "image/vnd.valve.source.texture"],
          ["vtt", "text/vtt"],
          ["vtu", "model/vnd.vtu"],
          ["vxml", "application/voicexml+xml"],
          ["w3d", "application/x-director"],
          ["wad", "application/x-doom"],
          ["wadl", "application/vnd.sun.wadl+xml"],
          ["war", "application/java-archive"],
          ["wasm", "application/wasm"],
          ["wav", "audio/x-wav"],
          ["wax", "audio/x-ms-wax"],
          ["wbmp", "image/vnd.wap.wbmp"],
          ["wbs", "application/vnd.criticaltools.wbs+xml"],
          ["wbxml", "application/wbxml"],
          ["wcm", "application/vnd.ms-works"],
          ["wdb", "application/vnd.ms-works"],
          ["wdp", "image/vnd.ms-photo"],
          ["weba", "audio/webm"],
          ["webapp", "application/x-web-app-manifest+json"],
          ["webm", "video/webm"],
          ["webmanifest", "application/manifest+json"],
          ["webp", "image/webp"],
          ["wg", "application/vnd.pmi.widget"],
          ["wgt", "application/widget"],
          ["wks", "application/vnd.ms-works"],
          ["wm", "video/x-ms-wm"],
          ["wma", "audio/x-ms-wma"],
          ["wmd", "application/x-ms-wmd"],
          ["wmf", "image/wmf"],
          ["wml", "text/vnd.wap.wml"],
          ["wmlc", "application/wmlc"],
          ["wmls", "text/vnd.wap.wmlscript"],
          ["wmlsc", "application/vnd.wap.wmlscriptc"],
          ["wmv", "video/x-ms-wmv"],
          ["wmx", "video/x-ms-wmx"],
          ["wmz", "application/x-msmetafile"],
          ["woff", "font/woff"],
          ["woff2", "font/woff2"],
          ["word", "application/msword"],
          ["wpd", "application/vnd.wordperfect"],
          ["wpl", "application/vnd.ms-wpl"],
          ["wps", "application/vnd.ms-works"],
          ["wqd", "application/vnd.wqd"],
          ["wri", "application/x-mswrite"],
          ["wrl", "model/vrml"],
          ["wsc", "message/vnd.wfa.wsc"],
          ["wsdl", "application/wsdl+xml"],
          ["wspolicy", "application/wspolicy+xml"],
          ["wtb", "application/vnd.webturbo"],
          ["wvx", "video/x-ms-wvx"],
          ["x3d", "model/x3d+xml"],
          ["x3db", "model/x3d+fastinfoset"],
          ["x3dbz", "model/x3d+binary"],
          ["x3dv", "model/x3d-vrml"],
          ["x3dvz", "model/x3d+vrml"],
          ["x3dz", "model/x3d+xml"],
          ["x32", "application/x-authorware-bin"],
          ["x_b", "model/vnd.parasolid.transmit.binary"],
          ["x_t", "model/vnd.parasolid.transmit.text"],
          ["xaml", "application/xaml+xml"],
          ["xap", "application/x-silverlight-app"],
          ["xar", "application/vnd.xara"],
          ["xav", "application/xcap-att+xml"],
          ["xbap", "application/x-ms-xbap"],
          ["xbd", "application/vnd.fujixerox.docuworks.binder"],
          ["xbm", "image/x-xbitmap"],
          ["xca", "application/xcap-caps+xml"],
          ["xcs", "application/calendar+xml"],
          ["xdf", "application/xcap-diff+xml"],
          ["xdm", "application/vnd.syncml.dm+xml"],
          ["xdp", "application/vnd.adobe.xdp+xml"],
          ["xdssc", "application/dssc+xml"],
          ["xdw", "application/vnd.fujixerox.docuworks"],
          ["xel", "application/xcap-el+xml"],
          ["xenc", "application/xenc+xml"],
          ["xer", "application/patch-ops-error+xml"],
          ["xfdf", "application/vnd.adobe.xfdf"],
          ["xfdl", "application/vnd.xfdl"],
          ["xht", "application/xhtml+xml"],
          ["xhtml", "application/xhtml+xml"],
          ["xhvml", "application/xv+xml"],
          ["xif", "image/vnd.xiff"],
          ["xl", "application/excel"],
          ["xla", "application/vnd.ms-excel"],
          ["xlam", "application/vnd.ms-excel.addin.macroEnabled.12"],
          ["xlc", "application/vnd.ms-excel"],
          ["xlf", "application/xliff+xml"],
          ["xlm", "application/vnd.ms-excel"],
          ["xls", "application/vnd.ms-excel"],
          ["xlsb", "application/vnd.ms-excel.sheet.binary.macroEnabled.12"],
          ["xlsm", "application/vnd.ms-excel.sheet.macroEnabled.12"],
          [
            "xlsx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ],
          ["xlt", "application/vnd.ms-excel"],
          ["xltm", "application/vnd.ms-excel.template.macroEnabled.12"],
          [
            "xltx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
          ],
          ["xlw", "application/vnd.ms-excel"],
          ["xm", "audio/xm"],
          ["xml", "application/xml"],
          ["xns", "application/xcap-ns+xml"],
          ["xo", "application/vnd.olpc-sugar"],
          ["xop", "application/xop+xml"],
          ["xpi", "application/x-xpinstall"],
          ["xpl", "application/xproc+xml"],
          ["xpm", "image/x-xpixmap"],
          ["xpr", "application/vnd.is-xpr"],
          ["xps", "application/vnd.ms-xpsdocument"],
          ["xpw", "application/vnd.intercon.formnet"],
          ["xpx", "application/vnd.intercon.formnet"],
          ["xsd", "application/xml"],
          ["xsl", "application/xml"],
          ["xslt", "application/xslt+xml"],
          ["xsm", "application/vnd.syncml+xml"],
          ["xspf", "application/xspf+xml"],
          ["xul", "application/vnd.mozilla.xul+xml"],
          ["xvm", "application/xv+xml"],
          ["xvml", "application/xv+xml"],
          ["xwd", "image/x-xwindowdump"],
          ["xyz", "chemical/x-xyz"],
          ["xz", "application/x-xz"],
          ["yaml", "text/yaml"],
          ["yang", "application/yang"],
          ["yin", "application/yin+xml"],
          ["yml", "text/yaml"],
          ["ymp", "text/x-suse-ymp"],
          ["z", "application/x-compress"],
          ["z1", "application/x-zmachine"],
          ["z2", "application/x-zmachine"],
          ["z3", "application/x-zmachine"],
          ["z4", "application/x-zmachine"],
          ["z5", "application/x-zmachine"],
          ["z6", "application/x-zmachine"],
          ["z7", "application/x-zmachine"],
          ["z8", "application/x-zmachine"],
          ["zaz", "application/vnd.zzazz.deck+xml"],
          ["zip", "application/zip"],
          ["zir", "application/vnd.zul"],
          ["zirz", "application/vnd.zul"],
          ["zmm", "application/vnd.handheld-entertainment+xml"],
          ["zsh", "text/x-scriptzsh"],
        ]);
        function Z(e, t, n) {
          const i = (function (e) {
              const { name: t } = e;
              if (t && -1 !== t.lastIndexOf(".") && !e.type) {
                const n = t.split(".").pop().toLowerCase(),
                  i = Q.get(n);
                i &&
                  Object.defineProperty(e, "type", {
                    value: i,
                    writable: !1,
                    configurable: !1,
                    enumerable: !0,
                  });
              }
              return e;
            })(e),
            { webkitRelativePath: a } = e,
            o =
              "string" == typeof t
                ? t
                : "string" == typeof a && a.length > 0
                ? a
                : `./${e.name}`;
          return (
            "string" != typeof i.path && J(i, "path", o),
            void 0 !== n &&
              Object.defineProperty(i, "handle", {
                value: n,
                writable: !1,
                configurable: !1,
                enumerable: !0,
              }),
            J(i, "relativePath", o),
            i
          );
        }
        function J(e, t, n) {
          Object.defineProperty(e, t, {
            value: n,
            writable: !1,
            configurable: !1,
            enumerable: !0,
          });
        }
        const ee = [".DS_Store", "Thumbs.db"];
        function te(e) {
          return "object" == typeof e && null !== e;
        }
        function ne(e) {
          return e.filter((e) => -1 === ee.indexOf(e.name));
        }
        function ie(e) {
          if (null === e) return [];
          const t = [];
          for (let n = 0; n < e.length; n++) {
            const i = e[n];
            t.push(i);
          }
          return t;
        }
        function ae(e) {
          if ("function" != typeof e.webkitGetAsEntry) return re(e);
          const t = e.webkitGetAsEntry();
          return t && t.isDirectory ? le(t) : re(e, t);
        }
        function oe(e) {
          return e.reduce(
            (e, t) => [...e, ...(Array.isArray(t) ? oe(t) : [t])],
            []
          );
        }
        function re(e, t) {
          return X(this, void 0, void 0, function* () {
            var n;
            if (
              globalThis.isSecureContext &&
              "function" == typeof e.getAsFileSystemHandle
            ) {
              const t = yield e.getAsFileSystemHandle();
              if (null === t) throw new Error(`${e} is not a File`);
              if (void 0 !== t) {
                const e = yield t.getFile();
                return (e.handle = t), Z(e);
              }
            }
            const i = e.getAsFile();
            if (!i) throw new Error(`${e} is not a File`);
            return Z(
              i,
              null !== (n = null == t ? void 0 : t.fullPath) && void 0 !== n
                ? n
                : void 0
            );
          });
        }
        function se(e) {
          return X(this, void 0, void 0, function* () {
            return e.isDirectory
              ? le(e)
              : (function (e) {
                  return X(this, void 0, void 0, function* () {
                    return new Promise((t, n) => {
                      e.file(
                        (n) => {
                          const i = Z(n, e.fullPath);
                          t(i);
                        },
                        (e) => {
                          n(e);
                        }
                      );
                    });
                  });
                })(e);
          });
        }
        function le(e) {
          const t = e.createReader();
          return new Promise((e, n) => {
            const i = [];
            !(function a() {
              t.readEntries(
                (t) =>
                  X(this, void 0, void 0, function* () {
                    if (t.length) {
                      const e = Promise.all(t.map(se));
                      i.push(e), a();
                    } else
                      try {
                        const t = yield Promise.all(i);
                        e(t);
                      } catch (e) {
                        n(e);
                      }
                  }),
                (e) => {
                  n(e);
                }
              );
            })();
          });
        }
        var de = n(8107);
        function ce(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return ge(e);
            })(e) ||
            (function (e) {
              if (
                ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e["@@iterator"]
              )
                return Array.from(e);
            })(e) ||
            he(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function ue(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function pe(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? ue(Object(n), !0).forEach(function (t) {
                  fe(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : ue(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function fe(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function me(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var n =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null == n) return;
              var i,
                a,
                o = [],
                r = !0,
                s = !1;
              try {
                for (
                  n = n.call(e);
                  !(r = (i = n.next()).done) &&
                  (o.push(i.value), !t || o.length !== t);
                  r = !0
                );
              } catch (e) {
                (s = !0), (a = e);
              } finally {
                try {
                  r || null == n.return || n.return();
                } finally {
                  if (s) throw a;
                }
              }
              return o;
            })(e, t) ||
            he(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function he(e, t) {
          if (e) {
            if ("string" == typeof e) return ge(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === n && e.constructor && (n = e.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(e)
                : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? ge(e, t)
                : void 0
            );
          }
        }
        function ge(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
          return i;
        }
        var be = "function" == typeof de ? de : de.default,
          ve = "file-invalid-type",
          xe = "file-too-large",
          ye = "file-too-small",
          we = "too-many-files",
          ke = function () {
            var e = (
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : ""
              ).split(","),
              t = e.length > 1 ? "one of ".concat(e.join(", ")) : e[0];
            return { code: ve, message: "File type must be ".concat(t) };
          },
          Ae = function (e) {
            return {
              code: xe,
              message: "File is larger than "
                .concat(e, " ")
                .concat(1 === e ? "byte" : "bytes"),
            };
          },
          Ce = function (e) {
            return {
              code: ye,
              message: "File is smaller than "
                .concat(e, " ")
                .concat(1 === e ? "byte" : "bytes"),
            };
          },
          Ee = { code: we, message: "Too many files" };
        function Se(e, t) {
          var n = "application/x-moz-file" === e.type || be(e, t);
          return [n, n ? null : ke(t)];
        }
        function De(e, t, n) {
          if (Ye(e.size))
            if (Ye(t) && Ye(n)) {
              if (e.size > n) return [!1, Ae(n)];
              if (e.size < t) return [!1, Ce(t)];
            } else {
              if (Ye(t) && e.size < t) return [!1, Ce(t)];
              if (Ye(n) && e.size > n) return [!1, Ae(n)];
            }
          return [!0, null];
        }
        function Ye(e) {
          return null != e;
        }
        function Te(e) {
          return "function" == typeof e.isPropagationStopped
            ? e.isPropagationStopped()
            : void 0 !== e.cancelBubble && e.cancelBubble;
        }
        function Fe(e) {
          return e.dataTransfer
            ? Array.prototype.some.call(e.dataTransfer.types, function (e) {
                return "Files" === e || "application/x-moz-file" === e;
              })
            : !!e.target && !!e.target.files;
        }
        function _e(e) {
          e.preventDefault();
        }
        function Ie() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return function (e) {
            for (
              var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), a = 1;
              a < n;
              a++
            )
              i[a - 1] = arguments[a];
            return t.some(function (t) {
              return !Te(e) && t && t.apply(void 0, [e].concat(i)), Te(e);
            });
          };
        }
        function Me(e) {
          return (
            "audio/*" === e ||
            "video/*" === e ||
            "image/*" === e ||
            "text/*" === e ||
            "application/*" === e ||
            /\w+\/[-+.\w]+/g.test(e)
          );
        }
        function Ne(e) {
          return /^.*\.[\w]+$/.test(e);
        }
        var Re = ["children"],
          Oe = ["open"],
          je = [
            "refKey",
            "role",
            "onKeyDown",
            "onFocus",
            "onBlur",
            "onClick",
            "onDragEnter",
            "onDragOver",
            "onDragLeave",
            "onDrop",
          ],
          Le = ["refKey", "onChange", "onClick"];
        function ze(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return Be(e);
            })(e) ||
            (function (e) {
              if (
                ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e["@@iterator"]
              )
                return Array.from(e);
            })(e) ||
            Pe(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function Ue(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var n =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null == n) return;
              var i,
                a,
                o = [],
                r = !0,
                s = !1;
              try {
                for (
                  n = n.call(e);
                  !(r = (i = n.next()).done) &&
                  (o.push(i.value), !t || o.length !== t);
                  r = !0
                );
              } catch (e) {
                (s = !0), (a = e);
              } finally {
                try {
                  r || null == n.return || n.return();
                } finally {
                  if (s) throw a;
                }
              }
              return o;
            })(e, t) ||
            Pe(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function Pe(e, t) {
          if (e) {
            if ("string" == typeof e) return Be(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === n && e.constructor && (n = e.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(e)
                : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? Be(e, t)
                : void 0
            );
          }
        }
        function Be(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
          return i;
        }
        function He(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function qe(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? He(Object(n), !0).forEach(function (t) {
                  $e(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : He(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function $e(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function Ve(e, t) {
          if (null == e) return {};
          var n,
            i,
            a = (function (e, t) {
              if (null == e) return {};
              var n,
                i,
                a = {},
                o = Object.keys(e);
              for (i = 0; i < o.length; i++)
                (n = o[i]), t.indexOf(n) >= 0 || (a[n] = e[n]);
              return a;
            })(e, t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            for (i = 0; i < o.length; i++)
              (n = o[i]),
                t.indexOf(n) >= 0 ||
                  (Object.prototype.propertyIsEnumerable.call(e, n) &&
                    (a[n] = e[n]));
          }
          return a;
        }
        var We = (0, a.forwardRef)(function (e, t) {
          var n = e.children,
            i = Xe(Ve(e, Re)),
            o = i.open,
            r = Ve(i, Oe);
          return (
            (0, a.useImperativeHandle)(
              t,
              function () {
                return { open: o };
              },
              [o]
            ),
            a.createElement(a.Fragment, null, n(qe(qe({}, r), {}, { open: o })))
          );
        });
        We.displayName = "Dropzone";
        var Ke = {
          disabled: !1,
          getFilesFromEvent: function (e) {
            return X(this, void 0, void 0, function* () {
              return te(e) && te(e.dataTransfer)
                ? (function (e, t) {
                    return X(this, void 0, void 0, function* () {
                      if (e.items) {
                        const n = ie(e.items).filter((e) => "file" === e.kind);
                        if ("drop" !== t) return n;
                        return ne(oe(yield Promise.all(n.map(ae))));
                      }
                      return ne(ie(e.files).map((e) => Z(e)));
                    });
                  })(e.dataTransfer, e.type)
                : (function (e) {
                    return te(e) && te(e.target);
                  })(e)
                ? (function (e) {
                    return ie(e.target.files).map((e) => Z(e));
                  })(e)
                : Array.isArray(e) &&
                  e.every(
                    (e) => "getFile" in e && "function" == typeof e.getFile
                  )
                ? (function (e) {
                    return X(this, void 0, void 0, function* () {
                      return (yield Promise.all(e.map((e) => e.getFile()))).map(
                        (e) => Z(e)
                      );
                    });
                  })(e)
                : [];
            });
          },
          maxSize: 1 / 0,
          minSize: 0,
          multiple: !0,
          maxFiles: 0,
          preventDropOnDocument: !0,
          noClick: !1,
          noKeyboard: !1,
          noDrag: !1,
          noDragEventsBubbling: !1,
          validator: null,
          useFsAccessApi: !1,
          autoFocus: !1,
        };
        (We.defaultProps = Ke),
          (We.propTypes = {
            children: K.func,
            accept: K.objectOf(K.arrayOf(K.string)),
            multiple: K.bool,
            preventDropOnDocument: K.bool,
            noClick: K.bool,
            noKeyboard: K.bool,
            noDrag: K.bool,
            noDragEventsBubbling: K.bool,
            minSize: K.number,
            maxSize: K.number,
            maxFiles: K.number,
            disabled: K.bool,
            getFilesFromEvent: K.func,
            onFileDialogCancel: K.func,
            onFileDialogOpen: K.func,
            useFsAccessApi: K.bool,
            autoFocus: K.bool,
            onDragEnter: K.func,
            onDragLeave: K.func,
            onDragOver: K.func,
            onDrop: K.func,
            onDropAccepted: K.func,
            onDropRejected: K.func,
            onError: K.func,
            validator: K.func,
          });
        var Ge = {
          isFocused: !1,
          isFileDialogActive: !1,
          isDragActive: !1,
          isDragAccept: !1,
          isDragReject: !1,
          acceptedFiles: [],
          fileRejections: [],
        };
        function Xe() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = qe(qe({}, Ke), e),
            n = t.accept,
            i = t.disabled,
            o = t.getFilesFromEvent,
            r = t.maxSize,
            s = t.minSize,
            l = t.multiple,
            d = t.maxFiles,
            c = t.onDragEnter,
            u = t.onDragLeave,
            p = t.onDragOver,
            f = t.onDrop,
            m = t.onDropAccepted,
            h = t.onDropRejected,
            g = t.onFileDialogCancel,
            b = t.onFileDialogOpen,
            v = t.useFsAccessApi,
            x = t.autoFocus,
            y = t.preventDropOnDocument,
            w = t.noClick,
            k = t.noKeyboard,
            A = t.noDrag,
            C = t.noDragEventsBubbling,
            E = t.onError,
            S = t.validator,
            D = (0, a.useMemo)(
              function () {
                return (function (e) {
                  if (Ye(e))
                    return Object.entries(e)
                      .reduce(function (e, t) {
                        var n = me(t, 2),
                          i = n[0],
                          a = n[1];
                        return [].concat(ce(e), [i], ce(a));
                      }, [])
                      .filter(function (e) {
                        return Me(e) || Ne(e);
                      })
                      .join(",");
                })(n);
              },
              [n]
            ),
            Y = (0, a.useMemo)(
              function () {
                return (function (e) {
                  if (Ye(e)) {
                    var t = Object.entries(e)
                      .filter(function (e) {
                        var t = me(e, 2),
                          n = t[0],
                          i = t[1],
                          a = !0;
                        return (
                          Me(n) ||
                            (console.warn(
                              'Skipped "'.concat(
                                n,
                                '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.'
                              )
                            ),
                            (a = !1)),
                          (Array.isArray(i) && i.every(Ne)) ||
                            (console.warn(
                              'Skipped "'.concat(
                                n,
                                '" because an invalid file extension was provided.'
                              )
                            ),
                            (a = !1)),
                          a
                        );
                      })
                      .reduce(function (e, t) {
                        var n = me(t, 2),
                          i = n[0],
                          a = n[1];
                        return pe(pe({}, e), {}, fe({}, i, a));
                      }, {});
                    return [{ description: "Files", accept: t }];
                  }
                  return e;
                })(n);
              },
              [n]
            ),
            T = (0, a.useMemo)(
              function () {
                return "function" == typeof b ? b : Ze;
              },
              [b]
            ),
            F = (0, a.useMemo)(
              function () {
                return "function" == typeof g ? g : Ze;
              },
              [g]
            ),
            _ = (0, a.useRef)(null),
            I = (0, a.useRef)(null),
            M = Ue((0, a.useReducer)(Qe, Ge), 2),
            N = M[0],
            R = M[1],
            O = N.isFocused,
            j = N.isFileDialogActive,
            L = (0, a.useRef)(
              "undefined" != typeof window &&
                window.isSecureContext &&
                v &&
                "showOpenFilePicker" in window
            ),
            z = function () {
              !L.current &&
                j &&
                setTimeout(function () {
                  I.current &&
                    (I.current.files.length ||
                      (R({ type: "closeDialog" }), F()));
                }, 300);
            };
          (0, a.useEffect)(
            function () {
              return (
                window.addEventListener("focus", z, !1),
                function () {
                  window.removeEventListener("focus", z, !1);
                }
              );
            },
            [I, j, F, L]
          );
          var U = (0, a.useRef)([]),
            P = function (e) {
              (_.current && _.current.contains(e.target)) ||
                (e.preventDefault(), (U.current = []));
            };
          (0, a.useEffect)(
            function () {
              return (
                y &&
                  (document.addEventListener("dragover", _e, !1),
                  document.addEventListener("drop", P, !1)),
                function () {
                  y &&
                    (document.removeEventListener("dragover", _e),
                    document.removeEventListener("drop", P));
                }
              );
            },
            [_, y]
          ),
            (0, a.useEffect)(
              function () {
                return (
                  !i && x && _.current && _.current.focus(), function () {}
                );
              },
              [_, x, i]
            );
          var B = (0, a.useCallback)(
              function (e) {
                E ? E(e) : console.error(e);
              },
              [E]
            ),
            H = (0, a.useCallback)(
              function (e) {
                e.preventDefault(),
                  e.persist(),
                  ne(e),
                  (U.current = [].concat(ze(U.current), [e.target])),
                  Fe(e) &&
                    Promise.resolve(o(e))
                      .then(function (t) {
                        if (!Te(e) || C) {
                          var n = t.length,
                            i =
                              n > 0 &&
                              (function (e) {
                                var t = e.files,
                                  n = e.accept,
                                  i = e.minSize,
                                  a = e.maxSize,
                                  o = e.multiple,
                                  r = e.maxFiles,
                                  s = e.validator;
                                return (
                                  !(
                                    (!o && t.length > 1) ||
                                    (o && r >= 1 && t.length > r)
                                  ) &&
                                  t.every(function (e) {
                                    var t = me(Se(e, n), 1)[0],
                                      o = me(De(e, i, a), 1)[0],
                                      r = s ? s(e) : null;
                                    return t && o && !r;
                                  })
                                );
                              })({
                                files: t,
                                accept: D,
                                minSize: s,
                                maxSize: r,
                                multiple: l,
                                maxFiles: d,
                                validator: S,
                              });
                          R({
                            isDragAccept: i,
                            isDragReject: n > 0 && !i,
                            isDragActive: !0,
                            type: "setDraggedFiles",
                          }),
                            c && c(e);
                        }
                      })
                      .catch(function (e) {
                        return B(e);
                      });
              },
              [o, c, B, C, D, s, r, l, d, S]
            ),
            q = (0, a.useCallback)(
              function (e) {
                e.preventDefault(), e.persist(), ne(e);
                var t = Fe(e);
                if (t && e.dataTransfer)
                  try {
                    e.dataTransfer.dropEffect = "copy";
                  } catch (e) {}
                return t && p && p(e), !1;
              },
              [p, C]
            ),
            $ = (0, a.useCallback)(
              function (e) {
                e.preventDefault(), e.persist(), ne(e);
                var t = U.current.filter(function (e) {
                    return _.current && _.current.contains(e);
                  }),
                  n = t.indexOf(e.target);
                -1 !== n && t.splice(n, 1),
                  (U.current = t),
                  t.length > 0 ||
                    (R({
                      type: "setDraggedFiles",
                      isDragActive: !1,
                      isDragAccept: !1,
                      isDragReject: !1,
                    }),
                    Fe(e) && u && u(e));
              },
              [_, u, C]
            ),
            V = (0, a.useCallback)(
              function (e, t) {
                var n = [],
                  i = [];
                e.forEach(function (e) {
                  var t = Ue(Se(e, D), 2),
                    a = t[0],
                    o = t[1],
                    l = Ue(De(e, s, r), 2),
                    d = l[0],
                    c = l[1],
                    u = S ? S(e) : null;
                  if (a && d && !u) n.push(e);
                  else {
                    var p = [o, c];
                    u && (p = p.concat(u)),
                      i.push({
                        file: e,
                        errors: p.filter(function (e) {
                          return e;
                        }),
                      });
                  }
                }),
                  ((!l && n.length > 1) || (l && d >= 1 && n.length > d)) &&
                    (n.forEach(function (e) {
                      i.push({ file: e, errors: [Ee] });
                    }),
                    n.splice(0)),
                  R({
                    acceptedFiles: n,
                    fileRejections: i,
                    isDragReject: i.length > 0,
                    type: "setFiles",
                  }),
                  f && f(n, i, t),
                  i.length > 0 && h && h(i, t),
                  n.length > 0 && m && m(n, t);
              },
              [R, l, D, s, r, d, f, m, h, S]
            ),
            W = (0, a.useCallback)(
              function (e) {
                e.preventDefault(),
                  e.persist(),
                  ne(e),
                  (U.current = []),
                  Fe(e) &&
                    Promise.resolve(o(e))
                      .then(function (t) {
                        (Te(e) && !C) || V(t, e);
                      })
                      .catch(function (e) {
                        return B(e);
                      }),
                  R({ type: "reset" });
              },
              [o, V, B, C]
            ),
            K = (0, a.useCallback)(
              function () {
                if (L.current) {
                  R({ type: "openDialog" }), T();
                  var e = { multiple: l, types: Y };
                  window
                    .showOpenFilePicker(e)
                    .then(function (e) {
                      return o(e);
                    })
                    .then(function (e) {
                      V(e, null), R({ type: "closeDialog" });
                    })
                    .catch(function (e) {
                      var t;
                      (t = e) instanceof DOMException &&
                      ("AbortError" === t.name || t.code === t.ABORT_ERR)
                        ? (F(e), R({ type: "closeDialog" }))
                        : !(function (e) {
                            return (
                              e instanceof DOMException &&
                              ("SecurityError" === e.name ||
                                e.code === e.SECURITY_ERR)
                            );
                          })(e)
                        ? B(e)
                        : ((L.current = !1),
                          I.current
                            ? ((I.current.value = null), I.current.click())
                            : B(
                                new Error(
                                  "Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."
                                )
                              ));
                    });
                } else
                  I.current &&
                    (R({ type: "openDialog" }),
                    T(),
                    (I.current.value = null),
                    I.current.click());
              },
              [R, T, F, v, V, B, Y, l]
            ),
            G = (0, a.useCallback)(
              function (e) {
                _.current &&
                  _.current.isEqualNode(e.target) &&
                  ((" " !== e.key &&
                    "Enter" !== e.key &&
                    32 !== e.keyCode &&
                    13 !== e.keyCode) ||
                    (e.preventDefault(), K()));
              },
              [_, K]
            ),
            X = (0, a.useCallback)(function () {
              R({ type: "focus" });
            }, []),
            Q = (0, a.useCallback)(function () {
              R({ type: "blur" });
            }, []),
            Z = (0, a.useCallback)(
              function () {
                w ||
                  (!(function () {
                    var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : window.navigator.userAgent;
                    return (
                      (function (e) {
                        return (
                          -1 !== e.indexOf("MSIE") ||
                          -1 !== e.indexOf("Trident/")
                        );
                      })(e) ||
                      (function (e) {
                        return -1 !== e.indexOf("Edge/");
                      })(e)
                    );
                  })()
                    ? K()
                    : setTimeout(K, 0));
              },
              [w, K]
            ),
            J = function (e) {
              return i ? null : e;
            },
            ee = function (e) {
              return k ? null : J(e);
            },
            te = function (e) {
              return A ? null : J(e);
            },
            ne = function (e) {
              C && e.stopPropagation();
            },
            ie = (0, a.useMemo)(
              function () {
                return function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t = e.refKey,
                    n = void 0 === t ? "ref" : t,
                    a = e.role,
                    o = e.onKeyDown,
                    r = e.onFocus,
                    s = e.onBlur,
                    l = e.onClick,
                    d = e.onDragEnter,
                    c = e.onDragOver,
                    u = e.onDragLeave,
                    p = e.onDrop,
                    f = Ve(e, je);
                  return qe(
                    qe(
                      $e(
                        {
                          onKeyDown: ee(Ie(o, G)),
                          onFocus: ee(Ie(r, X)),
                          onBlur: ee(Ie(s, Q)),
                          onClick: J(Ie(l, Z)),
                          onDragEnter: te(Ie(d, H)),
                          onDragOver: te(Ie(c, q)),
                          onDragLeave: te(Ie(u, $)),
                          onDrop: te(Ie(p, W)),
                          role:
                            "string" == typeof a && "" !== a
                              ? a
                              : "presentation",
                        },
                        n,
                        _
                      ),
                      i || k ? {} : { tabIndex: 0 }
                    ),
                    f
                  );
                };
              },
              [_, G, X, Q, Z, H, q, $, W, k, A, i]
            ),
            ae = (0, a.useCallback)(function (e) {
              e.stopPropagation();
            }, []),
            oe = (0, a.useMemo)(
              function () {
                return function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t = e.refKey,
                    n = void 0 === t ? "ref" : t,
                    i = e.onChange,
                    a = e.onClick,
                    o = Ve(e, Le);
                  return qe(
                    qe(
                      {},
                      $e(
                        {
                          accept: D,
                          multiple: l,
                          type: "file",
                          style: {
                            border: 0,
                            clip: "rect(0, 0, 0, 0)",
                            clipPath: "inset(50%)",
                            height: "1px",
                            margin: "0 -1px -1px 0",
                            overflow: "hidden",
                            padding: 0,
                            position: "absolute",
                            width: "1px",
                            whiteSpace: "nowrap",
                          },
                          onChange: J(Ie(i, W)),
                          onClick: J(Ie(a, ae)),
                          tabIndex: -1,
                        },
                        n,
                        I
                      )
                    ),
                    o
                  );
                };
              },
              [I, n, l, W, i]
            );
          return qe(
            qe({}, N),
            {},
            {
              isFocused: O && !i,
              getRootProps: ie,
              getInputProps: oe,
              rootRef: _,
              inputRef: I,
              open: J(K),
            }
          );
        }
        function Qe(e, t) {
          switch (t.type) {
            case "focus":
              return qe(qe({}, e), {}, { isFocused: !0 });
            case "blur":
              return qe(qe({}, e), {}, { isFocused: !1 });
            case "openDialog":
              return qe(qe({}, Ge), {}, { isFileDialogActive: !0 });
            case "closeDialog":
              return qe(qe({}, e), {}, { isFileDialogActive: !1 });
            case "setDraggedFiles":
              return qe(
                qe({}, e),
                {},
                {
                  isDragActive: t.isDragActive,
                  isDragAccept: t.isDragAccept,
                  isDragReject: t.isDragReject,
                }
              );
            case "setFiles":
              return qe(
                qe({}, e),
                {},
                {
                  acceptedFiles: t.acceptedFiles,
                  fileRejections: t.fileRejections,
                  isDragReject: t.isDragReject,
                }
              );
            case "reset":
              return qe({}, Ge);
            default:
              return e;
          }
        }
        function Ze() {}
        var Je = n(6970),
          et = n.n(Je),
          tt = n(9788);
        const nt = (0, f.Dj)().name.toLowerCase(),
          it = (0, f.DD)();
        var at = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)((e) => e.allowAttachments),
            n = (0, r.d4)((e) => e.pendingAttachments),
            i = (0, r.d4)(C.VQ),
            a = (0, r.d4)((e) => e.showOptionsDropdown),
            o = (0, r.d4)((e) => e.isMobile),
            s = (0, r.d4)(C.o4),
            l = (0, r.d4)(C.Ao),
            d = (0, r.d4)(C.fh),
            c = l[l.length - 1]?.form?.some((e) => e.type === tt.Vw.FILE),
            u = n.length >= f.qu,
            { getRootProps: p } = Xe({
              onDrop: (n) => {
                if (t) {
                  const t = n[0];
                  e((0, k.tKZ)(!1)), e((0, k.SBQ)(et()(), t));
                }
              },
              onDragEnter: () => {
                i || e((0, k.tKZ)(!0));
              },
              onDragLeave: () => {
                e((0, k.tKZ)(!1));
              },
              noClick: !0,
              noKeyboard: !0,
              disabled:
                !l.find((e) => "visitor" === e.sender) ||
                it ||
                s ||
                d ||
                c ||
                u ||
                !t,
            });
          return {
            dropzoneProps: p({
              onClick: (t) => {
                t.stopPropagation(),
                  a && o && "ios" === nt && e((0, k.Z9q)(!1));
              },
            }),
          };
        };
        var ot = (e) =>
            (0, $.Y)(P, {
              in: e.in,
              timeout: e.timeout,
              appear: !0,
              addEndListener: (t) => {
                t.addEventListener("transitionend", e.onAnimationEnded, !1);
              },
              children: (t) =>
                (0, $.Y)("div", {
                  className: "transition-container",
                  style: { ...e.defaultStyle, ...e.transitionStyles[t] },
                  children: e.children,
                }),
            }),
          rt = n(4121),
          st = n(6256);
        function lt() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 820;
          const [t, n] = a.useState(""),
            i = a.useRef();
          return {
            triggerShake: function () {
              n("shake"),
                clearTimeout(i.current),
                (i.current = null),
                (i.current = setTimeout(() => {
                  n("");
                }, e));
            },
            shakeClassName: t,
            shouldShake: "shake" === t,
          };
        }
        const dt = {
            text24Bold: {
              name: "1up9osx",
              styles: "font-size:24px;font-weight:bold;line-height:31px",
            },
            text20Semi: {
              name: "1y5s895",
              styles: "font-size:20px;font-weight:600;line-height:31px",
            },
            text16: {
              name: "itm9fh",
              styles: "font-size:16px;line-height:20px",
            },
            text14Medium: {
              name: "1axb9e8",
              styles: "font-size:14px;font-weight:500;line-height:20px",
            },
            text14: {
              name: "244gxd",
              styles: "font-size:14px;line-height:20px",
            },
            text12Bold: {
              name: "14ovpe0",
              styles: "font-size:12px;font-weight:bold;line-height:16px",
            },
            text12Medium: {
              name: "i99m76",
              styles: "font-size:12px;font-weight:500;line-height:16px",
            },
            text12: {
              name: "xolxwr",
              styles: "font-size:12px;line-height:16px",
            },
            text10: {
              name: "1xa2t1e",
              styles: "font-size:10px;line-height:14px",
            },
          },
          ct = {
            text24Bold: (0, d.AH)("", ""),
            text20Semi: (0, d.AH)("", ""),
            text16: (0, d.AH)("", ""),
            text14Medium: (0, d.AH)("", ""),
            text14: (0, d.AH)("", ""),
            text12Bold: (0, d.AH)("", ""),
            text12Medium: (0, d.AH)("", ""),
            text12: (0, d.AH)("", ""),
            text10: (0, d.AH)("", ""),
          },
          ut = (e) => (e ? dt : ct);
        n(3938);
        const {
          entries: pt,
          setPrototypeOf: ft,
          isFrozen: mt,
          getPrototypeOf: ht,
          getOwnPropertyDescriptor: gt,
        } = Object;
        let { freeze: bt, seal: vt, create: xt } = Object,
          { apply: yt, construct: wt } =
            "undefined" != typeof Reflect && Reflect;
        bt ||
          (bt = function (e) {
            return e;
          }),
          vt ||
            (vt = function (e) {
              return e;
            }),
          yt ||
            (yt = function (e, t) {
              for (
                var n = arguments.length,
                  i = new Array(n > 2 ? n - 2 : 0),
                  a = 2;
                a < n;
                a++
              )
                i[a - 2] = arguments[a];
              return e.apply(t, i);
            }),
          wt ||
            (wt = function (e) {
              for (
                var t = arguments.length,
                  n = new Array(t > 1 ? t - 1 : 0),
                  i = 1;
                i < t;
                i++
              )
                n[i - 1] = arguments[i];
              return new e(...n);
            });
        const kt = jt(Array.prototype.forEach),
          At = jt(Array.prototype.lastIndexOf),
          Ct = jt(Array.prototype.pop),
          Et = jt(Array.prototype.push),
          St = jt(Array.prototype.splice),
          Dt = jt(String.prototype.toLowerCase),
          Yt = jt(String.prototype.toString),
          Tt = jt(String.prototype.match),
          Ft = jt(String.prototype.replace),
          _t = jt(String.prototype.indexOf),
          It = jt(String.prototype.trim),
          Mt = jt(Object.prototype.hasOwnProperty),
          Nt = jt(RegExp.prototype.test),
          Rt =
            ((Ot = TypeError),
            function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              return wt(Ot, t);
            });
        var Ot;
        function jt(e) {
          return function (t) {
            t instanceof RegExp && (t.lastIndex = 0);
            for (
              var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), a = 1;
              a < n;
              a++
            )
              i[a - 1] = arguments[a];
            return yt(e, t, i);
          };
        }
        function Lt(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Dt;
          ft && ft(e, null);
          let i = t.length;
          for (; i--; ) {
            let a = t[i];
            if ("string" == typeof a) {
              const e = n(a);
              e !== a && (mt(t) || (t[i] = e), (a = e));
            }
            e[a] = !0;
          }
          return e;
        }
        function zt(e) {
          for (let t = 0; t < e.length; t++) {
            Mt(e, t) || (e[t] = null);
          }
          return e;
        }
        function Ut(e) {
          const t = xt(null);
          for (const [n, i] of pt(e)) {
            Mt(e, n) &&
              (Array.isArray(i)
                ? (t[n] = zt(i))
                : i && "object" == typeof i && i.constructor === Object
                ? (t[n] = Ut(i))
                : (t[n] = i));
          }
          return t;
        }
        function Pt(e, t) {
          for (; null !== e; ) {
            const n = gt(e, t);
            if (n) {
              if (n.get) return jt(n.get);
              if ("function" == typeof n.value) return jt(n.value);
            }
            e = ht(e);
          }
          return function () {
            return null;
          };
        }
        const Bt = bt([
            "a",
            "abbr",
            "acronym",
            "address",
            "area",
            "article",
            "aside",
            "audio",
            "b",
            "bdi",
            "bdo",
            "big",
            "blink",
            "blockquote",
            "body",
            "br",
            "button",
            "canvas",
            "caption",
            "center",
            "cite",
            "code",
            "col",
            "colgroup",
            "content",
            "data",
            "datalist",
            "dd",
            "decorator",
            "del",
            "details",
            "dfn",
            "dialog",
            "dir",
            "div",
            "dl",
            "dt",
            "element",
            "em",
            "fieldset",
            "figcaption",
            "figure",
            "font",
            "footer",
            "form",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "head",
            "header",
            "hgroup",
            "hr",
            "html",
            "i",
            "img",
            "input",
            "ins",
            "kbd",
            "label",
            "legend",
            "li",
            "main",
            "map",
            "mark",
            "marquee",
            "menu",
            "menuitem",
            "meter",
            "nav",
            "nobr",
            "ol",
            "optgroup",
            "option",
            "output",
            "p",
            "picture",
            "pre",
            "progress",
            "q",
            "rp",
            "rt",
            "ruby",
            "s",
            "samp",
            "search",
            "section",
            "select",
            "shadow",
            "slot",
            "small",
            "source",
            "spacer",
            "span",
            "strike",
            "strong",
            "style",
            "sub",
            "summary",
            "sup",
            "table",
            "tbody",
            "td",
            "template",
            "textarea",
            "tfoot",
            "th",
            "thead",
            "time",
            "tr",
            "track",
            "tt",
            "u",
            "ul",
            "var",
            "video",
            "wbr",
          ]),
          Ht = bt([
            "svg",
            "a",
            "altglyph",
            "altglyphdef",
            "altglyphitem",
            "animatecolor",
            "animatemotion",
            "animatetransform",
            "circle",
            "clippath",
            "defs",
            "desc",
            "ellipse",
            "enterkeyhint",
            "exportparts",
            "filter",
            "font",
            "g",
            "glyph",
            "glyphref",
            "hkern",
            "image",
            "inputmode",
            "line",
            "lineargradient",
            "marker",
            "mask",
            "metadata",
            "mpath",
            "part",
            "path",
            "pattern",
            "polygon",
            "polyline",
            "radialgradient",
            "rect",
            "stop",
            "style",
            "switch",
            "symbol",
            "text",
            "textpath",
            "title",
            "tref",
            "tspan",
            "view",
            "vkern",
          ]),
          qt = bt([
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feDropShadow",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
          ]),
          $t = bt([
            "animate",
            "color-profile",
            "cursor",
            "discard",
            "font-face",
            "font-face-format",
            "font-face-name",
            "font-face-src",
            "font-face-uri",
            "foreignobject",
            "hatch",
            "hatchpath",
            "mesh",
            "meshgradient",
            "meshpatch",
            "meshrow",
            "missing-glyph",
            "script",
            "set",
            "solidcolor",
            "unknown",
            "use",
          ]),
          Vt = bt([
            "math",
            "menclose",
            "merror",
            "mfenced",
            "mfrac",
            "mglyph",
            "mi",
            "mlabeledtr",
            "mmultiscripts",
            "mn",
            "mo",
            "mover",
            "mpadded",
            "mphantom",
            "mroot",
            "mrow",
            "ms",
            "mspace",
            "msqrt",
            "mstyle",
            "msub",
            "msup",
            "msubsup",
            "mtable",
            "mtd",
            "mtext",
            "mtr",
            "munder",
            "munderover",
            "mprescripts",
          ]),
          Wt = bt([
            "maction",
            "maligngroup",
            "malignmark",
            "mlongdiv",
            "mscarries",
            "mscarry",
            "msgroup",
            "mstack",
            "msline",
            "msrow",
            "semantics",
            "annotation",
            "annotation-xml",
            "mprescripts",
            "none",
          ]),
          Kt = bt(["#text"]),
          Gt = bt([
            "accept",
            "action",
            "align",
            "alt",
            "autocapitalize",
            "autocomplete",
            "autopictureinpicture",
            "autoplay",
            "background",
            "bgcolor",
            "border",
            "capture",
            "cellpadding",
            "cellspacing",
            "checked",
            "cite",
            "class",
            "clear",
            "color",
            "cols",
            "colspan",
            "controls",
            "controlslist",
            "coords",
            "crossorigin",
            "datetime",
            "decoding",
            "default",
            "dir",
            "disabled",
            "disablepictureinpicture",
            "disableremoteplayback",
            "download",
            "draggable",
            "enctype",
            "enterkeyhint",
            "exportparts",
            "face",
            "for",
            "headers",
            "height",
            "hidden",
            "high",
            "href",
            "hreflang",
            "id",
            "inert",
            "inputmode",
            "integrity",
            "ismap",
            "kind",
            "label",
            "lang",
            "list",
            "loading",
            "loop",
            "low",
            "max",
            "maxlength",
            "media",
            "method",
            "min",
            "minlength",
            "multiple",
            "muted",
            "name",
            "nonce",
            "noshade",
            "novalidate",
            "nowrap",
            "open",
            "optimum",
            "part",
            "pattern",
            "placeholder",
            "playsinline",
            "popover",
            "popovertarget",
            "popovertargetaction",
            "poster",
            "preload",
            "pubdate",
            "radiogroup",
            "readonly",
            "rel",
            "required",
            "rev",
            "reversed",
            "role",
            "rows",
            "rowspan",
            "spellcheck",
            "scope",
            "selected",
            "shape",
            "size",
            "sizes",
            "slot",
            "span",
            "srclang",
            "start",
            "src",
            "srcset",
            "step",
            "style",
            "summary",
            "tabindex",
            "title",
            "translate",
            "type",
            "usemap",
            "valign",
            "value",
            "width",
            "wrap",
            "xmlns",
            "slot",
          ]),
          Xt = bt([
            "accent-height",
            "accumulate",
            "additive",
            "alignment-baseline",
            "amplitude",
            "ascent",
            "attributename",
            "attributetype",
            "azimuth",
            "basefrequency",
            "baseline-shift",
            "begin",
            "bias",
            "by",
            "class",
            "clip",
            "clippathunits",
            "clip-path",
            "clip-rule",
            "color",
            "color-interpolation",
            "color-interpolation-filters",
            "color-profile",
            "color-rendering",
            "cx",
            "cy",
            "d",
            "dx",
            "dy",
            "diffuseconstant",
            "direction",
            "display",
            "divisor",
            "dur",
            "edgemode",
            "elevation",
            "end",
            "exponent",
            "fill",
            "fill-opacity",
            "fill-rule",
            "filter",
            "filterunits",
            "flood-color",
            "flood-opacity",
            "font-family",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-variant",
            "font-weight",
            "fx",
            "fy",
            "g1",
            "g2",
            "glyph-name",
            "glyphref",
            "gradientunits",
            "gradienttransform",
            "height",
            "href",
            "id",
            "image-rendering",
            "in",
            "in2",
            "intercept",
            "k",
            "k1",
            "k2",
            "k3",
            "k4",
            "kerning",
            "keypoints",
            "keysplines",
            "keytimes",
            "lang",
            "lengthadjust",
            "letter-spacing",
            "kernelmatrix",
            "kernelunitlength",
            "lighting-color",
            "local",
            "marker-end",
            "marker-mid",
            "marker-start",
            "markerheight",
            "markerunits",
            "markerwidth",
            "maskcontentunits",
            "maskunits",
            "max",
            "mask",
            "mask-type",
            "media",
            "method",
            "mode",
            "min",
            "name",
            "numoctaves",
            "offset",
            "operator",
            "opacity",
            "order",
            "orient",
            "orientation",
            "origin",
            "overflow",
            "paint-order",
            "path",
            "pathlength",
            "patterncontentunits",
            "patterntransform",
            "patternunits",
            "points",
            "preservealpha",
            "preserveaspectratio",
            "primitiveunits",
            "r",
            "rx",
            "ry",
            "radius",
            "refx",
            "refy",
            "repeatcount",
            "repeatdur",
            "restart",
            "result",
            "rotate",
            "scale",
            "seed",
            "shape-rendering",
            "slope",
            "specularconstant",
            "specularexponent",
            "spreadmethod",
            "startoffset",
            "stddeviation",
            "stitchtiles",
            "stop-color",
            "stop-opacity",
            "stroke-dasharray",
            "stroke-dashoffset",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke",
            "stroke-width",
            "style",
            "surfacescale",
            "systemlanguage",
            "tabindex",
            "tablevalues",
            "targetx",
            "targety",
            "transform",
            "transform-origin",
            "text-anchor",
            "text-decoration",
            "text-rendering",
            "textlength",
            "type",
            "u1",
            "u2",
            "unicode",
            "values",
            "viewbox",
            "visibility",
            "version",
            "vert-adv-y",
            "vert-origin-x",
            "vert-origin-y",
            "width",
            "word-spacing",
            "wrap",
            "writing-mode",
            "xchannelselector",
            "ychannelselector",
            "x",
            "x1",
            "x2",
            "xmlns",
            "y",
            "y1",
            "y2",
            "z",
            "zoomandpan",
          ]),
          Qt = bt([
            "accent",
            "accentunder",
            "align",
            "bevelled",
            "close",
            "columnsalign",
            "columnlines",
            "columnspan",
            "denomalign",
            "depth",
            "dir",
            "display",
            "displaystyle",
            "encoding",
            "fence",
            "frame",
            "height",
            "href",
            "id",
            "largeop",
            "length",
            "linethickness",
            "lspace",
            "lquote",
            "mathbackground",
            "mathcolor",
            "mathsize",
            "mathvariant",
            "maxsize",
            "minsize",
            "movablelimits",
            "notation",
            "numalign",
            "open",
            "rowalign",
            "rowlines",
            "rowspacing",
            "rowspan",
            "rspace",
            "rquote",
            "scriptlevel",
            "scriptminsize",
            "scriptsizemultiplier",
            "selection",
            "separator",
            "separators",
            "stretchy",
            "subscriptshift",
            "supscriptshift",
            "symmetric",
            "voffset",
            "width",
            "xmlns",
          ]),
          Zt = bt([
            "xlink:href",
            "xml:id",
            "xlink:title",
            "xml:space",
            "xmlns:xlink",
          ]),
          Jt = vt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
          en = vt(/<%[\w\W]*|[\w\W]*%>/gm),
          tn = vt(/\$\{[\w\W]*/gm),
          nn = vt(/^data-[\-\w.\u00B7-\uFFFF]+$/),
          an = vt(/^aria-[\-\w]+$/),
          on = vt(
            /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
          ),
          rn = vt(/^(?:\w+script|data):/i),
          sn = vt(
            /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
          ),
          ln = vt(/^html$/i),
          dn = vt(/^[a-z][.\w]*(-[.\w]+)+$/i);
        var cn = Object.freeze({
          __proto__: null,
          ARIA_ATTR: an,
          ATTR_WHITESPACE: sn,
          CUSTOM_ELEMENT: dn,
          DATA_ATTR: nn,
          DOCTYPE_NAME: ln,
          ERB_EXPR: en,
          IS_ALLOWED_URI: on,
          IS_SCRIPT_OR_DATA: rn,
          MUSTACHE_EXPR: Jt,
          TMPLIT_EXPR: tn,
        });
        const un = 1,
          pn = 3,
          fn = 7,
          mn = 8,
          hn = 9,
          gn = function () {
            return "undefined" == typeof window ? null : window;
          };
        var bn = (function e() {
            let t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : gn();
            const n = (t) => e(t);
            if (
              ((n.version = "3.3.1"),
              (n.removed = []),
              !t || !t.document || t.document.nodeType !== hn || !t.Element)
            )
              return (n.isSupported = !1), n;
            let { document: i } = t;
            const a = i,
              o = a.currentScript,
              {
                DocumentFragment: r,
                HTMLTemplateElement: s,
                Node: l,
                Element: d,
                NodeFilter: c,
                NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
                HTMLFormElement: p,
                DOMParser: f,
                trustedTypes: m,
              } = t,
              h = d.prototype,
              g = Pt(h, "cloneNode"),
              b = Pt(h, "remove"),
              v = Pt(h, "nextSibling"),
              x = Pt(h, "childNodes"),
              y = Pt(h, "parentNode");
            if ("function" == typeof s) {
              const e = i.createElement("template");
              e.content &&
                e.content.ownerDocument &&
                (i = e.content.ownerDocument);
            }
            let w,
              k = "";
            const {
                implementation: A,
                createNodeIterator: C,
                createDocumentFragment: E,
                getElementsByTagName: S,
              } = i,
              { importNode: D } = a;
            let Y = {
              afterSanitizeAttributes: [],
              afterSanitizeElements: [],
              afterSanitizeShadowDOM: [],
              beforeSanitizeAttributes: [],
              beforeSanitizeElements: [],
              beforeSanitizeShadowDOM: [],
              uponSanitizeAttribute: [],
              uponSanitizeElement: [],
              uponSanitizeShadowNode: [],
            };
            n.isSupported =
              "function" == typeof pt &&
              "function" == typeof y &&
              A &&
              void 0 !== A.createHTMLDocument;
            const {
              MUSTACHE_EXPR: T,
              ERB_EXPR: F,
              TMPLIT_EXPR: _,
              DATA_ATTR: I,
              ARIA_ATTR: M,
              IS_SCRIPT_OR_DATA: N,
              ATTR_WHITESPACE: R,
              CUSTOM_ELEMENT: O,
            } = cn;
            let { IS_ALLOWED_URI: j } = cn,
              L = null;
            const z = Lt({}, [...Bt, ...Ht, ...qt, ...Vt, ...Kt]);
            let U = null;
            const P = Lt({}, [...Gt, ...Xt, ...Qt, ...Zt]);
            let B = Object.seal(
                xt(null, {
                  tagNameCheck: {
                    writable: !0,
                    configurable: !1,
                    enumerable: !0,
                    value: null,
                  },
                  attributeNameCheck: {
                    writable: !0,
                    configurable: !1,
                    enumerable: !0,
                    value: null,
                  },
                  allowCustomizedBuiltInElements: {
                    writable: !0,
                    configurable: !1,
                    enumerable: !0,
                    value: !1,
                  },
                })
              ),
              H = null,
              q = null;
            const $ = Object.seal(
              xt(null, {
                tagCheck: {
                  writable: !0,
                  configurable: !1,
                  enumerable: !0,
                  value: null,
                },
                attributeCheck: {
                  writable: !0,
                  configurable: !1,
                  enumerable: !0,
                  value: null,
                },
              })
            );
            let V = !0,
              W = !0,
              K = !1,
              G = !0,
              X = !1,
              Q = !0,
              Z = !1,
              J = !1,
              ee = !1,
              te = !1,
              ne = !1,
              ie = !1,
              ae = !0,
              oe = !1,
              re = !0,
              se = !1,
              le = {},
              de = null;
            const ce = Lt({}, [
              "annotation-xml",
              "audio",
              "colgroup",
              "desc",
              "foreignobject",
              "head",
              "iframe",
              "math",
              "mi",
              "mn",
              "mo",
              "ms",
              "mtext",
              "noembed",
              "noframes",
              "noscript",
              "plaintext",
              "script",
              "style",
              "svg",
              "template",
              "thead",
              "title",
              "video",
              "xmp",
            ]);
            let ue = null;
            const pe = Lt({}, [
              "audio",
              "video",
              "img",
              "source",
              "image",
              "track",
            ]);
            let fe = null;
            const me = Lt({}, [
                "alt",
                "class",
                "for",
                "id",
                "label",
                "name",
                "pattern",
                "placeholder",
                "role",
                "summary",
                "title",
                "value",
                "style",
                "xmlns",
              ]),
              he = "http://www.w3.org/1998/Math/MathML",
              ge = "http://www.w3.org/2000/svg",
              be = "http://www.w3.org/1999/xhtml";
            let ve = be,
              xe = !1,
              ye = null;
            const we = Lt({}, [he, ge, be], Yt);
            let ke = Lt({}, ["mi", "mo", "mn", "ms", "mtext"]),
              Ae = Lt({}, ["annotation-xml"]);
            const Ce = Lt({}, ["title", "style", "font", "a", "script"]);
            let Ee = null;
            const Se = ["application/xhtml+xml", "text/html"];
            let De = null,
              Ye = null;
            const Te = i.createElement("form"),
              Fe = function (e) {
                return e instanceof RegExp || e instanceof Function;
              },
              _e = function () {
                let e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                if (!Ye || Ye !== e) {
                  if (
                    ((e && "object" == typeof e) || (e = {}),
                    (e = Ut(e)),
                    (Ee =
                      -1 === Se.indexOf(e.PARSER_MEDIA_TYPE)
                        ? "text/html"
                        : e.PARSER_MEDIA_TYPE),
                    (De = "application/xhtml+xml" === Ee ? Yt : Dt),
                    (L = Mt(e, "ALLOWED_TAGS")
                      ? Lt({}, e.ALLOWED_TAGS, De)
                      : z),
                    (U = Mt(e, "ALLOWED_ATTR")
                      ? Lt({}, e.ALLOWED_ATTR, De)
                      : P),
                    (ye = Mt(e, "ALLOWED_NAMESPACES")
                      ? Lt({}, e.ALLOWED_NAMESPACES, Yt)
                      : we),
                    (fe = Mt(e, "ADD_URI_SAFE_ATTR")
                      ? Lt(Ut(me), e.ADD_URI_SAFE_ATTR, De)
                      : me),
                    (ue = Mt(e, "ADD_DATA_URI_TAGS")
                      ? Lt(Ut(pe), e.ADD_DATA_URI_TAGS, De)
                      : pe),
                    (de = Mt(e, "FORBID_CONTENTS")
                      ? Lt({}, e.FORBID_CONTENTS, De)
                      : ce),
                    (H = Mt(e, "FORBID_TAGS")
                      ? Lt({}, e.FORBID_TAGS, De)
                      : Ut({})),
                    (q = Mt(e, "FORBID_ATTR")
                      ? Lt({}, e.FORBID_ATTR, De)
                      : Ut({})),
                    (le = !!Mt(e, "USE_PROFILES") && e.USE_PROFILES),
                    (V = !1 !== e.ALLOW_ARIA_ATTR),
                    (W = !1 !== e.ALLOW_DATA_ATTR),
                    (K = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
                    (G = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR),
                    (X = e.SAFE_FOR_TEMPLATES || !1),
                    (Q = !1 !== e.SAFE_FOR_XML),
                    (Z = e.WHOLE_DOCUMENT || !1),
                    (te = e.RETURN_DOM || !1),
                    (ne = e.RETURN_DOM_FRAGMENT || !1),
                    (ie = e.RETURN_TRUSTED_TYPE || !1),
                    (ee = e.FORCE_BODY || !1),
                    (ae = !1 !== e.SANITIZE_DOM),
                    (oe = e.SANITIZE_NAMED_PROPS || !1),
                    (re = !1 !== e.KEEP_CONTENT),
                    (se = e.IN_PLACE || !1),
                    (j = e.ALLOWED_URI_REGEXP || on),
                    (ve = e.NAMESPACE || be),
                    (ke = e.MATHML_TEXT_INTEGRATION_POINTS || ke),
                    (Ae = e.HTML_INTEGRATION_POINTS || Ae),
                    (B = e.CUSTOM_ELEMENT_HANDLING || {}),
                    e.CUSTOM_ELEMENT_HANDLING &&
                      Fe(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
                      (B.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
                    e.CUSTOM_ELEMENT_HANDLING &&
                      Fe(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
                      (B.attributeNameCheck =
                        e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
                    e.CUSTOM_ELEMENT_HANDLING &&
                      "boolean" ==
                        typeof e.CUSTOM_ELEMENT_HANDLING
                          .allowCustomizedBuiltInElements &&
                      (B.allowCustomizedBuiltInElements =
                        e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
                    X && (W = !1),
                    ne && (te = !0),
                    le &&
                      ((L = Lt({}, Kt)),
                      (U = []),
                      !0 === le.html && (Lt(L, Bt), Lt(U, Gt)),
                      !0 === le.svg && (Lt(L, Ht), Lt(U, Xt), Lt(U, Zt)),
                      !0 === le.svgFilters && (Lt(L, qt), Lt(U, Xt), Lt(U, Zt)),
                      !0 === le.mathMl && (Lt(L, Vt), Lt(U, Qt), Lt(U, Zt))),
                    e.ADD_TAGS &&
                      ("function" == typeof e.ADD_TAGS
                        ? ($.tagCheck = e.ADD_TAGS)
                        : (L === z && (L = Ut(L)), Lt(L, e.ADD_TAGS, De))),
                    e.ADD_ATTR &&
                      ("function" == typeof e.ADD_ATTR
                        ? ($.attributeCheck = e.ADD_ATTR)
                        : (U === P && (U = Ut(U)), Lt(U, e.ADD_ATTR, De))),
                    e.ADD_URI_SAFE_ATTR && Lt(fe, e.ADD_URI_SAFE_ATTR, De),
                    e.FORBID_CONTENTS &&
                      (de === ce && (de = Ut(de)),
                      Lt(de, e.FORBID_CONTENTS, De)),
                    e.ADD_FORBID_CONTENTS &&
                      (de === ce && (de = Ut(de)),
                      Lt(de, e.ADD_FORBID_CONTENTS, De)),
                    re && (L["#text"] = !0),
                    Z && Lt(L, ["html", "head", "body"]),
                    L.table && (Lt(L, ["tbody"]), delete H.tbody),
                    e.TRUSTED_TYPES_POLICY)
                  ) {
                    if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML)
                      throw Rt(
                        'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
                      );
                    if (
                      "function" !=
                      typeof e.TRUSTED_TYPES_POLICY.createScriptURL
                    )
                      throw Rt(
                        'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
                      );
                    (w = e.TRUSTED_TYPES_POLICY), (k = w.createHTML(""));
                  } else
                    void 0 === w &&
                      (w = (function (e, t) {
                        if (
                          "object" != typeof e ||
                          "function" != typeof e.createPolicy
                        )
                          return null;
                        let n = null;
                        const i = "data-tt-policy-suffix";
                        t && t.hasAttribute(i) && (n = t.getAttribute(i));
                        const a = "dompurify" + (n ? "#" + n : "");
                        try {
                          return e.createPolicy(a, {
                            createHTML(e) {
                              return e;
                            },
                            createScriptURL(e) {
                              return e;
                            },
                          });
                        } catch (e) {
                          return (
                            console.warn(
                              "TrustedTypes policy " +
                                a +
                                " could not be created."
                            ),
                            null
                          );
                        }
                      })(m, o)),
                      null !== w &&
                        "string" == typeof k &&
                        (k = w.createHTML(""));
                  bt && bt(e), (Ye = e);
                }
              },
              Ie = Lt({}, [...Ht, ...qt, ...$t]),
              Me = Lt({}, [...Vt, ...Wt]),
              Ne = function (e) {
                Et(n.removed, { element: e });
                try {
                  y(e).removeChild(e);
                } catch (t) {
                  b(e);
                }
              },
              Re = function (e, t) {
                try {
                  Et(n.removed, { attribute: t.getAttributeNode(e), from: t });
                } catch (e) {
                  Et(n.removed, { attribute: null, from: t });
                }
                if ((t.removeAttribute(e), "is" === e))
                  if (te || ne)
                    try {
                      Ne(t);
                    } catch (e) {}
                  else
                    try {
                      t.setAttribute(e, "");
                    } catch (e) {}
              },
              Oe = function (e) {
                let t = null,
                  n = null;
                if (ee) e = "<remove></remove>" + e;
                else {
                  const t = Tt(e, /^[\r\n\t ]+/);
                  n = t && t[0];
                }
                "application/xhtml+xml" === Ee &&
                  ve === be &&
                  (e =
                    '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
                    e +
                    "</body></html>");
                const a = w ? w.createHTML(e) : e;
                if (ve === be)
                  try {
                    t = new f().parseFromString(a, Ee);
                  } catch (e) {}
                if (!t || !t.documentElement) {
                  t = A.createDocument(ve, "template", null);
                  try {
                    t.documentElement.innerHTML = xe ? k : a;
                  } catch (e) {}
                }
                const o = t.body || t.documentElement;
                return (
                  e &&
                    n &&
                    o.insertBefore(
                      i.createTextNode(n),
                      o.childNodes[0] || null
                    ),
                  ve === be
                    ? S.call(t, Z ? "html" : "body")[0]
                    : Z
                    ? t.documentElement
                    : o
                );
              },
              je = function (e) {
                return C.call(
                  e.ownerDocument || e,
                  e,
                  c.SHOW_ELEMENT |
                    c.SHOW_COMMENT |
                    c.SHOW_TEXT |
                    c.SHOW_PROCESSING_INSTRUCTION |
                    c.SHOW_CDATA_SECTION,
                  null
                );
              },
              Le = function (e) {
                return (
                  e instanceof p &&
                  ("string" != typeof e.nodeName ||
                    "string" != typeof e.textContent ||
                    "function" != typeof e.removeChild ||
                    !(e.attributes instanceof u) ||
                    "function" != typeof e.removeAttribute ||
                    "function" != typeof e.setAttribute ||
                    "string" != typeof e.namespaceURI ||
                    "function" != typeof e.insertBefore ||
                    "function" != typeof e.hasChildNodes)
                );
              },
              ze = function (e) {
                return "function" == typeof l && e instanceof l;
              };
            function Ue(e, t, i) {
              kt(e, (e) => {
                e.call(n, t, i, Ye);
              });
            }
            const Pe = function (e) {
                let t = null;
                if ((Ue(Y.beforeSanitizeElements, e, null), Le(e)))
                  return Ne(e), !0;
                const i = De(e.nodeName);
                if (
                  (Ue(Y.uponSanitizeElement, e, { tagName: i, allowedTags: L }),
                  Q &&
                    e.hasChildNodes() &&
                    !ze(e.firstElementChild) &&
                    Nt(/<[/\w!]/g, e.innerHTML) &&
                    Nt(/<[/\w!]/g, e.textContent))
                )
                  return Ne(e), !0;
                if (e.nodeType === fn) return Ne(e), !0;
                if (Q && e.nodeType === mn && Nt(/<[/\w]/g, e.data))
                  return Ne(e), !0;
                if (
                  !($.tagCheck instanceof Function && $.tagCheck(i)) &&
                  (!L[i] || H[i])
                ) {
                  if (!H[i] && He(i)) {
                    if (
                      B.tagNameCheck instanceof RegExp &&
                      Nt(B.tagNameCheck, i)
                    )
                      return !1;
                    if (B.tagNameCheck instanceof Function && B.tagNameCheck(i))
                      return !1;
                  }
                  if (re && !de[i]) {
                    const t = y(e) || e.parentNode,
                      n = x(e) || e.childNodes;
                    if (n && t) {
                      for (let i = n.length - 1; i >= 0; --i) {
                        const a = g(n[i], !0);
                        (a.__removalCount = (e.__removalCount || 0) + 1),
                          t.insertBefore(a, v(e));
                      }
                    }
                  }
                  return Ne(e), !0;
                }
                return e instanceof d &&
                  !(function (e) {
                    let t = y(e);
                    (t && t.tagName) ||
                      (t = { namespaceURI: ve, tagName: "template" });
                    const n = Dt(e.tagName),
                      i = Dt(t.tagName);
                    return (
                      !!ye[e.namespaceURI] &&
                      (e.namespaceURI === ge
                        ? t.namespaceURI === be
                          ? "svg" === n
                          : t.namespaceURI === he
                          ? "svg" === n && ("annotation-xml" === i || ke[i])
                          : Boolean(Ie[n])
                        : e.namespaceURI === he
                        ? t.namespaceURI === be
                          ? "math" === n
                          : t.namespaceURI === ge
                          ? "math" === n && Ae[i]
                          : Boolean(Me[n])
                        : e.namespaceURI === be
                        ? !(t.namespaceURI === ge && !Ae[i]) &&
                          !(t.namespaceURI === he && !ke[i]) &&
                          !Me[n] &&
                          (Ce[n] || !Ie[n])
                        : !(
                            "application/xhtml+xml" !== Ee ||
                            !ye[e.namespaceURI]
                          ))
                    );
                  })(e)
                  ? (Ne(e), !0)
                  : ("noscript" !== i && "noembed" !== i && "noframes" !== i) ||
                    !Nt(/<\/no(script|embed|frames)/i, e.innerHTML)
                  ? (X &&
                      e.nodeType === pn &&
                      ((t = e.textContent),
                      kt([T, F, _], (e) => {
                        t = Ft(t, e, " ");
                      }),
                      e.textContent !== t &&
                        (Et(n.removed, { element: e.cloneNode() }),
                        (e.textContent = t))),
                    Ue(Y.afterSanitizeElements, e, null),
                    !1)
                  : (Ne(e), !0);
              },
              Be = function (e, t, n) {
                if (ae && ("id" === t || "name" === t) && (n in i || n in Te))
                  return !1;
                if (W && !q[t] && Nt(I, t));
                else if (V && Nt(M, t));
                else if (
                  $.attributeCheck instanceof Function &&
                  $.attributeCheck(t, e)
                );
                else if (!U[t] || q[t]) {
                  if (
                    !(
                      (He(e) &&
                        ((B.tagNameCheck instanceof RegExp &&
                          Nt(B.tagNameCheck, e)) ||
                          (B.tagNameCheck instanceof Function &&
                            B.tagNameCheck(e))) &&
                        ((B.attributeNameCheck instanceof RegExp &&
                          Nt(B.attributeNameCheck, t)) ||
                          (B.attributeNameCheck instanceof Function &&
                            B.attributeNameCheck(t, e)))) ||
                      ("is" === t &&
                        B.allowCustomizedBuiltInElements &&
                        ((B.tagNameCheck instanceof RegExp &&
                          Nt(B.tagNameCheck, n)) ||
                          (B.tagNameCheck instanceof Function &&
                            B.tagNameCheck(n))))
                    )
                  )
                    return !1;
                } else if (fe[t]);
                else if (Nt(j, Ft(n, R, "")));
                else if (
                  ("src" !== t && "xlink:href" !== t && "href" !== t) ||
                  "script" === e ||
                  0 !== _t(n, "data:") ||
                  !ue[e]
                ) {
                  if (K && !Nt(N, Ft(n, R, "")));
                  else if (n) return !1;
                } else;
                return !0;
              },
              He = function (e) {
                return "annotation-xml" !== e && Tt(e, O);
              },
              qe = function (e) {
                Ue(Y.beforeSanitizeAttributes, e, null);
                const { attributes: t } = e;
                if (!t || Le(e)) return;
                const i = {
                  attrName: "",
                  attrValue: "",
                  keepAttr: !0,
                  allowedAttributes: U,
                  forceKeepAttr: void 0,
                };
                let a = t.length;
                for (; a--; ) {
                  const o = t[a],
                    { name: r, namespaceURI: s, value: l } = o,
                    d = De(r),
                    c = l;
                  let u = "value" === r ? c : It(c);
                  if (
                    ((i.attrName = d),
                    (i.attrValue = u),
                    (i.keepAttr = !0),
                    (i.forceKeepAttr = void 0),
                    Ue(Y.uponSanitizeAttribute, e, i),
                    (u = i.attrValue),
                    !oe ||
                      ("id" !== d && "name" !== d) ||
                      (Re(r, e), (u = "user-content-" + u)),
                    Q && Nt(/((--!?|])>)|<\/(style|title|textarea)/i, u))
                  ) {
                    Re(r, e);
                    continue;
                  }
                  if ("attributename" === d && Tt(u, "href")) {
                    Re(r, e);
                    continue;
                  }
                  if (i.forceKeepAttr) continue;
                  if (!i.keepAttr) {
                    Re(r, e);
                    continue;
                  }
                  if (!G && Nt(/\/>/i, u)) {
                    Re(r, e);
                    continue;
                  }
                  X &&
                    kt([T, F, _], (e) => {
                      u = Ft(u, e, " ");
                    });
                  const p = De(e.nodeName);
                  if (Be(p, d, u)) {
                    if (
                      w &&
                      "object" == typeof m &&
                      "function" == typeof m.getAttributeType
                    )
                      if (s);
                      else
                        switch (m.getAttributeType(p, d)) {
                          case "TrustedHTML":
                            u = w.createHTML(u);
                            break;
                          case "TrustedScriptURL":
                            u = w.createScriptURL(u);
                        }
                    if (u !== c)
                      try {
                        s ? e.setAttributeNS(s, r, u) : e.setAttribute(r, u),
                          Le(e) ? Ne(e) : Ct(n.removed);
                      } catch (t) {
                        Re(r, e);
                      }
                  } else Re(r, e);
                }
                Ue(Y.afterSanitizeAttributes, e, null);
              },
              $e = function e(t) {
                let n = null;
                const i = je(t);
                for (
                  Ue(Y.beforeSanitizeShadowDOM, t, null);
                  (n = i.nextNode());

                )
                  Ue(Y.uponSanitizeShadowNode, n, null),
                    Pe(n),
                    qe(n),
                    n.content instanceof r && e(n.content);
                Ue(Y.afterSanitizeShadowDOM, t, null);
              };
            return (
              (n.sanitize = function (e) {
                let t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  i = null,
                  o = null,
                  s = null,
                  d = null;
                if (
                  ((xe = !e),
                  xe && (e = "\x3c!--\x3e"),
                  "string" != typeof e && !ze(e))
                ) {
                  if ("function" != typeof e.toString)
                    throw Rt("toString is not a function");
                  if ("string" != typeof (e = e.toString()))
                    throw Rt("dirty is not a string, aborting");
                }
                if (!n.isSupported) return e;
                if (
                  (J || _e(t),
                  (n.removed = []),
                  "string" == typeof e && (se = !1),
                  se)
                ) {
                  if (e.nodeName) {
                    const t = De(e.nodeName);
                    if (!L[t] || H[t])
                      throw Rt(
                        "root node is forbidden and cannot be sanitized in-place"
                      );
                  }
                } else if (e instanceof l)
                  (i = Oe("\x3c!----\x3e")),
                    (o = i.ownerDocument.importNode(e, !0)),
                    (o.nodeType === un && "BODY" === o.nodeName) ||
                    "HTML" === o.nodeName
                      ? (i = o)
                      : i.appendChild(o);
                else {
                  if (!te && !X && !Z && -1 === e.indexOf("<"))
                    return w && ie ? w.createHTML(e) : e;
                  if (((i = Oe(e)), !i)) return te ? null : ie ? k : "";
                }
                i && ee && Ne(i.firstChild);
                const c = je(se ? e : i);
                for (; (s = c.nextNode()); )
                  Pe(s), qe(s), s.content instanceof r && $e(s.content);
                if (se) return e;
                if (te) {
                  if (ne)
                    for (d = E.call(i.ownerDocument); i.firstChild; )
                      d.appendChild(i.firstChild);
                  else d = i;
                  return (
                    (U.shadowroot || U.shadowrootmode) &&
                      (d = D.call(a, d, !0)),
                    d
                  );
                }
                let u = Z ? i.outerHTML : i.innerHTML;
                return (
                  Z &&
                    L["!doctype"] &&
                    i.ownerDocument &&
                    i.ownerDocument.doctype &&
                    i.ownerDocument.doctype.name &&
                    Nt(ln, i.ownerDocument.doctype.name) &&
                    (u =
                      "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + u),
                  X &&
                    kt([T, F, _], (e) => {
                      u = Ft(u, e, " ");
                    }),
                  w && ie ? w.createHTML(u) : u
                );
              }),
              (n.setConfig = function () {
                _e(
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {}
                ),
                  (J = !0);
              }),
              (n.clearConfig = function () {
                (Ye = null), (J = !1);
              }),
              (n.isValidAttribute = function (e, t, n) {
                Ye || _e({});
                const i = De(e),
                  a = De(t);
                return Be(i, a, n);
              }),
              (n.addHook = function (e, t) {
                "function" == typeof t && Et(Y[e], t);
              }),
              (n.removeHook = function (e, t) {
                if (void 0 !== t) {
                  const n = At(Y[e], t);
                  return -1 === n ? void 0 : St(Y[e], n, 1)[0];
                }
                return Ct(Y[e]);
              }),
              (n.removeHooks = function (e) {
                Y[e] = [];
              }),
              (n.removeAllHooks = function () {
                Y = {
                  afterSanitizeAttributes: [],
                  afterSanitizeElements: [],
                  afterSanitizeShadowDOM: [],
                  beforeSanitizeAttributes: [],
                  beforeSanitizeElements: [],
                  beforeSanitizeShadowDOM: [],
                  uponSanitizeAttribute: [],
                  uponSanitizeElement: [],
                  uponSanitizeShadowNode: [],
                };
              }),
              n
            );
          })(),
          vn = (function () {
            var e = {
                base: "https://twemoji.maxcdn.com/v/13.1.1/",
                ext: ".png",
                size: "72x72",
                className: "emoji",
                convert: {
                  fromCodePoint: function (e) {
                    var t = "string" == typeof e ? parseInt(e, 16) : e;
                    if (t < 65536) return s(t);
                    return s(55296 + ((t -= 65536) >> 10), 56320 + (1023 & t));
                  },
                  toCodePoint: v,
                },
                onerror: function () {
                  this.parentNode &&
                    this.parentNode.replaceChild(l(this.alt, !1), this);
                },
                parse: function (t, n) {
                  (n && "function" != typeof n) || (n = { callback: n });
                  return ("string" == typeof t ? m : f)(t, {
                    callback: n.callback || c,
                    attributes:
                      "function" == typeof n.attributes ? n.attributes : g,
                    base: "string" == typeof n.base ? n.base : e.base,
                    ext: n.ext || e.ext,
                    size:
                      n.folder ||
                      ((i = n.size || e.size),
                      "number" == typeof i ? i + "x" + i : i),
                    className: n.className || e.className,
                    onerror: n.onerror || e.onerror,
                  });
                  var i;
                },
                replace: b,
                test: function (e) {
                  n.lastIndex = 0;
                  var t = n.test(e);
                  return (n.lastIndex = 0), t;
                },
              },
              t = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;",
              },
              n =
                /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[\xa9\xae\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udeeb\udeec\udef4-\udefc\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78\udd7a-\uddb4\uddb7\uddba\uddbc-\uddcb\uddd0\uddde-\uddff\ude70-\ude74\ude78-\ude7a\ude80-\ude86\ude90-\udea8\udeb0-\udeb6\udec0-\udec2\uded0-\uded6]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
              i = /\uFE0F/g,
              a = String.fromCharCode(8205),
              o = /[&<>'"]/g,
              r = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,
              s = String.fromCharCode;
            return e;
            function l(e, t) {
              return document.createTextNode(t ? e.replace(i, "") : e);
            }
            function d(e) {
              return e.replace(o, h);
            }
            function c(e, t) {
              return "".concat(t.base, t.size, "/", e, t.ext);
            }
            function u(e, t) {
              for (var n, i, a = e.childNodes, o = a.length; o--; )
                3 === (i = (n = a[o]).nodeType)
                  ? t.push(n)
                  : 1 !== i ||
                    "ownerSVGElement" in n ||
                    r.test(n.nodeName.toLowerCase()) ||
                    u(n, t);
              return t;
            }
            function p(e) {
              return v(e.indexOf(a) < 0 ? e.replace(i, "") : e);
            }
            function f(e, t) {
              for (
                var i,
                  a,
                  o,
                  r,
                  s,
                  d,
                  c,
                  f,
                  m,
                  h,
                  g,
                  b,
                  v,
                  x = u(e, []),
                  y = x.length;
                y--;

              ) {
                for (
                  o = !1,
                    r = document.createDocumentFragment(),
                    d = (s = x[y]).nodeValue,
                    f = 0;
                  (c = n.exec(d));

                ) {
                  if (
                    ((m = c.index) !== f && r.appendChild(l(d.slice(f, m), !0)),
                    (b = p((g = c[0]))),
                    (f = m + g.length),
                    (v = t.callback(b, t)),
                    b && v)
                  ) {
                    for (a in (((h = new Image()).onerror = t.onerror),
                    h.setAttribute("draggable", "false"),
                    (i = t.attributes(g, b))))
                      i.hasOwnProperty(a) &&
                        0 !== a.indexOf("on") &&
                        !h.hasAttribute(a) &&
                        h.setAttribute(a, i[a]);
                    (h.className = t.className),
                      (h.alt = g),
                      (h.src = v),
                      (o = !0),
                      r.appendChild(h);
                  }
                  h || r.appendChild(l(g, !1)), (h = null);
                }
                o &&
                  (f < d.length && r.appendChild(l(d.slice(f), !0)),
                  s.parentNode.replaceChild(r, s));
              }
              return e;
            }
            function m(e, t) {
              return b(e, function (e) {
                var n,
                  i,
                  a = e,
                  o = p(e),
                  r = t.callback(o, t);
                if (o && r) {
                  for (i in ((a = "<img ".concat(
                    'class="',
                    t.className,
                    '" ',
                    'draggable="false" ',
                    'alt="',
                    e,
                    '"',
                    ' src="',
                    r,
                    '"'
                  )),
                  (n = t.attributes(e, o))))
                    n.hasOwnProperty(i) &&
                      0 !== i.indexOf("on") &&
                      -1 === a.indexOf(" " + i + "=") &&
                      (a = a.concat(" ", i, '="', d(n[i]), '"'));
                  a = a.concat("/>");
                }
                return a;
              });
            }
            function h(e) {
              return t[e];
            }
            function g() {
              return null;
            }
            function b(e, t) {
              return String(e).replace(n, t);
            }
            function v(e, t) {
              for (var n = [], i = 0, a = 0, o = 0; o < e.length; )
                (i = e.charCodeAt(o++)),
                  a
                    ? (n.push(
                        (65536 + ((a - 55296) << 10) + (i - 56320)).toString(16)
                      ),
                      (a = 0))
                    : 55296 <= i && i <= 56319
                    ? (a = i)
                    : n.push(i.toString(16));
              return n.join(t || "-");
            }
          })(),
          xn = vn;
        const yn = {
            ALLOWED_TAGS: ["img"],
            ALLOWED_ATTR: ["class", "src", "alt"],
          },
          wn = {
            ALLOWED_TAGS: ["img", "a", "strong", "br", "ol", "ul", "li"],
            ALLOWED_ATTR: ["class", "href", "target", "src", "alt", "rel"],
          },
          kn = {
            ALLOWED_TAGS: ["img", "a"],
            ALLOWED_ATTR: ["class", "href", "target", "src", "alt"],
          },
          An = (e) => e.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
          Cn = {
            base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/",
          },
          En = (e) => {
            let t = e.replace(
              /((?:href|src)=['"])?(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;()$'[\]*]*[-A-Z0-9+&@#/%=~_|])/gim,
              (e, t) =>
                void 0 !== t
                  ? e
                  : `<a href="${e}" target="_blank" rel="noopener noreferrer">${e}</a>`
            );
            return (
              (t = t.replace(
                /(^|\s|strong>|li>)(([a-zA-Z0-9-_.+])+@[a-zA-Z0-9_]+?(\.[a-zA-Z]{2,})+)/gim,
                '$1<a href="mailto:$2" target="_blank" rel="noopener noreferrer">$2</a>'
              )),
              (t = t.replace(
                /(^|\s|strong>|li>)(www\.[-\w.,@?^=%&:/]+(\b|$))/gim,
                '$1<a href="http://$2" target="_blank" rel="noopener noreferrer">$2</a>'
              )),
              t
            );
          },
          Sn = (e) => {
            if ("string" != typeof e) return "";
            let t = An(e);
            return (
              (t = En(t)),
              (t = xn.parse(t, Cn)),
              (t = ((e) => bn.sanitize(e, kn))(t)),
              t
            );
          },
          Dn = (e) => {
            if ("string" != typeof e) return "";
            let t = An(e);
            t = t.replace(/\t/g, "");
            t = t.replace(
              /!\[([^\]]*)\]\(([^)]+)\)/g,
              '<img src="$2" alt="$1" class="markdown-image" />'
            );
            return (
              (t = t.replace(
                /\[([^\]]*)\]\(([^)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
              )),
              (t = t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")),
              (t = xn.parse(t, Cn)),
              (t = En(t)),
              (t = bn.sanitize(t, wn)),
              t
            );
          },
          Yn = (e) => {
            if ("string" != typeof e) return "";
            let t = An(e);
            return (t = xn.parse(t, Cn)), (t = bn.sanitize(t, yn)), t;
          },
          Tn = (e) => {
            const t = e.values.reduce(
              (e, t) => ({ ...e, [t]: (0, y.pw)(t) }),
              {}
            );
            return e.render(t);
          };
        Tn.propTypes = {
          values: G().arrayOf(G().string).isRequired,
          render: G().func.isRequired,
        };
        const Fn = (e) => {
          const {
              value: t,
              children: n,
              replacements: i,
              fallback: o,
              linkify: r,
              emojify: s,
              markdownify: l,
            } = e,
            [, d] = (0, a.useState)(0),
            c = () => {
              d((e) => !e);
            };
          return (
            (0, a.useEffect)(
              () => (
                y.DR.on("translationsChanged", c),
                () => {
                  y.DR.off("translationsChanged", c);
                }
              ),
              []
            ),
            n
              ? (0, $.Y)(Tn, { values: t, render: n })
              : i
              ? (0, $.Y)($.FK, { children: (0, y.pw)(t, i, o) })
              : l
              ? (0, $.Y)("span", {
                  dangerouslySetInnerHTML: {
                    __html: Dn((0, y.pw)(t, null, o)),
                  },
                })
              : r || s
              ? (0, $.Y)("span", {
                  dangerouslySetInnerHTML: {
                    __html: Sn((0, y.pw)(t, null, o)),
                  },
                })
              : (0, $.Y)($.FK, { children: (0, y.pw)(t, null, o) })
          );
        };
        Fn.defaultProps = {
          fallback: null,
          replacements: null,
          emojify: !1,
          linkify: !1,
          markdownify: !1,
          children: void 0,
        };
        var _n = Fn;
        const In = ut(!0),
          Mn = (0, d.AH)(
            { input: In.text14, textarea: In.text14, svg: { top: 6 } },
            "",
            ""
          );
        function Nn(e, t, n) {
          return n
            ? n(e)
            : "email" === t
            ? (0, f.B9)(e)
            : "tel" === t
            ? (0, f.lK)(e)
            : "" !== e.trim();
        }
        class Rn extends a.Component {
          constructor(e) {
            super(e),
              (0, i.A)(this, "onChange", (e) => {
                const { value: t, checked: n, type: i } = e.target,
                  a = "checkbox" !== i ? t : n,
                  o = Nn(a, this.props.type, this.props.validator);
                this.setState({ value: a, isValid: o }),
                  this.props.onChange && this.props.onChange(a, o),
                  this.props.isValidCallback && this.props.isValidCallback(o);
              }),
              (0, i.A)(this, "onKeyDown", (e) => {
                const { keyCode: t } = e,
                  n = 13 === t;
                return (
                  n &&
                    !this.state.isValid &&
                    (this.setState({ showErrorIcon: !0 }),
                    this.props.onKeyDown && this.props.onKeyDown(!1),
                    clearTimeout(this.errorIconHideTimer),
                    (this.errorIconHideTimer = null),
                    (this.errorIconHideTimer = setTimeout(() => {
                      this.setState({ showErrorIcon: !1 });
                    }, 820))),
                  !(!n || !this.state.isValid) &&
                    (e.preventDefault(),
                    this.props.onKeyDown && this.props.onKeyDown(t),
                    !0)
                );
              }),
              (0, i.A)(this, "onFocus", () => {
                this.props.onFocus && this.props.onFocus(),
                  this.props.shouldToggleHeader &&
                    !this.props.disabled &&
                    this.isMobile &&
                    this.props.dispatch((0, k.E3S)(!0));
              }),
              (0, i.A)(this, "onBlur", () => {
                this.props.onBlur && this.props.onBlur(),
                  this.props.shouldToggleHeader &&
                    !this.props.disabled &&
                    this.isMobile &&
                    setTimeout(() => {
                      this.props.dispatch((0, k.E3S)(!1));
                    }, 100);
              }),
              (0, i.A)(this, "getError", () =>
                void 0 === this.props.forceErrorIcon
                  ? this.state.showErrorIcon
                  : this.props.forceErrorIcon
              );
            const t = null === e.value ? "" : e.value;
            (this.state = {
              value: t,
              isValid: Nn(t, e.type, e.validator),
              showErrorIcon: !1,
            }),
              (this.isMobile = this.props.isMobile),
              (this.errorIconHideTimer = null);
          }
          componentDidMount() {
            const { isValid: e } = this.state;
            this.state.isValid &&
              (this.props.onChange && this.props.onChange(this.state.value, e),
              this.props.isValidCallback && this.props.isValidCallback(e));
          }
          render() {
            let e = null;
            return (
              (e =
                "checkbox" !== this.props.type
                  ? (0, $.Y)(_n, {
                      value: [this.props.placeholder],
                      children: (e) =>
                        "textarea" === this.props.type
                          ? (0, $.Y)("textarea", {
                              placeholder: e[this.props.placeholder],
                              onChange: this.onChange,
                              onKeyDown: this.onKeyDown,
                              value: this.state.value,
                              readOnly: this.props.disabled,
                              className: this.props.disabled ? "disabled" : "",
                              ref: this.props.bindInputRef,
                              onFocus: this.onFocus,
                              onBlur: this.onBlur,
                            })
                          : (0, $.Y)("input", {
                              type: this.props.type,
                              placeholder: e[this.props.placeholder],
                              onChange: this.onChange,
                              onKeyDown: this.onKeyDown,
                              value: this.state.value,
                              readOnly: this.props.disabled,
                              className: this.props.disabled ? "disabled" : "",
                              ref: this.props.bindInputRef,
                              onFocus: this.onFocus,
                              onBlur: this.onBlur,
                            }),
                    })
                  : (0, $.FD)("label", {
                      htmlFor: this.props.id,
                      children: [
                        (0, $.Y)("input", {
                          id: this.props.id,
                          type: this.props.type,
                          onChange: this.onChange,
                          checked: this.state.value,
                          disabled: this.props.disabled,
                          className: this.props.disabled ? "disabled" : "",
                          ref: this.props.bindInputRef,
                        }),
                        (0, $.Y)(_n, {
                          value: this.props.placeholder,
                          linkify: !0,
                        }),
                      ],
                    })),
              (0, $.Y)("div", {
                className: `field-wrapper ${this.props.shakeClassName} ${
                  this.getError() ? "field-wrapper-with-error" : ""
                }`,
                css: this.props.isNewSkin ? Mn : void 0,
                children: e,
              })
            );
          }
        }
        Rn.defaultProps = {
          placeholder: "",
          bindInputRef: void 0,
          onChange: void 0,
          onKeyDown: null,
          disabled: !1,
          isValidCallback: null,
          value: null,
          forceErrorIcon: !1,
          id: void 0,
          validator: void 0,
          shouldToggleHeader: !0,
          onFocus: void 0,
          onBlur: void 0,
          shakeClassName: "",
          isNewSkin: !1,
          isMobile: !1,
        };
        var On = (e) => {
          const t = (0, r.wA)(),
            n = (0, r.d4)(C.Ny),
            { isNewSkin: i } = (0, p.A)();
          return (0, $.Y)(Rn, { ...e, dispatch: t, isNewSkin: i, isMobile: n });
        };
        const jn = {
            name: "1a050gg",
            styles:
              "position:absolute;left:0;right:0;top:0;bottom:0;background:rgb(0, 0, 0, 0.5);z-index:10",
          },
          Ln = {
            name: "n8zy5f",
            styles:
              "position:absolute;bottom:0;left:8px;right:8px;width:calc(100% - 16px);max-height:calc(100% - 8px);background:#fff;display:flex;justify-content:center;align-items:center;padding:32px 20px;.mobile &{padding:20px 16px;}background:#fff;border-top-left-radius:12px;border-top-right-radius:12px;.pre-chat,.always-online{max-width:100%;width:100%;}form{display:flex;flex-direction:column;row-gap:20px;max-height:465px;}.user-data-modal-fields{margin-inline:-20px;padding-inline:20px;flex-shrink:1;overflow-y:auto;.mobile &{margin-inline:-16px;padding-inline:16px;}&>*+*{margin-top:12px;}#ic_arrow{fill:var(--custom-action-color, #0566ff);}svg{width:24px;height:24px;}input,textarea{border:solid 1px rgba(108, 125, 159, 0.24);font-size:15px;padding:12px 16px;line-height:normal;margin:0;&[type='checkbox']{border-radius:4px;padding:8px;}}label{display:flex;align-items:flex-start;gap:8px;padding:0 0 0 2px;margin:0;input{min-width:16px;min-height:18px;}&.small-text{padding-top:0;span{font-size:12px;line-height:16px;}}span{font-size:14px;line-height:18px;text-align:justify;color:#00122e;display:block;a{color:#00122e;}}}}.emoji{margin:0;}",
          },
          zn = {
            name: "x9tq60",
            styles:
              "position:absolute;right:20px;top:20px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;z-index:2;svg{fill:#6d7e9e;width:20px;height:20px;}",
          },
          Un = {
            name: "5d7z6j",
            styles:
              "font-size:20px;font-weight:600;text-align:left;color:#00122e",
          };
        const Pn = {
          name: "zgzsit",
          styles:
            "flex-shrink:0;width:100%;height:40px;font-size:16px;font-weight:600;border-radius:var(--radius-component, 6px);background:var(--custom-action-color);color:var(--custom-action-color-contrast);position:relative;&::after{transition:background 0.2s;content:'';border-radius:6px;background:rgba(0, 0, 0, 0);left:0;top:0;position:absolute;width:100%;height:100%;}&:hover{&::after{background:rgba(0, 0, 0, 0.08);}}",
        };
        var Bn = () =>
          (0, $.Y)("button", {
            css: Pn,
            type: "submit",
            children: (0, $.Y)(_n, { value: "offlineSendButton" }),
          });
        n(7450);
        const Hn = (e, t, n) => {
            const i = t ? { width: t, height: t } : {};
            return (
              e &&
                ((i.backgroundImage = `url(${(0, f.vs)(e)})`),
                n &&
                  ((i.borderRadius = "4px"),
                  (i.backgroundColor = "var(--custom-background)"))),
              i
            );
          },
          qn = (e) => {
            let {
              avatarSrc: t,
              className: n,
              size: i,
              withBackgroundColor: a,
            } = e;
            return (0, $.Y)("div", {
              "data-testid": "operator",
              className: n || void 0,
              style: Hn(t, i, a),
            });
          };
        var $n = a.memo(qn),
          Vn =
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/CABEIADwAPAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgn/2gAIAQEAAAAA+lYAj8cy5ndHO8VNN0IFrk62gjEYudH9iLQPN6lec+0VmtG038L9UpWh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAhAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMQAAAAAAD/xAAuEAABAwMACAUEAwAAAAAAAAABAgMEAAURBhASEyAhQVEiMmKRwSNxcoExQqH/2gAIAQEAAT8A14PHdbuuMvcMY2wPGs88Z6ClT5qzlUh0n8qjXmawoFay8jqlfwaZebkNIdbOUrGRwCpxJmySf53qtdgJNu+zq+G7N7u4yPUoK9xrsyC3bWfUVL9zw6QxiS1IA5Y2F/Gpplb7qGkeZasCkNpabQhPlQkJH64CMDJ5DvWkk+Gu3uRm3wp5ak42Dkp2TnJNC4S2hhyPvT0Wg4z9xVqmuN3SNJl/TabUcITzxkY2j3piRHkjLLrbg9Ks1gjVL0nnvLVuAllHTllf7Jp+VKknLz7jn5K+KAAGNY8JykkHuDg0xe7rG5JkqUB/VY2x/tR9LkBvEmMsud2/KfeumrtXSu9dKFZNf//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AB//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AB//Z";
        const Wn = {
            name: "yp9oaf",
            styles: "text-align:left;white-space:nowrap;margin-bottom:20px",
          },
          Kn = (0, d.AH)(
            "width:48px;height:48px;border-radius:24px;background-size:cover;background-position:center;display:inline-block;background-image:url(",
            Vn,
            ");border:solid 1px #fff;&:not(:first-child){margin-left:-12px;}",
            ""
          );
        var Gn = () => {
          const { isNewSkin: e } = (0, p.A)(),
            t = (0, r.d4)(C.Ld),
            n = (0, r.d4)(C.mm);
          if (t)
            return (0, $.Y)("div", {
              css: Wn,
              children: (0, $.Y)(
                $n,
                { avatarSrc: t, css: Kn, withBackgroundColor: e },
                1
              ),
            });
          const i = n.find((e) => e.isOnline) ? n.filter((e) => e.isOnline) : n;
          return (0, $.Y)("div", {
            css: Wn,
            children: i
              .slice(0, 4)
              .map((e) =>
                (0, $.Y)($n, { avatarSrc: e.avatarSrc, css: Kn }, e.id)
              ),
          });
        };
        const Xn = (0, f.DD)();
        var Qn = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)(C.Ny),
            [n, i] = a.useState(""),
            [o, s] = a.useState(!1),
            [l, d] = a.useState(!1),
            { triggerShake: c, shakeClassName: u } = lt(),
            p = a.useRef(null);
          a.useEffect(() => {
            !p.current || Xn || t || p.current.focus();
          }, [t]);
          const f = (t) => (
            t && t.preventDefault(),
            o ? (e((0, k.kxl)(n)), !0) : (d(!0), c(), !1)
          );
          return (0, $.FD)("div", {
            className: "always-online",
            children: [
              (0, $.Y)(Gn, {}),
              (0, $.FD)("form", {
                onSubmit: f,
                children: [
                  (0, $.Y)("div", {
                    css: Un,
                    children: (0, $.Y)(_n, {
                      value: "alwaysOnlineEngageMessage",
                      emojify: !0,
                    }),
                  }),
                  (0, $.Y)("div", {
                    className: "user-data-modal-fields",
                    children: (0, $.Y)(On, {
                      type: "email",
                      placeholder: "preformInput_email",
                      onChange: (e, t) => {
                        i(e), s(t), d(!1);
                      },
                      onKeyDown: (e) => {
                        13 === e && f();
                      },
                      disabled: !1,
                      bindInputRef: p,
                      forceErrorIcon: l,
                      shakeClassName: u,
                    }),
                  }),
                  (0, $.Y)(Bn, {}),
                ],
              }),
            ],
          });
        };
        const Zn = (e, t) => e.trim().length >= t;
        var Jn = (e) => {
          let {
            value: t = "",
            placeholder: n = "",
            onChange: i,
            onKeyDown: o,
            disabled: r = !1,
            isValidCallback: s,
            forceErrorIcon: l = !1,
            onFocus: d,
            onBlur: c,
            shakeClassName: u = "",
            minLength: p = 1,
          } = e;
          const [f, m] = (0, a.useState)(t),
            [h, g] = (0, a.useState)(Zn(f, p)),
            [b, v] = (0, a.useState)(!1),
            x = (0, a.useRef)(),
            y = (e) => {
              const t = e.target.value,
                n = Zn(t, p);
              m(t), g(n), i && i(t, n), s && s(h);
            },
            w = (e) => {
              const { keyCode: t } = e,
                n = 13 === t;
              return (
                n &&
                  !h &&
                  (v(!0),
                  x.current && clearTimeout(x.current),
                  (x.current = setTimeout(() => {
                    v(!1);
                  }, 820))),
                !(!n || !h) && (e.preventDefault(), o && o(t), !0)
              );
            },
            k = () => {
              d && d();
            },
            A = () => {
              c && c();
            };
          return (0, $.Y)("div", {
            className: `field-wrapper ${u} ${
              (void 0 === l ? b : l) ? "field-wrapper-with-error" : ""
            }`,
            children: (0, $.Y)(_n, {
              value: [n],
              children: (e) =>
                (0, $.Y)("textarea", {
                  placeholder: e[n],
                  onChange: y,
                  onKeyDown: w,
                  value: f,
                  readOnly: r,
                  className: r ? "disabled" : "",
                  onFocus: k,
                  onBlur: A,
                  rows: 4,
                }),
            }),
          });
        };
        const ei = {
            name: "1igy1wb",
            styles:
              "position:absolute;inset:0;display:flex;flex-direction:column;row-gap:20px;align-items:center;justify-content:center;background:#fff;padding:32px 20px;border-top-left-radius:12px;border-top-right-radius:12px;svg{position:unset;width:48px;height:48px;}",
          },
          ti = (0, d.AH)(Un, "text-align:center;", "");
        var ni = () => {
            const e = (0, r.wA)(),
              t = (0, r.d4)(C.Ny),
              n = (0, r.d4)(C.he),
              [i] = (0, a.useState)(!n),
              [o, s] = (0, a.useState)(""),
              [l, d] = (0, a.useState)(!1),
              u = (0, r.d4)(C.gp),
              [p, f] = (0, a.useState)(u ?? ""),
              [m, h] = (0, a.useState)(p.length >= 3),
              [g, b] = (0, a.useState)(!1),
              [v, x] = (0, a.useState)(!1),
              { triggerShake: y, shakeClassName: w } = lt(),
              A = a.useRef();
            a.useEffect(() => {
              A.current && !t && A.current.focus();
            }, [t]);
            const E = (0, c.pn)(v, {
              from: { opacity: 0, transform: "scale(0.9)" },
              enter: { opacity: 1, transform: "scale(1)" },
              leave: { opacity: 0, transform: "scale(0.9)" },
              config: { tension: 300, friction: 30 },
            });
            return (0, $.FD)($.FK, {
              children: [
                (0, $.FD)("div", {
                  className: "always-online",
                  "data-testid": "createTicketModal",
                  children: [
                    (0, $.Y)(Gn, {}),
                    (0, $.FD)("form", {
                      onSubmit: function (t) {
                        return (
                          t && t.preventDefault(),
                          (n || l) && m
                            ? (e((0, k.rtR)(n || o, p)), x(!0), !0)
                            : (b(!0), y(), !1)
                        );
                      },
                      noValidate: !0,
                      children: [
                        (0, $.Y)("div", {
                          css: Un,
                          children: (0, $.Y)(_n, {
                            value: "alwaysOnlineEngageMessage",
                            emojify: !0,
                          }),
                        }),
                        (0, $.FD)("div", {
                          className: "user-data-modal-fields",
                          children: [
                            i &&
                              (0, $.Y)(On, {
                                type: "email",
                                placeholder: "preformInput_email",
                                onChange: (e, t) => {
                                  s(e), d(t), b(!1);
                                },
                                disabled: !1,
                                bindInputRef: A,
                                forceErrorIcon: !l && g,
                                shakeClassName: l ? "" : w,
                              }),
                            (0, $.Y)(Jn, {
                              value: p,
                              placeholder: "preformInput_firstmsg",
                              minLength: 3,
                              onChange: (e, t) => {
                                f(e), h(t), b(!1);
                              },
                              disabled: !1,
                              forceErrorIcon: !m && g,
                              shakeClassName: m ? "" : w,
                            }),
                          ],
                        }),
                        (0, $.Y)(Bn, {}),
                      ],
                    }),
                  ],
                }),
                E((e, t) =>
                  t
                    ? (0, $.FD)(c.CS.div, {
                        css: ei,
                        style: e,
                        children: [
                          (0, $.Y)(st.cQ, {}),
                          (0, $.Y)("div", {
                            css: ti,
                            children: (0, $.Y)(_n, {
                              value: "ticketSubmittedConfirmation",
                              emojify: !0,
                            }),
                          }),
                        ],
                      })
                    : null
                ),
              ],
            });
          },
          ii = (n(5469), n(1875)),
          ai = n(8687),
          oi = n(8706);
        const ri = {
            name: "1da22q6",
            styles:
              "position:relative;z-index:1;margin-bottom:8px;border:1px solid rgba(108, 125, 159, 0.24);border-radius:var(--radius-component, 5px)",
          },
          si = {
            name: "1oo9jfo",
            styles:
              "border-color:#f6303a;select{&:not(:focus):invalid{color:#f6303a;}}svg{fill:#f6303a;}",
          },
          li = {
            name: "1ayzuvd",
            styles: "border-color:#0566ff;svg{fill:#647491;}",
          },
          di = {
            name: "1t2iy9d",
            styles:
              'overflow:hidden;display:block;width:100%;padding:11px 40px 12px 16px;border:none;border-radius:0;outline:none;background:transparent;color:#080F1A;font-size:15px;appearance:none;white-space:nowrap;text-overflow:ellipsis;&:not(:focus):invalid{color:#8894ab;}option[value=""][disabled]{display:none;}',
          },
          ci = {
            name: "znmab8",
            styles:
              "position:absolute;top:0;bottom:0;right:8px;width:24px;height:24px;margin:auto;pointer-events:none;svg{top:auto;left:auto;fill:#647491;}",
          },
          ui = (0, f.DD)();
        var pi = (e) => {
          let { onChange: t, hasError: n, shakeClassName: i } = e;
          const o = (0, r.d4)(C.wY),
            [s, l] = (0, a.useState)(!1),
            [d, c] = (0, a.useState)("");
          if (!o.length) return null;
          const u = (0, y.pw)(
            "routingRules_selector",
            null,
            "Select Department..."
          );
          return (0, $.FD)("div", {
            css: [ri, n && si, s && li, "", ""],
            className: i,
            children: [
              (0, $.FD)("select", {
                css: di,
                value: d,
                required: !0,
                form: "novalidatedform",
                onFocus: () => {
                  l(!0);
                },
                onBlur: () => {
                  l(!1);
                },
                onChange: (e) => {
                  const n = e.target.value,
                    i = o.find((e) => e.position === Number(n))?.departmentId;
                  ui || c(n), t && i && t(i);
                },
                title: u,
                children: [
                  (0, $.Y)("option", { value: "", disabled: !0, children: u }),
                  o.map((e) => {
                    let { alias: t, position: n } = e;
                    return (0, $.Y)("option", { value: n, children: t }, n);
                  }),
                ],
              }),
              (0, $.Y)("div", { css: ci, children: (0, $.Y)(st.yd, {}) }),
            ],
          });
        };
        let fi = (function (e) {
          return (
            (e.EMAIL = "email"),
            (e.NAME = "name"),
            (e.PHONE = "phone"),
            (e.GDPR_CONSENT = "gdprConsent"),
            (e.SIGN_UP_NEWSLETTER = "signUpNewsletter"),
            (e.PRECHAT_FIELD_TYPE_EMAIL_CONSENT = "emailConsent"),
            e
          );
        })({});
        const mi = a.forwardRef((e, t) => {
          const {
              value: n,
              type: i,
              placeholder: o,
              forceErrorIcon: r = !1,
              disabled: s = !1,
              onKeyDown: l,
              onInputChange: d = () => {},
              shakeClassName: c = "",
            } = e,
            u = (0, a.useMemo)(
              () =>
                ((e) => {
                  switch (e) {
                    case fi.EMAIL:
                      return "email";
                    case fi.NAME:
                      return "text";
                    case fi.PHONE:
                      return "tel";
                    case fi.GDPR_CONSENT:
                    case fi.PRECHAT_FIELD_TYPE_EMAIL_CONSENT:
                    case fi.SIGN_UP_NEWSLETTER:
                      return "checkbox";
                    default:
                      return "";
                  }
                })(i),
              [i]
            ),
            p = (0, a.useMemo)(
              () =>
                ((e, t) => {
                  switch (e) {
                    case fi.PRECHAT_FIELD_TYPE_EMAIL_CONSENT:
                      return t && "object" == typeof t
                        ? {
                            validator: () => !0,
                            placeholder: "signUpNewsletter",
                            value: "subscribed" === t.value,
                          }
                        : {
                            validator: () => !0,
                            placeholder: "signUpNewsletter",
                          };
                    case fi.SIGN_UP_NEWSLETTER:
                      return {
                        validator: () => !0,
                        placeholder: "signUpNewsletter",
                      };
                    default:
                      return {};
                  }
                })(i, n),
              [i, n]
            );
          return u
            ? i === fi.GDPR_CONSENT
              ? (0, $.Y)("div", {
                  className: `field-wrapper ${c} ${
                    r ? "field-wrapper-with-error" : ""
                  }`,
                  children: (0, $.FD)("label", {
                    htmlFor: i,
                    className: "small-text",
                    children: [
                      (0, $.Y)("input", {
                        id: i,
                        type: u,
                        checked: Boolean(n),
                        onChange: (e) => {
                          d(e.target.checked, e.target.checked, i);
                        },
                        disabled: s,
                        className: s ? "disabled" : "",
                        ref: t,
                      }),
                      (0, $.Y)(_n, { value: o, linkify: !0, markdownify: !0 }),
                    ],
                  }),
                })
              : (0, $.Y)(On, {
                  id: i,
                  type: u,
                  onChange: (e, t) => {
                    d(e, t, i);
                  },
                  value: n,
                  disabled: s,
                  placeholder: o,
                  bindInputRef: t,
                  onKeyDown: l,
                  forceErrorIcon: r,
                  shakeClassName: c,
                  ...p,
                })
            : null;
        });
        var hi = mi;
        function gi(e) {
          const t = e;
          return (
            [ai.M0, "signUpNewsletter"].forEach((e) => {
              void 0 !== t[e] && (t[e] = Boolean(t[e]));
            }),
            "boolean" == typeof t[ai.M0] &&
              (t[ai.M0] = {
                value: t[ai.M0] ? "subscribed" : "unsubscribed",
                date: Math.round(Date.now() / 1e3),
                setBy: "user",
              }),
            t
          );
        }
        const bi = "SET_INPUT",
          vi = "SHOW_ERROR_ON_INVALID_FIELDS";
        function xi(e, t) {
          switch (t.type) {
            case bi: {
              const { fieldType: n, isValid: i, value: a } = t;
              return {
                ...e,
                inputValues: {
                  ...e.inputValues,
                  [n]: { isValid: i, value: a },
                },
                fieldsWithErrors: { ...e.fieldsWithErrors, [n]: !1 },
              };
            }
            case vi: {
              const t = Object.entries(e.inputValues)
                .filter((e) => {
                  let [, t] = e;
                  return !t.isValid;
                })
                .reduce((e, t) => {
                  let [n] = t;
                  return { ...e, [n]: !0 };
                }, {});
              return { ...e, fieldsWithErrors: t };
            }
            default:
              throw new Error();
          }
        }
        const yi = (e) => {
          const t =
              e.areDepartmentsEnabled && !e.isDepartmentSelected
                ? [...e.preChatFields, { type: ai.R6 }]
                : e.preChatFields,
            [n, i] = a.useReducer(xi, t, function (t) {
              const n = {};
              return (
                t.forEach((e) => {
                  n[e.type] = { isValid: !1, value: e.value ? e.value : "" };
                }),
                e.prechatSubscriptionCheckboxDefaultValue &&
                  n.emailConsent &&
                  !n.emailConsent.value &&
                  (n.emailConsent = { ...n.emailConsent, value: !0 }),
                { inputValues: n, fieldsWithErrors: {} }
              );
            }),
            { triggerShake: o, shakeClassName: r } = lt();
          const s = (e, t, n) => {
              i({ type: bi, fieldType: n, value: e, isValid: t });
            },
            l = (e) => {
              i({ type: bi, fieldType: ai.R6, value: e, isValid: !0 });
            },
            d = a.useRef();
          a.useEffect(() => {
            d.current && !e.isMobile && d.current.focus();
          }, [e.isMobile]),
            a.useEffect(() => {
              e.isDepartmentSelected && l(e.selectedDepartmentId);
            }, [e.isDepartmentSelected, e.selectedDepartmentId]);
          const c = a.useRef(!1);
          function u(t) {
            t && t.preventDefault();
            return Object.values(n.inputValues).every((e) => !0 === e.isValid)
              ? (e.dispatch(
                  (0, k.SrJ)(
                    (function (e) {
                      const t = {};
                      return (
                        Object.keys(e).forEach((n) => {
                          t[n] = e[n].value;
                        }),
                        !0 === t.signUpNewsletter && (t.emailConsent = !0),
                        gi(t)
                      );
                    })(n.inputValues)
                  )
                ),
                !0)
              : (o(), i({ type: vi }), !1);
          }
          a.useEffect(() => {
            if (!c.current) {
              const t = e.preChatFields.map((e) => e.type);
              (0, oi.s)().trackEvent({
                eventName: "tidio_prechat_started",
                params: {
                  email: t.includes("email"),
                  phone: t.includes("phone"),
                  name: t.includes("name"),
                  consent_given: t.includes("emailConsent"),
                },
              }),
                (c.current = !0);
            }
          }, [e.preChatFields]);
          const p = (e) => {
              13 === e && u();
            },
            f = (e, t) =>
              (0, $.Y)(
                hi,
                {
                  type: e.type,
                  placeholder: e.placeholder,
                  onInputChange: s,
                  disabled: !1,
                  onKeyDown: p,
                  forceErrorIcon: n.fieldsWithErrors[e.type],
                  shakeClassName: n.fieldsWithErrors[e.type] && r ? r : "",
                  ref: 0 === t ? d : void 0,
                  value: e.value,
                },
                e.type
              ),
            m = e.preChatFields.map((e) => {
              const t = n.inputValues[e.type]?.value;
              return { ...e, value: t };
            }),
            h = m.filter((e) => {
              let { type: t } = e;
              return t !== ai.M0 && t !== ai.n6;
            }),
            g = m.find((e) => {
              let { type: t } = e;
              return t === ai.M0;
            }),
            b = m.find((e) => {
              let { type: t } = e;
              return t === ai.n6;
            }),
            v = n.fieldsWithErrors[ai.R6];
          return (0, $.FD)("div", {
            className: "pre-chat",
            children: [
              (0, $.Y)(Gn, {}),
              (0, $.FD)("form", {
                onSubmit: u,
                children: [
                  (0, $.Y)("div", {
                    css: Un,
                    children: (0, $.Y)(_n, {
                      value: "preformMessage",
                      emojify: !0,
                    }),
                  }),
                  (0, $.FD)("div", {
                    className: "user-data-modal-fields",
                    children: [
                      h.map(f),
                      e.areDepartmentsEnabled &&
                        !e.isDepartmentSelected &&
                        (0, $.Y)(pi, {
                          onChange: l,
                          shakeClassName: v && r ? r : "",
                          hasError: v,
                        }),
                      g && f(g, h.length),
                      b && f(b, h.length),
                    ],
                  }),
                  (0, $.Y)(Bn, {}),
                ],
              }),
            ],
          });
        };
        yi.defaultProps = { selectedDepartmentId: null };
        var wi = (0, r.Ng)((e) => ({
          preChatFields: (0, ii.tr)(e.preChat.data, e.visitor),
          areDepartmentsEnabled: (0, C.ZX)(e),
          isDepartmentSelected: (0, C.YN)(e),
          selectedDepartmentId: (0, C.pQ)(e),
          prechatSubscriptionCheckboxDefaultValue: (0, C.sd)(e),
          isMobile: (0, C.Ny)(e),
        }))(yi);
        var ki = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)((e) => e.showUserDataModal),
            { isNewSkin: n } = (0, p.A)(),
            i = (0, c.pn)(!1 !== t, {
              config: { tension: 150, friction: 20 },
              from: { opacity: 0 },
              enter: { opacity: 1 },
              leave: { opacity: 0 },
            }),
            o = a.useRef(null);
          function s() {
            e((0, k.pO6)(rt.X.closeModalClicked)), e((0, k.esv)(!1));
          }
          a.useEffect(
            () => () => {
              (0, h.yG)();
            },
            []
          );
          const l = (0, c.pn)(t, {
            from: { transform: "translateY(100px)", opacity: 0 },
            enter: { transform: "translateY(0px)", opacity: 1 },
            leave: { transform: "translateY(100px)", opacity: 0 },
          });
          return i(
            (e, t) =>
              t &&
              (0, $.Y)(c.CS.div, {
                css: jn,
                style: e,
                children: l((e, t) => {
                  if (!t) return null;
                  let i;
                  return (
                    "prechat" === t
                      ? (i = (0, $.Y)(wi, {}))
                      : "alwaysOnline" === t
                      ? (i = (0, $.Y)(Qn, {}))
                      : "createTicket" === t && (i = (0, $.Y)(ni, {})),
                    (0, $.FD)(c.CS.div, {
                      className: "user-data-modal",
                      style: e,
                      ref: o,
                      "data-testid": "userDataModal",
                      css: Ln,
                      children: [
                        (0, $.Y)("button", {
                          css: zn,
                          onClick: s,
                          type: "button",
                          "aria-label": (0, y.pw)(
                            "closeUserDataModal",
                            null,
                            "Close modal"
                          ),
                          children: n
                            ? (0, $.Y)(st.G, {})
                            : (0, $.Y)(st.yQ, {}),
                        }),
                        i,
                      ],
                    })
                  );
                }),
              })
          );
        };
        class Ai extends a.Component {
          constructor() {
            super(...arguments), (0, i.A)(this, "state", { hasError: !1 });
          }
          static getDerivedStateFromError() {
            return { hasError: !0 };
          }
          componentDidCatch(e) {
            (0, v.DH)("Error while loading async chunk", {
              message: e.message,
            }),
              this.props.onDidCatch();
          }
          render() {
            return this.state.hasError ? null : this.props.children;
          }
        }
        var Ci = Ai,
          Ei = n(4019);
        const Si = a.lazy(() => n.e(131).then(n.bind(n, 8431)));
        var Di = () => {
          const e = (0, Ei.lz)().state,
            [t, n] = (0, a.useState)(Boolean(e));
          return (
            (0, a.useEffect)(() => {
              e && n(!0);
            }, [e]),
            (0, $.Y)(Ci, {
              onDidCatch: () => {},
              children: (0, $.Y)(a.Suspense, {
                fallback: null,
                children:
                  t &&
                  (0, $.Y)(Si, {
                    resetVideoCallConnectionRequest: () => {
                      n(!1);
                    },
                  }),
              }),
            })
          );
        };
        var Yi = () => {
          const [e, t] = (0, a.useState)(!1),
            n = () => {
              t(!1);
            };
          return (
            (0, a.useEffect)(
              () => (
                document.addEventListener("mouseleave", n),
                () => {
                  document.removeEventListener("mouseleave", n);
                }
              ),
              []
            ),
            {
              isClicked: e,
              handleClick: () => {
                t(!0);
              },
              handleMouseEnter: () => {
                t(!1);
              },
            }
          );
        };
        var Ti = (e) =>
          (0, $.Y)(V, {
            ...e,
            in: e.in,
            classNames: "fade",
            children: e.children,
          });
        var Fi = (0, d.AH)(
          {
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color: "currentColor",
            svg: {
              width: 22,
              height: 22,
              fill: "currentColor",
              transition: "all 0.16s ease-in-out",
            },
            outline: "none",
            ".mobile &": { width: 44, height: 44 },
            "&::before": {
              content: '""',
              position: "absolute",
              width: 38,
              height: 38,
              borderRadius: "50%",
              zIndex: -1,
              transition: "all 0.16s ease-in-out",
              transform: "scale(0)",
              top: "calc(50% - 19px)",
              left: "calc(50% - 19px)",
            },
            "&:hover::before": { transform: "scale(1)" },
            "&:hover": {
              color: "var(--custom-action-color)",
              "&::before": {
                backgroundColor:
                  "var(--custom-action-color-hover, rgba(0, 125, 252, 0.12))",
              },
            },
            ".grid-layout:not(.mobile) &": {
              width: 24,
              height: 24,
              svg: { width: 20, height: 20 },
              "&::before": {
                width: 28,
                height: 28,
                transform: "scale(1)",
                top: "calc(50% - 14px)",
                left: "calc(50% - 14px)",
                background: "var(--custom-action-color-hover)",
                borderRadius: "var(--radius-small-component, 8px)",
                opacity: 0,
              },
              "&:hover": {
                color: "var(--custom-action-color)",
                "&::before": { opacity: 1 },
              },
            },
            "&.disabled svg, &.disabled:focus svg": { fill: "#c9cbd8" },
            "&:disabled": {
              "&::before": { background: "none !important" },
              svg: { fill: "#c9cbd8" },
            },
          },
          "",
          ""
        );
        var _i = {
          tooltipButton: {
            name: "1xtmqps",
            styles:
              "span{color:#080F1A;bottom:calc(100% - 4px);}@media (hover: hover){&:not([disabled]):hover .tooltip:not(.clicked){opacity:1;transform:translate(-50%, -10px);}}&:not([disabled]):active .tooltip{opacity:0;pointer-events:none;}",
          },
          tooltip: {
            name: "twfl95",
            styles:
              "display:flex;flex-direction:column;align-items:center;padding:6px 8px;background:#fff;border-radius:4px;box-shadow:0px 8px 20px rgba(0, 27, 71, 0.24);font-size:13px;position:absolute;bottom:calc(100% - 4px);left:50%;transform:translate(-50%, 10px);opacity:0;pointer-events:none;transition:opacity 0.16s ease-in-out, transform 0.16s ease-in-out;z-index:1;white-space:nowrap;gap:8px",
          },
        };
        var Ii = () => {
          const e = (0, r.wA)(),
            { isNewSkin: t } = (0, p.A)();
          return (0, $.FD)("span", {
            css:
              ((n = t),
              (0, d.AH)(
                {
                  marginInlineStart: 0,
                  ".pulse, .pulse-white": {
                    willChange: "transform",
                    display: "block",
                    width: n ? 24 : 38,
                    height: n ? 24 : 38,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "50%",
                    animationIterationCount: "1",
                    marginInlineStart: 0,
                  },
                  ".pulse": {
                    background: "#c9cbd8",
                    zIndex: "-4",
                    animation: "waterPulse 3s",
                    "&.animation-delay": { zIndex: "-2" },
                  },
                  ".pulse-white": {
                    background: "#fff",
                    zIndex: "-3",
                    animation: "waterPulseWhite 3s",
                    "&.animation-delay": { zIndex: "-1" },
                    marginInlineStart: 0,
                  },
                  ".animation-delay": { animationDelay: "0.8s" },
                  "@keyframes waterPulseWhite": {
                    from: { transform: "scale(0.7)" },
                    "29%": { transform: "scale(0.7)" },
                    "60%": { transform: "scale(2.8)" },
                  },
                  "@keyframes waterPulse": {
                    from: { opacity: 0, transform: "scale(0.8)" },
                    "19%": { opacity: 0.3 },
                    "23%": { transform: "scale(0.8)" },
                    "24%": { opacity: 0.5, transform: "scale(0.8)" },
                    "31%": { opacity: 0.4 },
                    "55%": { opacity: 0.1, transform: "scale(2.8)" },
                    "100%": { opacity: 0 },
                  },
                },
                "",
                ""
              )),
            children: [
              (0, $.Y)("span", { className: "pulse" }),
              (0, $.Y)("span", { className: "pulse-white" }),
              (0, $.Y)("span", {
                className: "pulse animation-delay",
                onAnimationEnd: () => {
                  e((0, k.hm)());
                },
              }),
              (0, $.Y)("span", { className: "pulse-white animation-delay" }),
            ],
          });
          var n;
        };
        const Mi = {
            name: "1rrfa2q",
            styles:
              "&.bots-animation{svg{will-change:transform;animation:botsAnimation 3s;animation-iteration-count:1;}@keyframes botsAnimation{12%{transform:scale(1);}20%{transform:scale(1.2);}25%{transform:scale(0.9);}29%{transform:scale(1.05);}31%{transform:scale(1);}}}",
          },
          Ni = { name: "m99r4y", styles: "left:100%" };
        var Ri = (e) => {
          let {
            onClick: t,
            disableButtonAnimation: n,
            ariaLabel: i,
            onBlur: a,
            shouldDisplayTooltip: o = !1,
          } = e;
          const { isClicked: s, handleClick: l, handleMouseEnter: d } = Yi(),
            c = (0, r.d4)((e) => e.isBotActive),
            u = (0, r.d4)((e) => e.assignedOperators),
            p = (0, r.d4)(C.Ny),
            f = !c && 0 === u.length && !n && !p;
          return (0, $.FD)("button", {
            type: "button",
            className: "ripple " + (f ? "bots-animation" : ""),
            onClick: () => {
              l(), t();
            },
            onBlur: a,
            onMouseEnter: d,
            "aria-label": i,
            css: o ? [Fi, Mi, _i.tooltipButton] : [Fi, Mi],
            children: [
              (0, $.Y)(st.YH, {}),
              f && (0, $.Y)(Ii, {}),
              o &&
                (0, $.Y)("span", {
                  className: "tooltip " + (s ? "clicked" : ""),
                  css: [_i.tooltip, Ni, "", ""],
                  children: (0, y.pw)("startTheBot", null, "Start the Bot"),
                }),
            ],
          });
        };
        var Oi = (e) =>
          (0, $.FD)("div", {
            className: "bots-dropdown",
            children: [
              e.isBotActive &&
                (0, $.Y)("ul", {
                  className: "bots-cancel",
                  children: (0, $.Y)("li", {
                    children: (0, $.FD)("span", {
                      tabIndex: "0",
                      onClick: e.onCancelBotClick,
                      onKeyUp: (t) => {
                        13 === t.keyCode && e.onCancelBotClick();
                      },
                      onFocus: e.onBotFocus,
                      onBlur: e.onBotBlur,
                      role: "button",
                      children: [
                        (0, $.Y)(st.bm, {}),
                        " ",
                        (0, y.pw)("startOver", null, "Start over"),
                      ],
                    }),
                  }),
                }),
              !e.isBotActive &&
                (0, $.Y)("ul", {
                  children: (0, $.Y)("li", {
                    children: (0, $.FD)("span", {
                      onClick: () => {
                        e.onBotClick();
                      },
                      onKeyUp: (t) => {
                        13 === t.keyCode && e.onBotClick();
                      },
                      onFocus: e.onBotFocus,
                      onBlur: e.onBotBlur,
                      role: "button",
                      tabIndex: e.isBotActive ? "-1" : "0",
                      children: [
                        (0, $.Y)(st.Q5, {}),
                        " ",
                        (0, y.pw)("startTheBot", null, "Start the Bot"),
                      ],
                    }),
                  }),
                }),
            ],
          });
        var ji = () => {
          const [e, t] = (0, a.useState)(!1),
            n = (0, r.d4)((e) => e.bots),
            i = (0, r.d4)((e) => e.isBotActive),
            o = (0, r.d4)((e) => e.disableBotsButtonAnimation),
            s = (0, r.wA)(),
            { isNewSkin: l } = (0, p.A)(),
            d = () => !i && (s((0, k.qbo)()), t(!1), !0);
          if (!n || 0 === n.length) return null;
          const c = e
            ? (0, y.pw)("closeBotsLauncher", null, "Close Bots Launcher")
            : (0, y.pw)("openBotsLauncher", null, "Open Bots Launcher");
          return l
            ? (0, $.Y)(Ri, {
                onClick: d,
                disableButtonAnimation: o,
                ariaLabel: c,
                shouldDisplayTooltip: !0,
              })
            : (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)(Ri, {
                    onBlur: () => {
                      t(!1);
                    },
                    onClick: () => {
                      s((0, k.Hzh)(!1)),
                        t((e) => !e),
                        s((0, k.pO6)(rt.X.botsButtonClicked));
                    },
                    disableButtonAnimation: o,
                    ariaLabel: c,
                  }),
                  (0, $.Y)(V, {
                    in: e,
                    classNames: "botsListFade",
                    children: (0, $.Y)(Oi, {
                      onBotClick: d,
                      onBotFocus: () => {
                        t(!0);
                      },
                      onBotBlur: () => {
                        t(!1);
                      },
                      onCancelBotClick: () => {
                        s((0, k.pO6)(rt.X.botCanceled)), s((0, k.Ns2)()), t(!1);
                      },
                      isBotActive: i,
                    }),
                  }),
                ],
              });
        };
        const Li = () =>
            (0, $.Y)("div", {
              className: "emoji-wrapper",
              children: (0, $.Y)("div", { className: "emoji-mart" }),
            }),
          zi = a.lazy(() => n.e(181).then(n.bind(n, 2280)));
        var Ui = (e) =>
          (0, $.Y)(Ci, {
            onDidCatch: e.handleEmojiPanel,
            children: (0, $.Y)(a.Suspense, {
              fallback: (0, $.Y)(Li, {}),
              children: (0, $.Y)(zi, {
                onEmojiClick: e.onEmojiClick,
                isMobile: e.isMobile,
              }),
            }),
          });
        const Pi = {
            name: "rq5t1y",
            styles:
              "margin-right:0px;float:right;display:flex;text-decoration:none;color:#8894ab;font-weight:400;font-size:10px;/* @noflip */direction:ltr;span{align-self:center;/* @noflip */margin-right:8px;}",
          },
          Bi = { name: "6dbmtd", styles: "svg{width:171px;}" },
          Hi = { name: "15hdwbu", styles: "svg{width:119px;}" },
          qi = {
            name: "7k8uhf",
            styles:
              "margin-right:0px;float:right;/* @noflip */direction:ltr;display:flex;align-items:center;justify-content:center;img{object-fit:contain;max-width:125px;max-height:30px;}",
          };
        var $i = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)((e) => e.publicKey),
            n = (0, r.d4)((e) => e.platform),
            i = (0, r.d4)((e) => e.isMobile),
            a = (0, r.d4)(C.Tw),
            o = (0, r.d4)(C.HE),
            s = (0, r.d4)(C.Zh),
            l = (0, f.le)(),
            d = !(0, f.HP)(t);
          if (o)
            return (0, $.Y)("div", {
              children: (0, $.Y)("span", {
                css: qi,
                children: (0, $.Y)("img", {
                  src: o,
                  alt: "Company logo",
                  onError: () => {
                    e((0, k.uOy)({ customBranding: "" }));
                  },
                }),
              }),
            });
          const c = s ? st.tE : st.QT,
            u = [Pi, s ? Bi : Hi],
            p = `https://www.tidio.com/${
              s ? "powered-by-lyro" : "powered-by-tidio"
            }/?platform=${n}&project=${t}&device=${i ? "mobile" : "desktop"}${
              d
                ? `&utm_source=plugin_ref&utm_medium=widget_v4&utm_campaign=plugin_ref&utm_referrer=${l}`
                : ""
            }`;
          return a
            ? (0, $.Y)("div", {
                children: (0, $.Y)("span", {
                  css: u,
                  children: (0, $.Y)(c, {}),
                }),
              })
            : (0, $.Y)("div", {
                children: (0, $.Y)("a", {
                  css: u,
                  href: p,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": (0, y.pw)(
                    "poweredBy",
                    null,
                    "Powered by Tidio."
                  ),
                  children: (0, $.Y)(c, {}),
                }),
              });
        };
        class Vi extends a.Component {
          render() {
            switch (this.props.extension) {
              case "doc":
              case "docx":
                return (0, $.Y)(st.JA, {});
              case "flv":
                return (0, $.Y)(st.Np, {});
              case "mpg":
              case "mp4":
              case "avi":
                return (0, $.Y)(st.ft, {});
              case "pdf":
                return (0, $.Y)(st.zz, {});
              case "txt":
              case "rtf":
                return (0, $.Y)(st.Dy, {});
              case "wma":
              case "mp3":
                return (0, $.Y)(st.AH, {});
              case "xls":
              case "xlsx":
              case "csv":
                return (0, $.Y)(st.mb, {});
              case "png":
              case "jpg":
              case "jpeg":
              case "gif":
                return (0, $.Y)(st.E9, {});
              default:
                return null;
            }
          }
        }
        var Wi = Vi;
        const Ki = 24,
          Gi = {
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            height: "100%",
            padding: "8px 12px",
            backgroundColor: "#fff",
            borderRadius: "var(--radius-component, 12px)",
            border: "1px solid var(--border-color, #D3DBE5)",
            "> svg": { width: Ki, height: Ki, flexShrink: 0 },
          },
          Xi = {
            name: "o2lxia",
            styles:
              "display:flex;gap:8px;padding-top:16px;overflow-x:auto;scrollbar-color:#acb8cb transparent;scrollbar-width:thin;&::-webkit-scrollbar{width:12px;}&::-webkit-scrollbar-thumb{border:3px solid #eff2f6;border-radius:6px;background-color:#acb8cb;}",
          },
          Qi = (0, d.AH)(
            { position: "relative", flexShrink: 0, width: 52, height: 52 },
            "",
            ""
          ),
          Zi = (0, d.AH)(
            {
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-component, 12px)",
              border: "1px solid var(--border-color, #D3DBE5)",
              overflow: "hidden",
              ".loader-icon.circular": {
                width: Ki,
                height: Ki,
                position: "relative",
                left: 0,
                top: 0,
              },
            },
            "",
            ""
          ),
          Ji = {
            name: "q5j908",
            styles: "width:100%;height:100%;object-fit:cover;display:block",
          },
          ea = {
            name: "118oksb",
            styles:
              "position:absolute;inset:0;display:flex;align-items:center;justify-content:center",
          },
          ta = (0, d.AH)(
            {
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: -6,
              right: -6,
              height: 28,
              width: 28,
              borderRadius: "50%",
              boxShadow: "0px 2px 6px 0px #001b471f",
              background: "#fff",
              svg: { width: 20, height: 20, fill: "#8894ab" },
              "&:hover": {
                backgroundColor:
                  "var(--custom-action-color-background, #dce9ff)",
                svg: { fill: "var(--custom-action-color, #0566ff)" },
              },
            },
            "",
            ""
          ),
          na = (0, d.AH)(
            Gi,
            {
              position: "relative",
              flexShrink: 0,
              width: 192,
              height: 52,
              boxSizing: "border-box",
              ".loader-icon.circular": {
                width: Ki,
                height: Ki,
                position: "relative",
                left: 0,
              },
            },
            "",
            ""
          ),
          ia = (0, d.AH)(
            Gi,
            {
              position: "relative",
              flexShrink: 0,
              width: 220,
              height: 52,
              ".alert-icon": { width: 20, height: 20, fill: "#f6303a" },
            },
            "",
            ""
          ),
          aa = {
            name: "1bbuwnf",
            styles:
              "font-size:12px;line-height:14px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word;color:var(--text-color, #06132B)",
          },
          oa = { name: "lq9bq6", styles: "color:#ACB8CB" },
          ra = {
            name: "d599q",
            styles:
              "display:flex;flex-direction:column;gap:4px;flex:1;min-width:0",
          },
          sa = {
            name: "1iglpiq",
            styles: "color:#f6303a;font-size:12px;line-height:14px",
          };
        var la = (e) => {
          let { onClick: t } = e;
          return (0, $.Y)("button", {
            type: "button",
            css: ta,
            onClick: t,
            "aria-label": (0, y.pw)(
              "removeAttachment",
              null,
              "Remove attachment"
            ),
            children: (0, $.Y)(st.bm, {}),
          });
        };
        var da = (e) => {
          let { attachment: t, onRemove: n } = e;
          const {
              id: i,
              uploadedThumb: o,
              fileName: r,
              uploadStatus: s,
              errorMessage: l,
            } = t,
            d = (0, a.useCallback)(() => {
              n(i);
            }, [i, n]),
            c = "uploading" === s,
            u = "error" === s,
            p = (0, a.useMemo)(() => (0, ii.QC)(r || "") || "", [r]),
            f = (0, a.useMemo)(() => (0, ii.iT)(p), [p]);
          return u
            ? (0, $.FD)("div", {
                css: ia,
                children: [
                  (0, $.Y)(st.Fc, {}),
                  (0, $.Y)("div", {
                    css: ra,
                    children: l && (0, $.Y)("span", { css: sa, children: l }),
                  }),
                  (0, $.Y)(la, { onClick: d }),
                ],
              })
            : "image" === f
            ? (0, $.FD)("div", {
                css: Qi,
                children: [
                  (0, $.Y)("div", {
                    css: Zi,
                    children: c
                      ? (0, $.Y)("div", {
                          css: ea,
                          children: (0, $.Y)(st.tR, {}),
                        })
                      : (0, $.Y)("img", { src: o, alt: r, css: Ji }),
                  }),
                  (0, $.Y)(la, { onClick: d }),
                ],
              })
            : c
            ? (0, $.FD)("div", {
                css: na,
                children: [
                  (0, $.Y)(st.tR, {}),
                  (0, $.Y)("span", { css: [aa, oa, "", ""], children: r }),
                ],
              })
            : (0, $.FD)("div", {
                css: na,
                children: [
                  (0, $.Y)(Wi, { extension: p }),
                  (0, $.Y)("span", { css: aa, children: r }),
                  (0, $.Y)(la, { onClick: d }),
                ],
              });
        };
        var ca = (e) => {
          let { attachments: t, onRemove: n } = e;
          return 0 === t.length
            ? null
            : (0, $.Y)("div", {
                css: Xi,
                children: t.map((e) =>
                  (0, $.Y)(da, { attachment: e, onRemove: n }, e.id)
                ),
              });
        };
        const ua = {
            name: "16fq2mz",
            styles:
              "display:flex;align-items:center;gap:4px;font-size:12px;color:#647491",
          },
          pa = { name: "am1x89", styles: "left:0%" },
          fa = (e) =>
            (0, d.AH)(
              {
                flex: "0 0 38px",
                color: e ? "#B1B9C8" : "var(--custom-action-color)",
                transform: "translateX(8px)",
                ".grid-layout &": {
                  flex: "0 0 24px",
                  color: e ? "#64749180" : "var(--custom-action-color)",
                  transform: "translateX(0px)",
                },
                ".mobile &": {
                  flex: "0 0 44px",
                  transform: "translateX(10px)",
                },
              },
              "",
              ""
            );
        var ma = (e) => {
          let { disabled: t } = e;
          const n = (0, r.wA)(),
            i = (0, r.d4)(C.o4);
          return (0, $.FD)("button", {
            id: "send-button",
            type: "button",
            onClick: () => {
              i || n((0, k.zrs)(!0));
            },
            disabled: t,
            css: [Fi, fa(t), _i.tooltipButton, "", ""],
            children: [
              (0, $.Y)(st.qx, {}),
              (0, $.FD)("span", {
                className: "tooltip",
                css: [_i.tooltip, pa, "", ""],
                children: [
                  (0, y.pw)("send", null, "Send"),
                  (0, $.FD)("div", {
                    css: ua,
                    children: [
                      (0, y.pw)("shortcut", null, "Shortcut"),
                      " ",
                      (0, $.Y)(st.xy, {}),
                    ],
                  }),
                ],
              }),
            ],
          });
        };
        const ha = g.TH,
          ga = {
            name: "uh5xjc",
            styles: "display:flex;align-items:center;gap:12px",
          },
          ba = (e, t) =>
            (function (e, t) {
              const n = (0, h.bi)();
              if (!n?.createElement) return 0;
              const i = (
                "OffscreenCanvas" in window
                  ? new OffscreenCanvas(500, 100)
                  : n.createElement("canvas")
              ).getContext("2d");
              return (i.font = t), Math.ceil(i.measureText(e).width);
            })(e, '17px "Mulish", sans-serif') > t;
        function va(e) {
          const t = e?.activeElement;
          return t ? (t.shadowRoot ? va(t.shadowRoot) : t) : null;
        }
        const xa = (e) => {
          try {
            let t = e.target;
            if (t?.shadowRoot?.activeElement) {
              for (; t?.shadowRoot?.activeElement; )
                t = t.shadowRoot.activeElement;
              Object.defineProperty(e, "target", {
                value: t,
                writable: !1,
                configurable: !0,
              }),
                e.srcElement &&
                  Object.defineProperty(e, "srcElement", {
                    value: t,
                    writable: !1,
                    configurable: !0,
                  });
            }
          } catch {}
        };
        class ya extends a.Component {
          constructor() {
            var e;
            super(...arguments),
              (e = this),
              (0, i.A)(this, "state", {
                input: "",
                inputRows: 1,
                isPlaceholderToLong: !1,
              }),
              (0, i.A)(this, "inputRef", null),
              (0, i.A)(this, "initialInputScrollHeight", 0),
              (0, i.A)(this, "oldInputRows", 1),
              (0, i.A)(this, "oldPlaceholder", ""),
              (0, i.A)(this, "windowRef", (0, h.AL)()),
              (0, i.A)(this, "osName", (0, f.Dj)().name.toLowerCase()),
              (0, i.A)(this, "originalActiveElementDescriptor", null),
              (0, i.A)(this, "setInputRef", (e) => {
                this.inputRef = e;
              }),
              (0, i.A)(this, "onInputChange", (e) => {
                const t = this.state.input.length,
                  n = e.target.value;
                this.setState({ input: n }, () => {
                  this.adjustInputRows(t);
                }),
                  this.dispatchVisitorIsTyping(n, this.state.input);
              }),
              (0, i.A)(this, "adjustInputRows", function () {
                let t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : null;
                if (
                  ((e.oldInputRows = e.state.inputRows),
                  "" === e.state.input && !e.state.isPlaceholderToLong)
                )
                  return (
                    e.setState({ inputRows: 1 }),
                    1 === e.oldInputRows ||
                      e.props.isMobile ||
                      e.props.dispatch((0, k.oOm)(tt.NO.CHAT_SIZE_1)),
                    !0
                  );
                if (
                  3 === e.state.inputRows &&
                  null !== t &&
                  e.state.input.length > t
                )
                  return !0;
                const n = e.getCalculatedInputRows();
                if (n !== e.oldInputRows && !e.props.isMobile) {
                  const t = {
                    1: tt.NO.CHAT_SIZE_1,
                    2: tt.NO.CHAT_SIZE_2,
                    3: tt.NO.CHAT_SIZE_3,
                  };
                  e.props.dispatch((0, k.oOm)(t[n] || tt.NO.CHAT_SIZE_1));
                }
                return e.setState({ inputRows: n }), !0;
              }),
              (0, i.A)(this, "getCalculatedInputRows", () => {
                if (!this.inputRef) return 1;
                let e =
                  Math.ceil(
                    (this.inputRef.scrollHeight -
                      this.initialInputScrollHeight) /
                      ha
                  ) + 1;
                return this.props.isMobile && e > 2
                  ? 2
                  : (e > 3
                      ? (e = 3)
                      : this.state.isPlaceholderToLong && e < 2
                      ? (e = 2)
                      : e < 1 && (e = 1),
                    e);
              }),
              (0, i.A)(this, "restoreMessage", () => {
                const { blockedMessage: e } = this.props;
                setTimeout(() => {
                  this.setState({ input: e || "" }, () => {
                    this.adjustInputRows();
                  });
                }, 0),
                  this.props.dispatch((0, k.S8h)());
              }),
              (0, i.A)(this, "onKeyDown", (e) => {
                const t = 13 === e.keyCode;
                return (
                  !(!t || (t && e.shiftKey) || this.props.newMessageDisabled) &&
                  (e.preventDefault(), this.props.dispatch((0, k.zrs)(!0)), !0)
                );
              }),
              (0, i.A)(this, "onClick", () => {
                this.props.newMessageDisabled && (0, h.Bv)();
              }),
              (0, i.A)(this, "dispatchVisitorIsTyping", (e, t) => {
                const n = e.trim(),
                  i = t.trim();
                return (
                  ("" !== n || n !== i) &&
                  (this.props.dispatch((0, k.uEi)(n)), !0)
                );
              }),
              (0, i.A)(this, "sendMessage", () => {
                const {
                  dispatch: e,
                  isEmojiPanelVisible: t,
                  triggerShake: n,
                  pendingAttachments: i,
                } = this.props;
                let a = this.state.input;
                a = a.trim();
                const o = "" !== a,
                  r =
                    (i ? i.filter((e) => "uploaded" === e.uploadStatus) : [])
                      .length > 0;
                return (
                  (!i || !i.some((e) => "uploading" === e.uploadStatus)) &&
                  (o || r
                    ? (o && e((0, k.G8c)(a)),
                      r && e((0, k.E3H)()),
                      this.setState({ input: "" }),
                      t && e((0, k.Hzh)(!1)),
                      this.setState({ inputRows: 1 }),
                      !0)
                    : (n(), !1))
                );
              }),
              (0, i.A)(this, "fixWebviewTouchAreas", () => {
                try {
                  this.props.isMobile &&
                    "ios" === this.osName &&
                    this.windowRef &&
                    (this.windowRef.parent?.scrollTo(
                      this.windowRef.parent.scrollX,
                      this.windowRef.parent.scrollY - 1
                    ),
                    this.windowRef.parent?.scrollTo(
                      this.windowRef.parent.scrollX,
                      this.windowRef.parent.scrollY + 1
                    ));
                } catch {}
              }),
              (0, i.A)(this, "onPaste", (e) => {
                if (!this.props.fileUploadEnabled) return;
                if (0 === e.clipboardData?.files?.length) return;
                e.preventDefault();
                const t = Array.from(e.clipboardData.files)[0];
                this.props.newMessageDisabled &&
                  this.props.dispatch(
                    (0, k.S79)(
                      (0, y.pw)(
                        "newMessageDisabledAlert",
                        null,
                        "Please enter your email first."
                      )
                    )
                  ),
                  this.props.dispatch((0, k.SBQ)(et()(), t));
              }),
              (0, i.A)(this, "fixActiveElement", () => {
                try {
                  const e = va(window.parent.document),
                    t = Object.getOwnPropertyDescriptor(
                      window.parent.Document.prototype,
                      "activeElement"
                    );
                  (this.originalActiveElementDescriptor = t || null),
                    Object.defineProperty(
                      window.parent.document,
                      "activeElement",
                      { value: e, writable: !1, configurable: !0 }
                    );
                } catch {}
              }),
              (0, i.A)(this, "revertActiveElement", () => {
                try {
                  this.originalActiveElementDescriptor &&
                    Object.defineProperty(
                      window.parent.document,
                      "activeElement",
                      this.originalActiveElementDescriptor
                    );
                } catch {}
              }),
              (0, i.A)(this, "onFocus", () => {
                this.props.isNewSkin &&
                  (this.fixActiveElement(),
                  (() => {
                    try {
                      window.parent.addEventListener("keydown", xa, !0),
                        window.parent.addEventListener("keyup", xa, !0),
                        window.parent.addEventListener("keypress", xa, !0),
                        window.parent.addEventListener("beforeinput", xa, !0);
                    } catch {}
                  })()),
                  !this.props.newMessageDisabled &&
                    this.props.isMobile &&
                    this.props.dispatch((0, k.E3S)(!0));
              }),
              (0, i.A)(this, "onBlur", (e) => {
                this.props.isNewSkin &&
                  (this.revertActiveElement(),
                  (() => {
                    try {
                      window.parent.removeEventListener("keydown", xa, !0),
                        window.parent.removeEventListener("keyup", xa, !0),
                        window.parent.removeEventListener("keypress", xa, !0),
                        window.parent.removeEventListener(
                          "beforeinput",
                          xa,
                          !0
                        );
                    } catch {}
                  })()),
                  !this.props.newMessageDisabled &&
                    this.props.isMobile &&
                    "send-button" !== e.relatedTarget?.id &&
                    setTimeout(() => {
                      this.props.dispatch((0, k.E3S)(!1)),
                        this.fixWebviewTouchAreas();
                    }, 100);
              });
          }
          componentDidMount() {
            if (
              (setTimeout(() => {
                this.inputRef &&
                  (this.initialInputScrollHeight = this.inputRef.scrollHeight);
              }, 0),
              setTimeout(() => {
                !this.props.newMessageDisabled &&
                  null !== this.props.blockedMessage &&
                  this.restoreMessage();
              }, 0),
              this.inputRef)
            ) {
              const { placeholder: e, offsetWidth: t } = this.inputRef;
              (this.oldPlaceholder = e),
                ba(e, t) &&
                  this.setState({ inputRows: 2, isPlaceholderToLong: !0 });
            }
          }
          static getDerivedStateFromProps(e, t) {
            return e.newMessageEmoji
              ? (e.dispatch((0, k.eSL)()),
                { input: t.input + e.newMessageEmoji })
              : e.blockedMessage && e.newMessageDisabled
              ? { input: e.blockedMessage }
              : null;
          }
          componentDidUpdate(e) {
            if (
              (this.props.sendVisitorMessageFlag &&
                !e.sendVisitorMessageFlag &&
                this.sendMessage(),
              this.inputRef)
            ) {
              const { placeholder: e, offsetWidth: t } = this.inputRef;
              this.oldPlaceholder !== e &&
                ((this.oldPlaceholder = e),
                ba(e, t)
                  ? this.setState({ inputRows: 2, isPlaceholderToLong: !0 })
                  : this.setState({ isPlaceholderToLong: !1 }));
            }
            null === this.props.blockedMessage &&
              null !== e.blockedMessage &&
              this.setState({ input: "" });
          }
          componentWillUnmount() {
            const { input: e } = this.state;
            "" !== e && this.props.dispatch((0, k.S8h)(e));
          }
          render() {
            const {
                lastMessage: e,
                newMessageDisabled: t,
                hasConnectionIssues: n,
                showUserDataModal: i,
              } = this.props,
              a = this.props.pendingAttachments?.some(
                (e) => "uploading" === e.uploadStatus
              ),
              o = this.props.pendingAttachments?.some(
                (e) => "uploaded" === e.uploadStatus
              ),
              r = ("" === this.state.input && !o) || a;
            return (0, $.Y)(_n, {
              value: [
                "clickToProvideEmail",
                "onlineMessagePlaceholder",
                "hitTheButtons",
                "fillOutTheForm",
              ],
              children: (a) => {
                let {
                    clickToProvideEmail: o,
                    onlineMessagePlaceholder: s,
                    hitTheButtons: l,
                    fillOutTheForm: d,
                  } = a,
                  c = s;
                return (
                  t
                    ? n
                      ? (c = s)
                      : i && (c = o)
                    : ((e) => {
                        if (!e) return !1;
                        const t =
                            e.type === ii.t_.cards &&
                            "number" != typeof e.operator_id,
                          n = e.quickReplies && e.quickReplies.length > 0,
                          i = e.buttons && e.buttons.length > 0;
                        return !!(t || n || i);
                      })(e) &&
                      !this.props.isLastMessage24h &&
                      (c = l),
                  e && e.type === tt.Go.FORM && (c = d),
                  (0, $.FD)("div", {
                    css: ga,
                    children: [
                      (0, $.Y)("textarea", {
                        id: "new-message-textarea",
                        value: this.state.input,
                        onChange: this.onInputChange,
                        onKeyDown: this.onKeyDown,
                        onClick: this.onClick,
                        ref: this.setInputRef,
                        rows: this.state.inputRows,
                        placeholder: c,
                        onFocus: this.onFocus,
                        onBlur: this.onBlur,
                        readOnly: t,
                        className: `${t ? "disabled" : ""} ${
                          this.props.shakeClassName
                        }`,
                        "aria-label": (0, y.pw)(
                          "newMessage",
                          null,
                          "New message"
                        ),
                        "data-testid": "newMessageTextarea",
                        onPaste: this.onPaste,
                        style: { padding: "16px 0" },
                        css: ut(Boolean(this.props.isNewSkin)).text14,
                      }),
                      this.props.isNewSkin
                        ? (0, $.Y)(ma, { disabled: r })
                        : !r && (0, $.Y)(ma, { disabled: !1 }),
                    ],
                  })
                );
              },
            });
          }
        }
        const wa = (0, r.Ng)((e) => ({
          newMessageEmoji: e.newMessageEmoji,
          isMobile: e.isMobile,
          sendVisitorMessageFlag: e.sendVisitorMessageFlag,
          isEmojiPanelVisible: e.isEmojiPanelVisible,
          newMessageDisabled: (0, C.o4)(e),
          blockedMessage: e.blockedMessage,
          lastMessage: (0, C.sy)(e),
          isLastMessage24h: (0, C.j6)(e),
          hasConnectionIssues: (0, C.P8)(e),
          showUserDataModal: e.showUserDataModal,
          pendingAttachments: e.pendingAttachments,
        }))(
          ((ka = ya),
          class extends a.Component {
            constructor() {
              super(...arguments),
                (0, i.A)(this, "state", { shakeClassName: "" }),
                (0, i.A)(this, "clearId", null),
                (0, i.A)(this, "isMounted", !1),
                (0, i.A)(this, "triggerShake", () => {
                  this.setState({ shakeClassName: "shake" }),
                    clearTimeout(this.clearId),
                    (this.clearId = null),
                    (this.clearId = setTimeout(() => {
                      this.isMounted && this.setState({ shakeClassName: "" });
                    }, 820));
                });
            }
            componentDidMount() {
              this.isMounted = !0;
            }
            componentWillUnmount() {
              this.isMounted = !1;
            }
            render() {
              const e = {
                triggerShake: this.triggerShake,
                shakeClassName: this.state.shakeClassName,
              };
              return (0, $.Y)(ka, { ...this.props, ...e });
            }
          })
        );
        var ka;
        var Aa = (e) => {
          const { isNewSkin: t } = (0, p.A)();
          return (0, $.Y)(wa, { ...e, isNewSkin: t });
        };
        const Ca = (e) =>
            (0, d.AH)(
              { left: e ? "calc(100% - 14px)" : "calc(100% - 18px)" },
              "",
              ""
            ),
          Ea = (0, d.AH)(
            {
              height: 38,
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              ".grid-layout &": { height: 30 },
              color: "#4C596B",
              ".footer-icons-wrapper": { marginInlineStart: -8 },
              ".mobile &": {
                "* + *": { marginInlineStart: 0 },
                ".footer-icons-wrapper": { marginInlineStart: -8 },
              },
            },
            "",
            ""
          ),
          Sa = { name: "ak4j1h", styles: "&.hidden{display:none;}" },
          Da = (0, d.AH)(
            {
              color: "#647491",
              "* + *": { marginInlineStart: 4 },
              ".footer-icons-wrapper": { marginInlineStart: 0 },
              ".mobile &": {
                "* + *": { marginInlineStart: 0 },
                ".footer-icons-wrapper": { marginInlineStart: -8 },
              },
            },
            "",
            ""
          );
        var Ya = (e) => {
          let { hasSeparator: t = !1 } = e;
          const n = (0, a.useRef)(null),
            i = (0, r.wA)(),
            o = (0, r.d4)((e) => e.isEmojiPanelVisible),
            s = (0, r.d4)((e) => e.isMobile),
            l = (0, r.d4)(C.o4),
            c = (0, r.d4)(C.F_),
            u = (0, r.d4)((e) => e.messages),
            m = (0, r.d4)(C.VQ),
            h = (0, r.d4)(C.fh),
            g = (0, r.d4)((e) => e.allowAttachments),
            b = (0, r.d4)((e) => e.allowEmojis),
            v = (0, r.d4)(C.HE),
            x = (0, r.d4)(C.cf),
            { isNewSkin: w } = (0, p.A)(),
            A = Yi(),
            E = Yi(),
            S = x.length >= f.qu,
            D = Boolean(
              Boolean(u.find((e) => "visitor" === e.sender)) && !h && g
            ),
            Y = (e) => {
              if ((E.handleClick(), e)) {
                !(0 === e.nativeEvent.pageX && 0 === e.nativeEvent.pageY) &&
                  o &&
                  e.currentTarget.blur();
              }
              i(
                l
                  ? (0, k.S79)(
                      (0, y.pw)(
                        "newMessageDisabledAlert",
                        null,
                        "Please enter your email first."
                      )
                    )
                  : (0, k.Hzh)(!o)
              );
            };
          return (0, $.FD)("div", {
            className: "input-group " + (m ? "drag-active" : ""),
            children: [
              b &&
                (0, $.Y)(q, {
                  in: o,
                  classNames: "emojiFade",
                  timeout: 200,
                  mountOnEnter: !0,
                  unmountOnExit: !0,
                  appear: !0,
                  children: (0, $.Y)(Ui, {
                    isMobile: s,
                    onEmojiClick: (e) => {
                      i((0, k.pO6)(rt.X.emojiAdded)),
                        "native" in e && i((0, k.eSL)(e.native));
                    },
                    handleEmojiPanel: Y,
                  }),
                }),
              (0, $.FD)("div", {
                className:
                  "drag-active-wrapper footer-input-wrapper " +
                  (l ? "hidden" : ""),
                css: w ? Sa : void 0,
                children: [
                  t && (0, $.Y)("hr", {}),
                  (0, $.Y)(ca, {
                    attachments: x,
                    onRemove: (e) => {
                      i((0, k.PNQ)(e));
                    },
                  }),
                  (0, $.Y)(Aa, { dispatch: i, fileUploadEnabled: D }),
                ],
              }),
              (0, $.FD)("div", {
                css: w ? [Ea, Da] : [Ea],
                children: [
                  (0, $.FD)("div", {
                    className: "footer-icons-wrapper " + (l ? "hidden" : ""),
                    children: [
                      (0, $.Y)(ji, {}),
                      (0, $.Y)(Ti, {
                        in: D,
                        children: (0, $.FD)("button", {
                          type: "button",
                          className: "ripple " + (l || S ? "disabled" : ""),
                          onClick: (e) => {
                            if ((A.handleClick(), (0, f.DD)() || !D)) return !1;
                            if (e) {
                              (0 === e.nativeEvent.pageX &&
                                0 === e.nativeEvent.pageY) ||
                                e.currentTarget.blur();
                            }
                            return (
                              l
                                ? i(
                                    (0, k.S79)(
                                      (0, y.pw)(
                                        "newMessageDisabledAlert",
                                        null,
                                        "Please enter your email first."
                                      )
                                    )
                                  )
                                : (i((0, k.pO6)(rt.X.uploadButtonClicked)),
                                  n.current && n.current.click()),
                              !0
                            );
                          },
                          disabled: S,
                          "aria-label": (0, y.pw)(
                            "attachFile",
                            null,
                            "Attach file button"
                          ),
                          css: [Fi, _i.tooltipButton, "", ""],
                          onMouseEnter: A.handleMouseEnter,
                          children: [
                            (0, $.Y)(st.so, {}),
                            (0, $.Y)("span", {
                              className:
                                "tooltip " + (A.isClicked ? "clicked" : ""),
                              css: [
                                _i.tooltip,
                                ((T = w),
                                (0, d.AH)(
                                  {
                                    left: T
                                      ? "calc(100% - 2px)"
                                      : "calc(100% - 8px)",
                                  },
                                  "",
                                  ""
                                )),
                                "",
                                "",
                              ],
                              children: (0, y.pw)(
                                "attachment",
                                null,
                                "Attachment"
                              ),
                            }),
                          ],
                        }),
                      }),
                      !s &&
                        b &&
                        (0, $.FD)("button", {
                          type: "button",
                          className: `emoji-switch ripple ${
                            o ? "active" : ""
                          } ${l ? "disabled" : ""}`,
                          onClick: Y,
                          "aria-label": o
                            ? (0, y.pw)(
                                "closeEmojiPanel",
                                null,
                                "Close Emoji picker"
                              )
                            : (0, y.pw)(
                                "openEmojiPanel",
                                null,
                                "Open Emoji picker"
                              ),
                          css: [Fi, _i.tooltipButton, "", ""],
                          onMouseEnter: E.handleMouseEnter,
                          children: [
                            (0, $.Y)(st.jB, {}),
                            (0, $.Y)("span", {
                              className:
                                "tooltip " + (E.isClicked ? "clicked" : ""),
                              css: [_i.tooltip, Ca(w), "", ""],
                              children: (0, y.pw)("emoji", null, "Emoji"),
                            }),
                          ],
                        }),
                      (0, $.Y)("form", {
                        children: (0, $.Y)("input", {
                          type: "file",
                          style: { display: "none" },
                          ref: n,
                          name: "attachment",
                          onChange: (e) => {
                            if (D) {
                              if (e.target.files) {
                                const t = e.target.files[0];
                                i((0, k.SBQ)(et()(), t));
                              }
                              n.current && (n.current.value = "");
                            }
                          },
                          "aria-label": (0, y.pw)(
                            "attachFile",
                            null,
                            "Attach file input"
                          ),
                        }),
                      }),
                    ],
                  }),
                  (c || Boolean(v)) && (0, $.Y)($i, {}),
                ],
              }),
            ],
          });
          var T;
        };
        var Ta = (0, d.AH)(
          {
            "&&": {
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--custom-text-color)",
              svg: {
                width: 24,
                height: 24,
                fill: "currentColor",
                transition: "all 0.16s ease-in-out",
              },
              position: "relative",
              outline: "none",
              ".mobile &": { width: 44, height: 44 },
              "&::before": {
                content: '""',
                position: "absolute",
                background: "#080F1A29",
                width: 40,
                height: 40,
                borderRadius: "50%",
                zIndex: -1,
                transition: "all 0.16s ease-in-out",
                transform: "scale(0)",
                top: "calc(50% - 20px)",
                left: "calc(50% - 20px)",
              },
              "@media (hover: hover)": {
                "&:hover::before": { transform: "scale(1)" },
              },
              ".grid-layout:not(.mobile) &": {
                width: 28,
                height: 28,
                color: "currentColor",
                svg: { width: 20, height: 20 },
                "&::before": {
                  width: 28,
                  height: 28,
                  transform: "scale(1)",
                  top: "calc(50% - 14px)",
                  left: "calc(50% - 14px)",
                  background: "var(--custom-action-color-hover)",
                  borderRadius: "var(--radius-small-component, 8px)",
                  opacity: 0,
                },
                "&:hover": {
                  color: "var(--custom-action-color)",
                  "&::before": { opacity: 1 },
                },
              },
              ".grid-layout:not(.mobile) .chat-header &": {
                color: "var(--custom-text-color)",
                "&::before": { background: "#080F1A29" },
                "&:hover": { color: "var(--custom-text-color)" },
              },
            },
          },
          "",
          ""
        );
        var Fa = {
          name: "a4q2e2",
          styles:
            "span{background:#fff;padding:6px 8px;border-radius:4px;box-shadow:0px 8px 20px 0px rgba(0, 27, 71, 0.24);font-size:13px;position:absolute;opacity:0;pointer-events:none;white-space:nowrap;transition:all 0.16s ease-in-out;z-index:1;top:50%;color:#06132b;margin-inline-end:10px;inset-inline-end:100%;transform:translate(5px, -50%);}@media (hover: hover){&:hover{span{opacity:1;transform:translate(0,-50%);}}}",
        };
        var _a = (e) =>
          (0, d.AH)(
            {
              position: "absolute",
              background: "#fff",
              borderRadius: "var(--radius-small-component, 8px)",
              boxShadow: e
                ? "0px 2px 2px 0px rgba(8, 15, 26, 0.12), 0px 2px 8px 0px rgba(8, 15, 26, 0.08)"
                : "0 6px 32px 0 rgba(0, 18, 46, 0.16)",
              padding: e ? "4px" : "12px 6px",
              zIndex: 6,
              right: e ? "18px" : "24px",
              ul: { margin: 0, padding: 0 },
              li: { borderRadius: "6px", display: "flex" },
              button: {
                padding: e ? "8px" : "8px 16px",
                display: "flex",
                margin: 0,
                position: "initial",
                float: "initial",
                width: "100%",
                borderRadius: "6px",
                alignItems: "center",
                "&:hover, &:focus": {
                  "&:not(.mobile), #body:not(.mobile) &": {
                    background: "#eff2f6",
                  },
                },
                svg: { fill: "#8894ab", height: "20px", width: "20px" },
                span: { marginLeft: "8px", color: "#06132b" },
                "&::before": { content: "none" },
              },
            },
            "",
            ""
          );
        var Ia = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)((e) => e.showOptionsDropdown),
            n = (0, r.d4)((e) => e.notificationSnoozed),
            i = (0, r.d4)((e) => e.isSoundEnabled),
            o = (0, r.d4)((e) => e.isMobile),
            s = (0, r.d4)(C.O1),
            { isNewSkin: l } = (0, p.A)(),
            d = ut(l),
            u = (0, a.useCallback)(() => {
              e((0, k.Z9q)(!1)), e((0, k.vab)(!n));
            }, [n, e]),
            f = (0, a.useCallback)(
              (t) => {
                e((0, k.Z9q)(t));
              },
              [e]
            ),
            m = (0, a.useMemo)(() => {
              let e = 72;
              return (
                l && (e = "conversations" === s ? 52 : 64), o && (e = 60), e
              );
            }, [l, o, s]),
            h = (0, c.pn)(t && i, {
              from: { opacity: 0.01, top: m - 10 },
              enter: {
                opacity: 1,
                top: m,
                config: { tension: 120, friction: 14 },
              },
              leave: { opacity: 0.01, config: { duration: 10 } },
            });
          return (0, $.FD)($.FK, {
            children: [
              i &&
                (0, $.FD)("button", {
                  className: "options ripple",
                  onClick: (n) => {
                    !(0 === n.nativeEvent.pageX && 0 === n.nativeEvent.pageY) &&
                      t &&
                      n.currentTarget.blur(),
                      e((0, k.pO6)(rt.X.optionsButtonClicked)),
                      e((0, k.Z9q)(!t));
                  },
                  onBlur: () => {
                    e((0, k.Z9q)(!1));
                  },
                  type: "button",
                  "aria-label": t
                    ? (0, y.pw)("closeOptions", null, "Close options")
                    : (0, y.pw)("openOptions", null, "Open options"),
                  css: [Ta, Fa, "", ""],
                  children: [
                    l ? (0, $.Y)(st.tx, {}) : (0, $.Y)(st.JY, {}),
                    (0, $.Y)("span", {
                      children: t
                        ? (0, y.pw)("closeOptions", null, "Close options")
                        : (0, y.pw)("openOptions", null, "Open options"),
                    }),
                  ],
                }),
              h((e, t) =>
                t
                  ? (0, $.Y)(c.CS.div, {
                      style: e,
                      css: _a(l),
                      children: (0, $.Y)("ul", {
                        children: n
                          ? (0, $.Y)("li", {
                              children: (0, $.FD)("button", {
                                type: "button",
                                className: "material-icons",
                                onClick: u,
                                onFocus: () => {
                                  f(!0);
                                },
                                onBlur: () => {
                                  f(!1);
                                },
                                children: [
                                  l ? (0, $.Y)(st.c0, {}) : (0, $.Y)(st.WT, {}),
                                  (0, $.Y)("span", {
                                    css: d.text14,
                                    children: (0, $.Y)(_n, {
                                      value: "turnOnNotifications",
                                    }),
                                  }),
                                ],
                              }),
                            })
                          : (0, $.Y)("li", {
                              children: (0, $.FD)("button", {
                                type: "button",
                                className: "material-icons",
                                onClick: u,
                                onFocus: () => {
                                  f(!0);
                                },
                                onBlur: () => {
                                  f(!1);
                                },
                                children: [
                                  l ? (0, $.Y)(st.m2, {}) : (0, $.Y)(st.oH, {}),
                                  (0, $.Y)("span", {
                                    css: d.text14,
                                    children: (0, $.Y)(_n, {
                                      value: "turnOffNotifications",
                                    }),
                                  }),
                                ],
                              }),
                            }),
                      }),
                    })
                  : null
              ),
            ],
          });
        };
        var Ma = () => {
          const e = (0, r.d4)(C.q6),
            t = (0, r.d4)(C.mm),
            n = (0, r.d4)(C.K),
            i = (0, a.useMemo)(
              () =>
                e
                  .map((e) => {
                    const i = t.find((t) => t.id === e);
                    if (!i) return;
                    const a = n.find((t) => t.id === e);
                    return a ? { ...i, name: a.name } : { ...i, name: "" };
                  })
                  .filter((e) => void 0 !== e)
                  .slice(0, 3),
              [e, t, n]
            ),
            o = (0, a.useMemo)(() => {
              try {
                if (0 === i.length) return "\xa0";
                if (1 === i.length) return i[0].name;
                const e = i.map((e) => e.name),
                  t = e
                    .splice(-2)
                    .join(` ${(0, y.pw)("widgetHeaderAnd", null, "and")} `);
                return [...e, t].join(", ");
              } catch (e) {
                return (0, v.sQ)(e), "\xa0";
              }
            }, [i]);
          return { assignedOperatorsData: i, assignedOperatorsNames: o };
        };
        const Na = {
            name: "1wotlm3",
            styles:
              "display:inline-flex;align-items:center;float:left;& > *:not(:first-of-type){margin-inline-start:-4px;}",
          },
          Ra = { name: "l41nzy", styles: "height:8px" };
        var Oa = (e) => {
          let { operators: t, openTab: n, withBackgroundColor: i } = e;
          const { isNewSkin: a } = (0, p.A)(),
            o = t.slice(0, 3);
          return (0, $.FD)("div", {
            children: [
              "home" === n && !a && (0, $.Y)("div", { css: Ra }),
              (0, $.Y)("div", {
                css: Na,
                children: o.map((e) =>
                  (0, $.Y)(
                    $n,
                    {
                      avatarSrc: e.avatarSrc,
                      className: "header-ava",
                      size: "home" !== n || a ? 32 : 36,
                      withBackgroundColor: i,
                    },
                    e.id
                  )
                ),
              }),
            ],
          });
        };
        const ja = {
            name: "1r6ojlw",
            styles:
              "font-weight:600;margin:0;display:inline-block;position:relative;max-width:calc(100% - 145px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;vertical-align:bottom;font-size:16px;line-height:19px;flex-grow:1",
          },
          La = {
            name: "1eatbq3",
            styles:
              "flex-grow:1;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-items:center;svg{height:16px;width:16px;}",
          },
          za = { name: "4zleql", styles: "display:block" };
        var Ua = () => {
          const { assignedOperatorsData: e, assignedOperatorsNames: t } = Ma(),
            n = (0, r.d4)(C.mm),
            i = (0, r.d4)(C.Ld),
            a = (0, r.d4)(C.O1),
            { isNewSkin: o } = (0, p.A)(),
            s = ut(o);
          return e.length
            ? (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)(Oa, { operators: e, openTab: a }),
                  (0, $.FD)("h2", {
                    css: [ja, s.text14Medium, "", ""],
                    children: [
                      !o &&
                        (0, $.FD)("span", {
                          css: za,
                          children: [
                            (0, $.Y)(_n, {
                              value: "chatWith",
                              fallback: "Chat with",
                            }),
                            " ",
                          ],
                        }),
                      t,
                    ],
                  }),
                ],
              })
            : i
            ? (0, $.Y)("div", {
                css: [La, s.text14Medium, "", ""],
                children: (0, $.Y)(_n, {
                  value: "newWidgetHeaderText",
                  fallback: "\xa0",
                  emojify: !0,
                }),
              })
            : (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)(Oa, { operators: n, openTab: a }),
                  (0, $.Y)("div", {
                    css: [La, s.text14Medium, "", ""],
                    children: (0, $.Y)(_n, {
                      value: "newWidgetHeaderText",
                      fallback: "\xa0",
                      emojify: !0,
                    }),
                  }),
                ],
              });
        };
        const Pa = {
          name: "88ql9n",
          styles: "@media (max-height: 899px){display:none!important;}",
        };
        var Ba = (e) => {
          let { chatViewRef: t } = e;
          const n = (0, r.d4)(C.Ny),
            [i, o] = (0, a.useState)(!1);
          return n
            ? null
            : i
            ? (0, $.FD)("button", {
                type: "button",
                css: [Ta, Fa, Pa, "", ""],
                "aria-label": (0, y.pw)("collapse", null, "Collapse"),
                onClick: () => {
                  t.current?.style.setProperty("height", "700px"), o(!1);
                },
                children: [
                  (0, $.Y)(st.dL, {}),
                  (0, $.Y)("span", {
                    children: (0, y.pw)("collapse", null, "Collapse"),
                  }),
                ],
              })
            : (0, $.FD)("button", {
                type: "button",
                css: [Ta, Fa, Pa, "", ""],
                "aria-label": (0, y.pw)("expand", null, "Expand"),
                onClick: () => {
                  t.current?.style.setProperty("height", "100%"), o(!0);
                },
                children: [
                  (0, $.Y)(st.mS, {}),
                  (0, $.Y)("span", {
                    children: (0, y.pw)("expand", null, "Expand"),
                  }),
                ],
              });
        };
        var Ha = {
          options: {
            name: "1yydxi7",
            styles: "display:flex;align-items:center;gap:8px",
          },
          optionsChatOld: { name: "4zum04", styles: "margin-top:-4px" },
          optionsButtons: {
            name: "1k54ymq",
            styles:
              "height:40px;margin-inline-start:auto;margin-inline-end:-12px;display:flex;flex-direction:row-reverse;align-items:center;.mobile &{margin-inline-end:0;}",
          },
          wave: {
            name: "3bd17z",
            styles:
              "@media (min-width: 594px){display:none;}svg{position:absolute;width:calc(100% + 10px);bottom:-12px;left:-4px;}",
          },
          backButton: {
            name: "fv54go",
            styles:
              "margin-inline-start:-14px;span{top:50%;inset-inline-start:calc(100% + 4px);margin-inline-start:unset;inset-inline-end:unset;transform:translate(-5px, -50%);}@media (hover: hover){&:hover span{opacity:1;transform:translate(0, -50%);}}",
          },
          getBannerStyles: (e) =>
            (0, d.AH)(
              {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                opacity: 0.16,
                backgroundSize: "cover",
                backgroundImage: `url(${e})`,
              },
              "",
              ""
            ),
          header: {
            name: "li9nkz",
            styles:
              "padding:20px 20px 16px;--custom-text-color:#647495;color:var(--custom-text-color);.header-ava{width:24px !important;height:24px !important;}",
          },
          getNewHomeHeader: (e) =>
            (0, d.AH)(
              {
                height: e ? "206px" : "284px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              },
              "",
              ""
            ),
          newOptions: {
            name: "1dueg2d",
            styles:
              "gap:12px;height:24px;span{color:#080F1A;}h2{color:#080F1A;}",
          },
          newOptionsButtons: {
            name: "1ivgff5",
            styles:
              "margin-inline-end:-2px;.mobile &{margin-inline-end:-12px;}",
          },
          newBackButton: {
            name: "fwkoer",
            styles: "margin-inline:-2px;.mobile &{margin-inline:-12px;}",
          },
        };
        var qa = () => {
          const e = (0, r.wA)(),
            { isNewSkin: t } = (0, p.A)(),
            n = (0, a.useRef)(!1);
          return (
            (0, a.useEffect)(
              () => () => {
                n.current &&
                  window.tidioChatApi?.trigger("headerCloseHover", {
                    type: "off",
                  });
              },
              []
            ),
            (0, $.FD)("button", {
              className: "ripple",
              onClick: () => {
                e((0, k.pO6)(rt.X.chatClosed)),
                  e((0, k.Hzh)(!1)),
                  e((0, k.npw)(!1));
              },
              onMouseEnter: () => {
                (n.current = !0),
                  window.tidioChatApi?.trigger("headerCloseHover", {
                    type: "on",
                  });
              },
              onMouseLeave: () => {
                (n.current = !1),
                  window.tidioChatApi?.trigger("headerCloseHover", {
                    type: "off",
                  });
              },
              type: "button",
              "aria-label": (0, y.pw)("minimize", null, "Minimize"),
              css: [Ta, Fa, "", ""],
              children: [
                t ? (0, $.Y)(st.bm, {}) : (0, $.Y)(st.yQ, {}),
                (0, $.Y)("span", {
                  children: (0, y.pw)("minimize", null, "Minimize"),
                }),
              ],
            })
          );
        };
        const $a = {
          name: "1w8zgy4",
          styles: "display:flex;width:100%;font-size:15px;margin-top:12px",
        };
        var Va = () => {
          const e = (0, r.d4)((e) => e.isProjectOnline);
          return (e && !(0, y.pw)("weAreOnline")) ||
            (!e && !(0, y.pw)("alwaysOnlineTopBar"))
            ? null
            : (0, $.Y)("div", {
                css: $a,
                children: e
                  ? (0, $.Y)("span", {
                      children: (0, $.Y)(_n, {
                        value: "weAreOnline",
                        emojify: !0,
                      }),
                    })
                  : (0, $.Y)("span", {
                      children: (0, $.Y)(_n, {
                        value: "alwaysOnlineTopBar",
                        emojify: !0,
                      }),
                    }),
              });
        };
        const Wa = (e) => {
          let { showCloseButton: t, chatViewRef: n } = e;
          const i = (0, r.wA)(),
            { isNewSkin: a } = (0, p.A)(),
            o = () => {
              i((0, k.q7v)("home")),
                i((0, k.pO6)(rt.X.goBackToConversationStartersClicked));
            };
          return a
            ? (0, $.Y)("div", {
                css: Ha.header,
                children: (0, $.FD)("div", {
                  css: [Ha.options, Ha.newOptions, "", ""],
                  children: [
                    (0, $.FD)("button", {
                      type: "button",
                      onClick: o,
                      css: [Ta, Fa, Ha.backButton, Ha.newBackButton, "", ""],
                      children: [
                        (0, $.Y)(st.DM, {}),
                        (0, $.Y)("span", {
                          children: (0, y.pw)("goBack", null, "Go back"),
                        }),
                      ],
                    }),
                    (0, $.Y)(Ua, {}),
                    (0, $.FD)("div", {
                      css: [Ha.optionsButtons, Ha.newOptionsButtons, "", ""],
                      children: [
                        t && (0, $.Y)(qa, {}),
                        (0, $.Y)(Ia, {}),
                        n && (0, $.Y)(Ba, { chatViewRef: n }),
                      ],
                    }),
                  ],
                }),
              })
            : (0, $.FD)("div", {
                className: "chat-header",
                children: [
                  (0, $.FD)("div", {
                    css: [Ha.options, Ha.optionsChatOld, "", ""],
                    children: [
                      (0, $.FD)("button", {
                        type: "button",
                        className: "ripple",
                        onClick: o,
                        css: [Ta, Fa, Ha.backButton, "", ""],
                        children: [
                          (0, $.Y)(st.JG, {}),
                          (0, $.Y)("span", {
                            children: (0, y.pw)("goBack", null, "Go back"),
                          }),
                        ],
                      }),
                      (0, $.Y)(Ua, {}),
                      (0, $.FD)("div", {
                        css: Ha.optionsButtons,
                        children: [t && (0, $.Y)(qa, {}), (0, $.Y)(Ia, {})],
                      }),
                    ],
                  }),
                  (0, $.Y)(Va, {}),
                  (0, $.Y)("div", {
                    css: Ha.wave,
                    children: (0, $.Y)(st.wH, {}),
                  }),
                ],
              });
        };
        var Ka = (e) => {
          let { chatViewRef: t } = e;
          const n = (0, r.d4)(C.Tw),
            i = (0, r.d4)((e) => e.isMobile),
            { isNewSkin: a } = (0, p.A)(),
            o = (0, r.d4)(C.em),
            { state: s } = (0, Ei.lz)(),
            l = s?.offer,
            d = o && !((!i && (n || a)) || l);
          return (0, $.Y)(Wa, { showCloseButton: d, chatViewRef: t });
        };
        const Ga = {
            name: "1ypjua1",
            styles:
              "display:flex;flex-direction:column;gap:12px;font-size:16px;line-height:20px",
          },
          Xa = {
            name: "1t6df5q",
            styles:
              "color:currentColor;margin:4px 0 0 0;padding:0;display:inline-block;position:relative;font-size:32px;line-height:40px;font-weight:500;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;vertical-align:bottom;.emoji{width:31px;height:31px;}",
          },
          Qa = (e) =>
            (0, d.AH)(
              {
                display: "-webkit-box",
                WebkitLineClamp: e ? 4 : 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingBottom: 2,
              },
              "",
              ""
            );
        var Za = () => {
          const e = (0, r.d4)((e) => e.isMobile),
            { isNewSkin: t } = (0, p.A)(),
            n = ut(t);
          return t
            ? (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)("div", { style: { height: e ? 12 : 0 } }),
                  (0, $.FD)("div", {
                    css: Ga,
                    children: [
                      (0, $.Y)("h2", {
                        css: [Xa, n.text24Bold, "", ""],
                        children: (0, $.Y)(_n, {
                          value: "newWidgetHeaderText",
                          fallback: "Chat with us",
                          emojify: !0,
                        }),
                      }),
                      (0, $.Y)("div", {
                        css: Qa(e),
                        children: (0, $.Y)(_n, {
                          value: "welcomeMessage",
                          emojify: !0,
                        }),
                      }),
                    ],
                  }),
                ],
              })
            : (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)("div", { style: { height: e ? 12 : 28 } }),
                  (0, $.FD)("div", {
                    css: Ga,
                    children: [
                      (0, $.Y)("h2", {
                        css: [Xa, n.text24Bold, "", ""],
                        children: (0, $.Y)(_n, {
                          value: "newWidgetHeaderText",
                          fallback: "Chat with us",
                          emojify: !0,
                        }),
                      }),
                      (0, $.Y)(_n, { value: "welcomeMessage", emojify: !0 }),
                    ],
                  }),
                ],
              });
        };
        var Ja = () => {
          const e = (0, r.d4)(C.mm),
            t = (0, r.d4)(C.Ld),
            n = (0, r.d4)(C.O1),
            { isNewSkin: i } = (0, p.A)();
          return t
            ? (0, $.Y)(Oa, {
                operators: [{ id: 1, avatarSrc: t, isOnline: !1 }],
                openTab: n,
                withBackgroundColor: i,
              })
            : (0, $.Y)(Oa, { operators: e, openTab: n });
        };
        const {
            options: eo,
            optionsButtons: to,
            newOptionsButtons: no,
            getNewHomeHeader: io,
            getBannerStyles: ao,
            wave: oo,
          } = Ha,
          ro = (e) => {
            let { showCloseButton: t } = e;
            const n = (0, r.d4)((e) => e.isMobile),
              i = (0, r.d4)((e) => e.bannerImage),
              { isNewSkin: a } = (0, p.A)();
            return a
              ? (0, $.FD)("div", {
                  className: "chat-header",
                  css: io(n),
                  children: [
                    "" !== i && (0, $.Y)("div", { css: ao(i) }),
                    (0, $.FD)("div", {
                      css: eo,
                      children: [
                        (0, $.Y)(Ja, {}),
                        (0, $.FD)("div", {
                          css: [to, no, "", ""],
                          children: [t && (0, $.Y)(qa, {}), (0, $.Y)(Ia, {})],
                        }),
                      ],
                    }),
                    (0, $.FD)("div", {
                      children: [
                        (0, $.Y)(Za, {}),
                        (0, $.Y)("div", { style: { height: n ? 12 : 28 } }),
                      ],
                    }),
                  ],
                })
              : (0, $.FD)("div", {
                  className: "chat-header",
                  children: [
                    "" !== i && (0, $.Y)("div", { css: ao(i) }),
                    (0, $.FD)("div", {
                      css: eo,
                      children: [
                        (0, $.Y)(Ja, {}),
                        (0, $.FD)("div", {
                          css: to,
                          children: [t && (0, $.Y)(qa, {}), (0, $.Y)(Ia, {})],
                        }),
                      ],
                    }),
                    (0, $.Y)(Za, {}),
                    (0, $.Y)("div", { style: { height: n ? 12 : 40 } }),
                    (0, $.Y)("div", { css: oo, children: (0, $.Y)(st.wH, {}) }),
                  ],
                });
          };
        var so = () => {
          const e = (0, r.d4)(C.Tw),
            t = (0, r.d4)((e) => e.isMobile),
            { isNewSkin: n } = (0, p.A)(),
            { state: i } = (0, Ei.lz)(),
            a = (0, r.d4)(C.em),
            o = i?.offer,
            s = a && !((!t && (e || n)) || o);
          return (0, $.Y)(ro, { showCloseButton: s });
        };
        const lo = {
            name: "1i9lmgb",
            styles:
              "position:absolute;top:8px;right:8px;left:8px;display:flex;align-items:center;justify-content:flex-end;z-index:1",
          },
          co = {
            name: "16n5gor",
            styles:
              "background-color:#fff;box-shadow:0 8px 20px 0 #001b473d;min-width:44px;height:44px;border-radius:99px;display:flex;align-items:center;justify-content:center;svg{fill:#080f1a;width:28px;height:28px;}",
          },
          uo = {
            name: "dlfiru",
            styles:
              "margin-inline-end:auto;padding:8px 16px 8px 8px;font-size:15px",
          };
        var po = () => {
          const e = (0, r.wA)(),
            { isNewSkin: t } = (0, p.A)();
          return (0, $.FD)("div", {
            css: lo,
            children: [
              (0, $.FD)("button", {
                type: "button",
                onClick: () => {
                  e((0, k.q7v)("home")),
                    e((0, k.pO6)(rt.X.goBackToConversationStartersClicked)),
                    e((0, k.E3S)(!1));
                },
                css: [co, uo, "", ""],
                children: [
                  t ? (0, $.Y)(st.DM, {}) : (0, $.Y)(st.JG, {}),
                  (0, y.pw)("goBack", null, "Go back"),
                ],
              }),
              (0, $.Y)("button", {
                type: "button",
                onClick: () => {
                  e((0, k.pO6)(rt.X.chatClosed)),
                    e((0, k.Hzh)(!1)),
                    e((0, k.npw)(!1));
                },
                css: co,
                "aria-label": (0, y.pw)("minimize", null, "Minimize"),
                children: (0, $.Y)(st.yQ, {}),
              }),
            ],
          });
        };
        var fo = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)(C.K7),
            n = (0, r.d4)((e) => e.getStartedActive),
            i = !(0, f.MI)() && n && t;
          return {
            isFlowsLauncherActive: i,
            handleTabChange: (t) => {
              i && e((0, k.qbo)()), e((0, k.q7v)(t));
            },
          };
        };
        const mo = { default: "#06132B", subdued: "#4C596B" },
          ho = (e) => {
            let {
              align: t,
              color: n,
              size: i,
              weight: a,
              numberOfLines: o,
            } = e;
            return (0, d.AH)(
              {
                fontSize: i,
                fontWeight: a,
                ...(t && { textAlign: t }),
                ...(n && { color: mo[n] }),
                ...(o && {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: o,
                  WebkitBoxOrient: "vertical",
                }),
                "@media (hover: hover)": {
                  "&:hover .tooltip": {
                    visibility: "visible",
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              },
              "",
              ""
            );
          },
          go = (0, d.AH)(
            {
              position: "fixed",
              color: mo.default,
              backgroundColor: "#fff",
              padding: "5px 8px",
              marginLeft: "16px",
              borderRadius: "4px",
              fontSize: "14px",
              textAlign: "center",
              lineHeight: "18px",
              visibility: "hidden",
              opacity: 0,
              transform: "translateY(5px)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              boxShadow: "0px 8px 20px 0px rgba(0, 27, 71, 0.24)",
              zIndex: 1e3,
              pointerEvents: "none",
              width: 256,
            },
            "",
            ""
          );
        var bo = (e) => {
          let {
            align: t = "left",
            color: n = "default",
            numberOfLines: i,
            size: o = 14,
            weight: r = 400,
            children: s,
            className: l,
          } = e;
          const d = (0, a.useRef)(null),
            [c, u] = (0, a.useState)(!1),
            [p, f] = (0, a.useState)(0),
            m = (0, a.useCallback)(() => {
              const e = d.current;
              if (e) {
                const t =
                  e.scrollHeight > e.clientHeight ||
                  e.scrollWidth > e.clientWidth;
                if ((u(t), t)) {
                  const t = e.getBoundingClientRect();
                  f(t.top + t.height / 2);
                }
              }
            }, []);
          return i
            ? (0, $.FD)("span", {
                css: ho({
                  align: t,
                  color: n,
                  numberOfLines: i,
                  size: o,
                  weight: r,
                }),
                ref: d,
                onMouseEnter: m,
                className: l,
                children: [
                  s,
                  c &&
                    (0, $.Y)("div", {
                      css: [go, { top: `${p}px` }, "", ""],
                      className: "tooltip",
                      children: s,
                    }),
                ],
              })
            : (0, $.Y)("span", {
                css: ho({
                  align: t,
                  color: n,
                  numberOfLines: i,
                  size: o,
                  weight: r,
                }),
                className: l,
                children: s,
              });
        };
        const vo = "#E2E8EF",
          xo = (0, d.AH)(
            {
              display: "flex",
              paddingInline: 16,
              paddingBlock: "var(--starter-padding-block, 16px)",
              alignItems: "center",
              gap: "8px",
              justifyContent: "space-between",
              width: "100%",
              background: "transparent",
              ":hover": {
                background: "var(--custom-action-color-hover, #EFF2F6)",
                outline: `1px solid ${vo}`,
              },
              ":focus": { outline: "none" },
              svg: {
                fill: "currentColor",
                width: 20,
                height: 20,
                flexShrink: 0,
              },
            },
            "",
            ""
          ),
          yo = (0, d.AH)(
            {
              width: "calc(100% - 32px)",
              borderBottom: `1px solid ${vo}`,
              margin: "0 16px",
            },
            "",
            ""
          );
        var wo = (e) => {
          let { starter: t, shouldDisplayDivider: n } = e;
          const i = (0, r.wA)(),
            { isNewSkin: o } = (0, p.A)(),
            s = ut(o),
            l = (0, a.useCallback)(
              (e) => {
                i((0, k.G8c)(e)),
                  i((0, k.q7v)("conversations")),
                  i((0, k.pO6)(rt.X.conversationStarterClicked));
              },
              [i]
            );
          return (0, $.FD)(
            a.Fragment,
            {
              children: [
                (0, $.FD)(
                  "button",
                  {
                    type: "button",
                    css: xo,
                    onClick: () => l(t.answer),
                    children: [
                      (0, $.Y)(bo, {
                        size: 15,
                        numberOfLines: 3,
                        css: s.text14Medium,
                        children: t.answer,
                      }),
                      (0, $.Y)(st.c_, {}),
                    ],
                  },
                  t.id
                ),
                n && (0, $.Y)("div", { css: yo }),
              ],
            },
            t.id
          );
        };
        const ko = "#E2E8EF",
          Ao = {
            name: "udr6bw",
            styles:
              "flex:1;width:100%;overflow-y:auto;background:transparent;display:flex;flex-direction:column;z-index:9;padding-inline:var(--chat-padding, 24px)",
          },
          Co = (0, d.AH)(
            {
              display: "flex",
              width: "100%",
              borderRadius: "var(--radius-component, 12px)",
              border: `1px solid ${ko}`,
              overflowY: "hidden",
              marginBottom: "var(--starters-gap, 16px)",
            },
            "",
            ""
          ),
          Eo = {
            name: "1xlk8dj",
            styles:
              "display:flex;flex-direction:column;align-items:center;width:100%;background:#fff;overflow-y:auto",
          },
          So = {
            name: "vwua2d",
            styles:
              "border-radius:var(--radius-component, 12px);background:#fff",
          },
          Do = (0, d.AH)(
            {
              minHeight: 60,
              display: "flex",
              paddingInline: "16px",
              paddingBlock: "var(--starter-chat-padding-block, 12px)",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              borderRadius: "var(--radius-component, 12px)",
              border: `1px solid ${ko}`,
              background: "#fff",
              ":hover": {
                background: "var(--custom-action-color-hover, #EFF2F6)",
              },
              ":focus": { outline: "none" },
              svg: {
                width: 20,
                height: 20,
                flexShrink: 0,
                fill: "var(--custom-action-color, #0566FF)",
              },
            },
            "",
            ""
          ),
          Yo = {
            name: "maz22t",
            styles:
              "display:flex;flex-direction:column;align-items:flex-start;gap:2px;flex-grow:1",
          },
          To = {
            name: "1msgo5n",
            styles: "font-weight:600;font-size:15px;line-height:19px",
          },
          Fo = {
            name: "z5ckn2",
            styles:
              "display:flex;flex:0 0 48px;justify-content:center;align-items:center",
          },
          _o = { name: "crrems", styles: "flex:1 100 16px" },
          Io = { name: "13ti9pc", styles: "flex:0 100 16px" },
          Mo = { name: "fszdmc", styles: "flex:0 0 16px" },
          No = () => {
            const e = (0, r.d4)(C.HE),
              t = (0, r.d4)(C.F_),
              n = (0, r.d4)((e) => e.isMobile),
              { isNewSkin: i } = (0, p.A)();
            return i
              ? null
              : (0, $.FD)($.FK, {
                  children: [
                    !t && !e && (0, $.Y)("div", { css: Mo }),
                    (t || Boolean(e)) &&
                      (0, $.FD)($.FK, {
                        children: [
                          (0, $.Y)("div", { css: n ? Io : _o }),
                          (0, $.Y)("div", {
                            css: Fo,
                            children: (0, $.Y)($i, {}),
                          }),
                        ],
                      }),
                  ],
                });
          };
        var Ro = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)(C.Q5),
            n = (0, r.d4)((e) => e.isMobile),
            i = (0, r.d4)((e) => e.isProjectOnline),
            { isFlowsLauncherActive: o, handleTabChange: s } = fo(),
            { isNewSkin: l } = (0, p.A)(),
            d = ut(l);
          (0, a.useEffect)(() => {
            e((0, k.oOm)(n ? tt.NO.MOBILE : tt.NO.CHAT_SIZE_1));
          }, [e, n]),
            (0, a.useEffect)(() => {
              e((0, k.pO6)(rt.X.homeTabVisible));
            }, [e]);
          const c = (0, y.pw)(i ? "weAreOnline" : "alwaysOnlineTopBar");
          let u = l ? -30 : -40;
          return (
            n && (u = 12),
            (0, $.FD)("div", {
              css: Ao,
              style: { marginTop: u, maxHeight: n ? "none" : 434 },
              children: [
                n && (0, $.Y)("div", { style: { flex: 1 } }),
                t &&
                  t?.length > 0 &&
                  (0, $.Y)("div", {
                    css: Co,
                    children: (0, $.Y)("div", {
                      css: Eo,
                      children: t.map((e, n) =>
                        (0, $.Y)(
                          wo,
                          {
                            starter: e,
                            shouldDisplayDivider: n !== t.length - 1,
                          },
                          e.id
                        )
                      ),
                    }),
                  }),
                (0, $.Y)("div", {
                  css: So,
                  children: (0, $.FD)("button", {
                    type: "button",
                    css: Do,
                    onClick: () => {
                      o || e((0, k.pO6)(rt.X.chatWithUsHomeTabClicked)),
                        s("conversations");
                    },
                    children: [
                      (0, $.FD)("div", {
                        css: Yo,
                        children: [
                          (0, $.Y)("span", {
                            css: [To, d.text14Medium, "", ""],
                            children: o
                              ? (0, $.Y)(_n, {
                                  value: "getStarted",
                                  fallback: "Get started",
                                })
                              : (0, $.Y)(_n, {
                                  value: "headerText",
                                  fallback: "Chat with us",
                                }),
                          }),
                          !o &&
                            Boolean(c) &&
                            (0, $.Y)(bo, {
                              color: "subdued",
                              numberOfLines: 2,
                              css: d.text12,
                              children: i
                                ? (0, $.Y)(_n, {
                                    value: "weAreOnline",
                                    emojify: !0,
                                  })
                                : (0, $.Y)(_n, {
                                    value: "alwaysOnlineTopBar",
                                    emojify: !0,
                                  }),
                            }),
                        ],
                      }),
                      (0, $.Y)(st.qx, {}),
                    ],
                  }),
                }),
                (0, $.Y)(No, {}),
              ],
            })
          );
        };
        const Oo = "#fff",
          jo = (0, d.AH)(
            {
              backgroundColor: Oo,
              display: "flex",
              flexDirection: "column",
              paddingInline: "var(--chat-padding, 24px)",
            },
            "",
            ""
          ),
          Lo = {
            name: "1lue7n9",
            styles:
              "display:flex;flex:1;flex-direction:column;align-items:center;gap:2px;font-size:15px;font-weight:600;:focus{outline:none;}svg{width:28px;height:28px;}",
          },
          zo = (0, d.AH)(
            Lo,
            "position:relative;svg{width:24px;height:24px;}& .newMessage{right:50px;bottom:30px;}",
            ""
          ),
          Uo = {
            name: "8onez6",
            styles:
              "color:#647491;svg{.outline{opacity:1;}.fill{opacity:0;}}&:hover{color:initial;svg{.outline{opacity:0;}.fill{opacity:1;}}}",
          },
          Po = {
            name: "1h33bll",
            styles:
              "position:absolute;right:92px;bottom:46px;font-weight:700;color:#fff;pointer-events:none;border-radius:10px;display:flex;justify-content:center;align-items:center;width:20px;height:20px;font-size:12px;background:#e81332;z-index:2;line-height:1",
          },
          Bo = {
            name: "1ac6e43",
            styles:
              "display:flex;align-items:center;justify-content:center;height:40px;flex:0 0 40px;border-top:1px solid #E2E8EF",
          };
        var Ho = () => {
            const e = (0, r.wA)(),
              t = (0, r.d4)((e) => e.unreadMessages),
              n = (0, r.d4)((e) => e.isMobile),
              i = (0, r.d4)(C.F_),
              a = (0, r.d4)(C.HE),
              { isNewSkin: o } = (0, p.A)(),
              s = ut(o),
              { handleTabChange: l } = fo();
            return (0, $.FD)($.FK, {
              children: [
                (0, $.Y)("div", {
                  css: jo,
                  children: (0, $.FD)("div", {
                    css:
                      ((c = o),
                      (0, d.AH)(
                        {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          gap: 4,
                          alignSelf: "stretch",
                          borderTop:
                            "1px solid " + (c ? "transparent" : "#E2E8EF"),
                          backgroundColor: Oo,
                        },
                        "",
                        ""
                      )),
                    style: { padding: n ? "10px 20px" : "12px 20px" },
                    children: [
                      (0, $.FD)("button", {
                        css: [o ? zo : Lo, s.text12Medium, "", ""],
                        type: "button",
                        onClick: () => {
                          l("home");
                        },
                        children: [
                          (0, $.Y)(st.fA, {}),
                          (0, $.Y)(_n, { value: "home", fallback: "Home" }),
                        ],
                      }),
                      (0, $.FD)("button", {
                        css: [o ? zo : Lo, Uo, s.text12Medium, "", ""],
                        type: "button",
                        onClick: () => {
                          l("conversations"),
                            e((0, k.pO6)(rt.X.chatTabClicked));
                        },
                        children: [
                          (0, $.Y)(st.oy, {}),
                          (0, $.Y)(_n, { value: "chat", fallback: "Chat" }),
                          t > 0 &&
                            (0, $.Y)("div", {
                              className: "newMessage",
                              css: Po,
                              children: t <= 9 ? t : "9+",
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                o &&
                  (i || Boolean(a)) &&
                  (0, $.Y)("div", { css: Bo, children: (0, $.Y)($i, {}) }),
              ],
            });
            var c;
          },
          qo = n(5923);
        var $o = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)(C.wn);
          return (
            (0, a.useEffect)(() => {
              const t = setTimeout(() => {
                e((0, k.Hd$)());
              }, 6e3);
              return () => {
                null !== t && clearTimeout(t);
              };
            }, [e]),
            (0, $.FD)("div", {
              className: "message message-operator message-alert",
              role: "alert",
              "aria-live": "assertive",
              "aria-atomic": "true",
              children: [(0, $.Y)(st.Fc, {}), t],
            })
          );
        };
        const Vo = (e) => {
            if (!e) return null;
            const t = [
              /(?:youtube\.com\/watch\?.*v=|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
              /youtu\.be\/([a-zA-Z0-9_-]{11})/,
              /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
              /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
            ];
            for (const n of t) {
              const t = e.match(n);
              if (t?.[1]) return t[1];
            }
            return null;
          },
          Wo = (e) => {
            if (!e) return null;
            const t =
                /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^\s)]+|youtube\.com\/embed\/[^\s)]+|youtube\.com\/v\/[^\s)]+|youtu\.be\/[^\s)]+)/.exec(
                  e
                ),
              n = t?.[0];
            return n && Vo(n) ? n : null;
          };
        var Ko = () => {
          const e = (0, r.d4)(C.he);
          return (0, $.FD)("div", {
            className: "message message-operator always-online",
            children: [
              (0, $.Y)(_n, {
                value: "alwaysOnlineEngageMessage",
                emojify: !0,
                linkify: !0,
              }),
              (0, $.Y)(On, {
                type: "email",
                placeholder: "preformInput_email",
                value: e,
                disabled: !0,
              }),
            ],
          });
        };
        const Go = (e) => {
            let { spanRef: t, wrapperRef: n, minWidth: i } = e;
            const a = (0, h.AL)();
            t &&
              a &&
              a.requestAnimationFrame(() => {
                const e = (t.current?.offsetWidth ?? 0) + 35,
                  a = i ? Math.max(e, i) : e;
                n.current?.style.setProperty("width", `${a}px`);
              });
          },
          Xo = (e) => Sn(e),
          Qo = (e) => {
            const {
              host: t,
              pathname: n,
              search: i,
              hash: a,
            } = (0, f.Dl)(e) || {};
            return `${t}${n}${i}${a}`;
          },
          Zo = (e) =>
            "[object HTMLImageElement]" === Object.prototype.toString.call(e);
        const Jo = (e) =>
            (0, d.AH)(
              {
                position: "absolute",
                bottom: e ? -37 : -31,
                left: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: 260,
              },
              "",
              ""
            ),
          er = (e) =>
            (0, d.AH)(
              { fontSize: 12, marginTop: e ? 6 : 11, marginRight: 8 },
              "",
              ""
            );
        var tr = {
            name: "11tx334",
            styles:
              "position:relative;display:flex;align-items:center;justify-content:space-between;padding:0px 7px;width:77px;height:40px;background-color:#F0F2F7;border:3px solid white;border-radius:20px;box-shadow:0px 3px 8px rgba(0, 18, 46, 0.12);::before{content:'';position:absolute;left:35px;width:1px;height:20px;background-color:#C9D1DD;}",
          },
          nr = {
            name: "7etox3",
            styles:
              "position:relative;display:flex;align-items:center;justify-content:space-between;width:100px;height:48px",
          };
        const ir = (e) => (e ? nr : tr),
          ar = (e, t, n) =>
            n
              ? (0, d.AH)(
                  {
                    outline: "none",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "#F0F2F7",
                    boxShadow: "0px 3px 8px 0px rgba(0, 27, 71, 0.08)",
                    border: "3px solid white",
                    svg: {
                      fill: e ? "#ACB8CB" : "#0566ff",
                      height: 22,
                      width: 22,
                    },
                  },
                  "",
                  ""
                )
              : (0, d.AH)(
                  {
                    position: "relative",
                    cursor: t ? "initial" : "pointer",
                    outline: "none",
                    "::before": {
                      content: "''",
                      position: "absolute",
                      backgroundColor: "rgba(0,125,252,0.12)",
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      transition: "all 0.16s ease-in-out",
                      transform: "scale(0)",
                      top: "calc(50% - 17px)",
                      left: "calc(50% - 17px)",
                    },
                    "&:hover::before": {
                      transform: t ? "scale(0)" : "scale(1)",
                    },
                    svg: {
                      fill: e ? "#ACB8CB" : "#0566ff",
                      height: 20,
                      width: 20,
                    },
                  },
                  "",
                  ""
                );
        var or = (e) => {
            const t = (0, r.wA)(),
              n = (0, r.d4)(C.Ny),
              i = (n) => {
                !e.rating &&
                  e.ratingId &&
                  t((0, k.scj)(e.messageId, e.ratingId, n));
              };
            return (0, $.FD)("div", {
              css: Jo(n),
              children: [
                (0, $.Y)("span", {
                  css: er(n),
                  children: (0, $.Y)(_n, {
                    value: "ratingLabel",
                    fallback: "Was this helpful?",
                  }),
                }),
                (0, $.FD)("div", {
                  css: ir(n),
                  children: [
                    (0, $.Y)("button", {
                      type: "button",
                      "aria-label": "yes",
                      onClick: () => i("yes"),
                      css: ar("no" === e.rating, Boolean(e.rating), n),
                      children:
                        "yes" === e.rating
                          ? (0, $.Y)(st.km, {})
                          : (0, $.Y)(st.Sq, {}),
                    }),
                    (0, $.Y)("button", {
                      type: "button",
                      "aria-label": "no",
                      onClick: () => i("no"),
                      css: ar("yes" === e.rating, Boolean(e.rating), n),
                      children:
                        "no" === e.rating
                          ? (0, $.Y)(st.tF, {})
                          : (0, $.Y)(st.Ll, {}),
                    }),
                  ],
                }),
              ],
            });
          },
          rr = n(2284);
        function sr(e, t) {
          if (t.length < e)
            throw new TypeError(
              e +
                " argument" +
                (e > 1 ? "s" : "") +
                " required, but only " +
                t.length +
                " present"
            );
        }
        function lr(e) {
          sr(1, arguments);
          var t = Object.prototype.toString.call(e);
          return e instanceof Date ||
            ("object" === (0, rr.A)(e) && "[object Date]" === t)
            ? new Date(e.getTime())
            : "number" == typeof e || "[object Number]" === t
            ? new Date(e)
            : (("string" != typeof e && "[object String]" !== t) ||
                "undefined" == typeof console ||
                (console.warn(
                  "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"
                ),
                console.warn(new Error().stack)),
              new Date(NaN));
        }
        function dr(e) {
          sr(1, arguments);
          var t = lr(e);
          return t.setHours(0, 0, 0, 0), t;
        }
        function cr(e, t) {
          sr(2, arguments);
          var n = dr(e),
            i = dr(t);
          return n.getTime() === i.getTime();
        }
        function ur(e) {
          if (null === e || !0 === e || !1 === e) return NaN;
          var t = Number(e);
          return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
        }
        function pr(e, t) {
          return (
            sr(2, arguments),
            (function (e, t) {
              sr(2, arguments);
              var n = lr(e),
                i = ur(t);
              return isNaN(i)
                ? new Date(NaN)
                : i
                ? (n.setDate(n.getDate() + i), n)
                : n;
            })(e, -ur(t))
          );
        }
        function fr(e) {
          if (
            (sr(1, arguments),
            !(function (e) {
              return (
                sr(1, arguments),
                e instanceof Date ||
                  ("object" === (0, rr.A)(e) &&
                    "[object Date]" === Object.prototype.toString.call(e))
              );
            })(e) && "number" != typeof e)
          )
            return !1;
          var t = lr(e);
          return !isNaN(Number(t));
        }
        function mr(e, t) {
          return (
            sr(2, arguments),
            (function (e, t) {
              sr(2, arguments);
              var n = lr(e).getTime(),
                i = ur(t);
              return new Date(n + i);
            })(e, -ur(t))
          );
        }
        function hr(e) {
          sr(1, arguments);
          var t = lr(e),
            n = t.getUTCDay(),
            i = (n < 1 ? 7 : 0) + n - 1;
          return t.setUTCDate(t.getUTCDate() - i), t.setUTCHours(0, 0, 0, 0), t;
        }
        function gr(e) {
          sr(1, arguments);
          var t = lr(e),
            n = t.getUTCFullYear(),
            i = new Date(0);
          i.setUTCFullYear(n + 1, 0, 4), i.setUTCHours(0, 0, 0, 0);
          var a = hr(i),
            o = new Date(0);
          o.setUTCFullYear(n, 0, 4), o.setUTCHours(0, 0, 0, 0);
          var r = hr(o);
          return t.getTime() >= a.getTime()
            ? n + 1
            : t.getTime() >= r.getTime()
            ? n
            : n - 1;
        }
        function br(e) {
          sr(1, arguments);
          var t = lr(e),
            n =
              hr(t).getTime() -
              (function (e) {
                sr(1, arguments);
                var t = gr(e),
                  n = new Date(0);
                return (
                  n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0), hr(n)
                );
              })(t).getTime();
          return Math.round(n / 6048e5) + 1;
        }
        var vr = {};
        function xr() {
          return vr;
        }
        function yr(e, t) {
          var n, i, a, o, r, s, l, d;
          sr(1, arguments);
          var c = xr(),
            u = ur(
              null !==
                (n =
                  null !==
                    (i =
                      null !==
                        (a =
                          null !== (o = null == t ? void 0 : t.weekStartsOn) &&
                          void 0 !== o
                            ? o
                            : null == t ||
                              null === (r = t.locale) ||
                              void 0 === r ||
                              null === (s = r.options) ||
                              void 0 === s
                            ? void 0
                            : s.weekStartsOn) && void 0 !== a
                        ? a
                        : c.weekStartsOn) && void 0 !== i
                    ? i
                    : null === (l = c.locale) ||
                      void 0 === l ||
                      null === (d = l.options) ||
                      void 0 === d
                    ? void 0
                    : d.weekStartsOn) && void 0 !== n
                ? n
                : 0
            );
          if (!(u >= 0 && u <= 6))
            throw new RangeError(
              "weekStartsOn must be between 0 and 6 inclusively"
            );
          var p = lr(e),
            f = p.getUTCDay(),
            m = (f < u ? 7 : 0) + f - u;
          return p.setUTCDate(p.getUTCDate() - m), p.setUTCHours(0, 0, 0, 0), p;
        }
        function wr(e, t) {
          var n, i, a, o, r, s, l, d;
          sr(1, arguments);
          var c = lr(e),
            u = c.getUTCFullYear(),
            p = xr(),
            f = ur(
              null !==
                (n =
                  null !==
                    (i =
                      null !==
                        (a =
                          null !==
                            (o =
                              null == t ? void 0 : t.firstWeekContainsDate) &&
                          void 0 !== o
                            ? o
                            : null == t ||
                              null === (r = t.locale) ||
                              void 0 === r ||
                              null === (s = r.options) ||
                              void 0 === s
                            ? void 0
                            : s.firstWeekContainsDate) && void 0 !== a
                        ? a
                        : p.firstWeekContainsDate) && void 0 !== i
                    ? i
                    : null === (l = p.locale) ||
                      void 0 === l ||
                      null === (d = l.options) ||
                      void 0 === d
                    ? void 0
                    : d.firstWeekContainsDate) && void 0 !== n
                ? n
                : 1
            );
          if (!(f >= 1 && f <= 7))
            throw new RangeError(
              "firstWeekContainsDate must be between 1 and 7 inclusively"
            );
          var m = new Date(0);
          m.setUTCFullYear(u + 1, 0, f), m.setUTCHours(0, 0, 0, 0);
          var h = yr(m, t),
            g = new Date(0);
          g.setUTCFullYear(u, 0, f), g.setUTCHours(0, 0, 0, 0);
          var b = yr(g, t);
          return c.getTime() >= h.getTime()
            ? u + 1
            : c.getTime() >= b.getTime()
            ? u
            : u - 1;
        }
        function kr(e, t) {
          sr(1, arguments);
          var n = lr(e),
            i =
              yr(n, t).getTime() -
              (function (e, t) {
                var n, i, a, o, r, s, l, d;
                sr(1, arguments);
                var c = xr(),
                  u = ur(
                    null !==
                      (n =
                        null !==
                          (i =
                            null !==
                              (a =
                                null !==
                                  (o =
                                    null == t
                                      ? void 0
                                      : t.firstWeekContainsDate) && void 0 !== o
                                  ? o
                                  : null == t ||
                                    null === (r = t.locale) ||
                                    void 0 === r ||
                                    null === (s = r.options) ||
                                    void 0 === s
                                  ? void 0
                                  : s.firstWeekContainsDate) && void 0 !== a
                              ? a
                              : c.firstWeekContainsDate) && void 0 !== i
                          ? i
                          : null === (l = c.locale) ||
                            void 0 === l ||
                            null === (d = l.options) ||
                            void 0 === d
                          ? void 0
                          : d.firstWeekContainsDate) && void 0 !== n
                      ? n
                      : 1
                  ),
                  p = wr(e, t),
                  f = new Date(0);
                return (
                  f.setUTCFullYear(p, 0, u), f.setUTCHours(0, 0, 0, 0), yr(f, t)
                );
              })(n, t).getTime();
          return Math.round(i / 6048e5) + 1;
        }
        function Ar(e, t) {
          for (
            var n = e < 0 ? "-" : "", i = Math.abs(e).toString();
            i.length < t;

          )
            i = "0" + i;
          return n + i;
        }
        var Cr = {
            y: function (e, t) {
              var n = e.getUTCFullYear(),
                i = n > 0 ? n : 1 - n;
              return Ar("yy" === t ? i % 100 : i, t.length);
            },
            M: function (e, t) {
              var n = e.getUTCMonth();
              return "M" === t ? String(n + 1) : Ar(n + 1, 2);
            },
            d: function (e, t) {
              return Ar(e.getUTCDate(), t.length);
            },
            a: function (e, t) {
              var n = e.getUTCHours() / 12 >= 1 ? "pm" : "am";
              switch (t) {
                case "a":
                case "aa":
                  return n.toUpperCase();
                case "aaa":
                  return n;
                case "aaaaa":
                  return n[0];
                default:
                  return "am" === n ? "a.m." : "p.m.";
              }
            },
            h: function (e, t) {
              return Ar(e.getUTCHours() % 12 || 12, t.length);
            },
            H: function (e, t) {
              return Ar(e.getUTCHours(), t.length);
            },
            m: function (e, t) {
              return Ar(e.getUTCMinutes(), t.length);
            },
            s: function (e, t) {
              return Ar(e.getUTCSeconds(), t.length);
            },
            S: function (e, t) {
              var n = t.length,
                i = e.getUTCMilliseconds();
              return Ar(Math.floor(i * Math.pow(10, n - 3)), t.length);
            },
          },
          Er = "midnight",
          Sr = "noon",
          Dr = "morning",
          Yr = "afternoon",
          Tr = "evening",
          Fr = "night",
          _r = {
            G: function (e, t, n) {
              var i = e.getUTCFullYear() > 0 ? 1 : 0;
              switch (t) {
                case "G":
                case "GG":
                case "GGG":
                  return n.era(i, { width: "abbreviated" });
                case "GGGGG":
                  return n.era(i, { width: "narrow" });
                default:
                  return n.era(i, { width: "wide" });
              }
            },
            y: function (e, t, n) {
              if ("yo" === t) {
                var i = e.getUTCFullYear(),
                  a = i > 0 ? i : 1 - i;
                return n.ordinalNumber(a, { unit: "year" });
              }
              return Cr.y(e, t);
            },
            Y: function (e, t, n, i) {
              var a = wr(e, i),
                o = a > 0 ? a : 1 - a;
              return "YY" === t
                ? Ar(o % 100, 2)
                : "Yo" === t
                ? n.ordinalNumber(o, { unit: "year" })
                : Ar(o, t.length);
            },
            R: function (e, t) {
              return Ar(gr(e), t.length);
            },
            u: function (e, t) {
              return Ar(e.getUTCFullYear(), t.length);
            },
            Q: function (e, t, n) {
              var i = Math.ceil((e.getUTCMonth() + 1) / 3);
              switch (t) {
                case "Q":
                  return String(i);
                case "QQ":
                  return Ar(i, 2);
                case "Qo":
                  return n.ordinalNumber(i, { unit: "quarter" });
                case "QQQ":
                  return n.quarter(i, {
                    width: "abbreviated",
                    context: "formatting",
                  });
                case "QQQQQ":
                  return n.quarter(i, {
                    width: "narrow",
                    context: "formatting",
                  });
                default:
                  return n.quarter(i, { width: "wide", context: "formatting" });
              }
            },
            q: function (e, t, n) {
              var i = Math.ceil((e.getUTCMonth() + 1) / 3);
              switch (t) {
                case "q":
                  return String(i);
                case "qq":
                  return Ar(i, 2);
                case "qo":
                  return n.ordinalNumber(i, { unit: "quarter" });
                case "qqq":
                  return n.quarter(i, {
                    width: "abbreviated",
                    context: "standalone",
                  });
                case "qqqqq":
                  return n.quarter(i, {
                    width: "narrow",
                    context: "standalone",
                  });
                default:
                  return n.quarter(i, { width: "wide", context: "standalone" });
              }
            },
            M: function (e, t, n) {
              var i = e.getUTCMonth();
              switch (t) {
                case "M":
                case "MM":
                  return Cr.M(e, t);
                case "Mo":
                  return n.ordinalNumber(i + 1, { unit: "month" });
                case "MMM":
                  return n.month(i, {
                    width: "abbreviated",
                    context: "formatting",
                  });
                case "MMMMM":
                  return n.month(i, { width: "narrow", context: "formatting" });
                default:
                  return n.month(i, { width: "wide", context: "formatting" });
              }
            },
            L: function (e, t, n) {
              var i = e.getUTCMonth();
              switch (t) {
                case "L":
                  return String(i + 1);
                case "LL":
                  return Ar(i + 1, 2);
                case "Lo":
                  return n.ordinalNumber(i + 1, { unit: "month" });
                case "LLL":
                  return n.month(i, {
                    width: "abbreviated",
                    context: "standalone",
                  });
                case "LLLLL":
                  return n.month(i, { width: "narrow", context: "standalone" });
                default:
                  return n.month(i, { width: "wide", context: "standalone" });
              }
            },
            w: function (e, t, n, i) {
              var a = kr(e, i);
              return "wo" === t
                ? n.ordinalNumber(a, { unit: "week" })
                : Ar(a, t.length);
            },
            I: function (e, t, n) {
              var i = br(e);
              return "Io" === t
                ? n.ordinalNumber(i, { unit: "week" })
                : Ar(i, t.length);
            },
            d: function (e, t, n) {
              return "do" === t
                ? n.ordinalNumber(e.getUTCDate(), { unit: "date" })
                : Cr.d(e, t);
            },
            D: function (e, t, n) {
              var i = (function (e) {
                sr(1, arguments);
                var t = lr(e),
                  n = t.getTime();
                t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
                var i = n - t.getTime();
                return Math.floor(i / 864e5) + 1;
              })(e);
              return "Do" === t
                ? n.ordinalNumber(i, { unit: "dayOfYear" })
                : Ar(i, t.length);
            },
            E: function (e, t, n) {
              var i = e.getUTCDay();
              switch (t) {
                case "E":
                case "EE":
                case "EEE":
                  return n.day(i, {
                    width: "abbreviated",
                    context: "formatting",
                  });
                case "EEEEE":
                  return n.day(i, { width: "narrow", context: "formatting" });
                case "EEEEEE":
                  return n.day(i, { width: "short", context: "formatting" });
                default:
                  return n.day(i, { width: "wide", context: "formatting" });
              }
            },
            e: function (e, t, n, i) {
              var a = e.getUTCDay(),
                o = (a - i.weekStartsOn + 8) % 7 || 7;
              switch (t) {
                case "e":
                  return String(o);
                case "ee":
                  return Ar(o, 2);
                case "eo":
                  return n.ordinalNumber(o, { unit: "day" });
                case "eee":
                  return n.day(a, {
                    width: "abbreviated",
                    context: "formatting",
                  });
                case "eeeee":
                  return n.day(a, { width: "narrow", context: "formatting" });
                case "eeeeee":
                  return n.day(a, { width: "short", context: "formatting" });
                default:
                  return n.day(a, { width: "wide", context: "formatting" });
              }
            },
            c: function (e, t, n, i) {
              var a = e.getUTCDay(),
                o = (a - i.weekStartsOn + 8) % 7 || 7;
              switch (t) {
                case "c":
                  return String(o);
                case "cc":
                  return Ar(o, t.length);
                case "co":
                  return n.ordinalNumber(o, { unit: "day" });
                case "ccc":
                  return n.day(a, {
                    width: "abbreviated",
                    context: "standalone",
                  });
                case "ccccc":
                  return n.day(a, { width: "narrow", context: "standalone" });
                case "cccccc":
                  return n.day(a, { width: "short", context: "standalone" });
                default:
                  return n.day(a, { width: "wide", context: "standalone" });
              }
            },
            i: function (e, t, n) {
              var i = e.getUTCDay(),
                a = 0 === i ? 7 : i;
              switch (t) {
                case "i":
                  return String(a);
                case "ii":
                  return Ar(a, t.length);
                case "io":
                  return n.ordinalNumber(a, { unit: "day" });
                case "iii":
                  return n.day(i, {
                    width: "abbreviated",
                    context: "formatting",
                  });
                case "iiiii":
                  return n.day(i, { width: "narrow", context: "formatting" });
                case "iiiiii":
                  return n.day(i, { width: "short", context: "formatting" });
                default:
                  return n.day(i, { width: "wide", context: "formatting" });
              }
            },
            a: function (e, t, n) {
              var i = e.getUTCHours() / 12 >= 1 ? "pm" : "am";
              switch (t) {
                case "a":
                case "aa":
                  return n.dayPeriod(i, {
                    width: "abbreviated",
                    context: "formatting",
                  });
                case "aaa":
                  return n
                    .dayPeriod(i, {
                      width: "abbreviated",
                      context: "formatting",
                    })
                    .toLowerCase();
                case "aaaaa":
                  return n.dayPeriod(i, {
                    width: "narrow",
                    context: "formatting",
                  });
                default:
                  return n.dayPeriod(i, {
                    width: "wide",
                    context: "formatting",
                  });
              }
            },
            b: function (e, t, n) {
              var i,
                a = e.getUTCHours();
              switch (
                ((i = 12 === a ? Sr : 0 === a ? Er : a / 12 >= 1 ? "pm" : "am"),
                t)
              ) {
                case "b":
                case "bb":
                  return n.dayPeriod(i, {
                    width: "abbreviated",
                    context: "formatting",
                  });
                case "bbb":
                  return n
                    .dayPeriod(i, {
                      width: "abbreviated",
                      context: "formatting",
                    })
                    .toLowerCase();
                case "bbbbb":
                  return n.dayPeriod(i, {
                    width: "narrow",
                    context: "formatting",
                  });
                default:
                  return n.dayPeriod(i, {
                    width: "wide",
                    context: "formatting",
                  });
              }
            },
            B: function (e, t, n) {
              var i,
                a = e.getUTCHours();
              switch (
                ((i = a >= 17 ? Tr : a >= 12 ? Yr : a >= 4 ? Dr : Fr), t)
              ) {
                case "B":
                case "BB":
                case "BBB":
                  return n.dayPeriod(i, {
                    width: "abbreviated",
                    context: "formatting",
                  });
                case "BBBBB":
                  return n.dayPeriod(i, {
                    width: "narrow",
                    context: "formatting",
                  });
                default:
                  return n.dayPeriod(i, {
                    width: "wide",
                    context: "formatting",
                  });
              }
            },
            h: function (e, t, n) {
              if ("ho" === t) {
                var i = e.getUTCHours() % 12;
                return (
                  0 === i && (i = 12), n.ordinalNumber(i, { unit: "hour" })
                );
              }
              return Cr.h(e, t);
            },
            H: function (e, t, n) {
              return "Ho" === t
                ? n.ordinalNumber(e.getUTCHours(), { unit: "hour" })
                : Cr.H(e, t);
            },
            K: function (e, t, n) {
              var i = e.getUTCHours() % 12;
              return "Ko" === t
                ? n.ordinalNumber(i, { unit: "hour" })
                : Ar(i, t.length);
            },
            k: function (e, t, n) {
              var i = e.getUTCHours();
              return (
                0 === i && (i = 24),
                "ko" === t
                  ? n.ordinalNumber(i, { unit: "hour" })
                  : Ar(i, t.length)
              );
            },
            m: function (e, t, n) {
              return "mo" === t
                ? n.ordinalNumber(e.getUTCMinutes(), { unit: "minute" })
                : Cr.m(e, t);
            },
            s: function (e, t, n) {
              return "so" === t
                ? n.ordinalNumber(e.getUTCSeconds(), { unit: "second" })
                : Cr.s(e, t);
            },
            S: function (e, t) {
              return Cr.S(e, t);
            },
            X: function (e, t, n, i) {
              var a = (i._originalDate || e).getTimezoneOffset();
              if (0 === a) return "Z";
              switch (t) {
                case "X":
                  return Mr(a);
                case "XXXX":
                case "XX":
                  return Nr(a);
                default:
                  return Nr(a, ":");
              }
            },
            x: function (e, t, n, i) {
              var a = (i._originalDate || e).getTimezoneOffset();
              switch (t) {
                case "x":
                  return Mr(a);
                case "xxxx":
                case "xx":
                  return Nr(a);
                default:
                  return Nr(a, ":");
              }
            },
            O: function (e, t, n, i) {
              var a = (i._originalDate || e).getTimezoneOffset();
              switch (t) {
                case "O":
                case "OO":
                case "OOO":
                  return "GMT" + Ir(a, ":");
                default:
                  return "GMT" + Nr(a, ":");
              }
            },
            z: function (e, t, n, i) {
              var a = (i._originalDate || e).getTimezoneOffset();
              switch (t) {
                case "z":
                case "zz":
                case "zzz":
                  return "GMT" + Ir(a, ":");
                default:
                  return "GMT" + Nr(a, ":");
              }
            },
            t: function (e, t, n, i) {
              var a = i._originalDate || e;
              return Ar(Math.floor(a.getTime() / 1e3), t.length);
            },
            T: function (e, t, n, i) {
              return Ar((i._originalDate || e).getTime(), t.length);
            },
          };
        function Ir(e, t) {
          var n = e > 0 ? "-" : "+",
            i = Math.abs(e),
            a = Math.floor(i / 60),
            o = i % 60;
          if (0 === o) return n + String(a);
          var r = t || "";
          return n + String(a) + r + Ar(o, 2);
        }
        function Mr(e, t) {
          return e % 60 == 0
            ? (e > 0 ? "-" : "+") + Ar(Math.abs(e) / 60, 2)
            : Nr(e, t);
        }
        function Nr(e, t) {
          var n = t || "",
            i = e > 0 ? "-" : "+",
            a = Math.abs(e);
          return i + Ar(Math.floor(a / 60), 2) + n + Ar(a % 60, 2);
        }
        var Rr = _r,
          Or = function (e, t) {
            switch (e) {
              case "P":
                return t.date({ width: "short" });
              case "PP":
                return t.date({ width: "medium" });
              case "PPP":
                return t.date({ width: "long" });
              default:
                return t.date({ width: "full" });
            }
          },
          jr = function (e, t) {
            switch (e) {
              case "p":
                return t.time({ width: "short" });
              case "pp":
                return t.time({ width: "medium" });
              case "ppp":
                return t.time({ width: "long" });
              default:
                return t.time({ width: "full" });
            }
          },
          Lr = {
            p: jr,
            P: function (e, t) {
              var n,
                i = e.match(/(P+)(p+)?/) || [],
                a = i[1],
                o = i[2];
              if (!o) return Or(e, t);
              switch (a) {
                case "P":
                  n = t.dateTime({ width: "short" });
                  break;
                case "PP":
                  n = t.dateTime({ width: "medium" });
                  break;
                case "PPP":
                  n = t.dateTime({ width: "long" });
                  break;
                default:
                  n = t.dateTime({ width: "full" });
              }
              return n
                .replace("{{date}}", Or(a, t))
                .replace("{{time}}", jr(o, t));
            },
          },
          zr = Lr;
        var Ur = ["D", "DD"],
          Pr = ["YY", "YYYY"];
        function Br(e, t, n) {
          if ("YYYY" === e)
            throw new RangeError(
              "Use `yyyy` instead of `YYYY` (in `"
                .concat(t, "`) for formatting years to the input `")
                .concat(
                  n,
                  "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
                )
            );
          if ("YY" === e)
            throw new RangeError(
              "Use `yy` instead of `YY` (in `"
                .concat(t, "`) for formatting years to the input `")
                .concat(
                  n,
                  "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
                )
            );
          if ("D" === e)
            throw new RangeError(
              "Use `d` instead of `D` (in `"
                .concat(t, "`) for formatting days of the month to the input `")
                .concat(
                  n,
                  "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
                )
            );
          if ("DD" === e)
            throw new RangeError(
              "Use `dd` instead of `DD` (in `"
                .concat(t, "`) for formatting days of the month to the input `")
                .concat(
                  n,
                  "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
                )
            );
        }
        var Hr = {
            lessThanXSeconds: {
              one: "less than a second",
              other: "less than {{count}} seconds",
            },
            xSeconds: { one: "1 second", other: "{{count}} seconds" },
            halfAMinute: "half a minute",
            lessThanXMinutes: {
              one: "less than a minute",
              other: "less than {{count}} minutes",
            },
            xMinutes: { one: "1 minute", other: "{{count}} minutes" },
            aboutXHours: {
              one: "about 1 hour",
              other: "about {{count}} hours",
            },
            xHours: { one: "1 hour", other: "{{count}} hours" },
            xDays: { one: "1 day", other: "{{count}} days" },
            aboutXWeeks: {
              one: "about 1 week",
              other: "about {{count}} weeks",
            },
            xWeeks: { one: "1 week", other: "{{count}} weeks" },
            aboutXMonths: {
              one: "about 1 month",
              other: "about {{count}} months",
            },
            xMonths: { one: "1 month", other: "{{count}} months" },
            aboutXYears: {
              one: "about 1 year",
              other: "about {{count}} years",
            },
            xYears: { one: "1 year", other: "{{count}} years" },
            overXYears: { one: "over 1 year", other: "over {{count}} years" },
            almostXYears: {
              one: "almost 1 year",
              other: "almost {{count}} years",
            },
          },
          qr = function (e, t, n) {
            var i,
              a = Hr[e];
            return (
              (i =
                "string" == typeof a
                  ? a
                  : 1 === t
                  ? a.one
                  : a.other.replace("{{count}}", t.toString())),
              null != n && n.addSuffix
                ? n.comparison && n.comparison > 0
                  ? "in " + i
                  : i + " ago"
                : i
            );
          };
        function $r(e) {
          return function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = t.width ? String(t.width) : e.defaultWidth;
            return e.formats[n] || e.formats[e.defaultWidth];
          };
        }
        var Vr = {
            date: $r({
              formats: {
                full: "EEEE, MMMM do, y",
                long: "MMMM do, y",
                medium: "MMM d, y",
                short: "MM/dd/yyyy",
              },
              defaultWidth: "full",
            }),
            time: $r({
              formats: {
                full: "h:mm:ss a zzzz",
                long: "h:mm:ss a z",
                medium: "h:mm:ss a",
                short: "h:mm a",
              },
              defaultWidth: "full",
            }),
            dateTime: $r({
              formats: {
                full: "{{date}} 'at' {{time}}",
                long: "{{date}} 'at' {{time}}",
                medium: "{{date}}, {{time}}",
                short: "{{date}}, {{time}}",
              },
              defaultWidth: "full",
            }),
          },
          Wr = {
            lastWeek: "'last' eeee 'at' p",
            yesterday: "'yesterday at' p",
            today: "'today at' p",
            tomorrow: "'tomorrow at' p",
            nextWeek: "eeee 'at' p",
            other: "P",
          },
          Kr = function (e, t, n, i) {
            return Wr[e];
          };
        function Gr(e) {
          return function (t, n) {
            var i;
            if (
              "formatting" ===
                (null != n && n.context ? String(n.context) : "standalone") &&
              e.formattingValues
            ) {
              var a = e.defaultFormattingWidth || e.defaultWidth,
                o = null != n && n.width ? String(n.width) : a;
              i = e.formattingValues[o] || e.formattingValues[a];
            } else {
              var r = e.defaultWidth,
                s = null != n && n.width ? String(n.width) : e.defaultWidth;
              i = e.values[s] || e.values[r];
            }
            return i[e.argumentCallback ? e.argumentCallback(t) : t];
          };
        }
        var Xr = {
          ordinalNumber: function (e, t) {
            var n = Number(e),
              i = n % 100;
            if (i > 20 || i < 10)
              switch (i % 10) {
                case 1:
                  return n + "st";
                case 2:
                  return n + "nd";
                case 3:
                  return n + "rd";
              }
            return n + "th";
          },
          era: Gr({
            values: {
              narrow: ["B", "A"],
              abbreviated: ["BC", "AD"],
              wide: ["Before Christ", "Anno Domini"],
            },
            defaultWidth: "wide",
          }),
          quarter: Gr({
            values: {
              narrow: ["1", "2", "3", "4"],
              abbreviated: ["Q1", "Q2", "Q3", "Q4"],
              wide: [
                "1st quarter",
                "2nd quarter",
                "3rd quarter",
                "4th quarter",
              ],
            },
            defaultWidth: "wide",
            argumentCallback: function (e) {
              return e - 1;
            },
          }),
          month: Gr({
            values: {
              narrow: [
                "J",
                "F",
                "M",
                "A",
                "M",
                "J",
                "J",
                "A",
                "S",
                "O",
                "N",
                "D",
              ],
              abbreviated: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              wide: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
            },
            defaultWidth: "wide",
          }),
          day: Gr({
            values: {
              narrow: ["S", "M", "T", "W", "T", "F", "S"],
              short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
              abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              wide: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
            },
            defaultWidth: "wide",
          }),
          dayPeriod: Gr({
            values: {
              narrow: {
                am: "a",
                pm: "p",
                midnight: "mi",
                noon: "n",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
              abbreviated: {
                am: "AM",
                pm: "PM",
                midnight: "midnight",
                noon: "noon",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
              wide: {
                am: "a.m.",
                pm: "p.m.",
                midnight: "midnight",
                noon: "noon",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
            },
            defaultWidth: "wide",
            formattingValues: {
              narrow: {
                am: "a",
                pm: "p",
                midnight: "mi",
                noon: "n",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
              abbreviated: {
                am: "AM",
                pm: "PM",
                midnight: "midnight",
                noon: "noon",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
              wide: {
                am: "a.m.",
                pm: "p.m.",
                midnight: "midnight",
                noon: "noon",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
            },
            defaultFormattingWidth: "wide",
          }),
        };
        function Qr(e) {
          return function (t) {
            var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              i = n.width,
              a =
                (i && e.matchPatterns[i]) ||
                e.matchPatterns[e.defaultMatchWidth],
              o = t.match(a);
            if (!o) return null;
            var r,
              s = o[0],
              l =
                (i && e.parsePatterns[i]) ||
                e.parsePatterns[e.defaultParseWidth],
              d = Array.isArray(l)
                ? (function (e, t) {
                    for (var n = 0; n < e.length; n++) if (t(e[n])) return n;
                    return;
                  })(l, function (e) {
                    return e.test(s);
                  })
                : (function (e, t) {
                    for (var n in e)
                      if (e.hasOwnProperty(n) && t(e[n])) return n;
                    return;
                  })(l, function (e) {
                    return e.test(s);
                  });
            return (
              (r = e.valueCallback ? e.valueCallback(d) : d),
              {
                value: (r = n.valueCallback ? n.valueCallback(r) : r),
                rest: t.slice(s.length),
              }
            );
          };
        }
        var Zr,
          Jr = {
            ordinalNumber:
              ((Zr = {
                matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                parsePattern: /\d+/i,
                valueCallback: function (e) {
                  return parseInt(e, 10);
                },
              }),
              function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = e.match(Zr.matchPattern);
                if (!n) return null;
                var i = n[0],
                  a = e.match(Zr.parsePattern);
                if (!a) return null;
                var o = Zr.valueCallback ? Zr.valueCallback(a[0]) : a[0];
                return {
                  value: (o = t.valueCallback ? t.valueCallback(o) : o),
                  rest: e.slice(i.length),
                };
              }),
            era: Qr({
              matchPatterns: {
                narrow: /^(b|a)/i,
                abbreviated:
                  /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
                wide: /^(before christ|before common era|anno domini|common era)/i,
              },
              defaultMatchWidth: "wide",
              parsePatterns: { any: [/^b/i, /^(a|c)/i] },
              defaultParseWidth: "any",
            }),
            quarter: Qr({
              matchPatterns: {
                narrow: /^[1234]/i,
                abbreviated: /^q[1234]/i,
                wide: /^[1234](th|st|nd|rd)? quarter/i,
              },
              defaultMatchWidth: "wide",
              parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
              defaultParseWidth: "any",
              valueCallback: function (e) {
                return e + 1;
              },
            }),
            month: Qr({
              matchPatterns: {
                narrow: /^[jfmasond]/i,
                abbreviated:
                  /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
                wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
              },
              defaultMatchWidth: "wide",
              parsePatterns: {
                narrow: [
                  /^j/i,
                  /^f/i,
                  /^m/i,
                  /^a/i,
                  /^m/i,
                  /^j/i,
                  /^j/i,
                  /^a/i,
                  /^s/i,
                  /^o/i,
                  /^n/i,
                  /^d/i,
                ],
                any: [
                  /^ja/i,
                  /^f/i,
                  /^mar/i,
                  /^ap/i,
                  /^may/i,
                  /^jun/i,
                  /^jul/i,
                  /^au/i,
                  /^s/i,
                  /^o/i,
                  /^n/i,
                  /^d/i,
                ],
              },
              defaultParseWidth: "any",
            }),
            day: Qr({
              matchPatterns: {
                narrow: /^[smtwf]/i,
                short: /^(su|mo|tu|we|th|fr|sa)/i,
                abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
                wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
              },
              defaultMatchWidth: "wide",
              parsePatterns: {
                narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
                any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
              },
              defaultParseWidth: "any",
            }),
            dayPeriod: Qr({
              matchPatterns: {
                narrow:
                  /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
                any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
              },
              defaultMatchWidth: "any",
              parsePatterns: {
                any: {
                  am: /^a/i,
                  pm: /^p/i,
                  midnight: /^mi/i,
                  noon: /^no/i,
                  morning: /morning/i,
                  afternoon: /afternoon/i,
                  evening: /evening/i,
                  night: /night/i,
                },
              },
              defaultParseWidth: "any",
            }),
          },
          es = {
            code: "en-US",
            formatDistance: qr,
            formatLong: Vr,
            formatRelative: Kr,
            localize: Xr,
            match: Jr,
            options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
          },
          ts = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
          ns = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
          is = /^'([^]*?)'?$/,
          as = /''/g,
          os = /[a-zA-Z]/;
        function rs(e, t, n) {
          var i, a, o, r, s, l, d, c, u, p, f, m, h, g, b, v, x, y;
          sr(2, arguments);
          var w = String(t),
            k = xr(),
            A =
              null !==
                (i =
                  null !== (a = null == n ? void 0 : n.locale) && void 0 !== a
                    ? a
                    : k.locale) && void 0 !== i
                ? i
                : es,
            C = ur(
              null !==
                (o =
                  null !==
                    (r =
                      null !==
                        (s =
                          null !==
                            (l =
                              null == n ? void 0 : n.firstWeekContainsDate) &&
                          void 0 !== l
                            ? l
                            : null == n ||
                              null === (d = n.locale) ||
                              void 0 === d ||
                              null === (c = d.options) ||
                              void 0 === c
                            ? void 0
                            : c.firstWeekContainsDate) && void 0 !== s
                        ? s
                        : k.firstWeekContainsDate) && void 0 !== r
                    ? r
                    : null === (u = k.locale) ||
                      void 0 === u ||
                      null === (p = u.options) ||
                      void 0 === p
                    ? void 0
                    : p.firstWeekContainsDate) && void 0 !== o
                ? o
                : 1
            );
          if (!(C >= 1 && C <= 7))
            throw new RangeError(
              "firstWeekContainsDate must be between 1 and 7 inclusively"
            );
          var E = ur(
            null !==
              (f =
                null !==
                  (m =
                    null !==
                      (h =
                        null !== (g = null == n ? void 0 : n.weekStartsOn) &&
                        void 0 !== g
                          ? g
                          : null == n ||
                            null === (b = n.locale) ||
                            void 0 === b ||
                            null === (v = b.options) ||
                            void 0 === v
                          ? void 0
                          : v.weekStartsOn) && void 0 !== h
                      ? h
                      : k.weekStartsOn) && void 0 !== m
                  ? m
                  : null === (x = k.locale) ||
                    void 0 === x ||
                    null === (y = x.options) ||
                    void 0 === y
                  ? void 0
                  : y.weekStartsOn) && void 0 !== f
              ? f
              : 0
          );
          if (!(E >= 0 && E <= 6))
            throw new RangeError(
              "weekStartsOn must be between 0 and 6 inclusively"
            );
          if (!A.localize)
            throw new RangeError("locale must contain localize property");
          if (!A.formatLong)
            throw new RangeError("locale must contain formatLong property");
          var S = lr(e);
          if (!fr(S)) throw new RangeError("Invalid time value");
          var D = (function (e) {
              var t = new Date(
                Date.UTC(
                  e.getFullYear(),
                  e.getMonth(),
                  e.getDate(),
                  e.getHours(),
                  e.getMinutes(),
                  e.getSeconds(),
                  e.getMilliseconds()
                )
              );
              return (
                t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime()
              );
            })(S),
            Y = mr(S, D),
            T = {
              firstWeekContainsDate: C,
              weekStartsOn: E,
              locale: A,
              _originalDate: S,
            };
          return w
            .match(ns)
            .map(function (e) {
              var t = e[0];
              return "p" === t || "P" === t ? (0, zr[t])(e, A.formatLong) : e;
            })
            .join("")
            .match(ts)
            .map(function (i) {
              if ("''" === i) return "'";
              var a = i[0];
              if ("'" === a)
                return (function (e) {
                  var t = e.match(is);
                  if (!t) return e;
                  return t[1].replace(as, "'");
                })(i);
              var o,
                r = Rr[a];
              if (r)
                return (
                  (null != n && n.useAdditionalWeekYearTokens) ||
                    ((o = i), -1 === Pr.indexOf(o)) ||
                    Br(i, t, String(e)),
                  (null != n && n.useAdditionalDayOfYearTokens) ||
                    !(function (e) {
                      return -1 !== Ur.indexOf(e);
                    })(i) ||
                    Br(i, t, String(e)),
                  r(Y, i, A.localize, T)
                );
              if (a.match(os))
                throw new RangeError(
                  "Format string contains an unescaped latin alphabet character `" +
                    a +
                    "`"
                );
              return i;
            })
            .join("");
        }
        const ss = (e) => {
            const t = new Date(1e3 * e);
            return (function (e) {
              return sr(1, arguments), cr(e, Date.now());
            })(t)
              ? (0, y.pw)("timeToday", null, "Today")
              : (function (e) {
                  return sr(1, arguments), cr(e, pr(Date.now(), 1));
                })(t)
              ? (0, y.pw)("timeYesterday", null, "Yesterday")
              : rs(t, "d/M/yyyy");
          },
          ls = (e) =>
            (0, $.Y)("span", {
              className: "timestamp-operator",
              children: `${e} - `,
            }),
          ds = (e) => {
            const t = (0, r.d4)((t) => (0, C.N0)(t, e.operatorId)),
              n = (0, r.d4)((t) => (0, C.yU)(t, e.operatorId)),
              i = t ? { backgroundImage: `url('${t}')` } : null;
            return (0, $.FD)($.FK, {
              children: [
                i &&
                  (0, $.Y)("span", { className: "timestamp-avatar", style: i }),
                ls(n),
              ],
            });
          };
        var cs = (e) => {
          let {
            operatorId: t,
            isAIAssistant: n,
            aiAssistantName: i,
            time: a,
          } = e;
          return (0, $.FD)("div", {
            className: "messageTimestamp",
            children: [
              t && (0, $.Y)(ds, { operatorId: t }),
              n && i && ls(`${i} AI Agent`),
              `${ss(a)}, ${rs(new Date(1e3 * a), "H:mm")}`,
            ],
          });
        };
        const us = "https://assets.tidiochat.com/img/not_found.jpg";
        var ps = (e) => {
          const { content: t, extension: n, thumb: i, name: o, id: s } = e,
            l = (0, r.wA)(),
            d = (0, r.d4)((e) => e.publicKey),
            c = (0, r.d4)((e) => e.visitor.id),
            [u, p] = (0, a.useState)(t),
            [m, h] = (0, a.useState)(i || ""),
            [g, b] = (0, a.useState)(!0),
            v = "gif" !== n ? m : u,
            x = (0, a.useCallback)(
              async function (e) {
                let t =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1];
                if (e === us) return b(!1), "";
                if (-1 === e.indexOf("/conversation/")) {
                  const n = (0, f.Dl)(e),
                    i = `/${d}/conversation/${c}`,
                    a = n
                      ? `${n.protocol}//${n.host}${i}${n.pathname}${n.search}${n.hash}`
                      : e,
                    o = await (async function (e) {
                      let t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : us;
                      return new Promise((t, n) => {
                        const i = new Image();
                        (i.src = e),
                          (i.onload = () => t(e)),
                          (i.onerror = (e) => {
                            n(e);
                          });
                      }).catch(() => t);
                    })(a);
                  t ? h(o) : p(o);
                } else h(us), p(us);
                return "";
              },
              [d, c]
            ),
            y = (0, a.useCallback)(
              (t) => {
                t.preventDefault(), l((0, k.qKn)(u)), e.onClick();
              },
              [l, u, e]
            ),
            w = (0, a.useCallback)(
              (e) => {
                e.currentTarget.setAttribute("alt", `${o}`),
                  l((0, k.Dvx)(s, !0));
              },
              [l, s, o]
            ),
            A = (0, a.useCallback)(() => {
              x(u), x(m, !0);
            }, [u, m, x]);
          return g
            ? (0, $.Y)("span", {
                children: (0, $.Y)("a", {
                  href: t,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: y,
                  children: (0, $.Y)("img", {
                    className: "attachment-img",
                    src: v,
                    onLoad: w,
                    onError: A,
                    alt: o || "",
                  }),
                }),
              })
            : null;
        };
        const fs = "youtubePreviewLoaded",
          ms = {
            name: "1aww66",
            styles:
              "display:block;width:calc(100% + var(--message-padding-inline, 16px) * 2);margin-top:16px;margin-left:calc(var(--message-padding-inline, 16px) * -1);margin-right:calc(var(--message-padding-inline, 16px) * -1);margin-bottom:calc(var(--message-padding-block, 10px) * -1);border-radius:var(--radius-component, 12px);overflow:hidden;background:#fff;cursor:pointer;text-decoration:none",
          },
          hs = (0, d.AH)(
            {
              width: "100%",
              aspectRatio: "16 / 9",
              minHeight: 139.5,
              background:
                "linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "200% 0" },
                "100%": { backgroundPosition: "-200% 0" },
              },
            },
            "",
            ""
          ),
          gs = (0, d.AH)(
            {
              width: "100%",
              aspectRatio: "16 / 9",
              objectFit: "cover",
              display: "block",
              minHeight: 139.5,
              "&&&": { cursor: "pointer" },
            },
            "",
            ""
          ),
          bs = {
            name: "4cbcex",
            styles:
              "padding:16px;border:1px solid #ebeef0;border-bottom-left-radius:var(--radius-component, 12px);border-bottom-right-radius:var(--radius-component, 12px)",
          },
          vs = {
            name: "u3r63y",
            styles:
              "font-weight:500;line-height:20px;color:#080F1A;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis",
          };
        var xs = (e) => {
          let { url: t } = e;
          const [n, i] = (0, a.useState)(null),
            [o, r] = (0, a.useState)(!1),
            [s, l] = (0, a.useState)(!1),
            [d, c] = (0, a.useState)(!1),
            u = (0, a.useRef)(null),
            p = Vo(t);
          if (
            ((0, a.useEffect)(() => {
              p &&
                (async () => {
                  try {
                    const e = await fetch(
                        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${p}&format=json`
                      ),
                      t = await e.json();
                    t.title && i(t.title);
                  } catch {
                  } finally {
                    r(!0);
                  }
                })();
            }, [p]),
            (0, a.useEffect)(() => {
              (d || s) &&
                o &&
                u.current &&
                u.current.dispatchEvent(new CustomEvent(fs, { bubbles: !0 }));
            }, [d, s, o]),
            !p)
          )
            return null;
          const f = ((e) => `https://img.youtube.com/vi/${e}/hqdefault.jpg`)(p),
            m = !d && !s;
          return (0, $.FD)("a", {
            ref: u,
            href: t,
            target: "_blank",
            rel: "noopener noreferrer",
            css: ms,
            "data-youtube-preview": !0,
            children: [
              m && (0, $.Y)("div", { css: hs }),
              (0, $.Y)("img", {
                css: [gs, m && { display: "none" }, "", ""],
                src: s ? us : f,
                alt: n || "YouTube video",
                onLoad: () => c(!0),
                onError: () => l(!0),
              }),
              n &&
                (0, $.Y)("div", {
                  css: bs,
                  children: (0, $.Y)("p", { css: vs, children: n }),
                }),
            ],
          });
        };
        var ys = (e) => {
          const t = (0, r.wA)(),
            n = (0, r.d4)((t) => (0, C.mV)(t, e.id)),
            i = (0, r.d4)((e) => (0, C.Qn)(e)),
            o = Boolean(n && e.isAIAssistant),
            [s, l] = (0, a.useState)(o),
            { isNewSkin: d } = (0, p.A)();
          (0, a.useEffect)(() => {
            l(o);
          }, [o]);
          const c = Boolean(e.ratingId) && !s,
            u = {
              border: "1px solid transparent",
              background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${f.XV[0]}, ${f.XV[1]}) border-box`,
            };
          return (0, $.FD)("div", {
            className: `message message-operator ${
              s ? "timestamp-visible" : ""
            } ${e.ratingId ? "rating-visible" : ""}`,
            style: e.isAIAssistant && !d ? u : void 0,
            children: [
              (0, $.Y)("span", {
                className: "message-content message-content--markdown",
                dangerouslySetInnerHTML: { __html: e.content },
                onClick: (e) => {
                  const { target: n } = e;
                  !Zo(n) || n.closest("a") || n.classList.contains("emoji")
                    ? l((e) => !e)
                    : t((0, k.qKn)(n.src));
                },
              }),
              e.youtubeUrl && (0, $.Y)(xs, { url: e.youtubeUrl }),
              (0, $.Y)(Ti, {
                in: s,
                children: (0, $.Y)(cs, {
                  isAIAssistant: e.isAIAssistant,
                  aiAssistantName: i,
                  time: e.time_sent,
                }),
              }),
              (0, $.Y)(Ti, {
                in: c,
                children: (0, $.Y)(or, {
                  messageId: e.id,
                  ratingId: e.ratingId,
                  rating: e.rating,
                }),
              }),
            ],
          });
        };
        var ws = (e) => {
          const { isNewSkin: t } = (0, p.A)(),
            n = ut(t);
          return (0, $.Y)("button", {
            type: "button",
            title: e.title,
            onClick: () => {
              let t = e.title;
              e.cardClicked && (t = `${e.cardClicked} &rarr; ${e.title}`),
                e.onClick(e.payload, t);
            },
            children: (0, $.Y)("span", {
              dangerouslySetInnerHTML: { __html: Yn(e.title) },
              css: n.text14,
            }),
          });
        };
        var ks = (e) => {
          const { title: t, payload: n, onClick: i, cardClicked: a } = e,
            o = (0, r.wA)(),
            s = Yn(t),
            { isNewSkin: l } = (0, p.A)(),
            d = ut(l),
            c = e.url || n,
            u = (0, f.IF)(c);
          return (0, $.Y)("div", {
            className: "button-url",
            children: (0, $.Y)("a", {
              className: "button-url__anchor",
              href: (0, f.IF)(c),
              type: "button",
              onClick: (r) => {
                r.preventDefault();
                let s = e.title;
                a && (s = `${a} &rarr; ${t}`),
                  i(n, s),
                  e.messageType === tt.Go.IFRAME && e.url
                    ? o((0, k.QT$)(e.url))
                    : (0, f.Fe)(u);
              },
              "data-testid": "buttonUrl",
              dangerouslySetInnerHTML: { __html: s },
              css: d.text14,
            }),
          });
        };
        var As = (e) => {
          let { buttons: t, metadata: n } = e;
          const i = (0, r.wA)(),
            o = (e, t) => {
              i(
                (0, k.RA7)(t, e, {
                  is_ai_assistant_task: n?.is_ai_assistant_task,
                })
              ),
                i((0, k.pO6)(rt.X.buttonClicked));
            };
          return (0, $.Y)($.FK, {
            children: t.map((e) =>
              (0, $.FD)(
                a.Fragment,
                {
                  children: [
                    "url" === e.type &&
                      (0, $.Y)(ks, {
                        title: e.title,
                        payload: e.payload,
                        url: e.url,
                        cardClicked: e.cardClicked,
                        onClick: o,
                      }),
                    "action" === e.type &&
                      (0, $.Y)(ws, {
                        title: e.title,
                        payload: e.payload,
                        cardClicked: e.cardClicked,
                        onClick: o,
                      }),
                  ],
                },
                `${e.title}${e.payload}`
              )
            ),
          });
        };
        var Cs = (e) => {
            let { content: t, buttons: n, aiAssistantTask: i } = e;
            const a = Xo(t);
            return (0, $.Y)("div", {
              className: "message message-operator buttons-message",
              children: (0, $.FD)("div", {
                className: "message-with-buttons",
                children: [
                  (0, $.Y)("div", {
                    className: "message-with-buttons-text",
                    dangerouslySetInnerHTML: { __html: a },
                    "data-testid": "buttonsText",
                  }),
                  (0, $.Y)("div", {
                    className: "button-wrapper",
                    children: (0, $.Y)(As, {
                      buttons: n,
                      metadata: { is_ai_assistant_task: i },
                    }),
                  }),
                ],
              }),
            });
          },
          Es = n(6593),
          Ss = n.n(Es);
        const Ds = (0, d.i7)({
            "0%": { transform: "translateX(8%)" },
            "100%": { transform: "translateX(0)" },
          }),
          Ys = (0, d.i7)({
            "0%": { opacity: 1, zIndex: 1 },
            "100%": { opacity: 0, zIndex: -1 },
          });
        var Ts = {
          container: {
            name: "jiaacb",
            styles: "position:relative;clear:both;width:100%;float:left",
          },
          getButton: (e, t) =>
            (0, d.AH)(
              {
                position: "absolute",
                background: "#fff",
                borderRadius: "50%",
                width: 40,
                height: 40,
                boxShadow: "0px 8px 20px 0px rgba(0, 27, 71, 0.24)",
                zIndex: 3,
                top: 140,
                transition: "box-shadow 0.2s, opacity 0.2s",
                "&:hover": {
                  boxShadow: "0px 10px 20px 0px rgba(0, 27, 71, 0.24)",
                },
                ...(t && { top: 22 }),
                ...("left" === e && { left: 0 }),
                ...("right" === e && { right: 0 }),
                "& svg": {
                  width: 40,
                  height: 40,
                  ...("left" === e && {
                    transform: "rotate(90deg)",
                    ".lang-rtl &": { transform: "rotate(-90deg)" },
                  }),
                  ...("right" === e && {
                    transform: "rotate(-90deg)",
                    ".lang-rtl &": { transform: "rotate(90deg)" },
                  }),
                },
              },
              "",
              ""
            ),
          getItemsContainer: (e) => {
            const t = e ? 20 : 28;
            return (0, d.AH)(
              {
                padding: `0px ${t}px`,
                maxWidth: `calc(100% + ${2 * t}px)`,
                background: "transparent",
                overflow: "auto",
                borderRadius: 0,
                display: "flex",
                scrollSnapType: "x mandatory",
                scrollPadding: t,
                scrollBehavior: "smooth",
                marginBottom: 5,
                marginLeft: -t,
                gap: 10,
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "::-webkit-scrollbar": { display: "none" },
                ".ios-ipad &": { WebkitOverflowScrolling: "touch" },
                ".safari &": {
                  scrollSnapType: "x mandatory",
                  ".lang-rtl &": { scrollSnapType: "none" },
                },
              },
              "",
              ""
            );
          },
          getItemWrapper: (e, t) =>
            (0, d.AH)(
              {
                maxWidth: "100%",
                minWidth: e,
                scrollSnapAlign: "center",
                willChange: "transform",
                transform: "translateX(8%)",
                animation: `${Ds} .5s .2s ease-out forwards`,
                position: "relative",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  zIndex: 1,
                  pointerEvents: "none",
                  backgroundColor: "#fff",
                  willChange: "opacity",
                  opacity: 1,
                  animation: `${Ys} .5s .2s ease-out forwards`,
                },
                "&:nth-child(2)": {
                  animationDelay: ".4s",
                  "&:before": { animationDelay: ".4s" },
                },
                ...(t && { maxWidth: e }),
              },
              "",
              ""
            ),
        };
        var Fs = (function (e) {
          return (e.DEFAULT = "default"), (e.REVERSE = "reverse"), e;
        })(Fs || {});
        var _s = (e) => {
          let {
            items: t,
            renderItem: n,
            isWithoutImages: i = !1,
            isFlyMessage: o = !1,
          } = e;
          const s = (0, r.wA)(),
            l = (0, y.V8)(),
            d = o ? 224 : 240,
            c = t.length,
            u = a.useRef(null),
            p = a.useRef(!1),
            [f, m] = a.useState(Fs.REVERSE),
            [h, g] = a.useState(0),
            [b, v] = a.useState(0),
            [x, w] = a.useState(0),
            A = (0, a.useCallback)(() => {
              s((0, k.pO6)(rt.X.cardsScrolled));
            }, [s]),
            C = (0, a.useMemo)(() => {
              if (!u.current) return 0;
              const e = l ? -1 * x : x;
              return e < 10
                ? 0
                : e > 0 && e < d && c > 1
                ? 1
                : Math.floor(e / (d + 10)) + 1;
            }, [x, d, l, c]),
            E = (0, a.useCallback)(() => {
              u.current && ((u.current.scrollLeft += d), A());
            }, [A, d]),
            S = (0, a.useCallback)(() => {
              u.current && ((u.current.scrollLeft -= d), A());
            }, [A, d]);
          return (
            (0, a.useEffect)(() => {
              if (!u.current || p.current) return () => {};
              (p.current = !0),
                u.current.scrollLeft > 0
                  ? m(Fs.DEFAULT)
                  : (u.current.scrollLeft = 0);
              const e = Ss()(() => {
                u.current && w(u.current.scrollLeft);
              }, 80);
              return (
                u.current.addEventListener("scroll", e),
                g(u.current?.offsetWidth || 0),
                v(u.current?.scrollWidth || 0),
                w(
                  u.current && l && "default" === f
                    ? u.current.scrollWidth - u.current.offsetWidth
                    : 0
                ),
                () => {
                  u.current && u.current.removeEventListener("scroll", e);
                }
              );
            }, [l, f]),
            (0, $.FD)($.FK, {
              children: [
                (0, $.Y)("div", {
                  css: Ts.container,
                  className: "slideshow",
                  children: l
                    ? (0, $.FD)($.FK, {
                        children: [
                          "default" === f &&
                            (0, $.FD)($.FK, {
                              children: [
                                (0, $.Y)(V, {
                                  classNames: "fade200",
                                  in: b - h > x,
                                  children: (0, $.Y)("button", {
                                    type: "button",
                                    css: Ts.getButton("left", i),
                                    onClick: E,
                                    children: (0, $.Y)(st.sX, {}),
                                  }),
                                }),
                                (0, $.Y)(V, {
                                  classNames: "fade200",
                                  in: x > 10,
                                  children: (0, $.Y)("button", {
                                    type: "button",
                                    css: Ts.getButton("right", i),
                                    onClick: S,
                                    children: (0, $.Y)(st.sX, {}),
                                  }),
                                }),
                              ],
                            }),
                          "reverse" === f &&
                            (0, $.FD)($.FK, {
                              children: [
                                (0, $.Y)(V, {
                                  classNames: "fade200",
                                  in: x < -10,
                                  children: (0, $.Y)("button", {
                                    type: "button",
                                    css: Ts.getButton("left", i),
                                    onClick: E,
                                    children: (0, $.Y)(st.sX, {}),
                                  }),
                                }),
                                (0, $.Y)(V, {
                                  classNames: "fade200",
                                  in: b - h > -1 * x,
                                  children: (0, $.Y)("button", {
                                    type: "button",
                                    css: Ts.getButton("right", i),
                                    onClick: S,
                                    children: (0, $.Y)(st.sX, {}),
                                  }),
                                }),
                              ],
                            }),
                        ],
                      })
                    : (0, $.FD)($.FK, {
                        children: [
                          (0, $.Y)(V, {
                            classNames: "fade200",
                            in: x > 10,
                            children: (0, $.Y)("button", {
                              type: "button",
                              css: Ts.getButton("left", i),
                              onClick: S,
                              children: (0, $.Y)(st.sX, {}),
                            }),
                          }),
                          (0, $.Y)(V, {
                            classNames: "fade200",
                            in: b - h > x,
                            children: (0, $.Y)("button", {
                              type: "button",
                              css: Ts.getButton("right", i),
                              onClick: E,
                              children: (0, $.Y)(st.sX, {}),
                            }),
                          }),
                        ],
                      }),
                }),
                (0, $.Y)("div", {
                  className: "message message-operator",
                  css: Ts.getItemsContainer(o),
                  ref: u,
                  children: t.map((e, i) =>
                    (0, $.Y)(
                      "div",
                      {
                        css: Ts.getItemWrapper(d, 1 === t.length),
                        children: n(e, C === i),
                      },
                      e.id
                    )
                  ),
                }),
              ],
            })
          );
        };
        var Is = (e) => {
          let { buttons: t } = e;
          const n = (0, r.wA)(),
            i = t[0],
            a = (0, f.IF)(i.url || i.payload);
          return (0, $.Y)("a", {
            href: a,
            className: "button-icon",
            onClick: (e) => {
              e.preventDefault(),
                n((0, k.pO6)(rt.X.buttonClicked)),
                (0, f.Fe)(a);
            },
            children: (0, $.Y)(st.f5, {}),
          });
        };
        var Ms = {
          getContentContainer: (e) =>
            (0, d.AH)(
              {
                padding: "9px 12px 8px",
                border: "1px solid #ebeef0",
                borderTop: "none",
                ...(!e && {
                  borderRadius: "14px 14px 0 0",
                  borderTop: "1px solid #ebeef0",
                }),
                "& a": {
                  textDecoration: "none",
                  color: "#00122e",
                  "&:hover, &:focus, &:active, &:visited": {
                    color: "#00122e",
                    outline: "none",
                  },
                  "&:hover": { textDecoration: "underline" },
                },
              },
              "",
              ""
            ),
          image: {
            name: "1bd9gmu",
            styles:
              "border-radius:14px 14px 0 0;height:122px;background:#fff no-repeat center center;background-size:cover;border:1px solid #ebeef0;border-bottom:0",
          },
          title: {
            name: "1nxpb8w",
            styles:
              "font-size:15px;line-height:19px;font-weight:bold;color:#00122e",
          },
          subtitle: {
            name: "1awya7l",
            styles:
              "margin:4px 0 0;line-height:16.5px;font-size:14px;color:#4c596b;white-space:pre-line;& .emoji{width:14px;margin:0 0 -2px 2px;}",
          },
          url: {
            name: "1n3ai7k",
            styles:
              "font-size:14px;line-height:17px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#00122e;& a{opacity:0.5;}",
          },
          buttons: {
            name: "o3tcs8",
            styles:
              "&& .button-wrapper{margin-top:0;margin-bottom:1px;&:before{content:none;}button{width:100%;}}",
          },
        };
        var Ns = {
          subtitle: {
            name: "l1vx4s",
            styles:
              "color:#647491;white-space:pre-line;.emoji{width:14px;margin:0 0 -2px 2px;}",
          },
          url: {
            name: "bf40sn",
            styles:
              "overflow:hidden;white-space:nowrap;text-overflow:ellipsis;a{text-decoration:none;color:#647491;&:hover{text-decoration:underline;}&:hover, &:focus, &:active, &:visited{outline:none;}}",
          },
          buttons: {
            name: "xhbkg4",
            styles:
              "display:flex;flex-direction:column;button{width:100%;color:var(--custom-action-color, #0566ff);outline:none;padding:8px 0;border-top:1px solid var(--border-color, #D3DBE5);&:hover{text-decoration:underline;}}svg{fill:var(--custom-action-color, #0566ff);}a{outline:none;}",
          },
          image: {
            name: "6iwbs3",
            styles:
              "height:122px;background:#fff no-repeat center center;background-size:cover;border-radius:var(--radius-component, 8px) var(--radius-component, 8px) 0 0",
          },
          container: {
            name: "qkc2wz",
            styles:
              "display:flex;flex-direction:column;border:1px solid var(--border-color, #D3DBE5);border-radius:var(--radius-component, 8px)",
          },
          content: {
            name: "1fttcpj",
            styles: "display:flex;flex-direction:column",
          },
          text: {
            name: "o44mca",
            styles: "display:flex;flex-direction:column;gap:4px;padding:16px",
          },
        };
        var Rs = (e) => {
          let { imageUrl: t, link: n, openLink: i = () => {} } = e;
          const { isNewSkin: a } = (0, p.A)();
          return n
            ? (0, $.Y)("a", {
                href: n,
                onClick: i,
                "data-testid": "cardImageLink",
                children: (0, $.Y)("div", {
                  css: a ? Ns.image : Ms.image,
                  style: { backgroundImage: `url(${t})` },
                }),
              })
            : (0, $.Y)("div", {
                css: a ? Ns.image : Ms.image,
                style: { backgroundImage: `url(${t})` },
              });
        };
        var Os = (e) => {
          let {
            title: t,
            isShopifyCard: n,
            imageUrl: i,
            buttons: o,
            proxyUrl: r,
            subtitle: s = "",
            url: l = "",
            metadata: d,
          } = e;
          const { isNewSkin: c } = (0, p.A)(),
            u = ut(c),
            { host: m } = (0, f.Dl)(l) || {},
            h = (0, f.IF)(l),
            g = Sn(t),
            b = Sn(s),
            v = (0, f.Xf)((0, f.bp)(), l),
            x = Boolean(i),
            y = (0, a.useMemo)(
              () => o.map((e) => ({ ...e, cardClicked: t })),
              [o, t]
            ),
            w = (e) => {
              e.preventDefault();
              const t = r || h;
              try {
                v && window.top ? (window.top.location = t) : window.open(t);
              } catch {
                window.open(t);
              }
            };
          return c
            ? (0, $.FD)("div", {
                css: Ns.container,
                children: [
                  i && (0, $.Y)(Rs, { imageUrl: i, link: h, openLink: w }),
                  (0, $.FD)("div", {
                    css: Ns.content,
                    children: [
                      (0, $.FD)("div", {
                        css: Ns.text,
                        children: [
                          (0, $.Y)("div", {
                            css: u.text14Medium,
                            dangerouslySetInnerHTML: { __html: g },
                          }),
                          s &&
                            (0, $.Y)("div", {
                              css: [u.text14, Ns.subtitle, "", ""],
                              dangerouslySetInnerHTML: { __html: b },
                            }),
                          l &&
                            (0, $.Y)("div", {
                              css: [u.text14, Ns.url, "", ""],
                              children: (0, $.Y)("a", {
                                href: h,
                                type: "button",
                                onClick: w,
                                "data-testid": "cardLink",
                                children: v ? Qo(l) : m,
                              }),
                            }),
                        ],
                      }),
                      (0, $.Y)("div", {
                        css: Ns.buttons,
                        children: n
                          ? (0, $.Y)(Is, { buttons: y })
                          : (0, $.Y)(As, { buttons: y, metadata: d }),
                      }),
                    ],
                  }),
                ],
              })
            : (0, $.FD)("div", {
                className: "message-with-buttons",
                children: [
                  i && (0, $.Y)(Rs, { imageUrl: i, link: h, openLink: w }),
                  (0, $.FD)("div", {
                    css: Ms.getContentContainer(x),
                    children: [
                      (0, $.Y)("div", {
                        css: Ms.title,
                        dangerouslySetInnerHTML: { __html: g },
                      }),
                      s &&
                        (0, $.Y)("div", {
                          css: Ms.subtitle,
                          dangerouslySetInnerHTML: { __html: b },
                        }),
                      l &&
                        (0, $.Y)("div", {
                          css: Ms.url,
                          children: (0, $.Y)("a", {
                            href: h,
                            type: "button",
                            onClick: w,
                            "data-testid": "cardLink",
                            children: v ? Qo(l) : m,
                          }),
                        }),
                    ],
                  }),
                  (0, $.Y)("div", {
                    css: Ms.buttons,
                    children: (0, $.Y)("div", {
                      className: "button-wrapper",
                      children: n
                        ? (0, $.Y)(Is, { buttons: y })
                        : (0, $.Y)(As, { buttons: y, metadata: d }),
                    }),
                  }),
                ],
              });
        };
        var js = (e) => {
          let { cards: t, operator_id: n, aiAssistantTask: i } = e;
          const a = "string" == typeof t[0].imageUrl,
            o = "number" == typeof n;
          return (0, $.Y)(_s, {
            items: t,
            renderItem: (e) =>
              (0, d.n)(Os, {
                ...e,
                isShopifyCard: o,
                key: e.id,
                metadata: { is_ai_assistant_task: i },
              }),
            isWithoutImages: !a,
          });
        };
        const Ls = {
          name: "el2nz9",
          styles:
            "display:flex;flex-direction:column;align-items:center;color:#647491;margin:auto;text-align:center;padding-top:24px;p{margin:6px 0;}",
        };
        var zs = (e) => {
          let { operator_id: t } = e;
          const n = (0, r.d4)(C.K).find((e) => e.id === t);
          return (0, $.FD)("div", {
            className: "message",
            css: Ls,
            children: [
              (0, $.Y)(st.zq, {}),
              (0, $.Y)("p", {
                children: n
                  ? (0, $.Y)(_n, {
                      value: "operatorMarkedConversationAsSolved",
                      replacements: { "{operatorName}": n.name },
                      fallback:
                        "{operatorName} marked the conversation as solved",
                    })
                  : (0, $.Y)(_n, {
                      value: "conversationWasMarkedAsSolved",
                      fallback: "The conversation was marked as solved",
                    }),
              }),
            ],
          });
        };
        const Us = { name: "pr10xp", styles: "margin-bottom:10px" },
          Ps = function () {
            let e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              t =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return (0, d.AH)(
              {
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: t ? "4px 8px" : "12px 40px",
                background: "#fff",
                border: "1px dashed var(--border-color, #D3DBE5)",
                borderRadius: "8px",
                outline: "none",
                position: "relative",
                fontWeight: 600,
                ...(e
                  ? {
                      "&:hover": {
                        border: "1px solid #ACB8CB",
                        color: "#647491",
                        fontWeight: 400,
                      },
                    }
                  : {}),
                svg: { width: "16px", height: "16px" },
              },
              "",
              ""
            );
          },
          Bs = { name: "1gzh234", styles: "line-height:20px;font-size:16px" },
          Hs = { name: "1ewutym", styles: "color:#647491;font-weight:400" },
          qs = (e) =>
            (0, d.AH)(
              {
                position: "absolute",
                right: e ? "6px" : "18px",
                top: e ? "6px" : "14px",
              },
              "",
              ""
            ),
          $s = {
            name: "4im8km",
            styles: "display:flex;margin-right:4px;svg{fill:#647491;}",
          };
        var Vs = (e) => {
          let { content: t, couponCode: n } = e;
          const [i, o] = (0, a.useState)(n),
            [s, l] = (0, a.useState)(!1),
            [d, c] = (0, a.useState)(!0),
            u = (0, a.useRef)(),
            f = (0, r.wA)(),
            m = Xo(t),
            { isNewSkin: h } = (0, p.A)(),
            g = ut(h);
          return (0, $.FD)("div", {
            className: "message message-operator coupon-code-message",
            children: [
              (0, $.Y)("div", {
                css: Us,
                dangerouslySetInnerHTML: { __html: m },
              }),
              d
                ? (0, $.FD)("button", {
                    css: [Ps(!0, h), s && Hs, "", ""],
                    onClick: async () => {
                      try {
                        n &&
                          d &&
                          (await window.parent.navigator.clipboard.writeText(n),
                          f((0, k.pO6)(rt.X.couponCodeCopyClicked)),
                          l(!0),
                          u.current && clearTimeout(u.current),
                          (u.current = setTimeout(() => {
                            l(!1);
                          }, 1500)));
                      } catch {
                        c(!1), o(n);
                      }
                    },
                    type: "button",
                    onMouseEnter: () => {
                      d && o((0, y.pw)("clickToCopy", null, "Click to copy"));
                    },
                    onMouseLeave: () => {
                      d && o(n);
                    },
                    children: [
                      s &&
                        (0, $.Y)("span", {
                          css: $s,
                          children: (0, $.Y)(st.oh, {}),
                        }),
                      (0, $.Y)("span", {
                        css: [Bs, g.text14Medium, "", ""],
                        children: s ? (0, y.pw)("copied", null, "Copied") : i,
                      }),
                      !s &&
                        (0, $.Y)("span", {
                          css: qs(h),
                          children: (0, $.Y)(st.Td, {}),
                        }),
                    ],
                  })
                : (0, $.Y)("span", {
                    css: Ps(!1, h),
                    children: (0, $.Y)("span", { css: Bs, children: i }),
                  }),
            ],
          });
        };
        let Ws = (function (e) {
          return (
            (e.VALID = "valid"), (e.INVALID = "invalid"), (e.EMPTY = "empty"), e
          );
        })({});
        const Ks = (e) => {
            switch (e) {
              case tt.Vw.FILE:
                return [];
              case tt.Vw.CHECKBOX:
                return !1;
              default:
                return "";
            }
          },
          Gs =
            /(?:\+?\d+[\s-]?)?(?:\(\d+\))?(?:\s?\/\s?)?(?:[-.\s]?\d{1,5}){5,}.*\d/,
          Xs = /[^?!@#$%^&*()_+-=;':"|,./<>`~\d]+/,
          Qs =
            /((?:https?:\/\/)?(?:www\.)?[a-z-.\d]+\.[a-z]{2,13}(?:(?:\?|\/)(?:\S+)?)?)(?:[.!?,].*)?$/i;
        var Zs = (e) => {
          let { form: t, messageId: n } = e;
          const i = (0, r.wA)(),
            o = (0, r.d4)((e) => (0, C.hu)(e, n)),
            s = (0, r.d4)(C.sy),
            l = o?.type,
            d = s?.id === n,
            [c, u] = (0, a.useState)(
              t.reduce((e, t) => ({ ...e, [t.id]: Ks(t.type) }), {})
            ),
            [p, m] = (0, a.useState)(!1),
            h = (0, a.useCallback)(() => {
              m(!0);
            }, []),
            g = (0, a.useCallback)(() => {
              m(!1);
            }, []),
            [b, v] = (0, a.useState)(!1),
            [x, y] = (0, a.useState)(
              t.reduce((e, t) => ({ ...e, [t.id]: Ws.VALID }), {})
            ),
            w = (0, a.useMemo)(
              () => Object.values(x).some((e) => e !== Ws.VALID),
              [x]
            ),
            A = (0, a.useRef)(null),
            E = (0, a.useRef)(null),
            S = (0, a.useRef)(),
            D = (0, a.useRef)(!1),
            Y = (0, a.useCallback)((e) => {
              y((t) => ({ ...t, [e]: Ws.VALID }));
            }, []),
            T = (0, a.useCallback)(
              (e, t) => {
                u((n) => ({ ...n, [e]: t })), Y(e);
              },
              [Y]
            ),
            F = (0, a.useCallback)(
              (e, t) => {
                u((n) => {
                  const i = n[e];
                  return Array.isArray(i) ? { ...n, [e]: [...i, t] } : n;
                }),
                  Y(e);
              },
              [Y]
            ),
            _ = (0, a.useCallback)((e, t, n) => {
              u((i) => {
                const a = i[e];
                return Array.isArray(a)
                  ? { ...i, [e]: a.filter((e) => e[t] !== n) }
                  : i;
              });
            }, []),
            I = (0, a.useCallback)(() => {
              const e = { ...x };
              let n = !1;
              return (
                t.forEach((t) => {
                  const i = c[t.id];
                  switch (typeof i) {
                    case "boolean":
                      t.required && !i && ((n = !0), (e[t.id] = Ws.EMPTY));
                      break;
                    case "object":
                      t.type === tt.Vw.FILE &&
                        t.required &&
                        !i[0]?.url &&
                        ((n = !0), (e[t.id] = Ws.EMPTY));
                      break;
                    default:
                      t.required && "" === i
                        ? ((n = !0), (e[t.id] = Ws.EMPTY))
                        : "" === i ||
                          ((e) => {
                            switch (e) {
                              case tt.Vw.PHONE:
                                return (e) => Gs.test(e);
                              case tt.Vw.NAME:
                                return (e) => Xs.test(e);
                              case tt.Vw.URL:
                                return (e) => Qs.test(e);
                              case tt.Vw.EMAIL:
                                return (e) => (0, f.B9)(e);
                              default:
                                return () => !0;
                            }
                          })(t.type)(i) ||
                          ((n = !0), (e[t.id] = Ws.INVALID));
                  }
                }),
                { formErrors: e, isFormInvalid: n }
              );
            }, [t, x, c]),
            M = (0, a.useCallback)(
              (e) => {
                if ((e.preventDefault(), p)) return !1;
                const { formErrors: n, isFormInvalid: a } = I();
                return (
                  a
                    ? y(n)
                    : (v(!0),
                      i(
                        (0, k.rMA)({
                          formResponse: t.map((e) => ({
                            name: e.name,
                            id: e.id,
                            value: c[e.id],
                          })),
                        })
                      )),
                  !0
                );
              },
              [i, t, c, p, I]
            ),
            N = (0, a.useCallback)(
              (e) => {
                u(
                  t.reduce((t, n) => {
                    const i = e.find((e) => e.id === n.id)?.value;
                    return {
                      ...t,
                      [n.id]: n.type === tt.Vw.CHECKBOX ? Boolean(i) : i ?? "",
                    };
                  }, {})
                );
              },
              [t]
            );
          return (
            (0, a.useEffect)(
              () => (
                "function" == typeof E.current?.scrollIntoView &&
                  d &&
                  (S.current = setTimeout(() => {
                    try {
                      E.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    } catch {
                      E.current?.scrollIntoView();
                    }
                  }, 150)),
                () => {
                  S.current && clearTimeout(S.current);
                }
              ),
              [d]
            ),
            (0, a.useEffect)(() => {
              d ||
                l !== tt.Go.FORM_RESPONSE ||
                !o?.formResponse ||
                D.current ||
                (N(o.formResponse), (D.current = !0));
            }, [d, o?.formResponse, l, N]),
            {
              formSubmitting: b,
              formValidityState: x,
              formValues: c,
              handleChange: T,
              handleSubmit: M,
              formRef: A,
              titleRef: E,
              hasErrors: w,
              enableFormSubmission: g,
              disableFormSubmission: h,
              isSubmissionDisabled: p,
              addItemToArrayFormField: F,
              removeItemFromArrayFormField: _,
              disabled: l !== tt.Go.FORM_RESPONSE && !d,
              sent: l === tt.Go.FORM_RESPONSE && !d,
            }
          );
        };
        const Js = (e) =>
            (0, d.AH)(
              {
                marginBottom: e ? "8px" : "12px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              },
              "",
              ""
            ),
          el = (e) =>
            (0, d.AH)(
              {
                position: "absolute",
                right: "10px",
                top: e ? "10px" : "4px",
                svg: { fill: "#25833E", width: "20px" },
              },
              "",
              ""
            ),
          tl = (0, d.AH)(
            "\n    color: #E81332;\n    font-size: 12px;\n    padding-left: 12px;\n    line-height: 16px;\n    display: inline-block;\n    padding-top: 4px;\n",
            "",
            ""
          ),
          nl = (e, t) => {
            switch (t) {
              case Ws.EMPTY:
                return (0, $.Y)("span", {
                  css: tl,
                  children: (0, $.Y)(_n, {
                    value: "fieldCannotBeEmpty",
                    fallback: "Field cannot be empty",
                  }),
                });
              case Ws.INVALID:
                return ((e) => {
                  let t = null;
                  switch (e) {
                    case tt.Vw.CHECKBOX:
                      t = {
                        value: "fieldRequired",
                        fallback: "This field is required",
                      };
                      break;
                    case tt.Vw.EMAIL:
                      t = {
                        value: "wrongEmailFormat",
                        fallback: "That email doesn't look quite right",
                      };
                      break;
                    case tt.Vw.NAME:
                      t = {
                        value: "wrongNameFormat",
                        fallback: "That name doesn't look quite right",
                      };
                      break;
                    case tt.Vw.NUMBER:
                      t = {
                        value: "wrongNumberFormat",
                        fallback: "That number doesn't look quite right",
                      };
                      break;
                    case tt.Vw.URL:
                      t = {
                        value: "wrongUrlFormat",
                        fallback: "That URL doesn't look quite right",
                      };
                      break;
                    case tt.Vw.PHONE:
                      t = {
                        value: "wrongPhoneFormat",
                        fallback: "That phone number doesn't look quite right",
                      };
                      break;
                    case tt.Vw.SELECT:
                      t = {
                        value: "chooseOneOfTheOptions",
                        fallback: "Choose one of the options",
                      };
                      break;
                    case tt.Vw.TEXT:
                    case tt.Vw.LONG_TEXT:
                    case tt.Vw.MULTISELECT:
                    default:
                      return null;
                  }
                  return (0, $.Y)("span", {
                    css: tl,
                    children: (0, $.Y)(_n, { ...t }),
                  });
                })(e);
              case Ws.VALID:
              default:
                return null;
            }
          };
        var il = (e) => {
            let {
              shouldDisplaySuccessIcon: t,
              validity: n,
              type: i,
              children: a,
            } = e;
            const { isNewSkin: o } = (0, p.A)();
            return (0, $.FD)("div", {
              css: Js(o),
              children: [
                a,
                t &&
                  (0, $.Y)("div", {
                    css: el(o),
                    children: (0, $.Y)(st.oh, {}),
                  }),
                nl(i, n),
              ],
            });
          },
          al = n(162),
          ol = n.n(al),
          rl = n(6701),
          sl = n(1797);
        const ll = { name: "cn3xcj", styles: "margin-bottom:12px" },
          dl = (e, t, n) =>
            (0, d.AH)(
              {
                border: "2px dashed " + (e ? "#E81332" : "#D3DBE5"),
                background: "#fff",
                padding: n ? "12px" : "22px 24px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                position: "relative",
                opacity: t ? 0.5 : 1,
                "&:focus": { outline: "none" },
                "& svg": { flexShrink: 0, fill: "#8796AF" },
                "& .message-upload svg": { fill: "#0566FF", stroke: "#0566FF" },
                ...(n && {
                  borderRadius: "var(--radius-component, 8px)",
                  border: "1px dashed " + (e ? "#E81332" : "#D3DBE5"),
                }),
              },
              "",
              ""
            ),
          cl = {
            name: "1ojnsow",
            styles: "display:flex;flex-direction:column;min-width:0",
          },
          ul = { name: "1kd3tv0", styles: "color:#647491" },
          pl = { name: "m43fa", styles: "color:#0566FF" },
          fl = (e, t) => {
            switch (e) {
              case sl.$m.FILE_TOO_BIG: {
                const e = (0, rl.y)(t),
                  n = (0, y.pw)(
                    "fileToBigAlert",
                    null,
                    "File exceed 10MB limit."
                  );
                return e?.limitInMB ? n.replace("10MB", `${e.limitInMB}MB`) : n;
              }
              case sl.$m.EXTENSION_NOT_SUPPORTED:
                return (0, y.pw)(
                  "fileFormatNotSupported",
                  { "{formatted_extensions}": `${ii.UO.join(", ")}.` },
                  "This file format is not supported. You can upload: {formatted_extensions}"
                );
              case sl.$m.GENERIC_UPLOAD_ERROR:
              default:
                return (0, y.pw)(
                  "genericFileUploadAlert",
                  null,
                  "Something went wrong when trying to upload your file."
                );
            }
          };
        var ml = (e) => {
          let {
            onFileAdd: t,
            fieldName: n,
            error: i,
            cause: a,
            requiredError: o,
            maxFiles: r,
            disabled: s,
          } = e;
          const { isNewSkin: l } = (0, p.A)(),
            {
              getRootProps: c,
              getInputProps: u,
              isDragActive: f,
            } = Xe({
              multiple: 1 !== r,
              onDropAccepted: (e) => {
                t(e);
              },
              maxFiles: r,
              disabled: s,
            });
          return (0, $.FD)("div", {
            css: ll,
            children: [
              (0, $.FD)("div", {
                ...c(),
                css: dl(Boolean(i), s, l),
                children: [
                  (0, $.Y)("input", {
                    ...u(),
                    "data-testid": "file-message-upload-input",
                  }),
                  (0, $.FD)("div", {
                    css:
                      ((m = f),
                      (0, d.AH)(
                        {
                          borderRadius: "6px",
                          padding: "22px 24px",
                          display: "flex",
                          alignItems: "center",
                          position: "absolute",
                          top: "-2px",
                          left: "-2px",
                          right: "-2px",
                          bottom: "-2px",
                          border: "2px solid #0566FF",
                          gap: "12px",
                          background: "#DCE9FF",
                          opacity: m ? 1 : 0,
                          transition: "opacity .2s",
                          "& svg": { flexShrink: 0, fill: "#0566FF" },
                        },
                        "",
                        ""
                      )),
                    children: [
                      (0, $.Y)(st.JM, {}),
                      (0, $.Y)("span", {
                        children: (0, y.pw)(
                          "dragAndDropInfo",
                          null,
                          "Drop here to attach"
                        ),
                      }),
                    ],
                  }),
                  (0, $.Y)(st.JM, {}),
                  (0, $.FD)("div", {
                    css: cl,
                    children: [
                      (0, $.Y)("span", { children: n }),
                      (0, $.FD)("span", {
                        css: ul,
                        children: [
                          (0, y.pw)(
                            "dragAndDrop",
                            null,
                            "Drag & drop here or "
                          ),
                          (0, $.Y)("span", {
                            css: pl,
                            children: (0, y.pw)("browse", null, "browse"),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              o
                ? (0, $.Y)("span", {
                    css: tl,
                    children: (0, y.pw)(
                      "fileIsRequired",
                      null,
                      "File is required"
                    ),
                  })
                : i && (0, $.Y)("span", { css: tl, children: fl(i, a) }),
            ],
          });
          var m;
        };
        const hl = {
          name: "dcos8h",
          styles:
            "background:#fff;border-radius:6px;position:relative;height:44px;display:flex;justify-content:center;margin-bottom:12px;align-items:center;&&& svg{position:static;height:auto;& .path{stroke:#0566FF;}}",
        };
        var gl = (e) => {
          let {
            filesToUpload: t,
            handleUploadedFile: n,
            handleUploadFinished: i,
            onUploadError: o,
          } = e;
          const [r, s] = (0, a.useState)([]);
          return (
            (0, a.useEffect)(() => {
              r.length === t.length && i();
            }, [t.length, i, r.length]),
            t.map((e) => {
              let { fileToUpload: t, id: i } = e;
              return r.some((e) => e === i)
                ? null
                : (0, $.Y)(
                    "div",
                    {
                      css: hl,
                      children: (0, $.Y)(sl.Ay, {
                        file: t,
                        sender: tt.D$.VISITOR,
                        handleSuccess: (e) =>
                          ((e, t) => {
                            n({
                              name: t.meta.name,
                              extension: t.meta.extension,
                              url: t.url,
                            }),
                              s((t) => [...t, e]);
                          })(i, e),
                        handleError: (e, t) =>
                          ((e, t, n) => {
                            s((t) => [...t, e]), o(t, n);
                          })(i, e, t),
                        customClassName: "form-file-uploading",
                        hideProgressInfo: !0,
                      }),
                    },
                    i
                  );
            })
          );
        };
        const bl = {
            name: "z4uwag",
            styles:
              "position:absolute;display:block;opacity:0;background:#fff;transition:all .2s;padding:6px 8px;box-shadow:0px 3px 8px rgba(0, 18, 46, 0.12);border-radius:4px;top:100%;left:50%;transform:translateX(-50%) translateY(-2px);pointer-events:none;z-index:1",
          },
          vl = {
            name: "1240cvo",
            styles:
              "&&&{opacity:0;transition:opacity .2s;display:flex;align-items:center;margin:0 0 0 auto;position:relative;flex-shrink:0;&:hover span{opacity:1;transform:translateX(-50%) translateY(2px);}}",
          },
          xl = (e, t) =>
            (0, d.AH)(
              {
                marginBottom: "12px",
                gap: "12px",
                background: "#fff",
                padding: t ? "8px 40px 8px 12px" : "8px 12px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                "&&&:hover button": { opacity: 1 },
                "& svg": { flexShrink: 0 },
                ...(e && {
                  padding: "12px 16px",
                  borderRadius: "var(--radius-component, 8px)",
                  border: "1px solid  var(--border-color, #D3DBE5)",
                  ":focus": {
                    border: "1px solid  var(--border-color, #D3DBE5)",
                  },
                }),
              },
              "",
              ""
            ),
          yl = {
            name: "sqm42b",
            styles: "text-overflow:ellipsis;white-space:nowrap;overflow:hidden",
          };
        var wl = (e) => {
          let {
            name: t,
            extension: n,
            onFileRemove: i,
            url: a,
            disabled: o,
            sent: r,
          } = e;
          const { isNewSkin: s } = (0, p.A)();
          return (0, $.FD)("div", {
            css: xl(s, r),
            className: "input-group",
            children: [
              (0, $.Y)(Wi, { extension: n }),
              (0, $.Y)("span", { css: yl, children: t }),
              !o &&
                (0, $.FD)("button", {
                  css: vl,
                  type: "button",
                  onClick: () => i(a),
                  className: "material-icons ripple ",
                  children: [
                    (0, $.Y)(st.d7, {}),
                    (0, $.Y)("span", {
                      css: bl,
                      children: (0, y.pw)("delete", null, "Delete"),
                    }),
                  ],
                }),
              r &&
                (0, $.Y)("div", { css: el(s), children: (0, $.Y)(st.oh, {}) }),
            ],
          });
        };
        var kl = (e) => {
          let {
            fileFieldValue: t,
            disabled: n,
            addFormFileMessageValue: i,
            removeFormFileMessageValue: o,
            fieldName: r,
            requiredError: s,
            disableFormSubmission: l,
            enableFormSubmission: d,
            sent: c,
            contactProperty: u,
          } = e;
          const [p, f] = (0, a.useState)([]),
            [m, h] = (0, a.useState)(null),
            [g, b] = (0, a.useState)(null),
            v = (0, a.useCallback)((e, t) => {
              h(e), b(t);
            }, []),
            x = null === u ? 10 : 1,
            y = (0, a.useCallback)(() => {
              d(), f([]);
            }, [d]),
            w = (0, a.useMemo)(
              () =>
                t.map((e) =>
                  (0, $.Y)(
                    wl,
                    {
                      name: e.name,
                      url: e.url,
                      extension: e.extension,
                      onFileRemove: o,
                      disabled: n,
                      sent: c,
                    },
                    e.url
                  )
                ),
              [n, t, o, c]
            );
          return (0, $.FD)($.FK, {
            children: [
              w,
              p.length > 0 &&
                (0, $.Y)(gl, {
                  filesToUpload: p,
                  handleUploadedFile: i,
                  onUploadError: v,
                  handleUploadFinished: y,
                }),
              !n &&
                t.length < x &&
                (0, $.Y)(ml, {
                  onFileAdd: (e) => {
                    h(null),
                      f(e.map((e) => ({ id: ol()(), fileToUpload: e }))),
                      l();
                  },
                  fieldName: r,
                  error: m,
                  cause: g,
                  requiredError: s,
                  maxFiles: x - t.length,
                  disabled: Boolean(p.length),
                }),
            ],
          });
        };
        const Al = { name: "bjn8wh", styles: "position:relative" },
          Cl = (e, t, n) =>
            (0, d.AH)(
              {
                width: "100%",
                appearance: "none",
                fontSize: "15px",
                lineHeight: "19px",
                padding: "9px 35px 9px 12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "white",
                textOverflow: "ellipsis",
                color: "#080F1A",
                ":disabled": { opacity: 1 },
                ...(e && { color: "#647491" }),
                ...(n && {
                  padding: "12px 16px",
                  borderRadius: "var(--radius-component, 8px)",
                  border: "1px solid  var(--border-color, #D3DBE5)",
                  ":focus, :active": {
                    border: "1px solid  var(--border-color, #D3DBE5)",
                  },
                }),
                ...(t && {
                  outline: "1px solid #E81332",
                  ":focus": { outline: "1px solid #E81332" },
                }),
              },
              "",
              ""
            ),
          El = {
            name: "7n6fsf",
            styles:
              "position:absolute;top:0px;bottom:0px;right:8px;pointer-events:none;display:flex;justify-content:center;align-items:center;svg{fill:#080F1A;}",
          };
        var Sl = (e) => {
          let {
            placeholder: t,
            onChange: n,
            value: i,
            options: a,
            hasError: o = !1,
            disabled: r,
          } = e;
          const { isNewSkin: s } = (0, p.A)();
          return (0, $.FD)("div", {
            css: [Al, "", ""],
            children: [
              (0, $.FD)("select", {
                css: Cl(!i, o, s),
                value: i,
                onChange: (e) => n(e.target.value),
                disabled: r,
                children: [
                  (0, $.Y)("option", {
                    value: "",
                    selected: !0,
                    disabled: !0,
                    hidden: !0,
                    children: t,
                  }),
                  a.map((e) =>
                    (0, $.Y)(
                      "option",
                      { value: e.value, children: e.value },
                      e.value
                    )
                  ),
                ],
              }),
              !r && (0, $.Y)("div", { css: El, children: (0, $.Y)(st.yd, {}) }),
            ],
          });
        };
        const Dl = (e, t, n) =>
            (0, d.AH)(
              {
                padding: n ? "8px 40px 8px 12px" : "8px 12px",
                borderRadius: 6,
                fontSize: 15,
                border: "none",
                color: "#080F1A",
                textOverflow: "ellipsis",
                "&::placeholder": { color: "#647491" },
                "&:disabled": { background: "#fff" },
                ...(t && {
                  padding: "12px 16px",
                  borderRadius: "var(--radius-component, 8px)",
                  border: "1px solid  var(--border-color, #D3DBE5)",
                  "&:focus, &:active": {
                    border: "1px solid  var(--border-color, #D3DBE5)",
                  },
                }),
                ...(e && {
                  outline: "1px solid #E81332",
                  "&:focus, &:active": { outline: "1px solid #E81332" },
                }),
              },
              "",
              ""
            ),
          Yl = (e, t) =>
            (0, d.AH)(
              {
                color: "#E81332",
                fontSize: 12,
                lineHeight: "16px",
                display: "inline-block",
                ...(e && t && { margin: "12px 0" }),
              },
              "",
              ""
            ),
          Tl = (0, d.AH)(
            {
              marginBottom: 12,
              display: "block",
              marginTop: -30,
              paddingTop: 30,
            },
            "",
            ""
          ),
          Fl = { name: "1ykowef", styles: "margin-bottom:0" },
          _l = (e, t) =>
            (0, d.AH)(
              {
                border: "1px solid var(--border-color, #D3DBE5)",
                padding: "2px 14px",
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                borderRadius: 24,
                flexShrink: 0,
                "&:disabled": { color: "#ACB8CB" },
                svg: {
                  marginRight: 7,
                  fill: "#ACB8CB",
                  height: 19,
                  width: "auto",
                  marginLeft: -2,
                },
                ".loader-icon.circular": {
                  position: "static",
                  circle: { stroke: e },
                },
                ...(t && {
                  borderRadius: "var(--radius-component, 8px)",
                  background: "var(--custom-action-color)",
                  color: "var(--custom-action-color-contrast)",
                  border: "none",
                  padding: "12px",
                  width: "100%",
                  height: "unset",
                  ":disabled": {
                    background: "var(--custom-action-color)",
                    color: "var(--custom-action-color-contrast)",
                    svg: { fill: "var(--custom-action-color-contrast)" },
                  },
                }),
              },
              "",
              ""
            ),
          Il = (e) =>
            (0, d.AH)(
              {
                display: "flex",
                justifyContent: "space-between",
                gap: 30,
                alignItems: "center",
                ...(e && { gap: 0, flexDirection: "column" }),
              },
              "",
              ""
            ),
          Ml = {
            name: "3luo5m",
            styles:
              "display:flex;align-items:center;font-size:14px;color:#080F1A;position:relative;svg{display:none;}input:checked + svg{display:block;position:absolute;width:14px;left:2px;}",
          },
          Nl = (e, t) =>
            (0, d.AH)(
              {
                appearance: "none",
                width: 18,
                height: 18,
                borderRadius: 4,
                border: "2px solid #647491",
                margin: "0 12px 0 0",
                flexShrink: 0,
                "&:focus, &:active": {
                  border: "2px solid #647491",
                  boxShadow: `0 0 2px 0 ${e}`,
                },
                "&:checked": { borderColor: e, backgroundColor: e },
                ...(t && { borderColor: "#E81332" }),
              },
              "",
              ""
            ),
          Rl = (e) => (0, d.AH)({ maxWidth: e ? "300px" : "none" }, "", "");
        var Ol = (e) => {
          let { form: t, content: n, id: i } = e;
          const {
              formValues: o,
              formSubmitting: s,
              formValidityState: l,
              formRef: d,
              titleRef: c,
              handleSubmit: u,
              handleChange: f,
              hasErrors: m,
              sent: h,
              disabled: g,
              enableFormSubmission: b,
              disableFormSubmission: v,
              isSubmissionDisabled: x,
              removeItemFromArrayFormField: y,
              addItemToArrayFormField: w,
            } = Zs({ form: t, messageId: i }),
            k = (0, r.d4)(C.fO),
            { isNewSkin: A } = (0, p.A)(),
            E = ut(A),
            S = (0, a.useCallback)(
              (e) => {
                const t = l[e.id] !== Ws.VALID,
                  n = o[e.id],
                  i = {
                    placeholder: e.name,
                    css: [Dl(t, A, h), E.text14],
                    disabled: g,
                    readOnly: h,
                    value: String(n),
                    onChange: (t) => f(e.id, t.target.value),
                  };
                let a = null;
                switch (e.type) {
                  case tt.Vw.CHECKBOX:
                    a = (0, $.FD)("label", {
                      css: Ml,
                      children: [
                        (0, $.Y)("input", {
                          css: Nl(k[3], t),
                          disabled: h || g,
                          checked: Boolean(n),
                          type: "checkbox",
                          onChange: (t) => f(e.id, t.target.checked),
                        }),
                        (0, $.Y)(st.oh, {}),
                        e.name,
                      ],
                    });
                    break;
                  case tt.Vw.EMAIL:
                    a = (0, $.Y)("input", { ...i, type: "email" });
                    break;
                  case tt.Vw.NAME:
                    a = (0, $.Y)("input", { ...i, type: "text" });
                    break;
                  case tt.Vw.LONG_TEXT:
                    a = (0, $.Y)("textarea", {
                      ...i,
                      onChange: (t) => f(e.id, t.target.value),
                    });
                    break;
                  case tt.Vw.TEXT:
                    a = (0, $.Y)("input", { ...i, type: "text" });
                    break;
                  case tt.Vw.NUMBER:
                    a = (0, $.Y)("input", { ...i, type: "number" });
                    break;
                  case tt.Vw.URL:
                    a = (0, $.Y)("input", { ...i, type: "text" });
                    break;
                  case tt.Vw.PHONE:
                    a = (0, $.Y)("input", { ...i, type: "tel" });
                    break;
                  case tt.Vw.SELECT:
                    a = (0, $.Y)(Sl, {
                      placeholder: e.name,
                      disabled: h || g,
                      value: String(n),
                      onChange: (t) => f(e.id, t),
                      hasError: t,
                      options: e.choices?.map((e) => ({ value: e.name })) || [],
                    });
                    break;
                  case tt.Vw.FILE:
                    return "object" == typeof n
                      ? (0, $.Y)(
                          kl,
                          {
                            fileFieldValue: n,
                            disabled: h || g,
                            addFormFileMessageValue: (t) => w(e.id, t),
                            removeFormFileMessageValue: (t) => {
                              y(e.id, "url", t);
                            },
                            enableFormSubmission: b,
                            disableFormSubmission: v,
                            requiredError: l[e.id] === Ws.EMPTY,
                            fieldName: e.name,
                            sent: h,
                            contactProperty: e.contact_property,
                          },
                          e.id
                        )
                      : null;
                  case tt.Vw.MULTISELECT:
                  default:
                    return null;
                }
                return (0, $.Y)(
                  il,
                  {
                    type: e.type,
                    validity: l[e.id],
                    shouldDisplaySuccessIcon: e.type !== tt.Vw.CHECKBOX && h,
                    children: a,
                  },
                  e.id
                );
              },
              [l, o, A, h, E.text14, g, f, k, b, v, w, y]
            );
          return (0, $.FD)("div", {
            className: "message message-operator message-form",
            css: Rl(A),
            children: [
              (0, $.Y)("span", { css: Tl, ref: c, children: n }),
              (0, $.FD)("form", {
                onSubmit: u,
                ref: d,
                noValidate: !0,
                css: Fl,
                children: [
                  t.map(S),
                  (0, $.FD)("div", {
                    css: Il(A),
                    children: [
                      (0, $.Y)("span", {
                        css: Yl(A, m),
                        children:
                          m &&
                          (0, $.Y)(_n, {
                            value: "fieldsNotFilledCorrectly",
                            fallback:
                              "Some fields are not filled out correctly. Please check.",
                          }),
                      }),
                      h
                        ? (0, $.FD)("button", {
                            css: _l(k[3], A),
                            disabled: !0,
                            type: "submit",
                            children: [
                              (0, $.Y)(st.oh, {}),
                              (0, $.Y)(_n, { value: "sent", fallback: "Sent" }),
                            ],
                          })
                        : (0, $.Y)("button", {
                            css: _l(k[3], A),
                            disabled: m || s || g || x,
                            type: "submit",
                            children: s
                              ? (0, $.Y)(st.aH, {})
                              : (0, $.Y)(_n, {
                                  value: "submit",
                                  fallback: "Submit",
                                }),
                          }),
                    ],
                  }),
                ],
              }),
            ],
          });
        };
        n(5969), n(556), n(8391);
        const jl = { name: "52b1oc", styles: "padding:0px" },
          Ll = { name: "1i6h5fz", styles: "padding:10px 16px" },
          zl = { name: "b98346", styles: "font-weight:600;font-size:16px" },
          Ul = {
            name: "1l3f72l",
            styles:
              "font-size:14px;line-height:15px;color:#00122E;margin-top:6px;white-space:pre-line",
          },
          Pl = {
            name: "yjkvjr",
            styles:
              "font-size:14px;line-height:18px;letter-spacing:-0.15px;color:#00122E;opacity:0.5;margin-top:4px",
          },
          Bl = {
            name: "1nrim5w",
            styles:
              "font-size:16px;line-height:20px;color:var(--custom-action-color, #0566ff);letter-spacing:-0.17px;background-color:var(--operator-message, white);width:100%;padding:8px 16px;border:1px solid var(--operator-message, #E9ECF0);border-top:none;&:last-child{border-bottom-left-radius:var(--radius-component, 20px);border-bottom-right-radius:var(--radius-component, 20px);}.grid-layout &:hover{text-decoration:underline;}outline:none",
          };
        var Hl = (e) => {
          let { title: t, subtitle: n, buttons: i } = e;
          const a = (0, r.wA)(),
            { isNewSkin: o } = (0, p.A)(),
            s = ut(o);
          return (0, $.FD)("div", {
            className: "message message-operator",
            css: jl,
            children: [
              (0, $.FD)("div", {
                css: Ll,
                children: [
                  (0, $.Y)("p", { css: zl, children: t }),
                  (0, $.Y)("p", { css: Ul, children: n }),
                  (0, $.Y)("p", {
                    css: Pl,
                    children: (() => {
                      try {
                        return new URL(i[0]?.url || "").hostname.replace(
                          "www.",
                          ""
                        );
                      } catch {
                        return "";
                      }
                    })(),
                  }),
                ],
              }),
              i.map((e) =>
                (0, $.Y)(
                  "button",
                  {
                    type: "button",
                    css: [Bl, s.text14, "", ""],
                    onClick: () =>
                      ((e) => {
                        "url" === e.type &&
                          e.url &&
                          (a((0, k.QT$)(e.url)),
                          a((0, k.RA7)(e.title, e.payload)),
                          a((0, k.pO6)(rt.X.iframeModalButtonClicked)));
                      })(e),
                    children: e.title,
                  },
                  e.title
                )
              ),
            ],
          });
        };
        const ql = a.lazy(() => n.e(402).then(n.bind(n, 8956)));
        var $l = (e) =>
            (0, $.Y)(a.Suspense, {
              fallback: null,
              children: (0, $.Y)(ql, {
                questionMessageId: e.questionMessageId,
              }),
            }),
          Vl = n(146);
        const Wl = (e) => {
          let {
            questionMessageId: t,
            messageId: n,
            aiAssistantActionLogId: i,
          } = e;
          const o = (0, a.useRef)(null),
            r = (0, a.useRef)();
          (0, a.useEffect)(() => {
            window.tidioChatApi?.trigger("reviewSourcesDisplayed");
          }, []);
          const s = (0, a.useCallback)(() => {
            window.tidioChatApi?.trigger("reviewSourcesClicked", {
              questionMessageId: t,
              messageId: n,
              aiAssistantActionLogId: i,
            });
          }, [t, n, i]);
          return (
            (0, a.useEffect)(
              () => (
                (r.current = setTimeout(() => {
                  o.current?.scrollIntoView({ behavior: "smooth" });
                }, 150)),
                () => {
                  r.current && clearTimeout(r.current);
                }
              ),
              []
            ),
            (0, $.FD)("div", {
              className: "message message-operator timestamp-visible",
              css: Vl.b,
              children: [
                (0, $.Y)(st.H0, {}),
                (0, $.FD)("div", {
                  children: [
                    (0, $.Y)("p", {
                      children: (0, y.pw)(
                        "reviewSourcesDescription",
                        null,
                        "AI response based on your data sources."
                      ),
                    }),
                    (0, $.Y)("button", {
                      css: Vl.V,
                      type: "button",
                      onClick: s,
                      children: (0, y.pw)(
                        "reviewSources",
                        null,
                        "Review sources"
                      ),
                    }),
                  ],
                }),
                (0, $.FD)("div", {
                  className: "messageTimestamp",
                  ref: o,
                  children: [
                    (0, $.Y)(st.bM, {}),
                    (0, y.pw)("onlyVisibleToYou", null, "Only visible to you"),
                  ],
                }),
              ],
            })
          );
        };
        var Kl = (0, a.memo)(Wl);
        var Gl = (e) =>
          (0, $.Y)(a.Suspense, {
            fallback: null,
            children: (0, $.Y)(Kl, {
              questionMessageId: e.questionMessageId,
              messageId: e.messageId,
              aiAssistantActionLogId: e.aiAssistantActionLogId,
            }),
          });
        var Xl = (e) => {
          let { content: t, operator_id: n, time_sent: i } = e;
          const o = (0, r.wA)(),
            [s, l] = (0, a.useState)(!1),
            d = (0, a.useRef)(null),
            c = (0, a.useRef)(null),
            u = Wo(t);
          (0, a.useEffect)(() => {
            Go({ spanRef: d, wrapperRef: c, minWidth: u ? 248 : void 0 });
          }, [u]);
          const p = Dn(t);
          return (0, $.FD)("div", {
            className:
              "message message-operator " + (s ? "timestamp-visible" : ""),
            onClick: (e) => {
              const { target: t } = e;
              !Zo(t) || t.closest("a") || t.classList.contains("emoji")
                ? l((e) => !e)
                : o((0, k.qKn)(t.src));
            },
            ref: c,
            children: [
              (0, $.Y)("span", {
                className: "message-content message-content--markdown",
                dangerouslySetInnerHTML: { __html: p },
                ref: d,
              }),
              u && (0, $.Y)(xs, { url: u }),
              (0, $.Y)(Ti, {
                in: s,
                children: (0, $.Y)(cs, { time: i, operatorId: n }),
              }),
            ],
          });
        };
        var Ql = (e) => {
          let { preChatFields: t } = e;
          const n = (0, r.d4)((e) => e.visitor);
          return (0, $.FD)("div", {
            className: "message message-operator pre-chat",
            children: [
              (0, $.Y)(_n, {
                value: "preformMessage",
                emojify: !0,
                linkify: !0,
              }),
              t.map((e) =>
                (0, $.Y)(
                  hi,
                  {
                    type: e.type,
                    placeholder: e.placeholder,
                    value: n[e.type],
                    disabled: !0,
                  },
                  e.type
                )
              ),
            ],
          });
        };
        const Zl = {
          name: "aqa3m9",
          styles:
            "&&{padding:12px 16px !important;&:hover{background:var(--custom-action-color);color:var(--custom-action-color-contrast);text-decoration:none !important;}}",
        };
        var Jl = (e) => {
          let { quickReply: t, onButtonClick: n, metadata: i } = e;
          const o = (0, a.useRef)(null),
            r = (0, a.useRef)(null),
            s = (0, h.AL)(),
            { isNewSkin: l } = (0, p.A)(),
            d = ut(l),
            c = (0, a.useCallback)(() => {
              if (o.current && r.current) {
                const e = l ? 38 : 34;
                (o.current.style.width = `${r.current.offsetWidth + e}px`),
                  r.current.classList.add("line-clamp");
              }
            }, [l]);
          return (
            (0, a.useEffect)(() => {
              s && s.requestAnimationFrame(c);
            }, [s, c]),
            (0, $.Y)("button", {
              ref: o,
              type: "button",
              title: t.title,
              onClick: () => {
                n(t, i);
              },
              css: l ? Zl : void 0,
              children: (0, $.Y)("span", {
                ref: r,
                dangerouslySetInnerHTML: { __html: Yn(t.title) },
                css: d.text14,
              }),
            })
          );
        };
        const ed = (e) => {
          let {
            quickReplies: t,
            messageId: n,
            disabled: i = !1,
            metadata: o,
          } = e;
          const s = (0, r.wA)(),
            l = (0, r.d4)((e) => (0, C.mV)(e, n));
          (0, a.useEffect)(() => {
            l || i || s((0, k.J7g)(n));
          }, [i, s, l, n]);
          const d = (0, a.useCallback)(
            function (e) {
              let { payload: t, title: n, type: i } = e,
                { is_ai_assistant_task: a } =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              return (
                s((0, k.RA7)(n, t, { is_ai_assistant_task: a })),
                s(
                  (0, k.pO6)(
                    "bot" !== i
                      ? rt.X.quickReplyClicked
                      : rt.X.botStartedFromBotsMenu
                  )
                ),
                !0
              );
            },
            [s]
          );
          return i || !l
            ? null
            : (0, $.Y)("div", {
                className: "button-wrapper",
                children: t.map((e) =>
                  (0, $.Y)(
                    Jl,
                    { quickReply: e, onButtonClick: d, metadata: o },
                    `${e.title}${e.payload}`
                  )
                ),
              });
        };
        var td = (0, a.memo)(ed);
        var nd = (e) => {
          let { disabled: t, type: n, id: i, content: o } = e;
          const s = (0, r.wA)(),
            l = (0, r.d4)((e) => e.sendVisitorMessageFlag),
            [d, c] = (0, a.useState)(!1),
            [u, p] = (0, a.useState)(""),
            f = n === tt.Go.RATE_COMMENT_GOOD;
          (0, a.useEffect)(() => {
            !t && l && d && s((0, k.FBW)(i, u));
          }, [u, t, s, i, d, l]);
          return (0, $.FD)("div", {
            className: "message message-operator rate-comment",
            children: [
              (0, $.Y)("span", {
                dangerouslySetInnerHTML: {
                  __html: Sn(
                    (0, y.pw)(
                      f ? "commentForGoodRating" : "commentForBadRating",
                      null,
                      f
                        ? "Thank you for your rate \ud83d\ude0d Would you like to leave a comment?"
                        : "Thank you for your rate \ud83d\ude25 Would you like to leave a comment?"
                    )
                  ),
                },
              }),
              (0, $.Y)(On, {
                type: "text",
                placeholder: "typeOptional",
                onChange: p,
                onKeyDown: (e) =>
                  !(13 !== e || !d) && (s((0, k.zrs)(!0)), (0, h.yG)(), !0),
                isValidCallback: c,
                value: t ? o : null,
                disabled: t,
              }),
            ],
          });
        };
        var id = (e) => {
            const t = (0, r.wA)(),
              { isNewSkin: n } = (0, p.A)(),
              i = ut(n),
              a = (0, r.d4)(C.tf),
              o = (n) => {
                if (a)
                  t(
                    (0, k.S79)(
                      (0, y.pw)(
                        "disabledTextInputPlaceholder",
                        null,
                        "Choose one of the options above \u261d\ufe0f"
                      )
                    )
                  );
                else {
                  const i = n
                    ? (0, y.pw)("rateSatisfied", null, "Yes, I did!")
                    : (0, y.pw)(
                        "rateDissatisfied",
                        null,
                        "No. I\u2019m not satisfied."
                      );
                  t((0, k.G8c)(i, !1)), t((0, k.WBW)(n)), t((0, k.J7g)(e.id));
                }
              };
            return (0, $.FD)("div", {
              className:
                "message message-operator message-with-buttons " +
                (e.disabled ? "buttons-hidden" : ""),
              children: [
                (0, $.Y)("span", {
                  children: (0, $.Y)(_n, { value: "rateConversationMessage" }),
                }),
                !e.disabled &&
                  (0, $.FD)("div", {
                    className: "button-wrapper",
                    children: [
                      (0, $.Y)("button", {
                        type: "button",
                        onClick: () => o(!0),
                        children: (0, $.Y)("span", {
                          css: i.text14,
                          children: (0, $.Y)(_n, { value: "rateSatisfied" }),
                        }),
                      }),
                      (0, $.Y)("button", {
                        type: "button",
                        onClick: () => o(!1),
                        children: (0, $.Y)("span", {
                          css: i.text14,
                          children: (0, $.Y)(_n, { value: "rateDissatisfied" }),
                        }),
                      }),
                    ],
                  }),
              ],
            });
          },
          ad = n(3952);
        var od = {
          container: {
            name: "28er4a",
            styles:
              "overflow:hidden;border:1px solid #E6E8EF;border-radius:16px;display:flex;flex-direction:column",
          },
          image: {
            name: "2i0cyl",
            styles:
              "width:100%;height:174px;object-fit:cover;object-position:center center;pointer-events:none;user-select:none",
          },
          getContentContainer: (e, t) =>
            (0, d.AH)(
              {
                display: "flex",
                flexDirection: "column",
                gap: 12,
                padding: "20px 24px",
                borderRadius: 16,
                ...(t && {
                  marginTop: e ? -8 : -16,
                  position: "relative",
                  overflow: "hidden",
                  background:
                    "linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1))",
                  WebkitBackdropFilter: "blur(20px)",
                  backdropFilter: "blur(20px)",
                  ...(e && { borderTopLeftRadius: 0, borderTopRightRadius: 0 }),
                }),
              },
              "",
              ""
            ),
          textsContainer: {
            name: "1389q7x",
            styles:
              "display:flex;justify-content:space-between;gap:4px;z-index:1",
          },
          buttonsContainer: {
            name: "1hk28hk",
            styles: "display:flex;flex-direction:column;gap:12px;z-index:1",
          },
          titleText: { name: "16ceglb", styles: "font-weight:600" },
          currencyText: {
            name: "1iyo3kg",
            styles: "color:#4C596B;font-size:14px",
          },
          primaryButton: (e, t) =>
            (0, d.AH)(
              {
                width: "100%",
                padding: t ? "12px 0px" : "10px 0px",
                borderRadius: "var(--radius-component, 6px)",
                ...(!t && { fontWeight: 600 }),
                position: "relative",
                "&:disabled:hover": { cursor: e ? "progress" : "default" },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  borderRadius: "var(--radius-component, 6px)",
                  background: "transparent",
                  transition: "background .5s ease",
                },
                "&:disabled:before": { background: "rgba(255, 242, 246, 0.5)" },
                transition: "filter .2s",
                "&:not(:disabled):hover": { filter: "brightness(90%)" },
              },
              "",
              ""
            ),
          secondaryButton: (e) =>
            (0, d.AH)(
              {
                width: "100%",
                ...(!e && { fontWeight: 600 }),
                "&:focus": { outline: "none" },
                "&:hover": { textDecoration: "underline" },
              },
              "",
              ""
            ),
          addedToCartButton: (e) =>
            (0, d.AH)(
              {
                padding: "10px 0px",
                borderRadius: "var(--radius-component, 6px)",
                ...(!e && { fontWeight: 600 }),
                backgroundColor: "#EFF2F6",
                color: "#647491",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                "& svg": { fill: "#34B857", width: 19, height: 19 },
                "&:disabled:hover": { cursor: "default" },
              },
              "",
              ""
            ),
        };
        const rd = "learn_more_clicked_for_product_id",
          sd = "add_to_cart_clicked_for_product_id";
        var ld = (e) => {
          let {
            id: t,
            title: n,
            imageUrl: i,
            price: o,
            currency: s,
            variants: l,
            url: d,
            buttonPayload: c,
            chatBotId: u,
            isAddToCartEnabled: m,
            messageId: h,
          } = e;
          const g = (0, r.wA)(),
            b = `${h}_${t}`,
            x = (0, A.vu)(sd) === b,
            [w, C] = (0, a.useState)(!1),
            [E, S] = (0, a.useState)(x),
            D = (0, f.IF)(d),
            Y = l.length <= 1,
            T = Boolean(i),
            F = (0, a.useRef)(),
            _ = (0, a.useRef)((0, A.vu)(rd)),
            { isNewSkin: I } = (0, p.A)(),
            M = ut(I),
            N = () => {
              g((0, k.C2_)({ productId: t, chatBotId: u })),
                C(!1),
                S(!0),
                (0, A.Ho)(sd, b);
            };
          let R;
          try {
            R = new Intl.NumberFormat((0, f.mf)() || "en-US", {
              style: "currency",
              currency: s,
              currencyDisplay: "narrowSymbol",
            });
          } catch (e) {
            e instanceof Error &&
              (0, v.sQ)("Wrong currency provided to recommended product", {
                message: e.message,
              });
          }
          const O = (0, a.useCallback)(() => {
            g(
              (0, k.RA7)(
                `${n} &rarr; ${(0, y.pw)(
                  "recommendProductLearnMore",
                  null,
                  "Learn more"
                )}`,
                c
              )
            ),
              g((0, k.C2_)({ productId: t, chatBotId: u })),
              g((0, k.pO6)(rt.X.productRecommendationLearnMoreClicked));
          }, [c, u, g, t, n]);
          (0, a.useEffect)(() => {
            _.current === b && ((_.current = void 0), (0, A.lE)(rd), O());
          }, [O, b]),
            (0, a.useEffect)(() => {
              x && S(!0);
            }, [x]),
            (0, a.useEffect)(() => {
              E &&
                (F.current = setTimeout(() => {
                  (0, A.lE)(sd), S(!1);
                }, 1e4));
            }, [E]),
            (0, a.useEffect)(
              () => () => {
                clearTimeout(F.current);
              },
              []
            );
          const j = (0, $.Y)("button", {
            type: "button",
            css: od.secondaryButton(I),
            onClick: () => {
              try {
                if (-1 === d.indexOf("://") && window.top) {
                  (0, A.Ho)(rd, b) || O(), window.top.location.assign(d);
                } else O(), window.open(D);
              } catch {
                O(), window.open(D);
              }
            },
            children: (0, $.Y)(_n, {
              value: "recommendProductLearnMore",
              fallback: "Learn more",
            }),
          });
          return (0, $.FD)("div", {
            css: od.container,
            children: [
              i && (0, $.Y)("img", { src: i, alt: n, css: od.image }),
              (0, $.FD)("div", {
                css: od.getContentContainer(I, T),
                children: [
                  (0, $.FD)("div", {
                    css: od.textsContainer,
                    children: [
                      (0, $.Y)("p", {
                        css: [od.titleText, M.text14Medium, "", ""],
                        children: n,
                      }),
                      R &&
                        (0, $.Y)("p", {
                          css: od.currencyText,
                          children: R.format(o / 100),
                        }),
                    ],
                  }),
                  (0, $.Y)("div", {
                    css: od.buttonsContainer,
                    children: Y
                      ? (0, $.FD)($.FK, {
                          children: [
                            E &&
                              (0, $.FD)("button", {
                                type: "button",
                                disabled: !0,
                                css: od.addedToCartButton(I),
                                children: [
                                  (0, $.Y)(st.oh, {}),
                                  (0, $.Y)(_n, {
                                    value: "recommendProductAdded",
                                    fallback: "Added",
                                  }),
                                ],
                              }),
                            !E &&
                              (0, $.Y)("button", {
                                type: "button",
                                style: m
                                  ? {
                                      background: "var(--custom-background)",
                                      color: "var(--custom-text-color)",
                                    }
                                  : {},
                                onClick: async () => {
                                  if (
                                    (C(!0),
                                    g(
                                      (0, k.RA7)(
                                        `${n} &rarr; ${(0, y.pw)(
                                          "recommendProductAddToCart",
                                          null,
                                          "Add to cart"
                                        )}`,
                                        c
                                      )
                                    ),
                                    g(
                                      (0, k.pO6)(
                                        rt.X
                                          .productRecommendationAddToCartClicked
                                      )
                                    ),
                                    (0, f.MI)())
                                  )
                                    N();
                                  else if (1 === l.length)
                                    try {
                                      const e = await (0, ad.Il)(l[0].id);
                                      e.ok ||
                                        (0, v.sQ)(
                                          "Shopify add to cart request failed",
                                          { message: e.statusText }
                                        ),
                                        N();
                                    } catch (e) {
                                      e instanceof Error &&
                                        (0, v.sQ)(
                                          "Shopify add to cart request failed",
                                          { message: e.message }
                                        ),
                                        C(!1);
                                    }
                                },
                                disabled: !m || w,
                                css: od.primaryButton(w, I),
                                children: (0, $.Y)(_n, {
                                  value: "recommendProductAddToCart",
                                  fallback: "Add to cart",
                                }),
                              }),
                            j,
                          ],
                        })
                      : j,
                  }),
                ],
              }),
            ],
          });
        };
        const dd = (0, d.i7)({
            "0%": { transform: "translateY(50%)", opacity: 0 },
            "100%": { transform: "translateX(0)", opacity: 1 },
          }),
          cd = { name: "18uqayh", styles: "margin-bottom:16px" },
          ud = (0, d.AH)(
            {
              willChange: "transform, opacity",
              opacity: 0,
              animation: `${dd} .5s ease-out forwards`,
            },
            "",
            ""
          );
        var pd = (e) => {
          let {
            title: t,
            products: n,
            buttonPayload: i,
            chatBotId: a,
            isFlyMessage: o,
            messageId: r,
          } = e;
          const s = n.every((e) => !e.imageUrl);
          return a
            ? (0, $.FD)($.FK, {
                children: [
                  o
                    ? (0, $.Y)("p", { css: cd, children: t })
                    : (0, $.Y)("div", {
                        className: "message message-operator",
                        css: ud,
                        children: (0, $.Y)("p", { children: t }),
                      }),
                  (0, $.Y)(_s, {
                    items: n,
                    renderItem: (e, t) =>
                      (0, d.n)(ld, {
                        ...e,
                        buttonPayload: i,
                        chatBotId: a,
                        isAddToCartEnabled: !o || t,
                        key: e.id,
                        messageId: r,
                      }),
                    isFlyMessage: o,
                    isWithoutImages: s,
                  }),
                ],
              })
            : null;
        };
        const fd = [
          { value: "\ud83d\ude21", rating: 1 },
          { value: "\ud83d\ude41", rating: 2 },
          { value: "\ud83d\ude10", rating: 3 },
          { value: "\ud83d\ude00", rating: 4 },
          { value: "\ud83d\ude0d", rating: 5 },
        ];
        const md = {
            name: "z5kyat",
            styles:
              "display:flex;align-items:flex-start;gap:16px;border-radius:var(--radius-component, 6px);background:white;padding:12px 16px;textarea{height:74px;font-size:14px;line-height:18px;padding:0;::placeholder{color:#647491;}}",
          },
          hd = {
            name: "13sh2s6",
            styles: "border:1px solid var(--border-color, #D3DBE5)",
          },
          gd = {
            name: "d6uxtt",
            styles:
              "outline:none;svg{width:20px;height:20px;fill:var(--custom-action-color, #0566FF);}",
          };
        var bd = (e) => {
          let { threadSource: t, threadId: n, messageId: i, comment: o } = e;
          const s = (0, r.wA)(),
            { isNewSkin: l } = (0, p.A)(),
            [d, c] = (0, a.useState)(""),
            u = () => {
              s((0, k.Ocp)(d, t, n, i)),
                s(
                  (0, k.tjR)(
                    (0, ii.oy)(t, n, i, tt.Go.AUTOMATIC_SURVEY_COMMENTED)
                  )
                ),
                (0, h.yG)();
            };
          return (0, $.FD)("div", {
            css: [md, l && hd, "", ""],
            children: [
              (0, $.Y)(On, {
                type: "textarea",
                placeholder: "satisfactionSurveyCommentPlaceholder",
                onChange: c,
                onKeyDown: (e) => 13 === e && (u(), !0),
                value: o || null,
                showIcon: !1,
              }),
              (0, $.Y)("button", {
                "data-testid": "send-survey-button",
                type: "button",
                css: gd,
                onClick: u,
                children: (0, $.Y)(st.qx, {}),
              }),
            ],
          });
        };
        const vd = {
            name: "3w0yoi",
            styles: "display:flex;flex-direction:column;gap:8px",
          },
          xd = { name: "10rtstj", styles: "padding:16px" };
        var yd = (e) => {
          let {
            threadSource: t,
            threadId: n,
            messageId: i,
            commentQuestion: a,
            comment: o,
          } = e;
          const { isNewSkin: r } = (0, p.A)();
          return (0, $.Y)("div", {
            className: "message message-operator",
            css: !r && xd,
            children: (0, $.FD)("div", {
              css: vd,
              children: [
                (0, $.Y)("span", { children: a }),
                (0, $.Y)(bd, {
                  threadSource: t,
                  threadId: n,
                  messageId: i,
                  comment: o,
                }),
              ],
            }),
          });
        };
        const wd = {
            name: "185awep",
            styles:
              "display:flex;flex-direction:column;gap:8px;max-width:300px",
          },
          kd = {
            name: "gg1ryz",
            styles:
              "display:flex;align-items:center;clear:both;position:relative;gap:8px;transition:margin 0.28s ease-in-out",
          },
          Ad = {
            name: "9hogcj",
            styles:
              "border:1px solid var(--custom-action-color);letter-spacing:-0.01em",
          },
          Cd = {
            name: "1d30wqf",
            styles:
              "background:var(--custom-action-color);color:var(--custom-action-color-contrast)",
          },
          Ed = {
            name: "q0a4az",
            styles:
              "color:#06132b;border:1px solid var(--custom-action-color, #0566ff);outline:none;padding:12px;border-radius:var(--radius-component, 12px);display:inline-block;clear:both;position:relative;font-size:15px;img{min-width:18px;min-height:18px;width:18px;height:18px;}:hover{background:var(--custom-action-color);color:var(--custom-action-color-contrast);}",
          };
        var Sd = (e) => {
          let {
            threadSource: t,
            threadId: n,
            messageId: i,
            rateQuestion: a,
            scale: o,
            selectedRating: s,
          } = e;
          const l = (0, r.wA)();
          return (0, $.FD)($.FK, {
            children: [
              (0, $.Y)("div", {
                className: "message message-operator",
                children: a,
              }),
              (0, $.FD)("div", {
                className: "message message-operator",
                css: wd,
                children: [
                  (0, $.Y)("span", {
                    children: (0, y.pw)("satisfactionSurveyRate"),
                  }),
                  (0, $.Y)("div", {
                    css: kd,
                    children: o.map((e) => {
                      let { value: a, rating: o } = e;
                      return (0, $.Y)(
                        "button",
                        {
                          type: "button",
                          css: [Ed, s && Ad, s === o && Cd, "", ""],
                          onClick: () => {
                            var e;
                            (e = o),
                              l((0, k.f7z)(e, t, n, i)),
                              s ||
                                l(
                                  (0, k.tjR)(
                                    (0, ii.oy)(
                                      t,
                                      n,
                                      i,
                                      tt.Go.AUTOMATIC_SURVEY_RATED
                                    )
                                  )
                                );
                          },
                          children: (0, $.Y)("span", {
                            dangerouslySetInnerHTML: { __html: Yn(a) },
                          }),
                        },
                        o
                      );
                    }),
                  }),
                ],
              }),
            ],
          });
        };
        const Dd = {
            name: "3w0yoi",
            styles: "display:flex;flex-direction:column;gap:8px",
          },
          Yd = { name: "1kd3tv0", styles: "color:#647491" },
          Td = (e) => {
            switch (e) {
              case 1:
                return "\ud83d\ude21";
              case 2:
                return "\u2639\ufe0f";
              case 3:
                return "\ud83d\ude10";
              case 4:
                return "\ud83d\ude00";
              case 5:
                return "\ud83d\ude0d";
              default:
                return "";
            }
          };
        var Fd = (e) => {
          let { rate: t, comment: n } = e;
          return (0, $.FD)("div", {
            className: "message message-operator",
            css: Dd,
            children: [
              (0, $.FD)("span", {
                children: [
                  (0, y.pw)("satisfactionSurveyCommented"),
                  " ",
                  Td(t),
                ],
              }),
              (0, $.Y)("span", {
                css: Yd,
                children: n || (0, y.pw)("satisfactionSurveyThanks"),
              }),
            ],
          });
        };
        var _d = (e) => {
          let {
            threadSource: t,
            threadId: n,
            messageId: i,
            type: a,
            satisfactionSurvey: o,
          } = e;
          const s = (0, r.wA)(),
            l = (0, r.d4)((e) => (0, C.z2)(e, n));
          if (!l) return o && s((0, k.Hyn)(o, t, n, i)), null;
          const d = l.threadSource ?? "conversation",
            c = ((e) => {
              if ("emotes" === e) return fd;
              throw new Error("Unreachable case error");
            })(l.scaleType),
            u = c.find((e) => e.rating === l?.response.rating);
          return (() => {
            switch (a) {
              case tt.Go.AUTOMATIC_SURVEY:
                return null !== l.response.comment
                  ? null
                  : (0, $.Y)(Sd, {
                      threadSource: d,
                      threadId: n,
                      messageId: i,
                      scale: c,
                      selectedRating: u?.rating,
                      rateQuestion:
                        l.rateQuestion || (0, y.pw)("satisfactionSurveyHeader"),
                    });
              case tt.Go.AUTOMATIC_SURVEY_RATED:
                return null !== l.response.comment
                  ? null
                  : (0, $.Y)(yd, {
                      threadSource: d,
                      threadId: n,
                      messageId: i,
                      comment: l.response.comment,
                      commentQuestion:
                        l.commentQuestion ||
                        (0, y.pw)("satisfactionSurveyCommentOptional"),
                    });
              case tt.Go.AUTOMATIC_SURVEY_COMMENTED:
                return (0, $.Y)(Fd, {
                  rate: l.response.rating,
                  comment: l.response.comment || l.endMessage,
                });
              default:
                throw (
                  ((0, v.sQ)("Automatic satisfaction survey: unreachable case"),
                  new Error("Automatic satisfaction survey: unreachable case"))
                );
            }
          })();
        };
        var Id = (e) => {
          const t = Xo(e.content);
          return (0, $.Y)("div", {
            className: "message message-operator",
            children: (0, $.Y)("span", {
              className: "message-content",
              dangerouslySetInnerHTML: { __html: t },
            }),
          });
        };
        var Md = () =>
          (0, $.Y)("div", {
            className: "message message-operator",
            children: (0, $.Y)(_n, {
              value: "ticketSubmittedMessage",
              emojify: !0,
              linkify: !0,
            }),
          });
        var Nd = (e) => {
          const [t, n] = (0, a.useState)(!1),
            i = Boolean(e.ratingId) && !t,
            o = (function (e) {
              if (!e) return "";
              const t = e.match(/^[a-zA-Z0-9]{10,11}-/);
              return (t && e.replace(t[0], "")) || e;
            })(e.name),
            r = ((e) => {
              try {
                return decodeURIComponent(e);
              } catch {
                return e;
              }
            })(o),
            { isNewSkin: s } = (0, p.A)(),
            l = () => {
              n((e) => !e);
            };
          return (0, $.Y)("div", {
            className: `message message-upload ${
              "image" === e.attachmentType ? "message-image" : "message-file"
            } message-${"bot" === e.sender ? "operator" : e.sender} ${
              t ? "timestamp-visible" : ""
            } ${e.ratingId ? "rating-visible" : ""}`,
            style:
              "visitor" !== e.sender || s
                ? {}
                : {
                    background: "var(--custom-background)",
                    color: "var(--custom-text-color)",
                  },
            children:
              "image" === e.attachmentType
                ? (0, $.FD)($.FK, {
                    children: [
                      (0, $.Y)(ps, {
                        content: e.content,
                        extension: e.extension,
                        thumb: e.thumb,
                        name: e.name,
                        id: e.id,
                        onClick: l,
                      }),
                      (0, $.Y)(Ti, {
                        in: t,
                        children: (0, $.Y)(cs, { time: e.time_sent }),
                      }),
                      (0, $.Y)(Ti, {
                        in: i,
                        children: (0, $.Y)(or, {
                          messageId: e.id,
                          ratingId: e.ratingId,
                          rating: e.rating,
                        }),
                      }),
                    ],
                  })
                : (0, $.FD)($.FK, {
                    children: [
                      (0, $.Y)("a", {
                        href: e.content,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        onClick: l,
                        children: (0, $.FD)("span", {
                          children: [
                            (0, $.Y)(Wi, { extension: e.extension }),
                            r,
                          ],
                        }),
                      }),
                      (0, $.Y)(Ti, {
                        in: t,
                        children: (0, $.Y)(cs, { time: e.time_sent }),
                      }),
                    ],
                  }),
          });
        };
        const Rd = { name: "95qvyx", styles: "width:max-content" };
        var Od = (e) => {
          let { isDelivered: t, time_sent: n, content: i } = e;
          const [o, r] = (0, a.useState)(!1),
            s = (0, a.useRef)(null),
            l = (0, a.useRef)(null),
            d = Xo(i),
            { isNewSkin: c } = (0, p.A)(),
            u = Wo(i);
          (0, a.useLayoutEffect)(() => {
            Go({ spanRef: s, wrapperRef: l, minWidth: u ? 248 : void 0 });
          }, [u]);
          const f = (0, a.useCallback)(() => {
            r((e) => !e);
          }, []);
          return (0, $.FD)("div", {
            className: `message message-visitor ${
              o && t ? "timestamp-visible" : ""
            } ${t ? "" : "not-delivered"}`,
            onClick: f,
            style: t
              ? {
                  background: "var(--custom-background)",
                  color: "var(--custom-text-color)",
                }
              : {},
            ref: l,
            children: [
              (0, $.Y)("span", {
                className: "message-content",
                dangerouslySetInnerHTML: { __html: d },
                ref: s,
              }),
              u && (0, $.Y)(xs, { url: u }),
              (0, $.Y)(Ti, { in: o && t, children: (0, $.Y)(cs, { time: n }) }),
              !t &&
                (0, $.Y)("span", {
                  className: "resend-message",
                  css: c ? Rd : void 0,
                  children: (0, y.pw)(
                    "messageNotDelivered",
                    null,
                    "Not delivered."
                  ),
                }),
            ],
          });
        };
        var jd = (e) => {
          switch (e.type) {
            case tt.Go.PRECHAT:
              return (0, $.Y)(Ql, { ...e });
            case tt.Go.RATE_CONVERSATION:
              return (0, $.Y)(id, { ...e });
            case tt.Go.RATE_COMMENT_GOOD:
            case tt.Go.RATE_COMMENT_BAD:
              return (0, $.Y)(nd, { ...e });
            case tt.Go.ALWAYS_ONLINE:
              return (0, $.Y)(Ko, {});
            case tt.Go.UPLOADING_FILE:
              return (0, $.Y)(sl.Ay, { ...e });
            case tt.Go.UPLOADED_FILE:
              return (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)(Nd, { ...e }),
                  e.quickReplies &&
                    e.quickReplies.length > 0 &&
                    !e.disabled &&
                    (0, $.Y)("div", {
                      className: "message message-operator bots-quick-replies",
                      children: (0, $.Y)(td, {
                        quickReplies: e.quickReplies,
                        messageId: e.id,
                        disabled: e.disabled,
                      }),
                    }),
                ],
              });
            case tt.Go.SYSTEM:
              return (0, $.Y)(Id, { ...e });
            case tt.Go.CARD_GALLERY:
              return (0, $.Y)(js, { ...e });
            case tt.Go.BUTTONS:
              return (0, $.Y)(Cs, { ...e });
            case tt.Go.COUPON_CODE:
              return (0, $.Y)(Vs, { ...e });
            case tt.Go.CONVERSATION_MARKED_AS_SOLVED:
              return (0, $.Y)(zs, { ...e });
            case tt.Go.AUTOMATIC_SURVEY:
            case tt.Go.AUTOMATIC_SURVEY_RATED:
            case tt.Go.AUTOMATIC_SURVEY_COMMENTED:
              return (0, $.Y)(_d, { ...e });
            case tt.Go.CREATE_TICKET_SUCCESS:
              return (0, $.Y)(Md, {});
            case tt.Go.FORM:
              return (0, $.Y)(Ol, { ...e });
            case tt.Go.FORM_RESPONSE:
              return null;
            case tt.Go.IFRAME:
              return (0, $.Y)(Hl, { ...e.iframe });
            case tt.Go.RECOMMENDED_PRODUCTS:
              return (0, $.Y)(pd, {
                ...e.recommendedProducts,
                chatBotId: e.chatBotId,
                messageId: e.id,
              });
            case tt.Go.TEXT:
              switch (e.sender) {
                case tt.D$.OPERATOR:
                  return (0, $.Y)(Xl, { ...e });
                case tt.D$.BOT: {
                  const {
                      aiAssistantResponseType: t,
                      hasAiAssistantAnswerSources: n,
                      questionMessageId: i,
                      aiAssistantActionLogId: a,
                    } = e,
                    o = (0, f.MI)() && (0, f.qS)()?.isLyroPlayground,
                    r = o && "knowledge_missing" === t,
                    s = (n || a) && o && i && !r,
                    l = Wo(e.content);
                  return (0, $.FD)($.FK, {
                    children: [
                      (0, $.Y)(ys, {
                        ...e,
                        content: Dn(e.content),
                        youtubeUrl: l,
                      }),
                      e.quickReplies &&
                        e.quickReplies.length > 0 &&
                        !e.disabled &&
                        (0, $.Y)("div", {
                          className:
                            "message message-operator bots-quick-replies",
                          children: (0, $.Y)(td, {
                            quickReplies: e.quickReplies,
                            messageId: e.id,
                            disabled: e.disabled,
                            metadata: {
                              is_ai_assistant_task: e.aiAssistantTask,
                            },
                          }),
                        }),
                      r && (0, $.Y)($l, { questionMessageId: i }),
                      s &&
                        (0, $.Y)(Gl, {
                          questionMessageId: i,
                          messageId: e.idFromServer,
                          aiAssistantActionLogId: a,
                        }),
                    ],
                  });
                }
                case tt.D$.VISITOR:
                  return (0, $.Y)(Od, { ...e });
                default:
                  return null;
              }
            default:
              return null;
          }
        };
        var Ld = (e) => {
          let {
            messagesLength: t,
            showOldMessages: n,
            conversationRef: i,
            documentRef: o,
          } = e;
          const r = (0, a.useRef)(null),
            s = (0, a.useRef)(!1),
            l = (0, a.useRef)(null),
            d = (0, a.useRef)(0),
            c = (0, a.useRef)(null),
            u = (0, a.useMemo)(
              () => (o && "host" in o ? o.host.ownerDocument : o),
              [o]
            ),
            p = (0, a.useCallback)(() => {
              const { scrollHeight: e = 0, clientHeight: t = 0 } = i || {},
                n = t - 0;
              r.current &&
                (r.current.style.height =
                  e === t ? "0px" : (n * n) / +e + "px");
            }, [i]),
            f = () => {
              i &&
                (i.onscroll = () => {
                  let e = 0;
                  if (r.current) {
                    if (s.current) {
                      const t = Array.from(
                        u.querySelectorAll(".message")
                      ).slice(-1)[0];
                      (e = t ? t.offsetHeight : 0), (s.current = !1);
                    }
                    r.current.style.top =
                      ((i.clientHeight - 0) * i.scrollTop) /
                        (i.scrollHeight - e) +
                      "px";
                  }
                });
            },
            m = (e) => {
              const { scrollHeight: t = 0, clientHeight: n = 0 } = i || {};
              i && (i.scrollTop = (t * e) / (n - 0));
            },
            h = () => {
              (u.onmouseup = null),
                (u.onmousemove = null),
                l.current && window.cancelAnimationFrame(l.current),
                f(),
                r.current &&
                  ((r.current.style.width = ""),
                  (r.current.style.margin = ""),
                  (r.current.style.opacity = ""));
            },
            g = (e) => {
              l.current = window.requestAnimationFrame(() => {
                if (!r.current) return;
                let { clientHeight: t = 0 } = i || {};
                t -= 0;
                const n = e.clientY - d.current,
                  a = parseInt(r.current.style.top, 10) + n;
                a >= 0 && a <= t - parseInt(r.current.style.height, 10)
                  ? ((r.current.style.top = `${a}px`), m(a))
                  : a < 0
                  ? ((r.current.style.top = "0px"), m(0))
                  : ((r.current.style.top =
                      t - parseInt(r.current.style.height, 10) + "px"),
                    m(t - parseInt(r.current.style.height, 10))),
                  (u.onmouseup = h),
                  (d.current = e.clientY);
              });
            };
          return (
            (0, a.useEffect)(() => {
              t && (s.current = !0), p();
            }, [t, p]),
            (0, a.useEffect)(() => {
              p();
            }, [n, p]),
            (0, a.useEffect)(() => {
              f();
            }),
            (0, a.useEffect)(
              () => (
                i &&
                  ((c.current = new ResizeObserver(p)), c.current.observe(i)),
                () => {
                  c.current && c.current.disconnect();
                }
              ),
              [i, p]
            ),
            (0, $.Y)("div", {
              id: "conversation-scroll",
              children: (0, $.Y)("div", {
                onMouseDown: (e) => {
                  i && (i.onscroll = null),
                    (d.current = e.clientY),
                    r.current &&
                      ((r.current.style.width = "8px"),
                      (r.current.style.margin = "0px"),
                      (r.current.style.opacity = "0.32")),
                    (u.onmousemove = g),
                    (u.onmouseup = h);
                },
                ref: (e) => {
                  if (!e) return !1;
                  r.current = e;
                  const {
                    scrollHeight: t = 0,
                    clientHeight: n = 0,
                    scrollTop: a = 0,
                  } = i || {};
                  return (r.current.style.top = ((n + 0) * a) / t + "px"), !0;
                },
              }),
            })
          );
        };
        const zd = {
            name: "malbpp",
            styles:
              "position:absolute;display:flex;height:100%;width:100%;align-items:center;justify-content:center;top:0;left:0;right:0;z-index:3",
          },
          Ud = {
            name: "1bcepmf",
            styles:
              "display:flex;align-items:center;justify-content:center;flex-direction:column;svg{width:64px;height:64px;}",
          };
        var Pd = () => {
          const e = (0, r.d4)(C.VQ),
            { isNewSkin: t } = (0, p.A)();
          return e
            ? t
              ? (0, $.Y)("div", {
                  css: zd,
                  children: (0, $.FD)("div", {
                    css: Ud,
                    children: [
                      (0, $.Y)(st.e_, {}),
                      (0, $.Y)("span", {
                        children: (0, y.pw)(
                          "dragAndDropInfo",
                          null,
                          "Drop here to attach"
                        ),
                      }),
                    ],
                  }),
                })
              : (0, $.Y)("div", {
                  className: "uploadIconWrapper",
                  children: (0, $.FD)("div", {
                    className: "upload-circle",
                    children: [
                      (0, $.Y)(st.JM, {}),
                      (0, $.Y)("span", {
                        children: (0, y.pw)(
                          "dragAndDropInfo",
                          null,
                          "Drop here to attach"
                        ),
                      }),
                    ],
                  }),
                })
            : null;
        };
        const Bd = {
          name: "1h6xlc3",
          styles: "clear:both;width:100%;float:left",
        };
        var Hd = (e) => {
          let { onClick: t } = e;
          const { isNewSkin: n } = (0, p.A)();
          return (0, $.Y)("div", {
            css: Bd,
            "data-testid": "historyButtonWrapper",
            children: (0, $.FD)("button", {
              css:
                ((i = n),
                (0, d.AH)(
                  {
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    background: "#fff",
                    letterSpacing: "-0.1px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: i ? 500 : 600,
                    color: "#8894ab",
                    borderRadius: "14px",
                    border: "solid 1px rgba(136, 148, 171, 0.24)",
                    paddingRight: "10px",
                    svg: {
                      fill: "#8894ab",
                      width: "19px",
                      marginInline: "4px",
                    },
                    "&:hover": {
                      color: "var(--custom-action-color, #0566ff)",
                      svg: { fill: "var(--custom-action-color, #0566ff)" },
                    },
                    marginBottom: i ? "10px" : "20px",
                  },
                  "",
                  ""
                )),
              type: "button",
              onClick: t,
              "data-testid": "historyButton",
              children: [
                (0, $.Y)(st.os, {}),
                (0, y.pw)("previousMessages", null, "Previous messages"),
              ],
            }),
          });
          var i;
        };
        const qd = (0, d.AH)(
            {
              border: "1px solid transparent",
              background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${f.XV[0]}, ${f.XV[1]}) border-box`,
              color: f.XV[0],
            },
            "",
            ""
          ),
          $d = (0, d.AH)(
            {
              display: "inline-block",
              marginLeft: 8,
              span: {
                display: "inline-block",
                height: 5,
                width: 5,
                margin: "11px 1px 0 2px",
                backgroundColor: f.XV[0],
                borderRadius: "50%",
                animation: "blink 1.3s linear infinite",
                "&:nth-child(2)": { animationDelay: "-1.1s" },
                "&:nth-child(3)": { animationDelay: "-0.9s" },
              },
            },
            "",
            ""
          );
        var Vd = () => {
          const e = (0, r.d4)(C.Qn);
          return (0, $.FD)("div", {
            className: "message message-operator",
            css: qd,
            children: [
              (0, $.FD)("span", {
                children: [e, " ", (0, y.pw)("isTyping", null, "is typing")],
              }),
              (0, $.Y)(V, {
                in: !0,
                classNames: "operatorTyping",
                children: (0, $.FD)("div", {
                  css: $d,
                  children: [
                    (0, $.Y)("span", {}),
                    (0, $.Y)("span", {}),
                    (0, $.Y)("span", {}),
                  ],
                }),
              }),
            ],
          });
        };
        var Wd = (e) => {
          let { operatorIsTyping: t } = e;
          return (0, $.Y)(V, {
            in: !1 !== t,
            classNames: "operatorTyping",
            children: (0, $.FD)("div", {
              className: "message message-operator typing-indicator",
              children: [
                (0, $.Y)("span", {}),
                (0, $.Y)("span", {}),
                (0, $.Y)("span", {}),
              ],
            }),
          });
        };
        const Kd = (0, d.i7)({
            "0%": { backgroundPosition: "-50% 50%" },
            "100%": { backgroundPosition: "50% 50%" },
          }),
          Gd = (0, d.AH)(
            {
              clear: "both",
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingTop: 12,
              svg: { width: 16, height: 16 },
              backgroundImage:
                "linear-gradient(90deg, #647491 42%, #080F1A 46%, #080F1A 54%, #647491 58%)",
              backgroundSize: "50% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: `${Kd} 2s linear infinite`,
            },
            "",
            ""
          ),
          Xd = {
            name: "1s9xh8",
            styles: "width:24px;height:24px;border-radius:50%",
          },
          Qd = (e) => {
            let { operatorIsTyping: t, aiAssistantIsThinking: n } = e;
            const { assignedOperatorsData: i } = Ma(),
              o = (0, r.d4)(C.Qn),
              s = (0, a.useMemo)(() => i.find((e) => e.id === t), [i, t]),
              { isNewSkin: l } = (0, p.A)(),
              d = ut(l),
              u = (0, c.zh)({
                from: { opacity: 0.01, transform: "translateY(10px)" },
                to: { opacity: 1, transform: "translateY(0px)" },
                config: { tension: 200, friction: 20 },
              });
            return n || t
              ? n
                ? (0, $.FD)(c.CS.div, {
                    css: [d.text14, Gd, "", ""],
                    style: u,
                    children: [
                      (0, $.Y)(st.jd, {}),
                      " ",
                      o,
                      " ",
                      (0, y.pw)("isTyping", null, "is typing..."),
                      "\u2026",
                    ],
                  })
                : s
                ? (0, $.FD)(c.CS.div, {
                    css: [d.text14, Gd, "", ""],
                    style: u,
                    children: [
                      (0, $.Y)("img", {
                        src: s.avatarSrc ? (0, f.vs)(s.avatarSrc) : Vn,
                        alt: `${s.name} avatar`,
                        css: Xd,
                      }),
                      s.name,
                      " ",
                      (0, y.pw)("isTyping", null, "is typing..."),
                      "\u2026",
                    ],
                  })
                : (0, $.FD)(c.CS.div, {
                    css: [d.text14, Gd, "", ""],
                    style: u,
                    children: [(0, y.pw)("typing", null, "Typing"), "\u2026"],
                  })
              : null;
          };
        var Zd = (e) => {
          let { operatorIsTyping: t, aiAssistantIsThinking: n } = e;
          const { isNewSkin: i } = (0, p.A)();
          return i
            ? (0, $.Y)(Qd, { operatorIsTyping: t, aiAssistantIsThinking: n })
            : (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)(Wd, { operatorIsTyping: t }),
                  n && (0, $.Y)(Vd, {}),
                ],
              });
        };
        const Jd = (e, t, n) =>
            (0, d.AH)(
              {
                position: "absolute",
                zIndex: 9,
                backgroundColor: "#fff",
                width: "calc(100% - (var(--chat-padding, 24px) * 2))",
                borderBottomLeftRadius: "var(--radius-component, 12px)",
                borderBottomRightRadius: "var(--radius-component, 12px)",
                ...(!e && { top: t ? "112px" : "124px" }),
                ...(n && { top: "60px" }),
                ...((n || !e) && {
                  borderRadius: "var(--radius-component, 12px)",
                }),
              },
              "",
              ""
            ),
          ec = {
            name: "x2kka1",
            styles:
              "display:flex;align-items:center;justify-content:space-between;background-color:#F5F7F9;padding:8px;gap:8px;border-radius:var(--radius-component, 12px);font-size:12px;a{outline:none;color:#080F1A;}",
          },
          tc = {
            name: "jv72v0",
            styles:
              "margin:2px;outline:none;svg{flex-shrink:0;fill:#4C596B;width:20px;height:20px;}",
          },
          nc = (0, f.DD)();
        var ic = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)((e) => e.hideHeader),
            n = (0, r.d4)(C.Ny),
            i = (0, r.d4)(C.oD),
            o = (0, r.d4)(C.K8),
            { isNewSkin: s } = (0, p.A)(),
            l = (0, a.useCallback)(() => {
              nc || e((0, k.p5h)());
            }, [e]);
          return !i || o
            ? null
            : (0, $.Y)("div", {
                css: Jd(s, n, t),
                children: (0, $.FD)("div", {
                  css: ec,
                  children: [
                    (0, $.Y)(_n, { value: "privacyPolicy", markdownify: !0 }),
                    (0, $.Y)("button", {
                      "aria-label": "Close privacy policy",
                      type: "button",
                      onClick: l,
                      tabIndex: -1,
                      css: tc,
                      children: (0, $.Y)(st.bm, {}),
                    }),
                  ],
                }),
              });
        };
        var ac = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)(C.Ao),
            n = (0, r.d4)((e) => e.operatorIsTyping),
            i = (0, r.d4)((e) => e.alert.isVisible),
            o = (0, r.d4)((e) => e.isMobile),
            s = (0, r.d4)((e) => e.showOldMessages),
            l = (0, r.d4)(C.VQ),
            d = (0, r.d4)(C.DG),
            c = (0, a.useRef)((0, h.bi)()),
            u = (0, a.useRef)(null),
            p = (0, a.useRef)(null),
            m = (0, a.useRef)(null),
            [g, b] = (0, a.useState)(!1);
          (0, a.useEffect)(() => {
            p.current && b(!0);
          }, []);
          const x = () => {
            p.current &&
              (p.current.scrollTop =
                p.current.scrollHeight - p.current.clientHeight);
          };
          (0, a.useEffect)(
            () => (
              e((0, k.oOm)(o ? tt.NO.MOBILE : tt.NO.CHAT_SIZE_1)),
              x(),
              (m.current = setTimeout(() => {
                p.current &&
                  p.current.scrollTop - p.current.scrollHeight !==
                    p.current.clientHeight &&
                  x();
              }, 100)),
              () => {
                m.current && clearTimeout(m.current);
              }
            ),
            [e, o]
          );
          const [y, w] = (0, a.useState)(s);
          (0, a.useEffect)(() => {
            y !== s && u.current && (u.current.scrollIntoView(), w(s));
          }, [s, y]);
          const A = (0, a.useRef)(t),
            E =
              p.current && p.current.scrollHeight > p.current.clientHeight + 40,
            S = t.length,
            D = Boolean(
              t.length > 0 &&
                t[S - 1].type === tt.Go.UPLOADING_FILE &&
                t[S - 1].imageLoaded
            ),
            Y = A.current.length < S;
          (0, qo.FW)(t),
            (0, a.useEffect)(() => {
              A.current.length !== t.length && x(),
                E &&
                  Y &&
                  (() => {
                    try {
                      const e = Array.from(
                          c.current.querySelectorAll(".message")
                        ).slice(-9),
                        t = e[e.length - 1].offsetHeight;
                      for (let n = 0; n < e.length; n += 1)
                        (e[n].style.transition = "none"),
                          (e[n].style.transform = `translateY(${t}px)`);
                      setTimeout(() => {
                        for (let t = 0; t < e.length; t += 1)
                          (e[t].style.transition =
                            "transform 0.2s, margin 0.2s"),
                            (e[t].style.transform = "");
                      }, 0);
                    } catch (e) {
                      (0, v.sQ)(e);
                    }
                  })();
            }, [E, c, t, A, Y]),
            (0, a.useEffect)(() => {
              A.current = t;
            }, [t]),
            (0, a.useEffect)(() => {
              (i || n || d || D) && x();
            }, [i, n, d, D]);
          const T = (0, f.J0)(),
            {
              messagesOlderThanOneDay: F,
              messagesLessThanOneDayOld: _,
              visibleMessages: I,
            } = (0, a.useMemo)(() => {
              const e = t.filter(
                  (e) => Math.floor(Date.now() / 1e3) - e.time_sent > 86400
                ),
                n = t.filter(
                  (e) => Math.floor(Date.now() / 1e3) - e.time_sent <= 86400
                );
              return {
                messagesOlderThanOneDay: e,
                messagesLessThanOneDayOld: n,
                visibleMessages: s ? t : n,
              };
            }, [t, s]),
            M = (0, a.useMemo)(
              () =>
                I.filter(
                  (e) =>
                    e.type === tt.Go.UPLOADED_FILE &&
                    "image" === e.attachmentType
                ).filter((e) => e.imageLoaded),
              [I]
            ),
            N = (0, a.useMemo)(
              () => I.filter((e) => e.type === tt.Go.UPLOADING_FILE),
              [I]
            );
          return (
            (0, a.useEffect)(() => {
              (M.length > 0 || N.length > 0) && x();
            }, [M.length, N.length]),
            (0, a.useEffect)(() => {
              const e = p.current;
              if (!e) return;
              const t = (t) => {
                const { target: n } = t,
                  i = e.querySelectorAll("[data-youtube-preview]");
                i[i.length - 1] === n && x();
              };
              return (
                e.addEventListener(fs, t),
                () => {
                  e.removeEventListener(fs, t);
                }
              );
            }, []),
            (0, $.FD)("div", {
              id: "conversation-group",
              ref: p,
              className: `${l ? "drag-active" : ""} ${T ? "ios-ipad" : ""}`,
              role: "log",
              children: [
                (0, $.Y)(ic, {}),
                (0, $.Y)(Pd, {}),
                (0, $.FD)("div", {
                  id: "messages",
                  "aria-live": "polite",
                  "aria-atomic": "false",
                  "data-testid": "messagesLog",
                  children: [
                    s && F.map((e) => (0, $.Y)(jd, { ...e }, e.id)),
                    !s &&
                      F.length > 0 &&
                      (0, $.Y)(Hd, {
                        onClick: () => {
                          e((0, k.pO6)(rt.X.showPreviousMessagesClicked)),
                            e((0, k.QSJ)(!0));
                        },
                      }),
                    F.length > 0 &&
                      (0, $.Y)("div", {
                        ref: u,
                        style: { float: "left", clear: "both", width: "100%" },
                      }),
                    _.map((e) => (0, $.Y)(jd, { ...e }, e.id)),
                    (0, $.Y)(Ti, { in: i, children: (0, $.Y)($o, {}) }),
                    (0, $.Y)(Zd, {
                      operatorIsTyping: n,
                      aiAssistantIsThinking: d,
                    }),
                  ],
                }),
                g &&
                  "firefox" !== f.Ld &&
                  !o &&
                  (0, $.Y)(Ld, {
                    messagesLength: t.length,
                    conversationRef: p.current,
                    documentRef: c.current,
                    showOldMessages: s,
                  }),
              ],
            })
          );
        };
        const oc = { transition: "max-height 200ms" },
          rc = (0, f.Dj)().name.toLowerCase(),
          sc = (0, f.DD)(),
          lc = {
            name: "1w82xsr",
            styles:
              "min-height:0;display:flex;flex-direction:column;flex:1;top:0;left:0;right:0;bottom:0",
          };
        var dc = () => {
          const e = (0, r.d4)(C.KZ),
            t = (0, r.d4)((e) => e.isMobile),
            n = (0, r.d4)((e) => e.hideHeader),
            i = (0, r.d4)(C.j6),
            o = (0, r.d4)(C.Ao),
            [s] = (0, a.useState)(o.length),
            [l, d] = (0, a.useState)(i && !t),
            u = (0, a.useRef)(0),
            m = (0, a.useRef)(""),
            b = (0, a.useRef)(""),
            [x, y] = (0, a.useState)(e),
            A = (0, r.wA)(),
            { isNewSkin: E } = (0, p.A)(),
            S = n && t && !E;
          W({ disableScaling: t && "ios" === rc && E });
          const D = (0, a.useRef)(100),
            Y = (0, a.useRef)(t && "ios" === rc),
            T = (0, a.useRef)({
              entering: { maxHeight: `${D.current}px` },
              entered: { maxHeight: "399px" },
            }),
            F = (0, a.useRef)(null),
            _ = (0, r.d4)(C.O1),
            { dropzoneProps: I } = at(),
            M = (0, a.useCallback)(() => {
              const e = (0, h.AL)();
              if (Y.current)
                try {
                  e && e.parent?.scrollTo(0, u.current);
                } catch (e) {
                  (0, v.sQ)(e);
                }
            }, []),
            N = (0, a.useCallback)(() => {
              const e = (0, h.AL)();
              if (t && e)
                try {
                  (e.parent.document.body.style.cssText = m.current),
                    (e.parent.document.documentElement.style.cssText =
                      b.current);
                } catch (e) {
                  (0, v.sQ)("clearMobileStyles error", { error: e });
                }
            }, [t]);
          (0, a.useLayoutEffect)(
            () => () => {
              N(), M();
            },
            [N, M]
          ),
            (0, a.useEffect)(() => {
              const e = (0, h.AL)();
              Y.current &&
                0 === u.current &&
                e &&
                (u.current = e.parent.scrollY);
            }, []),
            (0, a.useEffect)(() => {
              const n = (0, h.AL)();
              if (e === w.l.chat && t && n)
                try {
                  (b.current = n.parent.document.documentElement.style.cssText),
                    (m.current = n.parent.document.body.style.cssText);
                  let e =
                    "overflow: hidden; height: 100%; width: 100%; visibility: visible; opacity: 1 !important; display: block; left: 0; top:0; right: auto; bottom: auto; margin: 0;";
                  "ios" === rc && "chrome" !== f.Ld && (e += "position:fixed;"),
                    (n.parent.document.body.style.cssText = e),
                    (n.parent.document.documentElement.style.cssText =
                      "overflow: hidden; margin: 0 !important;");
                } catch {}
            }, [t, e]),
            (0, a.useEffect)(() => {
              let e;
              if (x === w.l.chat && "home" === _ && !t && !sc) {
                const { width: t } = (0, g.LY)(tt.NO.CHAT_SIZE_1);
                e = setTimeout(() => {
                  if (F.current) {
                    const { clientHeight: e } = F.current;
                    (F.current.style.height = `${e}px`),
                      A(
                        (0, k.oOm)(tt.NO.DYNAMIC, { width: t, height: e + 51 })
                      );
                  }
                }, 500);
              }
              return () => {
                clearTimeout(e);
              };
            }, [A, t, _, x]),
            (0, a.useEffect)(() => {
              o.length > s && y(tt.Ss.CHAT);
            }, [o.length, s]);
          const R = "conversations" === _,
            O = (0, c.pn)(R, {
              from: { opacity: 0 },
              enter: { opacity: 1 },
              leave: { opacity: 0 },
            });
          return (0, $.FD)("div", {
            className: `chat no-clip-path ${f.Ld}`,
            style: {
              background: "#fff",
              ...(!t && {
                height: R ? 700 : "auto",
                interpolateSize: "allow-keywords",
                transition: "height 200ms ease-in-out",
              }),
            },
            ref: F,
            children: [
              (0, $.Y)(ki, {}),
              (0, $.Y)(Di, {}),
              S && (0, $.Y)(po, {}),
              O((e, t) =>
                t
                  ? (0, $.FD)(c.CS.div, {
                      style: { ...e, position: R ? "relative" : "absolute" },
                      css: lc,
                      ...I,
                      children: [
                        !S && (0, $.Y)(Ka, { chatViewRef: F }),
                        l
                          ? (0, $.Y)(ot, {
                              in: !0,
                              timeout: 1,
                              defaultStyle: oc,
                              transitionStyles: T.current,
                              onAnimationEnded: () => {
                                d(!1);
                              },
                              children: (0, $.Y)(ac, {}),
                            })
                          : (0, $.Y)(ac, {}),
                        (0, $.Y)(Ya, { hasSeparator: !0 }),
                      ],
                    })
                  : (0, $.FD)(c.CS.div, {
                      style: { ...e, position: R ? "absolute" : "relative" },
                      css: lc,
                      "data-testid": "home",
                      children: [
                        (0, $.Y)(so, {}),
                        (0, $.Y)(Ro, {}),
                        (0, $.Y)(Ho, {}),
                      ],
                    })
              ),
            ],
          });
        };
        var cc = (e) => {
          let { trackingEvent: t } = e;
          const n = (0, r.wA)(),
            i = (0, r.d4)((e) => e.isMobile),
            a = (0, r.d4)(C.Tw);
          return !i && a
            ? null
            : (0, $.Y)("button", {
                type: "button",
                className: "exit-chat",
                onClick: () => {
                  n((0, k.pO6)(t)), n((0, k.Hzh)(!1)), n((0, k.npw)(!1));
                },
                "aria-label": (0, y.pw)(
                  "closeWidget",
                  null,
                  "Close chat widget"
                ),
                children: (0, $.Y)(st.bm, {}),
              });
        };
        var uc = {
          name: "1of747n",
          styles:
            "background-color:#fff;padding-block:var(--fly-padding, 0);padding-inline:var(--fly-padding, 20px);max-width:340px;position:absolute;bottom:26px;border-radius:var(--radius-surface, 12px);box-shadow:var(--fly-shadow);display:flex;flex-direction:column;z-index:1;max-height:calc(100% - 76px);.chat-in-preview &{box-shadow:0 8px 13px 0 rgba(0, 18, 46, 0.16);}right:48px;margin-left:20px;.mobile &{max-width:calc(100% - 48px - 55px);&.with-buttons{width:calc(100% - 48px - 55px);max-width:250px;}}&.narrower{max-width:300px;}&:hover .close-button-wrapper{opacity:1;transform:translateY(8px);}.close-button-wrapper{position:absolute;bottom:100%;opacity:0;width:100%;height:45px;transition:transform 0.3s opacity 0.3s;transform:translateY(10px);left:0;.mobile &{opacity:1;transform:translateY(2px);}}.grid-layout &{.close-button-wrapper{transition:opacity 0.3s;transform:translate(12px, 33px);}&:hover .close-button-wrapper{transform:translate(12px, 33px);}}.grid-layout.mobile &{.close-button-wrapper{transform:translate(6px, 33px);}&:hover .close-button-wrapper{transform:translate(6px, 33px);}}button.exit-chat{position:absolute;top:0;right:0;height:28px;width:28px;border-radius:50%;box-shadow:0px 2px 6px 0px #001b471f;display:flex;align-items:center;justify-content:center;background:#fff;.mobile &{height:32px;width:32px;}.mobile.grid-layout &{height:28px;width:28px;}.grid-layout &{box-shadow:0px 2px 8px 0px rgba(8, 15, 26, 0.08);}svg{width:20px;height:20px;fill:#8894ab;}.mobile &{svg{width:24px;height:24px;}}.mobile.grid-layout &{svg{width:20px;height:20px;}}&:hover{background-color:var(--custom-action-color-background, #dce9ff);svg{fill:var(--custom-action-color, #0566ff);}}.mobile &:before{content:'';width:44px;height:44px;position:absolute;top:calc(50% - 22px);left:calc(50% - 22px);}}.input-group{padding:9px 22px 9px 0;}.input-group .fly-new-message-button{transition:min-width 0.3s;min-width:180px;padding:4px 0 8px;line-height:21px;text-align:left;cursor:pointer;font-size:17px;color:#8894ab;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;&::-webkit-input-placeholder{white-space:nowrap;}&::-moz-placeholder{white-space:nowrap;}&:-ms-input-placeholder{white-space:nowrap;}&:-moz-placeholder{white-space:nowrap;}}.message-container{padding:19px 0;max-width:290px;font-size:17px;background:#fff;position:relative;word-wrap:break-word;overflow-y:auto;white-space:pre-line;padding-right:38px;ul{list-style-type:disc;}ol{list-style-type:decimal;}ul,ol{margin:12px 0;padding-left:16px;}li{padding-left:4px;margin-bottom:8px;}&.image-content{overflow-y:hidden;padding-left:0;padding-right:0;button{float:left;height:200px;width:100%;min-width:200px;background-color:#fff;.image-preview{background-size:cover;background-repeat:no-repeat;background-position:center;border-radius:8px;height:100%;}}span{display:inline-block;margin-top:10px;}}.mobile &{width:100%;font-size:15px;padding-right:22px;&.image-content{padding-left:0;padding-right:0;button{height:132px;min-width:auto;}}}&.recommend-products-message{padding-right:0px;padding-bottom:30px;overflow-y:visible;}&:after{content:'';border-bottom:1px solid #dedede;display:block;position:absolute;bottom:0;width:calc(100% - 38px);.mobile &{width:calc(100% - 22px);}}}.button-wrapper{width:100%;display:flex;flex-wrap:wrap;.mobile &{flex-direction:column;align-items:flex-start;}button,.button-url{font-size:17px;color:var(--custom-action-color, #0566ff);background:#fff;line-height:21px;margin-top:6px;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:1px solid transparent;transition:border-color 0.2s;margin-right:16px;text-align:left;&:hover{border-color:var(--custom-action-color, #0566ff);}.mobile &{max-width:100%;display:block;padding:4px 0;}.emoji{vertical-align:top;}}.button-url__anchor{color:var(--custom-action-color, #0566ff);text-decoration:none;}.more-replies{border:1px solid var(--custom-action-color, #0566ff);border-radius:20px;padding:3px 10px;line-height:7px;align-self:center;.mobile &{align-self:flex-start;padding:3px 10px;margin:6px 0;}svg{transform:rotate(90deg);width:13px;height:13px;fill:var(--custom-action-color, #0566ff);}}}img{max-width:100%;}",
        };
        var pc = (e) =>
          "image" === e.attachmentType
            ? (0, $.Y)("button", {
                type: "button",
                onClick: e.onClick,
                children: (0, $.Y)("div", {
                  className: "image-preview",
                  style: { backgroundImage: `url(${e.content})` },
                  "data-testid": "imagePreview",
                }),
              })
            : (0, $.Y)("button", {
                className: "link",
                type: "button",
                onClick: e.onClick,
                style: { borderBottom: "1px solid #3f88f3", color: "#3f88f3" },
                children: (0, $.Y)(_n, {
                  value: "mediaFile",
                  fallback: "Media file",
                }),
              });
        const fc = {
          name: "v8qd0m",
          styles: "display:inline-block;margin-top:20px",
        };
        var mc = (e) => {
          const t = (0, r.wA)(),
            {
              content: n,
              type: i,
              attachmentType: a,
              chatBotId: o,
              iframe: s,
              cards: l = [],
              id: d,
              recommendedProducts: c,
            } = e.message;
          if (i === ii.t_.uploadedFile)
            return (0, $.Y)("div", {
              className: `message-container ${a}-content`,
              children: (0, $.Y)(pc, {
                content: n,
                onClick: () => {
                  t((0, k.pO6)(rt.X.flyMessageClicked)),
                    t((0, k.g6Q)(tt.Ss.CHAT)),
                    t((0, k.q7v)("conversations"));
                },
                attachmentType: a,
              }),
            });
          let u = null;
          if (i === ii.t_.cards) {
            const e = l[0]?.title || "";
            u = Sn(e);
            const n = l[0]?.imageUrl || "";
            if (n)
              return (0, $.FD)("div", {
                className: "message-container image-content",
                children: [
                  (0, $.Y)(pc, {
                    content: n,
                    onClick: () => {
                      t((0, k.g6Q)(tt.Ss.CHAT)), t((0, k.q7v)("conversations"));
                    },
                    attachmentType: "image",
                  }),
                  (0, $.Y)("span", {
                    className: "fly-message--card-title",
                    dangerouslySetInnerHTML: { __html: u },
                  }),
                ],
              });
          } else {
            if (i === ii.t_.couponCode) {
              const { couponCode: t = "" } = e.message;
              return (
                (u = Sn(n)),
                (0, $.FD)("div", {
                  className: "message-container",
                  children: [
                    (0, $.Y)("div", { dangerouslySetInnerHTML: { __html: u } }),
                    (0, $.Y)("span", { css: fc, children: t }),
                  ],
                })
              );
            }
            if (i === ii.t_.iframe)
              return (0, $.FD)("div", {
                className: "message-container",
                children: [
                  (0, $.Y)("p", { children: s?.title }),
                  (0, $.Y)("br", {}),
                  (0, $.Y)("p", { children: s?.subtitle }),
                ],
              });
            if (i === ii.t_.recommendedProducts)
              return (0, $.Y)("div", {
                className: "message-container recommend-products-message",
                children: (0, $.Y)(pd, {
                  title: c?.title || "",
                  buttonPayload: c?.buttonPayload || "",
                  products: c?.products || [],
                  chatBotId: o,
                  isFlyMessage: !0,
                  messageId: d,
                }),
              });
            u = Dn(n);
          }
          return (0, $.Y)("div", {
            className: "message-container",
            dangerouslySetInnerHTML: { __html: u },
          });
        };
        var hc = (e) => {
          const { isNewSkin: t } = (0, p.A)(),
            n = e.showMoreRepliesButton || e.quickReplies.length > e.maxButtons,
            i = n ? e.quickReplies.slice(0, e.maxButtons - 1) : e.quickReplies;
          return (0, $.FD)("div", {
            className: "button-wrapper",
            children: [
              i.map((t) =>
                (0, $.FD)(
                  a.Fragment,
                  {
                    children: [
                      "url" === t.type &&
                        (0, $.Y)(ks, {
                          title: t.title,
                          payload: t.payload,
                          url: t.url,
                          onClick: e.onButtonClick,
                          messageType: e.messageType,
                        }),
                      ("action" === t.type ||
                        "bot" === t.type ||
                        "text" === t.type) &&
                        (0, $.Y)(ws, {
                          title: t.title,
                          payload: t.payload,
                          onClick: e.onButtonClick,
                        }),
                    ],
                  },
                  `${t.title}${t.payload}`
                )
              ),
              n &&
                (0, $.Y)("button", {
                  type: "button",
                  className: "more-replies",
                  onClick: e.onMoreButtonClick,
                  children: t ? (0, $.Y)(st.tx, {}) : (0, $.Y)(st.JY, {}),
                }),
            ],
          });
        };
        var gc = (e) => {
          const t = (0, r.wA)(),
            n = (0, r.d4)(C.Ny);
          let i = [];
          e.message.type === ii.t_.cards
            ? (i = e.message.cards?.[0]?.buttons || [])
            : e.message.quickReplies
            ? (i = e.message.quickReplies)
            : e.message.buttons
            ? ({ buttons: i } = e.message)
            : e.message.type === ii.t_.iframe &&
              e.message?.iframe &&
              (i = e.message.iframe.buttons);
          return (0, $.Y)(hc, {
            quickReplies: i,
            messageType: e.message.type,
            onButtonClick: (e, n) => {
              t((0, k.pO6)(rt.X.flyMessageButtonsClicked)), t((0, k.RA7)(n, e));
            },
            onMoreButtonClick: () => {
              t((0, k.g6Q)(tt.Ss.CHAT)), t((0, k.q7v)("conversations"));
            },
            maxButtons: n ? 3 : 4,
            showMoreRepliesButton:
              e.message.type === ii.t_.cards &&
              (e.message.cards?.length || 0) > 1,
          });
        };
        const bc = "220px",
          vc = (e, t) => {
            if (e) return bc;
            if ((0, f.DD)()) return "230px";
            const n = t && window.screen.width < 340,
              i = t && window.screen.width < 410;
            return n ? "160px" : i ? "210px" : "130px";
          };
        var xc = (e) => {
          const t = (0, r.wA)(),
            n = (0, r.d4)(C.Ny),
            i = e.message.type === ii.t_.uploadedFile,
            a = () => {
              t((0, k.pO6)(rt.X.flyMessageClicked)),
                t((0, k.g6Q)(tt.Ss.CHAT)),
                t((0, k.q7v)("conversations"));
            };
          return (0, $.Y)(_n, {
            value: ["onlineMessagePlaceholder", "fillOutTheForm"],
            children: (t) => {
              let { onlineMessagePlaceholder: o, fillOutTheForm: r } = t;
              return (0, $.Y)("button", {
                type: "button",
                style: { width: i ? bc : "auto", minWidth: vc(i, n) },
                id: "new-message-button-fly",
                className: "fly-new-message-button",
                onClick: a,
                "data-testid": "flyNewMessageButton",
                children: e.message.type === tt.Go.FORM ? r : o,
              });
            },
          });
        };
        var yc = (e) =>
          (0, $.Y)("div", {
            className: "input-group",
            children: e.hasButtons
              ? (0, $.Y)(gc, { message: e.message })
              : (0, $.Y)(xc, { message: e.message }),
          });
        const wc = [tt.Go.RECOMMENDED_PRODUCTS];
        var kc = () => {
          const e = (0, r.wA)(),
            t = (0, h.AL)(),
            n = (0, a.useRef)(null),
            i = (0, a.useRef)(null),
            o = (0, r.d4)(C.$Y),
            s = (0, r.d4)(C.Ny),
            l = (0, r.d4)(C.KZ),
            d = (0, a.useRef)(null),
            c = (0, a.useRef)(null),
            u =
              void 0 !== o?.quickReplies ||
              void 0 !== o?.cards ||
              void 0 !== o?.buttons ||
              void 0 !== o?.iframe?.buttons,
            p = (0, a.useCallback)(() => {
              let t = u ? 495 : 362;
              const i = "100%";
              s && (t = "100%"),
                n.current && (n.current.style.maxHeight = "none"),
                e((0, k.oOm)(`dynamic${t}_${i}`, { width: t, height: i })),
                (d.current = t),
                (c.current = i);
            }, [e, u, s]),
            m = (0, a.useCallback)(
              () =>
                !!t &&
                (p(),
                (i.current = t?.requestAnimationFrame(() => {
                  if (n.current) {
                    let { clientWidth: t, clientHeight: i } = n.current;
                    if (s) {
                      if (
                        ((t += 95),
                        (i += 80),
                        d.current === t && c.current === i)
                      )
                        return (n.current.style.cssText = ""), !1;
                    } else if (
                      ((t += 90), (i += 90), d.current === t && c.current === i)
                    )
                      return (n.current.style.cssText = ""), !1;
                    return (
                      e(
                        (0, k.oOm)(`dynamic${t}_${i}`, { width: t, height: i })
                      ),
                      (d.current = t),
                      (c.current = i),
                      (n.current.style.cssText = ""),
                      !0
                    );
                  }
                  return !0;
                })),
                !0),
              [e, p, s, t]
            );
          return (
            (0, a.useEffect)(() => {
              let e = null;
              const a = (e) => {
                const t = e.target;
                "new-message-button-fly" === t?.getAttribute("id") &&
                  l === tt.Ss.FLY &&
                  m();
              };
              return (
                n.current &&
                  ((e = n.current), e.addEventListener("transitionend", a)),
                l !== tt.Ss.FLY
                  ? i.current &&
                    (t?.cancelAnimationFrame(i.current), (i.current = null))
                  : m(),
                () => {
                  e && e.removeEventListener("transitionend", a);
                }
              );
            }, [m, l, t]),
            (0, $.FD)("div", {
              ref: n,
              "data-testid": "flyMessage",
              className: `flyMessage ${u ? "with-buttons" : ""} ${f.Ld} ${
                o?.type === tt.Go.RECOMMENDED_PRODUCTS ? "narrower" : ""
              }`,
              css: uc,
              children: [
                o &&
                  (0, $.FD)($.FK, {
                    children: [
                      (0, $.Y)(mc, { message: o }),
                      !wc.includes(o.type) &&
                        (0, $.Y)(yc, { message: o, hasButtons: u }),
                    ],
                  }),
                (0, $.Y)("div", {
                  className: "close-button-wrapper",
                  children: (0, $.Y)(cc, {
                    trackingEvent: rt.X.flyMessageClosed,
                  }),
                }),
              ],
            })
          );
        };
        var Ac = () => {
          const e = (0, r.d4)((e) => e.unreadMessages);
          return (0, $.Y)(V, {
            classNames: "scale",
            in: e > 0,
            children: (0, $.Y)("div", {
              id: "new-message",
              className: "active",
              children: e <= 9 ? e : "9+",
            }),
          });
        };
        const Cc = { active: "0px 4px 24px", hover: "0px 8px 32px" },
          Ec = { active: "0px 2px 16px", hover: "0px 2px 12px" };
        function Sc(e, t) {
          return e ? Ec[t] : Cc[t];
        }
        class Dc extends a.Component {
          constructor() {
            super(...arguments),
              (0, i.A)(this, "state", {
                elementHovered: !1,
                buttonShadow:
                  "#020610" === this.props.widgetColor[3]
                    ? `${Sc(this.props.isAwesomeIframe, "active")} ${(0, f.j5)(
                        this.props.widgetColor[3],
                        ".20"
                      )}`
                    : `${Sc(this.props.isAwesomeIframe, "active")} ${(0, f.j5)(
                        this.props.widgetColor[3],
                        ".50"
                      )}`,
                isGradientActive: "#020610" !== this.props.widgetColor[3],
              }),
              (0, i.A)(this, "onBubbleClick", (e) => {
                const { dispatch: t, view: n } = this.props,
                  { chat: i, closed: a, fly: o } = w.l;
                return (
                  (0 === e.nativeEvent.pageX && 0 === e.nativeEvent.pageY) ||
                    e.currentTarget.blur(),
                  n === a
                    ? (t((0, k.pO6)(rt.X.widgetIconClicked)),
                      t((0, k.Otz)()),
                      void t((0, k.npw)(!0)))
                    : n === o
                    ? (t((0, k.g6Q)(i)), void t((0, k.q7v)("conversations")))
                    : void (
                        this.props.allowClose &&
                        (t((0, k.pO6)(rt.X.chatClosed)),
                        t((0, k.Hzh)(!1)),
                        t((0, k.npw)(!1)))
                      )
                );
              }),
              (0, i.A)(this, "setHoverShadow", () => {
                this.setState({ elementHovered: !0 });
              }),
              (0, i.A)(this, "setDefaultShadow", () => {
                this.setState({ elementHovered: !1 });
              });
          }
          static getDerivedStateFromProps(e, t) {
            return t.elementHovered
              ? t.elementHovered
                ? {
                    buttonShadow: `${Sc(e.isAwesomeIframe, "hover")} ${(0,
                    f.j5)(
                      e.widgetColor[3],
                      t.isGradientActive ? ".24" : ".20"
                    )}`,
                  }
                : null
              : {
                  buttonShadow: `${Sc(e.isAwesomeIframe, "active")} ${(0, f.j5)(
                    e.widgetColor[3],
                    t.isGradientActive ? ".50" : ".20"
                  )}`,
                };
          }
          render() {
            const {
                isChatOnSite: e,
                view: t,
                isNewSkin: n,
                isMobile: i,
                allowClose: a,
              } = this.props,
              o = t !== w.l.closed && a,
              r = t === w.l.closed || t === w.l.fly || !a,
              s = this.props.sidebar.fontColor || "#fff";
            return "chat" === t && (!n || i || (e && !i))
              ? null
              : (0, $.FD)("div", {
                  id: "button",
                  "data-testid": "widgetButton",
                  className: `${
                    this.props.isSidebarComponent ? "sidebar" : ""
                  } ${o ? "chat-open" : "chat-closed"} mobile-size__${
                    this.props.mobileButtonSize
                  }`,
                  "aria-label":
                    n && o ? (0, y.pw)("minimize", null, "Minimize") : "",
                  children: [
                    this.props.isSidebarComponent &&
                      (0, $.Y)("div", {
                        className: "sidebar-content",
                        style: {
                          background: this.props.sidebar.color,
                          color: s,
                        },
                        onClick: this.onBubbleClick,
                        children: (0, $.Y)("span", {
                          children: (0, $.Y)(_n, { value: "sidebarLabel" }),
                        }),
                      }),
                    (0, $.FD)("button", {
                      type: "button",
                      id: "button-body",
                      "data-testid": "widgetButtonBody",
                      onClick: this.onBubbleClick,
                      style: {
                        boxShadow: n
                          ? "0px 2px 8px 0px #080F1A14, 0px 2px 2px 0px #080F1A1F"
                          : this.state.buttonShadow,
                      },
                      onMouseEnter: this.setHoverShadow,
                      onMouseLeave: this.setDefaultShadow,
                      className: f.Ld,
                      tabIndex: "0",
                      "aria-label": o
                        ? (0, y.pw)("closeWidget", null, "Close chat widget")
                        : (0, y.pw)("openWidget", null, "Open chat widget"),
                      children: [
                        (0, $.Y)("i", {
                          className:
                            "material-icons type1 for-closed " +
                            (r ? "active" : ""),
                          style: { color: "var(--custom-text-color, #fff)" },
                          children: (0, $.Y)(st.Zh, {}),
                        }),
                        (0, $.Y)("i", {
                          className:
                            "material-icons type1 for-opened " +
                            (r ? "" : "active"),
                          style: { color: "var(--custom-text-color, #fff)" },
                          children: (0, $.Y)(st.bm, {}),
                        }),
                      ],
                    }),
                    !this.props.isSidebarComponent &&
                      (0, $.FD)($.FK, {
                        children: [
                          "chat" !== t && (0, $.Y)(Ac, {}),
                          (0, $.Y)(V, {
                            classNames: "scale",
                            in:
                              this.props.isSoundEnabled &&
                              this.props.areNotificationSnoozed,
                            children: (0, $.Y)("div", {
                              id: "dnd-indicator",
                              children: (0, $.Y)(st.oH, {}),
                            }),
                          }),
                        ],
                      }),
                  ],
                });
          }
        }
        Dc.defaultProps = { isSidebarComponent: !1, isNewSkin: !1 };
        const Yc = (0, r.Ng)((e) => ({
            view: (0, C.KZ)(e),
            widgetColor: (0, f.Ar)(e.widgetColor),
            areNotificationSnoozed: e.notificationSnoozed,
            sidebar: e.sidebarIframeStyles,
            mobileButtonSize: (0, C.eC)(e),
            isSoundEnabled: e.isSoundEnabled,
            isAwesomeIframe: (0, C.ix)(e),
            isChatOnSite: (0, C.Tw)(e),
            isMobile: e.isMobile,
            allowClose: (0, C.em)(e),
          }))(Dc),
          Tc = (e) => {
            let { isSidebarComponent: t } = e;
            const { isNewSkin: n } = (0, p.A)();
            return (0, $.Y)(Yc, { isNewSkin: n, isSidebarComponent: t });
          };
        Tc.defaultProps = { isSidebarComponent: !1 };
        var Fc = Tc;
        var _c = {
          name: "12j9zsf",
          styles:
            "position:absolute;height:42px;bottom:61px;z-index:1;white-space:nowrap;font-size:17px;line-height:17px;.widget-position-left &{/*! @noflip */left:100px;}.widget-position-right &{/*! @noflip */right:100px;}border-radius:var(--radius-component, 16px);padding-block:var(--label-padding-block, 10px);padding-inline:var(--label-padding-inline, 15px);box-shadow:var(--label-shadow);background:#fff",
        };
        const Ic = (0, f.DD)(),
          Mc = (e) => (e ? 94 : 140);
        var Nc = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)(C.KZ),
            n = (0, r.d4)(C.ix),
            { isNewSkin: i } = (0, p.A)(),
            o = ut(i),
            s = (0, a.useRef)(null),
            l = (0, a.useRef)(null),
            d = (0, a.useRef)(null),
            c = (0, a.useRef)(null),
            u = (0, a.useRef)(null),
            f = (0, a.useRef)(null),
            m = (0, a.useCallback)(() => {
              const t = Mc(n);
              e((0, k.oOm)(tt.NO.DYNAMIC, { width: 450, height: t })),
                (c.current = 450),
                (u.current = t);
            }, [e, n]),
            g = (0, a.useCallback)(() => {
              if (!l.current) return !1;
              if (Ic) return m(), !0;
              let t = ((e) => (e ? 94 : 112))(n);
              const i = Mc(n);
              return (
                (t += (() => {
                  try {
                    if (s.current) {
                      s.current.style.cssText =
                        "width: auto; align-self: flex-start; white-space: nowrap";
                      const e = s.current.clientWidth;
                      return (s.current.style.cssText = ""), e + 15;
                    }
                    return 250;
                  } catch {
                    return 250;
                  }
                })()),
                (c.current === t && u.current === i) ||
                  (f.current = l.current?.requestAnimationFrame(() => {
                    e((0, k.oOm)(tt.NO.DYNAMIC, { width: t, height: i })),
                      (c.current = t);
                  })),
                !0
              );
            }, [e, m, n]),
            b = () => {
              f.current &&
                l?.current &&
                (l.current.cancelAnimationFrame(f.current), (f.current = null));
            };
          (0, a.useEffect)(() => {
            (l.current = (0, h.AL)()),
              (d.current = (0, h.GY)()),
              (c.current = d.current?.clientWidth || null),
              (u.current = d.current?.clientHeight || null);
          }, []),
            (0, a.useEffect)(
              () => (
                t !== w.l.closed ? b() : g(),
                () => () => {
                  b();
                }
              ),
              [e, g, t]
            ),
            (0, a.useEffect)(
              () => () => {
                t === w.l.closed && e((0, k.oOm)(tt.NO.ONLY_BUBBLE));
              },
              [e, t]
            );
          const v = () => {
              e((0, k.pO6)(rt.X.widgetLabelClicked)),
                e((0, k.Otz)()),
                e((0, k.npw)(!0));
            },
            x = (e, t) => {
              let n = e;
              const i = [...n],
                a = n.length > t;
              for (; n.length > t; ) i.pop(), (n = i.join(""));
              return a ? `${n}&hellip;` : n;
            };
          return (0, $.Y)(_n, {
            value: ["chatWithUsLabel"],
            children: (e) => {
              let { chatWithUsLabel: t } = e;
              return 0 === t.length
                ? null
                : (0, $.Y)("button", {
                    className: "widgetLabel",
                    ref: s,
                    onClick: v,
                    type: "button",
                    css: [_c, o.text16, "", ""],
                    children: (0, $.Y)("span", {
                      dangerouslySetInnerHTML: { __html: Sn(x(t, 25)) },
                    }),
                  });
            },
          });
        };
        const Rc = (e) => {
          const t = (0, r.d4)(C.KZ),
            [n, i] = (0, a.useState)(t !== w.l.closed);
          return e.children({
            hasAnimationEnded: n,
            onAnimationEnded: () => {
              i((e) => !e);
            },
          });
        };
        Rc.propTypes = { children: G().func.isRequired };
        var Oc = Rc;
        var jc = () => {
          const e = (0, r.d4)(C.KZ),
            t = (0, r.d4)(C.zx),
            n = Boolean((0, Ei.lz)().state),
            i = e !== w.l.closed;
          return (0, $.Y)(Oc, {
            children: (a) => {
              let { hasAnimationEnded: o, onAnimationEnded: r } = a;
              return (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)(V, {
                    in: e === w.l.fly,
                    classNames: "moveFromRight",
                    onExited: e === w.l.closed ? r : void 0,
                    timeout: 300,
                    children: (0, $.Y)(kc, {}),
                  }),
                  (0, $.Y)(V, {
                    in: i && e !== w.l.fly && o,
                    classNames: "moveFromRight",
                    onExited: r,
                    timeout: 400,
                    children: (0, $.Y)(dc, {}),
                  }),
                  t &&
                    (0, $.Y)(V, {
                      in: !i && e !== w.l.fly && !o,
                      classNames: "moveFromLeftLabel",
                      timeout: 300,
                      children: (0, $.Y)(Nc, {}),
                    }),
                  (0, $.Y)(V, {
                    in: !i && !o,
                    classNames: "bubbleAnimationReturn",
                    timeout: 300,
                    onExited: r,
                    children: (0, $.Y)(Fc, {}),
                  }),
                  (0, $.Y)(V, {
                    in: i && o && !(e === w.l.chat && n),
                    classNames: "bubbleAnimation",
                    timeout: 300,
                    onExited: e === w.l.fly ? r : void 0,
                    children: (0, $.Y)(Fc, {}),
                  }),
                ],
              });
            },
          });
        };
        const Lc = () => {};
        var zc = () => {
          const e = (0, r.d4)(C.KZ),
            t = (0, r.d4)((e) => e.isMobile),
            n = (0, r.d4)(C.zx),
            i = Boolean((0, Ei.lz)().state),
            a = e !== w.l.closed;
          return t
            ? (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)(V, {
                    in: e === w.l.fly,
                    classNames: "moveFromRight",
                    timeout: 300,
                    children: (0, $.Y)(kc, {}),
                  }),
                  (0, $.Y)(V, {
                    in: a && e !== w.l.fly,
                    classNames: "moveFromRight",
                    timeout: 300,
                    children: (0, $.Y)(dc, {}),
                  }),
                  (0, $.Y)(V, {
                    in: !(e === w.l.chat && i),
                    classNames: "bubbleAnimation",
                    children: (0, $.Y)(Fc, {}),
                  }),
                ],
              })
            : (0, $.Y)(Oc, {
                children: (t) => {
                  let { hasAnimationEnded: o, onAnimationEnded: r } = t;
                  return (0, $.FD)($.FK, {
                    children: [
                      (0, $.Y)(V, {
                        in: e === w.l.fly,
                        classNames: "moveFromRight",
                        timeout: 300,
                        onExited: e === w.l.closed ? r : Lc,
                        children: (0, $.Y)(kc, {}),
                      }),
                      (0, $.Y)(V, {
                        in: a && e !== w.l.fly,
                        classNames: "moveFromRight",
                        timeout: 300,
                        onExited: r,
                        children: (0, $.Y)(dc, {}),
                      }),
                      n &&
                        (0, $.Y)(V, {
                          in: !a && e !== w.l.fly && o,
                          classNames: "moveFromRightLabel",
                          onExited: r,
                          timeout: 300,
                          children: (0, $.Y)(Nc, {}),
                        }),
                      (0, $.Y)(V, {
                        in: !(e === w.l.chat && i),
                        classNames: "bubbleAnimation",
                        onEntered: r,
                        children: (0, $.Y)(Fc, {}),
                      }),
                    ],
                  });
                },
              });
        };
        const Uc = () => {
          const e = (0, r.d4)(C.KZ),
            t = (0, r.d4)(C.sS),
            n = Boolean((0, Ei.lz)().state),
            i = e !== w.l.closed;
          return (0, $.Y)(Oc, {
            children: (a) => {
              let { hasAnimationEnded: o, onAnimationEnded: r } = a;
              return (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)(V, {
                    in: e === w.l.fly && o,
                    classNames: "moveFromRight",
                    timeout: 300,
                    onExited: e === w.l.closed || e === w.l.fly ? r : void 0,
                    children: (0, $.Y)(kc, {}),
                  }),
                  (0, $.Y)(V, {
                    in: i && e !== w.l.fly && o,
                    classNames: "moveFromRight",
                    timeout: 300,
                    onExited: r,
                    children: (0, $.Y)(dc, {}),
                  }),
                  (0, $.Y)(V, {
                    in: !i && !o,
                    classNames:
                      "" +
                      (t && "left" === t
                        ? "bubbleAnimationLeft"
                        : "bubbleAnimation"),
                    timeout: 300,
                    onExited: r,
                    children: (0, $.Y)(Fc, { isSidebarComponent: !0 }),
                  }),
                  (0, $.Y)(V, {
                    in: i && o && !(e === w.l.chat && n),
                    timeout: 300,
                    classNames: "bubbleAnimation",
                    children: (0, $.Y)(Fc, {}),
                  }),
                ],
              });
            },
          });
        };
        Uc.defaultProps = { sidebarPosition: "right" };
        var Pc = Uc;
        var Bc = (0, r.Ng)((e) => ({
          view: (0, C.KZ)(e),
          isMobile: e.isMobile,
        }))((e) => {
          if ("left" === e.widgetPosition && e.isMobile) {
            const t = e.view !== w.l.closed;
            return (0, $.Y)(Oc, {
              children: (n) => {
                let { hasAnimationEnded: i, onAnimationEnded: a } = n;
                return (0, $.FD)($.FK, {
                  children: [
                    (0, $.Y)(V, {
                      in: e.view === w.l.fly,
                      classNames: "moveFromRight",
                      onExited: e.view === w.l.closed ? a : void 0,
                      timeout: 300,
                      children: (0, $.Y)(kc, {}),
                    }),
                    (0, $.Y)(V, {
                      in: t && e.view !== w.l.fly && i,
                      classNames: "moveFromRight",
                      onExited: a,
                      timeout: 400,
                      children: (0, $.Y)(dc, {}),
                    }),
                    (0, $.Y)(V, {
                      in: !t && !i,
                      classNames: "bubbleAnimationReturn",
                      timeout: 300,
                      onExited: a,
                      children: (0, $.Y)(Fc, {}),
                    }),
                    (0, $.Y)(V, {
                      in: t && i,
                      classNames: "bubbleAnimation",
                      timeout: 300,
                      onExited: e.view === w.l.fly ? a : void 0,
                      children: (0, $.Y)(Fc, {}),
                    }),
                  ],
                });
              },
            });
          }
          return (0, $.FD)($.FK, {
            children: [
              (0, $.Y)(V, {
                in: e.view === w.l.fly,
                classNames: "moveFromRight",
                timeout: 300,
                children: (0, $.Y)(kc, {}),
              }),
              (0, $.Y)(V, {
                in: e.view !== w.l.closed && e.view !== w.l.fly,
                classNames: "moveFromRight",
                timeout: 300,
                children: (0, $.Y)(dc, {}),
              }),
              (0, $.Y)(V, {
                in: !0,
                classNames: "bubbleAnimation",
                children: (0, $.Y)(Fc, {}),
              }),
            ],
          });
        });
        var Hc = () => {
          const e = (0, a.useRef)(""),
            t = (0, r.d4)((e) => e.unreadMessages),
            n = (0, r.d4)((e) => e.isPageVisible),
            i = (0, a.useRef)(null),
            o = (0, a.useRef)(!1),
            [s] = (0, a.useState)(() =>
              RegExp(
                `\\([0-9]+\\) ${(0, y.pw)(
                  "newMessageTitle",
                  null,
                  "New message"
                )}$`
              )
            );
          return (
            (0, a.useEffect)(() => {
              try {
                e.current = window.parent.document.title;
              } catch {
                o.current = !0;
              }
            }, []),
            (0, a.useEffect)(() => {
              if (!o.current) {
                i.current && (clearInterval(i.current), (i.current = null));
                try {
                  !n && t
                    ? (i.current = setInterval(() => {
                        e.current === window.parent.document.title ||
                          s.test(window.parent.document.title) ||
                          (e.current = window.parent.document.title),
                          window.parent.document.title === e.current
                            ? (window.parent.document.title = `(${t}) ${(0,
                              y.pw)("newMessageTitle", null, "New message")}`)
                            : (window.parent.document.title = e.current);
                      }, 1e3))
                    : s.test(window.parent.document.title) &&
                      (window.parent.document.title = e.current);
                } catch {}
                return () => {
                  if (!o.current) {
                    i.current && (clearInterval(i.current), (i.current = null));
                    try {
                      s.test(window.parent.document.title) &&
                        (window.parent.document.title = e.current);
                    } catch {}
                  }
                };
              }
            }, [n, t, s]),
            null
          );
        };
        class qc extends a.Component {
          constructor() {
            super(...arguments),
              (0, i.A)(this, "onWindowVisibilityChange", () => {
                this.setVisibilityState();
              }),
              (0, i.A)(this, "appAvariant", () =>
                this.props.isChatOnSite
                  ? (0, $.Y)(Bc, { widgetPosition: this.props.widgetPosition })
                  : this.props.isSidebarEnabled
                  ? (0, $.Y)(Pc, {})
                  : "left" === this.props.widgetPosition
                  ? (0, $.Y)(jc, {})
                  : (0, $.Y)(zc, {})
              );
          }
          componentDidMount() {
            try {
              window.document.addEventListener(
                "visibilitychange",
                this.onWindowVisibilityChange
              ),
                this.setVisibilityState();
            } catch (e) {
              (0, v.sQ)(e);
            }
            window.tidioChatApi?.trigger(
              "setStatus",
              this.props.isProjectOnline ? "online" : "offline"
            );
          }
          componentDidUpdate(e) {
            e.widgetPosition !== this.props.widgetPosition &&
              this.props.setWidgetPosition(this.props.widgetPosition);
          }
          componentWillUnmount() {
            window.document.removeEventListener(
              "visibilitychange",
              this.onWindowVisibilityChange
            );
          }
          setVisibilityState() {
            const { visibilityState: e } = document;
            return "visible" !== e
              ? (this.props.dispatch((0, k.pHu)(!1)), !1)
              : (this.props.dispatch((0, k.pHu)(!0)), !0);
          }
          render() {
            return (0, $.FD)($.FK, {
              children: [
                !this.props.isSoundEnabled && (0, $.Y)(Hc, {}),
                (0, $.Y)(Ei.Ay, { children: this.appAvariant() }),
              ],
            });
          }
        }
        var $c = (0, r.Ng)((e) => ({
          widgetPosition: e.chatIframeStyles.widgetPosition,
          isSidebarEnabled: e.sidebarIframeStyles,
          isChatOnSite: (0, C.Tw)(e),
          isProjectOnline: e.isProjectOnline,
          isSoundEnabled: e.isSoundEnabled,
        }))(qc);
        const Vc = a.lazy(() => n.e(742).then(n.bind(n, 5073)));
        var Wc = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)(C.JI);
          return t
            ? (0, $.Y)(o.Ay, {
                title: "Tidio Chat - Iframe Modal",
                style: {
                  width: "100%",
                  height: "100%",
                  position: "fixed",
                  top: "0",
                  left: "0",
                  zIndex: 2147483002,
                  border: 0,
                },
                ...f.wh,
                children: (0, $.Y)(Ci, {
                  onDidCatch: () => {
                    e((0, k.QT$)(null));
                  },
                  children: (0, $.Y)(a.Suspense, {
                    fallback: null,
                    children: (0, $.Y)(Vc, { url: t }),
                  }),
                }),
              })
            : null;
        };
        const Kc = a.lazy(() => n.e(742).then(n.bind(n, 1477))),
          Gc = () => (0, $.Y)("div", {});
        var Xc = (e) => {
          let { shadowRoot: t } = e;
          const n = (0, r.wA)(),
            i = (0, r.d4)((e) => e.iframeModalUrl);
          return "string" == typeof i && "" !== i && t
            ? (0, F.createPortal)(
                (0, $.Y)(Ci, {
                  onDidCatch: () => {
                    n((0, k.QT$)(null));
                  },
                  children: (0, $.Y)(a.Suspense, {
                    fallback: (0, $.Y)(Gc, {}),
                    children: (0, $.Y)(Kc, { url: i, shadowRoot: t }),
                  }),
                }),
                t
              )
            : null;
        };
        const Qc = a.lazy(() => n.e(566).then(n.bind(n, 4196))),
          Zc = () => (0, $.Y)("div", {});
        var Jc = () => {
          const e = (0, r.wA)(),
            t = (0, r.d4)((e) => e.popupImageSrc);
          return "string" == typeof t && "" !== t
            ? (0, $.Y)(o.Ay, {
                title: "Tidio Chat - Image Popup",
                style: {
                  width: "100%",
                  height: "100%",
                  position: "fixed",
                  top: "0",
                  left: "0",
                  zIndex: 2147483003,
                  border: 0,
                },
                id: "tidio-chat-image-popup",
                ...f.wh,
                children: (0, $.Y)(Ci, {
                  onDidCatch: () => {
                    e((0, k.yrn)());
                  },
                  children: (0, $.Y)(a.Suspense, {
                    fallback: (0, $.Y)(Zc, {}),
                    children: (0, $.Y)(Qc, { imageSrc: t }),
                  }),
                }),
              })
            : null;
        };
        const eu = a.lazy(() => n.e(566).then(n.bind(n, 944))),
          tu = () => (0, $.Y)("div", {});
        var nu = (e) => {
            let { shadowRoot: t } = e;
            const n = (0, r.wA)(),
              i = (0, r.d4)((e) => e.popupImageSrc);
            return "string" == typeof i && "" !== i && t
              ? (0, F.createPortal)(
                  (0, $.Y)(Ci, {
                    onDidCatch: () => {
                      n((0, k.yrn)());
                    },
                    children: (0, $.Y)(a.Suspense, {
                      fallback: (0, $.Y)(tu, {}),
                      children: (0, $.Y)(eu, { imageSrc: i, shadowRoot: t }),
                    }),
                  }),
                  t
                )
              : null;
          },
          iu = n(4430);
        const au = () => {
          const e = (0, a.useRef)(!1),
            t = (0, a.useRef)(null),
            n = (0, r.wA)(),
            i = (0, a.useCallback)(() => {
              let e = null;
              return t.current && ((e = t.current), (t.current = null)), e;
            }, []),
            o = (0, a.useCallback)(() => {
              (0, f.oN)(() => {
                setTimeout(() => {
                  try {
                    const { href: e } = window.parent.location;
                    e.includes(iu.d$) ? n((0, k.npw)(!0)) : n((0, k.npw)(!1));
                  } catch {}
                }, 0);
              });
            }, [n]),
            s = (0, a.useCallback)(() => {
              try {
                if (!window.parent?.history) return !1;
                const { href: n } = window.parent.location;
                return (
                  ((e) => {
                    !e.includes("#") ||
                      e.includes(iu.d$) ||
                      e.includes(iu.K3) ||
                      e.includes(iu.wI) ||
                      (t.current = e);
                  })(n),
                  n.includes(iu.d$) ||
                    window.parent.history.pushState(
                      null,
                      "mobile-widget",
                      iu.d$
                    ),
                  e.current || (o(), (e.current = !0)),
                  !0
                );
              } catch {
                return !1;
              }
            }, [o]);
          return (
            (0, a.useEffect)(
              () => (
                s(),
                () => {
                  setTimeout(() => {
                    try {
                      const { href: e } = window.parent.location;
                      if (e.includes(iu.d$)) {
                        const t = i() || e.replace(iu.d$, "");
                        window.parent.history.pushState(null, "", t);
                      }
                    } catch {}
                  }, 0);
                }
              ),
              [s, i]
            ),
            null
          );
        };
        var ou = () => {
          const e = (0, r.d4)(C.Ny),
            t = (0, r.d4)(C.KZ),
            n = (0, r.d4)(C.XL);
          return (function () {
            try {
              return window.parent === window.top;
            } catch {
              return !1;
            }
          })() &&
            e &&
            t !== w.l.closed &&
            t !== w.l.fly &&
            n
            ? (0, $.Y)(au, {})
            : null;
        };
        const ru = () => {
          const e = (0, a.useRef)(!1),
            t = (0, r.wA)(),
            n = (0, a.useCallback)(() => {
              (0, f.oN)(() => {
                setTimeout(() => {
                  try {
                    const { href: e } = window.parent.location;
                    e.includes(iu.K3)
                      ? t((0, k.npw)(!0))
                      : e.includes(iu.wI) && t((0, k.npw)(!1));
                  } catch {}
                }, 0);
              });
            }, [t]),
            i = (0, a.useCallback)(() => {
              try {
                if (!window.parent?.location) return !1;
                const { href: i } = window.parent.location;
                return (
                  i.includes(iu.K3)
                    ? t((0, k.npw)(!0))
                    : i.includes(iu.wI) && t((0, k.npw)(!1)),
                  e.current || (n(), (e.current = !0)),
                  !0
                );
              } catch {
                return !1;
              }
            }, [n, t]);
          return (
            (0, a.useEffect)(
              () => (
                i(),
                () => {
                  e.current = !1;
                }
              ),
              [i]
            ),
            null
          );
        };
        var su = () =>
          (function () {
            try {
              return window.parent === window.top;
            } catch {
              return !1;
            }
          })()
            ? (0, $.Y)(ru, {})
            : null;
        var lu = () =>
          (0, $.FD)($.FK, { children: [(0, $.Y)(ou, {}), (0, $.Y)(su, {})] });
        var du = {
          name: "bageow",
          styles:
            ".awesome-iframe{.onlyBubble,.bubbleWithLabel{#button{height:94px;width:94px;bottom:0;}}.widget-position-left{.widgetLabel{/*! @noflip */left:100px;}&.bubbleWithLabel .widgetLabel{/*! @noflip */left:91px;}}.widget-position-right{.widgetLabel{/*! @noflip */right:100px;}&.bubbleWithLabel .widgetLabel{/*! @noflip */right:91px;}}.bubbleWithLabel .widgetLabel{bottom:26px;}.widgetLabel{bottom:61px;transition-property:opacity;}&.mobile{.chat+.chat-closed{bottom:0!important;}.flyMessage+.chat-closed{bottom:0!important;}}[class*='chatSize'] .chat-closed #dnd-indicator{transition:none;}.onlyBubble,.bubbleWithLabel{#new-message,#dnd-indicator{top:14px;right:14px;transition:none;}#new-message+#dnd-indicator{right:3px;}}.onlyBubbleLarge{#new-message,#dnd-indicator{top:14px;right:20px;transition:none;}#new-message+#dnd-indicator{right:10px;}}.onlyBubbleMedium{#new-message,#dnd-indicator{top:7px;transition:none;}}.onlyBubbleSmall{#new-message,#dnd-indicator{top:-3px;transition:none;right:3px;}#new-message+#dnd-indicator{right:-7px;}}.onlyBubbleSmall,.onlyBubbleMedium,.onlyBubbleLarge{#button{transition:none;transform:translateY(0);}}.onlyBubbleSmall #button{width:60px;height:60px;}.onlyBubbleMedium #button{width:80px;height:80px;}.onlyBubbleLarge #button{width:94px;height:94px;}}",
        };
        var cu = {
          name: "1em5khw",
          styles:
            "html,:host{box-sizing:border-box!important;}*,*:before,*:after{box-sizing:inherit;}input::placeholder,textarea::placeholder{color:#8894ab;opacity:1;}input:focus,input:active,textarea:focus,textarea:active,select:focus,select:active{border:0;outline:0;}table{border-spacing:0;}i{user-select:none;}ul{list-style-type:none;}p{margin:0;}.emoji{width:20px;margin:0 2px -5px 2px;user-select:none;}.lang-rtl{/*! @noflip */direction:rtl;unicode-bidi:embed;}.widget-position-left{.chat{right:26px;left:auto;.mobile &{/*! @noflip */right:0;}}#button{&:not(.sidebar){/*! @noflip */left:0px;/*! @noflip */right:auto;}&.bubbleAnimation-exit{right:0px;left:auto;}&.chat-open{right:0px;left:auto;.mobile &{right:0px;left:auto;}}}}.lang-rtl .directional-icon{transform:scaleX(-1);}@media print{.frame-content{display:none!important;}}.grid-layout{max-width:372px;margin:24px 24px 52px 24px;display:grid;grid-template:'content' 1fr 'bubble' auto;gap:12px;&.widget-position-right{position:absolute;inset:0 0 0 auto;}&.sidebar-position-right:has(.sidebar){position:absolute;inset:0 0 0 auto;}&.widget-position-left{position:absolute;inset:0 auto 0 0;}&.sidebar-position-left:has(.sidebar){position:absolute;inset:0 auto 0 0;}&.mobile.chat-on-site{position:fixed;}&:not(.mobile).chat-on-site{inset:0;margin:20px auto;}&>*{pointer-events:auto;}&.mobile{margin:14px;}&:has(.sidebar){margin:0;}.flyMessage{grid-area:content;min-width:220px;max-width:320px;padding:10px;.message-container{padding:10px 10px 1px;max-width:320px;font-size:14px;line-height:18px;:after{display:none;}&.image-content{margin:-10px -10px 0;border-top-left-radius:var(--radius-surface);border-top-right-radius:var(--radius-surface);padding:0;width:320px;max-width:calc(100% + 20px);span{margin-top:20px;padding-inline:20px;}.image-preview{border-radius:0;}}}.input-group{padding:20px 10px 10px;border:none;display:flex;.fly-new-message-button{padding:12px 16px;border-radius:var(--radius-component);border:1px solid rgb(211, 219, 229);font-size:14px;line-height:18px;flex:1;}}.button-wrapper{border-top:1px solid rgb(211, 219, 229);padding-top:20px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;button,.button-url{font-size:14px;line-height:18px;margin:0;}button.more-replies{width:32px;height:18px;padding:0;display:flex;align-items:center;justify-content:center;align-self:flex-start;}}}.chat{grid-area:content;position:absolute;inset:auto 0 0;justify-self:center;align-self:end;max-height:100%;.mobile&{position:fixed;}}&:not(.mobile).chat-on-site{.chat{align-self:center;inset:auto 0;}}#button:not(.sidebar){grid-area:bubble;position:relative;inset:0;width:auto;height:auto;justify-self:right;transform-origin:bottom right;.widget-position-left&{justify-self:left;}.mobile &{transform:none;transform-origin:bottom right;}.mobile .widget-position-left&{transform-origin:bottom left;}}.widgetLabel{grid-area:bubble;justify-self:right;bottom:initial;align-self:center;right:68px!important;.widget-position-left&{justify-self:left;right:initial!important;left:68px!important;}}#new-message,#dnd-indicator{top:-4px;right:-4px;}#button{#new-message:not(:last-child){right:4px;}#new-message+#dnd-indicator:last-child{right:-8px;}}.flyMessage{inset:initial;align-self:end;justify-self:end;margin:0;.widget-position-left&{justify-self:start;}}}",
        };
        var uu = {
          name: "1jvjppu",
          styles:
            "body,#body,:host,input,textarea,select,button{font-family:'TidioInter',sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#080f1a;letter-spacing:normal;}",
        };
        var pu = {
          name: "cvqjrw",
          styles:
            "@keyframes ripple{from{background:rgba(239, 242, 246, 0);transform:scale(0.5);}50%{background:rgba(239, 242, 246, 0.6);transform:scale(1);}to{background:rgba(239, 242, 246, 0);transform:scale(2);}}.mobile{-webkit-tap-highlight-color:rgba(0, 0, 0, 0);.chat{width:100%;height:100%;bottom:0;background:#fff;display:flex;flex-direction:column;border-radius:0;right:0;left:auto;max-height:none;}.input-group{align-self:flex-end;textarea{padding-right:50px;}button,.button-url{margin-bottom:0;}}#conversation-group{max-height:none;flex:1 1 auto;overflow-y:scroll;-webkit-overflow-scrolling:touch;}#button{width:80px;height:100px;bottom:0;transition:transform 0.2s;transform:translateY(-12px);/*! @noflip */right:0px;/*! @noflip */left:auto;&.chat-open{right:0px;left:auto;}&.sidebar{width:50px;}&.chat-closed:not(.sidebar){&.mobile-size{&__small{transform:scale(0.6);}&__medium{transform:scale(0.8);}}}}#new-message{top:17px;right:13px;&+#dnd-indicator{right:2px;}&.active{animation:shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;}}#dnd-indicator{top:17px;right:13px;}button.ripple{touch-action:manipulation;&::after{content:'';position:absolute;height:50px;width:0px;top:calc(50% - 25px);background:rgba(239, 242, 246, 0);border-radius:50%;z-index:-1;will-change:transform,opacity;left:calc(50% - 25px);}&:not(:active)::after{animation:ripple 0.3s ease-in-out;transition:width 0.3s step-end;}&:active::after{width:50px;transition:width 0s step-start;}}.widget-position-left #button.chat-open{right:0;left:auto;}.chat-header{padding:12px 16px 16px;}}",
        };
        var fu = {
          name: "x4lwo8",
          styles:
            "body,#body,:host,input,textarea,select,button{font-family:'Mulish',sans-serif;letter-spacing:-0.24px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#06132b;}",
        };
        var mu = {
          name: "1xen4re",
          styles:
            ".botsListFade-enter{opacity:0;transform:translateY(-52px);&.botsListFade-enter-active{opacity:1;transform:translateY(-60px);}}.botsListFade-appear{opacity:0;transform:translateY(-52px);&.botsListFade-appear-active{opacity:1;transform:translateY(-60px);}}.botsListFade-exit{opacity:1;transform:translateY(-60px);&.botsListFade-exit-active{opacity:0;transform:translateY(-52px);}}.fade-enter{opacity:0.01;&.fade-enter-active{transition:opacity 0.3s;opacity:1;}}.fade-exit{opacity:1;transition:opacity 0.3s;&.fade-exit-active{opacity:0.01;}}.fade200-enter{opacity:0.01;&.fade200-enter-active{transition:opacity 0.2s;opacity:1;}}.fade200-exit{opacity:1;transition:opacity 0.2s;&.fade200-exit-active{opacity:0.01;}}.emojiFade-enter{opacity:0.01;bottom:calc(100% - 10px);&.emojiFade-enter-active{opacity:1;bottom:100%;transition:all 0.3s;}}.emojiFade-exit{opacity:1;bottom:100%;transition:all 0.3s;&.emojiFade-exit-active{opacity:0.01;bottom:calc(100% - 10px);}}.scale-enter{transform:scale(0.01);opacity:0;&.scale-enter-active{transform:scale(1);opacity:1;}}.scale-exit{transform:scale(1);opacity:1;&.scale-exit-active{transform:scale(0.01);opacity:0;}}#button.sidebar{transition:opacity 0.3s,transform 0.3s;&.bubbleAnimation-appear{transform:translateX(8px);opacity:0.01;}&.bubbleAnimation-appear-active{opacity:1;transform:translateX(0px);}&.bubbleAnimation-enter{transform:translateX(8px);opacity:0.01;}&.bubbleAnimation-enter-active{opacity:1;transform:translateX(0px);}&.bubbleAnimation-exit{opacity:1;transform:translateX(0px);}&.bubbleAnimation-exit-active{transform:translateX(8px);opacity:0.01;}}[class~='sidebar-enabled']:not([class~='grid-layout']) .chat+#button:not(.sidebar){opacity:0;pointer-events:none;visibility:hidden;}#button:not(.sidebar){&.bubbleAnimation-appear{transform:translateX(8px);opacity:0.01;&.bubbleAnimation-appear-active{opacity:1;transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;}}&.bubbleAnimation-enter{transform:translateX(8px);opacity:0.01;&.bubbleAnimation-enter-active{opacity:1;transform:translateX(0px);}}&.bubbleAnimation-exit{opacity:1;transform:translateX(0px);.lang-rtl &{display:none;}&.bubbleAnimation-exit-active{transform:translateX(8px);opacity:0.01;}}}.widget-position-left #button:not(.sidebar){&.bubbleAnimation-appear{transform:translateX(-8px);opacity:0.01;&.bubbleAnimation-appear-active{opacity:1;transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;}}&.bubbleAnimation-enter{transform:translateX(-8px);opacity:0.01;&.bubbleAnimation-enter-active{opacity:1;transform:translateX(0px);}}&.bubbleAnimation-exit{opacity:1;transform:translateX(0px);.lang-rtl &{display:none;}&.bubbleAnimation-exit-active{transform:translateX(-8px);opacity:0.01;}}.mobile &{&.bubbleAnimation-exit{display:none;}&.bubbleAnimationReturn-exit-active{display:none;}}}.widget-position-left #button:not(.sidebar){&.bubbleAnimationReturn-appear{opacity:0.01;&.bubbleAnimationReturn-appear-active{opacity:1;transition:opacity 0.3s;}}&.bubbleAnimationReturn-enter{opacity:0.01;&.bubbleAnimationReturn-enter-active{opacity:1;transition:opacity 0.3s;}}&.bubbleAnimationReturn-exit{opacity:1;&.bubbleAnimationReturn-exit-active{opacity:0.01;}}.mobile &{&.bubbleAnimation-exit{display:none;}&.bubbleAnimationReturn-exit-active{display:none;}}}.sidebar-position-left #button.sidebar{&.bubbleAnimationLeft-exit{opacity:1;/*! @noflip */left:0px;}&.bubbleAnimationLeft-exit-active{/*! @noflip */left:-8px;opacity:0.01;transition:opacity 0.3s,left 0.3s;}&.bubbleAnimationLeft-appear{/*! @noflip */left:-8px;opacity:0.01;}&.bubbleAnimationLeft-appear-active{opacity:1;/*! @noflip */left:0px;}&.bubbleAnimationLeft-enter{/*! @noflip */left:-8px;opacity:0.01;}&.bubbleAnimationLeft-enter-active{opacity:1;/*! @noflip */left:0px;}}.moveFromRight-appear{transform:translateX(8px);opacity:0.01;&.moveFromRight-appear-active{opacity:1;transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;}}.moveFromRight-enter{transform:translateX(8px);opacity:0.01;&.moveFromRight-enter-active{opacity:1;transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;}}.moveFromRight-exit{opacity:1;transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;&.moveFromRight-exit-active{transform:translateX(8px);opacity:0.01;}}.moveFromRightLabel-appear{/*! @noflip */right:92px;opacity:0.01;&.moveFromRightLabel-appear-active{opacity:1;/*! @noflip */right:100px;transition:opacity 0.3s,right 0.3s;}}.moveFromRightLabel-enter{/*! @noflip */right:92px;opacity:0.01;&.moveFromRightLabel-enter-active{opacity:1;/*! @noflip */right:100px;transition:opacity 0.3s,right 0.3s;}}.moveFromRightLabel-exit{opacity:1;/*! @noflip */right:100px;transition:opacity 0.3s,right 0.3s;&.moveFromRightLabel-exit-active{/*! @noflip */right:92px;opacity:0.01;}}.moveFromLeftLabel-appear{/*! @noflip */transform:translateX(-8px);opacity:0.01;&.moveFromLeftLabel-appear-active{opacity:1;/*! @noflip */transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;}}.moveFromLeftLabel-enter{/*! @noflip */transform:translateX(-8px);opacity:0.01;&.moveFromLeftLabel-enter-active{opacity:1;/*! @noflip */transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;}}.moveFromLeftLabel-exit{opacity:1;/*! @noflip */transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;&.moveFromLeftLabel-exit-active{/*! @noflip */transform:translateX(-8px);opacity:0.01;}}body:not(.mobile) .widget-position-left .chat,#body:not(.mobile) .widget-position-left .chat{&.moveFromRight-appear{transform:translateX(8px);opacity:0.01;&.moveFromRight-appear-active{opacity:1;transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;}}&.moveFromRight-enter{transform:translateX(8px);opacity:0.01;&.moveFromRight-enter-active{opacity:1;transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;}}&.moveFromRight-exit{opacity:1;transform:translateX(0px);transition:opacity 0.3s,transform 0.3s;&.moveFromRight-exit-active{transform:translateX(8px);opacity:0.01;}}}.operatorTyping-enter{opacity:0.01;transform:translateY(10px);&.operatorTyping-enter-active{transform:translateY(0px);transition:opacity 0.3s,transform 0.3s;opacity:1;}}.operatorTyping-exit{display:none;}",
        };
        const hu = [
          {
            name: "wn0a5y",
            styles:
              ".chat{width:372px;position:absolute;bottom:26px;border-radius:var(--radius-surface, 16px);pointer-events:auto;box-shadow:0 8px 18px 0 rgba(0, 18, 46, 0.16);overflow:hidden;z-index:1;right:26px;left:auto;}textarea{border:0;width:100%;font-size:16px;padding:20px 0 14px 0;resize:none;line-height:20px;overflow-x:hidden;-ms-overflow-style:none;}@keyframes shake{10%,90%{transform:translateX(1px);}20%,80%{transform:translateX(-1px);}30%,50%,70%{transform:translateX(2px);}40%,60%{transform:translateX(-2px);}}button,button.material-icons{background:none;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;padding:0;user-select:none;outline:none;cursor:pointer;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);}button.material-icons::-moz-focus-inner{border:0;padding:0;}button.link{border-bottom:1px solid #444;}",
          },
          {
            name: "1bj0jmz",
            styles:
              "body{overflow:hidden;margin:0;}svg{fill:#fff;transition:all 0.2s ease-in-out;}#button{position:absolute;width:112px;height:140px;bottom:12px;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:1;/*! @noflip */right:0;&.chat-open:not(.sidebar){right:0;left:auto;}button{i{height:26px;width:26px;position:absolute;opacity:0;transition:all 0.2s ease-in-out;display:flex;align-items:center;justify-content:center;&.active{opacity:1;}&.type1{svg{fill:currentColor;}&.for-opened{width:28px;height:28px;svg{width:28px;height:28px;}}}&.for-closed{/*! @noflip */transform:translateX(-10px);&.active{/*! @noflip */transform:translateX(0);}}&.for-opened{/*! @noflip */transform:translateX(10px);&.active{/*! @noflip */transform:translateX(0);}}}&:hover,&:focus{transform:scale(1.1);}&:active{transform:scale(0.9);}}.sidebar-content:hover{~#button-body{body:not(.mobile) &,#body:not(.mobile) &{transform:scale(1.1);}}}&.sidebar{width:50px;pointer-events:auto;bottom:calc(50% - 100px);svg{width:15px;height:15px;}.sidebar-position-left &{/*! @noflip */left:0;/*! @noflip */right:auto;.sidebar-content{/*! @noflip */transform-origin:left top;/*! @noflip */transform:rotate(270deg);/*! @noflip */left:0;/*! @noflip */right:auto;/*! @noflip */border-bottom-right-radius:4px;/*! @noflip */border-bottom-left-radius:28px;/*! @noflip */padding:0 20px 0 30px;}#button-body{/*! @noflip */left:7px;}}.sidebar-content{background:#313fa0;color:#fff;/*! @noflip */padding:0 30px 0 20px;font-size:14px;line-height:30px;height:30px;font-weight:700;position:relative;overflow:hidden;/*! @noflip */border-bottom-right-radius:28px;/*! @noflip */border-bottom-left-radius:4px;/*! @noflip */transform:rotate(90deg);/*! @noflip */transform-origin:right top;position:absolute;bottom:0;/*! @noflip */right:0;white-space:nowrap;max-width:400px;span{display:inline-block;transform:rotate(180deg);max-width:265px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;}&:hover{cursor:pointer;}}#button-body{position:absolute;/*! @noflip */right:7px;bottom:20px;width:32px;height:32px;box-shadow:0 6px 20px 0 rgba(0, 18, 46, 0.24);}button{i.material-icons.type1{width:15px;height:15px;}}}}#button-body{width:var(--bubble-size, 60px);height:var(--bubble-size, 60px);border-radius:28px;display:inherit;align-items:center;justify-content:center;pointer-events:initial;background-size:130% 130%;transition:all 0.15s cubic-bezier(0.4, 0, 0.2, 1);position:relative;color:#0566ff;background:var(--custom-background);&::before{content:'';transition:opacity 0.5s ease-in-out;position:absolute;top:-1px;right:-1px;bottom:-1px;left:-1px;opacity:0;border-radius:50%;background-color:#c6ccdc;}&:hover,&:focus{outline:none;body:not(.mobile) &,#body:not(.mobile) &{transform:scale(1.1);}}&:active{outline:none;body:not(.mobile) &,#body:not(.mobile) &{transform:scale(0.9);}}}#new-message,#dnd-indicator{position:absolute;top:37px;font-weight:700;color:#fff;right:23px;pointer-events:none;border-radius:10px;display:flex;justify-content:center;align-items:center;min-width:20px;height:20px;}#new-message{font-size:12px;background:#e81332;z-index:2;line-height:16px;padding:2px 4px;&+#dnd-indicator{right:12px;}&.active{animation:shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;}}#dnd-indicator{background:#fff;outline:1px solid #e2e8ef;color:#080f1a;z-index:1;svg{fill:#080f1a;width:16px;height:16px;}}",
          },
          {
            name: "1d52hgj",
            styles:
              ".emoji-mart,.emoji-mart *{box-sizing:border-box;line-height:1.15;}.emoji-mart{font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif;font-size:16px;display:inline-block;color:#222427;border:1px solid #d9d9d9;border-radius:5px;background:#fff;}.emoji-mart .emoji-mart-emoji{padding:6px;}.emoji-mart-bar{border:0 solid #d9d9d9;}.emoji-mart-bar:first-child{border-bottom-width:1px;border-top-left-radius:5px;border-top-right-radius:5px;}.emoji-mart-bar:last-child{border-top-width:1px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;}.emoji-mart-anchors{display:flex;flex-direction:row;justify-content:space-between;padding:0 6px;color:#858585;line-height:0;}.emoji-mart-anchor{position:relative;display:block;flex:1 1 auto;color:#858585;text-align:center;padding:12px 4px;overflow:hidden;transition:color 0.1s ease-out;margin:0;box-shadow:none;background:none;border:none;}.emoji-mart-anchor:focus{outline:0;}.emoji-mart-anchor:hover,.emoji-mart-anchor:focus,.emoji-mart-anchor-selected{color:#464646;}.emoji-mart-anchor-selected .emoji-mart-anchor-bar{bottom:0;}.emoji-mart-anchor-bar{position:absolute;bottom:-3px;left:0;width:100%;height:3px;background-color:#464646;}.emoji-mart-anchors i{display:inline-block;width:100%;max-width:22px;}.emoji-mart-anchors svg,.emoji-mart-anchors img{fill:currentColor;max-height:18px;}.emoji-mart-scroll{overflow-y:scroll;overflow-x:hidden;height:270px;padding:0 6px 6px 6px;will-change:transform;}.emoji-mart-search{margin-top:6px;padding:0 6px;position:relative;}.emoji-mart-search input{font-size:16px;display:block;width:100%;padding:0.2em 0.6em;border-radius:25px;border:1px solid #d9d9d9;outline:0;}.emoji-mart-search input,.emoji-mart-search input::-webkit-search-decoration,.emoji-mart-search input::-webkit-search-cancel-button,.emoji-mart-search input::-webkit-search-results-button,.emoji-mart-search input::-webkit-search-results-decoration{-webkit-appearance:none;}.emoji-mart-search-icon{position:absolute;top:7px;right:11px;z-index:2;padding:2px 5px 1px;border:none;background:none;}.emoji-mart-category .emoji-mart-emoji span{z-index:1;position:relative;text-align:center;cursor:default;}.emoji-mart-category .emoji-mart-emoji:hover:before{z-index:0;content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:#f4f4f4;border-radius:100%;}.emoji-mart-category-label{z-index:2;position:relative;position:-webkit-sticky;position:sticky;top:0;}.emoji-mart-category-label span{display:block;width:100%;font-weight:500;padding:5px 6px;background-color:#fff;background-color:rgba(255, 255, 255, 0.95);}.emoji-mart-category-list{margin:0;padding:0;}.emoji-mart-category-list li{list-style:none;margin:0;padding:0;display:inline-block;}.emoji-mart-emoji{position:relative;display:inline-block;font-size:0;margin:0;padding:0;border:none;background:none;box-shadow:none;}.emoji-mart-emoji-native{font-family:'Segoe UI Emoji','Segoe UI Symbol','Segoe UI','Apple Color Emoji','Twemoji Mozilla','Noto Color Emoji','Android Emoji';}.emoji-mart-no-results{font-size:14px;text-align:center;padding-top:70px;color:#858585;}.emoji-mart-no-results-img{display:block;margin-left:auto;margin-right:auto;width:50%;}.emoji-mart-no-results .emoji-mart-category-label{display:none;}.emoji-mart-no-results .emoji-mart-no-results-label{margin-top:0.2em;}.emoji-mart-no-results .emoji-mart-emoji:hover:before{content:none;}.emoji-mart-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0;}",
          },
          (0, d.AH)(
            "*:focus{outline:thin dotted;}.chat{max-height:calc(100% - 47px);display:flex;flex-direction:column;}svg{width:24px;height:24px;}.chat-header{padding:var(--chat-padding, 24px);background:var(--custom-background);color:var(--custom-text-color);position:relative;z-index:4;flex:0 0 auto;a{color:currentColor;&:hover{text-decoration:none;}}}#conversation-group::-webkit-scrollbar,#new-message-textarea::-webkit-scrollbar{display:none;}.header-ava{border-radius:24px;background-size:cover;background-position:center;background-image:url(",
            Vn,
            ");float:left;.mobile &{width:42px;height:42px;border-radius:19px;}}#conversation-group{width:100%;overflow-y:auto;overflow-x:hidden;-ms-overflow-style:none;background:#fff;transition:all 0.3s;min-height:160px;height:487px;padding-inline:var(--chat-padding, 24px);flex:1 auto;.grid-layout &{display:flex;flex-direction:column;:before{content:'';display:block;width:100%;height:1px;flex:1;}}&.ios-ipad{-webkit-overflow-scrolling:touch;width:calc(100% + 6px);/*! @noflip */margin-right:0;.lang-rtl &{/*! @noflip */margin-right:-6px;}}.uploadIconWrapper{position:absolute;display:flex;height:100%;width:100%;align-items:center;justify-content:center;top:0;left:0;right:0;z-index:3;span{font-size:19px;max-width:120px;text-align:center;color:#080f1a;line-height:1.3;}.ic_upload{fill:#287efc;width:73px;height:73px;margin-bottom:10px;margin-top:-5px;}}.upload-circle{width:230px;height:230px;border-radius:50%;background:rgba(182, 198, 229, 0.24);display:flex;flex-direction:column;align-items:center;justify-content:center;animation:scale-up 0.3s ease;position:relative;z-index:1;}&.drag-active::after{content:'';position:absolute;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background:rgba(255, 255, 255, 0.92);z-index:2;animation:fade-in 0.3s ease;}.transition-container &{flex:1;}}.transition-container{height:399px;background:#fff;flex:0 1 auto;min-height:160px;position:relative;display:flex;flex-direction:column;#conversation-group{overflow-y:hidden;}}#messages{position:relative;-ms-overflow-style:none;margin-top:10px;width:100%;padding-bottom:24px;float:left;.grid-layout &{padding-bottom:16px;}}#conversation-group #conversation-scroll{width:16px;height:calc(339px - 26px);position:absolute;right:0;padding:0 4px;}#conversation-group #conversation-scroll div{width:8px;margin:0 1px;background:#00173b;opacity:0;top:0;position:absolute;border-radius:4px;cursor:pointer;transition:opacity 0.1s ease-in-out,width 0.1s ease-in-out,margin 0.1s ease-in-out;z-index:2;user-select:none;}#conversation-group:hover #conversation-scroll div{body:not(.mobile) &,#body:not(.mobile) &{opacity:0.16;}}#conversation-group #conversation-scroll div:hover{body:not(.mobile) &,#body:not(.mobile) &{opacity:0.32;width:10px;margin:0;}}hr{margin:0;border:0;border-bottom:1px solid #dbdfe6;}input,textarea{&.disabled{cursor:not-allowed;color:#8894ab;}}button,label{&.material-icons{position:relative;z-index:1;margin:15px 0 8px 11px;float:right;svg{fill:#8894ab;&.options-icon{fill:currentColor;}}&::before{content:'';position:absolute;background:#eff2f6;width:40px;height:40px;border-radius:50%;z-index:-1;transition:all 0.16s ease-in-out;transform:scale(0);top:calc(50% - 22px);left:calc(50% - 20px);}&:hover::before{body:not(.mobile) &,#body:not(.mobile) &{transform:scale(1);}}&:focus{svg{fill:currentColor;}svg.bots-icon{fill:var(--custom-action-color, #0566ff);}}&.disabled svg,&.disabled:focus svg{fill:#c9cbd8;}}}.input-group{padding-inline:var(--chat-padding, 24px);padding-bottom:16px;width:100%;position:relative;background:#fff;z-index:3;flex:0 0 auto;&.drag-active .drag-active-wrapper::after{content:'';position:absolute;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background:rgba(255, 255, 255, 0.7);z-index:1;animation:fade-in 0.3s ease;}.footer-input-wrapper,.footer-icons-wrapper{transition:all 0.5s ease-in-out;opacity:1;transform:translateY(0);&.hidden{transform:translateY(10px);pointer-events:none;opacity:0;}}.footer-icons-wrapper{display:flex;flex-direction:row;align-items:center;}}.emoji-wrapper{height:215px;position:absolute;overflow:hidden;width:340px;bottom:100%;z-index:10;left:18px;}.emoji-mart{border:0;position:absolute;width:100%!important;height:100%;right:0;input:focus{border:1px solid #d9d9d9;}&-scroll{height:140px;}.emoji-mart-emoji{cursor:pointer;span{cursor:pointer;}}}.emoji-mart-anchor{-ms-flex:1 1 auto;}.bots-dropdown{position:absolute;top:72px;background:#fff;border-radius:8px;box-shadow:0 6px 32px 0 rgba(0, 18, 46, 0.16);padding:12px 6px;z-index:6;transition:all 0.2s ease-in-out;right:24px;ul{margin:0;padding:0;li{border-radius:6px;display:flex;&:nth-of-type(2) button{svg{fill:#ffb926;}}}}li button{padding:8px 16px;display:flex;margin:0;position:initial;float:initial;width:100%;border-radius:6px;&:hover,&:focus{body:not(.mobile) &,#body:not(.mobile) &{background:#eff2f6;}}svg,&:focus svg{fill:#8894ab;height:22px;width:22px;}span{margin-left:10px;color:#06132b;}&::before{content:none;}}}.bots-dropdown{top:auto;bottom:0;transform:translateY(-60px);max-height:275px;width:max-content;overflow-y:auto;z-index:11;right:auto;left:0px;ul{li{padding:0;span{cursor:pointer;padding:8px 16px;display:flex;align-items:center;gap:8px;width:100%;svg{width:22px;height:22px;}}}}ul.bots-cancel{span{color:#0ab6ff;display:flex;align-items:center;}svg{fill:red;}}}.emoji-switch.active svg{fill:currentColor;}@keyframes scale-up{0%{transform:scale(0.8);}100%{transform:scale(1);}}@keyframes fade-in{0%{opacity:0;}100%{opacity:1;}}.chat-in-preview--tour{.exit-chat,.options-icon{opacity:0.3;}.input-group{opacity:0.4;}}",
            ""
          ),
          mu,
          (0, d.AH)(
            ".message{padding-block:var(--message-padding-block, 10px);padding-inline:var(--message-padding-inline, 16px);border-radius:var(--radius-component, 20px);margin:2px 0;font-size:var(--message-font-size, 15px);line-height:var(--message-line-height, 20px);word-wrap:break-word;display:inline-block;max-width:85%;clear:both;position:relative;transition:margin 0.28s ease-in-out;&.timestamp-visible{margin-bottom:28px;}&.rating-visible{margin-bottom:35px;}span.message-content{white-space:pre-line;}span.message-content--markdown{white-space:break-spaces;.markdown-image{display:block;max-width:100%;margin:2px 0;border-radius:var(--radius-component, 20px);}a .markdown-image{cursor:pointer;}}.message-content{ul{list-style-type:disc;}ol{list-style-type:decimal;}ul,ol{margin:12px 0;padding-left:16px;}li{padding-left:4px;margin-bottom:8px;}}img{max-width:100%;&:not(.emoji){cursor:zoom-in;}}}.rating-visible+.message,.rating-visible+.slideshow{margin-top:10px;}.message-visitor{color:#fff;background:linear-gradient(332deg, #21dbdb, #2979ff);float:right;&+.message-operator{margin-top:9px;}span a{color:currentColor;}&.not-delivered{outline:1px solid #e2e8ef;background:#fff;color:#647491;margin-bottom:22px;.resend-message{position:absolute;bottom:-22px;font-size:12px;right:0;color:#e81332;}}}.message-operator{color:#06132b;background:var(--operator-message, #f0f2f7);float:left;&.message-form{width:100%;padding:16px;}span a{color:#06132b;}&+.message-visitor{margin-top:9px;}&.timestamp-visible~.bots-quick-replies{padding-top:0;}&.message-with-buttons,.message-with-buttons,&.bots-quick-replies{padding-left:0;padding-right:0;padding-bottom:0;transition:padding 0.28s ease-in-out;&.buttons-hidden{padding-bottom:10px;}>span{padding:0 16px;display:inline-block;word-break:break-word;}.button-wrapper{background:#fff;width:100%;margin-top:10px;border:1px solid var(--border-color, #ebeef0);border-bottom-left-radius:var(--radius-component, 20px);border-bottom-right-radius:var(--radius-component, 20px);border-top:0;position:relative;}.button-icon{display:flex;justify-content:center;transition:background-color 0.2s ease-in-out;padding:8px 16px;border-bottom-left-radius:var(--radius-component, 20px);border-bottom-right-radius:var(--radius-component, 20px);cursor:pointer;outline:none;& svg{fill:var(--custom-action-color, #0566ff);width:20px;height:20px;}&:hover{background-color:var(--custom-action-color-hover, #f6f8fb);}}button,.button-url{margin:0 auto;min-width:100%;display:block;font-size:16px;line-height:19px;padding:8px 16px;border-bottom:1px solid var(--border-color, #ebeef0);color:var(--custom-action-color, #0566ff);background:transparent;position:relative;z-index:2;outline:none;word-break:break-word;&:hover{text-decoration:underline;}}}.message-with-buttons,&.message-with-buttons{button:last-child,.button-url:last-child{border-bottom:0;}.grid-layout &{.button-wrapper{border-top:1px solid var(--border-color);}}}&.bots-quick-replies{width:85%;background-color:#fff;margin-top:0;float:right;.button-wrapper{margin-top:0;display:flex;flex-wrap:wrap;justify-content:flex-end;width:100%;border:none;}button{font-size:15px;padding:10px 14px;border:1px solid;border-radius:var(--radius-component, 20px);margin:3px;min-width:inherit;}span{text-align:left;overflow:hidden;&.line-clamp{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;}}}&.buttons-message{padding:0;max-width:90%;.message-with-buttons{max-width:100%;&-text{padding:9px 16px 1px;line-height:19px;white-space:pre-line;.grid-layout &{padding-top:16px;}}}}&.coupon-code-message{padding:10px 14px 14px;width:100%;}&.message-alert{border:2px solid #dee3e8;background:#fff!important;margin-bottom:22px;position:relative;svg.alert-icon{height:20px;width:20px;fill:red;position:absolute;top:-5px;background:#fff;right:-5px;}}&.typing-indicator{text-align:left;span{height:4px;width:4px;margin:11px 1px 0 1px;background-color:#000;display:inline-block;border-radius:50%;opacity:0.4;animation:blink 1.3s linear infinite;&:first-child{margin-left:4px;}&:nth-child(2){animation-delay:-1.1s;}&:nth-child(3){animation-delay:-0.9s;}}}.button-url{font-size:16px;line-height:19px;padding:8px 16px;text-align:center;}.button-url__anchor{text-decoration:none;color:var(--custom-action-color, #0566ff);&:hover{text-decoration:underline;}}@keyframes blink{0%,60%,100%{transform:initial;}30%{transform:translateY(-5px);}}}.message .emoji{margin:0 1px 0 2px;vertical-align:-5px;}.messageTimestamp{bottom:-24px;font-size:12px;color:#8894ab;position:absolute;transition:all 0.2s;white-space:nowrap;.message-operator &{height:23px;display:flex;align-items:center;top:calc(100% + 4px);left:12px;}.message-visitor &{right:12px;}svg{width:16px;height:16px;margin-right:4px;}}.shake{animation:shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;}.rate-comment{max-width:95%;}.pre-chat,.rate-comment,.always-online{.field-wrapper{&.field-wrapper-with-error{input,textarea{border-color:#f6303a;}}}svg{width:19px;height:19px;position:absolute;top:8px;fill:green;left:9px;&#ic_arrow{fill:var(--custom-action-color, #0566ff);transform:rotate(45deg);}&#ic_close{fill:red;}}input,textarea{display:block;width:100%;font-size:16px;padding:12px 16px;border-radius:var(--radius-component, 5px);margin:10px 0 5px;border:solid 1px rgba(108, 125, 159, 0.24);&:active:not([type='checkbox']),&:focus:not([type='checkbox']){border:solid 1px rgba(108, 125, 159, 0.24);}&[type='checkbox']{width:auto;display:inline-block;margin:0;padding:0;min-height:14px;min-width:14px;border:none;.mobile .firefox &{outline:solid 1px rgba(108, 125, 159, 0.24);}}}label{font-size:12px;line-height:14px;text-align:justify;display:flex;justify-content:flex-start;align-items:flex-start;gap:8px;padding:4px;a{word-break:break-all;}}}.timestamp-avatar{width:23px;height:23px;position:absolute;top:0;background-position:center;background-size:cover;border-radius:25px;background-image:url(",
            Vn,
            ");padding-left:23px;left:0;&+span{margin-left:30px;}}.timestamp-operator{margin-right:2px;}.loader-icon{&.circular{animation:rotate 2s linear infinite;height:100%;transform-origin:center center;position:absolute;top:0;bottom:0;margin:0;left:10px;right:0;}.path{stroke-dasharray:1,200;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite;stroke-linecap:round;}@keyframes rotate{100%{transform:rotate(360deg);}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0;}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px;}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px;}}}.message-upload{max-width:75%;span{padding-left:25px;}#ic_download{position:absolute;top:50%;transform:translateY(-50%);}&.message-operator{#ic_download{right:-35px;}}&.message-visitor{#ic_download{left:-35px;}}a{display:flex;justify-content:space-between;align-items:center;outline:none;&:hover>svg{opacity:1;}>svg{opacity:0;fill:#bfc5d7;}}&.message-image{background:none;padding:0;span{padding-left:0;}img{width:100%;border-radius:var(--radius-component, 20px);}}&.message-file{span{display:inline-block;word-break:break-all;padding-left:0;}a{color:inherit;text-decoration:none;display:inline-block;padding-left:35px;svg{position:absolute;top:50%;transform:translateY(-50%);left:17px;}}}}.attachment-img{background:white;color:white;border:none;outline:none;}",
            ""
          ),
          pu,
          du,
          cu,
        ];
        var gu = {
          newSkinContentStyles: [...hu, uu],
          oldSkinContentStyles: [...hu, fu],
        };
        const bu = {
          zIndex: "z-index",
          transition: "transition",
          background: "background",
        };
        (0, b.o)().markDuration("widget_total_load_in_ms", "end");
        const vu = (e) => {
          try {
            e &&
              Object.keys(bu).forEach((t) => {
                e.style.setProperty(bu[t], e.style[t], "important");
              });
          } catch {}
        };
        function xu(e, t, n) {
          e &&
            ("mobile" === t
              ? setTimeout(() => {
                  e.style.setProperty("bottom", n, "important");
                }, 0)
              : "onlySidebar" === t
              ? setTimeout(() => {
                  e.style.setProperty("bottom", n, "important"),
                    e.style.setProperty(
                      "transform",
                      "translateY(50%)",
                      "important"
                    );
                }, 0)
              : e.style.setProperty("bottom", n));
        }
        const yu = (0, f.Ph)(),
          wu = () => {
            c.RV.assign({
              skipAnimation: "visible" !== document?.visibilityState,
            });
          },
          ku = (e) => {
            try {
              let t = e.target;
              const n = e.target;
              if (!t?.shadowRoot) return;
              if (e.composedPath && e.composedPath().length > 0) {
                const n = e.composedPath()[0];
                n && n !== t && (t = n);
              }
              t !== n &&
                (Object.defineProperty(e, "target", {
                  value: t,
                  writable: !1,
                  configurable: !0,
                }),
                e.srcElement &&
                  Object.defineProperty(e, "srcElement", {
                    value: t,
                    writable: !1,
                    configurable: !0,
                  }));
            } catch {}
          },
          Au = { capture: !0, passive: !1 };
        class Cu extends a.Component {
          constructor(e) {
            super(e),
              (0, i.A)(
                this,
                "styleCache",
                (0, s.A)({
                  key: "tidio",
                  stylisPlugins: (0, y.V8)() ? [u.Ay] : [],
                  container:
                    this.props.styleCacheContainer ||
                    this.props.iframeDocument.head,
                })
              ),
              (0, i.A)(this, "state", { isRendered: !1 }),
              (0, i.A)(
                this,
                "setImportantPositioningForMobileAndSidebar",
                () => {
                  this.props.iframeWindow.frameElement &&
                    ("mobile" === this.props.iframeView
                      ? setTimeout(() => {
                          this.props.iframeWindow.frameElement.style.setProperty(
                            "bottom",
                            this.getBottomOffset(),
                            "important"
                          );
                        }, 0)
                      : "onlySidebar" === this.props.iframeView
                      ? setTimeout(
                          () => (
                            this.props.iframeWindow.frameElement.style.setProperty(
                              "bottom",
                              "50%",
                              "important"
                            ),
                            this.props.iframeWindow.frameElement.style.setProperty(
                              "transform",
                              "translateY(50%)",
                              "important"
                            ),
                            !0
                          ),
                          0
                        )
                      : this.props.iframeWindow.frameElement.style.setProperty(
                          "bottom",
                          this.getBottomOffset()
                        ));
                }
              ),
              (0, i.A)(this, "registerClickForAutoPlayPermissions", () => {
                try {
                  const e = () => {
                    (0, x.pc)(this.props.isNewSkin),
                      window.parent.document.removeEventListener(
                        "click",
                        e,
                        !0
                      ),
                      window.parent.document.removeEventListener(
                        "touchend",
                        e,
                        !0
                      ),
                      this.props.iframeDocument.removeEventListener(
                        "click",
                        e,
                        !0
                      ),
                      this.props.iframeDocument.removeEventListener(
                        "touchend",
                        e,
                        !0
                      );
                  };
                  (this.props.isMobile ||
                    "safari" === f.Ld ||
                    "mobile safari" === f.Ld) &&
                    (window.parent.document.addEventListener("click", e, !0),
                    window.parent.document.addEventListener("touchend", e, !0),
                    this.props.iframeDocument.addEventListener("click", e, !0),
                    this.props.iframeDocument.addEventListener(
                      "touchend",
                      e,
                      !0
                    ));
                } catch (e) {
                  (0, v.sQ)(e);
                }
              }),
              (0, h.rr)(this.props.iframeDocument, this.props.iframeWindow);
          }
          componentDidMount() {
            vu(this.props.iframeWindow.frameElement),
              xu(
                this.props.iframeWindow.frameElement,
                this.props.iframeView,
                this.getBottomOffset()
              ),
              this.props.isSoundEnabled &&
                this.registerClickForAutoPlayPermissions(),
              this.setImportantPositioningForMobileAndSidebar(),
              document?.addEventListener("visibilitychange", wu),
              c.RV.assign({
                requestAnimationFrame:
                  this.props.iframeWindow.requestAnimationFrame,
                cancelAnimationFrame:
                  this.props.iframeWindow.cancelAnimationFrame,
              });
            try {
              this.props.iframeDocument.addEventListener(
                "error",
                (e) => {
                  if (e?.target?.matches("img.emoji") && e.target.parentNode) {
                    const t = e.target.closest(".message"),
                      n = t?.querySelector(".message-content"),
                      i = this.props.isNewSkin
                        ? this.props.iframeDocument.ownerDocument
                        : this.props.iframeDocument;
                    if (
                      (e.target.parentNode.replaceChild(
                        i.createTextNode(e.target.alt),
                        e.target
                      ),
                      t && n && this.props.iframeWindow)
                    ) {
                      const e = 35;
                      this.props.iframeWindow.requestAnimationFrame(() => {
                        t.style.width = `${n.offsetWidth + e}px`;
                      });
                    }
                  }
                },
                !0
              );
            } catch (e) {
              (0, v.sQ)(e);
            }
            setTimeout(() => {
              this.setState({ isRendered: !0 });
            }, 0),
              this.props.isNewSkin &&
                (() => {
                  try {
                    window.parent.addEventListener("touchstart", ku, Au),
                      window.parent.addEventListener("touchend", ku, Au),
                      window.parent.addEventListener("touchmove", ku, Au);
                  } catch {}
                })();
          }
          componentDidUpdate(e) {
            e.iframeMode !== this.props.iframeMode &&
              (vu(this.props.iframeWindow.frameElement),
              this.setImportantPositioningForMobileAndSidebar(),
              xu(
                this.props.iframeWindow.frameElement,
                this.props.iframeView,
                this.getBottomOffset()
              ));
          }
          componentWillUnmount() {
            document.removeEventListener("visibilitychange", wu),
              this.props.isNewSkin &&
                (() => {
                  try {
                    window.parent.removeEventListener("touchstart", ku, Au),
                      window.parent.removeEventListener("touchend", ku, Au),
                      window.parent.removeEventListener("touchmove", ku, Au);
                  } catch {}
                })();
          }
          getBottomOffset() {
            const {
              isAwesomeIframe: e,
              iframeMode: t,
              iframeView: n,
            } = this.props;
            return "onlySidebar" === n
              ? "50%"
              : (e && g.K5?.[t] && g.K5[t].bottom) || 0;
          }
          render() {
            return (0, $.FD)(l.C, {
              value: this.styleCache,
              children: [
                (0, $.Y)(d.mL, {
                  styles: this.props.isNewSkin
                    ? gu.newSkinContentStyles
                    : gu.oldSkinContentStyles,
                }),
                (0, $.Y)(lu, {}),
                this.state.isRendered &&
                  (0, $.Y)($c, {
                    setWidgetPosition: this.props.setWidgetPosition,
                  }),
              ],
            });
          }
        }
        Cu.defaultProps = { styleCacheContainer: null };
        const Eu = (e) => {
          const { document: t, window: n } = (0, o.j$)();
          return (0, $.Y)(Cu, { ...e, iframeDocument: t, iframeWindow: n });
        };
        class Su extends a.Component {
          constructor() {
            var e;
            super(...arguments),
              (e = this),
              (0, i.A)(this, "getIframeSize", () => ({
                ...(0, g.LY)(this.props.iframeView),
                ...("onlySidebar" === this.props.iframeView
                  ? {
                      left:
                        "left" === this.props.sidebarPosition ? "0" : void 0,
                      right:
                        "right" === this.props.sidebarPosition ? "0" : void 0,
                    }
                  : {}),
              })),
              (0, i.A)(this, "state", {
                style: {
                  display: "block",
                  border: "none",
                  position:
                    !this.props.isChatOnSite ||
                    this.props.isMobile ||
                    (0, f.DD)()
                      ? "fixed"
                      : "inherit",
                  top: "auto",
                  bottom: 0,
                  left: "auto",
                  right: "auto",
                  ...this.getIframeSize(),
                  opacity: 0,
                  [this.props.widgetPosition]: 0,
                  colorScheme: "none",
                  background: "none transparent",
                  margin: 0,
                  maxHeight: "100vh",
                  maxHeight: "100dvh",
                  maxWidth: "100vw",
                  transform: "translateY(0)",
                  transition: "none",
                  visibility: "visible",
                  zIndex: 999999999,
                },
              }),
              (0, i.A)(this, "ref", null),
              (0, i.A)(this, "getAwesomeIframeOffset", (e, t) => {
                let n = 0;
                return g.K5?.[e]?.[t] && (n = g.K5[e][t]), n;
              }),
              (0, i.A)(this, "setIframeStyle", function (t) {
                let n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : () => {};
                e.setState({ style: t }, n);
              }),
              (0, i.A)(this, "getCurrentIframeStyle", () => ({
                ...this.state.style,
              })),
              (0, i.A)(this, "mergeWithCurrentStyles", function (t) {
                let n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : () => {};
                e.setIframeStyle({ ...e.getCurrentIframeStyle(), ...t }), n();
              }),
              (0, i.A)(this, "setWidgetPosition", (e, t) => {
                const n = this.getCurrentIframeStyle(),
                  i = this.getIframeMode();
                let a = 0;
                this.props.isAwesomeIframe &&
                  (a = this.getAwesomeIframeOffset(i, e)),
                  this.setIframeStyle(
                    { ...n, right: "auto", left: "auto", [e]: a },
                    t
                  );
              }),
              (0, i.A)(this, "getIframeAwesomeStyle", () => {
                const { widgetPosition: e, isAwesomeIframe: t } = this.props,
                  n = {};
                if (t) {
                  const t = this.getIframeMode(),
                    { width: i, height: a } = g.K5?.[t] || {};
                  if (
                    (i && (n.width = i),
                    a && (n.height = a),
                    (n[e] = this.getAwesomeIframeOffset(t, e)),
                    (n.borderRadius = this.props.isMobile ? 0 : g.aL),
                    yu)
                  ) {
                    const { bottom: e, right: i } = g.K5?.[t] || {};
                    (n.bottom = e), (n.right = i);
                  }
                }
                return n;
              }),
              (0, i.A)(this, "onIframeMount", () => {
                this.setWidgetPosition(
                  this.props.widgetPosition,
                  this.animateOpacity
                );
              }),
              (0, i.A)(this, "animateOpacity", () => {
                this.mergeWithCurrentStyles({ display: "block" }, () => {
                  setTimeout(() => {
                    this.mergeWithCurrentStyles({ opacity: 1 });
                  }, 0);
                });
              }),
              (0, i.A)(this, "onIframeRef", (e) => {
                this.ref = e;
                const {
                    widgetPosition: t,
                    isAwesomeIframe: n,
                    dispatch: i,
                  } = this.props,
                  a = (0, A.vu)("widget_position");
                try {
                  if (e?.node) {
                    const {
                        left: o,
                        right: r,
                        bottom: s,
                      } = e.node.getBoundingClientRect(),
                      { innerWidth: l, innerHeight: d } = window.parent,
                      c = "left" === t ? o : l - r,
                      u = d - s;
                    (0 === c && 0 === u) ||
                      a ||
                      n ||
                      (i((0, k.sDL)({ initialX: c, initialY: u })),
                      (0, A.Ho)("widget_position", !0));
                  }
                } catch (e) {
                  (0, v.sQ)("Error onIframeRef", { message: e?.message });
                }
                n &&
                  this.mergeWithCurrentStyles({
                    ...g.K5[this.getIframeMode()],
                  });
              }),
              (0, i.A)(this, "getIframeMode", () => {
                const {
                  iframeView: e,
                  isWidgetLabelEnabled: t,
                  view: n,
                  dimensions: i,
                } = this.props;
                if (e.includes(g.Ny.dynamic) && i?.height) {
                  const e = 94;
                  return Number(i.height) === e && t && n !== w.l.fly
                    ? g.Ny.bubbleWithLabel
                    : g.Ny.dynamic;
                }
                return e === g.Ny.onlyBubble && this.props.isMobile
                  ? g.Ny.onlyBubbleLarge
                  : e;
              });
          }
          componentDidUpdate(e) {
            try {
              yu &&
                this.props.isAwesomeIframe &&
                e.isAwesomeIframe !== this.props.isAwesomeIframe &&
                this.ref?.node &&
                this.ref.node.contentWindow?.document
                  ?.querySelector("body")
                  ?.classList?.add("awesome-iframe");
            } catch {}
          }
          render() {
            const e =
                this.props.hideWhenOffline &&
                !this.props.isProjectOnline &&
                !this.props.isChatOnSite,
              t = (0, y.V8)();
            if (!this.props.isMounted || e) return null;
            const n = {
                dir: t ? "rtl" : "ltr",
                class: `${this.props.isMobile ? "mobile" : ""} ${
                  this.props.isChatOnSite ? "chat-on-site" : ""
                } ${t ? "lang-rtl" : ""} ${
                  (0, f.DD)() ? "chat-in-preview" : ""
                } ${(0, f.Q5)() ? "chat-in-preview--tour" : ""} ${
                  this.props.isAwesomeIframe ? "awesome-iframe" : ""
                }`.trim(),
              },
              i =
                '<meta name="viewport" content="width=device-width, user-scalable=no">',
              a = this.getIframeMode();
            return (0, $.FD)($.FK, {
              children: [
                (0, $.Y)(o.Ay, {
                  ref: this.onIframeRef,
                  title: "Tidio Chat",
                  head: (0, $.Y)("style", {
                    children:
                      "\n/* cyrillic-ext */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk0gotYKNnBcif.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk2wotYKNnBcif.woff2) format('woff2');\n  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk0AotYKNnBcif.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk0QotYKNnBcif.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk3wotYKNnBQ.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n/* cyrillic-ext */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk0gotYKNnBcif.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk2wotYKNnBcif.woff2) format('woff2');\n  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk0AotYKNnBcif.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk0QotYKNnBcif.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/mulish_SGhgqk3wotYKNnBQ.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n",
                  }),
                  style: {
                    ...this.state.style,
                    ...this.getIframeSize(),
                    ...this.getIframeAwesomeStyle(),
                  },
                  initialContent: `\n                  <html lang="en">\n                  <head>\n                  ${i}\n                    </head>\n                  <body ${Object.entries(
                    n
                  )
                    .map((e) => {
                      let [t, n] = e;
                      return `${t}="${n}"`;
                    })
                    .join(
                      " "
                    )}>\n                    <div></div>\n                  </body>\n                  `,
                  noSrcDocBodyProps: n,
                  noSrcDocHeadTags: i,
                  id: "tidio-chat-iframe",
                  contentDidMount: this.onIframeMount,
                  ...f.wh,
                  children: (0, $.Y)("div", {
                    className: `${
                      "left" === this.props.widgetPosition
                        ? "widget-position-left"
                        : "widget-position-right"
                    } ${
                      "left" === this.props.sidebarPosition
                        ? "sidebar-position-left"
                        : "sidebar-position-right"
                    } ${
                      this.props.isSidebarEnabled ? "sidebar-enabled" : ""
                    }\n                        ${a}`,
                    style: {
                      "--custom-background":
                        this.props.widgetColor[0] === this.props.widgetColor[1]
                          ? this.props.widgetColor[0]
                          : `linear-gradient(135deg, ${this.props.widgetColor[0]} 0%, ${this.props.widgetColor[1]} 100%)`,
                      "--custom-text-color": this.props.widgetColor[2],
                      "--custom-action-color":
                        this.props.widgetColor[4] || "#0566ff",
                      "--custom-action-color-contrast": m(
                        this.props.widgetColor[4] || "#0566ff"
                      )
                        ? "#fff"
                        : "#000",
                      "--custom-action-color-hover":
                        "color-mix(in srgb, var(--custom-action-color) 12%, transparent)",
                      "--chat-padding": this.props.isMobile ? "16px" : "24px",
                      "--label-shadow": "0 2px 20px 0 rgba(0, 18, 46, 0.18)",
                      "--fly-shadow": "0 8px 26px 0 rgba(0, 18, 46, 0.16)",
                    },
                    children: (0, $.Y)(Eu, {
                      setWidgetPosition: this.setWidgetPosition,
                      iframeView: this.props.iframeView,
                      iframeMode: a,
                      isSoundEnabled: this.props.isSoundEnabled,
                      isAwesomeIframe: this.props.isAwesomeIframe,
                      isNewSkin: !1,
                      isMobile: this.props.isMobile,
                    }),
                  }),
                }),
                (0, $.Y)(Jc, {}),
                (0, $.Y)(Wc, {}),
              ],
            });
          }
        }
        Su.defaultProps = { sidebarPosition: "right", dimensions: null };
        const Du = (0, r.Ng)((e) => ({
            isMounted: e.isMounted,
            iframeView: e.chatIframeStyles.iframeView,
            dimensions: (0, C.Rp)(e),
            isMobile: e.isMobile,
            widgetPosition: e.chatIframeStyles.widgetPosition,
            hideWhenOffline: e.hideWhenOffline,
            isProjectOnline: e.isProjectOnline,
            isSidebarEnabled: e.sidebarIframeStyles,
            isAwesomeIframe: (0, C.ix)(e),
            sidebarPosition: e.sidebarIframeStyles.position,
            isChatOnSite: (0, C.Tw)(e),
            isSoundEnabled: e.isSoundEnabled,
            isWidgetLabelEnabled: (0, C.zx)(e),
            view: (0, C.KZ)(e),
            widgetColor: (0, C.fO)(e),
          }))(Su),
          Yu = () => {
            const e = (0, r.d4)((e) => e.chatIframeStyles.widgetPosition),
              t = (0, r.d4)((e) =>
                e.sidebarIframeStyles ? e.sidebarIframeStyles.position : ""
              ),
              n = (0, r.d4)((e) => e.sidebarIframeStyles),
              i = (0, r.d4)(C.fO),
              o = (0, r.d4)(C.Ny),
              s = (0, r.d4)((e) => e.isSoundEnabled),
              l = (0, r.d4)((e) => e.chatIframeStyles.iframeView),
              d = (0, g.LY)(l),
              c = (0, r.d4)(C.Tw),
              [u] = (0, a.useState)(() =>
                window.parent.document.getElementById("tidio-chat")
              ),
              p = u?.shadowRoot,
              f = (0, y.V8)();
            return (
              (0, a.useEffect)(() => {
                const e = document.createElement("style");
                return (
                  (e.textContent =
                    "\n/* cyrillic-ext */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: italic;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCm3FwrK3iLTcvnUwkT9mI1F55MKw.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: italic;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCm3FwrK3iLTcvnUwAT9mI1F55MKw.woff2) format('woff2');\n  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: italic;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCm3FwrK3iLTcvnUwgT9mI1F55MKw.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: italic;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCm3FwrK3iLTcvnUwcT9mI1F55MKw.woff2) format('woff2');\n  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: italic;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCm3FwrK3iLTcvnUwsT9mI1F55MKw.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: italic;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCm3FwrK3iLTcvnUwoT9mI1F55MKw.woff2) format('woff2');\n  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: italic;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCm3FwrK3iLTcvnUwQT9mI1F54.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n/* cyrillic-ext */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: normal;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCo3FwrK3iLTcvvYwYZ8UA3J58.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: normal;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCo3FwrK3iLTcvmYwYZ8UA3J58.woff2) format('woff2');\n  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: normal;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCo3FwrK3iLTcvuYwYZ8UA3J58.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: normal;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCo3FwrK3iLTcvhYwYZ8UA3J58.woff2) format('woff2');\n  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: normal;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCo3FwrK3iLTcvtYwYZ8UA3J58.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: normal;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCo3FwrK3iLTcvsYwYZ8UA3J58.woff2) format('woff2');\n  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'TidioInter';\n  font-style: normal;\n  font-weight: 100 900;\n  font-display: swap;\n  src: url(https://code.tidio.co/widget-v4/fonts/inter_UcCo3FwrK3iLTcviYwYZ8UA3.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n"),
                  u?.appendChild(e),
                  () => {
                    u?.removeChild(e);
                  }
                );
              }, [u]),
              (0, a.useEffect)(() => {
                o && p?.getElementById("body")?.classList.add("mobile");
              }, [p, o]),
              (0, $.FD)($.FK, {
                children: [
                  (0, $.Y)("div", {
                    id: "tidio-chat-root",
                    className: `grid-layout ${
                      "left" === e
                        ? "widget-position-left"
                        : "widget-position-right"
                    } ${
                      "left" === t
                        ? "sidebar-position-left"
                        : "sidebar-position-right"
                    } ${n ? "sidebar-enabled" : ""} ${o ? "mobile" : ""} ${
                      c ? "chat-on-site" : ""
                    } ${f ? "lang-rtl" : ""}\n    `,
                    style: {
                      width: d.width,
                      "--custom-background": i[0],
                      "--custom-text-color": i[2],
                      "--custom-action-color": i[4] || "#0566ff",
                      "--custom-action-color-contrast": m(i[4] || "#0566ff")
                        ? "#fff"
                        : "#000",
                      "--custom-action-color-hover":
                        "color-mix(in srgb, var(--custom-action-color) 12%, transparent)",
                      "--custom-action-color-background":
                        "color-mix(in srgb, var(--custom-action-color) 10%, white)",
                      "--radius-surface": "12px",
                      "--radius-component": "12px",
                      "--radius-small-component": "8px",
                      "--chat-padding": o ? "16px" : "20px",
                      "--message-padding-block": "16px",
                      "--message-padding-inline": "16px",
                      "--message-font-size": "14px",
                      "--message-line-height": "20px",
                      "--starter-padding-block": "14px",
                      "--starter-chat-padding-block": "16px",
                      "--starters-gap": "8px",
                      "--bubble-size": "56px",
                      "--label-padding-block": "12px",
                      "--label-padding-inline": "16px",
                      "--label-shadow":
                        "0px 2px 8px 0px rgba(8, 15, 26, 0.08), 0px 2px 2px 0px rgba(8, 15, 26, 0.12)",
                      "--fly-shadow": "0px 12px 32px 0px rgba(8, 15, 26, 0.12)",
                      "--operator-message": "#f5f7f9",
                      "--border-color": "#D3DBE5",
                    },
                    children: (0, $.Y)(Cu, {
                      setWidgetPosition: () => {},
                      iframeView: "not-applicable",
                      iframeMode: "not-applicable",
                      isSoundEnabled: s,
                      isAwesomeIframe: !1,
                      iframeDocument: p,
                      iframeWindow: window.parent,
                      styleCacheContainer: p,
                      isMobile: o,
                      isNewSkin: !0,
                    }),
                  }),
                  (0, $.Y)(nu, { shadowRoot: p }),
                  (0, $.Y)(Xc, { shadowRoot: p }),
                ],
              })
            );
          };
        var Tu = () => {
          const { isNewSkin: e } = (0, p.A)();
          return e ? (0, $.Y)(Yu, {}) : (0, $.Y)(Du, {});
        };
      },
      6177: function (e, t, n) {
        "use strict";
        n.d(t, {
          AH: function () {
            return p;
          },
          i7: function () {
            return f;
          },
          mL: function () {
            return u;
          },
          n: function () {
            return c;
          },
        });
        var i,
          a,
          o = n(7888),
          r = n(3480),
          s = n(9853),
          l = n(8795),
          d = n(7932),
          c =
            (n(7366),
            n(3454),
            function (e, t) {
              var n = arguments;
              if (null == t || !o.h.call(t, "css"))
                return r.createElement.apply(void 0, n);
              var i = n.length,
                a = new Array(i);
              (a[0] = o.E), (a[1] = (0, o.c)(e, t));
              for (var s = 2; s < i; s++) a[s] = n[s];
              return r.createElement.apply(null, a);
            });
        (i = c || (c = {})), a || (a = i.JSX || (i.JSX = {}));
        var u = (0, o.w)(function (e, t) {
          var n = e.styles,
            i = (0, d.J)([n], void 0, r.useContext(o.T)),
            a = r.useRef();
          return (
            (0, l.i)(
              function () {
                var e = t.key + "-global",
                  n = new t.sheet.constructor({
                    key: e,
                    nonce: t.sheet.nonce,
                    container: t.sheet.container,
                    speedy: t.sheet.isSpeedy,
                  }),
                  o = !1,
                  r = document.querySelector(
                    'style[data-emotion="' + e + " " + i.name + '"]'
                  );
                return (
                  t.sheet.tags.length && (n.before = t.sheet.tags[0]),
                  null !== r &&
                    ((o = !0),
                    r.setAttribute("data-emotion", e),
                    n.hydrate([r])),
                  (a.current = [n, o]),
                  function () {
                    n.flush();
                  }
                );
              },
              [t]
            ),
            (0, l.i)(
              function () {
                var e = a.current,
                  n = e[0];
                if (e[1]) e[1] = !1;
                else {
                  if (
                    (void 0 !== i.next && (0, s.sk)(t, i.next, !0),
                    n.tags.length)
                  ) {
                    var o = n.tags[n.tags.length - 1].nextElementSibling;
                    (n.before = o), n.flush();
                  }
                  t.insert("", i, n, !1);
                }
              },
              [t, i.name]
            ),
            null
          );
        });
        function p() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return (0, d.J)(t);
        }
        function f() {
          var e = p.apply(void 0, arguments),
            t = "animation-" + e.name;
          return {
            name: t,
            styles: "@keyframes " + t + "{" + e.styles + "}",
            anim: 1,
            toString: function () {
              return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
            },
          };
        }
      },
      6970: function (e, t, n) {
        var i = n(9981),
          a = n(162),
          o = a;
        (o.v1 = i), (o.v4 = a), (e.exports = o);
      },
      7359: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var i = t[n];
                (i.enumerable = i.enumerable || !1),
                  (i.configurable = !0),
                  "value" in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i);
              }
            }
            return function (t, n, i) {
              return n && e(t.prototype, n), i && e(t, i), t;
            };
          })(),
          a = n(3480),
          o = (r(a), r(n(2200)));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var s = (function (e) {
          function t() {
            return (
              (function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
              (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
              )
            );
          }
          return (
            (function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function, not " +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, e),
            i(t, [
              {
                key: "componentDidMount",
                value: function () {
                  this.props.contentDidMount();
                },
              },
              {
                key: "componentDidUpdate",
                value: function () {
                  this.props.contentDidUpdate();
                },
              },
              {
                key: "render",
                value: function () {
                  return a.Children.only(this.props.children);
                },
              },
            ]),
            t
          );
        })(a.Component);
        (s.propTypes = {
          children: o.default.element.isRequired,
          contentDidMount: o.default.func.isRequired,
          contentDidUpdate: o.default.func.isRequired,
        }),
          (t.default = s);
      },
      7793: function (e) {
        "use strict";
        e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      },
      8107: function (e, t) {
        "use strict";
        (t.__esModule = !0),
          (t.default = function (e, t) {
            if (e && t) {
              var n = Array.isArray(t) ? t : t.split(",");
              if (0 === n.length) return !0;
              var i = e.name || "",
                a = (e.type || "").toLowerCase(),
                o = a.replace(/\/.*$/, "");
              return n.some(function (e) {
                var t = e.trim().toLowerCase();
                return "." === t.charAt(0)
                  ? i.toLowerCase().endsWith(t)
                  : t.endsWith("/*")
                  ? o === t.replace(/\/.*$/, "")
                  : a === t;
              });
            }
            return !0;
          });
      },
      8966: function (e, t) {
        var n;
        function i(e, t) {
          var n = [],
            i = 0;
          function a(e) {
            return n.push(e), t;
          }
          function o() {
            return n[i++];
          }
          return {
            tokenize: function (t) {
              return t.replace(e, a);
            },
            detokenize: function (e) {
              return e.replace(new RegExp("(" + t + ")", "g"), o);
            },
          };
        }
        (n = new (function () {
          var e = "`TMP`",
            t = "[^\\u0020-\\u007e]",
            n = "(?:[0-9]*\\.[0-9]+|[0-9]+)",
            a = "direction\\s*:\\s*",
            o = "['\"]?\\s*",
            r = "(^|[^a-zA-Z])",
            s = "\\/\\*\\!?\\s*@noflip\\s*\\*\\/",
            l =
              "(?:(?:(?:\\\\[0-9a-f]{1,6})(?:\\r\\n|\\s)?)|\\\\[^\\r\\n\\f0-9a-f])",
            d = "(?:[_a-z0-9-]|" + t + "|" + l + ")",
            c =
              n +
              "(?:\\s*(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)|" +
              ("-?" + ("(?:[_a-z]|" + t + "|" + l + ")") + d + "*") +
              ")?",
            u = "((?:-?" + c + ")|(?:inherit|auto))",
            p = "(#?" + d + "+|(?:rgba?|hsla?)\\([ \\d.,%-]+\\))",
            f = "(?:[!#$%&*-~]|" + t + "|" + l + ")*?",
            m = "(?![a-zA-Z])",
            h =
              "(?!(" +
              d +
              "|\\r?\\n|\\s|#|\\:|\\.|\\,|\\+|>|\\(|\\)|\\[|\\]|=|\\*=|~=|\\^=|'[^']*'])*?{)",
            g = "(?!" + f + o + "\\))",
            b = "(?=" + f + o + "\\))",
            v = "(\\s*(?:!important\\s*)?[;}])",
            x = new RegExp("`TMP`", "g"),
            y = new RegExp("\\/\\*[^*]*\\*+([^\\/*][^*]*\\*+)*\\/", "gi"),
            w = new RegExp("(" + s + h + "[^;}]+;?)", "gi"),
            k = new RegExp("(" + s + "[^\\}]*?})", "gi"),
            A = new RegExp("(" + a + ")ltr", "gi"),
            C = new RegExp("(" + a + ")rtl", "gi"),
            E = new RegExp(r + "(left)" + m + g + h, "gi"),
            S = new RegExp(r + "(right)" + m + g + h, "gi"),
            D = new RegExp(r + "(left)" + b, "gi"),
            Y = new RegExp(r + "(right)" + b, "gi"),
            T = new RegExp(r + "(ltr)" + b, "gi"),
            F = new RegExp(r + "(rtl)" + b, "gi"),
            _ = new RegExp(r + "([ns]?)e-resize", "gi"),
            I = new RegExp(r + "([ns]?)w-resize", "gi"),
            M = new RegExp(
              "((?:margin|padding|border-width)\\s*:\\s*)" +
                u +
                "(\\s+)" +
                u +
                "(\\s+)" +
                u +
                "(\\s+)" +
                u +
                v,
              "gi"
            ),
            N = new RegExp(
              "((?:-color|border-style)\\s*:\\s*)" +
                p +
                "(\\s+)" +
                p +
                "(\\s+)" +
                p +
                "(\\s+)" +
                p +
                v,
              "gi"
            ),
            R = new RegExp(
              "(background(?:-position)?\\s*:\\s*(?:[^:;}\\s]+\\s+)*?)(" +
                c +
                ")",
              "gi"
            ),
            O = new RegExp(
              "(background-position-x\\s*:\\s*)(-?" + n + "%)",
              "gi"
            ),
            j = new RegExp(
              "(border-radius\\s*:\\s*)" +
                u +
                "(?:(?:\\s+" +
                u +
                ")(?:\\s+" +
                u +
                ")?(?:\\s+" +
                u +
                ")?)?(?:(?:(?:\\s*\\/\\s*)" +
                u +
                ")(?:\\s+" +
                u +
                ")?(?:\\s+" +
                u +
                ")?(?:\\s+" +
                u +
                ")?)?" +
                v,
              "gi"
            ),
            L = new RegExp("(box-shadow\\s*:\\s*(?:inset\\s*)?)" + u, "gi"),
            z = new RegExp("(text-shadow\\s*:\\s*)" + u + "(\\s*)" + p, "gi"),
            U = new RegExp("(text-shadow\\s*:\\s*)" + p + "(\\s*)" + u, "gi"),
            P = new RegExp("(text-shadow\\s*:\\s*)" + u, "gi"),
            B = new RegExp(
              "(transform\\s*:[^;}]*)(translateX\\s*\\(\\s*)" + u + "(\\s*\\))",
              "gi"
            ),
            H = new RegExp(
              "(transform\\s*:[^;}]*)(translate\\s*\\(\\s*)" +
                u +
                "((?:\\s*,\\s*" +
                u +
                "){0,2}\\s*\\))",
              "gi"
            );
          function q(e, t, n) {
            var i, a;
            return (
              "%" === n.slice(-1) &&
                (-1 !== (i = n.indexOf("."))
                  ? ((a = n.length - i - 2),
                    (n = (n = 100 - parseFloat(n)).toFixed(a) + "%"))
                  : (n = 100 - parseFloat(n) + "%")),
              t + n
            );
          }
          function $(e) {
            switch (e.length) {
              case 4:
                e = [e[1], e[0], e[3], e[2]];
                break;
              case 3:
                e = [e[1], e[0], e[1], e[2]];
                break;
              case 2:
                e = [e[1], e[0]];
                break;
              case 1:
                e = [e[0]];
            }
            return e.join(" ");
          }
          function V(e, t) {
            var n = [].slice.call(arguments),
              i = n.slice(2, 6).filter(function (e) {
                return e;
              }),
              a = n.slice(6, 10).filter(function (e) {
                return e;
              }),
              o = n[10] || "";
            return t + (a.length ? $(i) + " / " + $(a) : $(i)) + o;
          }
          function W(e) {
            return 0 === parseFloat(e)
              ? e
              : "-" === e[0]
              ? e.slice(1)
              : "-" + e;
          }
          function K(e, t, n) {
            return t + W(n);
          }
          function G(e, t, n, i, a) {
            return t + n + W(i) + a;
          }
          function X(e, t, n, i, a) {
            return t + n + i + W(a);
          }
          return {
            transform: function (t, n) {
              var a = new i(w, "`NOFLIP_SINGLE`"),
                o = new i(k, "`NOFLIP_CLASS`"),
                r = new i(y, "`COMMENT`");
              return (
                (t = r.tokenize(o.tokenize(a.tokenize(t.replace("`", "%60"))))),
                n.transformDirInUrl &&
                  (t = t
                    .replace(T, "$1" + e)
                    .replace(F, "$1ltr")
                    .replace(x, "rtl")),
                n.transformEdgeInUrl &&
                  (t = t
                    .replace(D, "$1" + e)
                    .replace(Y, "$1left")
                    .replace(x, "right")),
                (t = t
                  .replace(A, "$1" + e)
                  .replace(C, "$1ltr")
                  .replace(x, "rtl")
                  .replace(E, "$1" + e)
                  .replace(S, "$1left")
                  .replace(x, "right")
                  .replace(_, "$1$2" + e)
                  .replace(I, "$1$2e-resize")
                  .replace(x, "w-resize")
                  .replace(j, V)
                  .replace(L, K)
                  .replace(z, X)
                  .replace(U, X)
                  .replace(P, K)
                  .replace(B, G)
                  .replace(H, G)
                  .replace(M, "$1$2$3$8$5$6$7$4$9")
                  .replace(N, "$1$2$3$8$5$6$7$4$9")
                  .replace(R, q)
                  .replace(O, q)),
                (t = a.detokenize(o.detokenize(r.detokenize(t))))
              );
            },
          };
        })()),
          e.exports
            ? (t.transform = function (e, t, i) {
                var a;
                return (
                  "object" == typeof t
                    ? (a = t)
                    : ((a = {}),
                      "boolean" == typeof t && (a.transformDirInUrl = t),
                      "boolean" == typeof i && (a.transformEdgeInUrl = i)),
                  n.transform(e, a)
                );
              })
            : "undefined" != typeof window && (window.cssjanus = n);
      },
      9981: function (e, t, n) {
        var i,
          a,
          o = n(5002),
          r = n(5811),
          s = 0,
          l = 0;
        e.exports = function (e, t, n) {
          var d = (t && n) || 0,
            c = t || [],
            u = (e = e || {}).node || i,
            p = void 0 !== e.clockseq ? e.clockseq : a;
          if (null == u || null == p) {
            var f = o();
            null == u && (u = i = [1 | f[0], f[1], f[2], f[3], f[4], f[5]]),
              null == p && (p = a = 16383 & ((f[6] << 8) | f[7]));
          }
          var m = void 0 !== e.msecs ? e.msecs : new Date().getTime(),
            h = void 0 !== e.nsecs ? e.nsecs : l + 1,
            g = m - s + (h - l) / 1e4;
          if (
            (g < 0 && void 0 === e.clockseq && (p = (p + 1) & 16383),
            (g < 0 || m > s) && void 0 === e.nsecs && (h = 0),
            h >= 1e4)
          )
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          (s = m), (l = h), (a = p);
          var b = (1e4 * (268435455 & (m += 122192928e5)) + h) % 4294967296;
          (c[d++] = (b >>> 24) & 255),
            (c[d++] = (b >>> 16) & 255),
            (c[d++] = (b >>> 8) & 255),
            (c[d++] = 255 & b);
          var v = ((m / 4294967296) * 1e4) & 268435455;
          (c[d++] = (v >>> 8) & 255),
            (c[d++] = 255 & v),
            (c[d++] = ((v >>> 24) & 15) | 16),
            (c[d++] = (v >>> 16) & 255),
            (c[d++] = (p >>> 8) | 128),
            (c[d++] = 255 & p);
          for (var x = 0; x < 6; ++x) c[d + x] = u[x];
          return t || r(c);
        };
      },
    },
  ]);
//# sourceMappingURL=chunk-WidgetIframe-11b44f2d992e00206044.js.map
