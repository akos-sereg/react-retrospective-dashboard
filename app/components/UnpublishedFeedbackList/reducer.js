import { FEEDBACK_SAVED } from '../../utils/constants';

function unpublishedFeedbackListReducer(state = {}, action) {
  switch (action.type) {
    case FEEDBACK_SAVED:
      debugger;
      return {
        ...state,
        feedbacks: action.payload.feedbacks,
      };

    default:
      return { ...state };
  }
}

export default unpublishedFeedbackListReducer;
