import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Puchase() {
  const [listPuchase, setListPuchase] = useState([]);
  let { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    fetch("http://localhost:8000/order")
      .then((res) => res.json())
      .then((data) => setListPuchase(data));
  }, []);
  const _getPuchase = () => {
    return listPuchase.filter((item) => item.info.username === user.username);
  };
  const _renderPuchase = () => {
    return _getPuchase().map((value) => {
      return (
        <div style={{marginBottom:"20px"}}>
          <Stack
            sx={{
              marginBottom: "30px",
            }}
            key={value.id}>
            {value.data.map((p) => (
              <div
                key={p.productId}
                style={{ display: "flex", alignItems: "center" , justifyContent:"space-between"}}>
                <img
                  style={{
                    width: "100px",
                    height: "auto",
                    objectFit: "cover",
                    marginRight: "20px",
                  }}
                  src={p.productImg}
                  alt={p.productName}
                />
                <Typography sx={{ marginRight: "20px" }}>
                  x{p.productQuantity}
                </Typography>
                <Typography>{p.productPrice}đ</Typography>
              </div>
            ))}
          </Stack>
          <Typography>
            Tổng tiền:  
            {value.data.reduce((total, item) => {
              return (total += item.productPrice * item.productQuantity);
            }, 0)}
            đ
          </Typography>
          <hr />
        </div>
      );
    });
  };
  return (
    <Stack sx={{ marginTop: "100px" }}>
      <Container>
        <Typography sx={{ marginBottom: "30px" }}>
          Danh sách sản phẩm đã mua
        </Typography>
        <Stack>{_renderPuchase()}</Stack>
      </Container>
    </Stack>
  );
}
