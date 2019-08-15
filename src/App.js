import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from './components/sign-in/signIn';
import Cohorts from './cohorts';

function App() {
  return (
    <BrowserRouter>
      <Route path='/sign-in' component={SignIn} />
      <Route path='/cohorts' component={Cohorts} />
    </BrowserRouter>
  );
}

export default App;
