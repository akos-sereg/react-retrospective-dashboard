import React from 'react';
import PropTypes from 'prop-types';
import ParticipantApi from '../../services/ParticipantApi';
import { userReadyStateChanged } from './actions';
import './style.scss';

class ParticipantButtonBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isUserReady: false };

    this.participantService = ParticipantApi.getInstance(this.props.dispatch);
    this.onUserReadyStateChanged = this.onUserReadyStateChanged.bind(this);
  }

  onUserReadyStateChanged() {
    const newState = !this.state.isUserReady;
    this.setState(() => ({ ...this.state, isUserReady: newState }));
    this.props.dispatch(userReadyStateChanged(newState));
    this.participantService.participantState = newState ? 'ready' : 'in-progress';
  }

  render() {
    const userReadyIndicatorClasses = this.state.isUserReady ? 'green-dot' : 'gray-dot';

    return (
      <div className="participant-button-bar" role="group" aria-label="...">
        <div className="title"><h4>Your comments for retrospective</h4></div>
        <div className="btn-group">
          <button onClick={() => this.onUserReadyStateChanged()} type="button" className="btn btn-default btn-sm">
            <span automation-id="i-am-ready-marker" id="ready-marker" className={userReadyIndicatorClasses}></span>
            I am ready
          </button>
          <button id="publish-all-btn" type="button" className="btn btn-primary btn-sm" disabled="">Publish All</button>
          <button type="button" className="btn btn-success btn-sm">Create
          </button>
        </div>
      </div>
    );
  }
}

ParticipantButtonBar.propTypes = {
  dispatch: PropTypes.func,
};

export default ParticipantButtonBar;
