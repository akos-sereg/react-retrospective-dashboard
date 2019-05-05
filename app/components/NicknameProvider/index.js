import connect from 'react-redux/es/connect/connect';
import NicknameProvider from './NicknameProvider';

const mapStateToProps = (state) => ({
  isConnected: state.nicknameProviderReducer.isConnected,
  nickname: state.nicknameProviderReducer.nickname
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(NicknameProvider);

