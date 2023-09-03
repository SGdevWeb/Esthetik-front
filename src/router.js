import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Prestations from "./pages/Prestations/Prestations";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Prestation from "./components/Prestations/Prestation/Prestation";
import Forfait from "./components/Prestations/Forfait/Forfait";
import SignUp from "./pages/Admin/SignUp";
import Actu from "./pages/Actu/Actu";
import Article from "./components/Actu/Article";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/prestations",
        element: <Prestations />,
        children: [
          {
            path: ":rate",
            element: <Prestation />,
          },
          {
            path: "forfait",
            element: <Forfait />,
          },
        ],
      },
      {
        path: "/actu",
        element: <Actu />,
      },
      {
        path: "/actu/articles/:id",
        element: <Article />,
      },
      {
        path: "/admin",
        element: <SignUp />,
      },
    ],
  },
]);
