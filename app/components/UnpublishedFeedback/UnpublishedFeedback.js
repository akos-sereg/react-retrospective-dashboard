import React from 'react';
import PropTypes from 'prop-types';
import { editFeedback } from './actions';
import './style.scss';
import '../../styles/global-styles.scss';
import assetGlad from '../../assets/glad.png';
import assetSad from '../../assets/sad.png';
import assetMad from '../../assets/mad.png';
import assetEdit from '../../assets/icons/edit.svg';
import assetShare from '../../assets/icons/share.svg';
import assetTrash from '../../assets/icons/trash.svg';
import { confirmationDialogOpening } from '../ConfirmationDialog/actions';

class UnpublishedFeedback extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  getMoodInficatorAsset() {
    let moodIndicator = null;
    switch (this.props.feedback.mood) {
      case 'glad':
        moodIndicator = assetGlad;
        break;
      case 'sad':
        moodIndicator = assetSad;
        break;
      case 'mad':
        moodIndicator = assetMad;
        break;
      default:
        moodIndicator = assetGlad;
        break;
    }

    return moodIndicator;
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.dispatch(editFeedback(this.props.feedback));
  }

  handlePublish(event) {
    event.preventDefault();

    this.props.dispatch(confirmationDialogOpening(
      'Publish',
      'Are you sure you want to Publish?',
      () => {
        this.props.onPublish(this.props.feedback);
      }));
  }

  handleDelete(event) {
    event.preventDefault();

    this.props.dispatch(confirmationDialogOpening(
      'Delete',
      'Are you sure you want to Delete?',
      () => {
        this.props.onDelete(this.props.feedback.id);
      }));
  }

  render() {
    const moodIndicator = this.getMoodInficatorAsset();
    const isPublishing = this.props.publishingFeedbackIds
      && this.props.publishingFeedbackIds.indexOf(this.props.feedback.id) !== -1;

    const classNames = ['quote-container'];
    if (isPublishing) {
      classNames.push('feedback-publishing');
    }

    return (
      <div className={classNames.join(' ')}>
        <blockquote className="note yellow">

          <div className="comment-image"><img src={moodIndicator} width="60" alt="mood indicator" /></div>
          <div className="comment-text">{this.props.feedback.comment}</div>

        </blockquote>
        <div className="div-clear"></div>

        {isPublishing ? (<div />) : (
          <div className="feedback-card-actions">
            <a href="#" onClick={(e) => this.handleDelete(e)}><img alt="edit" src={assetTrash} width="20" /> Delete</a>
            <a href="#" onClick={(e) => this.handleEdit(e)}><img alt="edit" src={assetEdit} width="20" /> Edit</a>
            <a href="#" onClick={(e) => this.handlePublish(e)}><img alt="edit" src={assetShare} width="20" /> Publish</a>
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
  publishingFeedbackIds: PropTypes.array
};

export default UnpublishedFeedback;

