const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'githubprofile',
    description: 'Consulta informações de um perfil do GitHub',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'username',
            description: 'Digite o nome de usuário do GitHub.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run(client, interaction) {
        let username;
        try {
            username = interaction.options.getString('username');
        } catch (error) {
            interaction.reply('Ocorreu um erro ao obter o nome de usuário do GitHub.');
            return;
        }

        try {
            const info = await fetch(`https://api.github.com/users/${username}`)
                .then(res => res.json())
                .catch(error => {
                    console.error(error);
                    interaction.reply('Ocorreu um erro ao realizar a requisição de informações do perfil do GitHub.');
                    return;
                });

            if (!info) {
                interaction.reply('Não foi possível obter informações sobre o perfil do GitHub.');
                return;
            }

            const url = encodeURI(
                `https://github.com/${username}`)
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`💻 - Informações do perfil do GitHub`)
                        .addFields(
                            { name: 'Nome', value: info.name ? `[${info.name}](${url})` : "Não informado", inline: false },
                            { name: 'Email:', value: info.email ? info.email : "Não informado", inline: false },
                            { name: 'Biografia', value: info.bio ? info.bio : "Não informado", inline: false },
                            { name: 'Localização', value: info.location ? info.location : "Não informado", inline: false },
                            { name: 'Empresa', value: info.company ? info.company : "Não informado", inline: false },
                            { name: 'Seguidores', value: info.followers.toString(), inline: false },
                            { name: 'Seguindo', value: info.following.toString(), inline: false },
                            { name: 'Repositórios Públicos', value: info.public_repos.toString(), inline: false },
                            { name: 'Twitter', value: info.twitter_username ? info.email : "Não informado", inline: false },

                        )
                        .setThumbnail(info.avatar_url)
                        .setColor('Random')
                        .setFooter({
                            text: "Desenvolvido por: kevinfinalboss",
                            iconURL:
                                "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                        })
                        .setTimestamp()
                ]
            });
        } catch (error) {
            console.error(error);
            interaction.reply('Ocorreu um erro ao tentar obter as informações do perfil.');
        }
    }
};