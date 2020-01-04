const DB = require('../db-util.js');
const path = require('path');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: "index.js",
    streams: [{
        path: path.resolve("./log/combined.log")
    },
    {
        stream: process.stdout
    }],
    src: true
})

module.exports = {
    name: "top",
    desc: "Display a specified number of users, sorted by karma. Or all users (up to 25) if no number is given.",
    help: "**Top**:\n\
`Usage: $top [numberOfUsersToFetch]`\n\
Command takes an optional whole number argument. If no number is given, all of the users in the karma \
database will be displayed, sorted by karma (up to a maximum of 25). Otherwise, display the number \
of users specified, sorted by karma.",

    async execute(message, args) {
        const db = new DB("./src/db/test.db");
        const guild = message.guild;
        try {
            if (guild.available) {
                if (args.length === 1) {
                    const numberOfUsersToDisplay = Number(args[0]);
                    if (await this.validateArgument(numberOfUsersToDisplay) == true) {
                        const results = await db.queryTopUsers(numberOfUsersToDisplay);
                        this.displayMembers(message, guild, results);
    
                    } else {
                        message.reply(`${numberOfUsersToDisplay} is not a valid argument`);
                    }
                } else {
                    const results = await db.queryTopUsers();
                    this.displayMembers(message, guild, results);
                }
            } else {
                message.reply("Something went wrong when accessing this guild!").catch(console.log(error));
            }
        } catch (err) {
            logger.warn(err);
        }
    },

    async displayMembers(message, guild, databaseResults) {
        for (const row of databaseResults) {
            try {
                const guildMember = await this.resolveID(guild, row.tag);
                if (guildMember) {
                    message.channel.send(`${guildMember.user.username} has ${row.karma} karma.`);
                } else {
                    message.channel.send(`${row.tag} cannot be resolved into a server member.`);
                }
            } catch (err) {
                logger.warn(err);
            }
        }
    },

    async resolveID(guild, id) {
        try {
            const guildMember = await guild.fetchMember(id);
            return guildMember;
        } catch (err) {
            logger.info({failingID: id, guildID: guild.id}, 'Failed to fetch %s', id);
        }
    },

    async validateArgument(number) {
        if (Number.isNaN(number)) {
            return false;
        } else if (Number.isSafeInteger(number) && number > 0) {
            return true;
        } else {
            return false;
        }
    }
}