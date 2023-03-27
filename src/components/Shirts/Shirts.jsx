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
function Shirts({ classes, shirts, getSold }) {
  const [limitShirts, setLimitShirts] = useState(6);
  const dispatch = useDispatch();
  const _handleLoadMoreShirts = () => {
    setLimitShirts((prev) => prev + 6);
  };

  const _handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(` Bạn đã thêm ${product.name} khỏi giỏ hàng !`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <>
      <Grid
        container
        flexGrow={1}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {shirts.slice(0, limitShirts).map((product) => {
          return (
            <ProductItem
              key={product.id}
              getSold={getSold}
              classes={classes}
              product={product}
              handleAddToCart={_handleAddToCart}
            />
          );
        })}
      </Grid>
      {limitShirts < shirts.length && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              _handleLoadMoreShirts();
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
export default withStyles({})(memo(Shirts));
Shirts.propTypes = {
  classes: PropTypes.object.isRequired,
  shirts: PropTypes.array.isRequired,
  getSold: PropTypes.func.isRequired,
};
