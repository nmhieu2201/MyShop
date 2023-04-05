import { Button, FormGroup, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Trường này không được để trống")
      .min(3, "Tên đăng nhập phải có ít nhất 6 kí tự"),
    username: yup
      .string()
      .required("Trường này không được để trống")
      .min(3, "Tên đăng nhập phải có ít nhất 3 kí tự"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .max(24, "Mật khẩu không được vượt quá 24 kí tự"),
    passwordConfirm: yup
      .string()
      .required("Nhập lại mật khẩu phải trùng vs mật khẩu ở trên")
      .oneOf([yup.ref("password"), null], "Nhập sai mật khẩu"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const onSubmit = async (data) => {
    let index = users.findIndex((user) => user.data.username === data.username);
    if (index !== -1) {
      toast.error("Tài khoản đã được đăng kí");
    } else {
      try {
        await fetch("http://localhost:8000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: data,
          }),
        }).then(() => {
          toast.success("Bạn đã đăng kí tài khoản thành công !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
        paddingBottom: "100px",
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
          Đăng ký
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField {...register("fullName")} label="Họ và tên" />
            <Typography
              sx={{ color: "red", marginTop: "10px", paddingLeft: "10px" }}>
              {errors.fullName?.message}
            </Typography>
          </FormGroup>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField {...register("username")} label="Tên đăng nhập" />
            <Typography
              sx={{ color: "red", marginTop: "10px", paddingLeft: "10px" }}>
              {errors.username?.message}
            </Typography>
          </FormGroup>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField
              {...register("password")}
              label="Mật khẩu"
              type="password"
            />
            <Typography
              sx={{ color: "red", marginTop: "10px", paddingLeft: "10px" }}>
              {errors.password?.message}
            </Typography>
          </FormGroup>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField
              {...register("passwordConfirm")}
              label="Nhập lại mật khẩu"
              type="password"
            />
            <Typography
              sx={{ color: "red", marginTop: "10px", paddingLeft: "10px" }}>
              {errors.passwordConfirm?.message}
            </Typography>
          </FormGroup>
          <Typography marginBottom="10px" textAlign="center">
            Bạn đã có tài khoản?
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "red" }}>
              Đăng nhập
            </NavLink>
          </Typography>
          <Button
            type="submit"
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
            Đăng Ký
          </Button>
        </form>
      </Box>
      <ToastContainer/>
    </Stack>
  );
}
