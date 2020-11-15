import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import '../style.scss';
import { moodSelected, giphySelected } from '../actions';
import assetGlad from '../../../../assets/favorite.png';
import assetSad from '../../../../assets/sad.png';
import assetMad from '../../../../assets/vomit.png';
import TextInput from '../../../core/TextInput/TextInput';
import Button from '../../../core/Button/Button';
import GiphyService from '../../../../services/GiphyService';

class GladSadMadGiphy extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleGiphySearchTextChange = this.handleGiphySearchTextChange.bind(this);
    this.searchGiphy = this.searchGiphy.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.selectMood = this.selectMood.bind(this);

    this.state = {
      giphySearchText: '',
      giphyResults: null,
      giphyResultIndex: null,
      isLoadingGiphys: false,
    };

    this.giphyService = new GiphyService();
    this.maxHeight = 180;
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

  handleGiphySearchTextChange(element) {
    const text = element.target.value;
    this.setState(() => ({ ...this.state, giphySearchText: text }));
  }

  async searchGiphy(event) {
    if (event) {
      event.stopPropagation();
    }

    const searchText = this.state.giphySearchText;

    this.setState(() => ({ ...this.state, isLoadingGiphys: true }));
    const self = this;
    setTimeout(() => {
      if (self.state.isLoadingGiphys) {
        this.setState(() => ({ ...this.state, isLoadingGiphys: false }));
        toastr.warning('Could not fetch data from Giphy in a timely manner. Please try again.');
      }
    }, 5000);
    const giphyResults = await this.giphyService.search(searchText);
    this.setState(() => ({ ...this.state, isLoadingGiphys: false }));

    this.setState(() => ({ ...this.state, giphyResults, giphyResultIndex: 0 }));

    if (giphyResults && giphyResults.data && giphyResults.data.length > 0
      && giphyResults.data[0].images && giphyResults.data[0].images) {
      this.props.dispatch(giphySelected(giphyResults.data[0].images.downsized.url, giphyResults.data[0].images.downsized.height));
    }
  }

  shuffle(event) {
    if (event) {
      event.stopPropagation();
    }

    const currentIndex = this.state.giphyResultIndex;
    let randomIndex = Math.floor(Math.random() * this.state.giphyResults.data.length);

    // make an effort to choose a different gif from the previous one
    for (let i = 0; i !== 3; i += 1) {
      if (randomIndex !== currentIndex) {
        break;
      }

      randomIndex = Math.floor(Math.random() * this.state.giphyResults.data.length);
    }

    this.setState(() => ({ ...this.state, giphyResultIndex: randomIndex }));
    this.props.dispatch(giphySelected(this.state.giphyResults.data[randomIndex].images.downsized.url));
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
      <div>
        <div className="gsm-float-left-giphy">
          <div
            onClick={(e) => this.selectMood(e, 1.0)}
            onKeyPress={() => {}}
            automation-id="radio-add-comment-glad"
            role="button"
            tabIndex="0"
            className={classNames.glad}
            test-id="glad-selector"
          >
            <img height="80" src={assetGlad} alt="Glad" />
            <p>GLAD</p>
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
            <img height="80" src={assetSad} alt="Sad" />
            <p>SAD</p>
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
            <img height="80" src={assetMad} alt="Mad" />
            <p>MAD</p>
          </div>
        </div>

        <div style={{ width: '200px' }}>
          Search from Giphy
        </div>
        <TextInput name="giphy-search" onChange={(e) => this.handleGiphySearchTextChange(e)} width="200px" />
        <Button
          label="Search"
          onClick={async (e) => this.searchGiphy(e)}
          buttonType="primary"
          size="sm"
          isDisabled={this.state.isLoadingGiphys}
        />
        {this.state.giphyResultIndex !== null ? <Button label="Shuffle" onClick={(e) => this.shuffle(e)} buttonType="primary" size="sm" marginLeft={12} /> : <div />}

        <div style={{ clear: 'both' }} />
        <div>
          {this.state.giphyResultIndex !== null && this.state.giphyResults && this.state.giphyResults.data && this.state.giphyResults.data.length > this.state.giphyResultIndex ?
            <div className="giphy-image-center">
              <img
                src={this.state.giphyResults.data[this.state.giphyResultIndex].images.downsized.url}
                alt="Giphy"
                height={parseInt(this.state.giphyResults.data[this.state.giphyResultIndex].images.downsized.height, 10) > this.maxHeight ? this.maxHeight : this.state.giphyResults.data[this.state.giphyResultIndex].images.downsized.height}
              />
            </div>
            : <div />}

          {this.state.giphyResultIndex == null && this.props.feedback.giphyImage ?
            <div className="giphy-image-center">
              <img src={this.props.feedback.giphyImage} alt="Giphy" height={this.maxHeight} />
            </div>
            : <div />}
        </div>
      </div>
    );
  }
}

GladSadMadGiphy.propTypes = {
  dispatch: PropTypes.func,
  feedback: PropTypes.object,
};

const getMoodIndicatorAsset = (glad) => {
  let moodIndicatorAutomationId = null;
  let moodIndicatorText = null;
  switch (glad) {
    case 1.0:
      moodIndicatorText = 'Glad';
      moodIndicatorAutomationId = 'image-sticker-glad';
      break;
    case 0.5:
      moodIndicatorText = 'Sad';
      moodIndicatorAutomationId = 'image-sticker-sad';
      break;
    case 0.001:
    case 0.0:
      moodIndicatorText = 'Mad';
      moodIndicatorAutomationId = 'image-sticker-mad';
      break;
    default:
      moodIndicatorText = 'Glad';
      moodIndicatorAutomationId = 'image-sticker-glad';
      break;
  }

  return { moodIndicator: null, moodIndicatorAutomationId, moodIndicatorText };
};

export default GladSadMadGiphy;
export { getMoodIndicatorAsset };

