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
const root = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </Provider>,
  root
);
