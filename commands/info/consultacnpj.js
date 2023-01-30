const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'consultarcnpj',
    description: 'Consulte dados de uma empresa pelo CNPJ.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'cnpj',
            description: 'Digite o CNPJ da empresa sem caracteres especiais.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run(client, interaction) {
        const cnpj = interaction.options.getString('cnpj');
        if (!cnpj || cnpj.length !== 14) {
            interaction.reply({
                embeds: [
                  new Discord.EmbedBuilder()
                    .setTitle(`📦 - Consulta de CNPJ`)
                    .setDescription('O número do CNPJ é muito grande, verifique se não digitou algo a mais. :(')
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
        try {
            const response = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`);
            if (response.data.status === 404) {
                interaction.reply({
                    embeds: [
                      new Discord.EmbedBuilder()
                        .setTitle(`📦 - Consulta de CNPJ`)
                        .setDescription('Não encontramos esse CNPJ em nosso banco de dados :(')
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
            } if (response.data.status === 429) {
                interaction.reply('Excedido o limite máximo de 3 consultas por minuto');
                return;
            }

            const empresa = response.data;
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`💼 - Dados da empresa`)
                        .addFields(
                            //{ name: 'Proprietário  ', value: empresa.socios.nome, inline: true },
                            { name: 'Nome', value: empresa.razao_social, inline: true },
                            { name: 'CNPJ Raiz', value: empresa.cnpj_raiz, inline: true },
                            { name: 'Capital Social', value: empresa.capital_social, inline: true },
                            { name: 'Última Atualização ', value: empresa.atualizado_em, inline: true },
                            { name: 'Natureza Júridica ', value: empresa.natureza_juridica.descricao, inline: true },
                        )
                        .setColor('Random')
                        .setFooter({
                            text: "Desenvolvido por: kevinfinalboss",
                            iconURL:
                                "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                        })
                        .setTimestamp()
                ]
            });
            console.log(empresa)
        } catch (error) {
            console.error(error);
            interaction.reply('Ocorreu um erro ao tentar obter as informações da empresa.');
        }
    }
};