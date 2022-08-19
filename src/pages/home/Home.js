import React, { useEffect } from "react";
import "./home.scss";
import { Link } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { screenResize, setSlide } from "../../redux/actions/screenAction";

import Helmet from "../../components/Helmet";
import SlideBanner from "../../components/slide-banner/SlideBanner";
import SlideCategory from "../../components/slide-category/SlideCategory";
import Trending from "../../components/trending/Trending";
import SlideAds from "../../components/slide-ads/SlideAds";
import SlideGallery from "../../components/slide-gallery/SlideGallery";
import setAuthToken from "../../utils/setAuthToken";
const Home = () => {
  const dispatch = useDispatch();
  const { isTablet } = useSelector((state) => state.screen);
  const { slideToShow } = useSelector((state) => state.screen);

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

  useEffect(() => {
    if (localStorage["LOCAL_STORAGE_TOKEN_NAME"]) {
      setAuthToken(localStorage["LOCAL_STORAGE_TOKEN_NAME"]);
    }
  }, []);
  return (
    <Helmet title="Trang chủ">
      <div className="home-info">
        <Link className="info-link" to="/danh-muc/hang-nu-moi-ve">
          Free Shipping đơn hàng nguyên giá
        </Link>
        <Link className="info-link" to="/about/chinh-sach-bao-hanh">
          Bảo hành trọn đời
        </Link>
        <Link className="info-link" to="/about/chinh-sach-the-thanh-vien">
          Chính sách thẻ thành viên
        </Link>
      </div>
      <SlideBanner isTablet={isTablet} />
      <SlideCategory slideToShow={slideToShow} isTablet={isTablet} />
      <Trending />
      <SlideAds isTablet={isTablet} />
      <SlideGallery slideToShow={slideToShow} isTablet={isTablet} />
    </Helmet>
  );
};

export default Home;
