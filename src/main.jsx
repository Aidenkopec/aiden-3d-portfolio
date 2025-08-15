import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { applyDefaultTheme } from "./styles";

// Apply the default theme (Obsidian Black) immediately
applyDefaultTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
