import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { order } from "../../redux/orderReducer/orderReducer";
import { resetCart } from "../../redux/cartReducer/cartReducer";
import { toast } from "react-toastify";

function OrderForm({ cartCurrent, total }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userReducer);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const _onSubmit = async (values) => {
    let username = user.username;
    let info = { ...values, username };
    let data = cartCurrent
      .filter((item) => item.select === true)
      .map((item) => {
        return {
          productId: item.id,
          productQuantity: item.quantity,
          productImg: item.images,
          productPrice: item.unitPrice,
        };
      });
    if (data.length > 0) {
      try {
        await fetch("http://localhost:8000/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            info: info,
            data: data,
            date: new Date().toJSON().slice(0, 10),
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
            dispatch(resetCart());
            setTimeout(() => {
              navigate("/");
            }, 2000);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("Bạn phải chọn ít nhất 1 sản phẩm");
    }
  };
  return (
    <form type="sumbit" onSubmit={handleSubmit(_onSubmit)}>
      <Typography variant="h4" sx={{ color: "#000", marginBottom: "20px" }}>
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
  );
}
export default memo(OrderForm);
OrderForm.propTypes = {
  cartCurrent: PropTypes.array.isRequired,
  total: PropTypes.string.isRequired,
};
