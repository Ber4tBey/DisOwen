/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/


const Owen = require("../../bot.js")
const Discord = require('discord.js');
const config = require("../../config")
const Language = require('../../language');
const Lang = Language.getString('system_stats');
module.exports.run = async (bot, message, args) => {
    
    ALIVE_STR = Owen.randomstring([
        "`Userbotunuz çalışıyor ve sana bişey demek istiyor.. Seni seviyorum`❤️  ",
        "🎆 `Endişelenme! Seni yanlız bırakmam.` `OwenUserbot çalışıyor.`",
        "`⛈️ Elimden gelenin en iyisini yapmaya hazırım` ",
        "✨ `OwenUserBot sahibinin emirlerine hazır...`  ",
        "`Şuan en gelişmiş userbotun düzenlediği mesajı okuyor olmalısın`  ",
        "`Benimi Aramıştın ❓ Ben Buradayım Merak Etme`  "
    ])
    await Owen.editmsg(message,ALIVE_STR)

     
    }

module.exports.config = {
    command: "alive",
    description: `${Lang.ALIVE_DESC}`
}
