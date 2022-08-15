import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
const ReadMore = ({ name, data }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <div className="title-footer">
        <p>{name}</p>
        <button onClick={() => setReadMore(!readMore)}>
          {readMore ? (
            <AiOutlineMinus className="icon" />
          ) : (
            <AiOutlinePlus className="icon" />
          )}
        </button>
      </div>
      {readMore && (
        <ul>
          {data.map((item, index) => {
            return (
              <li key={index}>
                <Link to="/">{item.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ReadMore;
