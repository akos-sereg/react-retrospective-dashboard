import { UPDATE_AUTHOR, UPDATE_AUTHOR_SUCCESS, UPDATE_AUTHOR_ERROR, CREATE_AUTHOR_SUCCESS } from './constants';

export function updateAuthor(author) {
  return {
    type: UPDATE_AUTHOR,
    author
  };
}

export function updateAuthorSuccess(author) {
  return {
    type: UPDATE_AUTHOR_SUCCESS,
    author
  };
}

export function updateAuthorError(author, error) {
  return {
    type: UPDATE_AUTHOR_ERROR,
    author,
    error
  };
}

export function createAuthorSuccess(author) {
  return {
    type: CREATE_AUTHOR_SUCCESS,
    author
  };
}
