import decode from "jwt-decode";

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
}
