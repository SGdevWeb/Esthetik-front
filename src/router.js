import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import PrestationsPage from "./pages/PrestationsPage/PrestationsPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Prestation from "./components/Prestations/Prestation/Prestation";
import Forfait from "./components/Prestations/Forfait/Forfait";
import ActuPage from "./pages/ActuPage/ActuPage";
import Article from "./components/Actu/Article";
import PrivateRoute from "./utils/PrivateRoute";
import SignIn from "./pages/AdminPage/pages/SignIn/SignIn";
import AdminPage from "./pages/AdminPage/AdminPage";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage";
import Location from "./pages/AdminPage/pages/Location/Location";
import Services from "./pages/AdminPage/pages/Services/Services";
import Package from "./pages/AdminPage/pages/Package/Package";
import Promotion from "./pages/AdminPage/pages/Promotion/Promotion";
import Slot from "./pages/AdminPage/pages/Slot/Slot";
import Articles from "./pages/AdminPage/pages/Articles/Articles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/prestations",
        element: <PrestationsPage />,
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
        element: <ActuPage />,
      },
      {
        path: "/actu/articles/:id",
        element: <Article />,
      },
      {
        path: "/rdv",
        element: <AppointmentPage />,
      },
      {
        path: "/admin",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: "location",
            element: <Location />,
          },
          {
            path: "prestations",
            element: <Services />,
          },
          {
            path: "forfaits",
            element: <Package />,
          },
          {
            path: "promotions",
            element: <Promotion />,
          },
          {
            path: "planning",
            element: <Slot />,
          },
          {
            path: "articles",
            element: <Articles />,
          },
        ],
      },
      {
        path: "/admin/signin",
        element: <SignIn />,
      },
    ],
  },
]);
