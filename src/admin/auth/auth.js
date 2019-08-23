import React, { Component } from "react";
import AuthService from "./services";

export default function Auth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    state = {
      confirm: null,
      loaded: false
    };

    componentDidMount() {
      if (!Auth.loggedIn()) {
         window.location.href = '/admin/sign-in';
      } else {
        try {
          const confirm = Auth.getConfirm();
          this.setState({
            confirm: confirm,
            loaded: true
          });
        } catch (err) {
          Auth.logout();
          window.location.href = '/admin/sign-in';
        }
      }
    }

    render() {
      if (!this.state.loaded || !this.state.confirm) {
        return null;
      }
      return (<AuthComponent />);
    }
  };
}
