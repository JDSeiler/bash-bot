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
    // TODO: Actually develop
    async collectVotes(messageReaction) {
        const db = await new DB("./src/db/test.db");
        const authorID = messageReaction.message.author.id;
        const reaction = messageReaction.emoji.identifier;
        const userName = "Dave";

        if (reaction === this.upvoteEmoji) {
            console.log("Upvoted!");
        } else if (reaction === this.downvoteEmoji) {
            console.log("Downvoted!");
        } else {
            console.log("Unrecognized");
        }


    }
}

module.exports = KarmaTracker;