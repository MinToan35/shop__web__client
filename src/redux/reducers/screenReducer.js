//import * as actionTypes from "../constants/globalConstants";
const INITIALSTATE = {
  isTablet: false,
  slideToShow: 5,
};

const ScreenReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "SCREEN_RESIZE":
      return { ...state, isTablet: action.payload };
    case "SLIDE_TO_SHOW":
      return { ...state, slideToShow: action.payload };
    default:
      return state;
  }
};

export default ScreenReducer;
