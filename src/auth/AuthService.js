import decode from "jwt-decode";

export default class AuthService {

  loggedIn = () => {
    const token = this.getToken();
    return !!token;
  };

  getConfirm = () => {
    let answer = decode(this.getToken());
    return answer;
  };

  getToken = () => {
    return localStorage.getItem("id_token");
  };
}
