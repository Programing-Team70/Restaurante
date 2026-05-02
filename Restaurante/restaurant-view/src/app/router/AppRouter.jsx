import { Routes, Route, Navigate } from 'react-router-dom';
import { RestaurantPage } from '../../features/restaurant/pages/RestaurantPage';
import { DashboardPage } from '../layout/DashboardPage.jsx';
import { MainPage } from '../../shared/pages/MainPage.jsx';

export const AppRouter = () => {
    return (
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard/main" />} />

        <Route path='/dashboard' element={<DashboardPage />}>
            <Route path="main" element={<MainPage />} />
            <Route path="restaurant" element={<RestaurantPage />} />
            
            <Route index element={<Navigate to="main" />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard/main" />} />
    </Routes>
    );
};