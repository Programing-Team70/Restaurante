import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/img/app-logo.jpeg';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../../features/auth/store/AuthStore';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);

    const items = [
        { label: 'Principal', to: '/dashboard/main' },
        { label: 'Restaurantes', to: '/dashboard/restaurant' },
        { label: 'Mesas', to: '/dashboard/table' },
        { label: 'Menu', to: '/dashboard/menu' },
        { label: 'Reservaciones', to: '/dashboard/reservation' },
        { label: 'Ordenes', to: '/dashboard/order' },
        { label: 'Eventos', to: '/dashboard/event' },
        { label: 'Reportes', to: '/dashboard/reports' },
        { label: 'Estadisticas', to: '/dashboard/statistics' },
    ];

    return (
        <>
            <button className='sidebar-toggle' onClick={toggleSidebar}>
                {isOpen ? '✕' : '☰'}
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className='sidebar-logo-container'>
                    <img src={logo} alt='Heaven Flavor' className='sidebar-logo-img' />
                </div>
                <nav>
                    <ul className='nav-menu'>
                        {items.map((item) => {
                            const active = location.pathname === item.to;
                            return (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className={`nav-item ${active ? 'active' : ''}`}
                                        style={active ? { fontWeight: 700 } : {}}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className='logout-menu-item'>
                            <button
                                onClick={logout}
                                className='nav-item logout-btn'
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    width: '100%',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px', // Espacio entre el icono y el texto
                                }}
                            >
                                <LogOut size={18} />
                                <span>Cerrar Sesión</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};
