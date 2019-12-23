const DB = require('../db-util.js');

module.exports = {
    name: "fetch",
    desc: "Return the karma of the specified user",
    async printUserKarma(message, user) {
        const db = await new DB("./src/db/test.db");
        const userKarma = await db.queryUserKarma(user.id);
        let karmaValue;
        if (typeof userKarma == 'undefined') {
            karmaValue = 'undefined';
        } else {
            karmaValue = userKarma.karma
        }
        message.channel.send(`${user.tag}'s karma is ${karmaValue}`);
    },

    async execute(message, args) {
        const users = message.mentions.users;
        for (let entry of users.entries()) {
            const user = entry[1];
            await this.printUserKarma(message, user);
        }
    }
}