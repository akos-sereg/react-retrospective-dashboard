import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import ManageAuthorPage from './ManageAuthorPage';
import { updateAuthor } from './actions';

const mapDispatchToProps = (dispatch) => ({
  onSaveAuthor: (evt, author) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
    dispatch(updateAuthor(author));
  },

});

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'manageAuthors', reducer });
const withSaga = injectSaga({ key: 'manageAuthors', saga });

export default compose(withReducer, withSaga, withConnect)(ManageAuthorPage);
export { mapDispatchToProps };
