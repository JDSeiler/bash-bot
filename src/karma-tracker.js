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
    collectVotes(messageReaction) {
        
        const authorID = messageReaction.message.author.id;
        const reaction = messageReaction.emoji.identifier;
        const userName = "Dave";

        if (reaction === this.upvoteEmoji) {
            console.log("Upvoted!");
            this.upvote(authorID);
        } else if (reaction === this.downvoteEmoji) {
            console.log("Downvoted!");
        } else {
            console.log("Unrecognized");
        }

        

    }

    upvote(authorID) {
        let db = new DB("./src/db/test.db");
        db.queryUserKarma(authorID, (err, row) => {
            if (err) {
                console.log(err);
            } else {
                // Checking against a string because undefined can be overwritten, typeof cannot
                if (typeof row !== 'undefined') {
                    db.setUserKarma(authorID, row.karma + 1, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("No fatal errors (does not indicate success)");
                        }
                    }); 
                } else {
                    console.log("No DB entry found for: " + authorID);
                    db.addUser(authorID, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`User ${authorID} added`);
                        }
                    });
                }
            }
        });
    }
}

module.exports = KarmaTracker;