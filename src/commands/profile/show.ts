import {
  CommandInteraction,
  CommandInteractionOption,
  MessageEmbed,
} from 'discord.js';

export const SHOW_COMMAND_NAME = 'show';

export enum SHOW_SUB_COMMAND_OPTIONS {
  USER = 'user',
}

export function showUserProfile(
  interaction: CommandInteraction,
  options?: CommandInteractionOption<any>[]
) {
  const mentionnedUsed =
    options &&
    options.length === 1 &&
    options[0].name === SHOW_SUB_COMMAND_OPTIONS.USER
      ? options[0].user
      : interaction.user;
  if (!mentionnedUsed) {
    interaction.reply('User not found !');
    return;
  }
  // TODO get user profile from db

  const user = {
    name: 'MyUser',
    age: 99,
    mail: 'test@litestve.fr',
    linkedIn: 'https://www.linkedin.com/in/nopenope',
    description: `First line description
    SecondLine
    ThridLine`,
  };

  const userAvatar = mentionnedUsed.avatarURL({});

  const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${user.name} profile`);

  if (userAvatar) {
    exampleEmbed.setThumbnail(userAvatar);
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

  exampleEmbed.setDescription(buildDescription);

  exampleEmbed.setTimestamp().setFooter({
    text: 'Provided by Exasky',
    iconURL: 'https://avatars.githubusercontent.com/u/3509642?v=4',
  });

  interaction.reply({ embeds: [exampleEmbed] });
}
