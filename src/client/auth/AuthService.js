import decode from "jwt-decode";
import api from "../services/fetchApi";

export default class AuthService {
  loggedIn = () => {
    const token = this.getToken();
    return !!token;
  };

  logout = () => {
    localStorage.removeItem("id_token");
    window.location.href = "/sign-in";
  };

  getConfirm = () => {
    try {
      let answer = decode(this.getToken());
      return answer;
    } catch (err) {
      return (window.location.href = "/");
    }
  };

  getToken = () => {
    try {
      return localStorage.getItem("id_token");
    } catch (err) {
      return (window.location.href = "/sign-in");
    }
  };

  getDecodedToken = () => {
    try {
      return decode(localStorage.getItem("id_token"));
    } catch (err) {
      return (window.location.href = "/");
    }
  };

  getFetchedTokenAPI = () => {
    try {
      let user = decode(localStorage.getItem("id_token"));
      return api.fetch(`/api/users/${user.sub}`, "get");
    } catch (err) {
      return (window.location.href = "/");
    }
  };
}
