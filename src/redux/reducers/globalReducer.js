//import * as actionTypes from "../constants/globalConstants";

const ScreenReducer = (state = {}, action) => {
  switch (action.type) {
    case "SCREEN_RESIZE":
      const { isTablet } = action;
      return { ...state, isTablet };
    case "SLIDE_TO_SHOW":
      const { slideToShow } = action;
      return { ...state, slideToShow };
    default:
      return state;
  }
};

export default ScreenReducer;
