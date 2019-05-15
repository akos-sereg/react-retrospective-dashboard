import React from 'react';
import PropTypes from 'prop-types';
import UnpublishedFeedback from '../UnpublishedFeedback';
import './style.scss';

class UnpublishedFeedbackList extends React.Component {
  render() {
    const unpublishedFeedbacks = this.props.feedbacks ? this.props.feedbacks.map((feedback) => (
      <UnpublishedFeedback
        key={feedback.id}
        feedback={feedback}
        onDelete={this.props.onDelete}
      />
    )) : (<div />);

    return (
      <div className="feedback-list-wrapper">
        {unpublishedFeedbacks}
      </div>);
  }
}

UnpublishedFeedbackList.propTypes = {
  // dispatch: PropTypes.func,
  feedbacks: PropTypes.array,
  onDelete: PropTypes.func
};

export default UnpublishedFeedbackList;
