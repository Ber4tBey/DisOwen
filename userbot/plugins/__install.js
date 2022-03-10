/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/
const fs = require('fs');
const Db = require('./sql/plugin');

const Language = require('../../language');
const Lang = Language.getString('_plugin');

const got = (...args) => import('got').then(({default: got}) => got(...args));





module.exports.run = async (bot, message, args,match) => {
    const v = require("../../bot.js")
    let mesaj = args[0];
    let plugin_name =  args.slice(1).join(' ');
    if (mesaj === '') return v.editmsg(message, '```' + Lang.NEED_URL + '.install https://gist.github.com/Berathanyedibela/d21eaecc799b99cbd8cc5afdf209f2dc DisOwen-Ber4tbey```')
    if (mesaj,plugin_name === '') return v.editmsg(message, '```' + Lang.NEED_URL + '.install https://gist.github.com/Berathanyedibela/d21eaecc799b99cbd8cc5afdf209f2dc DisOwen-Ber4tbey```')
    try {
        var url = new URL(mesaj);
    } catch {
        return v.editmsg(message,Lang.INVALID_URL);
    }
    if (url.host === 'gist.github.com') {
        url.host = 'gist.githubusercontent.com';
        url = url.toString() + '/raw'
    } else {
        url = url.toString()
    }
    var response = await got(url);
    if (response.statusCode == 200) {
        fs.writeFileSync('./userbot/plugins/' + plugin_name + '.js', response.body);
        try {
            require('./' + plugin_name);
        } catch (e) {
            fs.unlinkSync('./userbot/plugins/' + plugin_name + '.js');
            return v.editmsg(message,Lang.INVALID_PLUGIN + ' ```' + e + '```');
        }

        await Db.installPlugin(url, plugin_name);
        v.editmsg(message, Lang.INSTALLED);
    }
     
    }

module.exports.config = {
    command: "install",
    description: `${Lang.INSTALL_DESC}`
}
