import React, { memo } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
function ModalDeleteCartItem({ handleDeleteProduct, item, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Bạn có muốn xóa sản phẩm ra khỏi giỏ hàng?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Không</Button>
        <Button
          sx={{
            backgroundColor: "#ff0000",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#ff0000",
            },
          }}
          onClick={() => {
            handleDeleteProduct(item);
          }}
          autoFocus>
          Có
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default memo(ModalDeleteCartItem);
ModalDeleteCartItem.propTypes = {
  handleDeleteProduct: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
