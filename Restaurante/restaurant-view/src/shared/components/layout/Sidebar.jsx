import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/img/app-logo.jpeg';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const items = [
        { label: 'Principal', to: '/dashboard/main' },
        { label: 'Restaurantes', to: '/dashboard/restaurant' },
        { label: 'Mesas', to: '/dashboard/table' },
        { label: 'Menu', to: '/dashboard/menu' },
    ];

    return (
        <>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? '✕' : '☰'}
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-logo-container">
                    <img 
                        src={logo} 
                        alt="Heaven Flavor" 
                        className="sidebar-logo-img" 
                    />
                </div>
                <nav>
                    <ul className="nav-menu">
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
                    </ul>
                </nav>
            </aside>
        </>
    );
};
