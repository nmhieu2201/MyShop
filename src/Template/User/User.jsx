import React from "react";
import { Outlet } from "react-router-dom";

export default function User() {
  return (
    <div
      style={{
        minHeight:"1000px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}>
      <Outlet />
    </div>
  );
}
