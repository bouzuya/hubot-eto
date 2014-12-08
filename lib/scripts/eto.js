// Description
//   A Hubot script that displays Eto
//
// Configuration:
//   None
//
// Commands:
//   hubot eto [<year>] - displays Eto
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var eto, gcd, k, kan, lcm, length, moment, s, si, _i, _results;
  moment = require('moment');
  gcd = function(m, n) {
    if (n === 0) {
      return m;
    } else {
      return gcd(n, m % n);
    }
  };
  lcm = function(m, n) {
    return m * n / gcd(m, n);
  };
  kan = [['甲', 'きのえ'], ['乙', 'きのと'], ['丙', 'ひのえ'], ['丁', 'ひのと'], ['戊', 'つちのえ'], ['己', 'つちのと'], ['庚', 'かのえ'], ['辛', 'かのと'], ['壬', 'みずのえ'], ['癸', 'みずのと']];
  si = [['子', 'ね'], ['丑', 'うし'], ['寅', 'とら'], ['卯', 'う'], ['辰', 'たつ'], ['巳', 'み'], ['午', 'うま'], ['未', 'ひつじ'], ['申', 'さる'], ['酉', 'とり'], ['戌', 'いぬ'], ['亥', 'い']];
  k = kan.length;
  s = si.length;
  length = lcm(k, s);
  eto = (function() {
    _results = [];
    for (var _i = 0; 0 <= length ? _i < length : _i > length; 0 <= length ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).map(function(i) {
    var kanjik, kanjis, yomik, yomis, _ref, _ref1;
    _ref = kan[i % k], kanjik = _ref[0], yomik = _ref[1];
    _ref1 = si[i % s], kanjis = _ref1[0], yomis = _ref1[1];
    return [kanjik + kanjis, yomik + yomis];
  });
  return robot.respond(/eto(?: (\d+))?$/i, function(res) {
    var kanji, year, yomi, _ref, _ref1;
    year = (_ref = res.match[1]) != null ? _ref : moment().year();
    _ref1 = eto[year % length - 4], kanji = _ref1[0], yomi = _ref1[1];
    return res.send("" + kanji + " (" + yomi + ")");
  });
};
