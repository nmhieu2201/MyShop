import { Button, Grid } from "@mui/material";
import { withStyles } from "@material-ui/styles";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartReducer/cartReducer";
import "react-toastify/dist/ReactToastify.css";
import ProductItem from "../ProductItem/ProductItem";
function Sneakers({ classes, sneakers, getSold, getRating }) {
  const [limitSneakers, setLimitSneakers] = useState(6);
  const _handleLoadMoreSneaker = () => {
    setLimitSneakers((prev) => prev + 6);
  };
  const _handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(` Bạn đã thêm ${product.name} khỏi giỏ hàng !`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const dispatch = useDispatch();

  return (
    <>
      <Grid
        container
        flexGrow={1}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {sneakers.slice(0, limitSneakers).map((product) => {
          return (
            <ProductItem
              key={product.id}
              getSold={getSold}
              getRating={getRating}
              classes={classes}
              product={product}
              handleAddToCart={_handleAddToCart}
            />
          );
        })}
      </Grid>
      {limitSneakers < sneakers.length && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              _handleLoadMoreSneaker();
            }}
            sx={{
              margin: "20px 0",
              background: "#dcdcdc",
              color: "#000",
              padding: "5px 100px",
              "&:hover": {
                background: "#dcdcdc90",
              },
            }}>
            Xem Thêm...
          </Button>
        </Box>
      )}
    </>
  );
}
export default withStyles({})(memo(Sneakers));
Sneakers.propTypes = {
  classes: PropTypes.object.isRequired,
  sneakers: PropTypes.array.isRequired,
  getSold: PropTypes.func.isRequired,
  getRating:PropTypes.func.isRequired,
};
