// Imports
const fs = require('fs');
const Discord = require('discord.js');
const DB = require('./db-util');

// Config and setup
const { token, leader } = require('../config.json');
const client = new Discord.Client();
// Create a dispatch dictionary for commands
// As per: https://discordjs.guide/command-handling/#dynamically-reading-command-files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

var db = new DB;
db.init("./db/test.db")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    
});

client.login(token)