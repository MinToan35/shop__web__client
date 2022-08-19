import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Routes from "./config/Routes";
import Navbar from "./components/navbar/Navbar";

//style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Navbar />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
