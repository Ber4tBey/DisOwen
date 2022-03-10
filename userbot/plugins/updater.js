/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/


const Owen = require("../../bot")
const simpleGit = require('simple-git');
const git = simpleGit()
const fs = require("fs")
const Discord = require("discord.js")
const Language = require('../../language');
const Lang = Language.getString('updater');
const Heroku = require('heroku-client');
const Config = require('../../config');
const exec = require('child_process').exec;
const { PassThrough } = require('stream');


const heroku = new Heroku({ token: Config.API_KEY })
module.exports.run = async (bot, message, args) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        return Owen.editmsg(message,
            
            Lang.UPDATE
        );        
    } else {
        var degisiklikler = Lang.NEW_UPDATE;
        commits['all'].map(
            (commit) => {
                degisiklikler += '🔹 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
            }
        );
        let a  = degisiklikler.length > 4000
        if (a){
            Owen.editmsg(message,
                 Lang.MESSAGE_T_LONG);
                 fs.writeFile('değişiklikler.txt', degisiklikler, function (err) {
                    if (err) throw err;
                  });
            await message.channel.send({
                files: ["değişiklikler.txt"]}
            )
            
                   
                
                    
        } else {
        Owen.editmsg(message,
            degisiklikler + '```'
        
        ); 
    }}

};




module.exports.config = {
    command: "update",
    description: `${Lang.UPDATER_DESC}`
}
