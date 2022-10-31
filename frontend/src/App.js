import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./styles/index.css";

export default function App() {
  return <RouterProvider router={routes} />;
}
