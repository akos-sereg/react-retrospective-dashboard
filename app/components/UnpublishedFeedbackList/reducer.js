import { FEEDBACK_SAVED, FEEDBACK_DELETED, PAGE_LOADING } from '../../utils/constants';

function unpublishedFeedbackListReducer(state = {}, action) {
  switch (action.type) {
    case FEEDBACK_SAVED:
      return {
        ...state,
        feedbacks: action.payload.feedbacks,
      };

    case FEEDBACK_DELETED:
      return {
        ...state,
        feedbacks: action.payload.feedbacks,
      };

    case PAGE_LOADING:
      return {
        ...state,
        feedbacks: action.payload.feedbacks,
      };

    default:
      return { ...state };
  }
}

export default unpublishedFeedbackListReducer;
