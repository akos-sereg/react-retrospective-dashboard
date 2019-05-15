import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import ParticipantApi from '../../services/ParticipantApi';
import ConnectionIndicator from '../ConnectionIndicator';

class NicknameProvider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      nickname: ''
    };

    this.participantService = ParticipantApi.getInstance(this.props.dispatch);

    this.onJoinClicked = this.onJoinClicked.bind(this);
    this.onNicknameChanged = this.onNicknameChanged.bind(this);
  }

  onJoinClicked() {
    this.props.onJoined(this.state.nickname);
    this.participantService.join(this.state.nickname, this.props.code, this.props.token);
  }

  onNicknameChanged(event) {
    this.setState({ nickname: event.target.value });
  }

  render() {
    return (
      <div>
        <TextInput width="300px" label="Enter your nickname to join" name="nickname" onChange={(event) => this.onNicknameChanged(event)} />
        <Button marginTop="30" label="Join" onClick={this.onJoinClicked} /><br />
        <ConnectionIndicator isConnected={this.props.isConnected} isConnecting={this.props.isConnecting} />
      </div>
    );
  }
}

NicknameProvider.propTypes = {
  dispatch: PropTypes.func,
  onJoined: PropTypes.func.isRequired,
  isConnected: PropTypes.bool,
  isConnecting: PropTypes.bool,
  code: PropTypes.string,
  token: PropTypes.string
};

export default NicknameProvider;
