import { CommandInteraction, MessageEmbed } from 'discord.js';

export const SHOW_COMMAND_NAME = 'show';

export enum SHOW_SUB_COMMAND_OPTIONS {
  USER = 'user',
}

export function showUserProfile(interaction: CommandInteraction) {
  // TODO get user profile from db
  const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({
      name: 'Some name',
      iconURL: 'https://i.imgur.com/AfFp7pu.png',
      url: 'https://discord.js.org',
    })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true }
    )
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({
      text: 'Some footer text here',
      iconURL: 'https://i.imgur.com/AfFp7pu.png',
    });
  interaction.reply({ embeds: [exampleEmbed] });
}
