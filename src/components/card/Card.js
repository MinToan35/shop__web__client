import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./card.scss";

import Color from "../Color";
import currencyFormatter from "../../utils/currencyFormatter";

import { useDispatch } from "react-redux";
import { addProductSeen } from "../../redux/actions/cardItemsAction";
import { toast } from "react-toastify";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";

import { addToCart } from "../../redux/actions/cardItemsAction";
import { getLike } from "../../redux/actions/productAction";
const Card = ({ item }) => {
  const dispatch = useDispatch();
  const [chooseSize, setChooseSize] = useState(false);

  const handleOpen = (product, size) => {
    dispatch(addToCart(product, size, 1));
    setChooseSize(!chooseSize);
    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <div className="card">
      <Link
        to={`/sanpham/${item.slugDetail}`}
        className="img-product"
        onClick={() => dispatch(addProductSeen(item))}
      >
        <img className="img-product" src={item.listImg[0]} alt={item.title} />
        <img className="img-hover" src={item.listImg[1]} alt={item.title} />
      </Link>
      <div className="card__info">
        <div className="card__info__header">
          <div className="colors">
            <Color color={item.color} />
          </div>
          <button onClick={() => dispatch(getLike(item))}>
            {item.like ? (
              <FaHeart className="icon" />
            ) : (
              <FiHeart className="icon" />
            )}
          </button>
        </div>
      </div>
      <Link className="card__info__name" to={`/sanpham/${item.slugDetail}`}>
        {item.title}
      </Link>
      <div className="card__info__footer">
        <h3>{currencyFormatter.format(item.price)}</h3>
        <button
          className="add-to-bag"
          onClick={() => setChooseSize(!chooseSize)}
        >
          <BsHandbag className="icon" />
        </button>
        <ul className={`size__items ${chooseSize ? "active" : ""}`}>
          {item.size.map((size, index) => (
            <li key={index}>
              <button onClick={() => handleOpen(item, size)}>{size}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
