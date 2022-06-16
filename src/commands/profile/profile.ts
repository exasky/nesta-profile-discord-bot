import { CommandInteraction } from 'discord.js';
import { deleteUserProfile, DELETE_COMMAND_NAME } from './delete';
import { processSetProfile, SET_COMMAND_NAME } from './set';
import { showUserProfile, SHOW_COMMAND_NAME } from './show';

export const PROFILE_COMMAND_NAME = 'profile';

export async function processProfileCommand(interaction: CommandInteraction) {
  const interactionSubcommands = interaction.options.data;
  if (interactionSubcommands.length !== 1) return;

  switch (interactionSubcommands[0].name) {
    case SET_COMMAND_NAME:
      await processSetProfile(interaction, interactionSubcommands[0].options);
      break;
    case SHOW_COMMAND_NAME:
      showUserProfile(interaction, interactionSubcommands[0].options);
      break;
    case DELETE_COMMAND_NAME:
      deleteUserProfile(interaction);
      break;
  }
}
