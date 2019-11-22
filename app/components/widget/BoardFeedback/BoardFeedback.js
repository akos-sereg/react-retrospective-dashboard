import React from 'react';
import PropTypes from 'prop-types';
import ParticipantApi from './../../../services/ParticipantApi';
import './style.scss';
import '../../../styles/global-styles.scss';
import assetShare from '../../../assets/icons/share.svg';

class BoardFeedback extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      voted: false,
    };

    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(event) {
    if (event) {
      event.preventDefault();
    }

    const newVotedState = !this.state.voted;
    this.setState(() => ({
      ...this.state,
      voted: newVotedState,
    }));

    ParticipantApi.getInstance(null).vote(this.props.feedback.id, newVotedState);
  }

  render() {
    const { moodIndicator, moodIndicatorAutomationId } = this.props.getMoodInficatorAsset(this.props.feedback.glad);
    const classNames = ['quote-container'];
    const noteClassNames = ['note'];

    if (this.state.voted) {
      noteClassNames.push('yellow');
    } else {
      noteClassNames.push('graybg');
    }

    return (
      <div className={classNames.join(' ')}>
        <blockquote className={noteClassNames.join(' ')}>

          <div className="comment-image"><img automation-id="sticker-mood-indicator-image" automation-value={moodIndicatorAutomationId} src={moodIndicator} width="60" alt="mood indicator" /></div>
          <div className="comment-text" automation-id="sticker-comment">{this.props.feedback.comment}</div>

        </blockquote>
        <div className="div-clear"></div>

        <div className="feedback-card-actions">
          <a href="#" onClick={(e) => this.handleVote(e)} test-id="uf-publish" automation-id="comment-item-publish-btn"><img alt="publish" src={assetShare} width="20" /> {this.state.voted ? 'Unvote' : 'Vote'}</a>
        </div>

      </div>
    );
  }
}

BoardFeedback.propTypes = {
  feedback: PropTypes.object.isRequired,
  getMoodInficatorAsset: PropTypes.func.isRequired,
};

export default BoardFeedback;

