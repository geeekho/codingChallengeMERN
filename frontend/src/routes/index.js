import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Loader } from '@mantine/core';

// layouts
import DashboardLayout from '../layouts/dashboard';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// config
import { PATH_AFTER_LOGIN } from '../config.js';
// components
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    return (
        <Suspense fallback={<Loader size="xl" />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: (
                <GuestGuard>
                    <Login />
                </GuestGuard>
            )
        },

        // Dashboard Routes
        {
            path: 'dashboard',
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
                { path: 'landing', element: <GeneralWorkspace /> },
                { path: 'users', element: <Users /> },
            ],
        },


        //{ path: '*', element: <Navigate to="/404" replace /> },
    ]);
}

// IMPORT COMPONENTS
const GeneralWorkspace = Loadable(lazy(() => import('../pages/dashboard/GeneralWorkspace')));
const Users = Loadable(lazy(() => import('../pages/dashboard/users/Users')));
// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/login/Login')));