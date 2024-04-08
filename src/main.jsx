/* eslint-disable import/no-unresolved */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CurrencyList from "./currencies/CurrencyList";
import ConverterComponent from "./converter/ConverterComponent";

function convertValute(val1, nom1, val2, nom2) {
  return (val1 / val2) * (nom2 / nom1);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <CurrencyList convertingFunc={convertValute} />,
  },
  {
    path: "/converter",
    element: <ConverterComponent convertingFunc={convertValute} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
