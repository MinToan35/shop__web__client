export const addToCart = (product, size, qty) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      img: product.listImg[0],
      name: product.name,
      color: product.color,
      size: size,
      price: product.price,
      qty: qty,
    },
  });
};

export const incQty = (product) => (dispatch) => {
  const newProduct = product;
  newProduct.qty += 1;
  dispatch({
    type: "INC_QTY",
    payload: newProduct,
  });
};

export const decQty = (product) => (dispatch) => {
  const newProduct = product;
  newProduct.qty -= 1;
  if (newProduct.qty === 0) newProduct.qty = 1;
  dispatch({
    type: "DEC_QTY",
    payload: newProduct,
  });
};

export const deleteProduct = (product) => (dispatch) => {
  dispatch({
    type: "DELETE_PRODUCT",
    payload: product,
  });
};

export const deleteCart = () => (dispatch) => {
  dispatch({
    type: "DELETE_CART",
    payload: [],
  });
};
