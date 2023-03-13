import {
  Badge,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
import { NavLink } from "react-router-dom";
export default function DrawerComponent(props) {
  const [open, setOpen] = useState(false);
  const _renderMenu = () => {
    return props.navs.map((nav) => {
      return (
        <Stack key={nav.id}>
          <ListItem button>
            <Link href={nav.path} underline="none">
              {nav.label}
            </Link>
          </ListItem>
          <Divider />
        </Stack>
      );
    });
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "auto",
      }}>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}>
        <List sx={{ marginTop: "40px" }}>{_renderMenu()}</List>
      </Drawer>
      <IconButton sx={{ color: "#fff", marginLeft: "auto" }}>
        <NavLink to="/cart" sx={{ textDecoration: "none" }}>
          <Badge badgeContent={props.cart.length} color="error">
            <ShoppingCartIcon sx={{ color: "#fff" }} />
          </Badge>
        </NavLink>
      </IconButton>
      <IconButton
        sx={{ color: "#fff", marginLeft: "auto" }}
        onClick={() => {
          setOpen(!open);
        }}>
        <MenuIcon />
      </IconButton>
    </Stack>
  );
}
DrawerComponent.propsTypes = {
  navs: PropTypes.array,
  _renderMenu: PropTypes.func,
  cart: PropTypes.array,
};
