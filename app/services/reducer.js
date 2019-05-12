import { READY_STATE_CHANGED } from '../utils/constants';
import ParticipantApi from './ParticipantApi';

function participantApiReducer(state = {}, action) {
  switch (action.type) {
    case READY_STATE_CHANGED: {
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
