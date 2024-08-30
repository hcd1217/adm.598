import ErrorPage from "@/pages/error.page";
import { lazy } from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
const AppLayout = lazy(() => import("@/layouts/AppLayout"));
const AccountPage = lazy(() => import("@/pages/account.page"));
const RootPage = lazy(() => import("@/pages/dashboard.page"));
const ordersPage = lazy(() => import("@/pages/orders.page"));
const positionsPage = lazy(() => import("@/pages/positions.page"));
const TransactionsPage = lazy(() => import("@/pages/transactions.page"));
const usersPage = lazy(() => import("@/pages/users.page"));

export const AppRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route
      path="/"
      Component={AppLayout}
      ErrorBoundary={ErrorPage.withLayout(AppLayout)}
    >
      <Route index Component={RootPage} />
      <Route path="/users" Component={usersPage} />
      <Route path="/orders" Component={ordersPage} />
      <Route path="/positions" Component={positionsPage} />
      <Route path="/transactions" Component={TransactionsPage} />
      <Route path="/account" Component={AccountPage} />
      <Route
        path={"*"}
        element={<Navigate to={"/"} replace={true} />}
      />
    </Route>,
  ),
);
