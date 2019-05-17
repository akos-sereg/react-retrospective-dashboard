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

## To be implemented
- Validate non-empty text on create feedback / update feedback
- Validate joined state when publishing / publishing all
- Validate non-empty nickname when joining
- Validate that we received token and code in url
- Error Handling on Publish feedback / Publish all
- Mock Service
- Add toastr notification on publish and publish all and delete and edit and create
- On Publish All / Publish error, set "publishing" array empty

## To be improved

- Using `import styles from './styles'` to avoid style name collision
- Create TextArea component and use in FeedbackDialog
- Clean up app.js
- Fix linter issues
- Tests to be added
- Better UI design
- Automation testing support

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
