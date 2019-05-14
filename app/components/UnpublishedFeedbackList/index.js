import connect from 'react-redux/es/connect/connect';
import UnpublishedFeedbackList from './UnpublishedFeedbackList';

const mapStateToProps = (state) => ({
  ...state,
  feedback: state.unpublishedFeedbackListReducer.feedback,
  feedbacks: state.unpublishedFeedbackListReducer.feedbacks,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(UnpublishedFeedbackList);

