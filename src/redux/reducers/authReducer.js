const INITIALSTATE = {
  authState: {
    isAuthenticated: false,
    user: null,
  },
};

const AuthReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, authState: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
