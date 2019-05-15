import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ParticipantPage from 'containers/ParticipantPage/Loadable';
import './style.scss';

const App = () => (
  <div>
    <Helmet titleTemplate="%s - React.js Boilerplate" defaultTitle="React.js Boilerplate">
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>

    <div className="container-fluid">
      <Switch>
        <Route exact path="/" component={ParticipantPage} />
        <Route path="/code/:code/token/:token" component={ParticipantPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>

  </div>
);

export default App;
