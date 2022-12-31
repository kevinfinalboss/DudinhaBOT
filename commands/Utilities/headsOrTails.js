const Discord = require("discord.js")

module.exports = {
    name: "caraoucoroa",
    description: "um jogo de sorte, cara ou coroa?",
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async (client, interaction) => {
        let num = Math.random();
        if (num <0.5) {         
            let cara = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Cara!`)
            .setColor("Green");
            interaction.reply({ embeds: [cara] })
        } else {
            let coroa = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Coroa!`)
            .setColor("Green");
            interaction.reply({ embeds: [coroa] })
        }
    }
}