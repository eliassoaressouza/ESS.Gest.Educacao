import axios from "axios";
import {  parseCookies } from "nookies";



export const apiService = axios.create({
  baseURL: 'https://localhost:7269/api/',
  headers: {
    Accept: "application/json",
    Content: "application/json",
    // authtoken: authtoken
  },
});
const { ChaveCokie: token } = parseCookies();

if(token){
  apiService.defaults.headers['Authorization']= `Bearer ${token}`

}

/****
apiService.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('#$#$#$#$')
  return Promise.reject(error);
});
 */