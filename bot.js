/* Copyright (C) 2022 Ber4tbey.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/

var d = function d() { return new Date(); }
const config = require('./config');
const chalk = require('chalk');
const Discord = require("discord.js");

const superagent = require("superagent");
const { DataTypes } = require('sequelize');
const {GreetingsDB} = require("/root/DisOwen/userbot/plugins/sql/greetings");
const os = require("os");
var exec = require('child_process').exec, child;
var fs = require("fs");
const got = (...args) => import('got').then(({default: got}) => got(...args));

var bot = new Discord.Client();
const { APIMessage, Structures } = require("discord.js");
bot.commands = new Discord.Collection();
bot.alias = new Discord.Collection();
bot.alias2 = new Discord.Collection();

var AFK = {
    isAfk: false,
    reason: false,
    lastseen: 0
};



    
    
const DisOwenDb = config.DATABASE.define('DisOwen', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
fs.readdirSync('/root/DisOwen/userbot/plugins/sql/').forEach(plugin => {
    if((plugin).toLowerCase() == '.js') {
        require('/root/DisOwen/userbot/plugins/sql/' + plugin);
    }
});

const plugindb = require('/root/DisOwen/userbot/plugins/sql/plugin');

  
require("./language")
console.log(`⬇️ Giriş Yapılıyor...`)
const PREFIX = config.PREFIX;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var randomstring = arr => arr[Math.floor(Math.random() * arr.length)];
var randomhex = function randomhex() { return Math.floor(Math.random() * 16777214) + 1 }
var round = function round(value, decimals) { return Number(Math.round(value+'e'+decimals)+'e-'+decimals); }
var editmsg = function error(message, sendmsg) { message.edit(sendmsg);}
var usermissperm = function usermissperm() { return randomstring(["Bunu yapabilmem için yeterli yetkim yok."]) + " (Yetki-Yetersiz)" }
var dmerror = function dmerror() { return randomstring("Bu komut özel mesajda kullanabilmen için tasarlanmadı")}
var sleep = function sleep(ms) {return new Promise((resolve) => {setTimeout(resolve, ms);});}

const LOGINFO = "[INFO] ";
const LOGWARN = "[WARN] ";
const successemoji = "✅"



function DisOwen() {
    
    config.DATABASE.sync();
    try {
    
      bot.login(config.TOKEN)
      console.log(chalk.green.bold('✅ Login successful!'))
    } catch(err) {
        console.log(LOGWARN + "Giriş Başarısız OwenDestek grubundan yardım alabilirsiniz. " + err)
    }
   
}


bot.on("ready", async function() {
    console.log(
        chalk.blueBright.italic('⬇️ Installing external plugins...')
    );
    
    var plugins = await plugindb.PluginDB.findAll();
    plugins.map(async (plugin) => {
        if (!fs.existsSync('/root/DisOwen/userbot/plugins/' + plugin.dataValues.name + '.js')) {
            console.log(plugin.dataValues.name);
            
            var response = await got(plugin.dataValues.url);
            if (response.statusCode == 200) {
                
                fs.writeFileSync('/root/DisOwen/userbot/plugins/' + plugin.dataValues.name + '.js', response.body);
                require('/root/DisOwen/userbot/plugins/' + plugin.dataValues.name + '.js');
            }     
        }
    });

    await sleep(5000);
    console.log(
        chalk.blueBright.italic('⬇️  Installing plugins...')
    );
    
    fs.readdir('/root/DisOwen/userbot/plugins/', (plugin, files) => {
            
            var jsfiles = files.filter(f => f.split('.').pop() === 'js');
            if (jsfiles.length <= 0) { return console.log("Komut bulunamadı..."); }

            jsfiles.forEach((f, i) => {
                
                var cmds = require(`/root/DisOwen/userbot/plugins/${f}`);
                bot.commands.set(cmds.config.command, cmds);
                bot.alias.set(cmds.config.alias, cmds);
                bot.alias2.set(cmds.config.alias2, cmds);
            });

        });
    
    console.log(
        chalk.green.bold('✅ Plugins installed!')
    );  
console.log("+===========================================================+")
console.log("|                     ✨Owen Userbot✨                       |")
console.log("+==============+==============+==============+==============+")
console.log("|                                                            |")
console.log("Botunuz çalışıyor! Herhangi bir sohbete .alive yazarak Test edin.")
console.log("Yardıma İhtiyacınız varsa, Destek grubumuza gelin t.me/OwenSupport")
console.log("Bot versiyonunuz: Owen ==>" +  config.VERSION)
})


    
        
    
    




const Language = require('./language');
const Lang = Language.getString('afk');
//afk giriş
bot.on("message", async function(msg,match) {
    

if(msg.author.id !== bot.user.id) return;  
    if(msg.content.includes(config.PREFIX +"afk")){
        if (!AFK.isAfk) {
            AFK.lastseen = Math.round((new Date()).getTime() / 1000);
            AFK.isAfk = true;
            if (match !== '') { AFK.reason = match }
            editmsg(msg,Lang.IM_AFK)
            bot.user.setActivity(Lang.AFK_STAT, {type: 'PLAYING'}); 


    }}})
const map = new Map()

//Afk olduğumuzu bildirme (DM İÇİN)
bot.on("message", async function(msg) {
if (AFK.isAfk) {
    if (msg.channel.type === "dm") {
        if (msg.author.id === bot.user.id) {
        } else {
          if (msg.author.bot) {
          } else {
            
                msg.channel.send(config.AFK_MESSAGE)

    


}}}}})
//Afk olduğumuzu bildirme (ETİKET İÇİN)
bot.on("message", async function(msg,match) {
if (msg.channel.type === "dm") return;
if(msg.content.includes(msg.content.match(/^<@!?${bot.user.id}>( |)$/))) return;  
    if (AFK.isAfk) {
    if(msg.isMemberMentioned(bot.user)){
   

        msg.channel.send(config.AFK_MESSAGE)
        
    }}})
//

//Afk dan çıkarma 
bot.on("message", async function(msg) {
if(msg.content.includes(msg.content.match(/^<@!?${bot.user.id}>( |)$/))) return;
if(msg.content.startsWith(config.AFK_MESSAGE)) return;
if(msg.content.includes(config.PREFIX +"afk")) return;
if(msg.author.id !== bot.user.id) return;
    if (AFK.isAfk) {
        AFK.lastseen = 0;
        AFK.reason = false;
        AFK.isAfk = false;
        
            msg.channel.send(Lang.IM_NOT_AFK)
            bot.user.setActivity(''); 
        
    
    
    }})
// --events  
bot.on("message", async function(message) {
try {
    if (message.author.id !== bot.user.id) {
        if (!message.author.bot) {
            if (message.channel.type !== "dm") {
                if (message.guild.id === "468111026357796884" || "762645606715097088") {
                    if (message.mentions.members.size > 0) {
                       
                        }}}}}

    if(message.author !== bot.user) return;
    if (!message.content.startsWith(PREFIX)) return;
    var cont = message.content.slice(PREFIX.length).split(" ");
    var args = cont.slice(1);
    
    var cmd = bot.commands.get(cont[0].toLowerCase())
    var alias = bot.alias.get(cont[0].toLowerCase())
    var alias2 = bot.alias2.get(cont[0].toLowerCase())

    if (cmd) { 
        cmd.run(bot, message, args); 
        return;
    } else if (alias) {
        alias.run(bot, message, args);
        return;
    } else if (alias2) {
        alias2.run(bot, message, args);
        return;
    } else {
        if(message.content.includes(PREFIX + "*")) return;            
        if(message.content.endsWith(PREFIX)) return;
        return;
    }
} catch (e) {
    console.log("Bir hata oluştu")
     }

});


module.exports = {
    d,
    Discord,
    bot,
    PREFIX,
    config,
    os,
    exec,
    fs,
    randomstring,
    randomhex,
    round,
    editmsg,
    usermissperm,
    dmerror,
    sleep,
    successemoji,
    
}


DisOwen();
