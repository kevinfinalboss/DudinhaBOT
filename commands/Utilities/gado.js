const Discord = require('discord.js');

module.exports = {
    name: 'gado',
    description: 'Veja a porcetagem de gadisse de um user.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Mencione um membro.',
            type: 6,
            required: false,
        }
    ],
    cooldown: 3000,
    run: async (client, interaction, args) => {

        let pessoa = interaction.options.getUser('user') || interaction.user;

        const porcentagem = Math.floor(Math.random() * 100) 

let embedin = new Discord.EmbedBuilder()
    .setTitle(`Medidor de gadisse`)
    .setDescription(`🐂 ${pessoa} é \`${porcentagem}\`% Gado(a)...`)
    .setColor('Random')
    .setThumbnail('https://i.imgur.com/Z4xtqih.jpg')
    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true})})
    .setTimestamp(new Date());

    interaction.reply({embeds: [embedin]});

    
}};