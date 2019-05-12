import React from 'react';
import { Helmet } from 'react-helmet';
import NicknameProvider from '../../components/NicknameProvider';
import ParticipantButtonBar from '../../components/ParticipantButtonBar';
import UnpublishedFeedbackList from '../../components/UnpublishedFeedbackList';
import FeedbackDialog from '../../components/FeedbackDialog';
import commentsService from '../../services/LocalStorageOfCommentsService';
import './style.scss';
import logo from '../../assets/meeting-black.png';

export default class ParticipantPage extends React.Component {
  static FEEDBACK_DIALOG_ID = 'feedback-dialog';

  constructor(props, context) {
    super(props, context);
    this.handleFeedbackSave = this.handleFeedbackSave.bind(this);
  }

  shouldComponentUpdate() {
    // static site, no need to update anything
    return false;
  }

  handleFeedbackSave(feedback) {
    commentsService.create(feedback);
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
        <UnpublishedFeedbackList />

        <FeedbackDialog onSave={this.handleFeedbackSave} />

      </div>
    );
  }
}
