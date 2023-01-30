const { ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const config = require("../../config.json")

module.exports = {
    name: 'chat',
    description: 'Pergunte algo a openai',

    options: [
        {
            name: "input",
            description: "O que você está se perguntando?",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
   run: async(client, interaction) => {
     
    const prompt = interaction.options.getString('input');
    await interaction.deferReply({ content: "Deixe-me pensar..." })

    const configuration = new Configuration({
      apiKey:  config.api,
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    let responseMessage = '> ' + prompt + response.data.choices[0].text;
    if (responseMessage.length >= 2000) {
      const attachment = new AttachmentBuilder(Buffer.from(responseMessage, 'utf-8'), { name: 'response.txt' });
      await interaction.editReply({ files: [attachment] })
    } else {
      await interaction.editReply(responseMessage);    
    }
  },
};