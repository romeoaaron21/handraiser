import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import SignIn from "../client/components/sign-in/signIn";
import Cohorts from "../client/components/cohorts/cohorts";
import Queue from "../client/components/student-queue/main";

import AdminSignIn from "../admin/components/sign-in/signIn";
import MentorKeys from "../admin/components/mentor-keys/mentorKeys";
import Mentor from "../admin/components/mentors/mentor";
import AdminCohorts from "../admin/components/cohorts/cohort";
import Settings from "../client/components/common-components/settings/settings";
function Router() {
  return (
    <BrowserRouter>
      {window.location.pathname === "/" ? <Redirect to="/sign-in" /> : null}
      <Route path="/sign-in" component={SignIn} />
      <Route path="/cohorts" component={Cohorts} />
      <Route path="/queue/:cid" component={Queue} />
      <Route path="/settings" component={Settings} />
      <Route path="/admin/keys" component={MentorKeys} />
      <Route path="/admin/mentors" component={Mentor} />
      <Route path="/admin/cohorts" component={AdminCohorts} />
      <Route path="/admin/sign-in" component={AdminSignIn} />
    </BrowserRouter>
  );
}

export default Router;
