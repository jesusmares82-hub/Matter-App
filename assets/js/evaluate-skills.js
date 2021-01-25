import Auth from "./classes/Auth.js";

let authenticated = JSON.parse(localStorage.getItem("userAuthenticated"));
const userId = JSON.parse(localStorage.getItem("userID"));
const userName = JSON.parse(localStorage.getItem("userName"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));

function printReceivedInvitations() {
  fetch(
    `https://matter-app.herokuapp.com/api/v1/users/${userId}/feedback-invitations`
  )
    .then((response) => response.json())
    .then((data) => {
      fetch(`https://matter-app.herokuapp.com/api/v1/skills`)
        .then((response) => response.json())
        .then((skills) => {
          printInvitations("invitations-container", data, skills);
        });
    });
}

function printInvitations(containerId, invitations, skills) {
  const container = document.getElementById("invitations-container");
  console.log(invitations);

  invitations.forEach((invitation) => {
    fetch(`https://matter-app.herokuapp.com/api/v1/users/${invitation.user_id}`)
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        container.innerHTML += `<div class="card card-matter mt-3">
                                        <div class="card-body  text-center">
                                            <form id="form-feedback${
                                              invitation.id
                                            }" onsubmit="event.preventDefault(), sendFeedback(${
          invitation.id
        })">
                                                <p class="font-weight-bold">Give feedback to <mark>${
                                                  users.name
                                                }</mark></p>
                                                ${htmlAnswers(skills)}
                                                <button class="btn btn-primary mt-2">Send Feedback</button>
                                            </form>
                                        </div>
                                    </div>`;
      });
  });
}

function htmlAnswers(skills) {
  let html = ``;
  skills.forEach((skill, index) => {
    html += `<h6 class="mt-2">${skill.name}</h6>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="score${index}" id="one${index}" data-skill="${skill.id}" value="1" checked>
                <label class="form-check-label" for="one${index}">
                1 score
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="score${index}" id="two${index}" data-skill="${skill.id}" value="2">
                <label class="form-check-label" for="two${index}">
                2 scores
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="score${index}" id="three${index}" data-skill="${skill.id}" value="3">
                <label class="form-check-label" for="three${index}">
                3 scores
                </label>
            </div>`;
  });
  return html;
}

function evaluateSkill(invitationId, skillId, score) {
  return fetch(
    `https://matter-app.herokuapp.com/api/v1/invitations/${invitationId}/skills/${skillId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ score }),
    }
  );
}

function sendFeedback(invitationId) {
  const form = document.getElementById(`form-feedback${invitationId}`);
  const inputsChecked = form.querySelectorAll("input:checked");

  const inputsArray = Array.from(inputsChecked);
  inputsArray.forEach((input) => {
    const skillId = input.getAttribute("data-skill");

    evaluateSkill(invitationId, skillId, input.value).then((response) => {
      localStorage.setItem("statusResponse", JSON.stringify(response.status));
    });
  });
  const statusResponse = JSON.parse(localStorage.getItem("statusResponse"));
  if (statusResponse === 200) {
    alert("Feedback sent successfully");
  } else if (statusResponse === 204) {
  } else if (statusResponse === 500) {
    alert("We had an error sending feedback");
  }
}

window.sendFeedback = sendFeedback;

printReceivedInvitations();
