import {
  FETCH_AUTHORS,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_ERROR,
  DELETE_AUTHOR,
  DELETE_AUTHOR_SUCCESS
} from './constants';

export function fetchAuthors() {
  return {
    type: FETCH_AUTHORS
  };
}

export function authorsFetched(authors) {
  return {
    type: FETCH_AUTHORS_SUCCESS,
    authors
  };
}

export function fetchAuthorsError(error) {
  return {
    type: FETCH_AUTHORS_ERROR,
    error,
  };
}

export function deleteAuthor(id) {
  return {
    type: DELETE_AUTHOR,
    id
  };
}

export function deleteAuthorSuccess(id) {
  return {
    type: DELETE_AUTHOR_SUCCESS,
    id
  };
}
