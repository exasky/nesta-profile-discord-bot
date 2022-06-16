import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DELETE_COMMAND_NAME } from './commands/profile/delete';
import { PROFILE_COMMAND_NAME } from './commands/profile/profile';
import {
  SET_COMMAND_NAME,
  SET_SUB_COMMAND_OPTIONS,
} from './commands/profile/set';
import {
  SHOW_COMMAND_NAME,
  SHOW_SUB_COMMAND_OPTIONS,
} from './commands/profile/show';
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
    .setName(PROFILE_COMMAND_NAME)
    .addSubcommand((subCommand) =>
      subCommand
        .setName(SHOW_COMMAND_NAME)
        .setDescription('Show profile of yourself or another user')
        .addUserOption((option) =>
          option
            .setName(SHOW_SUB_COMMAND_OPTIONS.USER)
            .setDescription('Profile of specific user')
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName(SET_COMMAND_NAME)
        .setDescription('Update your profile')
        .addStringOption((option) =>
          option
            .setName(SET_SUB_COMMAND_OPTIONS.NAME)
            .setDescription('Update your name')
        )
        .addIntegerOption((option) =>
          option
            .setName(SET_SUB_COMMAND_OPTIONS.AGE)
            .setDescription('Update your age')
        )
        .addStringOption((option) =>
          option
            .setName(SET_SUB_COMMAND_OPTIONS.MAIL)
            .setDescription('Update your email')
        )
        .addStringOption((option) =>
          option
            .setName(SET_SUB_COMMAND_OPTIONS.LINKED_IN)
            .setDescription('Update your linkedIn link')
        )
        .addBooleanOption((option) =>
          option
            .setName(SET_SUB_COMMAND_OPTIONS.DESCRIPTION)
            .setDescription(
              'If true, open modal to update your profile description'
            )
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName(DELETE_COMMAND_NAME)
        .setDescription('Delete your profile')
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
