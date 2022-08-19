import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import Readmore from "./Readmore";

import {
  logo,
  social,
  left_center,
  main_center,
  right_center,
} from "../../assets/data";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer__container container">
          <div className="footer__left">
            <div className="footer__left__top">
              {logo.map((item, index) => (
                <Link key={index} to="/">
                  <img src={item.img} alt="" />
                </Link>
              ))}
            </div>
            <div className="footer__left__content">
              <div className="footer__left__content__info">
                <p>
                  Công ty Cổ phần Dự Kim với số đăng ký kinh doanh: 0123456789
                </p>
                <p>
                  <strong>Địa chỉ đăng ký: </strong>Tổ dân phố Tháp, P.Đại Mỗ,
                  Q.Nam Từ Liêm, TP.Hà Nội, Việt Nam
                </p>
                <p>
                  <strong>Số điện thoại: </strong>0123 456 789
                </p>
              </div>
            </div>
            <ul className="list-social">
              {social.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={item.img} alt="" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="hotline">
              <a href="tel:02466623434">Hotline: 0123 456 789</a>
            </div>
          </div>
          <div className="footer__center">
            <div className="footer__center__left">
              <p className="title-footer">Giới thiệu</p>
              <ul>
                {left_center.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to="/">{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="footer__center__main">
              <p className="title-footer">Dịch vụ khách hàng</p>
              <ul>
                {main_center.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to="/">{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="footer__center__right">
              <p className="title-footer">Liên hệ</p>
              <ul>
                {right_center.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to="/">{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="footer__right">
            <div className="register-form">
              <p className="title-footer">
                Nhận thông tin các chương trình của IVY moda
              </p>
              <form className="form_subscribe">
                <input
                  className="email_subscribe"
                  type="text"
                  placeholder="Nhập địa chỉ email"
                  required="required"
                />
                <div className="btn-submit">
                  <button value="Đăng ký" type="submit">
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
            <div className="footer__right__info">
              <p className="title-footer">Download App</p>
              <ul>
                <li>
                  <a
                    className="link-white"
                    href="https://shop-web-delta.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Tải App IVYmoda trên App Store"
                  >
                    {" "}
                    <img
                      src="https://pubcdn2.ivymoda.com/images/appstore.png"
                      alt=""
                    />{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://shop-web-delta.vercel.app/"
                    className="link-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Tải App IVYmoda trên Google Play"
                  >
                    {" "}
                    <img
                      src="https://pubcdn2.ivymoda.com/images/googleplay.png"
                      alt=""
                    />{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__container-tablet container">
          <div className="footer__top">
            <p className="title-footer">Download App</p>
            <ul>
              <li>
                <a
                  href="https://shop-web-delta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Tải App IVYmoda trên App Store"
                >
                  <img
                    src="https://pubcdn2.ivymoda.com/images/appstore.png"
                    width="140"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://shop-web-delta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Tải App IVYmoda trên App Store"
                >
                  <img
                    src="https://pubcdn2.ivymoda.com/images/googleplay.png"
                    width="140"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__center">
            <Readmore name="Giới thiệu" data={left_center} />
            <Readmore name="Dịch vụ khách hàng" data={main_center} />
            <Readmore name="Liên hệ" data={right_center} />
          </div>
          <div className="register-form">
            <p className="title-footer">
              Nhận thông tin các chương trình của IVY moda
            </p>
            <form className="form_subscribe">
              <input
                type="text"
                name="email"
                placeholder="Nhập địa chỉ email của bạn"
                required="required"
              />
              <div className="btn-submit">
                <button type="submit">Đăng ký</button>
              </div>
            </form>
          </div>
          <div className="footer__bottom">
            <ul className="list-social">
              {social.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url} target="_blank">
                      <img src={item.img} alt="" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="hotline">
              <a href="tel:02466623434">Hotline: 0246 662 3434</a>
            </div>
            <div className="logo-bottom">
              {logo.map((item, index) => {
                return (
                  <Link to="/" key={index}>
                    <img src={item.img} alt="" />
                  </Link>
                );
              })}
            </div>
            <p>Công ty Cổ phần Dự Kim với số đăng ký kinh doanh: 0105777650</p>
            <p>
              <strong>Địa chỉ đăng ký: </strong>Tổ dân phố Tháp, P.Đại Mỗ, Q.Nam
              Từ Liêm, TP.Hà Nội, Việt Nam
            </p>
            <p>
              <strong>Số điện thoại: </strong>0243 205 2222
            </p>
          </div>
        </div>
      </div>
      <div className="copy-right">©IVYmoda All rights reserved</div>
    </>
  );
};

export default Footer;
