import React from 'react';
import PropTypes from 'prop-types';
import { editFeedback } from './actions';
import './style.scss';
import '../../styles/global-styles.scss';
import assetGlad from '../../assets/glad.png';
import assetSad from '../../assets/sad.png';
import assetMad from '../../assets/mad.png';

class UnpublishedFeedback extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.props.dispatch(editFeedback(this.props.feedback));
  }

  render() {
    const moodIndicator = this.getMoodInficatorAsset();

    return (
      <div className="quote-container">
        <blockquote className="note yellow">

          <div className="comment-image"><img src={moodIndicator} width="60" alt="mood indicator" /></div>
          <div className="comment-text">{this.props.feedback.comment}</div>

        </blockquote>
        <div className="div-clear"></div>

        <div className="feedback-card-actions">
          <a href="#" onClick={() => this.props.onDelete(this.props.feedback.id)}>Delete</a><br />
          <a href="#" onClick={this.handleEdit}>Edit</a><br />
        </div>

      </div>
    );
  }

  getMoodInficatorAsset = () => {
    let moodIndicator = null;
    switch (this.props.feedback.mood) {
      case 'glad':
        moodIndicator = assetGlad;
        break;
      case 'sad':
        moodIndicator = assetSad;
        break;
      case 'mad':
        moodIndicator = assetMad;
        break;
      default:
        moodIndicator = assetGlad;
        break;
    }

    return moodIndicator;
  }
}

UnpublishedFeedback.propTypes = {
  dispatch: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired,
};

export default UnpublishedFeedback;

