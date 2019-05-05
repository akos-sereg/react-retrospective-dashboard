import {CONNECT_ATTEMPT_FAILED } from './constants';

export function connectAttemptFailed(payload) {
  return {
    type: CONNECT_ATTEMPT_FAILED,
    payload
  };
}

