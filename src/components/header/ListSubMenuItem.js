import React, { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListSubMenuItem = ({ category }) => {
  const [showMore, setShowMore] = useState(false);

  const getProducts = useSelector((state) => state.getProducts);
  const { products } = getProducts;

  let item;
  if (products.posts) {
    item = products.posts.filter((item) => item.categoryItem === category);
  }
  const itemName = [...new Set(item.map((i) => i.name))];
  const itemLink = [...new Set(item.map((i) => i.slugItem))];
  return (
    <>
      <div className="list-subMenu__item">
        <p>{category}</p>
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? (
            <AiOutlineMinus className="btn-showMore" />
          ) : (
            <AiOutlinePlus className="btn-showMore" />
          )}
        </button>
      </div>
      <ul>
        {showMore &&
          itemName.map((item, index) => (
            <Link key={item} to={`/danh-muc/${itemLink[index]}`}>
              {item}
            </Link>
          ))}
      </ul>
    </>
  );
};

export default ListSubMenuItem;
