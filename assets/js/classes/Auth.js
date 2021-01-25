import Request from "./Request.js";

export default class Auth {
  static succesRegisterRedirect = "/assets/auth/login.html";
  static succesLoginRedirect = "/index.html";
  static login(user) {
    Request.login(user)
      .then((response) => {
        this.handleLoginResponse(response.status);
        return response.json();
      })
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("userID", JSON.stringify(result.id));
        localStorage.setItem("userName", JSON.stringify(result.name));
        localStorage.setItem("userEmail", JSON.stringify(result.email));
        localStorage.setItem("flag", JSON.stringify(true));
        localStorage.setItem("flag2", JSON.stringify(true));
      });
  }
  static handleLoginResponse(statusCode) {
    if (statusCode === 200) {
      alert("Login Success ✅");
      localStorage.setItem("authenticated", "true");
      document.getElementById("login-form").reset();
      window.location.href = this.succesLoginRedirect;
    } else if (statusCode === 401) {
      alert("Sorry! This credentials are wrong ❌. Try again ‼️");
      document.getElementById("login-form").reset();
    } else {
      alert("Sorry! An error occurred ❌");
    }
  }
  static async register(user) {
    const response = await Request.register(user);
    if (response.status === 201) {
      alert("Register Success ✅");
      //localStorage.setItem("authenticated", "true");
      document.getElementById("register-form").reset();
      window.location.href = this.succesRegisterRedirect;
    } else if (response.status === 422) {
      document.getElementById("register-form").reset();
      alert("This email is already registered 📧 ‼️");
    } else {
      document.getElementById("register-form").reset();
      alert("Sorry! An error occurred ❌");
    }
  }
  static disableLoginButton() {
    const loginButton = this.getLoginbutton();
    loginButton.disabled = true;
  }
  static enableLoginButton() {
    const loginButton = this.getLoginbutton();
    loginButton.disabled = false;
  }
  static getLoginbutton() {
    return document.getElementById("login-button");
  }
  static user() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
