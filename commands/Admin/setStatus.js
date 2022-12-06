const Discord = require("discord.js");

module.exports = {
    name: "setstatus",
    description: "Defina o status do bot",
    options: [
        {
            name: "status",
            description: "Defina o status do BOT (online, idle, dnd, invisible)",
            type: Discord.ApplicationCommandOptionType.String,
            require: true,
        },
        {
            name: "descrição",
            description: "Defina a descrição do BOT",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    run: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
                return interaction.reply({ content: `Você não tem permissão para utilizar esse comando`, ephemeral: true })
            }
            let status = interaction.options.getString("status")
            client.user.setStatus(`${status}`);

            let desc = interaction.options.getString("descrição")
            client.user.setPresence({
                activities: [{
                    name: desc
                }],
            });

            let ryan = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`
            **Status Updated**
            Olá ${interaction.user},
            **O meu status é a minha descrição foram alteradas com sucesso. ( ✅ )**
            Status: \`${status}\`
            Descrição: \`${desc}\``)
            .setFooter({
                text: `Comando requisitado por: ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL({ format: "png" }) });
            interaction.reply({ embeds: [ryan], ephemeral: true }).then(m => {

            })
        } catch (e) {
            console.log(e)
        }

    }
}