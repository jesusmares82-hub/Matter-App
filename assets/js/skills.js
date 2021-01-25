import Auth from "./classes/Auth.js";

const userId = JSON.parse(localStorage.getItem("userID"));
const userName = JSON.parse(localStorage.getItem("userName"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
let authenticated = JSON.parse(localStorage.getItem("userAuthenticated"));
let flag2 = JSON.parse(localStorage.getItem("flag2"));

function skillsScore() {
  let container = document.getElementById("skill1");
  container.innerHTML = "";
  let container2 = document.getElementById("skill2");
  container2.innerHTML = "";
  let container3 = document.getElementById("skill3");
  container3.innerHTML = "";

  fetch(`https://matter-app.herokuapp.com/api/v1/skills`)
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML += `${data[0].name}`;
      container2.innerHTML += `${data[1].name}`;
      container3.innerHTML += `${data[2].name}`;
    })
    .catch((e) => {
      alert("Somethings Wrong ❌");
    });
}

function getFeedback() {
  fetch(`https://matter-app.herokuapp.com/api/v1/users/${userId}/invitations`)
    .then((response) => response.json())
    .then((data) => {
      if (data[0].skills.length != 0) {
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

document.getElementById("clean").addEventListener("click", cleanStorage);

function cleanStorage() {
  alert("See you soon ✌🏼");
  localStorage.clear();
}

skillsScore();
getFeedback();
