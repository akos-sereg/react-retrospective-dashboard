import React from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import { moodSelected } from '../actions';
import assetStart from '../../../../assets/start.png';
import assetIdea from '../../../../assets/idea.png';
import assetSaveTime from '../../../../assets/save-time.png';
import assetGift from '../../../../assets/gift.png';

class FourLs extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.selectMood = this.selectMood.bind(this);
  }

  getClassNames() {
    const classNames = {};
    if (this.props.feedback) {
      switch (this.props.feedback.glad) {
        case 1.0:
          classNames.liked = 'feedback-mood-highlight';
          break;
        case 0.75:
          classNames.learned = 'feedback-mood-highlight';
          break;
        case 0.25:
          classNames.lacked = 'feedback-mood-highlight';
          break;
        case 0.0:
          classNames.longedFor = 'feedback-mood-highlight';
          break;
        default:
          classNames.liked = 'feedback-mood-highlight';
      }
    } else {
      classNames.liked = 'feedback-mood-highlight';
    }

    return classNames;
  }

  selectMood(event, glad) {
    if (event) {
      event.stopPropagation();
    }

    this.props.dispatch(moodSelected(glad));
  }

  render() {
    const classNames = this.getClassNames();

    return (
      <div className="fourls-float-left">
        <div
          onClick={(e) => this.selectMood(e, 1.0)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-liked"
          role="button"
          tabIndex="0"
          className={classNames.liked}
          test-id="liked-selector"
        >
          <img height="120" src={assetStart} alt="Liked" />
          <p>LIKED</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.75)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-learned"
          role="button"
          tabIndex="0"
          className={classNames.learned}
          test-id="learned-selector"
        >
          <img height="120" src={assetIdea} alt="Learned" />
          <p>LEARNED</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.25)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-lacked"
          role="button"
          tabIndex="0"
          className={classNames.lacked}
          test-id="lacked-selector"
        >
          <img height="120" src={assetSaveTime} alt="Lacked" />
          <p>LACKED</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.0)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-longed-for"
          role="button"
          tabIndex="0"
          className={classNames.longedFor}
          test-id="longed-for-selector"
        >
          <img height="120" src={assetGift} alt="Longed For" />
          <p>LONGED FOR</p>
        </div>
      </div>
    );
  }
}

FourLs.propTypes = {
  dispatch: PropTypes.func,
  feedback: PropTypes.object,
};

const getMoodInficatorAsset = (glad) => {
  let moodIndicator = null;
  let moodIndicatorAutomationId = null;
  switch (glad) {
    case 1.0:
      moodIndicator = assetStart;
      moodIndicatorAutomationId = 'image-sticker-liked';
      break;
    case 0.75:
      moodIndicator = assetIdea;
      moodIndicatorAutomationId = 'image-sticker-learned';
      break;
    case 0.25:
      moodIndicator = assetSaveTime;
      moodIndicatorAutomationId = 'image-sticker-lacked';
      break;
    case 0.0:
      moodIndicator = assetGift;
      moodIndicatorAutomationId = 'image-sticker-longed-for';
      break;
    default:
      moodIndicator = assetStart;
      moodIndicatorAutomationId = 'image-sticker-liked';
      break;
  }

  return { moodIndicator, moodIndicatorAutomationId };
};

export default FourLs;
export { getMoodInficatorAsset };

