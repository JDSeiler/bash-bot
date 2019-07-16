const emitter = require('events').EventEmitter;

class KarmaTracker extends emitter {
    constructor(client, channel) {
        super();
        this.client = client;
    }
    // TODO: Actually develop
    collectVotes(msg) {
        console.log("triggered");
        const filter = (reaction, user) => {
            return (user.id === msg.author.id);
        };

        msg.awaitReactions(filter, {time: 30000, errors: ['time'] })
            .then(collected => {
                console.log(collected)
            })
            .catch(error => console.log(error));
    }
}

module.exports = KarmaTracker;