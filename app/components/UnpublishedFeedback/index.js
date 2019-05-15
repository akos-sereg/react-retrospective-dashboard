import connect from 'react-redux/es/connect/connect';
import UnpublishedFeedback from './UnpublishedFeedback';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(UnpublishedFeedback);
