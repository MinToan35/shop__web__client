//import * as actionTypes from "../constants/productConstants";
const INITIALSTATE = {
  posts: [],
  search: "",
};
const getProductsReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return action.payload;
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
