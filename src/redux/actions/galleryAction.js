import * as actionTypes from "../constants/galleryConstants";

import axios from "axios";

export const getGallery = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_GALLERY_REQUEST });
    const { data } = await axios.get(
      "https://mintoanshopweb.ml/api/posts/gallery"
    );
    dispatch({
      type: actionTypes.GET_GALLERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_GALLERY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
