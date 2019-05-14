import {
  BROKEN_PIPE,
  CONNECTING,
  CONNECTED,
  FEEDBACK_SAVED
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

const feedbackSaved = (feedback, feedbacks) => ({
  type: FEEDBACK_SAVED,
  payload: { feedback, feedbacks }
});

export {
  brokenPipe,
  connecting,
  connected,
  feedbackSaved
};

