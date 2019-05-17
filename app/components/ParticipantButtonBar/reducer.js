import {
  READY_STATE_CHANGED,
  CREATE_FEEDBACK_CLICKED,
  FEEDBACK_DIALOG_CLOSING,
  CONFIRMATION_DIALOG_OPENING,
  CONFIRMATION_DIALOG_CLOSING,
  JOIN_CLICKED,
} from '../../utils/constants';

function participantButtonBarReducer(state = {}, action) {
  switch (action.type) {
    case READY_STATE_CHANGED:
      return {
        ...state,
        isUserReady: action.payload.isUserReady,
      };

    case CONFIRMATION_DIALOG_OPENING:
    case CREATE_FEEDBACK_CLICKED:
      return {
        ...state,
        isAnyDialogOpen: true,
      };

    case CONFIRMATION_DIALOG_CLOSING:
    case FEEDBACK_DIALOG_CLOSING:
      return {
        ...state,
        isAnyDialogOpen: false,
      };

    case JOIN_CLICKED:
      return {
        ...state,
        isJoinClicked: true,
      };

    default:
      return { ...state };
  }
}

export default participantButtonBarReducer;
