import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import NicknameProvider from '../../components/NicknameProvider';
import ParticipantButtonBar from '../../components/ParticipantButtonBar';
import UnpublishedFeedbackList from '../../components/UnpublishedFeedbackList';
import FeedbackDialog from '../../components/FeedbackDialog';
import LocalStorageOfCommentsService from '../../services/LocalStorageOfCommentsService';
import { pageLoading } from './actions';
import './style.scss';
import logo from '../../assets/meeting-black.png';

class ParticipantPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleFeedbackSave = this.handleFeedbackSave.bind(this);
    this.handleFeedbackDelete = this.handleFeedbackDelete.bind(this);
    this.commentsService = LocalStorageOfCommentsService.getInstance(this.props.dispatch);
  }

  componentWillMount() {
    this.props.dispatch(pageLoading(this.commentsService.getFeedbackList()));
  }

  handleFeedbackSave(feedback) {
    this.commentsService.create(feedback);
  }

  handleFeedbackDelete(feedbackId) {
    this.commentsService.delete(feedbackId);
  }

  render() {
    return (
      <div className="participant-wrapper">
        <Helmet>
          <title>Participant (web)</title>
          <meta
            name="description"
            content="Desktop Participant page"
          />
        </Helmet>

        <div className="participant-logo-head">
          <img src={logo} alt="logo" />
          <div>
            <span>Retrospective Dashboard</span><br />
            <p>Join the session and provide feedbacks below.</p>
          </div>
        </div>
        <div className="div-clear" />

        <NicknameProvider />
        <div className="div-clear" />

        <ParticipantButtonBar />
        <UnpublishedFeedbackList feedbacks={this.props.feedbacks} onDelete={this.handleFeedbackDelete} />

        <FeedbackDialog onSave={this.handleFeedbackSave} />

      </div>
    );
  }
}

ParticipantPage.propTypes = {
  dispatch: PropTypes.func,
  feedbacks: PropTypes.array,
};

export default ParticipantPage;
