const Discord = require("discord.js")
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
    console.log(`🔥 Estou online em ${client.user.username}! e pronta para mamar 🤤`)
})

client.on("ready", () => {
    let canalPing = client.channels.cache.get(`${config.canalping}`); // Colocar o id do canal de ping
    if (!canalPing) return console.log(`Canal de ping do bot não encontrado`);
    canalPing.setName(`📡 Ping: Calculando...`);
    setInterval(() => {
        canalPing.setName(`📡 Ping: ${client.ws.ping}ms`);
    }, 1000 * 60 * 4);
})

client.on("ready", () => {
    let users = client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)
    const compact = users.toLocaleString("pt-BR", {
        notation: 'compact'
    });
    let membro = client.channels.cache.get(`${config.canalmembros}`); // Colocar o id do canal de membros
    if (!membro) return console.log(`Canal de membros do bot não encontrado`);
    membro.setName(`📡 Membros: Calculando...`);
    setInterval(() => {
        membro.setName(`📡 Membros: ${compact}`);
    }, 1000 * 60 * 4);
})

client.on('messageUpdate', (message, newMessage, oldMessage) => {
    if (message.author.bot) return;


    const canalLogs = message.guild.channels.cache.get("1058621054307803227")


    let usuárioMSGe = message.author.id;
    let usuárioMSGf = message.author;
    let ConteúdoAntigoMSG = message.content;
    let ConteúdoNovoMSG = newMessage;
    let CanalMSGEditada = message.channel;

    const embed_editada = new Discord.EmbedBuilder()
        .setTitle(`**Mensagem Editada**`)
        .setColor("Black")
        .setFooter({
            text: `ID do usuário: ${usuárioMSGe}`
        })
        .setTimestamp(new Date())
        .setDescription(`**📝 ${usuárioMSGf} editou uma mensagem de texto**\n\n**Canal:** ${CanalMSGEditada} \n\n**Antiga mensagem:** \n \`\`\`${ConteúdoAntigoMSG}\`\`\` \n\n**Nova mensagem:** \n \`\`\`${ConteúdoNovoMSG}\`\`\``)


    try {

        canalLogs.send({
            embeds: [embed_editada]
        })

    } catch (e) {}
})

client.on('messageDelete', async (message) => {

    const canalLogs = message.guild.channels.cache.get("1058621054307803227") // ID DO CANAL DE LOGS

    if (message.author.bot) return;

    let msgDelete = message.content;
    const qmdeletou = message.author.id;
    const canaldelatado = message.channel;

    const embed_delete = new Discord.EmbedBuilder()
        .setTitle(`**Mensagem Deletada**`)
        .setColor("Black")
        .setFooter({
            text: `ID do usuário: ${qmdeletou}`
        })
        .setTimestamp(new Date())
        .setDescription(`**📝 Mensagem de texto deletada**\n\n**Canal:** ${canaldelatado} \n\n**Mensagem:**\n \`\`\`${msgDelete}\`\`\``)


    try {

        canalLogs.send({
            embeds: [embed_delete]
        })

    } catch (e) {}
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