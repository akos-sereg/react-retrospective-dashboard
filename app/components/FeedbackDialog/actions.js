import {
  FEEDBACK_DIALOG_CLOSING,
  MOOD_SELECTED
} from '../../utils/constants';

const feedbackDialogClosing = () => ({
  type: FEEDBACK_DIALOG_CLOSING,
  payload: { }
});

const moodSelected = (mood) => ({
  type: MOOD_SELECTED,
  payload: { mood }
});

export {
  feedbackDialogClosing,
  moodSelected
};
