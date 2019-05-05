import { fromJS } from 'immutable';
import { CONNECT_ATTEMPT_FAILED } from '../../services/constants';

const initialState = fromJS({ nickname: null, isConnected: true });

function nicknameProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT_ATTEMPT_FAILED:
      return {
        ...state,
        isConnected: true
      };

    default:
      return { ...state };
  }
}

export default nicknameProviderReducer;
