import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tippy from "@tippyjs/react/headless";
import Box from "@mui/material/Box";
import { withStyles } from "@material-ui/styles";
import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Container, Grid, Badge, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { settings } from "../../util/config";
import { useSpring } from "framer-motion";
import Popup from "../Popup/Popup";
function Header() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState({});
  const handleLogout = () => {
    localStorage.removeItem("cart");
    settings.eraseCookie("user");
    navigate("/");
    window.location.reload();
  };
  const { cart } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  useEffect(() => {
    let { username } = user;
    let index = users?.findIndex((user) => user.data.username === username);
    setInfo(users[index]?.data);
  }, [users,user]);
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);
  const onMount = () => {
    scale.set(1);
    opacity.set(1);
  };
  const onHide = ({ unmount }) => {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });
    scale.set(initialScale);
    opacity.set(0);
  };
  const style = {
    scale,
    opacity,
  };
  return (
    <Box sx={{ flexGrow: 1, position: "fixed", zIndex: "1000", width: "100%" }}>
      <AppBar position="static" sx={{ background: "#000000" }}>
        <Container>
          <Toolbar>
            <Grid container>
              <Grid item xs={6}>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Typography sx={{ fontSize: "30px", color: "#fff" }}>
                    Hiếu Shop
                  </Typography>
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
                  <Tippy
                    placement="bottom-end"
                    interactive
                    delay={[0, 300]}
                    animation={true}
                    onMount={onMount}
                    onHide={onHide}
                    render={(attrs) => (
                      <Popup
                        style={style}
                        user={info}
                        attrs={attrs}
                        handleLogout={handleLogout}
                      />
                    )}>
                    <Avatar
                      sx={{
                        width: "28px",
                        height: "28px",
                        marginLeft: "16px",
                        cursor: "pointer",
                      }}
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </Tippy>
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