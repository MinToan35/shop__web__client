import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Helmet from "../../components/Helmet";
const Register = () => {
  const dispatch = useDispatch();

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { username, password } = registerForm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận sai");
    } else {
      try {
        const register = await dispatch(registerUser(registerForm));
        if (!register.success) {
          toast.error(register.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      <Helmet title="Đăng ký">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Đăng ký</h2>
          <div className="input-container">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
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
                setRegisterForm({
                  ...registerForm,
                  password: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="input-container">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          <div className="register">
            <p>Đã có tài khoản ?</p>
            <Link className="link" to="/dangnhap">
              Đăng nhập
            </Link>
          </div>
          <div className="btn">
            <button type="submit" className="btn-submit">
              Đăng ký
            </button>
          </div>
        </form>
      </Helmet>
    </section>
  );
};

export default Register;
