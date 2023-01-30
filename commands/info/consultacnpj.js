const Discord = require('discord.js');
const axios = require('axios');
const moment = require('moment');


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
            }
            const empresa = response.data;
            const capitalFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(empresa.capital_social);
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`💼 - Dados da empresa`)
                        .addFields(
                            { name: 'Nome', value: empresa.razao_social, inline: false },
                            { name: 'Nome Fantasia', value: empresa.estabelecimento.nome_fantasia, inline: false },
                            { name: 'CNPJ raiz', value: empresa.cnpj_raiz, inline: false },
                            { name: 'Proprietário', value: empresa.socios[0].nome, inline: false },
                            { name: 'Faixa etária', value: empresa.socios[0].faixa_etaria, inline: false },
                            { name: 'Capital social', value: capitalFormat, inline: false },
                            { name: 'Última atualização', value: moment(empresa.atualizado_em).format("DD/MM/YYYY"), inline: false },
                            { name: 'Natureza júridica', value: empresa.natureza_juridica.descricao, inline: false },
                            { name: 'Atividade principal', value: empresa.estabelecimento.atividade_principal.descricao, inline: false },
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
        } catch (error) {
            interaction.reply({
                embeds: [
                  new Discord.EmbedBuilder()
                    .setTitle(`📦 - Consulta de CNPJ`)
                    .setDescription('Excedido o limite máximo de consultas por minuto, tente novamente mais tarde.')
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
};