import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { LinksVisibilityProvider } from "./contexts/LinksVisibilityContext";
import { PageTitleProvider } from "./contexts/PageTitleContext";
import { initMatomo } from "./utils/matomoConfig";
import { MatomoProvider } from "react-matomo";
import PageTracker from "./components/Matomo/PageTracker";

const matomoInstance = initMatomo();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MatomoProvider value={matomoInstance}>
      <AuthProvider>
        <LinksVisibilityProvider>
          <PageTitleProvider>
            <RouterProvider router={router}>
              <PageTracker />
            </RouterProvider>
          </PageTitleProvider>
        </LinksVisibilityProvider>
      </AuthProvider>
    </MatomoProvider>
  </React.StrictMode>
);
