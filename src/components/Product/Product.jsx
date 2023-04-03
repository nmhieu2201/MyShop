import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProductApi } from "../../redux/actionThunk/product";
import { Container, Stack, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sneakers from "../Sneakers/Sneakers";
import Shirts from "../Shirts/Shirts";
import Sort from "../Sort/Sort";
function Product(props) {
  const dispatch = useDispatch();
  const [listOrder, setListOrder] = useState([]);
  const [productFeedback, setProductFeedback] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  const [shirts, setShirts] = useState([]);
  const { listProduct } = useSelector((state) => state.productReducer);
  const _getOption = (value, label) => {
    return {
      value,
      label,
    };
  };
  const options = [
    _getOption(1, "Sắp xếp theo giá từ thấp đến cao"),
    _getOption(2, "Sắp xếp theo giá từ cao đến thấp"),
    _getOption(3, "Sắp xếp theo tên A - Z"),
    _getOption(4, "Sắp xếp theo tên Z - A"),
  ];

  const _getSold = useCallback(
    (id) => {
      let totalSold = 0;
      listOrder.forEach((item) => {
        item.data.forEach((product) => {
          if (product.productId === id) {
            totalSold += product.productQuantity;
          }
        });
      });
      return totalSold;
    },
    [listOrder]
  );
  const _getRating = useCallback(
    (id) => {
      let ratingProduct = 0;
      let result = 0;
      let newArray = productFeedback
        .map((item) => item.data)
        .filter((product) => product.id === id);
      newArray.forEach((product) => {
        ratingProduct += product.rating;
      });
      if (newArray.length > 0) {
        result = ratingProduct / newArray.length;
      }
      return result;
    },
    [productFeedback]
  );
  useEffect(() => {
    let sneakers = listProduct.filter((item) => item.categoryId === 1);
    let shirts = listProduct.filter((item) => item.categoryId === 2);
    setShirts(shirts);
    setSneakers(sneakers);
  }, [listProduct]);
  useEffect(() => {
    async function getListOrder() {
      await fetch("http://localhost:8000/order")
        .then((res) => res.json())
        .then((data) => setListOrder(data));
    }
    getListOrder();
  }, []);
  useEffect(() => {
    dispatch(getProductApi());
  }, [dispatch]);
  useEffect(() => {
    async function getListFeedback() {
      await fetch("http://localhost:8000/productFeedback")
        .then((res) => res.json())
        .then((data) => setProductFeedback(data));
    }
    getListFeedback();
  }, []);
  const { classes } = props;
  return (
    <Stack className={classes.product} sx={{ padding: "30px 0" }}>
      <Container>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: "28px",
              padding: "20px 0",
              fontWeight: "400",
              color: "red",
            }}>
            Sneaker
          </Typography>
          <Sort options={options} />
        </Stack>
        <Sneakers
          sneakers={sneakers}
          getSold={_getSold}
          getRating={_getRating}
        />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: "28px",
              padding: "20px 0",
              fontWeight: "400",
              color: "red",
            }}>
            Shirt
          </Typography>
          <Sort options={options} />
        </Stack>
        <Shirts shirts={shirts} getSold={_getSold} getRating={_getRating} />
      </Container>
      <ToastContainer />
    </Stack>
  );
}
export default withStyles({
  product: {
    marginTop: "50px",
  },
})(Product);
