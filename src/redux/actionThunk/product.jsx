import { getProduct, getAllProduct } from "../productReducer/productReducer";
import { getNavbars } from "../menuReducer/menuReducer";
export const getProductApi = () => {
  return async (dispatch) => {
    await fetch("http://localhost:8000/listProduct")
      .then((response) => response.json())
      .then((data) => dispatch(getAllProduct(data)));
  };
};
export const getNavs = () => {
  return async (dispatch) => {
    await fetch("http://localhost:8000/navs")
      .then((response) => response.json())
      .then((data) => dispatch(getNavbars(data)));
  };
};
export const getProductInfo = (id) => {
  return async (dispatch) => {
    await fetch("http://localhost:8000/listProduct")
      .then((response) => response.json())
      .then((data) => {
        let p = data.find((item) => item.id === Number(id));
        dispatch(getProduct(p));
      });
  };
};
