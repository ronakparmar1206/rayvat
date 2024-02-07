import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";

import { RootLayout } from "../layout/RootLayout";
import { Home } from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
           
            <Home />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);
