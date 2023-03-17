import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function HomeTemplate() {
  return (
    <>
      <Header />
      <Stack sx={{ minHeight: "800px" }}>
        <Outlet />
      </Stack>
      <Footer />
    </>
  );
}
