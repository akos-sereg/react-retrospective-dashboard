import React from 'react';
import PropTypes from 'prop-types';
import UnpublishedFeedback from '../UnpublishedFeedback';
import './style.scss';

class UnpublishedFeedbackList extends React.Component {
  render() {
    const unpublishedFeedbacks = this.props.feedbacks.map((feedback) => (
      <UnpublishedFeedback key={feedback.id} comment={feedback.comment} mood={feedback.mood} />
    ));

    return (
      <div className="feedback-list-wrapper">
        {unpublishedFeedbacks}
      </div>);
  }
}

UnpublishedFeedbackList.propTypes = {
  // dispatch: PropTypes.func,
  feedbacks: PropTypes.object,
};

export default UnpublishedFeedbackList;
