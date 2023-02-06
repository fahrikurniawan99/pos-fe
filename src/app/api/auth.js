import axios from "axios";
import { config } from "../config";

export const login = (body) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${config.apiBaseURL}/auth/login`, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data) return reject(err.response.data);
        reject(err);
      });
  });

export const logout = () =>
  new Promise((resolve, reject) => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    axios
      .post(
        `${config.apiBaseURL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data) return reject(err.response.data);
        reject(err);
      });
  });

export const register = (body) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${config.apiBaseURL}/auth/register`, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data) return reject(err.response.data);
        reject(err);
      });
  });
