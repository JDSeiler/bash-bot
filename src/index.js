// Imports

const fs = require('fs');
const Discord = require('discord.js');
const DB = require('./db-util');
const KarmaTracker = require('./karma-tracker');

// Config and setup
const { token, prefix } = require('../config.json');
const client = new Discord.Client();
// Create a dispatch dictionary for commands
// As per: https://discordjs.guide/command-handling/#dynamically-reading-command-files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

let db = new DB;
db.init("./db/test.db")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// let karma = new KarmaTracker(client);

// Karma tracker should be centered around the messageReactionAdd event which triggers
// whenever a reaction is added to a cached post. 
client.on('messageReactionAdd', (reaction, user) => {
    reaction.message.reply("Reaction made!")
    .then()
    .catch(console.error)
});

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        console.log("Good!")
        let tokens = msg.content.slice(1).split(" ");

        // if (!client.commands.has(command)) return;

        try {
            console.log(client.commands)
            client.commands.get(tokens[1]).execute(msg);
        } catch (error) {
            console.log(error)
            msg.reply(`${tokens[1]} is not a recognized command.`)
        }
    }
});

client.login(token)