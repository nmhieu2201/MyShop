import {
  getProduct,
  getAllProduct,
  getFeedback,
} from "../productReducer/productReducer";
export const getProductApi = () => {
  return async (dispatch) => {
    await fetch("http://localhost:8000/listProduct")
      .then((response) => response.json())
      .then((data) => dispatch(getAllProduct(data)));
  };
};
export const getProductInfo = (id) => {
  return async (dispatch) => {
    await fetch("http://localhost:8000/listProduct")
      .then((response) => response.json())
      .then((data) => {
        let p = data.find((item) => item.id === Math.floor(id));
        dispatch(getProduct(p));
      });
  };
};
export const getProductFeedback = (id) => {
  return async (dispatch) => {
    await fetch("http://localhost:8000/productFeedback")
      .then((response) => response.json())
      .then((data) => {
        let newArray = data
          .map((item) => item.data)
          .filter((product) => product.id === Math.floor(id));

        dispatch(getFeedback(newArray));
      });
  };
};
