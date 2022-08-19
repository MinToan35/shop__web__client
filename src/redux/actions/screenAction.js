import * as actionTypes from "../constants/screenConstants";

export const screenResize = () => {
  if (window.innerWidth <= 1024) {
    return { type: actionTypes.SCREEN_RESIZE, payload: true };
  }
  return { type: actionTypes.SCREEN_RESIZE, payload: false };
};

export const setSlide = () => {
  if (window.innerWidth <= 768) {
    return { type: actionTypes.SLIDE_TO_SHOW, payload: 2 };
  } else if (window.innerWidth <= 1200) {
    return { type: actionTypes.SLIDE_TO_SHOW, payload: 3 };
  }
  return { type: actionTypes.SLIDE_TO_SHOW, payload: 5 };
};

export const setSidebar = (isSidebar) => {
  return { type: actionTypes.SET_SIDE_BAR, payload: isSidebar };
};
