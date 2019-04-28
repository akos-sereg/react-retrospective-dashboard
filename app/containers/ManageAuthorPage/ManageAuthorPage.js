import React from 'react';
import PropTypes from 'prop-types';
import AuthorForm from '../../components/AuthorForm';
import AuthorApi from '../../services/AuthorApi';

export default class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      author: { id: '', firstName: '', lastName: '' },
      errors: { }
    };

    this.saveAuthor = this.saveAuthor.bind(this);
    this.setAuthorState = this.setAuthorState.bind(this);
  }

  componentWillMount() {
    const authorId = this.props.match.params.id;

    if (authorId) {
      const author = AuthorApi.getAuthorById(authorId);
      this.setState({ author });
    }
  }

  setAuthorState(event) {
    const stateAuthor = this.state.author;
    stateAuthor[event.target.name] = event.target.value;
    return this.setState({ author: stateAuthor });
  }

  saveAuthor(event) {
    this.props.onSaveAuthor(event, this.state.author);
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        errors={this.state.errors}
        onSave={this.saveAuthor}
        onChange={this.setAuthorState}
      />

    );
  }
}

ManageAuthorPage.propTypes = {
  match: PropTypes.object,
  onSaveAuthor: PropTypes.func
};
