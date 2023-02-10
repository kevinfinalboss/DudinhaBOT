const Discord = require("discord.js");
const axios = require('axios');
const fs = require('fs');
let blacklistedWords = fs.readFileSync('./blacklisted-words.txt', 'utf-8').split('\n');
const config = require("./config.json");
const { HTTPError } = require("discord.js");
const apiKey = config.tokenbus;

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
    console.log(`🔥 Estou online como ${client.user.username}! 🤤`);

    let canalPing = client.channels.cache.get(config.canalping);
    if (!canalPing) return console.log(`Canal de ping do bot não encontrado`);
    canalPing.setName(`📡 Ping: Calculando...`);
    setInterval(() => {
        canalPing.setName(`📡 Ping: ${client.ws.ping}ms`);
    }, 1000 * 60 * 2);

    let users = client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b);
    const compact = users.toLocaleString("pt-BR", {
        notation: 'compact'
    });
    let membro = client.channels.cache.get(config.canalmembros);
    if (!membro) return console.log(`Canal de membros do bot não encontrado`);
    membro.setName(`📡 Membros: Calculando...`);
    setInterval(() => {
        membro.setName(`📡 Membros: ${compact}`);
    }, 1000 * 60 * 1);
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply(`Error`);
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        await cmd.run(client, interaction);
    }
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("ERRO possivelmente não tratada em Promise", promise, "motivo:", reason.message);
});

async function autenticar() {
    try {
        const response = await axios.post(`http://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=${apiKey}`);
        if (response.data === true) {
            console.log('Conexão com a API SPTrans realizada com sucesso!');
        }
    } catch (error) {
        console.error(error);
    }
}

client.slashCommands = new Discord.Collection()
require('./handler')(client)
client.login(config.token)
autenticar();
