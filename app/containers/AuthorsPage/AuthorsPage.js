import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthorList from '../../components/AuthorList';
import './style.scss';


export default class AuthorsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onFetchAuthors();
  }

  render() {
    const { authors } = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <Link to="/author" className="btn btn-default">Add Author</Link>
        <AuthorList onDeleteAuthor={this.props.onDeleteAuthor} authors={authors} />
      </div>
    );
  }
}


AuthorsPage.propTypes = {
  authors: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onFetchAuthors: PropTypes.func,
  onDeleteAuthor: PropTypes.func,
};
