import connect from 'react-redux/es/connect/connect';
import ConnectionIndicator from './ConnectionIndicator';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionIndicator);

