import Auth from "./classes/Auth.js";

const userId = JSON.parse(localStorage.getItem("userID"));
const userName = JSON.parse(localStorage.getItem("userName"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
let authenticated = JSON.parse(localStorage.getItem("userAuthenticated"));

let containerWelcome = document.getElementById("welcome");
let container2 = document.getElementById("profile-card2");

let flag = JSON.parse(localStorage.getItem("flag"));

const form_updateProfile = document.querySelector("#form-edit");

form_updateProfile.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const user = { name, password };
  user.name = name;
  user.password = password;
  fetch(`https://matter-app.herokuapp.com/api/v1/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.status === 200) {
      alert("Update Success ✅");
      localStorage.setItem("userName", JSON.stringify(user.name));
      containerWelcome = "";
      container2 = "";
      loadData();
      window.location = "./profile.html";
      document.getElementById("form-edit").reset();
    } else if (response.status === 204) {
    }
  });
});

function loadData() {
  if (userName) {
    containerWelcome.innerHTML += ` Profile: ${userName}.`;
    container2.innerHTML += `${userName}`;
    document.getElementById("name").value = `${userName}`;
  } else {
    containerWelcome.innerHTML += `Profiless: ${userEmail}.`;
    container2.innerHTML += `${userEmail}`;
    document.getElementById("name").value = `${userName}`;
  }
}

document.getElementById("clean").addEventListener("click", cleanStorage);

function cleanStorage() {
  alert("See you soon ✌🏼");
  localStorage.clear();
}

loadData();
