const Discord = require('discord.js');
const Client = require('../../index.js');
const Canvas = require('canvas');

async function AI(prompt, value) {
    if (!prompt) throw new Error('Nenhum prompt fornecido');
    if (prompt.length < 5) throw new Error('O prompt fornecido é muito curto');

    const Imagem = Canvas.createCanvas(1024, 1024);
    const Contexto = Imagem.getContext('2d');

    let Números = [0, 1, 2, 3];
    if (value) {
        let Vez = 3;
        while (Vez >= 0) {
            Números[Vez] += Math.floor(Math.random() * 100);
            Vez--;
        }
    }

    let [A, B, C, D] = await Promise.all([
        Canvas.loadImage(`https://image.pollinations.ai/prompt/${encodeURI(prompt)}_${Números[0]}`),
        Canvas.loadImage(`https://image.pollinations.ai/prompt/${encodeURI(prompt)}_${Números[1]}`),
        Canvas.loadImage(`https://image.pollinations.ai/prompt/${encodeURI(prompt)}_${Números[2]}`),
        Canvas.loadImage(`https://image.pollinations.ai/prompt/${encodeURI(prompt)}_${Números[3]}`),
    ]);

    Contexto.drawImage(A, 0, 0, 575, 575);
    Contexto.drawImage(B, 512, 0, 575, 575);
    Contexto.drawImage(C, 0, 512, 575, 575);
    Contexto.drawImage(D, 512, 512, 575, 575);

    return Imagem;
}

module.exports = {
    name: "imagineimg",
    description: "[NSFW] Gere imagens através de textos.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "conteúdo",
            description: "Conteúdo a ser produzido.",
            type: 3,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        await interaction.reply({ content: "Aguarde, estou processando sua solicitação." });
        let Conteúdo = interaction.options.getString('conteúdo');
        if (Conteúdo.length < 5) return interaction.editReply({ content: "Conteúdo curto demais, tente utilizar outro contexto." })

        try {
            AI(Conteúdo).then(response => {
                let Embed = new Discord.EmbedBuilder().setThumbnail(interaction.user.displayAvatarURL()).setColor('Random').addFields(
                    { name: "Autor", value: `${interaction.user} (${interaction.user.id})` },
                    { name: "Contexto", value: `\`${Conteúdo}\`` }
                );

                let Menu = new Discord.ActionRowBuilder().addComponents(new Discord.StringSelectMenuBuilder().setCustomId('Salvar').setPlaceholder('Clique para selecionar uma opção.').addOptions(
                    { label: "Salvar: 1", emoji: "🖼️", value: "0" },
                    { label: "Salvar: 2", emoji: "🖼️", value: "1" },
                    { label: "Salvar: 3", emoji: "🖼️", value: "2" },
                    { label: "Salvar: 4", emoji: "🖼️", value: "3" },
                    { label: "Refazer", emoji: "🔃", value: "REMAKE" }
                ));

                interaction.editReply({ content: " ", embeds: [Embed], components: [Menu], files: [{ attachment: response.toBuffer(), name: 'SPOILER_IMAGE.jpg' }] })
            });
        } catch (err) {
            console.log(err);
            return interaction.editReply({ content: "Ocorreu um erro ao processar sua solicitação, talvez ela contenha conteúdo bloqueado." });
        };
    }
};

Client.once("interactionCreate", async interaction => {
    if (interaction.customId != 'Salvar') return;
    else {
        try {
            let Selecionado = interaction.values[0];
            let Embed = new Discord.EmbedBuilder().setColor('Green').setTitle('Imagem ampliada').setDescription('Salve-a através do anexo exibido abaixo.');
            let Contexto = encodeURI((interaction.message.embeds[0].fields[1].value.slice(1, -1)));

            if (Selecionado === 'REMAKE') {
                interaction.deferReply({ ephemeral: true });
                return AI(Contexto, true).then(response => {
                    interaction.editReply({ content: " ", files: [{ attachment: response.toBuffer(), name: 'SPOILER_IMAGE.jpg', ephemeral: true }] });
                });
            };

            switch (Selecionado) {
                case '0':
                    Embed.setImage(`https://image.pollinations.ai/prompt/${Contexto}_0`);
                    break;
                case '1':
                    Embed.setImage(`https://image.pollinations.ai/prompt/${Contexto}_1`);
                    break;
                case '2':
                    Embed.setImage(`https://image.pollinations.ai/prompt/${Contexto}_2`);
                    break;
                case '3':
                    Embed.setImage(`https://image.pollinations.ai/prompt/${Contexto}_3`);
                    break;
            };

            await interaction.reply({ embeds: [Embed], ephemeral: true });
        } catch (err) {
            console.log(err);
            return interaction.editReply({ content: "Ocorreu um erro ao processar sua solicitação, talvez ela contenha conteúdo bloqueado." });
        };
    };
});
