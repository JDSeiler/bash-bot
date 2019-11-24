const emitter = require('events').EventEmitter;
const DB = require('./db-util.js');

class KarmaTracker extends emitter {
    constructor(client) {
        super();
        this.client = client;
    }
    // TODO: Actually develop
    collectVotes(messageReaction) {
        let db = new DB("/home/jordan/Projects/bash-bot/src/db/test.db");
        db.initTable("userKarma");
        db.addUser("Jeff");
        db.increaseKarma("Jeff");
        db.queryKarma("Jeff");
        const author = messageReaction.message.author;
        const reaction = messageReaction.emoji.identifier;
        // TODO: Move into configurable file
        const upVote = "%E2%AC%86%EF%B8%8F";
        const downVote = "%E2%AC%87";
        console.log(reaction);

        if (reaction === upVote) {
            console.log("Upvoted!");
                // db.increaseKarma("Jeff");
            // db.queryKarma("Jeff");
        } else if (reaction === downVote) {
            console.log("Downvoted!");
        } else {
            console.log("Unrecognized");
        }


    }
}

module.exports = KarmaTracker;