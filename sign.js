function o(e) {
    for (var t, n = "0123456789abcdef", o = "", r = 0; r < e.length; r += 1)
        t = e.charCodeAt(r),
            o += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
    return o
}

function r(e) {
    return c(a(s(e = n(e)), 8 * e.length))
}

function c(e) {
    for (var t = "", n = 32 * e.length, o = 0; o < n; o += 8)
        t += String.fromCharCode(e[o >> 5] >>> o % 32 & 255);
    return t
}

function a(e, t) {
    var n, o, r, i;
    e[t >> 5] |= 128 << t % 32,
        e[14 + (t + 64 >>> 9 << 4)] = t;
    for (var a = 1732584193, l = -271733879, c = -1732584194, s = 271733878, d = 0; d < e.length; d += 16)
        a = m(n = a, o = l, r = c, i = s, e[d], 7, -680876936),
            s = m(s, a, l, c, e[d + 1], 12, -389564586),
            c = m(c, s, a, l, e[d + 2], 17, 606105819),
            l = m(l, c, s, a, e[d + 3], 22, -1044525330),
            a = m(a, l, c, s, e[d + 4], 7, -176418897),
            s = m(s, a, l, c, e[d + 5], 12, 1200080426),
            c = m(c, s, a, l, e[d + 6], 17, -1473231341),
            l = m(l, c, s, a, e[d + 7], 22, -45705983),
            a = m(a, l, c, s, e[d + 8], 7, 1770035416),
            s = m(s, a, l, c, e[d + 9], 12, -1958414417),
            c = m(c, s, a, l, e[d + 10], 17, -42063),
            l = m(l, c, s, a, e[d + 11], 22, -1990404162),
            a = m(a, l, c, s, e[d + 12], 7, 1804603682),
            s = m(s, a, l, c, e[d + 13], 12, -40341101),
            c = m(c, s, a, l, e[d + 14], 17, -1502002290),
            a = f(a, l = m(l, c, s, a, e[d + 15], 22, 1236535329), c, s, e[d + 1], 5, -165796510),
            s = f(s, a, l, c, e[d + 6], 9, -1069501632),
            c = f(c, s, a, l, e[d + 11], 14, 643717713),
            l = f(l, c, s, a, e[d], 20, -373897302),
            a = f(a, l, c, s, e[d + 5], 5, -701558691),
            s = f(s, a, l, c, e[d + 10], 9, 38016083),
            c = f(c, s, a, l, e[d + 15], 14, -660478335),
            l = f(l, c, s, a, e[d + 4], 20, -405537848),
            a = f(a, l, c, s, e[d + 9], 5, 568446438),
            s = f(s, a, l, c, e[d + 14], 9, -1019803690),
            c = f(c, s, a, l, e[d + 3], 14, -187363961),
            l = f(l, c, s, a, e[d + 8], 20, 1163531501),
            a = f(a, l, c, s, e[d + 13], 5, -1444681467),
            s = f(s, a, l, c, e[d + 2], 9, -51403784),
            c = f(c, s, a, l, e[d + 7], 14, 1735328473),
            a = g(a, l = f(l, c, s, a, e[d + 12], 20, -1926607734), c, s, e[d + 5], 4, -378558),
            s = g(s, a, l, c, e[d + 8], 11, -2022574463),
            c = g(c, s, a, l, e[d + 11], 16, 1839030562),
            l = g(l, c, s, a, e[d + 14], 23, -35309556),
            a = g(a, l, c, s, e[d + 1], 4, -1530992060),
            s = g(s, a, l, c, e[d + 4], 11, 1272893353),
            c = g(c, s, a, l, e[d + 7], 16, -155497632),
            l = g(l, c, s, a, e[d + 10], 23, -1094730640),
            a = g(a, l, c, s, e[d + 13], 4, 681279174),
            s = g(s, a, l, c, e[d], 11, -358537222),
            c = g(c, s, a, l, e[d + 3], 16, -722521979),
            l = g(l, c, s, a, e[d + 6], 23, 76029189),
            a = g(a, l, c, s, e[d + 9], 4, -640364487),
            s = g(s, a, l, c, e[d + 12], 11, -421815835),
            c = g(c, s, a, l, e[d + 15], 16, 530742520),
            a = p(a, l = g(l, c, s, a, e[d + 2], 23, -995338651), c, s, e[d], 6, -198630844),
            s = p(s, a, l, c, e[d + 7], 10, 1126891415),
            c = p(c, s, a, l, e[d + 14], 15, -1416354905),
            l = p(l, c, s, a, e[d + 5], 21, -57434055),
            a = p(a, l, c, s, e[d + 12], 6, 1700485571),
            s = p(s, a, l, c, e[d + 3], 10, -1894986606),
            c = p(c, s, a, l, e[d + 10], 15, -1051523),
            l = p(l, c, s, a, e[d + 1], 21, -2054922799),
            a = p(a, l, c, s, e[d + 8], 6, 1873313359),
            s = p(s, a, l, c, e[d + 15], 10, -30611744),
            c = p(c, s, a, l, e[d + 6], 15, -1560198380),
            l = p(l, c, s, a, e[d + 13], 21, 1309151649),
            a = p(a, l, c, s, e[d + 4], 6, -145523070),
            s = p(s, a, l, c, e[d + 11], 10, -1120210379),
            c = p(c, s, a, l, e[d + 2], 15, 718787259),
            l = p(l, c, s, a, e[d + 9], 21, -343485551),
            a = u(a, n),
            l = u(l, o),
            c = u(c, r),
            s = u(s, i);
    return [a, l, c, s]
}

function s(e) {
    var t = [];
    for (t[(e.length >> 2) - 1] = void 0,
             o = 0; o < t.length; o += 1)
        t[o] = 0;
    for (var n = 8 * e.length, o = 0; o < n; o += 8)
        t[o >> 5] |= (255 & e.charCodeAt(o / 8)) << o % 32;
    return t
}

function n(e) {
    return unescape(encodeURIComponent(e))
}

function u(e, t) {
    var n = (65535 & e) + (65535 & t);
    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
}

function l(e, t, n, o, r, i) {
    return u((i = u(u(t, e), u(o, i))) << r | i >>> 32 - r, n)
}

function m(e, t, n, o, r, i, a) {
    return l(t & n | ~t & o, e, t, r, i, a)
}

function f(e, t, n, o, r, i, a) {
    return l(t & o | n & ~o, e, t, r, i, a)
}

function g(e, t, n, o, r, i, a) {
    return l(t ^ n ^ o, e, t, r, i, a)
}

function p(e, t, n, o, r, i, a) {
    return l(n ^ (t | ~o), e, t, r, i, a)
}

function get_sign(e, t, n) {
    return t ? n ? i(t, e) : o(i(t, e)) : n ? r(e) : o(r(e))
}