import { PAGE_LOADING, FEEDBACK_SAVED, FEEDBACK_DELETED, FEEDBACK_UPDATED } from '../../utils/constants';
import LocalStorageOfCommentsService from '../../services/LocalStorageOfCommentsService';

function participantPageReducer(state = {}, action) {
  switch (action.type) {
    case PAGE_LOADING: {
      const service = LocalStorageOfCommentsService.getInstance();
      let feedbacks = [];
      if (service != null) {
        feedbacks = service.getFeedbackList();
      }
      return { ...state, feedbacks };
    }

    case FEEDBACK_DELETED:
    case FEEDBACK_SAVED:
    case FEEDBACK_UPDATED: {
      const service = LocalStorageOfCommentsService.getInstance();
      let feedbacks = [];
      if (service != null) {
        feedbacks = service.getFeedbackList();
      }
      return { ...state, feedbacks };
    }

    default:
      return { ...state };
  }
}

export default participantPageReducer;
