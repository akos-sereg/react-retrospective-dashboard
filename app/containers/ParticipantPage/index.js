import connect from 'react-redux/es/connect/connect';
import ParticipantPage from './ParticipantPage';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage);

