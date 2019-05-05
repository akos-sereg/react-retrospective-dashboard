import { fromJS } from 'immutable';

import { CONNECT_ATTEMPT_FAILED } from './constants';

const initialState = fromJS({
  author: {}
});

function manageParticipantApiReducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT_ATTEMPT_FAILED:
      return state;
    default:
      return state;
  }
}

export default manageParticipantApiReducer;
