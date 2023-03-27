import { withStyles } from "@material-ui/styles";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { postFeedBack } from "../../redux/productReducer/productReducer";

function ProductFeeback(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = (values) => {
    dispatch(postFeedBack(values));
  };
  return (
    <Stack>
      <Typography sx={{ marginBottom: "20px" }}>Nhận xét</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("feedbackContent", {
            required: "Nội dung không được bỏ trống",
          })}
          aria-label="minimum height"
          style={{ width: "100%", outline: "none", padding: "10px" }}
        />
        <Box sx={{ textAlign: "right" }}>
          <Button
            type="submit"
            contained
            sx={{
              marginTop: "20px",
              background: "#f05123",
              color: "#fff",
              textTransform: "uppercase",
              padding: "8px 20px",
              fontSize: "14px",
              borderRadius: "20px",
              "&:hover": {
                background: "#f05129",
                color: "#fff",
              },
            }}
            disabled={!isValid}>
            Bình luận
          </Button>
        </Box>
      </form>
    </Stack>
  );
}
export default withStyles({})(memo(ProductFeeback));
