import {
  PAGE_LOADING,
  FEEDBACK_SAVED,
  FEEDBACK_DELETED,
  FEEDBACK_UPDATED,
  VOTING_STARTED, SWITCH_SCREEN_FEEDBACK, LEGACY_CLIENT_ALLOWED
} from '../../utils/constants';
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

    case LEGACY_CLIENT_ALLOWED:
      return {
        ...state,
        legacyClientAllowed: true,
      };

    case SWITCH_SCREEN_FEEDBACK:
      return {
        ...state,
        votingScreenDisplayed: false,
      };

    case VOTING_STARTED: {
      return {
        ...state,
        votingStarted: true,
        votingScreenDisplayed: true,
        boardFeedbacks: action.payload.boardFeedbacks,
        votes: action.payload.votes,
      };
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
