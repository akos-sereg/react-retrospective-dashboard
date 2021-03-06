import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { userReadyStateChanged, createFeedbackClicked, switchScreenToFeedback } from './actions';
import './style.scss';
import ParticipantApi from '../../../services/ParticipantApi';

class ParticipantButtonBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { isUserReady: false };

    this.handleUserReadyStateChange = this.handleUserReadyStateChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSwitchToFeedback = this.handleSwitchToFeedback.bind(this);
    this.handleSwitchToVote = this.handleSwitchToVote.bind(this);
  }

  handleSwitchToVote(event) {
    if (event) {
      event.preventDefault();
    }

    ParticipantApi.getInstance(this.props.dispatch).onBoardEventReceived({ body: JSON.stringify({ action: 'voting' }) });
  }

  handleSwitchToFeedback(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.dispatch(switchScreenToFeedback());
  }

  handleUserReadyStateChange() {
    if (!this.props.isJoinClicked) {
      toastr.warning('Enter your nickname and Join first');
      return;
    }

    const newState = !this.state.isUserReady;
    this.setState(() => ({ ...this.state, isUserReady: newState }));
    this.props.dispatch(userReadyStateChanged(newState));

    if (this.props.isJoinClicked) {
      toastr.success('Your status will be reflected on the board soon', newState ? 'Ready' : 'Still writing ...');
    }
  }

  handleCreate() {
    this.props.dispatch(createFeedbackClicked());
  }

  render() {
    const userReadyIndicatorClasses = this.state.isUserReady ? 'green-dot' : 'gray-dot';

    return this.props.isAnyDialogOpen ? (<div />) : (
      <div className="participant-button-bar" role="group" aria-label="...">
        <div className="title">{this.props.votingScreenDisplayed ?
          <h4>Voting has just been announced</h4>
          : <h4>Your comments for retrospective</h4>}
        </div>
        {this.props.votingScreenDisplayed ?
          (
            <div>
              <br /><br />Now you see all feedbacks from the board. You can vote to multiple feedbacks.<br />
              <span className="switch-back">You can <a href="#" onClick={(e) => this.handleSwitchToFeedback(e)}>switch back</a> to the previous screen, if you want to Publish feedbacks.</span>
            </div>
          ) :
          (
            <div>
              <div className="btn-group">
                <button onClick={() => this.handleUserReadyStateChange()} automation-id="i-am-ready-btn" type="button" className="btn btn-default btn-sm" test-id="pbb-toggle-state">
                  <span automation-id="i-am-ready-marker" id="ready-marker" className={userReadyIndicatorClasses}></span>
                  I am ready
                </button>
                <button onClick={this.props.onPublishAll} automation-id="publish-all-btn" id="publish-all-btn" test-id="publish-all" type="button" className="btn btn-primary btn-sm" disabled={this.props.feedbacks && this.props.feedbacks.length > 0 ? '' : 'disabled'}>Publish All</button>
                <button onClick={this.handleCreate} automation-id="create-comment-btn" type="button" className="btn btn-success btn-sm" test-id="pbb-create">Create</button>
              </div>
              {this.props.votingStarted ? (
                <div>
                  <br /><br />
                  <span className="switch-back">You can <a href="#" onClick={(e) => this.handleSwitchToVote(e)}>switch</a> to Voting screen, as voting has been announced by Scrum Master.</span>
                </div>
              ) : <div />}
            </div>
          )
        }
      </div>
    );
  }
}

ParticipantButtonBar.propTypes = {
  dispatch: PropTypes.func,
  onPublishAll: PropTypes.func.isRequired,
  feedbacks: PropTypes.array,
  isAnyDialogOpen: PropTypes.bool,
  isJoinClicked: PropTypes.bool,
  votingStarted: PropTypes.bool,
  votingScreenDisplayed: PropTypes.bool,
};

export default ParticipantButtonBar;
