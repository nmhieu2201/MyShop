import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { withStyles } from "@material-ui/styles";
import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Badge,
  Avatar,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { settings } from "../../util/config";
function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { cart } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);
  const [value, setValue] = useState(0);
  const _handleChange = (e, value) => {
    setValue(value);
  };
  return (
    <Box sx={{ flexGrow: 1, position: "fixed", zIndex: "1000", width: "100%" }}>
      <AppBar position="static" sx={{ background: "#000000" }}>
        <Container>
          <Toolbar>
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
                {Object.entries(user).length === 0 ? (
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
                ) : (
                  <>
                    <Avatar
                      onClick={handleOpenUserMenu}
                      sx={{
                        width: "28px",
                        height: "28px",
                        marginLeft: "16px",
                        cursor: "pointer",
                      }}
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      disableScrollLock={true}
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <NavLink
                          to="puchase"
                          style={{ textDecoration: "none", color: "#000" }}>
                          Sản phẩm đã mua
                        </NavLink>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          localStorage.removeItem("cart");
                          settings.eraseCookie("user");
                          handleCloseUserMenu();
                          navigate("/");
                          window.location.reload();
                        }}>
                        <Typography textAlign="center">Đăng xuất</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Grid>
            </Grid>
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
