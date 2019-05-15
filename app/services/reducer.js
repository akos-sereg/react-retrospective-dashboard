import { READY_STATE_CHANGED } from '../utils/constants';
import ParticipantApi from './ParticipantApi';

function participantApiReducer(state = {}, action) {
  switch (action.type) {
    case READY_STATE_CHANGED: {
      // ready state change happens later than page load, dispatcher is not provided in getInstance call
      // this might be a problem in case we were doing auto-join on page load. but "Join" user interaction
      // will happen AFTER page load, so its safe to call parameter-less getInstance here.
      const service = ParticipantApi.getInstance();
      if (service != null) {
        service.participantState = action.payload.isUserReady ? 'ready' : 'in-progress';
      }
      return { ...state };
    }

    default:
      return { ...state };
  }
}

export default participantApiReducer;
