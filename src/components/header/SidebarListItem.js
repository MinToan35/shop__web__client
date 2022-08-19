import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListSubMenuItem from "./ListSubMenuItem";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { setSidebar } from "../../redux/actions/screenAction";
const SidebarListItem = ({ category, itemList, products }) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  //catMenu
  const catMenus = products.filter(
    (item) => item.category === category && item.catMenu
  );
  const catMenu = [...new Set(catMenus.map((i) => i.catMenu))];
  const catMenuLink = [...new Set(catMenus.map((i) => i.slugCatMenu))];
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
              <Link
                to={`/danh-muc/${catMenuLink[index]}`}
                onClick={() => dispatch(setSidebar(false))}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {showMore && (
        <ul className="list-subMenu">
          {itemList.map((item, index) => (
            <li key={index} className="list-subMenu__items">
              <ListSubMenuItem category={item} products={products} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SidebarListItem;
