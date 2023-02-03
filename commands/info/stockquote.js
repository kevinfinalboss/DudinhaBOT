const Discord = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');
const config = require("../../config.json")

module.exports = {
    name: 'stockquote',
    description: 'Veja o valor de uma ação.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'symbol',
            description: 'Digite o símbolo da ação a ser consultada.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async run(client, interaction) {
        let symbol;
        try {
            symbol = interaction.options.getString('symbol');
        } catch (error) {
            interaction.reply('Ocorreu um erro ao obter o símbolo da ação.');
            return;
        }

        try {
            const info = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${config.alphaVantageAPIKey}`)
                .then(res => res.json())
                .catch(error => {
                    console.error(error);
                    interaction.reply('Ocorreu um erro ao realizar a requisição de informações da ação.');
                    return;
                });

            if (!info || !info['Global Quote'] || !info['Global Quote']['05. price']) {
                interaction.reply('Não foi possível obter informações sobre a ação.');
                return;
            }
            console.log(info)
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`💹 - Cotação de ações`)
                        .setDescription(`Ação: ${symbol}
                        Preço: $ ${info['Global Quote']['05. price']}
                        Previsão de Fechamento: $ ${info['Global Quote']['08. previous close']}
                        Último dia de negociação: ${moment(info['Global Quote']['07. latest trading day']).format("DD/MM/YYYY")}
`)
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
            interaction.reply('Ocorreu um erro ao tentar obter as informações da ação.');
        }
    }
}