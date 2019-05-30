import Loadable from 'react-loadable';

import LoadingIndicator from '../../components/widget/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});
