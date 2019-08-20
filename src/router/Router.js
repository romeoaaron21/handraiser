import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from '../components/sign-in/signIn';
import MentorKeys from '../components/mentor-keys/mentorKeys';
import Mentor from '../components/mentors/mentor';
import Cohorts from '../components/cohorts/cohort';


function Router() {
  return (
    <BrowserRouter>
      <Route path='/sign-in' component={SignIn} />
      <Route path='/keys' component={MentorKeys} />
      <Route path='/mentors' component={Mentor} />
      <Route path='/cohorts' component={Cohorts} />
    </BrowserRouter>
  );
}

export default Router;
