const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'consultacriptomoeda',
    description: 'Consulta valor de criptomoedas em BRL e USD.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'moeda',
            description: 'Nome da criptomoeda (ex: Bitcoin, Ethereum).',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run(client, interaction) {
        const moeda = interaction.options.getString('moeda');
        if (!moeda) {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`💲 - Consulta de Criptomoedas`)
                        .setDescription('Nome da criptomoeda inválido:(')
                        .setImage('https://i.pinimg.com/originals/00/1b/be/001bbe627e05638d072b1055a4917e77.gif')
                        .setColor('Random')
                        .setFooter({
                            text: "Desenvolvido por: kevinfinalboss",
                            iconURL:
                                "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                        })
                        .setTimestamp()
                ]
            })
            return;
        }
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${moeda.toLowerCase()}`);
            const precoBRL = response.data.market_data.current_price.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const precoUSD = response.data.market_data.current_price.usd.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });

            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`💰 - Valor de ${moeda}`)
                        .setDescription(`Preço atual de ${moeda} ${precoBRL} \n\nPreço atual de ${moeda} ${precoUSD}`)
                        .setImage('https://i.pinimg.com/originals/00/1b/be/001bbe627e05638d072b1055a4917e77.gif')
                        .setColor('Random')
                        .setFooter({
                            text: "Desenvolvido por: kevinfinalboss",
                            iconURL:
                                "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                        })
                        .setTimestamp()
                        
                ]
                
            });
            console.log(response)
        } catch (error) {
            if (error.response.status === 404) {
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(`💲 - Consulta de Criptomoedas`)
                            .setDescription('Opa, ocorreu um erro ao consultar sua criptmoeda, tente novamente daqui alguns minutos. :(')
                            .setImage('https://i.pinimg.com/originals/00/1b/be/001bbe627e05638d072b1055a4917e77.gif')
                            .setColor('Random')
                            .setFooter({
                                text: "Desenvolvido por: kevinfinalboss",
                                iconURL:
                                    "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                            })
                            .setTimestamp()
                    ]
                })
            }
        }
    }
};