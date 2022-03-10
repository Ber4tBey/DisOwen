/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/


const Owen = require('../../bot');
const Language = require('../../language');
const Lang = Language.getString('weather');

module.exports.run = async (bot, message, args) => {
    let konum = args[0];
    if (!args[0]) {
        Owen.editmsg(message,Lang.NEED_LOCATION)
        return
    }
    
    message.delete();
    
    message.channel.send("", {
        files: [
            `http://wttr.in/${konum}_0tqp_lang=tr.png`
        
        ],
          
    })
    message.channel.send(`**DisOwen Tarafından ${konum} Hava durumu verileri bulundu.**`)
        
        
          
}
    

module.exports.config = {
    command: "weather",
    usage: "istanbul",
    description: `${Lang.WEATHER_DESC}`
}
