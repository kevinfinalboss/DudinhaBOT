const Discord = require('discord.js')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = {
  name: 'servidor', // Coloque o nome do comando
  description: 'Veja as informações do servidor.', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'ip',
      description: 'Digite o ip do servidor.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async (client, interaction) => {
    const ip = interaction.options.getString('ip')
    const server = await fetch(`https://api.mcsrvstat.us/2/${ip}`, {
      method: 'GET'
    }).then(res => res.json())

    let off = new Discord.EmbedBuilder().setDescription(
      `O servidor ${ip} esta offline ou não existe.`
    )
    if (!server.online) return interaction.reply({ embeds: [off] })
    let embed = new Discord.EmbedBuilder()
      .setTitle(`⛏ - Informações do servidor - ⛏`)
      .setDescription(
        `Olá ${interaction.user} estas são as informações do servidor:\nIP: ${ip}\nVersão: ${server.version}\n 🚴‍♀️ Jogadores: ${server.players.online}/${server.players.max}`
      )
      .setColor('Random')
    interaction.reply({ embeds: [embed] })
  }
}
