import decode from "jwt-decode";
import api from '../services/fetchApi';

export default class AuthService {

  loggedIn = () => {
    const token = this.getToken();
    return !!token;
  };

  logout = () => {
    localStorage.removeItem("id_token");
    window.location.href = '/sign-in';
  };

  getConfirm = () => {
    let answer = decode(this.getToken());
    return answer;
  };

  getToken = () => {
    return localStorage.getItem("id_token");
  };

  getDecodedToken = () => {
    return decode(localStorage.getItem("id_token"));
  };

  getFetchedTokenAPI = () => {
    let user = decode(localStorage.getItem("id_token"));
    return api.fetch(`/api/users/${user.sub}`, 'get')
  }
}
