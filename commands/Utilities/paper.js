const { RockPaperScissors } = require("discord-gamecord")
const Discord = require("discord.js")

module.exports = {
    name: "game",
    description: "Jogue pedra, papel ou tesoura com alguém",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [

        {
            name: "oponente",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Mencione um usuário para jogar contra.",
            required: true
        }

    ],

    run: async (client, interaction, args) => {

        let user = interaction.options.getUser('oponente');

        new RockPaperScissors({
            message: interaction,
            slash_command: true,
            opponent: user,

            embed: {
                title: '[PEDRA | PAPEL | TESOURA]',
                description: 'Clique em um botão para jogar.',
                color: "Random",
            },
            
            buttons: {
                pedra: 'Pedra',
                papel: 'Papel',
                tesoura: 'Tesoura',
            },

            emojis: {
                pedra: '🗿',
                papel: '📃',
                tesoura: '✂️',
            },

            othersMessage: 'Você não possui permissão para utilizar este botão!',
            chooseMessage: 'Você escolheu {emoji}!',
            noChangeMessage: 'Você não pode alterar sua escolha! ✋',
            askMessage: 'Eii {opponent}, {challenger} desafiou você para jogar pedra, papel ou tesoura! 🤜🤛',
            cancelMessage: 'Parece que o pedido foi recusado. 😔',
            timeEndMessage: 'O jogo foi cancelado, pois não obtive uma resposta! 🤷‍♀️',
            drawMessage: 'Foi um empate! 😱',
            winMessage: '{winner} Venceu o jogo! 🏆',
            gameEndMessage: 'O jogo não pode ser encerrado! 😢',
        }).startGame();

    }
};