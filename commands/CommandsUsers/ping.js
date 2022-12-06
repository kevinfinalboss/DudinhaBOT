const Discord = require("discord.js");

module.exports = {
    name: "ping",

    run: async(client, message, args) => {
        const gateway = Date.now()
        
        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription(`Oi Amor 🤤 ${message.author}, seu ping está em: \`carregando...\`.`)

        let embed2 = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription(`Oi Amor 🤤 ${message.author}, seu ping está em: \`${client.ws.ping}ms\`.`)
        .setFooter({ text: `Requisitado Por: ${message.author} `})

        message.reply({embeds: [embed]}).then(msg => {
            setTimeout( () => {
                msg.edit({embeds: [embed2]})
            }, 3000)
        })


    }
}