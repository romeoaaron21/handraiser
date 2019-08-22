import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from '../components/sign-in/signIn';
import MentorKeys from '../components/mentor-keys/mentorKeys';
import Mentor from '../components/mentors/mentor';
import Cohorts from '../components/cohorts/cohort';


function Router() {
  return (
    <BrowserRouter>
      <Route path='/admin/sign-in' component={SignIn} />
      <Route path='/admin/keys' component={MentorKeys} />
      <Route path='/admin/mentors' component={Mentor} />
      <Route path='/admin/cohorts' component={Cohorts} />
    </BrowserRouter>
  );
}

export default Router;
