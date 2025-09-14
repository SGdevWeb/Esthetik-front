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
import { ErrorProvider } from "./contexts/ErrorContext";
import { Provider } from "react-redux";
import { store } from "./app/store";

const matomoInstance = initMatomo();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MatomoProvider value={matomoInstance}>
        <AuthProvider>
          <LinksVisibilityProvider>
            <PageTitleProvider>
              <ErrorProvider>
                <RouterProvider router={router}>
                  <PageTracker />
                </RouterProvider>
              </ErrorProvider>
            </PageTitleProvider>
          </LinksVisibilityProvider>
        </AuthProvider>
      </MatomoProvider>
    </Provider>
  </React.StrictMode>
);
