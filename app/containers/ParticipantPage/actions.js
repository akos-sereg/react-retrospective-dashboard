import { PAGE_LOADING } from '../../utils/constants';

const pageLoading = (feedbacks) => ({
  type: PAGE_LOADING,
  payload: { feedbacks }
});

export { pageLoading };
