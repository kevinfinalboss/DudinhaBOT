const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require("../../config.json")

module.exports = {
    name: 'consultaip',
    description: 'Veja informações de um IP.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'ip',
            description: 'Digite o IP a ser consultado.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async run(client, interaction) {
        let ip;
        try {
            ip = interaction.options.getString('ip');
        } catch (error) {
            interaction.reply('Ocorreu um erro ao obter o IP.');
            return;
        }

        try {
            const info = await fetch(`https://ipinfo.io/${ip}/json?token=${config.tokenip}`)
                .then(res => res.json())
                .catch(error => {
                    console.error(error);
                    interaction.reply('Ocorreu um erro ao realizar a requisição de informações do IP.');
                    return;
                });

            if (!info) return;

            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`🔎 - Consulta finalizada`)
                        .setDescription(`Host: ${info.hostname || 'Não disponível'}
                    País: ${info.country || 'Não disponível'}
                    Cidade: ${info.city || 'Não disponível'}
                    Região: ${info.region || 'Não disponível'}
                    Coordenadas: ${info.loc || 'Não disponível'}
                    Organização: ${info.org || 'Não disponível'}
                    Código Postal: ${info.postal || 'Não disponível'}
                    Timezone: ${info.timezone || 'Não disponível'}`)
                        .setColor('Random')
                        .setFooter({
                            text: "Desenvolvido por: kevinfinalboss",
                            iconURL:
                                "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                        })
                ]
            });
        } catch (error) {
            console.error(error);
            interaction.reply('Ocorreu um erro ao tentar obter as informações do IP.');
        }
    }
};