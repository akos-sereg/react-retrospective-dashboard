import { CREATE_FEEDBACK_CLICKED, FEEDBACK_DIALOG_CLOSING } from '../../utils/constants';

function feedbackDialogReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_FEEDBACK_CLICKED:
      return {
        ...state,
        modalIsOpen: true,
      };

    case FEEDBACK_DIALOG_CLOSING:
      return {
        ...state,
        modalIsOpen: false,
      };

    default:
      return { ...state };
  }
}

export default feedbackDialogReducer;
