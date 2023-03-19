import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import "./index.css";
import { store } from "./redux/configStore";
import { Provider } from "react-redux";
import Cart from "./Page/Cart/Cart";
import Detail from "./Page/Detail/Detail";
import HomeTemplate from "./Template/HomeTemplate/HomeTemplate";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import User from "./Template/User/User";
import Puchase from "./Page/Puchase/Puchase";
const root = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="detail">
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="puchase" element={<Puchase />} />
        </Route>
        <Route path="user" element={<User />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
  root
);
