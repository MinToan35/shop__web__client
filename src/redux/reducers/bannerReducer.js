const getBannersReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_BANNER_REQUEST":
      return {
        loading: true,
        postBanners: {
          success: false,
          banners: [
            {
              img: "https://pubcdn.ivymoda.com/files/news/2022/07/14/df6ea645f1151fb55ed30203530f8532.jpg",
              slug: "sale-20",
            },
            {
              img: "https://pubcdn.ivymoda.com/files/news/2022/07/14/0a32587dce3ca47dd6de7533c67fe53b.jpg",
              slug: "sale-men-20",
            },
          ],
        },
      };
    case "GET_BANNER_SUCCESS":
      return {
        loading: false,
        postBanners: action.payload,
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

export default getBannersReducer;

export const getBannerMobilesReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_BANNER_MOBILE_REQUEST":
      return {
        loading: true,
        postBannerMobiles: {
          success: false,
          bannerMobiles: [
            {
              img: "https://pubcdn.ivymoda.com/files/news/2022/07/14/df6ea645f1151fb55ed30203530f8532.jpg",
              slug: "sale-20",
            },
            {
              img: "https://pubcdn.ivymoda.com/files/news/2022/07/14/0a32587dce3ca47dd6de7533c67fe53b.jpg",
              slug: "sale-men-20",
            },
          ],
        },
      };
    case "GET_BANNER_MOBILE_SUCCESS":
      return {
        loading: false,
        postBannerMobiles: action.payload,
      };
    case "GET_BANNER_MOBILE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
