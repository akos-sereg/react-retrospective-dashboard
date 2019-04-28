import { put, takeLatest } from 'redux-saga/effects';
import { authorsFetched, fetchAuthorsError, deleteAuthorSuccess } from './actions';
import { FETCH_AUTHORS, DELETE_AUTHOR } from './constants';
import AuthorApi from '../../services/AuthorApi';

export function* getAuthors() {
  try {
    yield put(authorsFetched(AuthorApi.getAllAuthors()));
  } catch (err) {
    yield put(fetchAuthorsError(err));
  }
}

export function* deleteAuthor(action) {
  AuthorApi.deleteAuthor(action.id);
  yield put(deleteAuthorSuccess(action.id));
}

export default function* rootSaga() {
  yield [
    takeLatest(FETCH_AUTHORS, getAuthors),
    takeLatest(DELETE_AUTHOR, deleteAuthor),
  ];
}
