import connect from 'react-redux/es/connect/connect';
import BoardFeedback from './BoardFeedback';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardFeedback);
