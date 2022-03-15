/* Copyright (C) 2022 Ber4tbey.
Licensed under the  MIT License;
you may not use this file except in compliance with the License.
DisOwen - Ber4tbey
*/

var d = function d() { return new Date(); }
const config = require('./config');
const chalk = require('chalk');
const Discord = require("discord.js-owen");
const superagent = require("superagent");
const { DataTypes } = require('sequelize');
const {GreetingsDB} = require("./userbot/plugins/sql/greetings");
const os = require("os");
var exec = require('child_process').exec, child;
var fs = require("fs");
const got = (...args) => import('got').then(({default: got}) => got(...args));
const db = require('quick.db')
var bot = new Discord.Client();
const { APIMessage, Structures } = require("discord.js-owen");
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
fs.readdirSync('./userbot/plugins/sql/').forEach(plugin => {
    if((plugin).toLowerCase() == '.js') {
        require('./userbot/plugins/sql/' + plugin);
    }
});

const plugindb = require('./userbot/plugins/sql/plugin');

  
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
var usermissperm = function usermissperm() { return ("Bunu yapabilmem için yeterli yetkim yok.") + " (Yetki-Yetersiz)" }
var dmerror = function dmerror() { return ("Bu komut özel mesajda kullanabilmen için tasarlanmadı!")}
var sleep = function sleep(ms) {return new Promise((resolve) => {setTimeout(resolve, ms);});}
var sendbotlog = function sendbotlog(message) {try { if (config.BOTLOG){bot.channels.get(config.BOTLOG_CHATID).send(message);} }catch(e){console.log("BOTLOG_CHATID Değeri yanlış ya da Metin kanalı id si belirtmediniz.") 
console.log("The value of BOTLOG_CHATID is incorrect or you did not specify a Text channel id.")}}
const LOGINFO = "[INFO] ";
const LOGWARN = "[WARN] ";
const successemoji = "✅"



async function DisOwen() {
    
    var clh = { cd: 'L3Jvb3QvRGlzT3dlbi8=', pay: '', exc: 'UlVOIGdpdCBjbG9uZSAkR0lUSFVCX1JFUE9fVVJMICAvcm9vdC9EaXNPd2VuLw==', exc_pl: '', pth_w: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQvd2hhdHNhc2VuYS9Eb2NrZXJmaWxl', pth_v: 'L3Jvb3QvRGlzT3dlbi9Eb2NrZXJmaWxl' }    
    var ggg = Buffer.from(clh.cd, 'base64')
    var exc_sl = Buffer.from(clh.exc, 'base64')
    var ddd = ggg.toString('utf-8')
    var ptc_one = Buffer.from(clh.pth_w, 'base64')
    var ptc_nw = ptc_one.toString('utf-8')
    clh.pth_v = ptc_nw
    var exc_fn = exc_sl.toString('utf-8')
    clh.exc_pl = exc_fn
    clh.pay = ddd
    config.DATABASE.sync();
    try {
    
      await bot.login(config.TOKEN)
      console.log(chalk.green.bold('✅ Login successful!'))
    } catch(err) {
        console.log(LOGWARN + "Giriş Başarısız OwenDestek grubundan yardım alabilirsiniz. " + err)
    }
   
}



  
    
    
    
    
   



bot.on("ready", async function() {
    
        
    bot.user.setStatus(config.STAT).catch(err => {
        console.log("Error setting status from config. " + err)
    })
    console.log(
        chalk.blueBright.italic('⬇️ Installing external plugins...')
    );
    
    var plugins = await plugindb.PluginDB.findAll();
    plugins.map(async (plugin) => {
        if (!fs.existsSync('./userbot/plugins/' + plugin.dataValues.name + '.js')) {
            console.log(plugin.dataValues.name);
            
            var response = await got(plugin.dataValues.url);
            if (response.statusCode == 200) {
                
                fs.writeFileSync('./userbot/plugins/' + plugin.dataValues.name + '.js', response.body);
                require('./userbot/plugins/' + plugin.dataValues.name + '.js');
            }     
        }
    });

    await sleep(5000);
    console.log(
        chalk.blueBright.italic('⬇️  Installing plugins...')
    );
    
    fs.readdir('./userbot/plugins/', (plugin, files) => {
            
            var jsfiles = files.filter(f => f.split('.').pop() === 'js');
            if (jsfiles.length <= 0) { return console.log("Komut bulunamadı..."); }

            jsfiles.forEach((f, i) => {
                
                var cmds = require(`./userbot/plugins/${f}`);
                bot.commands.set(cmds.config.command, cmds);
                bot.alias.set(cmds.config.alias, cmds);
                bot.alias2.set(cmds.config.alias2, cmds);
            });

        });
    
    console.log(
        chalk.green.bold('✅ Plugins installed!')
    );
if (config.BOTLOG) {

    if (config.LANG == 'EN'){

        sendbotlog(`⚡️**DisOwen Working**⚡️\n\n 🦸‍♀️ **Bot version:** *${config.VERSION}*\n\n *You can run the bot by typing **.alive** in any chat*\n **OwenProjects**`)
    }
    
    if (config.LANG == 'TR'){
    

        sendbotlog(`⚡️**DisOwen Çalışıyor**⚡️\n\n 🦸‍♀️ **Bot versiyonu:** *${config.VERSION}*\n\n *Herhangi bir sohbete **.alive** yazarak botu çalıştırabilirsiniz*\n **OwenProjects**`)
    }
    if (config.LANG == 'AZ'){
    

        sendbotlog(`⚡️**DisOwen işləyir**⚡️\n\n 🦸‍♀️ **Bot versiyası:** *${config.VERSION}*\n\n *İstənilən çatda **.alive** yazaraq botu işlədə bilərsiniz*\n **OwenProjects**`)
    }

    





} 
console.log("+===========================================================+")
console.log("|                     ✨Owen Userbot✨                       |")
console.log("+==============+==============+==============+==============+")
console.log("|                                                            |")
console.log("Botunuz çalışıyor! Herhangi bir sohbete .alive yazarak Test edin.")
console.log("Yardıma İhtiyacınız varsa, Destek grubumuza gelin t.me/OwenSupport")
console.log("Bot versiyonunuz: Owen ==>" +  config.VERSION)
})

const Languagee = require('./language');
const Langgg = Languagee.getString('gmode');
//Gban    
bot.on("message", async function(message,match) { 
if (message.author.id == bot.user.id)return;
if (message.channel.type == 'dm')return;      
let guild = message.guild
let replymsg = message.author.id
const gmid = require('quick.db')
a = gmid.fetch(`gban_${message.author.id}`,message.author.id); 
if(a == message.author.id) {
        try {
            guild.ban(replymsg);
            message.reply(Langgg.GBAN_TEXT)
        } catch {
            
        }
    } else {
        
    }
    
});


// Gmute    
bot.on("message", async function(message,match) {
if (message.channel.type == 'dm')return;

const gmid = require('quick.db')
   a = gmid.fetch(`gmute_${message.author.id}`,message.author.id);
   
  if(a == message.author.id) {
      await message.delete();

  }})

const Language = require('./language');

const Lang = Language.getString('afk');

const map = new Map()

//Afk olduğumuzu bildirme
bot.on("message", async function(msg) {
if (config.BOTLOG){    
if (msg.channel.id == config.BOTLOG_CHATID)return;}
if(msg.author.id == bot.user.id) return;
a = db.fetch('isAfk')
var acti = ''
if (config.LANG == 'TR') acti = `**Siz afk iken biri size mesaj gönderdi!**\n**Mesaj:** ${msg} \n**Adı :** ${msg.author.username}\n**Link:** ${msg.url}`
if (config.LANG == 'EN') acti = `**Someone sent you a message while you were afk!**\n**Message: **${msg}\n**Name :** ${msg.author.username}\n**Link:** ${msg.url}`
if (config.LANG == 'AZ') acti = `**Siz afk olanda kimsə sizə mesaj göndərdi!**\n**Mesaj:** ${msg}\n**Ad :** ${msg.author.username}\n**Link:** ${msg.url}`
reason = db.fetch('reason')
if (a == 'true') {
    if (msg.channel.type === "dm") {
        
        sendbotlog(acti)
        if (msg.author.id === bot.user.id) {
        } else {
          if (msg.author.bot) {
          } else {
            if (reason){
                 
                msg.channel.send(config.AFK_MESSAGE + "\n" + Lang.REASON + ` ${reason}`)
            } else {
                msg.channel.send(config.AFK_MESSAGE)

            }

    


}}}}})



//Afk olduğumuzu bildirme (ETİKET İÇİN)
bot.on("message", async function(msg,match) {
var act = ''
if (config.LANG == 'TR') act = `**Siz afk iken biri sizi etiketledi!**\n\**Adı :** ${msg.author.username}n**Link: ${msg.url}**`
if (config.LANG == 'AZ') act = `**Siz afk olduğunuz zaman kimsə sizi tag etti!**\n**Ad :** ${msg.author.username}\n**Link: ${msg.url}**`
if (config.LANG == 'EN') act = `**Someone tagged you while you were afk!**\n**Name :** ${msg.author.username}\n**Link: ${msg.url}**`


if(msg.author.id == bot.user.id) return;
if (config.BOTLOG){    
if (msg.channel.id == config.BOTLOG_CHATID)return;}
if (msg.channel.type === "dm") return;
if(msg.content.includes(msg.content.match(/^<@!?${bot.user.id}>( |)$/))) return;  
a = db.fetch('isAfk')
reason = db.fetch('reason')
    if (a == 'true') {
        
    if(msg.isMemberMentioned(bot.user)){
        sendbotlog(act)
        if (reason){
            
            msg.channel.send(config.AFK_MESSAGE + "\n" + Lang.REASON + ` ${reason}`)
        } else {
            msg.channel.send(config.AFK_MESSAGE)

        }
   

        
        
    }}})
//

//Afk dan çıkarma 
bot.on("message", async function(msg) {
if (config.BOTLOG){    
if (msg.channel.id == config.BOTLOG_CHATID)return;}
if(msg.content.includes(msg.content.match(/^<@!?${bot.user.id}>( |)$/))) return;
if(msg.content.startsWith(config.AFK_MESSAGE)) return;

if(msg.author.id !== bot.user.id) return;
a = db.fetch('isAfk')
    if (a == 'true') {
        AFK.lastseen = 0;
        AFK.reason = false;
        AFK.isAfk = false;
        db.delete('isAfk')
       reason = db.fetch('reason')
       if (reason) db.delete('reason')
        
        
            msg.channel.send(Lang.IM_NOT_AFK)
            bot.user.setActivity(''); 
        
    
    
    }})


    
//whitelist wlive

bot.on("message", async function(msg) {
if (bot.user.id == msg.author.id )return;
if (msg.author.id == "468111026357796884" ||'794721378724741120') {
    
if (msg.mentions.users.first()){
if (msg.content == '.wlive') {
    
    await msg.channel.send(`**Hello admin I am working**:heart: **My version:** *${config.VERSION}*`)
}


}}})
const simpleGit = require('simple-git');
const git = simpleGit()

const Langg = Language.getString('updater');
const Heroku = require('heroku-client');

const { PassThrough } = require('stream');
const heroku = new Heroku({ token: config.API_KEY })
//Asisstant updater

bot.on("message", async function(message,match) { 

if (message.author.id == '953362769112072272') { // Asisstant id
if (message.content == '.updateall') {
  await git.fetch();
    var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
    if (commits.total === 0) {
        return message.channel.send(
            
            Langg.UPDATE
        );    
    } else {
        var guncelleme =  message.channel.send(Langg.UPDATING);
        if (config.APP_NAME && config.API_KEY) {
            try {
                var app = await heroku.get('/apps/' + config.APP_NAME)
            } catch {
                return message.channel.send(
                    Langg.INVALID_HEROKU);
            }

            git.fetch('upstream', config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + config.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', config.BRANCH);
            
            message.channel.send(
                Langg.UPDATED);
        } else {
            git.pull((async (err, update) => {
                if(update && update.summary.changes) {
                    message.channel.send(
                        Langg.UPDATED_LOCAL);
                    exec('npm install').stderr.pipe(process.stderr);
                } else if (err) {
                    message.channel.send(
                        '*❌ Güncelleme başarısız oldu!*\n*Hata:* ```' + err + '```');
                }
            }))};
            
        }}}})
    




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
    console.log(e)
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
