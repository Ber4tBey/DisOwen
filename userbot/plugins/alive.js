/* Copyright (C) 2022 Ber4tbey.
Licensed under the  MIT License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/


const Owen = require("../../bot.js")
const Discord = require('discord.js-owen');
const config = require("../../config")
const Language = require('../../language');
const Lang = Language.getString('system_stats');
module.exports.run = async (bot, message, args) => {
    
    ALIVE_STR = Owen.randomstring([
        "`Your Userbot is working and wants to say something to you.. I love you`❤️  ",
        "🎆 `Don't worry! My Lord I won't leave you alone.` `ProUserbot is working.`",
        "`⛈️ I'm ready to do my best` ",
        "✨ `ProUserbot is ready for owner's orders...`  ",
        "`You should be reading the message edited by the most advanced userbot right now`  ",
        "`You Called Me ❓ I'm Here Don't Worry`  "
    ])
    await Owen.editmsg(message,ALIVE_STR)

     
    }

module.exports.config = {
    command: "alive",
    description: `${Lang.ALIVE_DESC}`
}
