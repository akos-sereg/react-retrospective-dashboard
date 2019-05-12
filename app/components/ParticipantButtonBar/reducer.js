import {
  READY_STATE_CHANGED,
  CREATE_FEEDBACK_CLICKED,
  FEEDBACK_DIALOG_CLOSING
} from '../../utils/constants';

function participantButtonBarReducer(state = {}, action) {
  switch (action.type) {
    case READY_STATE_CHANGED:
      return {
        ...state,
        isUserReady: action.payload.isUserReady,
      };

    case CREATE_FEEDBACK_CLICKED:
      return {
        ...state,
        isFeedbackDialogOpen: true,
      };

    case FEEDBACK_DIALOG_CLOSING:
      return {
        ...state,
        isFeedbackDialogOpen: false,
      };

    default:
      return { ...state };
  }
}

export default participantButtonBarReducer;
