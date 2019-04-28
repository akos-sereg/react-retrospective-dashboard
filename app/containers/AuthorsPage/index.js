import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectAuthors } from './selectors';
import saga from './saga';
import reducer from './reducer';
import AuthorsPage from './AuthorsPage';
import { fetchAuthors, deleteAuthor } from './actions';

const mapDispatchToProps = (dispatch) => ({
  onFetchAuthors: (evt) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
    dispatch(fetchAuthors());
  },

  onDeleteAuthor: (evt, id) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    dispatch(deleteAuthor(id));
  }
});

const mapStateToProps = createStructuredSelector({
  authors: makeSelectAuthors(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'authors', reducer });
const withSaga = injectSaga({ key: 'authors', saga });

export default compose(withReducer, withSaga, withConnect)(AuthorsPage);
export { mapDispatchToProps };
