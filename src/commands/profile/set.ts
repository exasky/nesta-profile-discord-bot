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

  let hasDescriptionOption = false;
  // TODO set user profile values in db
  for (let option of options) {
    switch (option.name) {
      case SET_SUB_COMMAND_OPTIONS.NAME:
      case SET_SUB_COMMAND_OPTIONS.AGE:
      case SET_SUB_COMMAND_OPTIONS.MAIL:
      case SET_SUB_COMMAND_OPTIONS.LINKED_IN:
        break;
      case SET_SUB_COMMAND_OPTIONS.DESCRIPTION:
        hasDescriptionOption = true;
        await openDialogSetDescription(interaction);
        break;
    }
  }

  if (!hasDescriptionOption) {
    interaction.reply('Profile updated !');
  }
}

export function openDialogSetDescription(
  interaction: BaseCommandInteraction
): Promise<void> {
  const modal = new Modal()
    .setCustomId('updateProfilDescription')
    .setTitle('Update description');

  const descriptionActionRow =
    new MessageActionRow<ModalActionRowComponent>().addComponents([
      new TextInputComponent()
        .setCustomId(SET_DESCRIPTION_MODAL_ID)
        .setLabel('Description')
        .setStyle('PARAGRAPH'),
    ]);

  modal.addComponents(descriptionActionRow);
  return interaction.showModal(modal);
}

export function updateDescription(interaction: ModalSubmitInteraction) {
  // TOTO update user description the show user profile (or just say 'ok description updated')
}
