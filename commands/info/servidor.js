const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'servidor',
    description: 'Veja as informações do servidor.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'ip',
            description: 'Digite o ip do servidor.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async run(client, interaction) {
        const ip = interaction.options.getString('ip');
        try {
            const server = await fetch(`https://api.mcsrvstat.us/2/${ip}`).then(res => res.json());
            if (!server.online) {
                return interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setDescription(`O servidor ${ip} está offline ou não existe.`)
                    ]
                });
            }
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`⛏ - Informações do servidor - ⛏`)
                        .setDescription(`Olá ${interaction.user}, estas são as informações do servidor:
IP: ${ip}
Versão: ${server.version}
🚴‍♀️ Jogadores: ${server.players.online}/${server.players.max}`)
                        .setColor('White')
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
            interaction.reply('Ocorreu um erro ao tentar obter as informações do servidor.');
        }
    }
};