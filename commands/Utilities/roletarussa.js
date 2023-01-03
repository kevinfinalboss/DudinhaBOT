const Discord = require("discord.js")

module.exports = {
    name: "roletarussa",
    description: "Comando para jogares roleta russa",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        const numero = Math.floor(Math.random() * 11)

        const embed1 = new Discord.EmbedBuilder()
            .setTitle(`🔫 ROLETA RUSSA 🔫`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor('Random')
            .setDescription(`${interaction.user} Pegou a arma e apertou o gatilho`)
            .setTimestamp()
            .setFooter({
                text: "Desenvolvido por: kevinfinalboss",
                iconURL:
                  "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
              })

        if(numero >= 5) {
            const embed2 = new Discord.EmbedBuilder()
            .setTitle(`💀 VOCÊ MORREU! 💀`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor("#FF0000")
            .setDescription(`${interaction.user} Infelizmente você morreu`)
            .setTimestamp()
            .setFooter({
                text: "Desenvolvido por: kevinfinalboss",
                iconURL:
                  "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
              })

            interaction.reply({embeds: [embed1]}).then(() => {
                setTimeout(() => {
                    interaction.editReply({embeds: [embed2]})
                }, 3000)
            })
        }else {
            const embed3 = new Discord.EmbedBuilder()
            .setTitle(`💀 VOCÊ SOBREVIVEU! 💀`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor("#00FF00")
            .setDescription(`${interaction.user} felizmente você sobreviveu`)
            .setTimestamp()
            .setFooter({
                text: "Desenvolvido por: kevinfinalboss",
                iconURL:
                  "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
              })

            interaction.reply({embeds: [embed1]}).then(() => {
                setTimeout(() => {
                    interaction.editReply({embeds: [embed3]})
                }, 3000)
            })
        }

    }
}