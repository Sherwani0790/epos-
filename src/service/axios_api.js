const express = require('express');
const cors = require('cors');
const app = express();
const appURL = require('../constants/appURL');
const axios = require('axios');

app.use(cors()); // Enable CORS for all routes

const axiosApi = axios.create();

// Request interceptor for API calls
axiosApi.interceptors.request.use(
  async config => {
    const access_token = localStorage.getItem('data')
    config.headers = {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': ' application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*' // Add CORS header here
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Response interceptor for API calls
axiosApi.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();
    axios.default.headers.common['Authorization'] = 'Bearer ' + access_token;
    return axiosApi(originalRequest);
  }
  return Promise.reject(error);
});

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    const { data } = await axios.post(appURL.baseUrl + 'auth/refreshToken', {
      refreshToken: refreshToken
    });
    localStorage.setItem('accessToken', data.data.token)
    return data.accessToken
  } else {
    return '';
  }
}

module.exports = { app, axiosApi };
