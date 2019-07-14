module.exports = {
    name: "ping",
    desc: "Ping Pong!",
    run(message, args) {
        message.channel.send('Pong.');
    }
}