import connect from 'react-redux/es/connect/connect';
import ConfirmationDialog from './ConfirmationDialog';

const mapStateToProps = (state) => ({
  ...state,
  modalIsOpen: state.confirmationDialogReducer.modalIsOpen,
  title: state.confirmationDialogReducer.title,
  text: state.confirmationDialogReducer.text,
  onConfirmed: state.confirmationDialogReducer.onConfirmed,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog);
