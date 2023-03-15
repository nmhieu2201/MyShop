import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { withStyles } from "@material-ui/styles";
import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Badge,
  Button,
} from "@mui/material";
import { useState } from "react";
import DrawerComponent from "./DrawerComponent";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function Header(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const { cart } = useSelector((state) => state.cartReducer);
  const [value, setValue] = useState(0);
  const _handleChange = (e, value) => {
    setValue(value);
  };
  const { classes } = props;
  return (
    <Box sx={{ flexGrow: 1, position: "fixed", zIndex: "1000", width: "100%" }}>
      <AppBar position="static" sx={{ background: "#000000" }}>
        <Container>
          <Toolbar>
            {isMatch ? (
              <DrawerComponent cart={cart} />
            ) : (
              <Grid container>
                <Grid item xs={6}>
                  <NavLink to="/">
                    <img
                      style={{
                        height: "30px",
                        width: "auto",
                        objectFit: "cover",
                      }}
                      src="./img/logo/images.png"
                      alt="logo"
                    />
                  </NavLink>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}>
                  <NavLink
                    to="/cart"
                    sx={{ color: "#fff", textDecoration: "none" }}>
                    <Badge
                      badgeContent={cart.length}
                      color="error"
                      sx={{ cursor: "pointer" }}>
                      <ShoppingCartIcon sx={{ color: "#fff" }} />
                    </Badge>
                  </NavLink>
                  <NavLink
                    to="/login"
                    style={{
                      textDecoration: "none",
                      marginLeft: "20px",
                      color: "#fff",
                      "&:hover": {
                        color: "#fffc",
                      },
                    }}>
                    LOGIN
                  </NavLink>
                </Grid>
              </Grid>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default withStyles({
  navbar: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
  },
})(Header);
Header.propsType = {
  classes: PropTypes.object,
  _renderNav: PropTypes.func,
  cart: PropTypes.array,
  _handleChange: PropTypes.func,
};
