import { CONNECT_ATTEMPT_FAILED } from './constants';

const connectAttemptFailed = (payload) => (
  {
    type: CONNECT_ATTEMPT_FAILED,
    payload
  });

export { connectAttemptFailed };

