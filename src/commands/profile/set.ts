import {
  BaseCommandInteraction,
  CommandInteraction,
  CommandInteractionOption,
  MessageActionRow,
  Modal,
  ModalActionRowComponent,
  ModalSubmitInteraction,
  TextInputComponent,
} from 'discord.js';
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

export async function processSetProfile(
  interaction: CommandInteraction,
  options?: CommandInteractionOption<any>[]
): Promise<void> {
  if (!options || options.length === 0) {
    return interaction.reply('Nothing to do ! Perfect :)');
  }

  let hasUpdateOption = false;
  let hasDescriptionOption = false;

  let user = Database.intance.getUserById(interaction.user.id);
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

  Database.intance.updateUser(user);

  if (!hasDescriptionOption && hasUpdateOption) {
    return interaction.reply('Profile updated !');
  }
}

export function openDialogSetDescription(
  interaction: BaseCommandInteraction
): Promise<void> {
  const modal = new Modal()
    .setCustomId(SET_DESCRIPTION_MODAL_ID)
    .setTitle('Update description');

  const descriptionActionRow =
    new MessageActionRow<ModalActionRowComponent>().addComponents([
      new TextInputComponent()
        .setCustomId('descriptionInput')
        .setLabel('Description')
        .setStyle('PARAGRAPH'),
    ]);

  modal.addComponents(descriptionActionRow);
  return interaction.showModal(modal);
}

export function updateDescription(interaction: ModalSubmitInteraction) {
  let descriptionField = interaction.fields.getField('descriptionInput');
  if (!descriptionField) {
    console.error('No field "descriptionInput" found in modal submit');
    return;
  }

  let user = Database.intance.getUserById(interaction.user.id);
  if (!user) {
    user = { id: interaction.user.id };
  }

  user.description = descriptionField.value;

  Database.intance.updateUser(user);
  interaction.reply('Profile updated !');
}
