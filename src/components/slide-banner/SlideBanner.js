import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./slide-banner.scss";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getBanners as listBanners,
  getBannersMobile as listBannerMobiles,
} from "../../redux/actions/bannerAction";

import Slider from "react-slick";
const SlideBanner = ({ isTablet }) => {
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const getBanners = useSelector((state) => state.getBanners);
  const { postBanners } = getBanners;

  const getBannerMobiles = useSelector((state) => state.getBannerMobiles);
  const { postBannerMobiles } = getBannerMobiles;

  useEffect(() => {
    dispatch(listBanners());
    dispatch(listBannerMobiles());
  }, [dispatch]);

  //isMobile
  const onMobile = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    onMobile();
    window.addEventListener("resize", onMobile);
    return () => window.removeEventListener("resize", onMobile);
  }, []);

  const settings = {
    dots: !isTablet,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: !isTablet,
  };
  return (
    <div className="slide-banner">
      <Slider {...settings}>
        {postBanners &&
          postBannerMobiles &&
          (isMobile
            ? postBannerMobiles.bannerMobiles.map((item, index) => (
                <Link to="/" key={index}>
                  <div className="img-container">
                    <img
                      className="img-slide"
                      key={item.id}
                      src={item.img}
                      alt=""
                    />
                  </div>
                </Link>
              ))
            : postBanners.banners.map((item, index) => (
                <Link to={`/${item.slug}`} key={index}>
                  <div className="img-container">
                    <img
                      className="img-slide"
                      key={item.id}
                      src={item.img}
                      alt=""
                    />
                  </div>
                </Link>
              )))}
      </Slider>
    </div>
  );
};

export default SlideBanner;
