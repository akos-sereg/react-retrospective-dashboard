import { EDIT_FEEDBACK_CLICKED } from '../../../utils/constants';

const editFeedback = (feedback) => ({
  type: EDIT_FEEDBACK_CLICKED,
  payload: { feedback }
});

export { editFeedback };
