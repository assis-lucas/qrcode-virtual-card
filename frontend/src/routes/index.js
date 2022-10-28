import { createBrowserRouter, Navigate } from "react-router-dom";
import Generate from "../pages/Generate";
import Retrieve from "../pages/Retrieve";
import QrCode from "../pages/QrCode";
import ErrorPage from "../errors/e404";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Navigate to="/generate" replace />,
  },
  {
    path: "/generate",
    element: <Generate />,
  },
  {
    path: "/image/:slug",
    element: <QrCode />,
  },
  {
    path: ":slug",
    element: <Retrieve />,
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
]);

export default router;
