import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProductApi } from "../../redux/actionThunk/product";
import {
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sneakers from "../Sneakers/Sneakers";
import Shirts from "../Shirts/Shirts";
import Sort from "../Sort/Sort";
function Product(props) {
  const dispatch = useDispatch();
  const [listOrder, setListOrder] = useState([]);
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

  const getSold = useCallback(
    (id) => {
      console.log("getSold", id);
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
  useEffect(() => {
    let sneakers = listProduct.filter((item) => item.categoryId === 1);
    let shirts = listProduct.filter((item) => item.categoryId === 2);
    setShirts(shirts);
    setSneakers(sneakers);
  }, [listProduct]);
  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8000/order")
        .then((res) => res.json())
        .then((data) => setListOrder(data));
    }
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(getProductApi());
  }, [dispatch]);
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
          <Sort options={options}/>
        </Stack>
        <Sneakers sneakers={sneakers} getSold={getSold} />
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
          <Sort options={options}/>
        </Stack>
        <Shirts shirts={shirts} getSold={getSold} />
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
