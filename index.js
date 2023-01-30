const Discord = require("discord.js")
const fs = require('fs');
let blacklistedWords = fs.readFileSync('./blacklisted-words.txt', 'utf-8').split('\n');
const config = require("./config.json")
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds
    ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply(`Error`);
        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run(client, interaction)

    }
})

client.on("ready", () => {
    console.log(`🔥 Estou online em ${client.user.username}! 🤤`)
})

client.on('message', (message) => {
    if (message.author.bot) return;
    const foundWord = blacklistedWords.find(word => message.content.includes(word));
    if (foundWord) {
      message.delete();
      message.reply('Não fale palavrões nos servidores, respeite os demais membros do server');
    }
  });

client.on("ready", () => {
    let canalPing = client.channels.cache.get(`${config.canalping}`);
    if (!canalPing) return console.log(`Canal de ping do bot não encontrado`);
    canalPing.setName(`📡 Ping: Calculando...`);
    setInterval(() => {
        canalPing.setName(`📡 Ping: ${client.ws.ping}ms`);
    }, 1000 * 60 * 2);
})

client.on("ready", () => {
    let users = client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)
    const compact = users.toLocaleString("pt-BR", {
        notation: 'compact'
    });
    let membro = client.channels.cache.get(`${config.canalmembros}`);
    if (!membro) return console.log(`Canal de membros do bot não encontrado`);
    membro.setName(`📡 Membros: Calculando...`);
    setInterval(() => {
        membro.setName(`📡 Membros: ${compact}`);
    }, 1000 * 60 * 1);
})

client.on("guildBanAdd", (member) => {
    const channel = client.channels.cache.get("865065506305212428");
    const embed = new Discord.EmbedBuilder()
        .setColor("#10fee4")
        .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
        .setTitle(`<:1288discordrole:1028430849915498606> ‣ LOG | Usuario Banido.`)
        .setDescription(`<:1288discordrole:1028430849915498606> ‣ Informações do usuario:\n > **Membro:${member.user}** \n > **ID:${member.user.id}**`)
        .setFooter({ text: `© ${client.user.username} 2023` })
        .setTimestamp(new Date())
    channel.send({ embeds: [embed] });
})

client.on('ready', () => {
    client.user.setActivity(`🎓 - Feito por kevinfinalboss `, { type: "PLAYING", url:"" }); 
});

client.on("guildBanRemove", (member) => {
    const channel = client.channels.cache.get("1041523085356044358");
    const embed = new Discord.EmbedBuilder()
        .setColor("#10fee4")
        .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
        .setTitle(`<:1288discordrole:1028430849915498606> ‣ LOG | Usuario Desbanido.`)
        .setDescription(`<:1288discordrole:1028430849915498606> ‣ Informações do usuario:\n > **Membro:${member.user}** \n > **ID:${member.user.id}**`)
        .setFooter({ text: `© ${client.user.username} 2023` })
        .setTimestamp(new Date())
    channel.send({ embeds: [embed] });
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.log("ERRO possivelmente não tratada em: Promise ", promise, " motivo: ", reason.message);
});


client.slashCommands = new Discord.Collection()
require('./handler')(client)
client.login(config.token)