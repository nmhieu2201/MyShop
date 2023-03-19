import { Button, FormGroup, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
export default function Register() {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"100px"
      }}>
      <Box
        sx={{
          border: "1px solid #000",
          padding: "50px 40px",
          borderRadius: "10px",
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
        <form>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField label="Tên đăng nhập" />
          </FormGroup>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField label="Mật khẩu" />
          </FormGroup>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField label="Nhập lại mật khẩu" />
          </FormGroup>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField label="Số điện thoại" />
          </FormGroup>
          <FormGroup sx={{ marginBottom: "20px" }}>
            <TextField label="Địa chỉ" />
          </FormGroup>
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
    </Stack>
  );
}
