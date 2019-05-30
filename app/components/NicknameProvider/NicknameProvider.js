import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import ParticipantApi from '../../services/ParticipantApi';
import ConnectionIndicator from '../ConnectionIndicator';
import { joinClicked } from './actions';
import { getCookie, setCookie } from '../../utils/cookies';
import { COOKIE_USERNAME } from '../../utils/constants';

class NicknameProvider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      nickname: getCookie(COOKIE_USERNAME) ? getCookie(COOKIE_USERNAME) : '',
      isJoined: false,
    };

    this.participantService = ParticipantApi.getInstance(this.props.dispatch);

    this.onJoinClicked = this.onJoinClicked.bind(this);
    this.onNicknameChanged = this.onNicknameChanged.bind(this);
  }

  onJoinClicked() {
    if (this.state.nickname.length === 0) {
      toastr.warning('Nickname is empty');
      return;
    }

    if (!this.props.code || !this.props.token) {
      toastr.error('Incorrect URL, token and code are missing from URL. In this mode, you can only prepare your feedbacks for the next Retrospective.');
      return;
    }

    this.props.onJoined(this.state.nickname);
    this.participantService.join(this.state.nickname, this.props.code, this.props.token);
    this.props.dispatch(joinClicked());

    this.setState(() => ({ ...this.state, isJoined: true }));
    setCookie(COOKIE_USERNAME, this.state.nickname);
  }

  onNicknameChanged(event) {
    this.setState({ nickname: event.target.value });
  }

  render() {
    return (
      <div>
        <TextInput
          value={this.state.nickname}
          isDisabled={this.state.isJoined}
          width="300px"
          label="Enter your nickname to join"
          name="nickname"
          onChange={(event) => this.onNicknameChanged(event)}
        />
        <Button isDisabled={this.state.isJoined} marginTop="30" label="Join" onClick={this.onJoinClicked} /><br />
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
