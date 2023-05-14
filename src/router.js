import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Prestations from "./pages/Prestations/Prestations";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Epilations from "./pages/Prestations/pages/Epilations/Epilations";
import SoinsVisage from "./pages/Prestations/pages/SoinsVisage/SoinsVisage";
import Modelage from "./pages/Prestations/pages/Modelage/Modelage";
import BeauteDuRegard from "./pages/Prestations/pages/BeauteDuRegard/BeauteDuRegard";
import BeauteDesMains from "./pages/Prestations/pages/BeauteDesMains/BeauteDesMains";
import Maquillage from "./pages/Prestations/pages/Maquillage/Maquillage";

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
            index: true,
            element: <Epilations />,
          },
          {
            path: "visage",
            element: <SoinsVisage />,
          },
          {
            path: "modelage",
            element: <Modelage />,
          },
          {
            path: "regard",
            element: <BeauteDuRegard />,
          },
          {
            path: "mains",
            element: <BeauteDesMains />,
          },
          {
            path: "maquillage",
            element: <Maquillage />,
          },
        ],
      },
    ],
  },
]);
