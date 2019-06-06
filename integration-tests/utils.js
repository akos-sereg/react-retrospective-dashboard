let timeouts = require('./conf').config.timeouts;

exports.sleep = {

    /**
    * Before redirect, there might be REST calls - eg. initiate session -, we have to define a reasonable amount of
    * time so that all REST calls can complete, and the page can be redirected.
    */
    untilRedirected: function() {
        return new Promise(function(resolve, reject)
        {
            setTimeout(function() { resolve(); }, timeouts.redirect);
        });
    },

    /* Dialog popup has an animation, we need to wait until the dialog loads, usually this is done in half a second */
    untilDialogPopsUp:  function() {
        return new Promise(function(resolve, reject)
        {
            setTimeout(function() { resolve(); }, timeouts.dialogPopsUp);
        });
    },

    untilWebsocketConnection:  function() {
      return new Promise(function(resolve, reject)
      {
        setTimeout(function() { resolve(); }, timeouts.websocketConnection);
      });
    },

    /* Dialog animation should complete before going forward */
    untilDialogCloses:  function() {
        return new Promise(function(resolve, reject)
        {
            setTimeout(function() { resolve(); }, timeouts.dialogCloses);
        });
    },

    /* REST call completion takes some time */
    untilRestCallCompletes:  function() {
        return new Promise(function(resolve, reject)
        {
            setTimeout(function() { resolve(); }, timeouts.restCall);
        });
    },

    /* React updates screen */
    untilReactUpdatesScreen:  function() {
      return new Promise(function(resolve, reject)
      {
        setTimeout(function() { resolve(); }, timeouts.reactUpdatesScreen);
      });
    },

    /* Time that is required for short animations to complete */
    untilAnimationCompletes: function() {
        return new Promise(function(resolve, reject)
        {
            setTimeout(function() { resolve(); }, timeouts.animationCompletes);
        });
    },

    /* Eg. browser redirect from /index to /index#something, should happen very quick, comes with quick animation */
    untilHashLocationRedirect: function() {
        return new Promise(function(resolve, reject)
        {
            setTimeout(function() { resolve(); }, timeouts.hashLocationRedirect);
        });
    },

    /* Wait until toastr notifications go away */
    untilToastrGoesAway: async function() {

      const maxAwaitSeconds = 10;
      const iterationSeconds = 2;
      let awaitedSeconds = 0;

      while (awaitedSeconds < maxAwaitSeconds) {
        const notifications =
          await element.all(by.css('[class="toast toast-success"]')).count()
          + await element.all(by.css('[class="toast toast-info"]')).count()
          + await element.all(by.css('[class="toast toast-error"]')).count()
          + await element.all(by.css('[class="toast toast-warning"]')).count();

        if (notifications == 0) {
          return;
        }

        console.log(`---> waiting for ${notifications} toastr notifications to disappear`);

        await this.untilSeconds(iterationSeconds);
        awaitedSeconds += iterationSeconds;
      }

      console.log('---> was waiting for toastr notifications to go away, but they are still there');
    },

    untilSeconds: function(seconds) {
    return new Promise(function(resolve, reject)
    {
      setTimeout(function() { resolve(); }, seconds * 1000);
    });
  },
};

exports.misc = {

    /* Executes script asynchronously in browser  */
    executeScript: async function(script) {
        return new Promise(function(resolve, reject) {
            browser.executeScript(script).then(function () {
                resolve();
            })
        });
    },
};
