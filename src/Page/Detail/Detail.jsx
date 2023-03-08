import { withStyles } from "@material-ui/styles";
import {
  Button,
  Container,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductInfo } from "../../redux/actionThunk/product";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/productReducer/productReducer";
function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  let { product } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductInfo(id));
  }, [id, dispatch]);
  const { classes } = props;
  return (
    <Stack className={classes.detail}>
      <Container>
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <img
              style={{ width: "60%" }}
              src={`.${product.image}`}
              alt={product.name}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "27px",
                fontWeight: "700",
                color: "#1c1c1c",
                marginBottom: "14px",
              }}>
              {product.name}
            </Typography>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                color: "#111",
                fontSize: "24px",
                fontWeight: "500",
                marginBottom: "14px",
              }}>
              {product.unitPrice} đ
            </Typography>
            <Typography
              sx={{
                marginBottom: "30px",
                fontSize: "14px",
                fontWeight: "400",
                color: "#767676",
              }}>
              Đã bán:{" "}
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}>
              <Button
                onClick={() => {
                  dispatch(decreaseQuantity(product));
                }}
                className={classes.btn}
                sx={{
                  border: "1px solid #dcdcdc",
                  minWidth: "0",
                  padding: "14px 10px",
                }}>
                <RemoveIcon sx={{ color: "#000", fontSize: "16px" }} />
              </Button>
              <FormGroup>
                <input
                  type="text"
                  value={product.quantity}
                  style={{
                    padding: "14px 10px",
                    margin: "0 2px",
                    border: "1px solid #dcdcdc",
                    width: "50px",
                    textAlign: "center",
                  }}
                />
              </FormGroup>
              <Button
                className={classes.btn}
                onClick={() => {
                  dispatch(increaseQuantity(product));
                }}
                sx={{
                  border: "1px solid #dcdcdc",
                  minWidth: "0",
                  padding: "14px 10px",
                }}>
                <AddIcon sx={{ color: "#000", fontSize: "16px" }} />
              </Button>
            </Stack>
            <Button
              sx={{
                marginTop: "30px",
                fontSize: "16px",
                backgroundColor: "#fed700",
                padding: "10px 24px",
                color: "#000000",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "#626262",
                  color: "#fed700",
                },
              }}>
              <AddShoppingCartIcon />
              Thêm vào giỏ
            </Button>
            <Button
              sx={{
                marginTop: "30px",
                fontSize: "16px",
                backgroundColor: "#ff0000",
                padding: "10px 24px",
                color: "#ffffff",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "#626262",
                  color: "#fed700",
                },
              }}>
              Mua ngay
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}
export default withStyles({
  detail: {
    padding: "40px 0",
  },
})(Detail);
