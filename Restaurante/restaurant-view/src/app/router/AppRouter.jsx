import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from '../../features/auth/pages/AuthPage.jsx';
import { RestaurantsPage } from '../../features/restaurant/pages/RestaurantPage.jsx';
import { TablePage } from '../../features/table/pages/TablePage.jsx';
import { MenuPage } from '../../features/menu/pages/MenuPage.jsx';
import { ReservationPage } from '../../features/reservation/pages/ReservationPage.jsx';
import { OrderPage } from '../../features/order/pages/OrderPage.jsx';
import { EventPage } from '../../features/event/pages/EventPge.jsx';
import { ReportsPage } from '../../features/reports/pages/ReportsPage.jsx';
import { StatisticsPage } from '../../features/reports/pages/StatisticsPage.jsx';
import { DashboardPage } from '../layout/DashboardPage.jsx';
import { MainPage } from '../../shared/pages/MainPage.jsx';
import { ResetPasswordPage } from '../../features/auth/pages/ResetPasswordPage.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />

            <Route element={<ProtectedRoute allowedRoles={['EMPLEADO', 'ADMIN']} />}>
                <Route path='/dashboard' element={<DashboardPage />}>
                    <Route path='main' element={<MainPage />} />
                    <Route path='restaurant' element={<RestaurantsPage />} />
                    <Route path='table' element={<TablePage />} />
                    <Route path='menu' element={<MenuPage />} />
                    <Route path='reservation' element={<ReservationPage />} />
                    <Route path='order' element={<OrderPage />} />
                    <Route path='event' element={<EventPage />} />
                    <Route path='reports' element={<ReportsPage />} />
                    <Route path='statistics' element={<StatisticsPage />} />

                    <Route index element={<Navigate to='main' />} />
                </Route>
            </Route>

            <Route path='*' element={<Navigate to='/dashboard/main' />} />
        </Routes>
    );
};
