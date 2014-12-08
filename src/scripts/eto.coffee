# Description
#   A Hubot script that displays Eto
#
# Configuration:
#   None
#
# Commands:
#   hubot eto [<year>] - displays Eto
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  moment = require 'moment'

  gcd = (m, n) -> if n is 0 then m else gcd(n, m % n)
  lcm = (m, n) -> m * n / gcd(m, n)

  kan = [
    [ '甲', 'きのえ'   ]
    [ '乙', 'きのと'   ]
    [ '丙', 'ひのえ'   ]
    [ '丁', 'ひのと'   ]
    [ '戊', 'つちのえ' ]
    [ '己', 'つちのと' ]
    [ '庚', 'かのえ'   ]
    [ '辛', 'かのと'   ]
    [ '壬', 'みずのえ' ]
    [ '癸', 'みずのと' ]
  ]
  si = [
    [ '子', 'ね'     ]
    [ '丑', 'うし'   ]
    [ '寅', 'とら'   ]
    [ '卯', 'う'     ]
    [ '辰', 'たつ'   ]
    [ '巳', 'み'     ]
    [ '午', 'うま'   ]
    [ '未', 'ひつじ' ]
    [ '申', 'さる'   ]
    [ '酉', 'とり'   ]
    [ '戌', 'いぬ'   ]
    [ '亥', 'い'     ]
  ]

  k = kan.length
  s = si.length
  length = lcm(k, s)
  eto = [0...length].map (i) ->
    [kanjik, yomik] = kan[i % k]
    [kanjis, yomis] = si[i % s]
    [kanjik + kanjis, yomik + yomis]

  robot.respond /eto(?: (\d+))?$/i, (res) ->
    year = res.match[1] ? moment().year()
    [kanji, yomi] = eto[year % length - 4]
    res.send "#{kanji} (#{yomi})"
