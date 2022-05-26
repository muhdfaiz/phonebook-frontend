import BaseService from "./BaseService";

export default class AuthService extends BaseService {
  /**
   * Login user into application.
   *
   * @param email
   * @param password
   *
   * @returns {Promise<* | void>}
   */
  login(email, password) {
    let url = this.baseURL + "/auth/login";

    let inputs = new FormData();
    inputs.append("email", email);
    inputs.append("password", password);

    return this.axios
      .post(url, inputs)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  /**
   * Register new user.
   *
   * @param name
   * @param email
   * @param password
   *
   * @returns {Promise<* | void>}
   */
  register(name, email, password) {
    let url = this.baseURL + "/auth/registration";

    let inputs = new FormData();
    inputs.append("name", name);
    inputs.append("email", email);
    inputs.append("password", password);

    return this.axios
      .post(url, inputs)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }
}
