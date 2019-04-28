import { put, takeLatest } from 'redux-saga/effects';
import { updateAuthorError, updateAuthorSuccess, createAuthorSuccess } from './actions';
import { UPDATE_AUTHOR } from './constants';
import AuthorApi from '../../services/AuthorApi';

export function* updateAuthorInternal(action) {
  try {
    const originalId = action.author.id;
    AuthorApi.saveAuthor(action.author);

    if (originalId) {
      yield put(updateAuthorSuccess(action.author));
    } else {
      yield put(createAuthorSuccess(action.author));
    }
  } catch (err) {
    yield put(updateAuthorError(action.author, err));
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(UPDATE_AUTHOR, updateAuthorInternal)
  ];
}
