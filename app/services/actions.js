import {
  BROKEN_PIPE,
  CONNECTING,
  CONNECTED,
} from '../utils/constants';

const brokenPipe = (payload) => ({
  type: BROKEN_PIPE,
  payload
});

const connecting = (payload) => ({
  type: CONNECTING,
  payload
});

const connected = (payload) => ({
  type: CONNECTED,
  payload
});

export {
  brokenPipe,
  connecting,
  connected
};

