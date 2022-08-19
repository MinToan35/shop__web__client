import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import Detail from "../pages/detail/Detail";
import Cart from "../pages/Cart/Cart";
import Search from "../pages/search/Search";
import ComingSoon from "../pages/coming-soon/ComingSoon";
import Auth from "../pages/auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
const Routes = () => {
  return (
    <Switch>
      <Route path="/about/:slug" element={<ComingSoon />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/dangnhap" element={<Auth authRoute="dangnhap" />} />
      <Route path="/dangky" element={<Auth authRoute="dangky" />} />
      <Route path="/timkiem" element={<Search />} />
      <Route path="/thanhtoan/giohang" element={<Cart />} />
      <Route path="/sanpham/:slug" element={<Detail />} />
      <Route path="/danh-muc/:slug" element={<Category />} />
      <Route path="/" element={<Home />} />
    </Switch>
  );
};

export default Routes;
