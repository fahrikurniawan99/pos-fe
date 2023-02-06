import { useSelector } from "react-redux";
import {
  CLEAR_FILTER,
  ERROR_FETCHING_PRODUCT,
  SET_CATEGORY,
  SET_CURRENT_PAGE,
  SET_KEYWORD,
  SET_TAGS,
  START_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
} from "./constants";

const statusList = {
  idle: "idle",
  process: "process",
  error: "error",
  success: "success",
};

const initialState = {
  data: null,
  status: statusList.idle,
  perPage: 8,
  totalPage: 0,
  currentPage: 0,
  category: "",
  tags: [],
  keyword: "",
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_PRODUCT:
      return { ...state, data: null, status: statusList.process };
    case SUCCESS_FETCHING_PRODUCT:
      return {
        ...state,
        ...action.payload,
        status: statusList.success,
      };
    case ERROR_FETCHING_PRODUCT:
      return { ...state, data: [], status: statusList.error };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case SET_CATEGORY:
      return { ...state, category: action.payload, tags: [] };
    case CLEAR_FILTER:
      return { ...state, category: "", tags: [], keyword: "" };
    case SET_TAGS:
      if (state.tags.includes(action.payload)) {
        return {
          ...state,
          tags: state.tags.filter((tag) => tag !== action.payload),
        };
      } else {
        return { ...state, tags: [...state.tags, action.payload] };
      }
    case SET_KEYWORD:
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
};

export const useProduct = () => useSelector((state) => state.product);
