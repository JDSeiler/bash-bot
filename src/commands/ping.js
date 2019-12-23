module.exports = {
    name: "ping",
    desc: "Ping Pong!",
    help: 
    "**Ping**:\nTest command that responds with \"Pong.\" to the user who calls it.\n",
    execute(message, args) {
        message.channel.send('Pong.');
    }
}