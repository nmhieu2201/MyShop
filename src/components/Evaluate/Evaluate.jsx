import {
  Box,
  Button,
  Grid,
  Rating,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Evaluate({ product, onClose }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(-1);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };
  const { user } = useSelector((s) => s.userReducer);
  const _getSrcImg = () => {
    let src = product.productImg.find((image) => image.src[0]);
    return src.src;
  };
  const handleRating = (e) => {
    setRating(Math.floor(e.target.value));
  };
  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };
  const _onSubmit = async (values) => {
    let info = user.username;
    let id = product.productId;
    const data = { ...values, rating, id, info };
    try {
      await fetch("http://localhost:8000/productFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: data,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          onClose();
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography
        sx={{ fontSize: "24px", color: "#ee4d2d" }}
        textAlign="center">
        Đánh giá sản phẩm
      </Typography>
      <form type="submit" onSubmit={handleSubmit(_onSubmit)}>
        <img
          src={_getSrcImg()}
          alt="product"
          style={{ maxWidth: "200px", width: "100%" }}
        />
        <Typography>Rating</Typography>
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}>
          <Grid item xs={7} sm={5}>
            <Rating
              name="simple-controlled"
              getLabelText={getLabelText}
              precision={1}
              value={rating}
              onChangeActive={(event, newHover) => {
                setHoverRating(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              onChange={(event) => {
                handleRating(event);
              }}
            />
          </Grid>
          <Grid item xs={5} sm={7}>
            {hoverRating !== null && (
              <Box sx={{ ml: 2 }}>
                {labels[hoverRating !== -1 ? hoverRating : rating]}
              </Box>
            )}
          </Grid>
        </Grid>
        <TextareaAutosize
          {...register("feedback", {
            required: "Trường này không được bỏ trống",
          })}
          minRows={5}
          style={{
            marginBottom: "10px",
            width: "100%",
            border: "1px solid #ee4d2d",
            outline: "none",
            padding: "10px",
            fontSize: "18px",
          }}
        />
        <Box textAlign="right">
          <Button
            autoFocus
            onClick={onClose}
            sx={{
              minWidth: "100px",
              minHeight: "40px",
              padding: "8px 20px",
              outline: "none",
              overflow: "hidden",
              textTransform: "uppercase",
              borderRadius: "2px",
              backgroundColor: "none",
              color: "#555",
              "&:hover": {
                backgroundColor: "#f8f8f8",
              },
            }}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            sx={{
              minWidth: "100px",
              minHeight: "40px",
              padding: "8px 20px",
              marginLeft: "10px",
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
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
export default memo(Evaluate);
Evaluate.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
