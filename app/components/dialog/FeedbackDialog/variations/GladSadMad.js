import React from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import { moodSelected } from '../actions';
import assetGlad from '../../../../assets/glad.png';
import assetSad from '../../../../assets/sad.png';
import assetMad from '../../../../assets/mad.png';

class GladSadMad extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.selectMood = this.selectMood.bind(this);
  }

  getClassNames() {
    const classNames = {};
    if (this.props.feedback) {
      switch (this.props.feedback.glad) {
        case 1.0:
          classNames.glad = 'feedback-mood-highlight';
          break;
        case 0.5:
          classNames.sad = 'feedback-mood-highlight';
          break;
        case 0.0:
          classNames.mad = 'feedback-mood-highlight';
          break;
        default:
          classNames.glad = 'feedback-mood-highlight';
      }
    } else {
      classNames.glad = 'feedback-mood-highlight';
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
      <div className="gsm-float-left">
        <div
          onClick={(e) => this.selectMood(e, 1.0)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-glad"
          role="button"
          tabIndex="0"
          className={classNames.glad}
          test-id="glad-selector"
        >
          <img height="120" src={assetGlad} alt="Glad" />
          <p>SELECTED</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.5)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-sad"
          role="button"
          tabIndex="0"
          className={classNames.sad}
          test-id="sad-selector"
        >
          <img height="120" src={assetSad} alt="Sad" />
          <p>SELECTED</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.0)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-mad"
          role="button"
          tabIndex="0"
          className={classNames.mad}
          test-id="mad-selector"
        >
          <img height="120" src={assetMad} alt="Mad" />
          <p>SELECTED</p>
        </div>
      </div>
    );
  }
}

GladSadMad.propTypes = {
  dispatch: PropTypes.func,
  feedback: PropTypes.object,
};

const getMoodInficatorAsset = (glad) => {
  let moodIndicator = null;
  let moodIndicatorAutomationId = null;
  switch (glad) {
    case 1.0:
      moodIndicator = assetGlad;
      moodIndicatorAutomationId = 'image-sticker-glad';
      break;
    case 0.5:
      moodIndicator = assetSad;
      moodIndicatorAutomationId = 'image-sticker-sad';
      break;
    case 0.0:
      moodIndicator = assetMad;
      moodIndicatorAutomationId = 'image-sticker-mad';
      break;
    default:
      moodIndicator = assetGlad;
      moodIndicatorAutomationId = 'image-sticker-glad';
      break;
  }

  return { moodIndicator, moodIndicatorAutomationId };
}

export default GladSadMad;
export { getMoodInficatorAsset };

