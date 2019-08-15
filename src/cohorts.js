import React from 'react';
import { GoogleLogout } from 'react-google-login';

import Auth from './auth/Auth';

const logout = (response) => {
  localStorage.removeItem("id_token");
  window.location.href = '/sign-in';
}

class Cohorts extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GoogleLogout
          clientId="915213711135-usc11cnn8rudrqqikfe21l246r26uqh8.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={logout}
        >
        </GoogleLogout>
        <h1>{'Hi Student!'}</h1>
      </React.Fragment>
    );
  }
}

export default Auth(Cohorts)
