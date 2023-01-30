const Discord = require('discord.js');
const fetch = require('node-fetch');

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
        const ip = interaction.options.getString('ip');
        try {
            const info = await fetch(`https://ipinfo.io/${ip}/json?token=88acddbffd36bd`).then(res => res.json());
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`🔎 - Consulta finalizada`)
                        .setDescription(`
Host: ${info.hostname}
País: ${info.country}
Cidade: ${info.city}
Região: ${info.region}
Coordenadas: ${info.loc}
Organização: ${info.org}
Código Postal: ${info.postal}
Timezone: ${info.timezone}`)
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