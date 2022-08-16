import * as actionTypes from "../constants/cartConstants";

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
