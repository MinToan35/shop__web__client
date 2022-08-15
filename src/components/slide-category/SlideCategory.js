import React, { useState, useEffect } from "react";
import "./slide-category.scss";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { useSelector } from "react-redux";

import Card from "../card/Card";
const SlideCategory = ({ slideToShow, isTablet }) => {
  const { posts } = useSelector((state) => state.getProducts);
  return (
    <>
      {posts && (
        <SlideCat
          slideToShow={slideToShow}
          isTablet={isTablet}
          products={posts}
        />
      )}
    </>
  );
};

export default SlideCategory;

const SlideCat = ({ slideToShow, isTablet, products }) => {
  const category = [...new Set(products.map((item) => item.category))];

  const [value, setValue] = useState(0);
  const [listProduct, setListProduct] = useState();

  const handleCategory = (category, index) => {
    setValue(index);
    const newProducts = products
      .filter((item) => item.category === category)
      .slice(0, 8);
    setListProduct(newProducts);
  };
  useEffect(() => {
    setListProduct(
      products ? products.filter((i) => i.category === "Nữ") : products
    );
  }, [products]);
  return (
    <div className="slide-category">
      <h2>new arrival</h2>
      <div className="btns">
        {category.map((item, index) => (
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

const categoryLink = [
  "hang-nu-moi-ve",
  "hang-nam-moi-ve",
  "hang-moi-ve-tre-em",
];
