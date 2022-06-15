import { Client, Intents } from 'discord.js';
import { processProfileCommand } from './commands/profile/profile';
import {
  SET_DESCRIPTION_MODAL_ID,
  updateDescription,
} from './commands/profile/set';
require('dotenv').config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === 'profile') {
      await processProfileCommand(interaction);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === SET_DESCRIPTION_MODAL_ID) {
      updateDescription(interaction);
    }
  }
});

client.login(process.env.TOKEN);
