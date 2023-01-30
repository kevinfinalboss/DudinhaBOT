const Discord = require("discord.js");

module.exports = {
    name: 'banlist',
    description: 'Lista de banidos do servidor.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.guild) {
            return interaction.reply({
                ephemeral: true,
                content: `:x: *| ${interaction.user.tag}, Este comando só pode ser usado em um servidor :) *`
            })
        } else {
            if (!interaction.channel.permissionsFor(interaction.user).has(Discord.PermissionFlagsBits.BanMembers)) {
                return interaction.reply({
                    content: `**:x: | ${interaction.user}, Você precisa da permissão \`BAN_MEMBERS\` para usar este comando!**`,
                    ephemeral: true,
                })
            } else {
                if (!interaction.channel.permissionsFor(interaction.client.user).has(Discord.PermissionFlagsBits.BanMembers)) {
                    return interaction.reply({
                        content: `**:x: | ${interaction.user}, Eu preciso da permissão \`BAN_MEMBERS\` para usar este comando!**`,
                        ephemeral: true,
                    })
                } else {
                    try {
                        let fetchBans = interaction.guild.bans.fetch();
                        let banMembers = (await fetchBans)
                            .map((member) => member.user.tag)
                            .join("\n")

                        if (!banMembers) {
                            return interaction.reply({
                                content: `:x: *| ${interaction.user.tag}, Eu procurei em todo lugar, mas eu não encontrei nenhum membro banido.*`,
                                ephemeral: true
                            })
                        } else {
                            interaction.reply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setColor(client.config.yullacor)
                                        .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                        .setDescription(`\`\`\`yaml\n${banMembers}\n\`\`\``)
                                ], ephemeral: true
                            })
                        }
                    } catch (e) {
                        interaction.reply({
                            ephemeral: true,
                            content: `:x: *| ${interaction.user.tag}, Ocorreu um erro inesperado ao tentar pegar a lista de banimentos...`
                        })
                    }
                }
            }
        }
    }
}