import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import '../../../styles/global-styles.scss';

class BoardFeedback extends React.Component {
  render() {
    const { moodIndicator, moodIndicatorAutomationId } = this.props.getMoodInficatorAsset(this.props.feedback.glad);
    const classNames = ['quote-container'];

    return (
      <div className={classNames.join(' ')}>
        <blockquote className="note yellow">

          <div className="comment-image"><img automation-id="sticker-mood-indicator-image" automation-value={moodIndicatorAutomationId} src={moodIndicator} width="60" alt="mood indicator" /></div>
          <div className="comment-text" automation-id="sticker-comment">{this.props.feedback.comment}</div>

        </blockquote>
        <div className="div-clear"></div>

      </div>
    );
  }
}

BoardFeedback.propTypes = {
  feedback: PropTypes.object.isRequired,
  getMoodInficatorAsset: PropTypes.func.isRequired,
};

export default BoardFeedback;

