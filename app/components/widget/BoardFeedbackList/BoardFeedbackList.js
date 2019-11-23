import React from 'react';
import PropTypes from 'prop-types';
import BoardFeedback from '../BoardFeedback/index';
import './style.scss';
import { getCookie } from '../../../utils/cookies';
import { COOKIE_USERNAME } from '../../../utils/constants';

class BoardFeedbackList extends React.Component {
  render() {

    let boardFeedbacks = this.props.feedbacks ? this.props.feedbacks.map((feedback) => {
      // we need to use the username that we can find in Cookies. keep in mind that the user might not joined
      // the session right now (load screen, pre-load already voted items).
      const username = getCookie(COOKIE_USERNAME);
      const voted = this.props.votes.find(
        (x) => (x.feedbackId === feedback.id && x.username === username)) != null;

      return (
        <BoardFeedback
          key={feedback.id}
          feedback={feedback}
          voted={voted}
          getMoodInficatorAsset={this.props.getMoodInficatorAsset}
        />
      )
    }) : (<div />);

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
  votes: PropTypes.array,
  getMoodInficatorAsset: PropTypes.func.isRequired,
};

export default BoardFeedbackList;
