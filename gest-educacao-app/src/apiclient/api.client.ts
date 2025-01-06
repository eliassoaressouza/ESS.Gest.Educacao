import axios from "axios";


export interface ReturnInfo {
  status: boolean;
  message: string;
  item: {}
  items: []
  exception: object;
}

export const apiService = axios.create({
  baseURL: 'https://localhost:7269/api/',
  headers: {
    Accept: "application/json",
    Content: "application/json",
    // authtoken: authtoken
  },
});