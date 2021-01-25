import Auth from "./classes/Auth.js";
import Request from "./classes/Request.js";

// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = { email, password };
    Auth.login(user);
  });
}

// register
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = { name, email, password };
    Auth.register(user);
  });
}
