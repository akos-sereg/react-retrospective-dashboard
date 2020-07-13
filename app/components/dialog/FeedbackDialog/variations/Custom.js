import React from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import { moodSelected } from '../actions';

class Custom extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.selectMood = this.selectMood.bind(this);
  }

  getClassNames() {
    const classNames = {};
    if (this.props.feedback) {
      switch (this.props.feedback.glad) {
        case 1.0:
          classNames.start = 'feedback-mood-highlight';
          break;
        case 0.0:
          classNames.stop = 'feedback-mood-highlight';
          break;
        case 0.5:
          classNames.continue = 'feedback-mood-highlight';
          break;
        default:
          classNames.start = 'feedback-mood-highlight';
      }
    } else {
      classNames.start = 'feedback-mood-highlight';
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
      <div className="custom-float-left">
        <div
          onClick={(e) => this.selectMood(e, 1.0)}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          automation-id="radio-add-comment-a"
          className={classNames.start}
        >
          <p>{this.props.customTitles[0]}</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.0)}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          automation-id="radio-add-comment-b"
          className={classNames.stop}
        >
          <p>{this.props.customTitles[1]}</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.5)}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          automation-id="radio-add-comment-c"
          className={classNames.continue}
        >
          <p>{this.props.customTitles[2]}</p>
        </div>
      </div>
    );
  }
}

Custom.propTypes = {
  dispatch: PropTypes.func,
  feedback: PropTypes.object,
  customTitles: PropTypes.array
};

Custom.customTitles = [];

const getMoodIndicatorAsset = (glad) => {
  let moodIndicator = null;
  let moodIndicatorAutomationId = null;
  let moodIndicatorText = null;
  switch (glad) {
    case 1.0:
      moodIndicator = null;
      moodIndicatorAutomationId = 'image-sticker-custom-1';
      moodIndicatorText = Custom.customTitles[0];
      break;
    case 0.0:
      moodIndicator = null;
      moodIndicatorAutomationId = 'image-sticker-custom-2';
      moodIndicatorText = Custom.customTitles[1];
      break;
    case 0.5:
      moodIndicator = null;
      moodIndicatorAutomationId = 'image-sticker-custom-3';
      moodIndicatorText = Custom.customTitles[2];
      break;
    default:
      moodIndicator = null;
      moodIndicatorAutomationId = 'image-sticker-custom-1';
      moodIndicatorText = Custom.customTitles[0];
      break;
  }

  return { moodIndicator, moodIndicatorAutomationId, moodIndicatorText };
};

export default Custom;
export { getMoodIndicatorAsset };

