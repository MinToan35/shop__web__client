import * as actionTypes from "../constants/galleryConstants";

import axios from "axios";

export const getGallery = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_GALLERY_REQUEST });
    const { data } = await axios.get(
      "http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000/api/posts/gallery"
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
