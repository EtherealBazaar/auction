import axios from "axios";

// import * as env from "./env";

const httpClient = axios.create();
// const URL = env.getAPIURL();
const URL = "";

class API {
  fetchParcelStateRange(mincoords, maxcoords) {
    return this.request(
      "get",
      `/api/parcelState/range/${mincoords}/${maxcoords}`,
      {}
    );
  }

  request(method, path, params) {
    let options = {
      method,
      url: this.getUrl(path)
    };

    if (params) {
      if (method === "get") {
        options.params = { params };
      } else {
        options.data = params;
      }
    }

    console.log(`[API] ${method} ${path}`, options);

    return httpClient
      .request(options)
      .then(response => {
        if (!response.ok) {
          return Promise.reject({ message: response.error });
        }

        return response.data.data; // One for axios data, another for the servers data
      })
      .catch(err => {
        let error;
        console.error("RESPONSE ERROR", error);

        if (err.status === 401) {
          error = new AuthorizationError();
        } else {
          error = new Error(
            "[API] HTTP request failed. Inspect this error for more info"
          );
          Object.assign(error, err);
        }

        console.warn(`[WARN] ${error.message}`);

        throw error;
      });
  }

  getUrl(path) {
    return `${URL}/api${path}`;
  }
}

export class AuthorizationError {
  constructor() {
    this.status = 401;
    this.message = "Server rejected credentials. Logging out";
  }

  toString() {
    return this.message;
  }
}

export default new API();