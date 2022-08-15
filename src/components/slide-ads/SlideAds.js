import React, { useEffect } from "react";
import "./slide-ads.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getAds as listAds } from "../../redux/actions/adsAction";
const SlideAds = ({ isTablet }) => {
  const dispatch = useDispatch();
  const getAds = useSelector((state) => state.getAds);
  const { postAds } = getAds;

  useEffect(() => {
    dispatch(listAds());
  }, [dispatch]);
  return (
    <div className="slide-ads__container">
      <Swiper
        slidesPerView={2}
        spaceBetween={isTablet ? 15 : 30}
        loop={true}
        navigation={true}
        modules={[Navigation]}
      >
        {postAds &&
          postAds.ads.map((item) => (
            <SwiperSlide key={item._id}>
              <Link to={item.slug}>
                <img src={item.img} alt="" />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SlideAds;
