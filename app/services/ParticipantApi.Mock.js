import { brokenPipe, connected, connecting } from './actions';

export default class ParticipantApiMock {
  constructor(dispatch, emulateJoinFailure = false, emulatePublishFailure = false) {
    this.dispatch = dispatch;
    this.emulateJoinFailure = emulateJoinFailure;
    this.emulatePublishFailure = emulatePublishFailure;
  }

  async join(username, code, token) {
    this.dispatch(connecting());
    await this.delay(4);

    if (this.emulateJoinFailure) {
      this.dispatch(brokenPipe());
    } else {
      this.dispatch(connected());
    }
  }

  async publish(feedbacks, username, code, token) {
    await this.delay(2);

    if (this.emulatePublishFailure) {
      return { code: 500 };
    }

    return { code: 200 };
  }

  async delay(seconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }
}
