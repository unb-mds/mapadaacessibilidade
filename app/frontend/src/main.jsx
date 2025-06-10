//NÃO TRISCA NESSA COISA

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/mapa/Mapa.jsx";
import Home from "./pages/Login/indexLogin.jsx";
import Signup from "./pages/Signup/signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Tem certeza que entrou na página certa?</div>,
  },
  {
    path: "/login",
    element: <Home />,
  },
  {
    path: "/cadastro",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
