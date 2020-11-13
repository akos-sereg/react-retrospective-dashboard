import {
  FEEDBACK_DIALOG_CLOSING,
  MOOD_SELECTED,
  GIPHY_SELECTED,
} from '../../../utils/constants';

const feedbackDialogClosing = () => ({
  type: FEEDBACK_DIALOG_CLOSING,
  payload: { }
});

const moodSelected = (glad) => ({
  type: MOOD_SELECTED,
  payload: { glad }
});

const giphySelected = (giphyImage) => ({
  type: GIPHY_SELECTED,
  payload: { giphyImage }
});

export {
  feedbackDialogClosing,
  giphySelected,
  moodSelected
};
