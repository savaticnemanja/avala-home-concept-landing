import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import { sliderImage1 } from "@/assets";

// Preload the LCP image so the browser discovers it before JS finishes parsing
const lcpPreload = document.createElement("link");
lcpPreload.rel = "preload";
lcpPreload.as = "image";
lcpPreload.href = sliderImage1;
lcpPreload.fetchPriority = "high";
document.head.appendChild(lcpPreload);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
