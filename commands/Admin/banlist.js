const { ApplicationCommandType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "banlist",
    run: async (client, message, args) => {
        const { error } = client
        let bans = await message.guild.bans.fetch()

        let banInfo = (await bans).map(a => `**${a.user.tag}(${a.user.id}) - \`Motivo: ${a.reason || "Não definido."}\`**`)
        if (!banInfo) return error.noBans(message)

        const maxPerPage = 10;

        const pages = Math.ceil(banInfo.length / maxPerPage);

        let page = 0;

        let info = banInfo.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. ${e}`).join("\n")


        const embed = new EmbedBuilder()
            .setColor("black")
            .setDescription(info.toString())
        message.reply({ embeds: [embed] }).then(msg => {
            msg.react("ideemoji")
            msg.react("")


            let filtro = (reaction, user) => user.id === message.author.id;
            let coletor = msg.createReactionCollector({ filtro, time: 900000 })
            coletor.on("collect", (reaction) => {
                switch (reaction.emoji.name) {
                    case "nomedoemoji":
                        if (page !== 0) {
                            --page
                            embed.setDescription(banInfo.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. ${e}`).join("\n"))
                            msg.edit({ embeds: [embed] })
                        }
                        break;
                    case "nomedoemoji2":
                        if (page < pages - 1) {
                            page++
                            embed.setDescription(banInfo.slice(page * maxPerPage, (page * maxPerPage) + maxPerPage).map((e, i) => `${(i + 1) + page * maxPerPage}. ${e}`).join("\n"))
                            msg.edit({ embeds: [embed] })
                        }
                        break;
                }
            })
        })
    }
}
