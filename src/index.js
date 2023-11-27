import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { LinksVisibilityProvider } from "./contexts/LinksVisibilityContext";
import { PageTitleProvider } from "./contexts/PageTitleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LinksVisibilityProvider>
        <PageTitleProvider>
          <RouterProvider router={router}></RouterProvider>
        </PageTitleProvider>
      </LinksVisibilityProvider>
    </AuthProvider>
  </React.StrictMode>
);
