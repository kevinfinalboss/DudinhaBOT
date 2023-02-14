const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: "editarperfil",
    description: "Mudar o seu sobre mim no /perfil",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'descrição',
            description: 'A descrição que vai mudar no sobre mim',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction, args) => {

        const descrição = interaction.options.getString("descrição");


        await db.set(`aboutme_${interaction.user.id}`, descrição);

        interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle(`⚠ - Processando`)
                    .setDescription(`⚙ - Sua descrição foi alterada para: ${descrição}`)
                    .setColor('Random')
                    .setFooter({
                        text: "Desenvolvido por: kevinfinalboss",
                        iconURL:
                            "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                    })
                    .setTimestamp()
            ]
        });
    }
}

