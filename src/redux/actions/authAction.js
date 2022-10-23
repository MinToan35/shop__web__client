import axios from "axios";
import { toast } from "react-toastify";
import setAuthToken from "../../utils/setAuthToken";

export const loginUser = (userForm) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000/api/auth/login",
      userForm
    );
    if (response.data.success) {
      localStorage.setItem(
        "LOCAL_STORAGE_TOKEN_NAME",
        response.data.accessToken
      );
    }
    await loadUser(dispatch);

    return response.data;
  } catch (error) {
    if (error.response.data) return error.response.data;
    else return { success: false, message: error.message };
  }
};

export const registerUser = (userForm) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000/api/auth/register`,
      userForm
    );
    if (response.data.success)
      localStorage.setItem(
        "LOCAL_STORAGE_TOKEN_NAME",
        response.data.accessToken
      );
    await loadUser(dispatch);
    return response.data;
  } catch (error) {
    if (error.response.data) return error.response.data;
    else return { success: false, message: error.message };
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("LOCAL_STORAGE_TOKEN_NAME");
  dispatch({
    type: "SET_AUTH",
    payload: { isAuthenticated: false, user: null },
  });
};

export const loadUser = async (dispatch) => {
  if (localStorage["LOCAL_STORAGE_TOKEN_NAME"]) {
    setAuthToken(localStorage["LOCAL_STORAGE_TOKEN_NAME"]);
    try {
      const response = await axios.get(
        `http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000/api/auth`
      );
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            authLoading: false,
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem("LOCAL_STORAGE_TOKEN_NAME");
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { authLoading: false, isAuthenticated: false, user: null },
      });
      console.log(error);
    }
  }
};
