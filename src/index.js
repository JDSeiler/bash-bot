// Imports
const fs = require('fs');
const Discord = require('discord.js');
const DB = require("./db-util.js");

const KarmaTracker = require('./karma-tracker');

// Config and setup
const { token } = require('../user-secrets.json');
const { prefix } = require('../config.json');
const client = new Discord.Client();
// Create a dispatch dictionary for commands
// As per: https://discordjs.guide/command-handling/#dynamically-reading-command-files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let karma = new KarmaTracker(client);

// Karma tracker should be centered around the messageReactionAdd event which triggers
// whenever a reaction is added to a cached post. 
client.on('messageReactionAdd', (reaction, user) => {
    karma.collectVotes(reaction);
});

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        console.log("Prefixed message detected")
        const tokens = msg.content.slice(1).split(" ");
        console.log(tokens);
        const commandName = tokens[0];
        try {
            if (commandName == 'help') {
                if (tokens.length == 2) {
                    msg.channel.send(client.commands.get(tokens[1]).help)
                } else if (tokens.length == 1) {
                    client.commands.forEach((value, _, __) => {
                        msg.channel.send(value.help);
                    });
                } else {
                    msg.channel.send("Help takes either a single command name as an argument, or no arguments.")
                }
            } else {
                client.commands.get(commandName).execute(msg, tokens.slice(1));
            }
        } catch (err) {
            console.log(err)
            msg.reply(`${commandName} is not a recognized command.`)
        }
    }
});

client.login(token)
