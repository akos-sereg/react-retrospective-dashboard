import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import '../../styles/global-styles.scss';
import assetGlad from '../../assets/glad.png';
import assetSad from '../../assets/sad.png';
import assetMad from '../../assets/mad.png';

class UnpublishedFeedback extends React.Component {
  render() {
    const moodIndicator = this.getMoodInficatorAsset();

    return (
      <div className="quote-container">
        <blockquote className="note yellow">

          <div className="comment-image"><img src={moodIndicator} width="60" alt="mood indicator" /></div>
          <div className="comment-text">{this.props.comment}</div>


        </blockquote>
        <div className="div-clear"></div>
      </div>
    );
  }

  getMoodInficatorAsset = () => {
    let moodIndicator = null;
    switch (this.props.mood) {
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
  // dispatch: PropTypes.func,
  comment: PropTypes.string,
  mood: PropTypes.string,
};

export default UnpublishedFeedback;

