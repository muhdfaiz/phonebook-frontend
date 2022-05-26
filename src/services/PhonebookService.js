import BaseService from "./BaseService";

export default class PhonebookService extends BaseService {
  /**
   * Create new phonebook
   *
   * @param {String} name
   * @param {String} email
   * @param {String} mobileNumber
   * @returns
   */
  create(name, email, mobileNumber) {
    let url = this.baseURL + "/phonebooks";

    let inputs = new FormData();
    inputs.append("name", name);
    inputs.append("email", email);
    inputs.append("mobile_number", mobileNumber);

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
   * Update existing phonebook
   *
   * @param {String} name
   * @param {String} email
   * @param {String} mobileNumber
   * @returns
   */
  update(id, name, email, mobileNumber) {
    let url = this.baseURL + "/phonebooks/" + id;

    let inputs = new FormData();
    inputs.append("name", name);
    inputs.append("email", email);
    inputs.append("mobile_number", mobileNumber);

    return this.axios
      .put(url, inputs)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  /**
   * Upload excel file
   *
   * @param {*} file
   * @returns
   */
  upload(file) {
    console.log(file);
    let url = this.baseURL + "/phonebooks/excel";

    let inputs = new FormData();
    inputs.append("excel", file);

    return this.axios
      .post(url, inputs, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  /**
   * Get phonebook
   *
   * @param {Number} pageNumber
   * @param {Number} pageLimit
   * @param {String} search
   * @returns
   */
  get(pageNumber, pageLimit, search) {
    let url =
      this.baseURL +
      `/phonebooks?page=${pageNumber}&limit=${pageLimit}&search=${search}`;

    return this.axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  /**
   * Get single phonebook
   *
   * @param {String} id
   * @returns
   */
  find(id) {
    let url = this.baseURL + `/phonebooks/${id}`;

    return this.axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  /**
   * Delete phonebook
   *
   * @param {String} id
   * @returns
   */
  delete(id) {
    let url = this.baseURL + `/phonebooks/${id}`;

    return this.axios
      .delete(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }
}
