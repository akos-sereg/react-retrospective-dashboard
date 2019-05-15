import { PAGE_LOADING } from '../../utils/constants';
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

    default:
      return { ...state };
  }
}

export default participantPageReducer;
