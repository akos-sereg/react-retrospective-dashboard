import React from 'react';
import UnpublishedFeedback from '../UnpublishedFeedback';
import './style.scss';

class UnpublishedFeedbackList extends React.Component {
  render() {
    return (
      <div className="feedback-list-wrapper">
        <UnpublishedFeedback />
        <UnpublishedFeedback />
        <UnpublishedFeedback />
        <UnpublishedFeedback />
        <UnpublishedFeedback />
      </div>);
  }
}

export default UnpublishedFeedbackList;
