import connect from 'react-redux/es/connect/connect';
import BoardFeedbackList from './BoardFeedbackList';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardFeedbackList);

