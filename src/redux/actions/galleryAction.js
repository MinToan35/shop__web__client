import axios from "axios";

export const getGallery = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_GALLERY_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/api/posts/gallery");
    dispatch({
      type: "GET_GALLERY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_GALLERY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
