import {
  CREATE_FEEDBACK_CLICKED,
  FEEDBACK_DIALOG_CLOSING,
  MOOD_SELECTED
} from '../../utils/constants';

function feedbackDialogReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_FEEDBACK_CLICKED:
      return {
        ...state,
        modalIsOpen: true,
        feedback: {
          ...state.feedback,
          mood: 'glad'
        }
      };

    case FEEDBACK_DIALOG_CLOSING:
      return {
        ...state,
        modalIsOpen: false,
      };

    case MOOD_SELECTED:
      return {
        ...state,
        feedback: {
          ...state.feedback,
          mood: action.payload.mood
        }
      };

    default:
      return { ...state };
  }
}

export default feedbackDialogReducer;
