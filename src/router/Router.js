import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from '../components/sign-in/signIn';
import Mentor from '../components/mentors/mentor';

function Router() {
  return (
    <BrowserRouter>
      <Route path='/sign-in' component={SignIn} />
      <Route path='/mentors' component={Mentor} />
    </BrowserRouter>
  );
}

export default Router;
