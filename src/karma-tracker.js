const emitter = require('events').EventEmitter;
const DB = require('./db-util.js');

class KarmaTracker extends emitter {
    constructor(client) {
        super();
        this.client = client;
        const { upvote, downvote} = require('../config.json');
        this.upvote = upvote;
        this.downvote = downvote;
    }
    // TODO: Actually develop
    collectVotes(messageReaction) {
        let db = new DB("./src/db/test.db");
        const authorID = messageReaction.message.author.id;
        const reaction = messageReaction.emoji.identifier;
        const userName = "Dave";
        db.queryUserKarma(authorID, (err, row) => {
            if (err) {
                console.log(err);
            } else {
                // Checking against a string because undeinfed can be overwritten, typeof cannot
                if (typeof row !== 'undefined') {
                    console.log("Karma is " + row.karma);
                } else {
                    console.log("No DB entry found for: " + authorID);
                }
            }
        });
        db.setUserKarma(userName, 20, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("No fatal errors (does not indicate success)");
            }
        });
        if (reaction === this.upvote) {
            console.log("Upvoted!");
        } else if (reaction === this.downvote) {
            console.log("Downvoted!");
        } else {
            console.log("Unrecognized");
        }


    }
}

module.exports = KarmaTracker;