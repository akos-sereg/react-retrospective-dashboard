import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from '../Button';
import { confirmationDialogClosing } from './actions';
import '../../styles/global-styles.scss';

class ConfirmationDialog extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    try {
      this.props.onConfirmed();
    } catch (error) {
      // do not panic on error, user code is broken
    }

    this.props.dispatch(confirmationDialogClosing());
  }

  render() {
    const customStyles = {
      content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '800px',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={() => this.props.dispatch(confirmationDialogClosing())}
          style={customStyles}
          contentLabel="Confirmation Modal"
          overlayClassName="feedback-dialog-overlay"
        >

          <h4>{this.props.title}</h4>
          <div test-id="confirmation-dialog-text">{this.props.text}</div>

          <hr align="true" />
          <Button
            float="right"
            buttonType="primary"
            label="OK"
            testId="confirmation-dialog-ok"
            onClick={() => this.handleConfirm()}
            marginLeft="10"
          />

          <Button
            float="right"
            buttonType="default"
            testId="confirmation-dialog-close"
            label="Cancel"
            onClick={() => this.props.dispatch(confirmationDialogClosing())}
          />

        </Modal>
      </div>
    );
  }
}

ConfirmationDialog.propTypes = {
  dispatch: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  onConfirmed: PropTypes.func,
};

export default ConfirmationDialog;
