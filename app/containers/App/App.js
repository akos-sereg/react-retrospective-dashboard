import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ParticipantPage from 'containers/ParticipantPage/Loadable';
import './style.scss';

const App = () => (
  <div>
    <Helmet titleTemplate="%s" defaultTitle="Retrospective Dashboard">
      <meta name="description" content="Retrospective Dashboard" />
    </Helmet>

    <div>
      <Switch>
        <Route exact path="/" component={ParticipantPage} />
        <Route path="/type/:boardType/code/:code/token/:token" component={ParticipantPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>

  </div>
);

export default App;
