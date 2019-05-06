import connect from 'react-redux/es/connect/connect';
import NicknameProvider from './NicknameProvider';

const mapStateToProps = (state) => ({
  ...state,
  isConnected: state.nicknameProviderReducer.isConnected,
  isConnecting: state.nicknameProviderReducer.isConnecting
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(NicknameProvider);

