const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Veja as informações do servidor",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id",
            description: "Cole o ID do servidor",
            type: Discord.ApplicationCommandOptionType.String,
            require: true,
        }
    ],
    run: async (client, interaction) => {

        let membros = interaction.guild.memberCount;
        let cargos = interaction.guild.roles.cache.size;
        let canais = interaction.guild.channels.cache.size;
        let entrou = interaction.guild.joinedTimestamp;
        let servidor = interaction.guild;
        let donoid = interaction.guild.ownerId;
        let emojis = interaction.guild.emojis.cache.size;
        let serverid = interaction.options.getString("id")
        let impulsos = interaction.guild.premiumSubscriptionCount;
        let data = interaction.guild.createdAt.toLocaleDateString("pt-br");


        let ryan = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setThumbnail(interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            .setTitle(`Informações do servidor: ${interaction.guild}`)
            .addFields(
                {
                    name: `<:id:1045111180710137917> Identidade`,
                    value: `\`\`\`${serverid}\`\`\``,
                    inline: true,
                },
                {
                    name: `<:info:1045109841007497266> Canais em geral:`,
                    value: `<:hashtag:1045111008475238451> Canais: ${canais}\n<:hashtag:1045111008475238451> Cargos: ${cargos}`,
                    inline: true,
                },
                {
                    name: `<:user:1046829547749908581> Usuarios`,
                    value: `\`\`\`${membros} membros\`\`\``,
                    inline: true,
                },
                {
                    name: `<:roleicon:1045155516898357268> Servidor criado`,
                    value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `🚀 ${interaction.user.username} entrou em `,
                    value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: `👑 Dono`,
                    value: `<@!${donoid}> \n\`\`${donoid}\`\``,
                    inline: true,
                }
            )
        interaction.reply({ embeds: [ryan] })
    }
}