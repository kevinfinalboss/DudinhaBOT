const Discord = require('discord.js');
const { rastrearEncomendas } = require('correios-brasil');

module.exports = {
  name: 'rastrearencomenda',
  description: 'Veja informações de uma encomenda pelo código de rastreio.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'codigo',
      description: 'Digite o código de rastreio da encomenda.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],
  async run(client, interaction) {
    const codRastreio = interaction.options.getString('codigo');
    if (!codRastreio) {
      interaction.reply('Código de rastreio inválido.');
      return;
    }

    try {
      const response = await rastrearEncomendas([codRastreio]);
      if (!response) {
        interaction.reply('Não foi possível obter informações da encomenda.');
        return;
      }

      const encomenda = response[0];
      if (!encomenda || !encomenda.eventos) {
        interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle(`📦 - Rastreamento da encomenda`)
              .setDescription('Não achei nenhum dado de rastreio com este código enviado, verifique se o código digitado está correto')
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

      let message = '';
      encomenda.eventos.reverse().forEach(evento => {
        const data = new Date(evento.dtHrCriado).toLocaleDateString();
        const hora = new Date(evento.dtHrCriado).toLocaleTimeString();
        message += ` ${data} às ${hora} - ${evento.unidade.tipo} - ${evento.descricao} \n \n`;
      });

      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`📦 - Rastreamento da encomenda`)
            .setDescription(message)
            .setImage('https://media4.giphy.com/media/QyEY8uZq3s7yiUjIDH/giphy.gif?cid=790b7611a8287ef06b9a015d93a73a49b3b3de5c2e1a78f6&rid=giphy.gif&ct=s')
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
      interaction.reply('Ocorreu um erro ao tentar obter as informações da encomenda.');
    }
  }
};
