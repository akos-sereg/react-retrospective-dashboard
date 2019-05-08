import { READY_STATE_CHANGED } from '../../utils/constants';

const userReadyStateChanged = (isUserReady) => ({
  type: READY_STATE_CHANGED,
  payload: { isUserReady }
});

export { userReadyStateChanged };

