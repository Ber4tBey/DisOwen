/* Copyright (C) 2022 Ber4tbey.
Licensed under the  MIT License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/
const Discord = require("discord.js-owen");

const Language = require('../../language');
const Lang = Language.getString('system_stats');
module.exports.run = async(client, message) => {
     
	var start = new Date().getTime();
    message.edit('```Ping!```');
    var end = new Date().getTime();
	message.edit('*Pong!*\n```' + (end - start) + 'ms```')
  
    
};

module.exports.config = {
  command: "ping",
  description: `${Lang.PING_DESC}`
}