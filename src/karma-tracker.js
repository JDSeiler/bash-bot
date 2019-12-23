const emitter = require('events').EventEmitter;
const DB = require('./db-util.js');

class KarmaTracker extends emitter {
    constructor(client) {
        super();
        this.client = client;
        const { upvote, downvote} = require('../config.json');
        this.upvoteEmoji = upvote;
        this.downvoteEmoji = downvote;
    }

    async collectVotes(messageReaction) {
        const authorID = messageReaction.message.author.id;
        const reaction = messageReaction.emoji.identifier;
        if (reaction === this.upvoteEmoji) {
            console.log("Upvoted!");
            this.changeKarma(authorID, 1);
        } else if (reaction === this.downvoteEmoji) {
            console.log("Downvoted!");
            this.changeKarma(authorID, -1);
        } else {
            console.log("Unrecognized");
        }
    }

    async changeKarma(userID, change) {
        try {
            const db = await new DB("./src/db/test.db");
            const returnRow = await db.queryUserKarma(userID);
            if (typeof returnRow == 'undefined') {
                console.log(`${userID} returns undefined, attempting to create entry..`)
                await db.addUser(userID);
            } else {
                const karma = returnRow.karma
                await db.setUserKarma(userID, karma + change);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = KarmaTracker;