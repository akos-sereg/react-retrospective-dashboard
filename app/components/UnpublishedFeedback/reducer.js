import { FEEDBACK_UPDATED } from '../../utils/constants';

function unpublishedFeedbackReducer(state = {}, action) {
  switch (action.type) {
    case FEEDBACK_UPDATED: {
      return {
        ...state,
      };
    }

    default:
      return { ...state };
  }
}

export default unpublishedFeedbackReducer;
