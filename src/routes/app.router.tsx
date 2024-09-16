import ErrorPage from "@/pages/error.page";
import { lazy } from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
// prettier-ignore
const TransactionsPage = lazy(() => import("@/pages/transactions.page"));
const AppLayout = lazy(() => import("@/layouts/AppLayout"));
const AccountPage = lazy(() => import("@/pages/account.page"));
const RootPage = lazy(() => import("@/pages/dashboard.page"));
const OrdersPage = lazy(() => import("@/pages/orders.page"));
const PositionsPage = lazy(() => import("@/pages/positions.page"));
const UsersPage = lazy(() => import("@/pages/users.page"));
const EmailPage = lazy(() => import("@/pages/email.page"));
const KycDataPage = lazy(() => import("@/pages/kyc-data.page"));
const AppConfigPage = lazy(() => import("@/pages/app-config.page"));

export const AppRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route
      path="/"
      Component={AppLayout}
      ErrorBoundary={ErrorPage.withLayout(AppLayout)}
    >
      <Route index Component={RootPage} />
      <Route path="/users" Component={UsersPage} />
      <Route path="/orders" Component={OrdersPage} />
      <Route path="/positions" Component={PositionsPage} />
      <Route path="/transactions" Component={TransactionsPage} />
      <Route path="/account" Component={AccountPage} />
      <Route path="/email" Component={EmailPage} />
      <Route path="/kyc-data" Component={KycDataPage} />
      <Route path="/app-configs" Component={AppConfigPage} />
      <Route
        path={"*"}
        element={<Navigate to={"/"} replace={true} />}
      />
    </Route>,
  ),
);
