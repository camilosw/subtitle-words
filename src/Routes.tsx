import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SignIn from 'routes/SignIn';
import { useUser } from 'modules/firebase/AuthProvider';
import MainRoute from 'routes/MainRoute';

const Routes = () => {
  const user = useUser();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return user ? (
    <MainRoute />
  ) : (
    <>
      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Redirect from="/" to="/sign-in" />
    </>
  );
};

export default Routes;
