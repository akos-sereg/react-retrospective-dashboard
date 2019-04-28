import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

class AuthorList extends React.Component {
  deleteAuthor(event, id) {
    this.props.onDeleteAuthor(event, id);
    toastr.success('Author Deleted.');
  }

  render() {
    const createAuthorRow = (author) => (
      <tr key={author.id}>
        <td>
          <a href="#" onClick={(e) => this.deleteAuthor(e, author.id)}>Delete</a>
        </td>
        <td>
          <Link to={`/author/${author.id}`}>{author.id}</Link>
        </td>
        <td>
          {author.firstName} {author.lastName}
        </td>
      </tr>
    );

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.authors.map(createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
}

AuthorList.propTypes = {
  authors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  onDeleteAuthor: PropTypes.func,
};

export default AuthorList;
