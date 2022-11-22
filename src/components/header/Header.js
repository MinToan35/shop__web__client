import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import SidebarListItem from "./SidebarListItem";

import { useDispatch, useSelector } from "react-redux";
import { getSearch } from "../../redux/actions/productAction";
import { setSidebar } from "../../redux/actions/screenAction";

import { GrClose } from "react-icons/gr";
import { GoThreeBars } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { FiHeadphones } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import logo from "../../assets/logo.png";
const Header = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.getProducts);
  let navigate = useNavigate();
  //const [sidebar, setSidebar] = useState(false);
  const { isSideBar } = useSelector((state) => state.screen);
  const { cartItems } = useSelector((state) => state.cardItems);
  const { search } = useSelector((state) => state.getProducts);
  let category;
  if (posts) {
    category = [...new Set(posts.map((item) => item.category))];
  }

  const handlePress = (e) => {
    if (e.key === "Enter") {
      navigate(`/timkiem?search=${search}`);
    }
  };
  return (
    <>
      {!posts.length ? null : (
        <>
          <header className="header">
            <div className={`sidebar ${isSideBar ? "active" : ""}`}>
              <button
                className="btn-close"
                onClick={() => dispatch(setSidebar(false))}
              >
                <GrClose />
              </button>
              <Link to="/">
                <button className="btn-login">Đăng nhập</button>
              </Link>
              {
                <ul className="sidebar__list">
                  {category.map((item) => {
                    const itemList = [
                      ...new Set(
                        posts
                          .filter((i) => i.category === item && !i.catMenu)
                          .map((e) => e.categoryItem)
                      ),
                    ];

                    return (
                      <li key={item}>
                        <SidebarListItem
                          category={item}
                          itemList={itemList}
                          products={posts}
                        />
                      </li>
                    );
                  })}
                </ul>
              }
            </div>
            <div className="container header__container">
              <GoThreeBars
                className="icon-bars"
                onClick={() => dispatch(setSidebar(true))}
              />
              <ul className="header__left">
                {category.map((item) => {
                  const itemList = [
                    ...new Set(
                      posts
                        .filter((i) => i.category === item)
                        .map((e) => e.categoryItem)
                    ),
                  ];

                  const catMenus = posts.filter(
                    (i) => i.category === item && i.catMenu
                  );
                  const catMenu = [...new Set(catMenus.map((i) => i.catMenu))];
                  const catMenuLink = [
                    ...new Set(catMenus.map((i) => i.slugCatMenu)),
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
                            const newItem = posts.filter(
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
                                    <li
                                      key={item}
                                      className="list-subMenu__item"
                                    >
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
                <img src={logo} alt="logo" />
              </Link>
              <div className="header__right">
                <div className="search">
                  <input
                    type="text"
                    placeholder="TÌM KIẾM SẢN PHẨM"
                    onChange={(e) => dispatch(getSearch(e.target.value))}
                    onKeyPress={handlePress}
                  />
                  <Link
                    to={`/timkiem?search=${search}`}
                    onClick={() => dispatch(getSearch(search))}
                  >
                    <button>
                      <BsSearch className="icon-search" />
                    </button>
                  </Link>
                </div>

                <FiHeadphones className="icon" />
                <Link to="/dangnhap">
                  <FaRegUser className="icon" />
                </Link>
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
      )}
    </>
  );
};

export default Header;
