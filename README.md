# react-retrospective-dashboard

This web app is supposed to be the replacement of an existing Angular-based web app 
used by https://www.retrospective-dashboard.org - participant screen.

Right now it is in ALPHA, as long as "To be implemented" section has any element.

The goal is to support `Glad / Sad / Mad` type board, then we can add support for more boards.

## Usage
```
$ npm install
$ npm start
```

Then open http://localhost:3000/

For production build, run the following command:

```
$ npm run build
```

This will produce artifacts under ``build`` folder

## Development

For local development, use mocked service. In file `app/services/ParticipantApi.js`, look for method `getInstance`, 
and use `ParticipantApi.instance = new ParticipantApiMock(dispatch);` to instantiate the service.

## To be implemented
- Error Handling on Publish feedback / Publish all
- On Publish All / Publish error, set "publishing" array empty
- Remember username on page refresh

## To be improved

- Using `import styles from './styles'` to avoid style name collision
- Create TextArea component and use in FeedbackDialog
- Clean up app.js
- Fix linter issues
- Tests to be added
- Better UI design
- Automation testing support
- Kill react-helmet
- Disable STOMP console logs
- Clone with lib in ParticipantApi instead of JSON parse/serialize

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
- ESLint - ``npm run lint``

#### User Interface
- Bootstrap 3
- Toastr notifications

## Testing

Run the following command

```
$ npm run test
``` 

It generates a coverage report as well. You can set coverage expectations in ``config/jest.config.js``
