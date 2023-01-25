const Discord = require('discord.js')
const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = Discord

module.exports = {
    name: "kiss",
    description: "Beije um membro.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "membro",
            description: "Mencione um usuário",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    async run(client, interaction) {
        const user = interaction.options.getUser("membro")
        const gifs = [
            'https://imgur.com/II1bakc.gif',
            'https://imgur.com/MzAjNdv.gif',
            'https://imgur.com/eKcWCgS.gif',
            'https://imgur.com/3aX4Qq2.gif',
            'https://imgur.com/uobBW9K.gif',
            'https://imgur.com/3jzT5g6.gif',
            'https://imgur.com/VrETTlv.gif',
            'https://imgur.com/FozOXkB.gif',
            'https://imgur.com/7GhTplD.gif',
            'https://imgur.com/B6UKulT.gif'
        ]
        const random1 = gifs[Math.floor(Math.random() * gifs.length)];
        const random2 = gifs[Math.floor(Math.random() * gifs.length)];

        const firstEmbed = new EmbedBuilder()
            .setDescription(`**${interaction.user} Deu um beijo em ${user}.**`)
            .setImage(`${random1}`)
            .setColor("Random")

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Retribuir')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(false)
            )

        const secondEmbed = new EmbedBuilder()
            .setDescription(`**${user} Retribuiu o beijo de ${interaction.user}.**`)
            .setColor("Random")
            .setImage(`${random2}`)

        await interaction.reply({ embeds: [firstEmbed], components: [button] })

        const filter = i => i.customId === '1' && i.user.id === user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

        collector.on('collect', async i => {
            if (i.customId === '1') {
                i.reply({ embeds: [secondEmbed] })
            }
        });

        collector.on("end", () => {
            interaction.editReply({
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('1')
                                .setLabel('Retribuir')
                                .setStyle(ButtonStyle.Primary)
                                .setDisabled(true)
                        )
                ]
            })
        })
    }
}