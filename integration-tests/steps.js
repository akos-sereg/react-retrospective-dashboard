let config = require('./conf').config;
let sleep = require('./utils').sleep;
let utils = require('./utils').misc;

const Steps = {

  params: null,

  joinMeeting: async function() {
      expect(element.all(by.css('[automation-id="join-username-input"]')).count()).toEqual(1);
      expect($('[automation-id="join-username-input"]').isDisplayed()).toBeTruthy();
      expect(element.all(by.css('[automation-id="join-btn"]')).count()).toEqual(1);
      expect($('[automation-id="join-btn"]').isDisplayed()).toBeTruthy();
      await element.all(by.css('[automation-id="join-username-input"]')).get(0).clear();
      element(by.css('input[automation-id="join-username-input"]')).sendKeys("user-name");

      await element(by.css('[automation-id="join-btn"]')).click();
      await sleep.untilDialogPopsUp();

      return Steps;
  },

  verifyAndConfirm: async function(actionButtonLabel) {
      expect(element.all(by.css('[automation-id="dialog-confirmation-button"]')).count()).toEqual(1);
      expect(element(by.css('[automation-id="dialog-confirmation-button"]')).isDisplayed()).toBeTruthy();
      expect(element(by.css('[automation-id="dialog-confirmation-button"]')).getAttribute('value')).toBe(actionButtonLabel);
      await element(by.css('[automation-id="dialog-confirmation-button"]')).click();
      await sleep.untilDialogCloses();
      await sleep.untilRestCallCompletes();
  },

  verifyIamReady: async function() {
      expect(element.all(by.css('[automation-id="i-am-ready-btn"]')).count()).toEqual(1);
      expect(element.all(by.css('[automation-id="i-am-ready-marker"]')).count()).toEqual(1);
      expect(element(by.css('[automation-id="i-am-ready-marker"]')).getAttribute('class')).toEqual('gray-dot');

      await element.all(by.css('[automation-id="i-am-ready-btn"]')).get(0).click();
      expect(element(by.css('[automation-id="i-am-ready-marker"]')).getAttribute('class')).toEqual('green-dot');

      await element.all(by.css('[automation-id="i-am-ready-btn"]')).get(0).click();

      // sometimes we get StaleElementReferenceError if the following two lines gets executed, hence disabling them
      // to make tests more reliable.
      // expect($('[automation-id="i-am-ready-marker"]').getAttribute('class')).toEqual('gray-dot');
      // expect(element(by.css('[automation-id="i-am-ready-marker"]')).getAttribute('class')).toEqual('gray-dot');
  },

  setup: async function(code, token, params) {
    Steps.params = params;
    Steps.code = code;
    Steps.token = token;

    browser.waitForAngularEnabled(false);
    browser.ignoreSynchronization = true; // to make sure that "angular.element(document).ready" does not fire too early
    browser.driver.manage().window().maximize();
  },

  navigateToGsm: async function() {
    await browser.get(config.systemUnderTest);
    await sleep.untilRedirected();
  },

  createFeedback: async function(glad, comment) {
    // open "create sticker" dialog
    expect(element.all(by.css('[automation-id="create-comment-btn"]')).count()).toEqual(1);
    expect($('[automation-id="create-comment-btn"]').isDisplayed()).toBeTruthy();
    await element(by.css('button[automation-id="create-comment-btn"]')).click();
    await sleep.untilDialogPopsUp();

    expect(element.all(by.css('[automation-id="comment-textarea"]')).count()).toEqual(1);
    expect(element(by.css('[automation-id="comment-textarea"]')).getAttribute('value')).toEqual('');
    await element(by.css('[automation-id="comment-textarea"]')).sendKeys(comment);

    // verify that GSM / SSC / SWOT / etc radio button are there and their states are correct
    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[0]+'"]')).count()).toEqual(1);
    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[1]+'"]')).count()).toEqual(1);
    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[2]+'"]')).count()).toEqual(1);
    if (Steps.params.commentRadioButtons.length > 3) {
      expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[3]+'"]')).count()).toEqual(1);
    }

    // verify default selection of Glad / Sad / Mad: Glad should be picked by default
    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[0]+'"][class="feedback-mood-highlight"]')).count()).toEqual(1);
    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[1]+'"][class="feedback-mood-highlight"]')).count()).toEqual(0);
    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[2]+'"][class="feedback-mood-highlight"]')).count()).toEqual(0);
    if (Steps.params.commentRadioButtons.length > 3) {
      expect(element(by.css('[automation-id="'+Steps.params.commentRadioButtons[3]+'"]')).getAttribute("checked")).toEqual(null);
    }

    switch (glad) {
      case 1.0:
        await element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[0]+'"]')).first().click();
        break;
      case 0.5:
        await element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[1]+'"]')).first().click();
        break;
      case 0.0:
        await element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[2]+'"]')).first().click();
      case null:
        // do nothing, leave as is
        break;
    }

    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[0]+'"][class="feedback-mood-highlight"]')).count()).toEqual((glad === 1.0 || glad === null) ? 1 : 0);
    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[1]+'"][class="feedback-mood-highlight"]')).count()).toEqual(glad === 0.5 ? 1 : 0);
    expect(element.all(by.css('[automation-id="'+Steps.params.commentRadioButtons[2]+'"][class="feedback-mood-highlight"]')).count()).toEqual(glad === 0.0 ? 1 : 0);

    // save comment in local storage of the browser
    expect(element.all(by.css('[automation-id="add-comment-submit-btn"]')).count()).toEqual(1);
    await element(by.css('[automation-id="add-comment-submit-btn"]')).click();
    await sleep.untilDialogCloses();

    return Steps;
  },

  verifyFeedbacks: async function(expectedFeedbacks) {
    expect(element.all(by.css('[automation-id="sticker-comment"]')).count()).toEqual(expectedFeedbacks.length);

    for (var i=0; i!=expectedFeedbacks.length; i++) {

      const currentFeedback = expectedFeedbacks[i];

      let indicatorImageIndex = 0;
      switch (currentFeedback.glad) {
        case 1.0:
          indicatorImageIndex = 0;
          break;
        case 0.5:
          indicatorImageIndex = 1;
          break;
        case 0.0:
          indicatorImageIndex = 2;
          break;
      }

      expect(element.all(by.css('[automation-id="sticker-mood-indicator-image"]')).get(i).getAttribute('automation-value')).toEqual(Steps.params.commentIndicatorImages[indicatorImageIndex]);
      expect(element.all(by.css('[automation-id="sticker-comment"]')).get(i).getText()).toEqual(currentFeedback.comment);
    }

    await sleep.untilReactUpdatesScreen();
    expect(element(by.css('[automation-id="publish-all-btn"]')).getAttribute('disabled')).toEqual(expectedFeedbacks.length > 0 ? null : 'true');
  },

  deleteFeedback: async function(index) {
    const originalFeedbackCount = await element.all(by.css('[automation-id="comment-item-delete-btn"]')).count();
    expect(originalFeedbackCount > index).toEqual(true);

    await element.all(by.css('[automation-id="sticker-comment"]')).get(index).click();
    await element.all(by.css('[automation-id="comment-item-delete-btn"]')).get(index).click();
    await sleep.untilDialogPopsUp();

    await Steps.verifyAndConfirm('OK');

    const currentFeedbackCount = await element.all(by.css('[automation-id="sticker-comment"]')).count();
    expect(currentFeedbackCount).toEqual(originalFeedbackCount - 1);

    expect(element(by.css('[automation-id="publish-all-btn"]')).getAttribute('disabled')).toEqual(currentFeedbackCount == 0 ? 'true' : null);
  },

  publishFeedback: async function(index) {
    const commentPublishBtnCount = await element.all(by.css('[automation-id="comment-item-publish-btn"]')).count();
    expect(commentPublishBtnCount > index).toEqual(true);

    await element.all(by.css('[automation-id="sticker-comment"]')).get(index).click(); // focus
    await element.all(by.css('[automation-id="comment-item-publish-btn"]')).get(index).click();
    await sleep.untilDialogPopsUp();
    await Steps.verifyAndConfirm('OK');
  },

  editFeedback: async function(index, oldFeedback, commentAppend, glad) {
    const commentEditBtnCount = await element.all(by.css('[automation-id="comment-item-edit-btn"]')).count();
    expect(commentEditBtnCount > index).toEqual(true);

    await element.all(by.css('[automation-id="sticker-comment"]')).get(index).click(); // focus
    await element.all(by.css('[automation-id="comment-item-edit-btn"]')).get(index).click();
    await sleep.untilDialogPopsUp();

    expect(element(by.css('[automation-id="comment-textarea"]')).getAttribute('value')).toEqual(oldFeedback.comment);
    expect(element.all(by.css('[automation-id="'+this.params.commentRadioButtons[0]+'"][class="feedback-mood-highlight"]')).count()).toEqual(oldFeedback.glad === 1.0 ? 1 : 0);
    expect(element.all(by.css('[automation-id="'+this.params.commentRadioButtons[1]+'"][class="feedback-mood-highlight"]')).count()).toEqual(oldFeedback.glad === 0.5 ? 1 : 0);
    expect(element.all(by.css('[automation-id="'+this.params.commentRadioButtons[2]+'"][class="feedback-mood-highlight"]')).count()).toEqual(oldFeedback.glad === 0.0 ? 1 : 0);
    if (this.params.commentRadioButtons.length > 3) {
      expect(element(by.css('[automation-id="'+this.params.commentRadioButtons[3]+'"]')).getAttribute("checked")).toEqual(null);
    }

    await element(by.css('[automation-id="comment-textarea"]')).sendKeys(commentAppend);

    let indicatorImageIndex = 0;
    switch (glad) {
      case 1.0:
        indicatorImageIndex = 0;
        break;
      case 0.5:
        indicatorImageIndex = 1;
        break;
      case 0.0:
        indicatorImageIndex = 2;
        break;
    }
    await element(by.css('[automation-id="'+this.params.commentRadioButtons[indicatorImageIndex]+'"]')).click();

    expect(element.all(by.css('[automation-id="'+this.params.commentRadioButtons[0]+'"][class="feedback-mood-highlight"]')).count()).toEqual(glad === 1.0 ? 1 : 0);
    expect(element.all(by.css('[automation-id="'+this.params.commentRadioButtons[1]+'"][class="feedback-mood-highlight"]')).count()).toEqual(glad === 0.5 ? 1 : 0);
    expect(element.all(by.css('[automation-id="'+this.params.commentRadioButtons[2]+'"][class="feedback-mood-highlight"]')).count()).toEqual(glad === 0.0 ? 1 : 0);
    if (this.params.commentRadioButtons.length > 3) {
      expect(element(by.css('[automation-id="'+this.params.commentRadioButtons[3]+'"]')).getAttribute("checked")).toEqual(null);
    }

    await element(by.css('[automation-id="edit-comment-submit-btn"]')).click();
    await sleep.untilDialogCloses();
  },

  participantPageFullFlow: async function(code, token, params) {

      // edit comment
      expect(element.all(by.css('[automation-id="comment-item-edit-btn"]')).count()).toEqual(1);
      await element.all(by.css('[automation-id="sticker-comment"]')).get(0).click();
      await element.all(by.css('[automation-id="comment-item-edit-btn"]')).get(0).click();
      await sleep.untilDialogPopsUp();

      expect(element(by.css('[automation-id="comment-textarea"]')).getAttribute('value')).toEqual("my comment 3rd column");
      expect(element.all(by.css('[automation-id="'+params.commentRadioButtons[0]+'"][class="feedback-mood-highlight"]')).count()).toEqual(0);
      expect(element.all(by.css('[automation-id="'+params.commentRadioButtons[1]+'"][class="feedback-mood-highlight"]')).count()).toEqual(0);
      expect(element.all(by.css('[automation-id="'+params.commentRadioButtons[2]+'"][class="feedback-mood-highlight"]')).count()).toEqual(1);
      if (params.commentRadioButtons.length > 3) {
          expect(element(by.css('[automation-id="'+params.commentRadioButtons[3]+'"]')).getAttribute("checked")).toEqual(null);
      }

      await element(by.css('[automation-id="comment-textarea"]')).sendKeys(", converted to 2nd");
      await element(by.css('[automation-id="'+params.commentRadioButtons[1]+'"]')).click();

    expect(element.all(by.css('[automation-id="'+params.commentRadioButtons[0]+'"][class="feedback-mood-highlight"]')).count()).toEqual(0);
    expect(element.all(by.css('[automation-id="'+params.commentRadioButtons[1]+'"][class="feedback-mood-highlight"]')).count()).toEqual(1);
    expect(element.all(by.css('[automation-id="'+params.commentRadioButtons[2]+'"][class="feedback-mood-highlight"]')).count()).toEqual(0);
      if (params.commentRadioButtons.length > 3) {
          expect(element(by.css('[automation-id="'+params.commentRadioButtons[3]+'"]')).getAttribute("checked")).toEqual(null);
      }

      await element(by.css('[automation-id="edit-comment-submit-btn"]')).click();
      await sleep.untilDialogCloses();

      // verify that comment list got updated
      expect(element.all(by.css('[automation-id="sticker-comment"]')).count()).toEqual(1);
      expect(element.all(by.css('[automation-id="'+params.commentIndicatorImages[1]+'"]')).count()).toEqual(1);
      expect(element.all(by.cssContainingText('[automation-id="sticker-comment"]', "my comment 3rd column, converted to 2nd")).count()).toEqual(1);
      expect(element(by.css('[automation-id="publish-all-btn"]')).getAttribute('disabled')).toEqual(null);

      // publish all
      expect(element.all(by.css('[automation-id="publish-all-btn"]')).count()).toEqual(1);
      await element.all(by.css('[automation-id="publish-all-btn"]')).get(0).click();
      await sleep.untilDialogPopsUp();

      await Steps.verifyAndConfirm('OK');

      expect(element.all(by.css('[automation-id="sticker-comment"]')).count()).toEqual(0);
      expect(element(by.css('[automation-id="publish-all-btn"]')).getAttribute('disabled')).toEqual('true');

      // "I am ready" button
      await Steps.verifyIamReady();

      // create a couple of other comments
      await element(by.css('button[automation-id="create-comment-btn"]')).click();
      await sleep.untilDialogPopsUp();

      await element(by.css('[automation-id="comment-textarea"]')).sendKeys("my comment 1st column");
      await element(by.css('[automation-id="'+params.commentRadioButtons[0]+'"]')).click();
      await element(by.css('[automation-id="add-comment-submit-btn"]')).click();
      await sleep.untilDialogCloses();

      await element(by.css('[automation-id="create-comment-btn"]')).click();
      await sleep.untilDialogPopsUp();

      await element(by.css('[automation-id="comment-textarea"]')).sendKeys("my comment 3rd column");
      await element(by.css('[automation-id="'+params.commentRadioButtons[2]+'"]')).click();
      await element(by.css('[automation-id="add-comment-submit-btn"]')).click();
      await sleep.untilDialogCloses();

      let unpublishedStickerCount = 2;

      if (params.commentRadioButtons.length > 3) {
          await element(by.css('button[automation-id="create-comment-btn"]')).click();
          await sleep.untilDialogPopsUp();

          await element(by.css('[automation-id="comment-textarea"]')).sendKeys("my comment 4th column");
          await element(by.css('[automation-id="'+params.commentRadioButtons[3]+'"]')).click();

          expect(element(by.css('[automation-id="'+params.commentRadioButtons[0]+'"]')).getAttribute("checked")).toEqual(null);
          expect(element(by.css('[automation-id="'+params.commentRadioButtons[1]+'"]')).getAttribute("checked")).toEqual(null);
          expect(element(by.css('[automation-id="'+params.commentRadioButtons[2]+'"]')).getAttribute("checked")).toEqual(null);
          expect(element(by.css('[automation-id="'+params.commentRadioButtons[3]+'"]')).getAttribute("checked")).toEqual('true');

          await element(by.css('[automation-id="add-comment-submit-btn"]')).click();
          await sleep.untilDialogCloses();

          expect(element.all(by.css('[automation-id="sticker-comment"]')).count()).toEqual(3);
          expect(element.all(by.css('[automation-id="'+params.commentIndicatorImages[3]+'"]')).count()).toEqual(1);
          expect(element.all(by.cssContainingText('[automation-id="sticker-comment"]', "my comment 4th column")).count()).toEqual(1);
          unpublishedStickerCount++;
      }

      // refresh page and make sure comments did not get lost
      browser.driver.navigate().refresh();
      expect(element.all(by.css('[automation-id="sticker-comment"]')).count()).toEqual(unpublishedStickerCount);
      expect(element.all(by.css('[automation-id="join-username-input"]')).get(0).getAttribute('value')).toEqual('user-name');

      // delete username and try to publish
      await element.all(by.css('[automation-id="join-username-input"]')).get(0).clear();
      await element.all(by.css('[automation-id="publish-all-btn"]')).get(0).click();
      await sleep.untilDialogPopsUp();

      // try to publish one sticker with empty username field
      await element.all(by.css('[automation-id="sticker-comment"]')).get(0).click();
      await element.all(by.css('[automation-id="comment-item-publish-btn"]')).get(0).click();
      await sleep.untilDialogPopsUp();

      await Steps.verifyAndConfirm('OK');
      expect(element.all(by.css('[automation-id="sticker-comment"]')).count()).toEqual(unpublishedStickerCount);
      element.all(by.css('[automation-id="join-username-input"]')).get(0).sendKeys('user-name');
      await element(by.css('[automation-id="join-btn"]')).click();

      // publish comments
      await element.all(by.css('[automation-id="publish-all-btn"]')).get(0).click();
      await sleep.untilDialogPopsUp();

      await element(by.css('[automation-id="dialog-confirmation-button"]')).click();
      await sleep.untilDialogCloses();
      await sleep.untilRestCallCompletes();
  }

};

module.exports = Steps;
