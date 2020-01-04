const path = require('path');
const bunyan = require('bunyan');
const DB = require('./db-util.js');
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

class KarmaTracker {
    constructor(client) {
        this.client = client;
        const { upvote, downvote} = require('../config.json');
        this.upvoteEmoji = upvote;
        this.downvoteEmoji = downvote;
    }

    async collectVotes(messageReaction) {
        const authorID = messageReaction.message.author.id;
        const reaction = messageReaction.emoji.identifier;
        if (reaction === this.upvoteEmoji) {
            logger.info({unicode: reaction, result: "upvote"});
            this.changeKarma(authorID, 1);
        } else if (reaction === this.downvoteEmoji) {
            logger.info({unicode: reaction, result: "downvote"});
            this.changeKarma(authorID, -1);
        } else {
            logger.info({unicode: reaction, result: "unrecognized"});
        }
    }

    async changeKarma(userID, change) {
        try {
            const db = await new DB("./src/db/test.db");
            const returnRow = await db.queryUserKarma(userID);
            if (typeof returnRow == 'undefined') {
                logger.info('%s returns undefined, attempting to create entry..', userID)
                await db.addUser(userID);
            } else {
                const karma = returnRow.karma
                await db.setUserKarma(userID, karma + change);
            }
        } catch (err) {
            logger.warn(err);
        }
    }
}

module.exports = KarmaTracker;