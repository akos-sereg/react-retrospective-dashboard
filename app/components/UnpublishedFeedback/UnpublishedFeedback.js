import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class UnpublishedFeedback extends React.Component {
  render() {
    return (
      <div className="quote-container">
        <blockquote className="note yellow">
          {this.props.comment}
          <cite className="author"></cite>
        </blockquote>
      </div>
    );
  }
}

UnpublishedFeedback.propTypes = {
  // dispatch: PropTypes.func,
  comment: PropTypes.string,
};

export default UnpublishedFeedback;

