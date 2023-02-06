import axios from "axios";
import { config } from "../config";

export const getProducts = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${config.apiBaseURL}${url}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
