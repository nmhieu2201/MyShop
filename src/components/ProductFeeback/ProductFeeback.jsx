import { withStyles } from "@material-ui/styles";
import { Avatar, Divider, Grid, List, Rating, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

function ProductFeeback({ feedbackContent }) {
  const _renderFeedback = () => {
    return feedbackContent.map((feedback, index) => {
      return (
        <div key={index} style={{marginTop:"10px"}}>
          <Grid container alignItems="flex-start" width="60%" >
            <Grid item xs={3} sm={1}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"   />
            </Grid>
            <Grid item xs={4} sm={1}>
              <Typography color="error">{feedback.info ?? "User"}</Typography>
              <Rating name="read-only" value={feedback.rating} readOnly />
              <Typography  marginY={2}>{feedback.feedback}</Typography>
            </Grid>
            <Grid item xs={5} sm={10}/>
          </Grid>
          <Divider variant="inset" component="li" />
        </div>
      );
    });
  };
  return (
    <Stack>
      <Typography sx={{ marginBottom: "20px" }}>Đánh giá sản phẩm</Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}>
        {_renderFeedback()}
      </List>
    </Stack>
  );
}
export default withStyles({})(memo(ProductFeeback));
