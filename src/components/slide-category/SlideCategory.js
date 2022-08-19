import React, { useState, useEffect } from "react";
import "./slide-category.scss";
import Card from "../card/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
const SlideCategory = ({ slideToShow, isTablet }) => {
  const getProducts = useSelector((state) => state.getProducts);
  const { products } = getProducts;
  const [listProduct, setListProduct] = useState();
  let category;
  if (products.posts) {
    category = [...new Set(products.posts.map((item) => item.category))];
  }
  const [value, setValue] = useState(0);

  const handleCategory = (category, index) => {
    setValue(index);
    const newProducts = products.posts
      .filter((item) => item.category === category)
      .slice(0, 8);
    setListProduct(newProducts);
  };

  useEffect(() => {
    setListProduct(
      products.posts
        ? products.posts.filter((i) => i.category === "Nữ")
        : products.posts
    );
  }, [products]);

  return (
    <div className="slide-category">
      <h2>new arrival</h2>
      <div className="btns">
        {category &&
          category.map((item, index) => (
            <button
              className={`btn-category ${index === value ? "isActive" : ""}`}
              key={index}
              onClick={() => handleCategory(item, index)}
            >
              {item === "Nữ"
                ? "IVY moda"
                : item === "Nam"
                ? "IVY men"
                : "IVY kids"}
            </button>
          ))}
      </div>
      <Swiper
        slidesPerView={slideToShow}
        spaceBetween={20}
        navigation={!isTablet}
        modules={[Navigation]}
      >
        {listProduct &&
          listProduct.map((item, index) => (
            <SwiperSlide key={index}>
              <Card item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Link to={`/danh-muc/${categoryLink[value]}`}>
        <button className="see-more">Xem tất cả</button>
      </Link>
    </div>
  );
};

export default SlideCategory;

const categoryLink = [
  "hang-nu-moi-ve",
  "hang-nam-moi-ve",
  "hang-moi-ve-tre-em",
];
