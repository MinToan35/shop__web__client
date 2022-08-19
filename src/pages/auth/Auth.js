import React, { useEffect } from "react";
import Login from "./Login";
import { Navigate } from "react-router-dom";

import { loadUser } from "../../redux/actions/authAction";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import Register from "./Register";

const Auth = ({ authRoute }) => {
  const dispatch = useDispatch();
  const { authState } = useSelector((state) => state.auth);
  useEffect(() => {
    loadUser(dispatch);
  }, [dispatch]);
  let body;


  console.log(authState.authLoading)
  if (authState.authLoading) body = <Loading />;
  else if (authState.isAuthenticated) return <Navigate to="/dashboard" />;
  else {
    body = (
      <>
        {authRoute === "dangnhap" && <Login />}
        {authRoute === "dangky" && <Register />}
      </>
    );
  }

  return <>{body}</>;
};

export default Auth;
