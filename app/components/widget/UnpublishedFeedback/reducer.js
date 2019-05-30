import { FEEDBACK_UPDATED, PUBLISHING_FEEDBACKS } from '../../../utils/constants';

function unpublishedFeedbackReducer(state = {}, action) {
  switch (action.type) {
    case FEEDBACK_UPDATED: {
      return {
        ...state,
      };
    }

    case PUBLISHING_FEEDBACKS:
      return {
        ...state,
        publishingFeedbackIds: action.payload.feedbackIds
      };

    default:
      return { ...state };
  }
}

export default unpublishedFeedbackReducer;
