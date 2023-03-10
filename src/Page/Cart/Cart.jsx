import React, { useMemo, useState } from "react";
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
import { useFormik } from "formik";
import * as yup from "yup";
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
  increaseQuantity,
} from "../../redux/cartReducer/cartReducer";
export default function Cart() {
  const dispatch = useDispatch();
  let { cart } = useSelector((state) => state.cartReducer);
  const fields = [
    {
      id: "name",
      label: "Họ tên",
      placeholder: "Nhập họ tên",
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      placeholder: "Nhập email",
      type: "email",
    },
    {
      id: "phone",
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại",
      type: "text",
    },
    {
      id: "address",
      label: "Địa chỉ nhận hàng",
      placeholder: "Nhập địa chỉ của bạn",
      type: "text",
    },
  ];
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
          }}>
          <img
            style={{ width: "120px", marginRight: "20px" }}
            src={item.image}
            alt={item.name}
          />
          <Box>
            <Typography
              sx={{ fontSize: "16px", color: "#000", margin: "20px 0" }}>
              {item.name}
            </Typography>
            <Typography
              sx={{ fontSize: "14px", color: "#f05d40", marginBottom: "20px" }}>
              {item.unitPrice.toLocaleString()}đ
            </Typography>
          </Box>
          <Box>
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
              style={{ width: "40px", textAlign: "center", padding: "6px 4px" }}
              value={item.quantity}
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
  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Please Enter your name"),
      email: yup.string().email("Email is required"),
      phone: yup.string().required("Please Enter is phone number"),
      address: yup.string().required("Please Enter your Address"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const _renderForm = () => {
    return fields.map((field) => {
      return (
        <FormGroup key={field.id} sx={{ marginBottom: "20px" }}>
          <TextField
            label={field.label}
            placeholder={field.placeholder}
            id={field.id}
            type={field.type}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            helperText={form.errors[field.id]}
          />
        </FormGroup>
      );
    });
  };
  const total = useMemo(() => {
    return cart.reduce((total, product) => {
      return (total += product.quantity * product.unitPrice);
    }, 0);
  }, [cart]).toLocaleString();
  return (
    <Stack sx={{ padding: "40px 0" }}>
      <Container>
        <Grid container>
          <Grid item xs={7}>
            {_renderCart()}
          </Grid>
          <Grid item xs={5}>
            <form type="sumbit" onSubmit={form.handleSubmit}>
              <Typography
                variant="h4"
                sx={{ color: "#000", marginBottom: "20px" }}>
                Tổng đơn hàng: {total}đ
              </Typography>
              {_renderForm()}
              <Button
                sx={{
                  background: "#ee4d2d",
                  padding: "10px 40px",
                  color: " #fff",
                  "&:hover": {
                    background: "#f05d40",
                  },
                }}
                type="submit">
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
