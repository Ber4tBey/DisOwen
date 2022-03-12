/* Copyright (C) 2022 Ber4tbey.
Licensed under the  MIT License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/


const Discord = require('discord.js');
const Language = require("../../language")
const Lang = Language.getString('afk');
const Owen = require("../../bot")
const config = require('../../config')
const db = require('quick.db')
module.exports.run = async (bot, msg, args) => {
    if(msg.author.id !== bot.user.id) return;  
    
        await db.set('isAfk','true')
const sebep = args[0];
        

        if (args[0]){
          let sebep = args.join(" ");
          await db.set('reason',sebep)
            Owen.editmsg(msg,Lang.IM_AFK + '\n'+ Lang.REASON + ' ' + sebep)
        
        }else {
            
            Owen.editmsg(msg,Lang.IM_AFK)
        }

    
            
            await bot.user.setActivity(Lang.AFK_STAT, {type: 'PLAYING'}); 
    }
    
module.exports.config = {
    command: "afk",
    description: `${Lang.AFK_DESC}`
}
