module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/*/*/Loadable.{js,jsx}'
  ],
  transformIgnorePatterns: ['node_modules/(?!(react-redux|lodash-es)/)'],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10
    }
  },
  coverageReporters: ['json', 'lcov', 'text-summary'],
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$':
      '<rootDir>/config/jest-mocks/cssModule.js',
    '.*\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest-mocks/image.js'
  },
  setupTestFrameworkScriptFile: '<rootDir>/config/test-setup.js',
  testRegex: '.*\\.test\\.js$'
};
