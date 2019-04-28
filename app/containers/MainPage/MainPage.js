import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class MainPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Main Page</title>
          <meta
            name="description"
            content="Main page of React.js Boilerplate application"
          />
        </Helmet>

        Main
      </div>
    );
  }
}
