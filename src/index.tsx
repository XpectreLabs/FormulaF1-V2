import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Indexe from './pages/Indexe';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Indexe />
    </React.StrictMode>
  </BrowserRouter>
);

