export const addToCart = (product, size, qty) => {
  return {
    type: "ADD_TO_CART",
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
    type: "INC_QTY",
    payload: newProduct,
  };
};

export const decQty = (product) => {
  const newProduct = product;
  newProduct.qty -= 1;
  if (newProduct.qty === 0) newProduct.qty = 1;
  return {
    type: "DEC_QTY",
    payload: newProduct,
  };
};

export const deleteProduct = (product) => {
  return {
    type: "DELETE_PRODUCT",
    payload: product,
  };
};

export const deleteCart = () => {
  return {
    type: "DELETE_CART",
    payload: [],
  };
};

export const addProductSeen = (product) => {
  return {
    type: "ADD_PRODUCT_SEEN",
    payload: product,
  };
};
