import React from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar container">
        <button>
          <BsSearch className="icon" />
          Tìm kiếm
        </button>
        <button>
          <FaRegUser className="icon" />
          Đăng nhập
        </button>

        <button>
          <FiHeadphones className="icon" />
          Trợ giúp
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
