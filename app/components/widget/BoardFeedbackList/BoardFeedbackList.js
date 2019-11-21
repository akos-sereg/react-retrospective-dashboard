import React from 'react';
import PropTypes from 'prop-types';
import BoardFeedback from '../BoardFeedback/index';
import './style.scss';

class BoardFeedbackList extends React.Component {
  render() {
    let boardFeedbacks = this.props.feedbacks ? this.props.feedbacks.map((feedback) => (
      <BoardFeedback
        key={feedback.id}
        feedback={feedback}
        getMoodInficatorAsset={this.props.getMoodInficatorAsset}
      />
    )) : (<div />);

    if (this.props.feedbacks && this.props.feedbacks.length === 0) {
      boardFeedbacks = (<div className="nothing-published">No feedbacks published.</div>);
    }

    return (
      <div className="board-feedback-list-wrapper">
        {boardFeedbacks}
      </div>);
  }
}

BoardFeedbackList.propTypes = {
  // dispatch: PropTypes.func,
  feedbacks: PropTypes.array,
  getMoodInficatorAsset: PropTypes.func.isRequired,
};

export default BoardFeedbackList;
