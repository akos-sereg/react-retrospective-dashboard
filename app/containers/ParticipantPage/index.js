import connect from 'react-redux/es/connect/connect';
import ParticipantPage from './ParticipantPage';

const mapStateToProps = (state) => ({
  ...state,
  feedbacks: state.participantPageReducer.feedbacks,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage);

