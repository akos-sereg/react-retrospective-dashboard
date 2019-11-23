import connect from 'react-redux/es/connect/connect';
import ParticipantPage from './ParticipantPage';

const mapStateToProps = (state) => ({
  ...state,
  feedbacks: state.participantPageReducer.feedbacks,
  boardFeedbacks: state.participantPageReducer.boardFeedbacks,
  votes: state.participantPageReducer.votes,
  votingStarted: state.participantPageReducer.votingStarted,
  votingScreenDisplayed: state.participantPageReducer.votingScreenDisplayed,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage);

