import Auth from "./Auth.js";

const BASE_URL = "https://matter-app.herokuapp.com/api/v1";
export default class Request {
  static login(user) {
    return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
  }
  static register(user) {
    return fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
  }
  static inviteUser(userInvited) {
    const user = Auth.user();
    return fetch(`${BASE_URL}/users/${user.id}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInvited),
    });
  }

  static updateUser(user) {
    return fetch(`${BASE_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
  }

  static receivedInvitations() {
    const user = Auth.user();
    return fetch(`${BASE_URL}/users/${user.id}/feedback-invitations`);
  }

  static getSkills() {
    return fetch(`${BASE_URL}/skills`);
  }

  static evaluateSkill(invitationId, skillId, score) {
    // // http://localhost:8000/api/v1/invitations/1/skills/1
    return fetch(`${BASE_URL}/invitations/${invitationId}/skills/${skillId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ score }),
    });
  }
}
