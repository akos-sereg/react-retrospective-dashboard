import React from 'react';
import { Helmet } from 'react-helmet';
import NicknameProvider from '../../components/NicknameProvider';
import './style.scss';

export default class AboutPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    // static site, no need to update anything
    return false;
  }

  render() {
    return (
      <div className="about-page">
        <Helmet>
          <title>Participant (web)</title>
          <meta
            name="description"
            content="Desktop Participant page"
          />
        </Helmet>

        <NicknameProvider />
      </div>
    );
  }
}
