import Auth from "./classes/Auth.js";

const userId = JSON.parse(localStorage.getItem("userID"));
const userName = JSON.parse(localStorage.getItem("userName"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
let authenticated = JSON.parse(localStorage.getItem("userAuthenticated"));
let email;
let container = document.getElementById("card-advisors");
const form_sendRequests = document.querySelector("#form-email-request");

function renderEmail(formData) {
  email = formData.get("email");
  console.log(email);
}

form_sendRequests.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const form = document.getElementById("form-email-request");

  const formData = new FormData(evento.currentTarget);
  renderEmail(formData);

  fetch(
    `https://matter-app.herokuapp.com/api/v1/users/${userId}/invite?email=${email}`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      alert("Send Requests Success ✅");
      container.innerHTML += "";
      window.location.href = "./advisors.html";
      loadData2();
      document.getElementById("form-email-request").reset();
    })
    .catch((e) => {
      document.getElementById("form-email-request").reset();
      alert(`Somethings Wrong ${e} ❌`);
    });
});

function loadData2() {
  fetch(`https://matter-app.herokuapp.com/api/v1/users/${userId}/invitations`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        container.innerHTML += `<li class="list-group-item"> <a href="#" style="text-decoration:none"> <span class="fs-1">📧</span> <span class="text-primary ml-1 color-feedback"> ${
          element.user_invited.email
        }</span> <span class="text-primary ml-2"> Requested: ${element.updated_at.substr(
          0,
          10
        )}</span> </a> </li>`;
      });
    })
    .catch((e) => {
      //alert("Somethings Wrong 1❌");
    });
}

document.getElementById("clean").addEventListener("click", cleanStorage);

function cleanStorage() {
  alert("See you soon ✌🏼");
  localStorage.clear();
}
loadData2();
