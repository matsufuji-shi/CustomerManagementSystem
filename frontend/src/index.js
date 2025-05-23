import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // ← React18用の書き方

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);