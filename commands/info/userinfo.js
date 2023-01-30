const Discord = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Veja informações de algum usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "ID ou Menção do usuario",
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        }
    ],
    run: async (client, interaction) => {
        let user = interaction.options.getUser("user")
        let infouser = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${user.username}`)
            .setThumbnail(user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .addFields(
                {
                    name: `🛡 Nome`,
                    value: `\`\`\`${user.tag}\`\`\``,
                    inline: true,
                },
                {
                    name: ` 🆔 Identidade`,
                    value: `\`\`\`${user.id}\`\`\``,
                    inline: true,
                },
                {
                    name: `⚠ Menção`,
                    value: `${user}`,
                    inline: true,
                },
                {
                    name: `🚨 Conta criada`,
                    value: `<t:${~~(user.createdTimestamp / 1000)}:f> (<t:${~~(user.createdTimestamp / 1000)}:R>)`,
                    inline: false,
                },
            )
            .setFooter({
                text: "Desenvolvido por: kevinfinalboss",
                iconURL:
                    "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
            })
            .setTimestamp()
        interaction.reply({ embeds: [infouser] })
    }
}