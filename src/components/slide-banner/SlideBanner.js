import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./slide-banner.scss";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getBanners, getBannersMobile } from "../../redux/actions/bannerAction";

import Slider from "react-slick";
const SlideBanner = ({ isTablet }) => {
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const { postBanners } = useSelector((state) => state.getBanners);

  const { postBannerMobiles } = useSelector((state) => state.getBannerMobiles);

  useEffect(() => {
    const onMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    dispatch(getBanners());
    dispatch(getBannersMobile());
    onMobile();
    window.addEventListener("resize", onMobile);
    return () => window.removeEventListener("resize", onMobile);
  }, [dispatch]);

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
                <Link to={`/danh-muc/${item.slug}`} key={index}>
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
                <Link to={`/danh-muc/${item.slug}`} key={index}>
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
