import axios from "axios";
import { config } from "../config";

export const updateCarts = (items) =>
  new Promise((resolve, reject) => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    axios
      .put(
        `${config.apiBaseURL}/api/carts`,
        { items },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const getCarts = () =>
  new Promise((resolve, reject) => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    axios
      .get(`${config.apiBaseURL}/api/carts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => reject(err));
  });
