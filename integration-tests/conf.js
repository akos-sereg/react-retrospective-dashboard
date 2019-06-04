// default config
const config = {
  systemUnderTest: 'http://localhost:3000/#/code/1/token/a',
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
