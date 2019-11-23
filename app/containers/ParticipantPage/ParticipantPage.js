import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Helmet } from 'react-helmet';
import NicknameProvider from '../../components/widget/NicknameProvider';
import ParticipantButtonBar from '../../components/widget/ParticipantButtonBar';
import UnpublishedFeedbackList from '../../components/widget/UnpublishedFeedbackList';
import BoardFeedbackList from '../../components/widget/BoardFeedbackList';
import FeedbackDialog from '../../components/dialog/FeedbackDialog';
import Footer from '../../components/widget/Footer';
import LocalStorageOfCommentsService from '../../services/LocalStorageOfCommentsService';
import ParticipantApi from '../../services/ParticipantApi';
import { pageLoading } from './actions';
import { confirmationDialogOpening } from '../../components/dialog/ConfirmationDialog/actions';
import './style.scss';
import logo from '../../assets/meeting-black.png';
import ConfirmationDialog from '../../components/dialog/ConfirmationDialog';
import { publishingFeedbacks } from '../../services/actions';
import { getMoodInficatorAsset as getMoodInficatorAssetForGsm } from '../../components/dialog/FeedbackDialog/variations/GladSadMad';
import { getMoodInficatorAsset as getMoodInficatorAssetForSsc } from '../../components/dialog/FeedbackDialog/variations/StartStopContinue';
import { getMoodInficatorAsset as getMoodInficatorAssetFor4Ls } from '../../components/dialog/FeedbackDialog/variations/FourLs';
import { getMoodInficatorAsset as getMoodInficatorAssetForPmi } from '../../components/dialog/FeedbackDialog/variations/PlusMinusInteresting';
import BoardApi from '../../services/BoardApi';

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

  async componentWillMount() {
    this.props.dispatch(pageLoading(this.commentsService.getFeedbackList()));

    const boardState = await new BoardApi().getBoardState(this.props.match.params.code, this.props.match.params.token);
    if (boardState === 'voting') {
      ParticipantApi.getInstance(this.props.dispatch).code = this.props.match.params.code;
      ParticipantApi.getInstance(this.props.dispatch).token = this.props.match.params.token;
      ParticipantApi.getInstance(this.props.dispatch).onBoardEventReceived({ body: JSON.stringify({ action: 'voting' }) });
    }
  }

  handleJoined(nickname) {
    this.setState(() => ({ ...this.state, nickname }));
  }

  handleFeedbackSave(feedback) {
    this.commentsService.create(feedback);
    toastr.success('Feedback has been saved to browser\'s Local Storage');
  }

  handleFeedbackUpdate(feedback) {
    this.commentsService.update(feedback);
    toastr.success('Feedback has been updated');
  }

  handleFeedbackDelete(feedbackId) {
    this.commentsService.delete(feedbackId);
    toastr.success('Feedback has been deleted');
  }

  async handleFeedbackPublish(feedback) {
    if (this.state.nickname == null || this.state.nickname.length === 0) {
      toastr.warning('Enter your nickname and join first');
      return;
    }

    const isPublished = await this.participantApi.publish(
      [feedback],
      this.state.nickname,
      this.props.match.params.code,
      this.props.match.params.token
    );

    if (isPublished) {
      toastr.success('Feedback has been Published');
      this.commentsService.delete(feedback.id);
    } else {
      toastr.error('Feedback has not been published due to a server error. Please try again later.');
      this.props.dispatch(publishingFeedbacks([]));
    }
  }

  async handleFeedbackPublishAll() {
    if (this.state.nickname == null || this.state.nickname.length === 0) {
      toastr.warning('Enter your nickname and join first');
      return;
    }

    if (this.props.feedbacks.length === 0) {
      toastr.warning('Nothing to be Published');
      return;
    }

    this.props.dispatch(confirmationDialogOpening(
      'Publish All',
      'Are you sure you want to Publish All?',
      async () => {
        const feedbacks = this.commentsService.getFeedbackList();
        const isPublished = await this.participantApi.publish(
          feedbacks,
          this.state.nickname,
          this.props.match.params.code,
          this.props.match.params.token
        );

        if (isPublished) {
          const ids = feedbacks.map((f) => f.id);
          toastr.success(ids.length === 1 ? 'Feedback has been Published' : 'Feedbacks have been Published');
          ids.map((id) => this.commentsService.delete(id));
          this.props.dispatch(pageLoading(this.commentsService.getFeedbackList()));
        } else {
          toastr.error('Feedbacks have not been published due to a server error. Please try again later.');
          this.props.dispatch(publishingFeedbacks([]));
        }
      }));
  }

  isFeedbackListEmpty() {
    return !this.props.feedbacks || this.props.feedbacks.length === 0;
  }

  isBoardFeedbackListEmpty() {
    return !this.props.boardFeedbacks || this.props.boardFeedbacks.length === 0;
  }

  render() {
    let getMoodInficatorAsset = () => {};
    switch (this.props.match.params.boardType) {
      case 'gsm':
        getMoodInficatorAsset = getMoodInficatorAssetForGsm;
        break;
      case 'ssc':
        getMoodInficatorAsset = getMoodInficatorAssetForSsc;
        break;
      case '4ls':
        getMoodInficatorAsset = getMoodInficatorAssetFor4Ls;
        break;
      case 'pmi':
        getMoodInficatorAsset = getMoodInficatorAssetForPmi;
        break;
      default:
        getMoodInficatorAsset = () => {};
        break;
    }

    return (
      <div className="participant-container">
        <Helmet>
          <title>Participant (web)</title>
          <meta
            name="description"
            content="Desktop Participant page"
          />
        </Helmet>

        <div className="participant-logo-head participant-center-content">
          <img src={logo} alt="logo" />
          <div>
            <span>Retrospective Dashboard</span><br />
            <p>
              Join the session and provide feedbacks below.
            </p>
          </div>
        </div>
        <div className="div-clear" />

        <div className="participant-nickname-selection participant-center-content">
          <NicknameProvider
            onJoined={this.handleJoined}
            code={this.props.match.params.code}
            token={this.props.match.params.token}
          />
          <div className="div-clear" />
        </div>

        <div className="participant-buttons-selection participant-center-content">
          <ParticipantButtonBar onPublishAll={this.handleFeedbackPublishAll} feedbacks={this.props.feedbacks} />
        </div>

        {this.props.votingScreenDisplayed ?
          <div className={this.isBoardFeedbackListEmpty() ? 'participant-center-content' : 'participant-feedback-container'}>
            <BoardFeedbackList
              feedbacks={this.props.boardFeedbacks}
              votes={this.props.votes}
              getMoodInficatorAsset={getMoodInficatorAsset}
            />
          </div> :
          <div className={this.isFeedbackListEmpty() ? 'participant-center-content' : 'participant-feedback-container'}>
            <UnpublishedFeedbackList
              feedbacks={this.props.feedbacks}
              onDelete={this.handleFeedbackDelete}
              onPublish={this.handleFeedbackPublish}
              getMoodInficatorAsset={getMoodInficatorAsset}
            />
          </div>}

        <FeedbackDialog onSave={this.handleFeedbackSave} onUpdate={this.handleFeedbackUpdate} boardType={this.props.match.params.boardType} />
        <ConfirmationDialog />

        <Footer />
      </div>
    );
  }
}

ParticipantPage.propTypes = {
  dispatch: PropTypes.func,
  feedbacks: PropTypes.array,
  boardFeedbacks: PropTypes.array,
  votes: PropTypes.array,
  match: PropTypes.object.isRequired,
  // votingStarted: PropTypes.bool,
  votingScreenDisplayed: PropTypes.bool,
};

export default ParticipantPage;
