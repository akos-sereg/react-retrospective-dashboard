import 'babel-polyfill';
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */
import 'styles/theme.scss';

import App from 'containers/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import { HashRouter } from 'react-router-dom';
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import nicknameProviderReducer from './components/widget/NicknameProvider/reducer';
import participantButtonBarReducer from './components/widget/ParticipantButtonBar/reducer';
import feedbackDialogReducer from './components/dialog/FeedbackDialog/reducer';
import unpublishedFeedbackListReducer from './components/widget/UnpublishedFeedbackList/reducer';
import unpublishedFeedbackReducer from './components/widget/UnpublishedFeedback/reducer';
import confirmationDialogReducer from './components/dialog/ConfirmationDialog/reducer';
import participantPageReducer from './containers/ParticipantPage/reducer';
import participantApiReducer from './services/reducer';

const reducer = combineReducers({
  nicknameProviderReducer,
  participantButtonBarReducer,
  participantApiReducer,
  feedbackDialogReducer,
  unpublishedFeedbackListReducer,
  unpublishedFeedbackReducer,
  participantPageReducer,
  confirmationDialogReducer
});

export const store = createStore(reducer);
const MOUNT_NODE = document.getElementById('app');
Modal.setAppElement('#app');

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
