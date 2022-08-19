import axios from "axios";

export const getAds = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ADS_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/api/posts/ads");
    dispatch({
      type: "GET_ADS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ADS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
