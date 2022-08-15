const CART_INITIAL_STATE = {
  cartItems: [],
  productsSeen: [],
};

const CardItemsReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case "INC_QTY":
      return {
        ...state,
      };
    case "DEC_QTY":
      return {
        ...state,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item !== action.payload),
      };
    case "DELETE_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "ADD_PRODUCT_SEEN":
      if (state.productsSeen.find((i) => i._id === action.payload._id))
        return state;
      else
        return {
          ...state,
          productsSeen: [...state.productsSeen, action.payload],
        };
    default:
      return state;
  }
};

export default CardItemsReducer;
