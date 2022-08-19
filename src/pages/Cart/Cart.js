import React, { useState } from "react";
import "./cart.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import currencyFormatter from "../../utils/currencyFormatter";
import Helmet from "../../components/Helmet";

import { useSelector, useDispatch } from "react-redux";
import {
  decQty,
  incQty,
  deleteProduct,
  deleteCart,
  postCart,
} from "../../redux/actions/cardItemsAction";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cardItems);
  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");

  const handlePayment = () => {
    if (cartItems.length === 0) toast.error("Không có sản phẩm trong giỏ hàng");
    else if (
      step === 1 &&
      name &&
      phoneNumber &&
      city &&
      district &&
      wards &&
      address
    )
      setStep(step + 1);
    else if (step === 0) setStep(step + 1);
    if (step === 1) {
      if (!name || !phoneNumber || !city || !district || !wards || !address)
        toast.error("Vui lòng điền đủ thông tin");
      else {
        toast.success("Đặt hàng thành công");
        setStep(0);
        dispatch(deleteCart());
        dispatch(
          postCart(
            cartItems,
            name,
            phoneNumber,
            city,
            district,
            wards,
            address,
            code
          )
        );
      }
    }
  };

  return (
    <section>
      <Helmet title="- Giỏ hàng">
        <div className="cart__container">
          <div className="cart__container__main">
            <div className="process-bar__container">
              <div className="processbar">
                <div
                  style={{
                    backgroundColor: "#221f20",
                    width: `${step * 50}%`,
                    height: "100%",
                  }}
                >
                  <div className={`dot active`}></div>
                  <div className={`dot ${step >= 1 && "active"}`}></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
            {step === 0 && (
              <>
                <h1>
                  Giỏ hàng của bạn có <span>{cartItems.length} sản phẩm</span>
                </h1>
                {cartItems.length > 0 && (
                  <table>
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Giá tiền</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="product-item">
                              <img src={item.img} alt="" />
                              <div className="product-info">
                                <p>{item.name}</p>
                                <p>Màu sắc: {item.color}</p>
                                <p>
                                  Size: <span>{item.size}</span>
                                </p>
                                <p className="price-mobile">
                                  {currencyFormatter.format(
                                    item.qty * item.price
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{currencyFormatter.format(item.price)}</td>
                          <td>
                            <div className="quantity">
                              <button onClick={() => dispatch(decQty(item))}>
                                <AiOutlineMinus />
                              </button>
                              <span>{item.qty}</span>
                              <button onClick={() => dispatch(incQty(item))}>
                                <AiOutlinePlus />
                              </button>
                            </div>
                          </td>
                          <td>
                            {currencyFormatter.format(item.qty * item.price)}
                          </td>
                          <td>
                            <RiDeleteBinLine
                              className="delete"
                              onClick={() => dispatch(deleteProduct(item))}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <Link to="/">
                  <button className="btn-home">
                    <span>&larr;</span>Tiếp tục mua hàng
                  </button>
                </Link>
              </>
            )}

            {step === 1 && (
              <form className="form">
                <h2>Địa chỉ giao hàng</h2>
                <div className="row">
                  <input
                    type="text"
                    placeholder="Họ tên"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Số điện thoại"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Tỉnh/Thành phố"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Quận/Huyện"
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phường xã"
                  onChange={(e) => setWards(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </form>
            )}
          </div>
          <div className="total-card">
            <h2>Tổng tiền giỏ hàng</h2>
            <p>
              Tổng sản phẩm{" "}
              <span>
                {cartItems.reduce((total, item) => total + item.qty, 0)}
              </span>
            </p>

            {code === "sale" && (
              <p>
                Tổng tiền hàng{" "}
                <span>
                  {currencyFormatter.format(
                    cartItems.reduce(
                      (total, product) => total + product.price * product.qty,
                      0
                    )
                  )}
                </span>
              </p>
            )}
            <p>
              Tiền thanh toán{" "}
              <span>
                {currencyFormatter.format(
                  code === "sale"
                    ? cartItems.reduce(
                        (total, product) => total + product.price * product.qty,
                        0
                      ) * 0.8
                    : cartItems.reduce(
                        (total, product) => total + product.price * product.qty,
                        0
                      )
                )}
              </span>
            </p>
            {step === 1 && (
              <div className="code-sale">
                <h3>Mã phiếu giảm giá</h3>
                <input
                  type="text"
                  placeholder="Enter code: sale"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            )}
            <button className="btn-payment" onClick={handlePayment}>
              {step === 0
                ? "Đặt hàng"
                : step === 1
                ? "Hoàn thành"
                : "Something"}
            </button>
          </div>
        </div>
      </Helmet>
    </section>
  );
};

export default Cart;
