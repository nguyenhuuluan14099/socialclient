import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DataProvider from "components/redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = "https://server02.vercel.app";
root.render(
  <DataProvider>
    <BrowserRouter>
      <ToastContainer></ToastContainer>
      <App />
    </BrowserRouter>
  </DataProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
