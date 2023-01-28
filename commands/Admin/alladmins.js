const { PermissionFlagsBits, EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = {

    name: "deuses",
    description: "Mostra todos os deuses do servidor",
    permission: PermissionFlagsBits.Administrator,
    dm: false,
    exemple: "todos",
    category: "Administrador",
    cooldown: 5,

    async run(client, interaction, args) {

        let strFilter = interaction.guild.members.cache.filter(member => member.permissions.has(PermissionsBitField.Flags.Administrator))
        let strMap = strFilter.map(m => `> \`${m.user.id}\` - ${m.user}`).join("\n")

        for (let i = 0; i < strMap.length; i += 1995) {

            let strContent = strMap.substring(i, Math.floor(strMap.length, i + 1995));

            let embed = new EmbedBuilder()
                .setColor("White")
                .setThumbnail(`${client.user.avatarURL()}`)
                .setTitle("Lista de membros com a permissão de  \`Administrador\`")
                .setDescription(`Número de membros com permissão : \`${strFilter.size}\``)
                .addFields(
                    { name: `Lista :`, value: `${strContent}` }
                )
                .setTimestamp()

            await interaction.reply({ embeds: [embed] })
        }

    }
}