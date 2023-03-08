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
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
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
        <Badge badgeContent={4} color="error">
          <ShoppingCartIcon />
        </Badge>
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
