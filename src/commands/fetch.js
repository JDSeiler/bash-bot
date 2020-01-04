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
    name: "fetch",
    desc: "Return the karma of the specified user",
    help: "**Fetch**:\n\
`Usage: $fetch @user1 [@users]`\n\
Command takes 1 or more user mentions as arguments, seperated by spaces. Output is the karma of each \
mentioned user. If a user is not yet in the database, their karma will be listed as `undefined`\n",

    async printUserKarma(message, user) {
        try {
            const db = await new DB("./src/db/test.db");
            const userKarma = await db.queryUserKarma(user.id);
            let karmaValue;
            if (typeof userKarma == 'undefined') {
                karmaValue = 'undefined';
            } else {
                karmaValue = userKarma.karma
            }
            message.channel.send(`${user.tag}'s karma is ${karmaValue}`);
        } catch (err) {
            logger.warn(err);
        }
    },

    async execute(message, _) {
        const users = message.mentions.users;
        for (let entry of users.entries()) {
            const user = entry[1];
            await this.printUserKarma(message, user);
        }
    }
}