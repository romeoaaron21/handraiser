import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "../client/components/sign-in/signIn";
import Cohorts from "../client/components/cohorts/cohorts";
import Queue from "../client/components/student-queue/main";

import AdminSignIn from "../admin/components/sign-in/signIn";
import MentorKeys from "../admin/components/mentor-keys/mentorKeys";
import Mentor from "../admin/components/mentors/mentor";
import AdminCohorts from "../admin/components/cohorts/cohort";
import Settings from "../client/components/common-components/settings/settings";

import ChatPage from "../client/components/chat-page/ChatPage"

import NotFound from "../404";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {window.location.pathname === "/"
          ? (window.location.href = "/sign-in")
          : null}
        <Route path="/sign-in" component={SignIn} />
        <Route exact path="/cohorts" component={Cohorts} />
        <Route exact path="/chat" component={ChatPage} />
        <Route path="/queue/:cid" component={Queue} />
        <Route path="/settings/:cid" component={Settings} />
        <Route path="/admin/keys" component={MentorKeys} />
        <Route path="/admin/mentors" component={Mentor} />
        <Route path="/admin/cohorts" component={AdminCohorts} />
        <Route path="/admin/sign-in" component={AdminSignIn} />


        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
