import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../components/TextInput';

export default class AuthorForm extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <form>

        <h1>Manage Author</h1>

        <TextInput
          name="firstName"
          label="First Name"
          value={this.props.author.firstName}
          error={this.props.errors.firstName}
          onChange={this.props.onChange}
        />
        <br />

        <TextInput
          name="lastName"
          label="Last Name"
          value={this.props.author.lastName}
          error={this.props.errors.lastName}
          onChange={this.props.onChange}
        />
        <br />

        <input type="submit" value="Save" className="btn btn-default" onClick={(event) => this.props.onSave(event)} />

      </form>
    );
  }
}

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};
