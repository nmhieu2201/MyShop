import React, { useState } from "react";
import { Stack, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductApi } from "../../redux/actionThunk/product";
import CartItem from "../../components/CartItem/CartItem";
import OrderForm from "../../components/OrderForm/OrderForm";
import { useMemo } from "react";
export default function Cart() {
  const dispatch = useDispatch();
  const [cartCurrent, setCartCurrent] = useState([]);
  let { cart } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(getProductApi());
  }, [dispatch]);
  useEffect(() => {
    let c = cart.map((p) => {
      return {
        select: false,
        id: p.id,
        images: p.images,
        unitPrice: p.unitPrice,
        quantity: p.quantity,
      };
    });
    setCartCurrent(c);
  }, [cart]);

  const _renderCart = () => {
    return cartCurrent.map((item) => {
      return (
        <CartItem
          key={item.id}
          item={item}
          cartCurrent={cartCurrent}
          setCartCurrent={setCartCurrent}
        />
      );
    });
  };

  const total = useMemo(() => {
    return cartCurrent
      .filter((item) => item.select === true)
      .reduce((total, product) => {
        return (total += product.quantity * product.unitPrice);
      }, 0)
      .toLocaleString();
  }, [cartCurrent]);
  return (
    <Stack sx={{ padding: "40px 20px", marginTop: "50px" }}>
      <Container>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={7}>
            {_renderCart()}
          </Grid>
          <Grid item xs={5}>
            <OrderForm cartCurrent={cartCurrent} total={total} />
          </Grid>
        </Grid>
      </Container>
      <ToastContainer />
    </Stack>
  );
}
