import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { Link } from "react-router-dom";
const ListSubMenuItem = ({ category, products }) => {
  const [showMore, setShowMore] = useState(false);

  const item = products.filter((item) => item.categoryItem === category);
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
