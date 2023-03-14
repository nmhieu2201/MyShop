import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { getProductApi } from "../../redux/actionThunk/product";
import PropTypes from "prop-types";
import {
  Container,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { sortProduct } from "../../redux/productReducer/productReducer";

function Product(props) {
  const dispatch = useDispatch();
  const [option, setOption] = useState(0);
  const { listProduct } = useSelector((state) => state.productReducer);
  const _getOption = (value, label) => {
    return {
      value,
      label,
    };
  };
  const options = [
    _getOption(0, "Tùy chọn"),
    _getOption(1, "Sắp xếp theo giá từ thấp đến cao"),
    _getOption(2, "Sắp xếp theo giá từ cao đến thấp"),
    _getOption(3, "Sắp xếp theo tên A - Z"),
    _getOption(4, "Sắp xếp theo tên Z - A"),
  ];
  const _renderProduct = () => {
    return listProduct.map((product) => {
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
                style={{ height: "200px", width: "auto", objectFit: "cover" }}
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
                  sx={{ color: "#ee4d2d", fontSize: "14px", margin: "5px 0" }}>
                  {product.unitPrice.toLocaleString()}đ
                </Typography>
              </Stack>
            </Stack>
            <Stack className={classes.info}>
              <Stack
                className={classes.top}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                }}>
                <NavLink to={`/detail/${product.id}`}>
                  <IconButton
                    sx={{
                      transition: "all 0.4s",
                      "&:hover": { background: "#fff", transition: "all 0.4s" },
                    }}>
                    <ShoppingCartCheckoutIcon
                      sx={{
                        color: "#ee4d2d",
                      }}
                    />
                  </IconButton>
                </NavLink>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      );
    });
  };
  const _renderOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem
          sx={{ width: "300px", fontSize: "12px" }}
          key={option.value}
          value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  const _handleChangeOptions = (e) => {
    setOption(e.target.value);
    dispatch(sortProduct(e.target.value));
  };
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
              fontSize: "24px",
              padding: "20px 0",
              fontWeight: "400",
              color: "#000",
            }}>
            Danh sách sản phẩm
          </Typography>
          <FormGroup>
            <Select
              sx={{ fontSize: "14px", fontWeight: "300", color: "#000" }}
              value={option}
              onChange={_handleChangeOptions}>
              {_renderOptions()}
            </Select>
          </FormGroup>
        </Stack>
        <Grid
          container
          flexGrow={1}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {_renderProduct()}
        </Grid>
      </Container>
    </Stack>
  );
}
export default withStyles({
  product: {
    marginTop: "50px",
  },
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
})(Product);
Product.propTypes = {
  listProduct: PropTypes.array,
  classes: PropTypes.object,
  _renderOptions: PropTypes.func,
  _renderProduct: PropTypes.func,
  options: PropTypes.array,
  _getOption: PropTypes.func,
  _handleChangeOptions: PropTypes.func,
};
