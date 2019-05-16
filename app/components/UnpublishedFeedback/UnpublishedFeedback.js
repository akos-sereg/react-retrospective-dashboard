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

class UnpublishedFeedback extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.feedback.id);
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.dispatch(editFeedback(this.props.feedback));
  }

  handlePublish(event) {
    event.preventDefault();
    this.props.onPublish(this.props.feedback);
  }

  render() {
    const moodIndicator = this.getMoodInficatorAsset();

    return (
      <div className="quote-container">
        <blockquote className="note yellow">

          <div className="comment-image"><img src={moodIndicator} width="60" alt="mood indicator" /></div>
          <div className="comment-text">{this.props.feedback.comment}</div>

        </blockquote>
        <div className="div-clear"></div>

        <div className="feedback-card-actions">
          <a href="#" onClick={(e) => this.handleDelete(e)}><img alt="edit" src={assetTrash} width="20" /> Delete</a><br />
          <a href="#" onClick={(e) => this.handleEdit(e)}><img alt="edit" src={assetEdit} width="20" /> Edit</a><br />
          <a href="#" onClick={(e) => this.handlePublish(e)}><img alt="edit" src={assetShare} width="20" /> Publish</a><br />
        </div>

      </div>
    );
  }

  getMoodInficatorAsset = () => {
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
}

UnpublishedFeedback.propTypes = {
  dispatch: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired,
};

export default UnpublishedFeedback;

