const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'letra',
    description: 'Veja a letra de uma música.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'artista',
            description: 'Digite o nome do artista.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'musica',
            description: 'Digite o nome da música.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async run(client, interaction) {
        const artista = interaction.options.getString('artista');
        const musica = interaction.options.getString('musica');
        try {
            const info = await fetch(`https://api.vagalume.com.br/search.php?art=${artista}&mus=${musica}`).then(res => res.json());
            const letra = info.mus[0].text;
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`🎶 - Letra de ${info.mus[0].name} de ${info.art.name}`)
                        .setDescription(`${letra.replace(/\r?\n/g, '\n')}`)
                        .setColor('Random')
                        .setFooter({
                            text: "Desenvolvido por: kevinfinalboss",
                            iconURL:
                                "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                        })
                        .setTimestamp()
                ]
            });
        } catch (error) {
            console.error(error);
            interaction.reply('Ocorreu um erro ao tentar obter a letra da música.');
        }
    }
};