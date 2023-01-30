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
            .setFooter({
                text: "Desenvolvido por: kevinfinalboss",
                iconURL:
                    "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
            })
            .setTimestamp()
            .setColor("Green");
            interaction.reply({ embeds: [cara] })
        } else {
            let coroa = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Coroa!`)
            .setFooter({
                text: "Desenvolvido por: kevinfinalboss",
                iconURL:
                    "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
            })
            .setTimestamp()
            .setColor("Green");
            interaction.reply({ embeds: [coroa] })
        }
    }
}