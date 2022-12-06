const Discord = require("discord.js")
const cliente = new Discord.Client({intents: [1, 512, 32768, 2, 128]})