import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('authors');

const makeSelectAuthors = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'authors'])
);

export {
  selectGlobal,
  makeSelectAuthors
};
