import React, { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import ListSubMenuItem from "./ListSubMenuItem";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SidebarListItem = ({ category, itemList }) => {
  const [showMore, setShowMore] = useState(false);

  const getProducts = useSelector((state) => state.getProducts);
  const { products } = getProducts;
  const catMenus = products.posts.filter(
    (item) => item.category === category && item.catMenu
  );
  const catMenu = [...new Set(catMenus.map((i) => i.name))];
  const catMenuLink = [...new Set(catMenus.map((i) => i.slugItem))];
  return (
    <>
      <div className="sidebar-item">
        <h3>{category}</h3>
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? (
            <AiOutlineMinus className="btn-showMore" />
          ) : (
            <AiOutlinePlus className="btn-showMore" />
          )}
        </button>
      </div>
      {showMore && catMenu && (
        <ul className="cat-subMenu">
          {catMenu.map((item, index) => (
            <li key={item} className="cat-subMenu__item">
              <Link to={`/danh-muc/${catMenuLink[index]}`}>{item}</Link>
            </li>
          ))}
        </ul>
      )}

      {showMore && (
        <ul className="list-subMenu">
          {itemList.map((item, index) => (
            <li key={index} className="list-subMenu__items">
              <ListSubMenuItem category={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SidebarListItem;
