const emitter = require('events').EventEmitter;
const DB = require('./db-util');

class KarmaTracker extends emitter {
    constructor(client) {
        super();
        this.client = client;
    }
    // TODO: Actually develop
    collectVotes(messageReaction) {
        const author = messageReaction.message.author;
        const reaction = messageReaction.emoji.identifier;
        // TODO: Move into configurable file
        const upVote = "%E2%AC%86";
        const downVote = "%E2%AC%87";

        if (reaction === upVote) {
            console.log("Upvoted!");
        } else if (reaction === downVote) {
            console.log("Downvoted!");
        } else {
            console.log("Unrecognized");
        }

        let db = new DB("./db/test.db");
        db.initTable("userKarma");
        db.addUser("Jeff");
        db.queryKarma("Jeff");

    }
}

module.exports = KarmaTracker;