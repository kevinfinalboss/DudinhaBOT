const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'reminder', 
    description: 'lembrete', 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "time",
            description: "Selecione o tempo para o lembrete.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async(client, interaction) => {
        const time = interaction.options.getString("time")
        const timerC = ms(time)
        const timerR = ~~((Date.now() + timerC) / 1000)

        await interaction.reply(`**Olá ${interaction.user.username}!** lembrete setado com sucesso para acabar <t:${timerR}:R>`)

        setTimeout(async function () {
            await interaction.followUp(`Oi ${interaction.user}, só vim avisar sobre seu lembrete mesmo...`)
        }, ms (time))

    }
}