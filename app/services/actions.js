import {
  BROKEN_PIPE,
  CONNECTING,
  CONNECTED,
  FEEDBACK_SAVED,
  FEEDBACK_DELETED,
  FEEDBACK_LIST_UPDATE
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

const feedbackDeleted = (feedbackId, feedbacks) => ({
  type: FEEDBACK_DELETED,
  payload: { feedbackId, feedbacks }
});

export {
  brokenPipe,
  connecting,
  connected,
  feedbackSaved,
  feedbackDeleted
};

