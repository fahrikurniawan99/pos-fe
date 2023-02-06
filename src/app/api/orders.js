import axios from "axios";
import { config } from "../config";

export const getOrders = (params) =>
  new Promise((resolve, reject) => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    axios
      .get(`${config.apiBaseURL}/api/orders?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
