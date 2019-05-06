import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import ParticipantApi from '../../services/ParticipantApi';
import ConnectionIndicator from '../ConnectionIndicator';

class NicknameProvider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.participantService = ParticipantApi.getInstance(this.props.dispatch);
    this.state = {
      nickname: ''
    };

    this.onJoinClicked = this.onJoinClicked.bind(this);
    this.onNicknameChanged = this.onNicknameChanged.bind(this);
  }

  onJoinClicked() {
    this.participantService.join(this.state.nickname);
  }

  onNicknameChanged(event) {
    this.setState({ nickname: event.target.value });
  }

  render() {
    return (
      <div>
        <TextInput width="300px" label="Enter your nickname to join" name="nickname" onChange={(event) => this.onNicknameChanged(event)} />
        <Button marginTop="30px" label="Join" onClick={this.onJoinClicked} /><br />
        <ConnectionIndicator isConnected={this.props.isConnected} isConnecting={this.props.isConnecting} />
      </div>
    );
  }
}

NicknameProvider.propTypes = {
  dispatch: PropTypes.func,
  isConnected: PropTypes.bool,
  isConnecting: PropTypes.bool
};

export default NicknameProvider;
