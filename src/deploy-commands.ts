import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import {
  SlashCommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
require('dotenv').config();

if (!process.env.TOKEN) {
  throw new Error('Token not defined');
}
if (!process.env.CLIENT_ID) {
  throw new Error('Token not defined');
}
if (!process.env.GUILD_ID) {
  throw new Error('Token not defined');
}

const commands: any[] = [
  new SlashCommandBuilder()
    .setName('profile')
    .addSubcommand((subCommand) =>
      subCommand
        .setName('show')
        .setDescription('Show profile of yourself or another user')
        .addUserOption((option) =>
          option.setName('user').setDescription('Profile of specific user')
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName('set')
        .setDescription('Update your profile')
        .addStringOption((option) =>
          option.setName('name').setDescription('Update your name')
        )
        .addIntegerOption((option) =>
          option.setName('age').setDescription('Update your age')
        )
        .addStringOption((option) =>
          option.setName('mail').setDescription('Update your email')
        )
        .addStringOption((option) =>
          option.setName('linkedin').setDescription('Update your linkedIn link')
        )
        .addBooleanOption((option) =>
          option
            .setName('modal')
            .setDescription(
              'Open modal to update your profile (bypass all others options)'
            )
        )
    )
    .setDescription('Interact with profiles !'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
