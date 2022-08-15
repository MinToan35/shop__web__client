const getAdsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ADS_REQUEST":
      return {
        loading: true,
        postBanners: {
          success: false,
          banners: [],
        },
      };
    case "GET_ADS_SUCCESS":
      return {
        loading: false,
        postAds: action.payload,
      };
    case "GET_BANNER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getAdsReducer;
