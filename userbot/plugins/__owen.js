/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/

const Language = require('../../language');
const Lang = Language.getString('_owen');

module.exports.run = async (bot, message, args) => {
    const data = [];
    const { commands, config } = bot;
    const configg = require("../../config")
    const Owen = require("../../bot")
    
    if (!args.length) {
        data.push(Lang.COMMAND);
        data.push(commands.map(command => `**${command.config.command}**`).join('\n'));
        data.push(`\n${Lang.COMINFO}`);
        
        return Owen.editmsg(message,data.toString())
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
        return Owen.editmsg(message,Lang.NOFOUND);
    }

    data.push(Lang.COMMAND1 + ` ${command.config.command}` );

    //if (command.alternative) data.push(LANG.ALTERNATE `${command.aliases.join(', ')}`);
    if (command.config.description) data.push(Lang.ALTERNATE + ` ${command.config.description}`);
    if (command.config.usage) data.push(Lang.USE + ` ${configg.PREFIX}${command.config.command} ${command.config.usage}`);

    
    message.delete();
    message.channel.send(data.toString());
    }
    

module.exports.config = {
    command: "owen",
    alias: "help",
    description: `${Lang.DESC}`
}
