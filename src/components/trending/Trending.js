import React from "react";
import { Link } from "react-router-dom";
import "./trending.scss";

const Trending = () => {
  return (
    <div className="trending__container">
      <div className="img-trending">
        <img
          src="https://pubcdn.ivymoda.com/files/news/2022/04/13/c9a4cac52cfff8656fbd3f6f7c408c1c.jpg"
          alt=""
        />
      </div>
      <Link to="/danh-muc/sale-20" className="trending__link">
        <button className="btn-collection">XEM NGAY BST</button>
      </Link>
    </div>
  );
};

export default Trending;
