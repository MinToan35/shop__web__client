//import * as actionTypes from "../constants/globalConstants";
const INITIALSTATE = {
  isTablet: false,
  slideToShow: 5,
  isSideBar: false,
};

const ScreenReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "SCREEN_RESIZE":
      return { ...state, isTablet: action.payload };
    case "SLIDE_TO_SHOW":
      return { ...state, slideToShow: action.payload };
    case "SET_SIDE_BAR":
      return { ...state, isSideBar: action.payload };
    default:
      return state;
  }
};

export default ScreenReducer;
