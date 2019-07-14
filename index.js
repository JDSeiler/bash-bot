const Discord = require('discord.js');
const config = require('./config.json');
const DB = require('./db-util');
const client = new Discord.Client();

var db = new DB;
db.init("./db/test.db")

var updoots = 0;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    if (msg.content.startsWith('!updoot')) {
        const user = msg.mentions.users.first();
        const member = msg.guild.member(user);

        if (member) {
            updoots++;
            msg.reply(`You've updooted: ${user.tag} Total: ${updoots}`);
        }
    }
});

client.login(config["auth-token"])