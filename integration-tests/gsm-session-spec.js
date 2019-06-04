const steps = require('./steps');

describe('Glad / Sad / Mad', () => {
  it('create, edit, delete, publish, publish all, ready', async () => {

    const params = {
      commentRadioButtons: ['radio-add-comment-glad', 'radio-add-comment-sad', 'radio-add-comment-mad'],
      commentIndicatorImages: ['image-sticker-glad', 'image-sticker-sad', 'image-sticker-mad']
    };

    await steps.setup('1', 'a', params);
    await steps.navigateToGsm();
    await steps.joinMeeting();

    await steps.createFeedback(null, 'my comment zero');
    await steps.verifyFeedbacks([{ glad: 1.0, comment: 'my comment zero' }]);
    await steps.deleteFeedback(0);
    await steps.verifyFeedbacks([]);

    await steps.createFeedback(1.0, 'my comment');
    await steps.verifyFeedbacks([{ glad: 1.0, comment: 'my comment' }]);
    await steps.deleteFeedback(0);
    await steps.verifyFeedbacks([]);

    await steps.createFeedback(0.5, 'my comment 2nd column');
    await steps.verifyFeedbacks([{ glad: 0.5, comment: 'my comment 2nd column' }]);
  });
});