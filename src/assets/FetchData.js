import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productAction";
const FetchData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  if (data !== undefined) return data;
};

export default FetchData;
