import { useSelector } from "react-redux";
import { ADD_ITEM, CLEAR_ITEM, REMOVE_ITEM } from "./constants";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      let items = [];
      const existing = state.some(
        (item) => item.product === payload.item.product
      );
      if (existing) {
        items = state.map((value) =>
          value.product === payload.item.product
            ? { ...value, qty: value.qty + 1 }
            : value
        );
      } else {
        items = [...state, { ...payload.item, qty: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(items));
      return items;
    case REMOVE_ITEM:
      const updateItems = state.map((item) =>
        item.qty > 1 && item.product == payload
          ? { ...item, qty: item.qty - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updateItems));
      return updateItems;
    case CLEAR_ITEM:
      const filter = state.filter((item) => item.product !== payload);
      localStorage.setItem("cart", JSON.stringify(filter));
      return filter;
    default:
      return state;
  }
};

export const useCart = () => useSelector((state) => state.cart);
