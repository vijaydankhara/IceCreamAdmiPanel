import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/sidebar";
import Product_Add from "../pages/Product_Add/Product_Add";
import List from "../pages/List/List";
import Orders from "../pages/Orders/Orders";
import Register_Login from "../pages/Register-login/Register_Login";
import UserShow from "../pages/UserShow/UserShow";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const PageRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      // Public routes
      { path: "/Register_Login", element: <Register_Login /> },
      { path: "/Sidebar", element: <Sidebar /> },
      // Protected routes
      {
        path: "/product_add",
        element: (
          <ProtectedRoute>
            <Product_Add />
          </ProtectedRoute>
        ),
      },
      {
        path: "/list",
        element: (
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user_data",
        element: (
          <ProtectedRoute>
            <UserShow />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const Layout = () => {
  return (
    <div>
      <RouterProvider router={PageRouter}></RouterProvider>
    </div>
  );
};
export default Layout;
