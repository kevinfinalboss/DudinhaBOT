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
    try {
      const response = await rastrearEncomendas([codRastreio]);
      const encomenda = response[0];
      let message = '';
      encomenda.eventos.reverse().forEach(evento => {
        message += `${ evento.dtHrCriado } - ${ evento.unidade.tipo } - ${ evento.descricao } \n`;
      });
      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`📦 - Rastreamento da encomenda`)
            .setDescription(message)
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
      interaction.reply('Ocorreu um erro ao tentar obter as informações da encomenda.');
    }
  }
}