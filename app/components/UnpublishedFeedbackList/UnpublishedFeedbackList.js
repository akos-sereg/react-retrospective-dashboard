import React from 'react';
import PropTypes from 'prop-types';
import UnpublishedFeedback from '../UnpublishedFeedback';
import './style.scss';

class UnpublishedFeedbackList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const unpublishedFeedbacks = this.props.feedbacks ? this.props.feedbacks.map((feedback) => (
      <UnpublishedFeedback
        key={feedback.id}
        id={feedback.id}
        comment={feedback.comment}
        mood={feedback.mood}
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
  dispatch: PropTypes.func,
  feedbacks: PropTypes.array,
  onDelete: PropTypes.func
};

export default UnpublishedFeedbackList;
