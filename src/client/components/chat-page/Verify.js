import React, { Component } from "react";
import AuthService from "./AuthService";

export default function Auth(AuthComponent) {
  return class AuthWrapped extends Component {
    state = {
      confirm: null,
      loaded: false
    };

    componentDidMount() {}

    render() {
      if (!this.state.loaded || !this.state.confirm) {
        return null;
      }
      return <AuthComponent />;
    }
  };
}
