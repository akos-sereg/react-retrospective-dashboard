import {
  CONFIRMATION_DIALOG_CLOSING,
  CONFIRMATION_DIALOG_OPENING
} from '../../utils/constants';

function confirmationDialogReducer(state = {}, action) {
  switch (action.type) {
    case CONFIRMATION_DIALOG_OPENING:
      return {
        ...state,
        modalIsOpen: true,
        title: action.payload.title,
        text: action.payload.text,
        onConfirmed: action.payload.onConfirmed,
      };

    case CONFIRMATION_DIALOG_CLOSING:
      return {
        ...state,
        modalIsOpen: false,
      };

    default:
      return { ...state };
  }
}

export default confirmationDialogReducer;
