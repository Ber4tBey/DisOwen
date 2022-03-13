/* Copyright (C) 2022 Ber4tbey.
Licensed under the  MIT License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/


const Discord = require('discord.js-owen');
const Owen = require('../../bot.js');
const Language = require('../../language');
const Lang = Language.getString('spammer');
exports.run = async(client, message, args) => {
      let sayi = args[0];
      let mesaj = args.slice(1).join(' ');
   
if (mesaj.length < 1) return Owen.editmsg(message,Lang.NEED_WRD);
   await message.delete();
for (var i = 0; i < sayi; i++)
{
   await message.channel.send(mesaj);
}

};





module.exports.config = {
    command: "spam",
    description: `${Lang.SPAMMER_DESC}`
}