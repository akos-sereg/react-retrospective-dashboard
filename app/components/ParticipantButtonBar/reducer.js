import { READY_STATE_CHANGED } from '../../utils/constants';

function participantButtonBarReducer(state = {}, action) {
  switch (action.type) {
    case READY_STATE_CHANGED:
      return {
        ...state,
        isUserReady: action.payload.isUserReady,
      };

    default:
      return { ...state };
  }
}

export default participantButtonBarReducer;
