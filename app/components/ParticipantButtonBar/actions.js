import { READY_STATE_CHANGED, CREATE_FEEDBACK_CLICKED } from '../../utils/constants';

const userReadyStateChanged = (isUserReady) => ({
  type: READY_STATE_CHANGED,
  payload: { isUserReady }
});

const createFeedbackClicked = () => ({
  type: CREATE_FEEDBACK_CLICKED,
  payload: { }
});

export { userReadyStateChanged, createFeedbackClicked };

