import { withStyles } from "@material-ui/styles";
import ImageGallery from "react-image-gallery";

import {
  Alert,
  Button,
  Container,
  FormGroup,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductInfo } from "../../redux/actionThunk/product";
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/productReducer/productReducer";
import { addToCart } from "../../redux/cartReducer/cartReducer";
import ProductFeeback from "../../components/ProductFeeback/ProductFeeback";
function Detail(props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");
  const [editQuantity, setEditQuantity] = useState({
    id: "",
    status: false,
  });
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  let { product } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductInfo(id));
  }, [dispatch, id]);
  const _handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const _handleEditQuantity = (id) => {
    setEditQuantity({
      id,
      status: true,
    });
  };
  const _handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: product.quantity ?? quantity,
      })
    );
    setOpen(true);
  };

  const _handeDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product));
  };
  const _handeIncreaseQuantity = () => {
    dispatch(increaseQuantity(product));
  };

  const _getStaticImages = (images) => {
    let imgSrc = [];
    images?.forEach((image) => {
      imgSrc.push({
        original: `.${image.src}`,
        thumbnail: `.${image.src}`,
      });
    });
    return imgSrc;
  };
  const { classes } = props;
  return (
    <Stack className={classes.detail}>
      <Container>
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <ImageGallery
              items={_getStaticImages(product?.images)}
              showPlayButton={false}
              onMouseOver={(e) => {
                console.log(e);
              }}
              showNav={false}
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
                fontSize: "24px",
                fontWeight: "500",
                marginBottom: "14px",
                color: "#FF0000",
              }}>
              {product?.unitPrice?.toLocaleString()} đ
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
                  _handeDecreaseQuantity();
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
                  value={
                    editQuantity.status && editQuantity.id === product.id
                      ? quantity
                      : product.quantity
                  }
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  onFocus={() => {
                    setQuantity(product.quantity);
                  }}
                  onClick={() => {
                    _handleEditQuantity(product.id);
                  }}
                  onBlur={() => {
                    if (quantity === "" || quantity === 0) {
                      setQuantity(1);
                    }
                    dispatch(changeQuantity(quantity));
                  }}
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
                  _handeIncreaseQuantity();
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
              onClick={() => {
                _handleAddToCart();
              }}
              sx={{
                marginTop: "30px",
                fontSize: "14px",
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
              <Typography noWrap>Thêm vào giỏ</Typography>
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={_handleClose}>
              <Alert
                onClose={_handleClose}
                variant="filled"
                severity="success"
                sx={{ width: "100%" }}>
                {`Đã thêm ${product.name} vào giỏ hàng`}
              </Alert>
            </Snackbar>
            <NavLink to="/cart" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  marginTop: "30px",
                  fontSize: "16px",
                  marginLeft: "5px",
                  backgroundColor: "#ff0000",
                  padding: "10px 24px",
                  color: "#ffffff",
                  borderRadius: "30px",
                  "&:hover": {
                    backgroundColor: "#626262",
                    color: "#fed700",
                  },
                }}>
                Đến giỏ hàng
              </Button>
            </NavLink>
          </Grid>
        </Grid>
        <ProductFeeback product={product} />
      </Container>
    </Stack>
  );
}
export default withStyles({
  detail: {
    marginTop: "100px",
    padding: "40px 0",
  },
})(Detail);
