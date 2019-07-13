import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ManageScroll from "./components/others/ManageScroll/ManageScroll";
import "./styles/index.scss";

const isDev = process.env.NODE_ENV === "development";

const root = document.getElementById("root");
ReactDOM.render(
  <>
    <ManageScroll />
    <App />
  </>,
  root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (isDev) {
  serviceWorker.unregister();
  if (module.hot) {
    module.hot.accept();
  }
} else {
  serviceWorker.register();
}
