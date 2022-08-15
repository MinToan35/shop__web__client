import React, { useEffect } from "react";
import "./slide-gallery.scss";
import { Swiper, SwiperSlide } from "swiper/react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getGallery as listGallery } from "../../redux/actions/galleryAction";
const SlideGallery = ({ slideToShow, isTablet }) => {
  const dispatch = useDispatch();
  const getGallery = useSelector((state) => state.getGallery);
  const { postGallery } = getGallery;
  useEffect(() => {
    dispatch(listGallery());
  }, [dispatch]);
  return (
    <div className="slide-gallery__container">
      <h2 className="slide-gallery__title">gallery</h2>
      <Swiper
        slidesPerView={slideToShow}
        spaceBetween={isTablet ? 10 : 20}
        loop={true}
      >
        {postGallery &&
          postGallery.gallery.map((item) => (
            <SwiperSlide key={item._id}>
              <a href={item.slug} target="_blank" rel="noopener noreferrer">
                <img src={item.img} alt="" />
              </a>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SlideGallery;
