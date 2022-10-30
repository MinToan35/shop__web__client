import * as actionTypes from "../constants/getApiConstants";

import axios from "axios";

export const getAds = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ADS_REQUEST });
    const { data } = await axios.get("https://mintoanshopweb.ml/api/posts/ads");
    dispatch({
      type: actionTypes.GET_ADS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ADS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
