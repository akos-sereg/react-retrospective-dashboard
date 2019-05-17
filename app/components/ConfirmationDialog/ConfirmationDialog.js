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

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  handleConfirm() {
    try {
      this.props.onConfirmed();
    } catch (error) {
      console.log(error);
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
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => this.props.dispatch(confirmationDialogClosing())}
          style={customStyles}
          contentLabel="Confirmation Modal"
          overlayClassName="feedback-dialog-overlay"
        >

          <h4>{this.props.title}</h4>
          {this.props.text}

          <hr align="true" />
          <Button
            float="right"
            buttonType="primary"
            label="OK"
            onClick={() => this.handleConfirm()}
            marginLeft="10"
          />

          <Button
            float="right"
            buttonType="default"
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
