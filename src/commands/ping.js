module.exports = {
    name: "ping",
    desc: "Ping Pong!",
    execute(message, args) {
        message.channel.send('Pong.');
    }
}