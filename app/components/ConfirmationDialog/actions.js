import { CONFIRMATION_DIALOG_CLOSING, CONFIRMATION_DIALOG_OPENING } from '../../utils/constants';

const confirmationDialogClosing = () => ({
  type: CONFIRMATION_DIALOG_CLOSING,
  payload: { }
});

const confirmationDialogOpening = (title, text, onConfirmed) => ({
  type: CONFIRMATION_DIALOG_OPENING,
  payload: { title, text, onConfirmed }
});

export { confirmationDialogClosing, confirmationDialogOpening };
