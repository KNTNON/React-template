import axios from "axios";

const apiUrl = "http://localhost:4000";

export default class Api {
  static request(config, isAuthorization = false) {
    if (isAuthorization === true) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      };
    }
    return axios({
      baseURL: apiUrl,
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...config.headers
      }
    })
      .then(({ data }) => data)
      .catch(({ response, ...other }) => {
        if (response) {
          throw response.data;
        }
        throw { error: other };
      });
  }

  static signIn(data) {
    return this.request(
      {
        method: "POST",
        url: "/api/auth/signin",
        data: data
      },
      false
    );
  }

  static signUp(data) {
    return this.request(
      {
        method: "POST",
        url: "/api/auth/signup",
        data: data
      },
      false
    );
  }

  static signOut() {
    return this.request(
      {
        method: "GET",
        url: "/api/auth/signout"
      },
      true
    );
  }

  static verifyToken() {
    return this.request(
      {
        method: "POST",
        url: "/api/auth/verify-token"
      },
      true
    );
  }

  static userUpdate(userId, data) {
    return this.request(
      {
        method: "PUT",
        url: `/api/auth/user/${userId}`,
        data: data
      },
      true
    );
  }

  static updatePassword(data) {
    return this.request(
      {
        method: "PUT",
        url: "/api/auth/update-password",
        data: data
      },
      true
    );
  }

  static deleteAccount() {
    return this.request(
      {
        method: "GET",
        url: "/api/auth/delete-account"
      },
      true
    );
  }
}
