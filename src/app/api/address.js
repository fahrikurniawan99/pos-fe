import axios from "axios";
import { config } from "../config";

export const getDeliveryAddress = (params) =>
  new Promise((resolve, reject) => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    axios
      .get(`${config.apiBaseURL}/api/delivery-addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const createDeliveryAddress = (body) =>
  new Promise((resolve, reject) => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    axios
      .post(`${config.apiBaseURL}/api/delivery-addresses`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
