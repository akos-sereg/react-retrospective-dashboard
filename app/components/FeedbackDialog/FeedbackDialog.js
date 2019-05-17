import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import toastr from 'toastr';
import { feedbackDialogClosing } from './actions';
import './style.scss';
import '../../styles/global-styles.scss';
import Button from '../Button';
import GladSadMad from './variations/GladSadMad';

class FeedbackDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      commentText: '',
      mode: 'create' // create | update
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.createFeedback = this.createFeedback.bind(this);
    this.updateFeedback = this.updateFeedback.bind(this);
    this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  createFeedback() {
    if (this.state.commentText.length === 0) {
      toastr.warning('Comment is empty');
      return;
    }

    this.props.onSave({ mood: this.props.feedback.mood, comment: this.state.commentText });
    this.props.dispatch(feedbackDialogClosing());
  }

  updateFeedback() {
    if (this.state.commentText.length === 0) {
      toastr.warning('Comment is empty');
      return;
    }

    this.props.onUpdate({
      id: this.props.feedback.id,
      mood: this.props.feedback.mood,
      comment: this.state.commentText,
    });

    this.props.dispatch(feedbackDialogClosing());
  }

  handleCommentTextChange(element) {
    const text = element.target.value;
    this.setState(() => ({ ...this.state, commentText: text }));
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
          contentLabel="Feedback Modal"
          overlayClassName="feedback-dialog-overlay"
        >

          <h4>Create Feedback</h4>
          <hr align="true" />
          <GladSadMad feedback={this.props.feedback} dispatch={this.props.dispatch} />
          <div className="div-clear" />

          <div className="form-group">
            <label htmlFor="feedback-comment">Comment:
              <textarea
                defaultValue={this.props.feedback ? this.props.feedback.comment : null}
                onChange={(e) => this.handleCommentTextChange(e)}
                className="form-control"
                id="feedback-comment"
              />
            </label>
          </div>

          <div className="feedback-dialog-buttons">
            {this.props.mode === 'create' ?
              (<Button float="right" marginLeft="10" onClick={this.createFeedback} buttonType="primary" label="Create" />)
              :
              (<Button float="right" marginLeft="10" onClick={this.updateFeedback} buttonType="primary" label="Update" />)}

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
  feedback: PropTypes.object,
  onSave: PropTypes.func,
  onUpdate: PropTypes.func,
  mode: PropTypes.string
};

export default FeedbackDialog;
