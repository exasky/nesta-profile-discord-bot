import { Client, Intents, MessageEmbed } from "discord.js";
require('dotenv').config();

const client = new Client(
  { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }
);

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`)
})

client.on("messageCreate", msg => {
  console.log(msg);
  if (msg.content === "ping") {
    const exampleEmbed = new MessageEmbed()
          	.setColor('#0099ff')
          	.setTitle('Some title')
          	.setURL('https://discord.js.org/')
          	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
          	.setDescription('Some description here')
          	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
          	.addFields(
          		{ name: 'Regular field title', value: 'Some value here' },
          		{ name: '\u200B', value: '\u200B' },
          		{ name: 'Inline field title', value: 'Some value here', inline: true },
          		{ name: 'Inline field title', value: 'Some value here', inline: true },
          	)
          	.addField('Inline field title', 'Some value here', true)
          	.setImage('https://i.imgur.com/AfFp7pu.png')
          	.setTimestamp()
          	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    msg.reply({ embeds: [exampleEmbed] });
  }
})

client.login(process.env.TOKEN);
