import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import NicknameProvider from '../../components/NicknameProvider';
import ParticipantButtonBar from '../../components/ParticipantButtonBar';
import UnpublishedFeedbackList from '../../components/UnpublishedFeedbackList';
import FeedbackDialog from '../../components/FeedbackDialog';
import LocalStorageOfCommentsService from '../../services/LocalStorageOfCommentsService';
import ParticipantApi from '../../services/ParticipantApi';
import { pageLoading } from './actions';
import './style.scss';
import logo from '../../assets/meeting-black.png';

class ParticipantPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      nickname: null,
    };

    this.handleJoined = this.handleJoined.bind(this);
    this.handleFeedbackSave = this.handleFeedbackSave.bind(this);
    this.handleFeedbackUpdate = this.handleFeedbackUpdate.bind(this);
    this.handleFeedbackDelete = this.handleFeedbackDelete.bind(this);
    this.handleFeedbackPublish = this.handleFeedbackPublish.bind(this);
    this.handleFeedbackPublishAll = this.handleFeedbackPublishAll.bind(this);

    this.commentsService = LocalStorageOfCommentsService.getInstance(this.props.dispatch);
    this.participantApi = ParticipantApi.getInstance(this.props.dispatch);
  }

  componentWillMount() {
    this.props.dispatch(pageLoading(this.commentsService.getFeedbackList()));
  }

  handleJoined(nickname) {
    this.setState(() => ({ ...this.state, nickname }));
  }

  handleFeedbackSave(feedback) {
    this.commentsService.create(feedback);
  }

  handleFeedbackUpdate(feedback) {
    this.commentsService.update(feedback);
  }

  handleFeedbackDelete(feedbackId) {
    this.commentsService.delete(feedbackId);
  }

  async handleFeedbackPublish(feedback) {
    const response = await this.participantApi.publish(
      [feedback],
      this.state.nickname,
      this.props.match.params.code,
      this.props.match.params.token
    );

    if (response.code === 200) {
      this.commentsService.delete(feedback.id);
    }
  }

  async handleFeedbackPublishAll() {
    const feedbacks = this.commentsService.getFeedbackList();
    const response = await this.participantApi.publish(
      feedbacks,
      this.state.nickname,
      this.props.match.params.code,
      this.props.match.params.token
    );

    if (response.code === 200) {
      const ids = feedbacks.map((f) => f.id);
      ids.map((id) => this.commentsService.delete(id));
      this.props.dispatch(pageLoading(this.commentsService.getFeedbackList()));
    }
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

        <NicknameProvider
          onJoined={this.handleJoined}
          code={this.props.match.params.code}
          token={this.props.match.params.token}
        />
        <div className="div-clear" />

        <ParticipantButtonBar onPublishAll={this.handleFeedbackPublishAll} />

        <UnpublishedFeedbackList
          feedbacks={this.props.feedbacks}
          onDelete={this.handleFeedbackDelete}
          onPublish={this.handleFeedbackPublish}
        />

        <FeedbackDialog onSave={this.handleFeedbackSave} onUpdate={this.handleFeedbackUpdate} />

      </div>
    );
  }
}

ParticipantPage.propTypes = {
  dispatch: PropTypes.func,
  feedbacks: PropTypes.array,
  match: PropTypes.object.isRequired
};

export default ParticipantPage;
