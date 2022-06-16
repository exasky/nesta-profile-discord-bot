import {
  CommandInteraction,
  CommandInteractionOption,
  MessageEmbed,
} from 'discord.js';
import { Logger } from '../../log';
import { Database } from '../../database/database';

export const SHOW_COMMAND_NAME = 'show';

export enum SHOW_SUB_COMMAND_OPTIONS {
  USER = 'user',
}

const logger = Logger.for('SHOW PROFILE');

export function showUserProfile(
  interaction: CommandInteraction,
  options?: CommandInteractionOption<any>[]
) {
  const mentionnedUser =
    options &&
    options.length === 1 &&
    options[0].name === SHOW_SUB_COMMAND_OPTIONS.USER
      ? options[0].user
      : interaction.user;
  if (!mentionnedUser) {
    interaction.reply('User not found !');
    return;
  }

  logger.log(`User ${mentionnedUser.username}`);
  logger.debug(
    `show profile for ${JSON.stringify(mentionnedUser)} by ${JSON.stringify(
      interaction.user
    )}`
  );

  const user = Database.intance.getUserById(mentionnedUser.id);

  if (!user) {
    interaction.reply('Profile not found !');
    return;
  }

  const userAvatar = mentionnedUser.avatarURL({});

  const messageEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${user.name} profile`);

  if (userAvatar) {
    messageEmbed.setThumbnail(userAvatar);
  }

  let buildDescription = '';

  if (user.age) {
    buildDescription += `:calendar: **Age :** ${user.age} ans\n`;
  }
  if (user.mail) {
    buildDescription += `:e_mail: **Mail :** ${user.mail}\n`;
  }
  if (user.linkedIn) {
    buildDescription += `:link: **LinkedIn :** ${user.linkedIn}\n`;
  }
  if (user.description) {
    buildDescription += `\n:speech_left: **Description :** ${user.description}\n`;
  }

  messageEmbed.setDescription(buildDescription);

  messageEmbed.setTimestamp().setFooter({
    text: 'Provided by Exasky',
    iconURL: 'https://avatars.githubusercontent.com/u/3509642?v=4',
  });

  interaction.reply({ embeds: [messageEmbed] });
}
