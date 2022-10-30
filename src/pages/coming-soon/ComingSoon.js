import React from "react";
import Helmet from "../../components/Helmet";
import "./coming-soon.scss";
const ComingSoon = () => {
  return (
    <Helmet title="Coming soon">
      <img
        src="https://i.giphy.com/media/anwzK42TsSAd4Ad76M/giphy.webp"
        alt=""
        className="coming-soon"
      />
    </Helmet>
  );
};

export default ComingSoon;
