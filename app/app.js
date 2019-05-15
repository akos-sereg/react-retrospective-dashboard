import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import { HashRouter } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import nicknameProviderReducer from './components/NicknameProvider/reducer';
import participantButtonBarReducer from './components/ParticipantButtonBar/reducer';
import feedbackDialogReducer from './components/FeedbackDialog/reducer';
import unpublishedFeedbackListReducer from './components/UnpublishedFeedbackList/reducer';
import unpublishedFeedbackReducer from './components/UnpublishedFeedback/reducer';
import participantPageReducer from './containers/ParticipantPage/reducer';
import participantApiReducer from './services/reducer';

// Import root app
import App from 'containers/App';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import 'styles/theme.scss';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

const reducer = combineReducers({
  nicknameProviderReducer,
  participantButtonBarReducer,
  participantApiReducer,
  feedbackDialogReducer,
  unpublishedFeedbackListReducer,
  unpublishedFeedbackReducer,
  participantPageReducer
})
export const store = createStore(reducer);
const MOUNT_NODE = document.getElementById('app');
Modal.setAppElement('#app')

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
