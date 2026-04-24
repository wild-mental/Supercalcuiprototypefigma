import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { CompareResults } from "./components/CompareResults";
import { ProductDetail } from "./components/ProductDetail";
import { ShareLanding } from "./components/ShareLanding";
import { Signup } from "./components/Signup";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminRegistrationRequests } from "./components/AdminRegistrationRequests";
import { AdminErrorReports } from "./components/AdminErrorReports";
import { AdminLayout } from "./components/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "compare/:searchTerm", Component: CompareResults },
      { path: "product/:productId", Component: ProductDetail },
      { path: "share/:shareId", Component: ShareLanding },
    ],
  },
  { path: "/signup", Component: Signup },
  { path: "/admin/login", Component: AdminLogin },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { path: "dashboard", Component: AdminDashboard },
      { path: "registration-requests", Component: AdminRegistrationRequests },
      { path: "error-reports", Component: AdminErrorReports },
    ],
  },
]);
