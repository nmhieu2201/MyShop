import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Evaluate from "../../components/Evaluate/Evaluate";

function Puchase() {
  const [listPuchase, setListPuchase] = useState([]);
  let { user } = useSelector((state) => state.userReducer);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    fetch("http://localhost:8000/order")
      .then((res) => res.json())
      .then((data) => setListPuchase(data));
  }, []);
  const _getPuchase = () => {
    return listPuchase.filter((item) => item.info.username === user.username);
  };
  const _getSrcImg = (images) => {
    let src = images.find((image) => image.src[0]);
    return src.src;
  };
  const _renderPuchaseItem = (value) => {
    return value.data.map((p) => (
      <div
        key={p.productId}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <img
          style={{
            width: "100px",
            height: "auto",
            objectFit: "cover",
            marginRight: "20px",
          }}
          src={_getSrcImg(p.productImg)}
          alt={p.productName}
        />
        <Typography sx={{ marginRight: "20px" }}>
          x{p.productQuantity}
        </Typography>
        <Typography>{p.productPrice}đ</Typography>
      </div>
    ));
  };
  const _renderPuchase = () => {
    return _getPuchase().map((value, index) => {
      return (
        <div key={index} style={{ marginBottom: "20px" }}>
          <Stack
            sx={{
              marginBottom: "30px",
            }}
            key={value.id}>
            {_renderPuchaseItem(value)}
          </Stack>
          <>
            <Typography>
              Tổng tiền:
              {value.data
                .reduce((total, item) => {
                  return (total += item.productPrice * item.productQuantity);
                }, 0)
                .toLocaleString()}
              đ
            </Typography>
            <Typography sx={{ margin: "10px 0" }}>
              Ngày đặt hàng: {value.date?.toString()}
            </Typography>
            <Button
              onClick={handleOpenModal}
              sx={{
                minWidth: "150px",
                minHeight: "40px",
                padding: "8px 20px",
                marginBottom: "20px",
                outline: "none",
                overflow: "hidden",
                textTransform: "uppercase",
                borderRadius: "2px",
                backgroundColor: "#ee4d2d",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#d73211",
                },
              }}>
              Rating
            </Button>
            <Dialog
              fullScreen={fullScreen}
              disableScrollLock={true}
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="responsive-dialog-title">
              <DialogContent sx={{ width: "600px", maxWidth: "100%" }}>
                <Evaluate product={value.data} onClose={handleCloseModal} />
              </DialogContent>
            </Dialog>
          </>
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

export default Puchase;
