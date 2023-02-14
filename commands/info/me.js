const Canvas = require("canvas");
const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "perfil",
    description: "Informações do usuario",
    type: Discord.ApplicationCommandOptionType.ChatInput,
    options: [
        {
            name: 'usuario',
            description: 'usuario a ver as informações',
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    run: async (client, interaction) => {




        let member = interaction.options.getUser("usuario") || interaction.user;
        let user = interaction.guild.members.cache.get(member.id)
        let avatarURL = member.avatarURL({ extension: 'png', dynamic: true, size: 2048 });
        let min = await db.get(`aboutme_${member.id}`)
        interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle(`⚙ - Processando`)
                    .setColor('Random')
                    .setFooter({
                        text: "Desenvolvido por: kevinfinalboss",
                        iconURL:
                            "https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4",
                    })
                    .setTimestamp()
            ]
        });
        if (min === null) {

            min = 'use /sobremim para definir isso'
        }

        let money = await db.get(`money_${member.id}`) || 0

        let nome = await db.get(`username_${member.id}`)

        let bank = await db.get(`bank_${member.id}`) || 0;


        if (nome === null) {

            nome = member.username;

        } else {

            nome = `${nome} (${member.username})`

        }




        let perfil1 = await db.get(`${user.id}_perfil.confi_perfil`)
        if (perfil1 === undefined) perfil1 = 'https://imgur.com/rz7Doar.png'



        const canvas = Canvas.createCanvas(850, 500);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(perfil1);


        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);



        ctx.strokeStyle = '#0066FF';

        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.textAlign = "left";

        ctx.font = '40px arial';

        ctx.fillStyle = "rgb(253, 255, 252)";

        ctx.fillText(`${nome}`, 190, 60);

        ctx.textAlign = "left";

        ctx.font = '32px arial';

        ctx.fillStyle = "rgb(253, 255, 252)";


        ctx.fillText(`Money: 
        ${money.toLocaleString()}`, 190, 100)

        ctx.textAlign = "left";

        ctx.font = '32px arial';

        ctx.fillStyle = "rgb(253, 255, 252)";

        ctx.fillText(`Bank:
        ${bank}`, 550, 100)

        ctx.textAlign = "left";

        ctx.font = '32px arial';

        ctx.fillStyle = "rgb(253, 255, 252)";

        ctx.fillText(`${min}`, 10, 400);



        ctx.arc(100, 80, 65, 0, Math.PI * 2, true);

        ctx.strokeStyle = "#0066FF";

        ctx.lineWidth = 6;

        ctx.stroke();

        ctx.closePath();

        ctx.clip();

        const avatar = await Canvas.loadImage(avatarURL);
        ctx.drawImage(avatar, 15, 10, 175, 175);
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), perfil1);

        interaction.editReply({ content: (" "), files: [attachment] });

    }
}