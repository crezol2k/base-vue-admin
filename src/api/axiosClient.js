import axios from "axios";
import { getAuth } from "../util/auth";

const URL_API = import.meta.env.VITE_BASE_API_URL;

const axiosClient = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default axiosClient;

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const auth = getAuth();
    if (auth) {
      config.headers = {
        Authorization: `Bearer ${auth.api_token}`,
        "Accept-Language": "en",
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
