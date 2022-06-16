import { CommandInteraction } from 'discord.js';
import { Logger } from '../../log';
import { Database } from '../../database/database';

export const DELETE_COMMAND_NAME = 'delete';

const logger = Logger.for('DELETE PROFILE');

export function deleteUserProfile(interaction: CommandInteraction) {
  logger.log(`User ${interaction.user.username}`);
  logger.debug(`User ${interaction.user}`);
  if (Database.intance.getUserById(interaction.user.id)) {
    Database.intance.deleteUserById(interaction.user.id);
    interaction.reply('Profile deleted !');
  } else {
    interaction.reply('No profile found !');
  }
}
