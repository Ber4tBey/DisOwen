/* Copyright (C) 2022 Ber4tbey.
Licensed under the  MIT License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/
const fs = require('fs');
const Db = require('./sql/plugin');

const Language = require('../../language');
const Lang = Language.getString('_plugin');


const Owen = require("../../bot")

module.exports.run = async (bot, message, args,match) => {
    
    var mesaj = Lang.INSTALLED_FROM_REMOTE;
    var plugins = await Db.PluginDB.findAll();
    if (plugins.length < 1) {
        return Owen.editmsg(message,Lang.NO_PLUGIN);
    } else {
        plugins.map(
            (plugin) => {
                mesaj += '**' + plugin.dataValues.name + '**: ' + plugin.dataValues.url + '\n';
            }
        );
        return Owen.editmsg(message, mesaj);
    }


}
module.exports.config = {
    command: "plugins",
    description: `${Lang.PLUGIN_DESC}`
}
