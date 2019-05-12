import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { feedbackDialogClosing } from './actions';
import './style.scss';
import '../../styles/global-styles.scss';
import Button from '../Button';
import GladSadMad from './variations/GladSadMad';

class FeedbackDialog extends React.Component {
  constructor() {
    super();

    this.state = { };
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
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
          onRequestClose={() => this.props.dispatch(feedbackDialogClosing())}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName="feedback-dialog-overlay"
        >

          <h4>Create Feedback</h4>
          <hr align />
          <GladSadMad feedback={this.props.feedback} dispatch={this.props.dispatch} />
          <div className="div-clear" />

          <div className="form-group">
            <label htmlFor="feedback-comment">Comment:
              <textarea className="form-control" id="feedback-comment" />
            </label>
          </div>

          <div className="feedback-dialog-buttons">
            <Button float="right" onClick={() => {}} label="Submit" />
            <Button float="right" onClick={() => this.props.dispatch(feedbackDialogClosing())} label="Cancel" />
          </div>


        </Modal>
      </div>
    );
  }
}

FeedbackDialog.propTypes = {
  dispatch: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  feedback: PropTypes.object
};

export default FeedbackDialog;
