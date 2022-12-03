import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login/Login';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default function AuthGuard({ children }) {
    const { isLoading, isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);
    if (isLoading) {
        return <h2>Loading...</h2>;
    }


    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
}