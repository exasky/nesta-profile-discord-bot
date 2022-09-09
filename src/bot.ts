import { Client, GatewayIntentBits } from 'discord.js';
import {
  processProfileCommand,
  PROFILE_COMMAND_NAME,
} from './commands/profile/profile';
import {
  SET_DESCRIPTION_MODAL_ID,
  updateDescription,
} from './commands/profile/set';
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === PROFILE_COMMAND_NAME) {
      await processProfileCommand(interaction);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === SET_DESCRIPTION_MODAL_ID) {
      await updateDescription(interaction);
    }
  }
});

client.login(process.env.TOKEN);
