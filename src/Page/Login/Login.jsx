import { Button, FormGroup, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../redux/userReducer/userReducer";
export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const _onSubmit = (value) => {
    let index = users.findIndex(
      (user) => user.data.username === value.username
    );
    if (index !== -1) {
      if (users[index].data.password === value.password) {
        dispatch(login(value));
        toast.success("Bạn đã đăng nhập thành công");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Mật khẩu không đúng");
      }
    } else {
      toast.error("Không tìm thấy tài khoản");
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  useEffect(() => {
    if (Object.entries(user).length !== 0) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}>
      <Box
        sx={{
          border: "1px solid #dcdcdc",
          borderRadius: "5px",
          width: "100%",
          padding: "40px 50px",
          maxWidth: "500px",
        }}>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "30px",
            color: "#222222",
          }}>
          Đăng nhập
        </Typography>
        <form type="submit" onSubmit={handleSubmit(_onSubmit)}>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField
              label="Tên đăng nhập"
              {...register("username", {
                required: "Tên không được bỏ trống",
                minLength: {
                  value: 5,
                  message: "Tên phải có ít nhất 6 kí tự",
                },
                maxLength: {
                  value: 50,
                  message: "Tên không được vượt quá 50 kí tự",
                },
              })}
            />
            <Typography color="error">{errors.username?.message}</Typography>
          </FormGroup>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField
              label="Mật khẩu"
              type="password"
              {...register("password", {
                required: "Tên không được bỏ trống",
                minLength: {
                  value: 6,
                  message: "Tên phải có ít nhất 6 kí tự",
                },
                maxLength: {
                  value: 24,
                  message: "Tên không được vượt quá 24 kí tự",
                },
              })}
            />
            <Typography color="error">{errors.password?.message}</Typography>
          </FormGroup>
          <Button
            type="submit"
            disabled={!isValid}
            sx={{
              padding: "6px 8px",
              background: "#fbceb5 ",
              color: "#000",
              width: "100%",
              "&:hover": {
                background: "#fbceb5 ",
                color: "#000",
              },
            }}>
            Đăng Nhập
          </Button>
          <Typography sx={{ marginTop: "20px" }}>
            Bạn chưa có tài khoản?
            <NavLink
              to="/register"
              style={{
                marginLeft: "4px",
                textDecoration: "none",
                fontSize: "16px",
                color: "red",
              }}>
              Đăng kí
            </NavLink>
          </Typography>
        </form>
      </Box>
      <ToastContainer />
    </Stack>
  );
}
