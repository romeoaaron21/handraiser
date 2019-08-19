import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from '../components/sign-in/signIn';
import Cohorts from '../components/cohorts/cohorts';
import Queue from '../components/student-queue/studentQueue';

function App() {
  return (
    <BrowserRouter>
      <Route path='/sign-in' component={SignIn} />
      <Route path='/cohorts' component={Cohorts} />
      <Route path='/queue' component={Queue} />
    </BrowserRouter>
  );
}

export default App;
