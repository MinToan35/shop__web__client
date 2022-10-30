import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
const Helmet = (props) => {
  document.title = "MTshop " + props.title;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mt-5">
      {props.children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

Helmet.propTypes = {
  title: PropTypes.string,
};
export default Helmet;
