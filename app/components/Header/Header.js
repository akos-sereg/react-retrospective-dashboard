import React from 'react';
import { Link } from 'react-router-dom';
import Favicon from './images/favicon.ico';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <Link to="app" className="navbar-brand">
            <img alt="Favicon" src={Favicon} height="24" />
          </Link>
          <ul className="nav navbar-nav">

            <li><Link to="/app">Home</Link></li>
            <li><Link to="/authors">Authors</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/participant">Participant</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
