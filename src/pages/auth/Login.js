import React, { useState } from "react";
import "./login.scss";

import Helmet from "../../components/Helmet";

import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_AUTH",
      payload: {
        authLoading: true,
        isAuthenticated: false,
        user: null,
      },
    });
    try {
      const login = await dispatch(loginUser(loginForm));
      if (!login.success) {
        toast.error(login.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <Helmet title="Đăng nhập">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Đăng nhập</h2>
          <div className="input-container">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(event) =>
                setLoginForm({
                  ...loginForm,
                  username: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="input-container">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(event) =>
                setLoginForm({
                  ...loginForm,
                  password: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="register">
            <p>Chưa có tài khoản</p>
            <Link className="link" to="/dangky">
              Đăng ký
            </Link>
          </div>
          <div className="btn">
            <button type="submit" className="btn-submit">
              Đăng nhập
            </button>
          </div>
        </form>
      </Helmet>
    </section>
  );
};

export default Login;
