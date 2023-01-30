const Discord = require("discord.js")

module.exports = {
  name: "botinfo",
  description: "Todas as informações do BOT Dudinha!",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    let dono = "906552238619639878";
    let membros = client.users.cache.size;
    let servidores = client.guilds.cache.size;
    let canais = client.channels.cache.size;
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let linguagem = "NodeJS";
    let livraria = "Discord.JS V14";
    let ping = client.ws.ping;

    let embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setThumbnail(avatar_bot)
      .setFooter({
        text: "Desenvolvido por: kevinfinalboss",
        iconURL:
          "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
      })
      .setTimestamp()
      .setDescription(`Olá ${interaction.user}, veja minhas informações abaixo:\n\n> 🤖 Nome: \`${bot}\`.\n> 🤖 Dono: ${client.users.cache.get(dono)}.
\n> ⚙ Membros: \`${membros}\`.\n> ⚙ Servidores: \`${servidores}\`.\n> ⚙ Canais: \`${canais}\`.\n> ⚙ Ping: \`${ping}\`.
\n> 📚 FrameWork: \`${linguagem}\`.\n> 📚 Livraria: \`${livraria}\`.`);

    interaction.reply({ embeds: [embed] })


  }
}