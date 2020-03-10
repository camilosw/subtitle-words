import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeRoute from 'pages/HomeRoute';
import AddSubtitlesRoute from './pages/AddSubtitlesRoute';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomeRoute />
      </Route>
      <Route path="/add-subtitles">
        <AddSubtitlesRoute />
      </Route>
    </Switch>
  );
};

export default Routes;
