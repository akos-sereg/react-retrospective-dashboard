import React from 'react';
import 'toastr/build/toastr.min.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import ParticipantApi from '../../services/ParticipantApi';
import './style.scss';

class NicknameProvider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.participantService = ParticipantApi.getInstance();
    this.state = { nickname: '' };

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
      <div className="wrapper">
        <TextInput width="300px" label="Enter your nickname to join" name="nickname" onChange={(event) => this.onNicknameChanged(event)} />
        <Button marginTop="30px" label="Join" onClick={this.onJoinClicked} />
      </div>
    );
  }
}

NicknameProvider.propTypes = {
};

export default NicknameProvider;
