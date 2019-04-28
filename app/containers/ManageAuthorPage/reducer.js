import { fromJS } from 'immutable';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import {
  UPDATE_AUTHOR_SUCCESS,
  CREATE_AUTHOR_SUCCESS
} from './constants';

// The initial state of the App
const initialState = fromJS({
  author: {}
});

function manageAuthorReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AUTHOR_SUCCESS:
      toastr.success('Author Updated.');
      window.location.href = '/#/authors';
      return state;

    case CREATE_AUTHOR_SUCCESS:
      toastr.success('Author Created.');
      window.location.href = '/#/authors';
      return state;

    default:
      return state;
  }
}

export default manageAuthorReducer;
