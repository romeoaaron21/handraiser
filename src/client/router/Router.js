import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "../components/sign-in/signIn";
import Cohorts from "../components/cohorts/cohorts";
import Queue from "../components/student-queue/main";

function Router() {
  return (
    <BrowserRouter>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/cohorts" component={Cohorts} />
      <Route path="/queue/:cid" component={Queue} />
    </BrowserRouter>
  );
}

export default Router;
