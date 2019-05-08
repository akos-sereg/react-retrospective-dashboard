import connect from 'react-redux/es/connect/connect';
import ParticipantButtonBar from './ParticipantButtonBar';

const mapStateToProps = (state) => ({
  ...state,
  isUserReady: state.participantButtonBarReducer.isConnected
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantButtonBar);

