import {
  BROKEN_PIPE,
  CONNECTING,
  CONNECTED,
  FEEDBACK_SAVED,
  FEEDBACK_DELETED,
  FEEDBACK_UPDATED,
  PUBLISHING_FEEDBACKS,
  VOTING_STARTED,
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

const votingStarted = (payload) => ({
  type: VOTING_STARTED,
  payload
});

const feedbackSaved = (feedback, feedbacks) => ({
  type: FEEDBACK_SAVED,
  payload: { feedback, feedbacks }
});

const feedbackUpdated = (feedback, feedbacks) => ({
  type: FEEDBACK_UPDATED,
  payload: { feedback, feedbacks }
});

const feedbackDeleted = (feedbackId, feedbacks) => ({
  type: FEEDBACK_DELETED,
  payload: { feedbackId, feedbacks }
});

const publishingFeedbacks = (feedbackIds) => ({
  type: PUBLISHING_FEEDBACKS,
  payload: { feedbackIds }
});

export {
  brokenPipe,
  connecting,
  connected,
  feedbackSaved,
  feedbackUpdated,
  feedbackDeleted,
  publishingFeedbacks,
  votingStarted
};

