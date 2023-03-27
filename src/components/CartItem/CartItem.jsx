import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  decreaseQuantity,
  deleteProduct,
  editQuantity,
  increaseQuantity,
} from "../../redux/cartReducer/cartReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ModalDeleteCartItem from "../ModalDeleteCartItem/ModalDeleteCartItem";
function CartItem({ item, cartCurrent, setCartCurrent }) {
  const [quantity, setQuantity] = useState();
  const [editProduct, setEditProduct] = useState({
    id: "",
    status: false,
  });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const _handleDeleteProduct = (item) => {
    dispatch(deleteProduct(item.id));
    toast.success(` Bạn đã xóa thành công ${item.name} khỏi giỏ hàng !`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const _getSrcImg = (images) => {
    let src = images.find((image) => image.src[0]);
    return src.src;
  };

  const handleCheckedCartItem = (e) => {
    let check = e.target.checked;
    setCartCurrent(
      cartCurrent.map((p) => {
        if (p.id === item.id) {
          p.select = check;
        }
        return p;
      })
    );
  };
  return (
    <Stack
      key={item.id}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: "20px",
      }}>
      <Checkbox
        value={item.id}
        checked={item.select}
        onChange={(e) => {
          handleCheckedCartItem(e);
        }}
      />
      <img
        style={{ width: "120px", marginRight: "10px" }}
        src={_getSrcImg(item.images)}
        alt={item.name}
      />
      <Stack>
        <Box sx={{ padding: "0px 5px" }}>
          <Typography sx={{ fontSize: "16px", color: "#000" }}>
            {item.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#f05d40",
              marginBottom: "20px",
            }}>
            {item.unitPrice?.toLocaleString()}đ
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}>
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
            style={{
              width: "40px",
              textAlign: "center",
              padding: "6px 4px",
            }}
            value={
              editProduct.status && editProduct.id === item.id
                ? quantity
                : item.quantity
            }
            onFocus={() => {
              setQuantity(item.quantity);
            }}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            onClick={() => {
              setEditProduct({
                id: item.id,
                status: true,
              });
            }}
            onBlur={() => {
              dispatch(editQuantity({ id: item.id, quantity: quantity }));
            }}
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
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => {
            handleClickOpen();
          }}>
          <DeleteIcon sx={{ color: "#FF0303" }} />
        </Button>
        <ModalDeleteCartItem
          handleDeleteProduct={_handleDeleteProduct}
          item={item}
          open={open}
          setOpen={setOpen}
        />
      </Box>
    </Stack>
  );
}
export default memo(CartItem);
CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  cartCurrent: PropTypes.array.isRequired,
  setCartCurrent: PropTypes.func.isRequired,
};
