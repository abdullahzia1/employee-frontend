import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.js";

import { HashRouter } from "react-router-dom";
import { checkJwtExpiration } from "./utility/tokenChecker.js";

const intervalId = setInterval(() => {
  checkJwtExpiration(); // Check JWT expiration every 30 minutes
}, 1800000); // 30 minutes in milliseconds

window.addEventListener("beforeunload", () => clearInterval(intervalId));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HashRouter>
  </StrictMode>
);
