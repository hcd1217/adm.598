import { Navigate, Route, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom';

import ErrorPage from '@/pages/error.page';
import AppLayout from '@/layouts/AppLayout';
import RootPage from '@/pages/dashboard.page';
import usersPage from '@/pages/users.page';

export const AppRouter = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" Component={AppLayout} ErrorBoundary={ErrorPage.withLayout(AppLayout)}>
            <Route index Component={RootPage} />
            <Route path="/accounts" Component={usersPage} />
            <Route path={'*'} element={<Navigate to={'/'} replace={true} />} />
        </Route>,
    ),
);