import * as actionTypes from "../constants/productConstants";

import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000/api/posts"
    );
    dispatch({ type: actionTypes.GET_PRODUCTS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.LOAD_FAIL, payload: true });
    console.log("error");
  }
};

export const getLike = (product) => {
  const newProduct = product;
  newProduct.like = !newProduct.like;
  return { type: actionTypes.GET_LIKE, payload: newProduct };
};

export const getSearch = (search) => {
  return { type: actionTypes.GET_SEARCH, payload: search };
};
