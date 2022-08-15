const getGalleryReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_GALLERY_REQUEST":
      return {
        loading: true,
        postGallery: {
          success: false,
          gallery: [],
        },
      };
    case "GET_GALLERY_SUCCESS":
      return {
        loading: false,
        postGallery: action.payload,
      };
    case "GET_GALLERY_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getGalleryReducer;
