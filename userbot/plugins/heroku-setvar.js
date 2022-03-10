/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/


const Owen = require('../../bot');
const Config = require('../../config');
const Heroku = require('heroku-client');
const Language = require('../../language');
const Lang = Language.getString('heroku');
const heroku = new Heroku({
    token: Config.API_KEY
});
let baseURI = '/apps/' + Config.APP_NAME;



exports.run = async(client, message, args) => {
    let varKey = args[0];
    let varValue = args.slice(1).join(' ');
    
    if (varValue === '') return  Owen.editmsg(message,Lang.KEY_VAL_MISSING);
    
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            Owen.editmsg(message,"**Başarıyla ayarlandı:** " + varKey + " : " + varValue);
        });
    

};





module.exports.config = {
  command: "setvar",
  description: `${Lang.SETVAR_DESC}`
}