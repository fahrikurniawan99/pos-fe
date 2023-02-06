import { getProducts } from "../../api/product";
import {
  START_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
  ERROR_FETCHING_PRODUCT,
  SET_CURRENT_PAGE,
  SET_CATEGORY,
  CLEAR_FILTER,
  SET_TAGS,
  SET_KEYWORD,
} from "./constants";

const startFetchingProduct = () => ({ type: START_FETCHING_PRODUCT });
const successFetchingProduct = (payload) => ({
  type: SUCCESS_FETCHING_PRODUCT,
  payload,
});
const errorFetchingProduct = () => ({ type: ERROR_FETCHING_PRODUCT });

export const fetchProduct = (params) => async (dispatch, getState) => {
  try {
    dispatch(startFetchingProduct());
    const { perPage, currentPage, keyword } = getState().product;
    const url = `/api/products?limit=${perPage}&skip=${
      currentPage * perPage
    }&${params}`;
    const result = await getProducts(url);
    const payload = {
      data: result.data,
      totalPage: Math.ceil(result.count / perPage),
    };
    dispatch(successFetchingProduct(payload));
  } catch (error) {
    dispatch(errorFetchingProduct());
  }
};

export const setCurrentPage = (page) => ({
  payload: { currentPage: page },
  type: SET_CURRENT_PAGE,
});

export const setCategory = (value) => ({ type: SET_CATEGORY, payload: value });
export const setTags = (value) => ({ type: SET_TAGS, payload: value });
export const clearFilter = () => ({ type: CLEAR_FILTER });
export const setKeyword = (value) => ({ type: SET_KEYWORD, payload: value });
