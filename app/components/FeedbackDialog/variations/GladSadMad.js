import React from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import { moodSelected } from '../actions';
import assetGlad from '../../../assets/glad.png';
import assetSad from '../../../assets/sad.png';
import assetMad from '../../../assets/mad.png';

class GladSadMad extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.selectMood = this.selectMood.bind(this);
  }

  selectMood(event, mood) {
    event.stopPropagation();
    this.props.dispatch(moodSelected(mood));
  }

  render() {
    const classNames = {};
    classNames.glad = this.props.feedback && this.props.feedback.mood === 'glad' ? 'feedback-mood-highlight' : '';
    classNames.sad = this.props.feedback && this.props.feedback.mood === 'sad' ? 'feedback-mood-highlight' : '';
    classNames.mad = this.props.feedback && this.props.feedback.mood === 'mad' ? 'feedback-mood-highlight' : '';

    return (
      <div className="gsm-float-left">
        <div onClick={(e) => this.selectMood(e, 'glad')} onKeyPress={() => {}} role="button" tabIndex="0" className={classNames.glad}>
          <img height="120" src={assetGlad} alt="Glad" />
          <p>SELECTED</p>
        </div>
        <div onClick={(e) => this.selectMood(e, 'sad')} onKeyPress={() => {}} role="button" tabIndex="0" className={classNames.sad}>
          <img height="120" src={assetSad} alt="Sad" />
          <p>SELECTED</p>
        </div>
        <div onClick={(e) => this.selectMood(e, 'mad')} onKeyPress={() => {}} role="button" tabIndex="0" className={classNames.mad}>
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

