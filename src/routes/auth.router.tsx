import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import ErrorPage from "@/pages/error.page";
import LoginPage from "@/pages/login.page";

export const AuthRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" Component={Outlet} ErrorBoundary={ErrorPage}>
      <Route
        index
        element={<Navigate to={"/auth/login"} replace={true} />}
      />
      <Route path={"auth"} Component={AuthLayout}>
        <Route path={"login"} Component={LoginPage} />
      </Route>

      <Route
        path={"*"}
        element={<Navigate to={"/auth/login"} replace={true} />}
      />
    </Route>,
  ),
);
