import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navbar.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearch } from "../../redux/actions/productAction";
import { setSidebar } from "../../redux/actions/screenAction";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const { search } = useSelector((state) => state.getProducts);
  const { authState } = useSelector((state) => state.auth);
  const handlePress = (e) => {
    if (e.key === "Enter") {
      navigate(`/timkiem?search=${search}`);
      dispatch(setSidebar(false));
      setIsSearching(false);
    }
  };
  return (
    <div className="nav">
      <nav>
        <div className="navbar container">
          <button onClick={() => setIsSearching(!isSearching)}>
            <BsSearch className="icon" />
            Tìm kiếm
          </button>

          <Link
            className="login"
            to="/dangnhap"
            onClick={() => dispatch(setSidebar(false))}
          >
            <FaRegUser className="icon" />
            {authState.isAuthenticated ? "Lịch sử" : "Đăng nhập"}
          </Link>

          <button>
            <FiHeadphones className="icon" />
            Trợ giúp
          </button>
        </div>
      </nav>
      <div className={`search-sidebar ${isSearching && "active"}`}>
        <input
          type="text"
          placeholder="TÌM KIẾM SẢN PHẨM"
          onChange={(e) => dispatch(getSearch(e.target.value))}
          onKeyPress={handlePress}
        />
        <Link
          to={`/timkiem?search=${search}`}
          onClick={() => {
            dispatch(getSearch(search));
            dispatch(setSidebar(false));
            setIsSearching(false);
          }}
        >
          <button>
            <BsSearch className="icon-search" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
