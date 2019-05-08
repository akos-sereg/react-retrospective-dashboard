import { fromJS } from 'immutable';
import { READY_STATE_CHANGED } from '../../utils/constants';

const initialState = fromJS({ isUserReady: false });

function participantButtonBarReducer(state = initialState, action) {
  switch (action.type) {
    case READY_STATE_CHANGED:
      debugger;
      return {
        ...state,
        isUserReady: action.payload.isUserReady,
      };

    default:
      return { ...state };
  }
}

export default participantButtonBarReducer;
