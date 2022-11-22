export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://mintoanshopweb.ml/api";

export const GET_ADS_REQUEST = "GET_ADS_REQUEST";
export const GET_ADS_SUCCESS = "GET_ADS_SUCCESS";
export const GET_ADS_FAIL = "GET_ADS_FAIL";

export const GET_BANNER_REQUEST = "GET_BANNER_REQUEST";
export const GET_BANNER_SUCCESS = "GET_BANNER_SUCCESS";
export const GET_BANNER_FAIL = "GET_BANNER_FAIL";

export const GET_BANNER_MOBILE_REQUEST = "GET_BANNER_MOBILE_REQUEST";
export const GET_BANNER_MOBILE_SUCCESS = "GET_BANNER_MOBILE_SUCCESS";
export const GET_BANNER_MOBILE_FAIL = "GET_BANNER_MOBILE_FAIL";
