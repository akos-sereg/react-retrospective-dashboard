import React from 'react';
import './style.scss';

class UnpublishedFeedback extends React.Component {
  render() {
    return (
      <div className="quote-container">
        <i className="pin"></i>
        <blockquote className="note yellow">
          We can't solve problems by using the same kind of thinking we used when we created them.
          <cite className="author"></cite>
        </blockquote>
      </div>
    );
  }
}

export default UnpublishedFeedback;
