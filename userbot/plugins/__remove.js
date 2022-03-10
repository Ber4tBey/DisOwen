/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/
const fs = require('fs');
const Db = require('./sql/plugin');

const Language = require('../../language');
const Lang = Language.getString('_plugin');


const Owen = require("../../bot")

module.exports.run = async (bot, message, args,match) => {
    let mesaj = args.join(' ');
    if (mesaj === '') return  Owen.editmsg(message,Lang.NEED_PLUGIN);
    var plugin = await Db.PluginDB.findAll({ where: {name: mesaj} });
    if (plugin.length < 1) {
        return Owen.editmsg(message, Lang.NOT_FOUND_PLUGIN);
    } else {
        await plugin[0].destroy();
        delete require.cache[require.resolve('./' + mesaj + '.js')]
        fs.unlinkSync('./userbot/plugins/' + mesaj + '.js');
        return Owen.editmsg(message, Lang.DELETED);
    }
};
        

module.exports.config = {
    command: "remove",
    description: `${Lang.REMOVE_DESC}`
}
