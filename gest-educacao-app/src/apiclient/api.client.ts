import axios from "axios";
export const apiService = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    Accept: "application/json",
    Content: "application/json",
    // authtoken: authtoken
  },
});