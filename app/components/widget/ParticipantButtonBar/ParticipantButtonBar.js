import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { userReadyStateChanged, createFeedbackClicked } from './actions';
import './style.scss';

class ParticipantButtonBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { isUserReady: false };

    this.handleUserReadyStateChange = this.handleUserReadyStateChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
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
        <div className="title"><h4>Your comments for retrospective</h4></div>
        <div className="btn-group">
          <button onClick={() => this.handleUserReadyStateChange()} type="button" className="btn btn-default btn-sm" test-id="pbb-toggle-state">
            <span automation-id="i-am-ready-marker" id="ready-marker" className={userReadyIndicatorClasses}></span>
            I am ready
          </button>
          <button onClick={this.props.onPublishAll} id="publish-all-btn" test-id="publish-all" type="button" className="btn btn-primary btn-sm" disabled="">Publish All</button>
          <button onClick={this.handleCreate} type="button" className="btn btn-success btn-sm" test-id="pbb-create">Create</button>
        </div>
      </div>
    );
  }
}

ParticipantButtonBar.propTypes = {
  dispatch: PropTypes.func,
  onPublishAll: PropTypes.func.isRequired,
  isAnyDialogOpen: PropTypes.bool,
  isJoinClicked: PropTypes.bool,
};

export default ParticipantButtonBar;
