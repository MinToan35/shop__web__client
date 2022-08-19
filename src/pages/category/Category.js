import React, { useState, useEffect, useCallback } from "react";
import "./category.scss";
import FetchData from "../../assets/FetchData";
import { useParams, Link } from "react-router-dom";

import Helmet from "../../components/Helmet";
import CheckBox from "../../components/check-box/CheckBox";
import Card from "../../components/card/Card";

import { VscTriangleDown } from "react-icons/vsc";
const Category = () => {
  const { slug } = useParams();
  const data = FetchData();
  console.log(data);
  const { posts } = data.products;
  const [listProduct, setListProduct] = useState(null);
  useEffect(() => {
    setListProduct(posts);
  }, [slug, posts]);

  const title = posts
    ? posts.find((item) => item.slugItem === slug).name
    : "Danh mục";

  //filter
  const initFilter = {
    color: [],
    size: [],
  };
  const [filter, setFilter] = useState(initFilter);
  const [isSelect, setIsSelect] = useState(false);
  const [select, setSelect] = useState("Sắp xếp theo");

  const handleFilter = (item) => {
    setSelect(item);
    setIsSelect(false);
    if (item === "Mặc định") {
      return setListProduct(
        posts ? posts.filter((item) => item.slugItem === slug) : null
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

  const updateProducts = useCallback(() => {
    handleFilter("Mặc định");
    let temp = posts ? posts.filter((item) => item.slugItem === slug) : null;
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
  }, [filter]);

  useEffect(() => {
    updateProducts();
  }, [slug, filter]);

  return (
    <Helmet title={title}>
      <div className="category__container">
        <ol className="category__header">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to={`/danh-muc/${slug}`}>{title}</Link>
          </li>
        </ol>
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
              <h1>{title}</h1>
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
    </Helmet>
  );
};

export default Category;

const sizes = ["s", "m", "l", "xl", "xxl"];
const colors = ["Trắng", "Đen", "Hồng", "Xanh ngọc", "Nâu đỏ"];
