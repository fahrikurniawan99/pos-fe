import { ADD_ITEM, CLEAR_ITEM, REMOVE_ITEM } from "./constants";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: {
    item: {
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      product: item._id ? item._id : item.product,
    },
  },
});

export const removeItem = (id) => ({ type: REMOVE_ITEM, payload: id });
export const cleartItem = (id) => ({ type: CLEAR_ITEM, payload: id });
