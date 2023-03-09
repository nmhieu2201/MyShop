import React from "react";
import { Stack, Container, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductApi } from "../../redux/actionThunk/product";
export default function Cart() {
  const fields = ["STT", "Sản phẩm", "Giá", "Số lượng", "Thao tác"];
  const dispatch = useDispatch();
  let { cart } = useSelector((state) => state.cartReducer);
  useEffect(() => {
    dispatch(getProductApi());
  }, [dispatch]);
  const _renderFields = () => {
    return fields.map((field, index) => (
      <TableCell sx={{ textAlign: "center" }} key={index}>
        {field}
      </TableCell>
    ));
  };
  const _renderCart = () => {
    return cart.map((item, index) => {
      return (
        <TableRow key={item.id}>
          <TableCell sx={{ textAlign: "center" }}>
            <Typography>{index + 1}</Typography>
          </TableCell>
          <TableCell
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
            }}>
            <Typography sx={{ margin: "0 20px" }}>{item.name}</Typography>
            <img
              style={{ height: "100px", width: "auto" }}
              src={item.image}
              alt={item.name}
            />
          </TableCell>
          <TableCell sx={{ color: "#ff4d4d", textAlign: "center" }}>
            {item.unitPrice.toLocaleString()}đ
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            <EditIcon
              sx={{ color: "#4d79ff", marginRight: "10px", cursor: "pointer" }}
            />
            <DeleteIcon sx={{ color: "#ff4d4d", cursor: "pointer" }} />
          </TableCell>
        </TableRow>
      );
    });
  };
  return (
    <Stack>
      <Container>
        <TableContainer>
          <Table sx={{ minWidth: "600px" }}>
            <TableHead>
              <TableRow>{_renderFields()}</TableRow>
            </TableHead>
            <TableBody>{_renderCart()}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Stack>
  );
}
