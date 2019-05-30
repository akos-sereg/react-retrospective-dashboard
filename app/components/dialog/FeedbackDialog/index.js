import connect from 'react-redux/es/connect/connect';
import FeedbackDialog from './FeedbackDialog';

const mapStateToProps = (state) => ({
  ...state,
  modalIsOpen: state.feedbackDialogReducer.modalIsOpen,
  feedback: state.feedbackDialogReducer.feedback,
  mode: state.feedbackDialogReducer.mode,
  commentText: state.feedbackDialogReducer.commentText,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDialog);
