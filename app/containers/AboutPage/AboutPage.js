import React from 'react';
import { Helmet } from 'react-helmet';
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
          <title>About Page</title>
          <meta
            name="description"
            content="About page of React.js Boilerplate application"
          />
        </Helmet>

        <h1>About</h1>
        This application uses the following technologies:
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>Redux</li>
          <li>Node</li>
          <li>Bootstrap</li>
        </ul>
      </div>
    );
  }
}
