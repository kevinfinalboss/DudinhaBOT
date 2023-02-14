const Discord = require('discord.js');

module.exports = {

    name: 'invites',
    description: 'Ver quantos convites o usuário pussui',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuario',
            description: 'O usuário do qual você deseja verificar os convites.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        }

    ],

    run: async (client, interaction, message) => {

        const user = interaction.options.getUser('usuario');

        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);

        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const embed = new Discord.EmbedBuilder()
            .setColor(0x2f3136)
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setTitle("Contagem de convites do usuário")
            .setDescription(`${user.tag} possui **${i}** convites.`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}