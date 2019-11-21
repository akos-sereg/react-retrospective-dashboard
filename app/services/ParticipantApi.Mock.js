import { brokenPipe, connected, connecting, publishingFeedbacks } from './actions';

export default class ParticipantApiMock {
  constructor(
    dispatch,
    simulateJoinFailure = false,
    simulatePublishFailure = false) {
    this.dispatch = dispatch;
    this.simulateJoinFailure = simulateJoinFailure;
    this.simulatePublishFailure = simulatePublishFailure;
  }

  async join() {
    this.dispatch(connecting());
    await this.delay(4);

    if (this.simulateJoinFailure) {
      this.dispatch(brokenPipe());
    } else {
      this.dispatch(connected());
    }
  }

  async publish(feedbacks) {
    this.dispatch(publishingFeedbacks(feedbacks.map((f) => f.id)));

    await this.delay(2);

    if (this.simulatePublishFailure) {
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
