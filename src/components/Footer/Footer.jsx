import { withStyles } from "@material-ui/styles";
import {
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Footer(props) {
  const _getOptions = (title, phone, description) => {
    return {
      title,
      phone,
      description,
    };
  };
  const listFeedback = [
    _getOptions(
      "GỌI MUA HÀNG ONLINE (08:00 - 21: 00 mỗi ngày)",
      "1900.633.349",
      "Tất cả các ngày trong tuần (Trừ tết Âm Lịch)"
    ),
    _getOptions(
      "GÓP Ý & KHIẾU NẠI (08:30 - 20:30)",
      "1900.633.349",
      "Tất cả các ngày trong tuần (Trừ tết Âm Lịch)"
    ),
  ];
  const info = [
    "Giới thiệu về MWC",
    "Than phiền và góp ý",
    "Chính sách và quy định",
  ];
  const faq = [
    "Vận chuyển",
    "Chính sách đổi trả",
    "Chính sách đổi trả bảo hành",
  ];
  const _renderNavF = (list) => {
    return list.map((i, index) => {
      return (
        <ListItem
          key={index}
          sx={{
            fontSize: "13px",
            fontWeight: "300",
            color: "#000000D9",
            marginTop: "8px",
            paddingLeft: "0",
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover": {
              color: "#0a58ca",
              transition: "all 0.3s",
            },
          }}>
          <ArrowForwardIosIcon sx={{ fontSize: "10px" }} />
          {i}
        </ListItem>
      );
    });
  };
  const _renderFeedback = () => {
    return listFeedback.map((item, index) => {
      return (
        <Stack key={index}>
          <Typography
            noWrap
            sx={{
              fontSize: "13px",
              fontWeight: "300",
              color: "#000000D9",
              marginBottom: "8px",
            }}>
            {item.title}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: "24px",
              fontWeight: "300",
              color: "#252A2B",
              transition: "all 0.3s",
              cursor: "pointer",
              "&:hover": {
                color: "#0a58ca",
                transition: "all 0.3s",
              },
            }}>
            {item.phone}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: "13px",
              fontWeight: "300",
              color: "#000000D9",
              marginTop: "8px",
              marginBottom: "30px",
            }}>
            {item.description}
          </Typography>
        </Stack>
      );
    });
  };
  const { classes } = props;
  return (
    <Container className={classes.footer}>
      <Grid
        container
        sx={{ borderTop: "1px solid #dcdcdc", paddingTop: "20px" }}
        spacing={{ xs: 2, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4}>
          {_renderFeedback()}
        </Grid>
        <Grid item xs={4}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "300",
              color: "#000000D9",
            }}>
            Thông tin
          </Typography>
          <List>{_renderNavF(info)}</List>
        </Grid>
        <Grid item xs={4}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "300",
              color: "#000000D9",
            }}>
            FAQ
          </Typography>
          <List>{_renderNavF(faq)}</List>
        </Grid>
      </Grid>
    </Container>
  );
}
export default withStyles({
  footer: {
    // padding: "20px 0",
  },
})(Footer);
Footer.propTypes = {
  listFeedback:PropTypes.array,
  classes:PropTypes.object,
  _renderFeedback:PropTypes.func,
  _renderNavF:PropTypes.func,
  _getOptions:PropTypes.func,
}