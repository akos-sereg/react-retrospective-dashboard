import { brokenPipe, connected, connecting, publishingFeedbacks } from './actions';

export default class ParticipantApiMock {
  constructor(dispatch, emulateJoinFailure = false, emulatePublishFailure = false) {
    this.dispatch = dispatch;
    this.emulateJoinFailure = emulateJoinFailure;
    this.emulatePublishFailure = emulatePublishFailure;
  }

  async join() {
    this.dispatch(connecting());
    await this.delay(4);

    if (this.emulateJoinFailure) {
      this.dispatch(brokenPipe());
    } else {
      this.dispatch(connected());
    }
  }

  async publish(feedbacks) {
    this.dispatch(publishingFeedbacks(feedbacks.map((f) => f.id)));

    await this.delay(2);

    if (this.emulatePublishFailure) {
      return false;
    }

    return true;
  }

  async delay(seconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }
}
