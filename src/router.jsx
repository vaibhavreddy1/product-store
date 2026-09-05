import {
  createBrowserRouter,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/RequireAdmin";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import KeysDemoPage from "./pages/KeysDemoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "keys-demo",
        element: <KeysDemoPage />,
      },
     {
  element: <ProtectedRoute />,
  children: [
    {
      path: "admin",
      element: <AdminPage />,
    },
  ],
},
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;