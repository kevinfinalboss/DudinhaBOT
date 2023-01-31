const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'buscarendereco',
    description: 'Puxa informações de um CEP usando a API ViaCEP.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'cep',
            description: 'Digite o CEP para buscar informações.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run(client, interaction) {
        const cep = interaction.options.getString('cep');
        if (!cep) {
            interaction.reply('CEP inválido.');
            return;
        }

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.data || response.data.erro) {
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(`🏠 - Busca de Endereço`)
                            .setDescription(`Não foi possível encontrar informações para o CEP ${cep}.`)
                            .setColor('Random')
                            .setFooter({
                                text: "Desenvolvido por: kevinfinalboss",
                                iconURL:
                                    "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                            })
                            .setTimestamp()
                    ]
                });
                return;
            }
            const urlMaps = encodeURI(
                `https://www.google.com/maps/search/?api=1&query=${response.data.logradouro} ${response.data.bairro}%2C${response.data.localidade}-${response.data.uf}`)
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`🏠 - Busca de Endereço`)
                        .setDescription(`Endereço: ${response.data.logradouro} ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}, ${response.data.cep} \n\n[Veja no Maps](${urlMaps})`)
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
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`🏠 - Busca de Endereço`)
                        .setDescription('Ocorreu um erro ao tentar obter informações sobre o CEP.')
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
}