import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { toast } from "react-toastify";
import Helmet from "../../components/Helmet";

import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteCartOrder } from "../../redux/actions/cardItemsAction";
import { logoutUser } from "../../redux/actions/authAction";

import currencyFormatter from "../../utils/currencyFormatter";
import { FiLogOut } from "react-icons/fi";
import Trending from "../../components/trending/Trending";
import SlideCategory from "../../components/slide-category/SlideCategory";
import { Link } from "react-router-dom";
import { screenResize, setSlide } from "../../redux/actions/screenAction";
const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const { cartOrder } = useSelector((state) => state.cardItems);
  const { authState } = useSelector((state) => state.auth);
  const { isTablet } = useSelector((state) => state.screen);
  const { slideToShow } = useSelector((state) => state.screen);
  const { user } = authState;

  useEffect(() => {
    const onResize = () => {
      dispatch(screenResize());
    };
    const reLoad = () => {
      dispatch(setSlide());
    };
    onResize();
    reLoad();
    window.addEventListener("resize", onResize);
    window.addEventListener("resize", reLoad);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", reLoad);
    };
  }, [dispatch]);
  return (
    <Helmet title="Dashboard">
      {cartOrder.length ? (
        <>
          <div className="dashboard-header">
            <h2>Thông tin đặt hàng</h2>
            <div className="dashboard-header__right">
              <p>Hello {user.username}</p>
              <button onClick={() => dispatch(logoutUser())}>
                <FiLogOut className="icon" />
              </button>
            </div>
          </div>
          <DashboardPage cartOrder={cartOrder} />
        </>
      ) : (
        <>
          <div className="dashboard-header">
            <h2>Chưa có đơn đặt hàng</h2>
            <div className="dashboard-header__right">
              <p>Hello {user.username}</p>
              <button onClick={() => dispatch(logoutUser())}>
                <FiLogOut className="icon" />
              </button>
            </div>
          </div>
          <Trending />
          <SlideCategory slideToShow={slideToShow} isTablet={isTablet} />
        </>
      )}
      <Link to="/">
        <button className="btn-home">
          <span>&larr;</span>Tiếp tục mua hàng
        </button>
      </Link>
    </Helmet>
  );
};

const DashboardPage = ({ cartOrder, username }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Đơn hàng</h2>
        {cartOrder.map((item, index) => {
          const date = new Date(item.createdAt);
          return (
            <div
              key={item._id}
              className="order-item"
              onClick={() => setValue(index)}
            >
              <div className="order-item__left">
                <p className="title">{item.cart.length} sản phẩm</p>
                <p className="price">
                  {currencyFormatter.format(
                    item.cart.reduce(
                      (total, product) => total + product.price * product.qty,
                      0
                    )
                  )}
                </p>
              </div>

              <div className="order-item__right">
                <p className="date">
                  Ngày đặt hàng: {date.getDate()}-{date.getMonth() + 1}-
                  {date.getFullYear()}
                </p>
                <p className="track-detail">Đang xác nhận</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="main-order">
        <div className="main-order__info">
          <table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá tiền</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tbody>
              {cartOrder[value].cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-item">
                      <img className="img" src={item.img} alt="" />
                      <div className="product-info">
                        <p>{item.name}</p>
                        <p>Màu sắc: {item.color}</p>
                        <p>
                          Size: <span>{item.size}</span>
                        </p>
                        <p className="price-mobile">
                          {currencyFormatter.format(item.qty * item.price)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{currencyFormatter.format(item.price)}</td>
                  <td>
                    <div className="quantity">
                      <span>{item.qty}</span>
                    </div>
                  </td>
                  <td>{currencyFormatter.format(item.qty * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="main-order__detail">
          <div className="info">
            <h2>Thông tin đơn hàng</h2>
            <button
              className="btn-delete"
              onClick={() => {
                dispatch(deleteCartOrder(cartOrder[value]._id));
                toast.info("Đã xóa đơn hàng");
                if (value > 0) setValue(value - 1);
              }}
            >
              Hủy đơn
            </button>
          </div>
          <div className="info">
            <p>Tên khách hàng</p>
            <p className="title">{cartOrder[value].name}</p>
          </div>
          <div className="address">
            <p>Địa chỉ</p>
            <p className="title">
              {cartOrder[value].address}, p.{cartOrder[value].wards}, q.
              {cartOrder[value].district}, {cartOrder[value].city}
            </p>
          </div>
          <div className="info">
            <p>Số điện thoại</p>
            <p className="title">{cartOrder[value].phoneNumber}</p>
          </div>
          {
            <div className="info">
              <p>Giảm giá</p>

              <p className="title">
                {cartOrder[value].code === "sale" ? <p>20%</p> : <p>Không</p>}
              </p>
            </div>
          }
          <div className="total">
            <p>Tổng tiền</p>
            <p className="title">
              {cartOrder[value].code === "sale"
                ? currencyFormatter.format(
                    cartOrder[value].cart.reduce(
                      (total, product) => total + product.price * product.qty,
                      0
                    ) * 0.8
                  )
                : currencyFormatter.format(
                    cartOrder[value].cart.reduce(
                      (total, product) => total + product.price * product.qty,
                      0
                    )
                  )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
