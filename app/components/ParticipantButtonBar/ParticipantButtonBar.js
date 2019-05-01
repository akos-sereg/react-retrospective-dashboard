import React from 'react';
import './style.scss';

class ParticipantButtonBar extends React.Component {
  render() {
    return (
      <div className="participant-button-bar" role="group" aria-label="...">
        <div className="title"><h4>Your comments for retrospective</h4></div>
        <div className="btn-group">
          <button type="button" className="btn btn-default btn-sm">
            <span automation-id="i-am-ready-marker" id="ready-marker" className="gray-dot"></span>
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

export default ParticipantButtonBar;
