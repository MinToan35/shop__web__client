import React, { useState, useEffect } from "react";
import "./header.scss";
import { Link } from "react-router-dom";

import { GrClose } from "react-icons/gr";
import { GoThreeBars } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { FiHeadphones } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts as listProducts } from "../../redux/actions/productAction";

import SidebarListItem from "./SidebarListItem";

const Header = () => {
  //const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const getProducts = useSelector((state) => state.getProducts);
  const { products } = getProducts;

  const { cartItems } = useSelector((state) => state.cardItems);

  let category;

  if (products.posts) {
    category = [...new Set(products.posts.map((item) => item.category))];
  }

  return (
    <>
      <header className="header">
        <div className={`sidebar ${sidebar ? "active" : ""}`}>
          <button className="btn-close" onClick={() => setSidebar(!sidebar)}>
            <GrClose />
          </button>
          <Link to="/">
            <button className="btn-login">Đăng nhập</button>
          </Link>
          {category && (
            <ul className="sidebar__list">
              {category.map((item) => {
                let itemList;
                if (products.posts) {
                  itemList = [
                    ...new Set(
                      products.posts
                        .filter((i) => i.category === item && !i.catMenu)
                        .map((e) => e.categoryItem)
                    ),
                  ];
                }
                return (
                  <li key={item}>
                    <SidebarListItem category={item} itemList={itemList} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="container header__container">
          <GoThreeBars
            className="icon-bars"
            onClick={() => setSidebar(!sidebar)}
          />
          <ul className="header__left">
            {category &&
              category.map((item) => {
                const itemList = [
                  ...new Set(
                    products.posts
                      .filter((i) => i.category === item && !i.catMenu)
                      .map((e) => e.categoryItem)
                  ),
                ];

                const catMenus = products.posts.filter(
                  (i) => i.category === item && i.catMenu
                );
                const catMenu = [...new Set(catMenus.map((i) => i.name))];
                const catMenuLink = [
                  ...new Set(catMenus.map((i) => i.slugItem)),
                ];
                return (
                  <li key={item} className="header__left-item">
                    <h3>{item}</h3>
                    <div className="subMenu">
                      <ul className="cat-subMenu">
                        {catMenu.map((item, index) => (
                          <li key={item} className="cat-subMenu__item">
                            <Link to={`/danh-muc/${catMenuLink[index]}`}>
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="list-subMenu">
                        {itemList.map((item) => {
                          const newItem = products.posts.filter(
                            (i) => i.categoryItem === item
                          );
                          const itemCat = [
                            ...new Set(newItem.map((item) => item.name)),
                          ];
                          const itemLink = [
                            ...new Set(newItem.map((item) => item.slugItem)),
                          ];
                          return (
                            <li key={item}>
                              <h3>{item}</h3>
                              <ul>
                                {itemCat.map((item, index) => (
                                  <li key={item} className="list-subMenu__item">
                                    <Link to={`/danh-muc/${itemLink[index]}`}>
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
          </ul>
          <Link to="/">
            <img src="https://pubcdn2.ivymoda.com/images/logo.png" alt="logo" />
          </Link>
          <div className="header__right">
            <div className="search">
              <input type="text" placeholder="TÌM KIẾM SẢN PHẨM" />
              <Link to={`/timkiem?`}>
                <button>
                  <BsSearch className="icon-search" />
                </button>
              </Link>
            </div>
            <FiHeadphones className="icon" />
            <FaRegUser className="icon" />
            <div className="bag-count">
              <Link to="/thanhtoan/giohang">
                <BsHandbag className="icon" />
                <span>
                  {cartItems.reduce((total, item) => total + item.qty, 0)}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
