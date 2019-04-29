import React from 'react';
import { Helmet } from 'react-helmet';
import NicknameProvider from '../../components/NicknameProvider';
import './style.scss';
import logo from '../../assets/meeting-black.png';

export default class AboutPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    // static site, no need to update anything
    return false;
  }

  render() {
    return (
      <div className="participant-wrapper">
        <Helmet>
          <title>Participant (web)</title>
          <meta
            name="description"
            content="Desktop Participant page"
          />
        </Helmet>

        <div className="participant-logo-head">
          <img src={logo} alt="logo" />
          <div>
            <span>Retrospective Dashboard</span><br />
            <p>Join the session and provide feedbacks below.</p>
          </div>
        </div>
        <div className="participant-logo-clear" />

        <NicknameProvider />
      </div>
    );
  }
}
