import Auth from "./classes/Auth.js";

const userId = JSON.parse(localStorage.getItem("userID"));
const userName = JSON.parse(localStorage.getItem("userName"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
let authenticated = JSON.parse(localStorage.getItem("authenticated"));
let email;
let flag = JSON.parse(localStorage.getItem("flag"));
let flag2 = JSON.parse(localStorage.getItem("flag2"));

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
      document.getElementById("form-email-request").reset();
    })
    .catch((e) => {
      document.getElementById("form-email-request").reset();
      debugger;
      alert("Somethings Wrong ❌");
    });
});

function loadData() {
  let containerWelcome = document.getElementById("welcome");
  let container2 = document.getElementById("profile-card2");
  if (userName) {
    containerWelcome.innerHTML += ` 👋🏻 Hello ${userName},`;
    container2.innerHTML += `${userName}`;
  } else {
    containerWelcome.innerHTML += ` 👋🏻 Hello ${userEmail},`;
    container2.innerHTML += `${userEmail}`;
  }
}

function getFeedback() {
  fetch(`https://matter-app.herokuapp.com/api/v1/users/${userId}/invitations`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        data.forEach((invitation) => {
          if (invitation.skills != null || invitation.skills.length > 0) {
            flag2 = false;
            fetch(
              `https://matter-app.herokuapp.com/api/v1/invitations/${invitation.id}/feedback`
            )
              .then((response) => response.json())
              .then((data) => {
                if (data) {
                  let skillName = "communication.svg";

                  data.forEach((feedback) => {
                    if (feedback.name === "Comunicación") {
                      skillName = "communication.svg";
                    } else if (feedback.name === "Empatía") {
                      skillName = "empathy.svg";
                    } else if (feedback.name === "Liderazgo") {
                      skillName = "leadership.svg";
                    }
                    let container = document.getElementById("feedback");
                    container.innerHTML += `<li class="list-group-item"> <img
                        class="img-fluid mt-1 mb-1"
                        style="width: 1.5rem"
                        src="./assets/img/${skillName}"
                        alt=""
                      /> <span class="ml-3 color-feedback">${invitation.user_invited.name} evaluo tu skill ${feedback.name} con un score de: ${feedback.pivot.score} ✔️</span>  </li>`;
                  });
                }
              });
          }
        });
      } else {
        if (flag2) {
          let container = document.getElementById("feedback");
          container.innerHTML += `<li class="list-group-item"> <span class="ml-3"> 
                        No feedback to show 🥺</span>  </li>`;
          flag2 = false;
        }
      }
    })
    .then((e) => {
      if (flag2) {
        let container = document.getElementById("feedback");
        container.innerHTML += `<li class="list-group-item"> <span class="ml-3"> 
                        No feedback to show 🥺</span>  </li>`;
        flag2 = false;
      }
    });
}

function receivedInvitations() {
  let containerReceviedInvitations = document.getElementById("evaluateSkill");
  let invitationCount = 0;
  fetch(
    `https://matter-app.herokuapp.com/api/v1/users/${userId}/feedback-invitations`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((invitation) => {
        invitationCount++;
      });
      containerReceviedInvitations.innerHTML += `<a href="./evaluate-skills.html" style="text-decoration:none">Pending Requests <i class="fas fa-external-link-alt"></i>  <span class="ml-5"> ${invitationCount}</span> </a>`;
    });
}

document.getElementById("clean").addEventListener("click", cleanStorage);

function cleanStorage() {
  alert("See you soon ✌🏼");
  localStorage.clear();
}

loadData();
getFeedback();
receivedInvitations();
