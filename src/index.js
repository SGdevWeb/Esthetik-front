import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { LinksVisibilityProvider } from "./contexts/LinksVisibilityContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LinksVisibilityProvider>
        <RouterProvider router={router}></RouterProvider>
      </LinksVisibilityProvider>
    </AuthProvider>
  </React.StrictMode>
);
