//import * as actionTypes from "../constants/productConstants";

import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/posts");
    dispatch({ type: "GET_PRODUCTS", payload: data });
  } catch (error) {
    dispatch({ type: "LOAD_FAIL", payload: true });
    console.log("error");
  }
};

export const getLike = (product) => {
  const newProduct = product;
  newProduct.like = !newProduct.like;
  return { type: "GET_LIKE", payload: newProduct };
};

export const getSearch = (search) => {
  return { type: "GET_SEARCH", payload: search };
};
