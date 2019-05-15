import { FEEDBACK_DELETED } from '../../utils/constants';

function feedbackDialogReducer(state = {}, action) {
  switch (action.type) {
    case FEEDBACK_DELETED:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}

export default feedbackDialogReducer;
