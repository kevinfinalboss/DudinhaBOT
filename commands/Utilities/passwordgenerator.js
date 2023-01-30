const Discord = require('discord.js')
const generator = require('generate-password')

module.exports = {
    name: "gerar-senha",
    description: "Gere uma senha",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "caracteres",
            description: "Você quer uma senha de quantas caracteres?",
            type: Discord.ApplicationCommandOptionType.Number,
            require: true
        },
    ],

    run: async (client, interaction) => {
        
        let caracteres = interaction.options.getNumber("caracteres")
        let senha = generator.generate({
            length: `${caracteres}`,
            numbers: true,
            symbols: true
        });


        const mensagem = new Discord.EmbedBuilder()
        .setTitle("Gerador de senha perfeito.")
        .setDescription(`O usuário ${interaction.user} gerou uma senha!.`)
        .setColor('Random')
        .setFooter({
            text: "Desenvolvido por: kevinfinalboss",
            iconURL:
                "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
        })
        .setTimestamp()

        const enviado = new Discord.EmbedBuilder()
        .setTitle("Senha gerada.")
        .setDescription(`Olá ${interaction.user}, sua senha gerada foi essa:
        ${senha}`)
        .setFooter({
            text: "Desenvolvido por: kevinfinalboss",
            iconURL:
                "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
        })
        .setTimestamp()

        interaction.reply({embeds: [mensagem]})
        interaction.user.send({embeds: [enviado]})
    }

}