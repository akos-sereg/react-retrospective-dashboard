import {
  BROKEN_PIPE,
  CONNECTING,
  CONNECTED
} from '../../utils/constants';

function nicknameProviderReducer(state = {}, action) {
  switch (action.type) {
    case BROKEN_PIPE:
      return {
        ...state,
        isConnected: false,
        isConnecting: false,
      };

    case CONNECTING:
      return {
        ...state,
        isConnected: false,
        isConnecting: true,
      };

    case CONNECTED:
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
      };

    default:
      return { ...state };
  }
}

export default nicknameProviderReducer;
