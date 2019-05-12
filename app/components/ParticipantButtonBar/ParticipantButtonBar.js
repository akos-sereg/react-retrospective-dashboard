import React from 'react';
import PropTypes from 'prop-types';
import { userReadyStateChanged, createFeedbackClicked } from './actions';
import './style.scss';

class ParticipantButtonBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isUserReady: false };

    this.onUserReadyStateChanged = this.onUserReadyStateChanged.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  onUserReadyStateChanged() {
    const newState = !this.state.isUserReady;
    this.setState(() => ({ ...this.state, isUserReady: newState }));
    this.props.dispatch(userReadyStateChanged(newState));
  }

  handleCreate() {
    this.props.dispatch(createFeedbackClicked());
  }

  render() {
    const userReadyIndicatorClasses = this.state.isUserReady ? 'green-dot' : 'gray-dot';

    return this.props.isFeedbackDialogOpen ? (<div />) : (
      <div className="participant-button-bar" role="group" aria-label="...">
        <div className="title"><h4>Your comments for retrospective</h4></div>
        <div className="btn-group">
          <button onClick={() => this.onUserReadyStateChanged()} type="button" className="btn btn-default btn-sm">
            <span automation-id="i-am-ready-marker" id="ready-marker" className={userReadyIndicatorClasses}></span>
            I am ready
          </button>
          <button id="publish-all-btn" type="button" className="btn btn-primary btn-sm" disabled="">Publish All</button>
          <button onClick={this.handleCreate} type="button" className="btn btn-success btn-sm">Create</button>
        </div>
      </div>
    );
  }
}

ParticipantButtonBar.propTypes = {
  dispatch: PropTypes.func,
  isFeedbackDialogOpen: PropTypes.bool,
};

export default ParticipantButtonBar;
