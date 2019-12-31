const DB = require('../db-util.js');

module.exports = {
    name: "top",
    desc: "(dummy docs) Display the top users by karma",
    help: "TODO",


    async execute(message, args) {
        const db = new DB("./src/db/test.db");
        const results = await db.queryTopUsers();
        const guild = message.guild;
        if (guild.available) {
            for (const row of results) {
                try {
                    const guildMember = await this.resolveID(guild, row.tag);
                    if (guildMember) {
                        message.channel.send(`${guildMember.user.username} has ${row.karma} karma.`);
                    } else {
                        message.channel.send(`${row.tag} cannot be resolved into a server member.`);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        } else {
            message.reply("Something went wrong when accessing this guild!").catch(console.log(error));
        }
    },

    async resolveID(guild, id) {
        try{
            const guildMember = await guild.fetchMember(id);
            return guildMember;
        } catch (err) {
            console.log(`Failed to fetch ${id}`);
            console.log(err);
        }
    }
}