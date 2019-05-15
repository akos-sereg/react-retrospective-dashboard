import React from 'react';
import PropTypes from 'prop-types';
import UnpublishedFeedback from '../UnpublishedFeedback';
import './style.scss';

class UnpublishedFeedbackList extends React.Component {
  render() {
    let unpublishedFeedbacks = this.props.feedbacks ? this.props.feedbacks.map((feedback) => (
      <UnpublishedFeedback
        key={feedback.id}
        feedback={feedback}
        onDelete={this.props.onDelete}
        onPublish={this.props.onPublish}
      />
    )) : (<div />);

    if (this.props.feedbacks && this.props.feedbacks.length === 0) {
      unpublishedFeedbacks = (<div className="nothing-to-publish">No feedback to be published yet.<br />click on "Create" button ...</div>);
    }

    return (
      <div className="feedback-list-wrapper">
        {unpublishedFeedbacks}
      </div>);
  }
}

UnpublishedFeedbackList.propTypes = {
  // dispatch: PropTypes.func,
  feedbacks: PropTypes.array,
  onDelete: PropTypes.func,
  onPublish: PropTypes.func
};

export default UnpublishedFeedbackList;
