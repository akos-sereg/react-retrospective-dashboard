import React from 'react';
import PropTypes from 'prop-types';
import { editFeedback } from './actions';
import './style.scss';
import '../../../styles/global-styles.scss';
import assetEdit from '../../../assets/icons/edit.svg';
import assetShare from '../../../assets/icons/share.svg';
import assetTrash from '../../../assets/icons/trash.svg';
import { confirmationDialogOpening } from '../../dialog/ConfirmationDialog/actions';

class UnpublishedFeedback extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  handleEdit(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.dispatch(editFeedback(this.props.feedback));
  }

  handlePublish(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.dispatch(confirmationDialogOpening(
      'Publish',
      'Are you sure you want to Publish?',
      () => {
        this.props.onPublish(this.props.feedback);
      }));
  }

  handleDelete(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.dispatch(confirmationDialogOpening(
      'Delete',
      'Are you sure you want to Delete?',
      () => {
        this.props.onDelete(this.props.feedback.id);
      }));
  }

  isGiphyNote() {
    return this.props.feedback.giphyImage != null;
  }

  render() {
    const {
      moodIndicator,
      moodIndicatorAutomationId,
      moodIndicatorText
    } = this.props.getMoodInficatorAsset(this.props.feedback.glad);

    const moodIndicatorImage = this.props.feedback.giphyImage ? this.props.feedback.giphyImage : moodIndicator;

    const isPublishing = this.props.publishingFeedbackIds
      && this.props.publishingFeedbackIds.indexOf(this.props.feedback.id) !== -1;

    const classNames = ['quote-container'];
    if (isPublishing) {
      classNames.push('feedback-publishing');
    }

    const classNamesBlockQuote = ['note', 'yellow'];
    if (!this.isGiphyNote()) {
      classNamesBlockQuote.push('note-fixed-height');
    }

    return (
      <div className={classNames.join(' ')}>
        <blockquote className={classNamesBlockQuote.join(' ')}>
          {moodIndicatorImage == null ? (
            <span automation-id="sticker-mood-indicator-image" automation-value={moodIndicatorAutomationId} />) :
            (
              <div className="comment-image">
                <img
                  automation-id="sticker-mood-indicator-image"
                  automation-value={moodIndicatorAutomationId}
                  src={moodIndicatorImage}
                  width={this.isGiphyNote() ? 250 : 60}
                  alt="mood indicator"
                />
              </div>)}

          {
            this.isGiphyNote() ?
              <div style={{ clear: 'both' }} />
              : <span />
          }

          <div className="comment-text">
            {moodIndicatorText ? (<p><b>{moodIndicatorText}</b><br /></p>) : null}
            <span automation-id="sticker-comment">{this.props.feedback.comment}</span>
          </div>

        </blockquote>
        <div className="div-clear"></div>

        {isPublishing ? (<div />) : (
          <div className="feedback-card-actions">
            <a href="#" onClick={(e) => this.handleDelete(e)} test-id="uf-delete" automation-id="comment-item-delete-btn"><img alt="delete" src={assetTrash} width="20" /> Delete</a>
            <a href="#" onClick={(e) => this.handleEdit(e)} test-id="uf-edit" automation-id="comment-item-edit-btn"><img alt="edit" src={assetEdit} width="20" /> Edit</a>
            <a href="#" onClick={(e) => this.handlePublish(e)} test-id="uf-publish" automation-id="comment-item-publish-btn"><img alt="publish" src={assetShare} width="20" /> Publish</a>
          </div>)
        }

      </div>
    );
  }
}

UnpublishedFeedback.propTypes = {
  dispatch: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired,
  publishingFeedbackIds: PropTypes.array,
  getMoodInficatorAsset: PropTypes.func.isRequired,
};

export default UnpublishedFeedback;

