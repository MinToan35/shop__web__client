import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (product, size, qty) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      img: product.listImg[0],
      name: product.name,
      color: product.color,
      size: size,
      price: product.price,
      qty: qty,
    },
  };
};

export const incQty = (product) => {
  const newProduct = product;
  newProduct.qty += 1;
  return {
    type: actionTypes.INC_QTY,
    payload: newProduct,
  };
};

export const decQty = (product) => {
  const newProduct = product;
  newProduct.qty -= 1;
  if (newProduct.qty === 0) newProduct.qty = 1;
  return {
    type: actionTypes.DEC_QTY,
    payload: newProduct,
  };
};

export const deleteProduct = (product) => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    payload: product,
  };
};

export const deleteCart = () => {
  return {
    type: actionTypes.DELETE_CART,
    payload: [],
  };
};

export const addProductSeen = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT_SEEN,
    payload: product,
  };
};

export const postCart =
  (cartOrder, name, phoneNumber, city, district, wards, address, code) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000/api/posts/cart`,
        {
          cart: cartOrder,
          name,
          phoneNumber,
          city,
          district,
          wards,
          address,
          code,
        }
      );
      if (response.data.success) {
        dispatch({ type: "ADD_CART", payload: response.data.cart });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

export const getCart = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000/api/posts/cart"
    );
    if (response.data.success) {
      dispatch({ type: "GET_CART", payload: response.data.cartOrder });
    }
  } catch (error) {
    return error.response.data
      ? error.response.data
      : { success: false, message: "Server error" };
  }
};

export const deleteCartOrder = (cartId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000/api/posts/cart/${cartId}`
    );
    if (response.data.success)
      dispatch({ type: "DELETE_CART_ORDER", payload: cartId });
  } catch (error) {
    return error.response.data
      ? error.response.data
      : { success: false, message: "Server error" };
  }
};
