import {
  CREATE_FEEDBACK_CLICKED,
  FEEDBACK_DIALOG_CLOSING,
  MOOD_SELECTED,
  EDIT_FEEDBACK_CLICKED,
} from '../../../utils/constants';

function feedbackDialogReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_FEEDBACK_CLICKED:
      return {
        ...state,
        modalIsOpen: true,
        mode: 'create',
        feedback: {
          comment: '',
          glad: 1.0
        },
        commentText: '',
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
          glad: action.payload.glad
        }
      };

    case EDIT_FEEDBACK_CLICKED:
      return {
        ...state,
        modalIsOpen: true,
        mode: 'update',
        feedback: action.payload.feedback,
        commentText: action.payload.feedback.comment,
      };

    default:
      return { ...state };
  }
}

export default feedbackDialogReducer;
