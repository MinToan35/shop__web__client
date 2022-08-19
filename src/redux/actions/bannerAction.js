import axios from "axios";

export const getBanners = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_BANNER_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/api/posts/banner");
    dispatch({
      type: "GET_BANNER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_BANNER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBannersMobile = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_BANNER_MOBILE_REQUEST" });
    const { data } = await axios.get(
      "http://localhost:5000/api/posts/bannerMobile"
    );
    dispatch({
      type: "GET_BANNER_MOBILE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_BANNER_MOBILE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
