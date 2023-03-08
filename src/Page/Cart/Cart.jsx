import React from "react";
import { Stack, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const fields = ["Sản phẩm", "Giá", "Số lượng", "Tổng", "Thao tác"];
  const dispatch = useDispatch();
  let { cart } = useSelector((state) => state.cartReducer);
  const _renderFields = () => {
    return fields.map((field, index) => (
      <TableCell key={index}>{field}</TableCell>
    ));
  };
  return (
    <Stack>
      <Container>
        <TableContainer>
          <Table sx={{ minWidth: "600px" }}>
            <TableHead>
              <TableRow>{_renderFields()}</TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Stack>
  );
}
