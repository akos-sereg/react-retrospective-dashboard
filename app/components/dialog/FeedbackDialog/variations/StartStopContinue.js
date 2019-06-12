import React from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import { moodSelected } from '../actions';
import assetStart from '../../../../assets/start.png';
import assetStop from '../../../../assets/stop.png';
import assetContinue from '../../../../assets/continue.png';

class StartStopContinue extends React.Component {
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
      <div className="ssc-float-left">
        <div
          onClick={(e) => this.selectMood(e, 1.0)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-start"
          role="button"
          tabIndex="0"
          className={classNames.start}
          test-id="start-selector"
        >
          <img height="120" src={assetStart} alt="Start" />
          <p>START</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.0)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-stop"
          role="button"
          tabIndex="0"
          className={classNames.stop}
          test-id="stop-selector"
        >
          <img height="120" src={assetStop} alt="Stop" />
          <p>STOP</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.5)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-continue"
          role="button"
          tabIndex="0"
          className={classNames.continue}
          test-id="continue-selector"
        >
          <img height="120" src={assetContinue} alt="Continue" />
          <p>CONTINUE</p>
        </div>
      </div>
    );
  }
}

StartStopContinue.propTypes = {
  dispatch: PropTypes.func,
  feedback: PropTypes.object,
};

const getMoodInficatorAsset = (glad) => {
  let moodIndicator = null;
  let moodIndicatorAutomationId = null;
  switch (glad) {
    case 1.0:
      moodIndicator = assetStart;
      moodIndicatorAutomationId = 'image-sticker-start';
      break;
    case 0.5:
      moodIndicator = assetStop;
      moodIndicatorAutomationId = 'image-sticker-stop';
      break;
    case 0.0:
      moodIndicator = assetContinue;
      moodIndicatorAutomationId = 'image-sticker-continue';
      break;
    default:
      moodIndicator = assetStart;
      moodIndicatorAutomationId = 'image-sticker-start';
      break;
  }

  return { moodIndicator, moodIndicatorAutomationId };
};

export default StartStopContinue;
export { getMoodInficatorAsset };

