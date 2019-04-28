import React from 'react';
import 'toastr/build/toastr.min.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import './style.scss';

class NicknameProvider extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <TextInput width="300px" label="Enter your nickname to join" name="nickname" onChange={() => {}} />
        <Button marginTop="30px" label="Join" onClick={() => {}} />
      </div>
    );
  }
}

NicknameProvider.propTypes = {
};

export default NicknameProvider;
