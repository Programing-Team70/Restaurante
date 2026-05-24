import React, { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Footer } from './Footer.jsx'

export const DashboardContainer = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className='main-content min-h-screen flex flex-col'> 
                <div className="flex-grow w-full m-0 p-0">
                    {children}
                </div>
            <Footer />
            </main>
        </div>
    );
};