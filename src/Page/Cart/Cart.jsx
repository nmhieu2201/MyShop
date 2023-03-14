import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  Container,
  Typography,
  Button,
  Box,
  Grid,
  FormGroup,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductApi } from "../../redux/actionThunk/product";
import {
  decreaseQuantity,
  deleteProduct,
  editQuantity,
  increaseQuantity,
  resetCart,
} from "../../redux/cartReducer/cartReducer";
import { order } from "../../redux/orderReducer/orderReducer";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch();
  let { cart } = useSelector((state) => state.cartReducer);
  const [quantity, setQuantity] = useState();
  const [editProduct, setEditProduct] = useState({
    id: "",
    status: false,
  });
  const [formV, setFromV] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductApi());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const _renderCart = () => {
    return cart.map((item) => {
      return (
        <Stack
          key={item.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "20px",
          }}>
          <img
            style={{ width: "120px", marginRight: "10px" }}
            src={item.image}
            alt={item.name}
          />
          <Stack>
            <Box sx={{ padding: "0px 5px" }}>
              <Typography sx={{ fontSize: "16px", color: "#000" }}>
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#f05d40",
                  marginBottom: "20px",
                }}>
                {item.unitPrice.toLocaleString()}đ
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}>
              <Button
                onClick={() => {
                  dispatch(decreaseQuantity(item));
                }}
                sx={{
                  border: "1px solid #dcdcdc",
                  minWidth: "0",
                }}>
                <RemoveIcon sx={{ color: "#000", fontSize: "12px" }} />
              </Button>
              <input
                type="text"
                style={{
                  width: "40px",
                  textAlign: "center",
                  padding: "6px 4px",
                }}
                value={
                  editProduct.status && editProduct.id === item.id
                    ? quantity
                    : item.quantity
                }
                onFocus={() => {
                  setQuantity(item.quantity);
                }}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                onClick={() => {
                  setEditProduct({
                    id: item.id,
                    status: true,
                  });
                }}
                onBlur={() => {
                  dispatch(editQuantity({ id: item.id, quantity: quantity }));
                }}
              />
              <Button
                onClick={() => {
                  dispatch(increaseQuantity(item));
                }}
                sx={{
                  border: "1px solid #dcdcdc",
                  minWidth: "0",
                }}>
                <AddIcon sx={{ color: "#000", fontSize: "12px" }} />
              </Button>
            </Box>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                handleClickOpen();
              }}>
              <DeleteIcon sx={{ color: "#FF0303" }} />
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                Bạn có muốn xóa sản phẩm ra khỏi giỏ hàng?
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Không</Button>
                <Button
                  sx={{
                    backgroundColor: "#ff0000",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#ff0000",
                    },
                  }}
                  onClick={() => {
                    dispatch(deleteProduct(item.id));
                    toast.success(
                      ` Bạn đã xóa thành công ${item.name} khỏi giỏ hàng !`,
                      {
                        position: toast.POSITION.TOP_RIGHT,
                      }
                    );
                    handleClose();
                  }}
                  autoFocus>
                  Có
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      );
    });
  };
  const _onSubmit = async (values) => {
    let data = cart.map((item) => {
      return {
        productId: item.id,
        productPrice: item.unitPrice,
      };
    });
    setFromV(values);
    try {
      await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          info: values,
          data: data,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(order(data));
          toast.success("Bạn đã đặt hàng thành công !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setFromV({});
          dispatch(resetCart());
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const total = useMemo(() => {
    return cart.reduce((total, product) => {
      return (total += product.quantity * product.unitPrice);
    }, 0);
  }, [cart]).toLocaleString();
  return (
    <Stack sx={{ padding: "40px 20px", marginTop: "50px" }}>
      <Container>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={7}>
            {_renderCart()}
          </Grid>
          <Grid item xs={5}>
            <form type="sumbit" onSubmit={handleSubmit(_onSubmit)}>
              <Typography
                variant="h4"
                sx={{ color: "#000", marginBottom: "20px" }}>
                Tổng đơn hàng: {total}đ
              </Typography>
              <FormGroup>
                <TextField
                  label="Họ tên"
                  {...register("name", {
                    required: "Tên không được bỏ trống",
                    minLength: {
                      value: 6,
                      message: "Tên phải có ít nhất 6 kí tự",
                    },
                    maxLength: {
                      value: 50,
                      message: "Tên không được vượt quá 50 kí tự",
                    },
                  })}
                  placeholder="Nhập tên của bạn"
                  type="text"
                  sx={{ marginBottom: "20px" }}
                />
                {errors.name && (
                  <Typography
                    sx={{
                      color: "Red",
                      fontSize: "14px",
                      marginBottom: "14px",
                    }}>
                    {errors.name.message}
                  </Typography>
                )}
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Email"
                  {...register("email", {
                    required: "Bạn phải nhập email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email chưa đúng định dạng",
                    },
                  })}
                  placeholder="Nhập email của bạn"
                  type="email"
                  sx={{ marginBottom: "20px" }}
                />
                {errors.email && (
                  <Typography
                    sx={{
                      color: "Red",
                      fontSize: "14px",
                      marginBottom: "14px",
                    }}>
                    {errors.email.message}
                  </Typography>
                )}
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Số điện thoại"
                  {...register("phone", {
                    required: "Bạn phải nhập số điện thoại",
                    pattern: {
                      value:
                        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                      message: "Số điện thoại chưa hợp lệ",
                    },
                  })}
                  placeholder="Nhập số điện thoại của bạn"
                  type="text"
                  sx={{ marginBottom: "20px" }}
                />
                {errors.phone && (
                  <Typography
                    sx={{
                      color: "Red",
                      fontSize: "14px",
                      marginBottom: "14px",
                    }}>
                    {errors.phone.message}
                  </Typography>
                )}
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Địa chỉ nhận hàng"
                  {...register("address", {
                    required: "Bạn chưa nhập địa chỉ nhận hàng",
                  })}
                  placeholder="Nhập địa chỉ của bạn"
                  type="text"
                  sx={{ marginBottom: "20px" }}
                />
                {errors.address && (
                  <Typography
                    sx={{
                      color: "Red",
                      fontSize: "14px",
                      marginBottom: "14px",
                    }}>
                    {errors.address.message}
                  </Typography>
                )}
              </FormGroup>
              <Button
                sx={{
                  background: "#ee4d2d",
                  padding: "10px 40px",
                  color: " #fff",
                  "&:hover": {
                    background: "#f05d40",
                  },
                }}
                type="submit"
                disabled={!isValid}>
                Thanh toán
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
      <ToastContainer />
    </Stack>
  );
}
Cart.propTypes = {
  cart: PropTypes.array,
  _renderCart: PropTypes.func,
  _onSubmit: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  deleteProduct: PropTypes.func,
  increaseQuantity: PropTypes.func,
  total: PropTypes.number,
  resetCart: PropTypes.func,
  getProductApi: PropTypes.func,
};
