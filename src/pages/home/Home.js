import { useEffect } from "react";
import "./home.scss";
import Helmet from "../../components/Helmet";
import SlideBanner from "../../components/slide-banner/SlideBanner";
import SlideCategory from "../../components/slide-category/SlideCategory";
import { Link } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import Trending from "../../components/trending/Trending";
import SlideAds from "../../components/slide-ads/SlideAds";
import SlideGallery from "../../components/slide-gallery/SlideGallery";

const Home = () => {
  const dispatch = useDispatch();
  const { isTablet, slideToShow } = useSelector((state) => state.screen);

  const onResize = () => {
    if (window.innerWidth <= 1024) {
      return dispatch({ type: "SCREEN_RESIZE", isTablet: true });
    }
    return dispatch({ type: "SCREEN_RESIZE", isTablet: false });
  };

  const reLoad = () => {
    if (window.innerWidth <= 768) {
      return dispatch({ type: "SLIDE_TO_SHOW", slideToShow: 2 });
    } else if (window.innerWidth <= 1200) {
      return dispatch({ type: "SLIDE_TO_SHOW", slideToShow: 3 });
    } else {
      return dispatch({ type: "SLIDE_TO_SHOW", slideToShow: 5 });
    }
  };
  useEffect(() => {
    onResize();
    reLoad();
    window.addEventListener("resize", onResize);
    window.addEventListener("resize", reLoad);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", reLoad);
    };
  }, [dispatch]);
  return (
    <section>
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
        {slideToShow && (
          <SlideCategory slideToShow={slideToShow} isTablet={isTablet} />
        )}
        <Trending />
        <SlideAds isTablet={isTablet} />
        {slideToShow && (
          <SlideGallery slideToShow={slideToShow} isTablet={isTablet} />
        )}
      </Helmet>
    </section>
  );
};

export default Home;
