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
      switch (this.props.feedback.mood) {
        case 'glad':
          classNames.glad = 'feedback-mood-highlight';
          break;
        case 'sad':
          classNames.sad = 'feedback-mood-highlight';
          break;
        case 'mad':
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

  selectMood(event, mood) {
    if (event) {
      event.stopPropagation();
    }

    this.props.dispatch(moodSelected(mood));
  }

  render() {
    const classNames = this.getClassNames();

    return (
      <div className="gsm-float-left">
        <div onClick={(e) => this.selectMood(e, 'glad')} onKeyPress={() => {}} role="button" tabIndex="0" className={classNames.glad} test-id="glad-selector">
          <img height="120" src={assetGlad} alt="Glad" />
          <p>SELECTED</p>
        </div>
        <div onClick={(e) => this.selectMood(e, 'sad')} onKeyPress={() => {}} role="button" tabIndex="0" className={classNames.sad} test-id="sad-selector">
          <img height="120" src={assetSad} alt="Sad" />
          <p>SELECTED</p>
        </div>
        <div onClick={(e) => this.selectMood(e, 'mad')} onKeyPress={() => {}} role="button" tabIndex="0" className={classNames.mad} test-id="mad-selector">
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

export default GladSadMad;

