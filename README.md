# react-retrospective-dashboard

This project is a working standalone front-end app aiming to demonstrate best javascript practices and common usage of React / Redux. 

It is using the latest React + Redux as of November 2018.

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
