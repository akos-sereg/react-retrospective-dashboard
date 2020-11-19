import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ParticipantApi from './../../../services/ParticipantApi';
import './style.scss';
import '../../../styles/global-styles.scss';
import assetStar from '../../../assets/icons/star-mini.png';

class BoardFeedback extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      voted: this.props.voted,
    };

    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
  }

  handleVote(event) {
    if (event) {
      event.preventDefault();
    }

    if (ParticipantApi.getInstance(this.props.dispatch).username == null) {
      toastr.warning('You should join first, then you can vote.');
      return;
    }

    const newVotedState = !this.state.voted;
    this.setState(() => ({
      ...this.state,
      voted: newVotedState,
    }));

    ParticipantApi.getInstance(this.props.dispatch).vote(this.props.feedback.id, newVotedState);
    toastr.success('Your vote will be reflected on the board soon.');
  }

  isGiphyNote() {
    const matchResult = this.props.feedback.comment.match(/(.*)\[GIPHY:(.*)\]/);
    if (matchResult && matchResult.length >= 3) {
      [this.props.feedback.comment, this.props.feedback.giphyImage] = [matchResult[1], matchResult[2]];
    }

    return this.props.feedback.giphyImage != null;
  }

  render() {
    const { moodIndicator, moodIndicatorAutomationId, moodIndicatorText } = this.props.getMoodInficatorAsset(this.props.feedback.glad);
    const classNames = ['quote-container-board-feedback'];
    const noteClassNames = ['note-board-feedback'];

    if (this.state.voted) {
      noteClassNames.push('yellow-board-feedback');
    } else {
      noteClassNames.push('graybg-board-feedback');
    }

    let moodIndicatorImage = moodIndicator;
    if (!this.isGiphyNote()) {
      noteClassNames.push('note-fixed-height');
    } else {
      moodIndicatorImage = this.props.feedback.giphyImage;
    }

    return (
      <div className={classNames.join(' ')}>
        <blockquote className={noteClassNames.join(' ')}>

          {moodIndicatorImage == null ? null :
            (
              <div className="comment-image-board-feedback">
                <img
                  automation-id="sticker-mood-indicator-image"
                  automation-value={moodIndicatorAutomationId}
                  src={moodIndicatorImage}
                  width={this.isGiphyNote() ? 250 : 60}
                  alt="mood indicator"
                />
              </div>
            )
          }

          {
            this.isGiphyNote() ?
              <div style={{ clear: 'both' }} />
              : <span />
          }

          <div className="comment-text-board-feedback" automation-id="sticker-comment-div">
            {moodIndicatorText ? (<p><b>{moodIndicatorText}</b><br /></p>) : null}
            <span automation-id="sticker-comment">{this.props.feedback.comment}</span>
          </div>

        </blockquote>
        <div className="div-clear"></div>

        <div className="feedback-card-actions">
          <a href="#" onClick={(e) => this.handleVote(e)} test-id="uf-publish" automation-id="comment-item-vote-btn"><img alt="vote" src={assetStar} width="20" /> {this.state.voted ? 'Remove my vote' : 'Vote'}</a>
        </div>

      </div>
    );
  }
}

BoardFeedback.propTypes = {
  dispatch: PropTypes.func,
  feedback: PropTypes.object.isRequired,
  voted: PropTypes.bool,
  getMoodInficatorAsset: PropTypes.func.isRequired,
};

export default BoardFeedback;

