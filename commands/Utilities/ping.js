const Discord = require("discord.js")

module.exports = {
  name: "ping",
  description: "﹝Information﹞Shows Current Latency❗",
  description_localizations: {"pt-BR":"﹝Informação﹞Ping da dudinha"},
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const gateway = Date.now() - interaction.createdTimestamp
    let ping = client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Oi meu amor 🤤 ${interaction.user}, Meu Ping Está Em: \`calculando...\`.`)
    .setFooter({
      text: "Desenvolvido por: kevinfinalboss",
      iconURL:
          "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
  })
  .setTimestamp()

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**Ping: \`${ping}ms\` (\`MS\`)
                       Gateway: \`${gateway}ms\` (\`MS\`)
                       Shards: \`0\`**`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({
      text: "Desenvolvido por: kevinfinalboss",
      iconURL:
          "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
  })
  .setTimestamp()
    .setColor("FFFFFF");

    interaction.reply({ embeds: [embed_1] }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 3000)
    })
  }
}