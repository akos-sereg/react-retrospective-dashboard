// default config
const config = {
  systemUnderTest: 'http://localhost:3000/#/type/gsm/code/1/token/a',
  timeouts: {
    redirect: 5000,
    dialogPopsUp: 2000,
    dialogCloses: 2000,
    restCall: 3000,
    reactUpdatesScreen: 200,
    animationCompletes: 2000,
    hashLocationRedirect: 1500,
    websocketConnection: 2000,
  },

  capabilities: {
    browserName: 'chrome',

    chromeOptions: {
      /* remove the following line to run e2e tests non-headless */
      args: [ "--disable-gpu", "--window-size=800,600" ]
    }
  },

  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    // participant tests on web
    './gsm-session-spec.js',
  ],
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 180000
  }
};

exports.config = config;
