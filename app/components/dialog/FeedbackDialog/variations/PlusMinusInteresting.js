import React from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import { moodSelected } from '../actions';
import assetFavorite from '../../../../assets/favorite.png';
import assetVomit from '../../../../assets/vomit.png';
import assetThinking from '../../../../assets/thinking.png';

class PlusMinusInteresting extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.selectMood = this.selectMood.bind(this);
  }

  getClassNames() {
    const classNames = {};
    if (this.props.feedback) {
      switch (this.props.feedback.glad) {
        case 1.0:
          classNames.plus = 'feedback-mood-highlight';
          break;
        case 0.0:
          classNames.minus = 'feedback-mood-highlight';
          break;
        case 0.5:
          classNames.interesting = 'feedback-mood-highlight';
          break;
        default:
          classNames.plus = 'feedback-mood-highlight';
      }
    } else {
      classNames.plus = 'feedback-mood-highlight';
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
          automation-id="radio-add-comment-plus"
          role="button"
          tabIndex="0"
          className={classNames.plus}
          test-id="plus-selector"
        >
          <img height="120" src={assetFavorite} alt="Plus" />
          <p>PLUS</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.0)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-minus"
          role="button"
          tabIndex="0"
          className={classNames.minus}
          test-id="minus-selector"
        >
          <img height="120" src={assetVomit} alt="Minus" />
          <p>MINUS</p>
        </div>

        <div
          onClick={(e) => this.selectMood(e, 0.5)}
          onKeyPress={() => {}}
          automation-id="radio-add-comment-interesting"
          role="button"
          tabIndex="0"
          className={classNames.interesting}
          test-id="interesting-selector"
        >
          <img height="120" src={assetThinking} alt="Interesting" />
          <p>INTERESTING</p>
        </div>
      </div>
    );
  }
}

PlusMinusInteresting.propTypes = {
  dispatch: PropTypes.func,
  feedback: PropTypes.object,
};

const getMoodInficatorAsset = (glad) => {
  let moodIndicator = null;
  let moodIndicatorAutomationId = null;
  switch (glad) {
    case 1.0:
      moodIndicator = assetFavorite;
      moodIndicatorAutomationId = 'image-sticker-plus';
      break;
    case 0.0:
      moodIndicator = assetVomit;
      moodIndicatorAutomationId = 'image-sticker-minus';
      break;
    case 0.5:
      moodIndicator = assetThinking;
      moodIndicatorAutomationId = 'image-sticker-interesting';
      break;
    default:
      moodIndicator = assetFavorite;
      moodIndicatorAutomationId = 'image-sticker-plus';
      break;
  }

  return { moodIndicator, moodIndicatorAutomationId };
};

export default PlusMinusInteresting;
export { getMoodInficatorAsset };

