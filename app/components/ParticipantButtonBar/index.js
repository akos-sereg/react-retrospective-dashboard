import connect from 'react-redux/es/connect/connect';
import ParticipantButtonBar from './ParticipantButtonBar';

const mapStateToProps = (state) => ({
  ...state,
  isUserReady: state.participantButtonBarReducer.isConnected,
  isFeedbackDialogOpen: state.participantButtonBarReducer.isFeedbackDialogOpen
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantButtonBar);

