import React, { useState, useEffect } from "react";
import Helmet from "../../components/Helmet";
import CheckBox from "../../components/check-box/CheckBox";
import Card from "../../components/card/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { useSelector, useDispatch } from "react-redux";
import { getSearch } from "../../redux/actions/productAction";

import { VscTriangleDown } from "react-icons/vsc";
import Trending from "../../components/trending/Trending";
const Search = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.getProducts);
  const { search } = useSelector((state) => state.getProducts);
  const { productsSeen } = useSelector((state) => state.cardItems);
  const { isTablet } = useSelector((state) => state.screen);
  const { slideToShow } = useSelector((state) => state.screen);

  useEffect(() => {
    dispatch(getSearch(search || "Đầm"));
  }, [dispatch, search]);

  return (
    <Helmet title={search ? `| ${search}` : "Tìm kiếm"}>
      {posts && search && (
        <SearchPage
          products={posts}
          search={search}
          productsSeen={productsSeen}
          isTablet={isTablet}
          slideToShow={slideToShow}
        />
      )}
    </Helmet>
  );
};

export default Search;

const SearchPage = ({
  products,
  search,
  productsSeen,
  isTablet,
  slideToShow,
}) => {
  //filter

  const initFilter = {
    color: [],
    size: [],
  };
  const [filter, setFilter] = useState(initFilter);
  const [isSelect, setIsSelect] = useState(false);
  const [select, setSelect] = useState("Mặc định");
  const [listProduct, setListProduct] = useState(null);

  useEffect(() => {
    setListProduct(
      products.filter((item) =>
        removeVietnameseTones(item.title.toLowerCase()).includes(
          removeVietnameseTones(search.toLowerCase())
        )
      )
    );
  }, [search, products]);

  const handleFilter = (item) => {
    setSelect(item);
    setIsSelect(false);
    if (item === "Mặc định") {
      return setListProduct(
        products.filter((item) =>
          removeVietnameseTones(item.title.toLowerCase()).includes(
            removeVietnameseTones(search.toLowerCase())
          )
        )
      );
    } else if (item === "Giá: thấp đến cao") {
      return setListProduct(
        listProduct.sort((a, b) =>
          a.price > b.price ? 1 : a.price < b.price ? -1 : 0
        )
      );
    } else if (item === "Giá: cao đến thấp") {
      return setListProduct(
        listProduct.sort((a, b) =>
          a.price > b.price ? -1 : a.price < b.price ? 1 : 0
        )
      );
    }
  };

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item] });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "SIZE":
          const newSize = filter.size.filter((i) => i !== item);
          setFilter({ ...filter, size: newSize });
          break;
        case "COLOR":
          const newColor = filter.color.filter((i) => i !== item);
          setFilter({ ...filter, color: newColor });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  useEffect(() => {
    const updateProducts = () => {
      handleFilter("Mặc định");
      let temp = products.filter((item) =>
        removeVietnameseTones(item.title.toLowerCase()).includes(
          removeVietnameseTones(search.toLowerCase() || "Đầm".toLowerCase())
        )
      );

      if (filter.size.length > 0) {
        temp = temp.filter((e) => {
          const check = e.size.find((size) => filter.size.includes(size));
          return check !== undefined;
        });
      }
      if (filter.color.length > 0) {
        temp = temp.filter((e) => {
          const check = e.color.find((color) => filter.color.includes(color));
          return check !== undefined;
        });
      }
      setListProduct(temp);
    };
    updateProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, filter]);

  const productsLike = products.filter((item) => item.like);

  return (
    <>
      <div className="category__container">
        <div className="category__main">
          <div className="category__sidebar">
            <ul>
              <li className="filter">
                <h3>Size</h3>
                <div className="filter__content">
                  {sizes.map((item, index) => (
                    <div key={index} className="filter__content__item">
                      <CheckBox
                        label={item}
                        onChange={(input) => {
                          filterSelect("SIZE", input.checked, item);
                        }}
                        checked={filter.size.includes(item)}
                        className="checked-size"
                      />
                    </div>
                  ))}
                </div>
              </li>

              <li className="filter">
                <h3>Màu sắc</h3>
                <div className="filter__content">
                  {colors.map((item, index) => (
                    <div key={index} className="filter__content__item">
                      <CheckBox
                        label={[item]}
                        onChange={(input) =>
                          filterSelect("COLOR", input.checked, item)
                        }
                        checked={filter.color.includes(item)}
                        className="checked-color"
                      />
                    </div>
                  ))}
                </div>
              </li>
            </ul>
            <button className="clear-filter" onClick={clearFilter}>
              Xóa bộ lọc
            </button>
          </div>
          <div className="category__products">
            <div className="category__products__top">
              <h1>{search}</h1>
              <div className="select-products">
                <div
                  className="selected-item "
                  onClick={() => setIsSelect(!isSelect)}
                >
                  <span>{select}</span>
                  <button>
                    <VscTriangleDown
                      className={`icon ${isSelect ? "active" : ""}`}
                    />
                  </button>
                </div>
                <ul className={`select-items ${isSelect ? "active" : ""}`}>
                  <li
                    className="select-item "
                    onClick={() => handleFilter("Mặc định")}
                  >
                    Mặc định
                  </li>
                  <li
                    className="select-item "
                    onClick={() => handleFilter("Giá: cao đến thấp")}
                  >
                    Giá: cao đến thấp
                  </li>
                  <li
                    className="select-item "
                    onClick={() => handleFilter("Giá: thấp đến cao")}
                  >
                    Giá: thấp đến cao
                  </li>
                </ul>
              </div>
            </div>
            <div className="category__products__main">
              {listProduct &&
                listProduct.map((item) => <Card key={item._id} item={item} />)}
            </div>
            {listProduct && listProduct.length === 0 && (
              <h3>Không có sản phẩm phù hợp</h3>
            )}
          </div>
        </div>
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
    </>
  );
};

const sizes = ["s", "m", "l", "xl", "xxl"];
const colors = ["Trắng", "Đen", "Hồng", "Xanh ngọc", "Nâu đỏ"];

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
