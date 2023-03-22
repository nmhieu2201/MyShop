import { withStyles } from "@material-ui/styles";
import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function ProductItem(props) {
  let { product, getSold, classes, handleAddToCart } = props;
  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
      key={product.id}
      sx={{ textAlign: "center" }}>
      <Stack className={classes.card}>
        <Stack
          sx={{
            padding: "10px",
            borderRadius: "6px",
            boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}>
          <img
            src={product.image}
            style={{
              height: "200px",
              width: "auto",
              objectFit: "cover",
            }}
            alt={product.name}
          />
          <Typography
            sx={{ fontSize: "16px", margin: "20px 0" }}
            variant="h1"
            noWrap>
            {product.name}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}>
            <Typography
              variant="h6"
              sx={{
                color: "#ee4d2d",
                fontSize: "18px",
                margin: "5px 0",
              }}>
              {product.unitPrice.toLocaleString()}đ
            </Typography>
            <Typography>Đã bán: {getSold(product.id)}</Typography>
          </Stack>
        </Stack>
        <Stack className={classes.info}>
          <Stack
            className={classes.top}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}>
            <NavLink
              to={`/detail/${product.id}`}
              style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  fontSize: "16px",
                  background: "#000",
                  color: "#fff",
                  transition: "all 0.4s",
                  "&:hover": {
                    background: "#000003",
                    transition: "all 0.4s",
                  },
                }}>
                Xem sản phẩm
              </Button>
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => {
                handleAddToCart(product);
              }}
              style={{
                textDecoration:"none",
                background: "#c30005",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "16px",
                transition: "all 0.4s",
                marginTop: "20px",
                padding: "10px 30px",
                "&:hover": {
                  background: "#c30005",
                  transition: "all 0.4s",
                },
              }}>
              Mua ngay
            </NavLink>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
export default withStyles({
  card: {
    padding: "10x 5px",
    position: "relative",
  },
  info: {
    cursor: "pointer",
    position: "absolute",
    zIndex: "2",
    bottom: "0",
    left: "0",
    background: "#00000033",
    width: "100%",
    height: "100%",
    visibility: "visible",
    opacity: 0,
    transition: "all 0.5s",
    "&:hover": {
      zIndex: "3",
      position: "absolute",
      bottom: "0",
      left: "0",
      background: "#00000033",
      width: "100%",
      height: "100%",
      visibility: "visible",
      opacity: 1,
      transition: "all 0.5s",
    },
  },
})(memo(ProductItem));
ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  getSold: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
