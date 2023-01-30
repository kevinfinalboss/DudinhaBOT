const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'lembrete',
    description: 'Me faça lembrar você de fazer algo!',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "tempo",
            description: "Selecione o tempo para o lembrete.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
          },
          {
            name: "motivo",
            description: "Selecione o tempo para o lembrete.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async(client, interaction) => {
        const motivo = interaction.options.getString("motivo")
        const tempo = interaction.options.getString("tempo")
        const tempoC = ms(tempo)
        const tempoR = ~~((Date.now() + tempoC) / 1000)

            const embedS = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`**Olá, ${interaction.user}!** Lembrete setado com sucesso para acabar <t:${tempoR}:R>.`)
                .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) });

            const embedL = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`**Opa, ${interaction.user}!** Vim alertar-te sobre seu lembrete! Você pediu para ser lembrado sobre: \`${motivo}\`.`)
                .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) });
      
      
        interaction.reply({ embeds: [embedS] })
        setTimeout(async function () {
        await interaction.followUp({ embeds: [embedL] })
        }, ms (tempo))

    }
}
