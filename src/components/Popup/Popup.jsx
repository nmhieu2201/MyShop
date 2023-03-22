import { withStyles } from "@material-ui/styles";
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { memo } from "react";
import { motion } from "framer-motion";
function Popup(props) {
  let { handleLogout, attrs, classes, style } = props;
  return (
    <motion.div tabIndex="-1" className={classes.box} {...attrs} style={style}>
      <ul>
        <li>Nguyễn Minh Hiếu</li>
        <li>
          <NavLink
            to="/puchase"
            style={{ textDecoration: "none", color: "#000" }}>
            Sản phẩm đã mua
          </NavLink>
        </li>
        <li
          onClick={() => {
            handleLogout();
          }}>
          Đăng xuất
        </li>
      </ul>
    </motion.div>
  );
}
export default withStyles({
  box: {
    width: "180px",
    padding: "5px 0",
    height: "auto",
    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
    background: "#fff",
    borderRadius: " 0 0 6px 6px",
    "& ul": {
      listStyleType: "none",
      "& li": {
        cursor: "pointer",
        color: "#000",
        padding: "10px",
        "&:hover": { background: "#dcdcdc" },
      },
    },
  },
})(memo(Popup));
Popup.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  attrs: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  style:PropTypes.object.isRequired,
};
