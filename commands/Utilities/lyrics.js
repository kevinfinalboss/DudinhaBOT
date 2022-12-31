const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const lyricsFinder = require("lyrics-finder");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("lyrics")
      .setDescription("Exibe a letra de uma música")
      .addStringOption((options) =>
        options
          .setName("song")
          .setDescription("Qual é a música?")
          .setRequired(true)
      )
      .addStringOption((options) =>
        options
          .setName("artist")
          .setDescription("Quem é o artista dessa música?")
          .setRequired(true)
      ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
      const song = interaction.options.getString("song");
      const artist = interaction.options.getString("artist");
  
      lyricsFinder(artist, song)
        .then((lyrics) => {
          const lyricsembed = new EmbedBuilder()
            .setDescription(lyrics)
            .setTitle(`Aqui está sua letra para **${song}**!`)
            .setTimestamp()
  
            .setAuthor({
              name: `${interaction.member.user.tag}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setColor("Green")
            .addFields(
              {
                name: "Artista:",
                value: `\`\`\`${artist}\`\`\``,
              },
              {
                name: "Musica:",
                value: `\`\`\`${song}\`\`\``,
              }
            );
  
          interaction.reply({
            embeds: [lyricsembed],
            ephemeral: false, 
            
          });
        })
        .catch((error) => {
          const errorEmbed = new EmbedBuilder()
            .setTitle("⛔ Erro ao executar o comando")
            .setColor("Red")
            .setImage(
              "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
            );
  
          return interaction.reply({
            embeds: [
              errorEmbed.addFields(
                {
                  name: "User:",
                  value: `\`\`\`${interaction.user.username}\`\`\``,
                },
                {
                  name: "Reasons:",
                  value: `\`\`\`Música não encontrada! Tente novamente!\`\`\``,
                }
              ),
            ],
            ephemeral: true,
          });
        });
    },
  };