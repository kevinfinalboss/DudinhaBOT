const Discord = require("discord.js")
const config = require("./config.json")
const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){
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
  const compact = users.toLocaleString("pt-BR", { notation: 'compact' });
  let membro = client.channels.cache.get(`${config.canalmembros}`); // Colocar o id do canal de membros
  if (!membro) return console.log(`Canal de membros do bot não encontrado`);
  membro.setName(`📡 Membros: Calculando...`);
  setInterval(() => {
    membro.setName(`📡 Membros: ${compact}`);
  }, 1000 * 60 * 4);
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

