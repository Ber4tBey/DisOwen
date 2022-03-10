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
    Owen.editmsg(message,Lang.RESTART_MSG);
    console.log(baseURI);
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
         Owen.editmsg(message,error.message);
    });
};
module.exports.config = {
  command: "restart",
  description: `${Lang.RESTART_DESC}`
}