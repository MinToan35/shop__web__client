import React, { useState, useEffect } from "react";
import "./detail.scss";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cardItemsAction";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";

import Helmet from "../../components/Helmet";
import currencyFormatter from "../../utils/currencyFormatter";
import Trending from "../../components/trending/Trending";
import Card from "../../components/card/Card";

import { GrPrevious } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
const Detail = () => {
  const { posts } = useSelector((state) => state.getProducts);
  const { productsSeen } = useSelector((state) => state.cardItems);
  const { isTablet } = useSelector((state) => state.screen);
  const { slideToShow } = useSelector((state) => state.screen);
  return (
    <>
      {posts && productsSeen && (
        <DetailPage
          products={posts}
          productsSeen={productsSeen}
          isTablet={isTablet}
          slideToShow={slideToShow}
        />
      )}
    </>
  );
};

export default Detail;

const DetailPage = ({ products, productsSeen, isTablet, slideToShow }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [activeThumb, setActiveThumb] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [value, setValue] = useState(0);
  const [seemore, setSeemore] = useState(false);

  useEffect(() => {
    setProduct(products.find((item) => item.slugDetail === slug));
  }, [products, slug]);

  const handleQty = (item) => {
    if (item === "increase") setQty(qty + 1);
    if (item === "decrease")
      setQty((prevQuantity) => {
        if (prevQuantity === 1) return prevQuantity;
        return prevQuantity - 1;
      });
  };
  const handleAddCart = () => {
    if (size === "") {
      toast.error("Vui lòng chọn size");
    } else {
      dispatch(addToCart(product, size, qty));
      toast.success("Đã thêm vào giỏ hàng");
    }
  };
  const productsLike = products.filter((item) => item.like);
  return (
    <Helmet title={`${product ? product.title : ""}`}>
      <div className="detail__container">
        <div className="img__container">
          <div className="slider">
            <div className="slider__flex">
              <div className="slider__images">
                <Swiper
                  thumbs={{
                    swiper:
                      activeThumb && !activeThumb.destroyed
                        ? activeThumb
                        : null,
                  }}
                  direction="horizontal"
                  slidesPerView={1}
                  spaceBetween={16}
                  mousewheel={true}
                  navigation={{
                    nextEl: ".slider__next",
                    prevEl: ".slider__prev",
                  }}
                  breakpoints={{
                    0: {
                      direction: "horizontal",
                    },
                    768: {
                      direction: "horizontal",
                    },
                  }}
                  className="swiper-container2"
                  modules={[Navigation, Thumbs, Mousewheel]}
                >
                  {product &&
                    product.listImg.map((slide, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="slider__image">
                            <img src={slide} alt="" />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
              <div className="slider__col">
                <div className="slider__prev">
                  <GrPrevious className="icon" />
                </div>
                <div className="slider__thumbs">
                  <Swiper
                    onSwiper={setActiveThumb}
                    direction="vertical"
                    spaceBetween={16}
                    slidesPerView={3}
                    navigation={{
                      nextEl: ".slider__next",
                      prevEl: ".slider__prev",
                    }}
                    className="swiper-container1"
                    breakpoints={{
                      0: {
                        direction: "horizontal",
                      },
                      768: {
                        direction: "vertical",
                      },
                    }}
                    modules={[Navigation, Thumbs]}
                  >
                    {product &&
                      product.listImg.map((slide, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="slider__image">
                              <img src={slide} alt="" />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
                <div className="slider__next">
                  <GrPrevious className="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {product && (
          <div className="detail__info">
            <h2>{product.title}</h2>
            <h3>{currencyFormatter.format(product.price)}</h3>
            <p>Color: {product.color[0]}</p>
            <div className="btns-size">
              {product &&
                product.size.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`btn-size ${item === size ? "active" : ""}`}
                  >
                    {item}
                  </button>
                ))}
            </div>
            <div className="quantity">
              <span>Số lượng</span>
              <button onClick={() => handleQty("decrease")}>
                <AiOutlineMinus />
              </button>
              <span>{qty}</span>
              <button onClick={() => handleQty("increase")}>
                <AiOutlinePlus />
              </button>
            </div>
            <div className="btns">
              <button className="add-to-card" onClick={handleAddCart}>
                Thêm vào giỏ{" "}
              </button>
              <Link
                to="/thanhtoan/giohang"
                onClick={(e) => {
                  if (size === "") e.preventDefault();
                }}
              >
                <button className="payment" onClick={handleAddCart}>
                  Mua hàng{" "}
                </button>
              </Link>
            </div>
            <div className="detail__info__main">
              <div className="detail__info__btns">
                <button
                  onClick={() => setValue(0)}
                  className={`btn ${value === 0 && "active"}`}
                >
                  Giới thiệu
                </button>
                <button
                  onClick={() => setValue(1)}
                  className={`btn ${value === 1 && "active"}`}
                >
                  Chi tiết sản phẩm
                </button>
                <button
                  onClick={() => setValue(2)}
                  className={`btn ${value === 2 && "active"}`}
                >
                  Bảo quản
                </button>
              </div>
              <div className={`detail__info__item ${seemore && "active"}`}>
                {value === 0 &&
                  product &&
                  product.desc.map((item, index) => <p key={index}>{item}</p>)}
                {value === 1 &&
                  product.detail.map((item, index) => (
                    <div className="details" key={index}>
                      <p>{item.title}</p>
                      <p>{item.info}</p>
                    </div>
                  ))}
                {value === 2 &&
                  product.preserve.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </div>
              <div className="seemore ">
                <div className="line"></div>
                <button
                  className={`btn-seemore ${seemore && "active"}`}
                  onClick={() => setSeemore(!seemore)}
                >
                  <GrPrevious />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {productsSeen.length > 1 && (
        <div className="product-seen">
          <h2>Sản phẩm đã xem</h2>
          <Swiper
            slidesPerView={slideToShow}
            spaceBetween={20}
            navigation={!isTablet}
            modules={[Navigation]}
          >
            {productsSeen.map((item, index) => (
              <SwiperSlide key={index}>
                <Card item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {productsLike.length > 0 && (
        <div className="product-seen">
          <h2>Sản phẩm đã thích</h2>
          <Swiper
            slidesPerView={slideToShow}
            spaceBetween={20}
            navigation={!isTablet}
            modules={[Navigation]}
          >
            {productsLike.map((item, index) => (
              <SwiperSlide key={index}>
                <Card item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <Trending />
    </Helmet>
  );
};
