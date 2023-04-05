import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Evaluate from "../../components/Evaluate/Evaluate";

function Puchase() {
  const [listPuchase, setListPuchase] = useState([]);
  let { user } = useSelector((state) => state.userReducer);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
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
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const _renderPuchaseItem = (value) => {
    return value.data.map((product) => {
      return (
        <Grid
          key={product.productId}
          container
          spacing={{ xs: 1 }}
          justifyContent="space-between"
          alignItems="center">
          <Grid item xs={4} sm={4}>
            <img
              style={{
                width: "100px",
                height: "auto",
                objectFit: "cover",
                marginRight: "20px",
              }}
              src={_getSrcImg(product.productImg)}
              alt={product.productName}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography sx={{ marginRight: "20px" }}>
              x{product.productQuantity}
            </Typography>
            <Typography>{product.productPrice}đ</Typography>
          </Grid>
          <Grid item xs={4} sm={4} container justifyContent="flex-end">
            <Button
              onClick={() => {
                handleOpenModal(product);
              }}
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
          </Grid>
        </Grid>
      );
    });
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
          </>
          <hr />
        </div>
      );
    });
  };
  return (
    <>
      <Dialog
        disableScrollLock={true}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title">
        <DialogContent sx={{ width: "600px", maxWidth: "100%" }}>
          <Evaluate product={selectedProduct} onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
      <Stack sx={{ marginTop: "100px" }}>
        <Container>
          <Typography sx={{ marginBottom: "30px" }}>
            Danh sách sản phẩm đã mua
          </Typography>
          <Stack>{_renderPuchase()}</Stack>
        </Container>
      </Stack>
    </>
  );
}

export default Puchase;
