import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import toastr from 'toastr';
import { feedbackDialogClosing } from './actions';
import './style.scss';
import '../../../styles/global-styles.scss';
import Button from '../../core/Button';
import GladSadMad from './variations/GladSadMad';
import StartStopContinue from './variations/StartStopContinue';
import FourLs from './variations/FourLs';
import PlusMinusInteresting from "./variations/PlusMinusInteresting";

class FeedbackDialog extends React.Component {
  static COMMENT_MAX_CHAR = 150;

  constructor() {
    super();

    this.state = {
      commentText: '',
      commentCharsLeft: FeedbackDialog.COMMENT_MAX_CHAR,
      mode: 'create' // create | update
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.createFeedback = this.createFeedback.bind(this);
    this.updateFeedback = this.updateFeedback.bind(this);
    this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
  }

  afterOpenModal() {
    this.setState(() => ({
      ...this.state,
      commentText: this.props.feedback ? this.props.feedback.comment : '',
      commentCharsLeft: FeedbackDialog.COMMENT_MAX_CHAR
    }));
  }

  createFeedback() {
    if (this.state.commentText.length === 0) {
      toastr.warning('Comment is empty');
      return;
    }

    this.props.onSave({ glad: this.props.feedback.glad, comment: this.state.commentText });
    this.props.dispatch(feedbackDialogClosing());
  }

  updateFeedback() {
    if (this.state.commentText.length === 0) {
      toastr.warning('Comment is empty');
      return;
    }

    this.props.onUpdate({
      id: this.props.feedback.id,
      glad: this.props.feedback.glad,
      comment: this.state.commentText,
    });

    this.props.dispatch(feedbackDialogClosing());
  }

  handleCommentTextChange(element) {
    const text = element.target.value;
    this.setState(() => ({ ...this.state, commentText: text, commentCharsLeft: (FeedbackDialog.COMMENT_MAX_CHAR - text.length) }));
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

          {this.props.boardType === 'gsm' ?
            <GladSadMad feedback={this.props.feedback} dispatch={this.props.dispatch} />
            : <div /> }

          {this.props.boardType === 'ssc' ?
            <StartStopContinue feedback={this.props.feedback} dispatch={this.props.dispatch} />
            : <div /> }

          {this.props.boardType === '4ls' ?
            <FourLs feedback={this.props.feedback} dispatch={this.props.dispatch} />
            : <div /> }

          {this.props.boardType === 'pmi' ?
            <PlusMinusInteresting feedback={this.props.feedback} dispatch={this.props.dispatch} />
            : <div /> }

          <div className="div-clear" />

          <div className="form-group">
            <label htmlFor="feedback-comment">Comment ({this.state.commentCharsLeft} characters left)
              <textarea
                automation-id="comment-textarea"
                maxLength={FeedbackDialog.COMMENT_MAX_CHAR}
                defaultValue={this.props.feedback ? this.props.feedback.comment : null}
                onChange={(e) => this.handleCommentTextChange(e)}
                className="form-control"
                id="feedback-comment"
                test-id="feedback-comment"
              />
            </label>
          </div>

          <div className="feedback-dialog-buttons">
            {this.props.mode === 'create' ?
              (<Button float="right" marginLeft="10" testId="feedback-dialog-create" automationId="add-comment-submit-btn" onClick={this.createFeedback} buttonType="primary" label="Create" />)
              :
              (<Button float="right" marginLeft="10" testId="feedback-dialog-update" automationId="edit-comment-submit-btn" onClick={this.updateFeedback} buttonType="primary" label="Update" />)}

            <Button float="right" onClick={() => this.props.dispatch(feedbackDialogClosing())} testId="feedback-dialog-close" label="Cancel" />
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
  mode: PropTypes.string,
  boardType: PropTypes.string.isRequired,
};

export default FeedbackDialog;
