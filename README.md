# react-retrospective-dashboard

This web app is supposed to be the replacement of the existing Angular-based web app 
used by https://www.retrospective-dashboard.org - participant screen.

Right now it is in Beta, as long as "To be implemented" section in this Readme.md has any element.

Currently it only supports `Glad / Sad / Mad` board, which is the most popular one.

## Usage
```
$ npm install
$ npm start
```

Then open http://localhost:3000/#/code/1/token/2

For production build, run the following command:

```
$ npm run build
```

This will produce artifacts under ``build`` folder

## Development

For local development, use mocked service. In file `app/services/ParticipantApi.js`, look for method `getInstance`, 
and use `ParticipantApi.instance = new ParticipantApiMock(dispatch);` to instantiate the service.

This configuration is the default.

## Release

1. `$ npm run build`
2. Copy content of `/build` folder and paste it under `src/main/webapp/resources/participant-web-v2` in backend project (not open-source) 

## To be implemented

## To be improved

- Using `import styles from './styles'` to avoid style name collision
- Create TextArea component and use in FeedbackDialog
- Kill react-helmet
- Kill commentText from `FeedbackDialog`
- Clone with lib in ParticipantApi instead of JSON parse/serialize
- Extract events from constants near to components

## Stack and Features

#### Language
- ES6 support
- SCSS support

#### Stack
- React v16.6.3 - released 13rd of Nov 2018
- Redux v4.0.1 - released 13rd of Oct 2018

#### Development and Build
- Hot Reload
- Webpack
- Sourcemap
- Jest
- Enzyme
- ESLint - ``npm run lint``

#### User Interface
- Bootstrap 3
- Toastr notifications

## Testing

### Unit Tests

Run the following command

```
$ npm run test
```

... or just run

``` 
$ jest --coverage
``` 

It generates a coverage report as well. You can set coverage expectations in ``config/jest.config.js``

### End-to-End Tests with Protractor

Protractor is a javascript based tool for E2E testing Angular applications, but it is 
handy for any frontend development framework.

Before running E2E tests, make sure that the website is running locally

```
$ npm start
```

#### Installing dependencies

```
$ npm install -g protractor
$ webdriver-manager update
```

#### Launch Tests

Start Selenium from command line

```
$ webdriver-manager start
```

Switch to another command line and start E2E tests
```
$ cd integration-tests
$ protractor conf.js
```

#### Notes

HTML elements are being identified by `automation-id` attribute. Attribute `automation-value` is also used by some tests.

