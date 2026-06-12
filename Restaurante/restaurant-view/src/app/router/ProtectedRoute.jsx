import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/AuthStore';

export const ProtectedRoute = ({ allowedRoles }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
};
