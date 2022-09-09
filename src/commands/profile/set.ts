import {
  ActionRowBuilder,
  CommandInteraction,
  CommandInteractionOption,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputModalData,
  TextInputStyle,
} from 'discord.js';
import { Logger } from '../../log';
import { Database } from '../../database/database';

export const SET_COMMAND_NAME = 'set';
export const SET_DESCRIPTION_MODAL_ID = 'descriptionInput';

export enum SET_SUB_COMMAND_OPTIONS {
  NAME = 'name',
  AGE = 'age',
  MAIL = 'mail',
  LINKED_IN = 'linkedin',
  DESCRIPTION = 'description',
}

const logger = Logger.for('SET PROFILE');

export async function processSetProfile(
  interaction: CommandInteraction,
  options?: CommandInteractionOption<any>[]
): Promise<any> {
  logger.log(
    `User ${interaction.user.username} with options : ${options?.map(
      (opt) => opt.name
    )}`
  );
  logger.debug(
    `User ${JSON.stringify(interaction.user)} - Options ${JSON.stringify(
      options
    )}`
  );

  if (!options || options.length === 0) {
    return interaction.reply('Nothing to do ! Perfect :)');
  }

  let hasUpdateOption = false;
  let hasDescriptionOption = false;

  let user = await Database.intance.getUserById(interaction.user.id);
  if (!user) {
    user = { id: interaction.user.id };
  }

  for (let option of options) {
    if (!option.value) continue;

    switch (option.name) {
      case SET_SUB_COMMAND_OPTIONS.NAME:
        user.name = option.value as string;
        hasUpdateOption = true;
        break;
      case SET_SUB_COMMAND_OPTIONS.AGE:
        user.age = option.value as number;
        hasUpdateOption = true;
        break;
      case SET_SUB_COMMAND_OPTIONS.MAIL:
        user.mail = option.value as string;
        hasUpdateOption = true;
        break;
      case SET_SUB_COMMAND_OPTIONS.LINKED_IN:
        user.linkedIn = option.value as string;
        hasUpdateOption = true;
        break;
      case SET_SUB_COMMAND_OPTIONS.DESCRIPTION:
        hasDescriptionOption = true;
        await openDialogSetDescription(interaction);
        break;
    }
  }

  await Database.intance.updateUser(user);

  if (!hasDescriptionOption && hasUpdateOption) {
    return interaction.reply('Profile updated !');
  }
}

export async function openDialogSetDescription(
  interaction: CommandInteraction
): Promise<void> {
  const modal = new ModalBuilder()
    .setCustomId(SET_DESCRIPTION_MODAL_ID)
    .setTitle('Update description');

  const user = await Database.intance.getUserById(interaction.user.id);

  const textInput = new TextInputBuilder()
    .setCustomId(SET_DESCRIPTION_MODAL_ID)
    .setLabel('Description')
    .setStyle(TextInputStyle.Paragraph);

  if (user?.description) {
    textInput.setValue(user.description);
  }
  const descriptionActionRow =
    new ActionRowBuilder<TextInputBuilder>().addComponents([textInput]);

  modal.addComponents(descriptionActionRow);
  return interaction.showModal(modal);
}

export async function updateDescription(interaction: ModalSubmitInteraction) {
  logger.log(`User ${interaction.user.username} description`);

  const descriptionField = interaction.fields.getTextInputValue(
    SET_DESCRIPTION_MODAL_ID
  );
  if (!descriptionField) {
    logger.error('No field "descriptionInput" found in modal submit');
    return;
  }

  let user = await Database.intance.getUserById(interaction.user.id);
  if (!user) {
    user = { id: interaction.user.id };
  }

  user.description = descriptionField;

  await Database.intance.updateUser(user);
  interaction.reply('Profile updated !');
}
