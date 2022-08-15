//import * as actionTypes from "../constants/productConstants";
const INITIALSTATE = {
  posts: [],
  search: "",
  error: false,
  loading: true,
};
const getProductsReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, posts: action.payload.posts, loading: false };
    case "LOAD_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "GET_LIKE":
      return {
        ...state,
      };
    case "GET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

export default getProductsReducer;
