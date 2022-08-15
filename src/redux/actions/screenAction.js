export const screenResize = () => {
  if (window.innerWidth <= 1024) {
    return { type: "SCREEN_RESIZE", payload: true };
  }
  return { type: "SCREEN_RESIZE", payload: false };
};

export const setSlide = () => {
  if (window.innerWidth <= 768) {
    return { type: "SLIDE_TO_SHOW", payload: 2 };
  } else if (window.innerWidth <= 1200) {
    return { type: "SLIDE_TO_SHOW", payload: 3 };
  }
  return { type: "SLIDE_TO_SHOW", payload: 5 };
};

export const setSidebar = (isSidebar) => {
  return { type: "SET_SIDE_BAR", payload: isSidebar };
};
