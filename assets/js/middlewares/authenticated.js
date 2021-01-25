const authenticated = localStorage.getItem("authenticated");
if (!authenticated) {
  window.location.href = "./assets/auth/login.html";
}
