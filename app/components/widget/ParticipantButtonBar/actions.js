import { READY_STATE_CHANGED, CREATE_FEEDBACK_CLICKED, SWITCH_SCREEN_FEEDBACK } from '../../../utils/constants';

const userReadyStateChanged = (isUserReady) => ({
  type: READY_STATE_CHANGED,
  payload: { isUserReady }
});

const createFeedbackClicked = () => ({
  type: CREATE_FEEDBACK_CLICKED,
  payload: { }
});

const switchScreenToFeedback = () => ({
  type: SWITCH_SCREEN_FEEDBACK,
  payload: { }
});

export { userReadyStateChanged, createFeedbackClicked, switchScreenToFeedback };

