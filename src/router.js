import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Prestations from "./pages/Prestations/Prestations";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Prestation from "./components/Prestations/Prestation/Prestation";
import Forfait from "./components/Prestations/Forfait/Forfait";
import Actu from "./pages/Actu/Actu";
import Article from "./components/Actu/Article";
import PrivateRoute from "./utils/PrivateRoute";
import SignIn from "./pages/Admin/SignIn";
import AdminHome from "./pages/Admin/AdminHome";

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
        element: (
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/signin",
        element: <SignIn />,
      },
    ],
  },
]);
