import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class ConnectionIndicator extends React.Component {
  render() {
    const classes = [];
    classes.push('connection-indicator-wrapper');
    if (this.props.isConnecting) {
      classes.push('connecting');
    } else if (this.props.isConnected) {
      classes.push('connected');
    }

    return this.props.isConnecting ?
      (
        <span className={classes.join(' ')}>connecting ...</span>
      ) : (
        <span className={classes.join(' ')}>
          {this.props.isConnected ? 'connected' : 'not connected'}
        </span>
      );
  }
}

ConnectionIndicator.propTypes = {
  isConnected: PropTypes.bool,
  isConnecting: PropTypes.bool
};

export default ConnectionIndicator;
