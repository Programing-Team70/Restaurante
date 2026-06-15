import React, { useState } from 'react';
import { View } from 'react-native';
import { Sidebar } from './Sidebar.jsx';
import { Footer } from './Footer.jsx';

export const DashboardContainer = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <View className='flex-1'>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <View className='flex-1 flex-col'> 
                <View className="flex-grow w-full">
                    {children}
                </View>
                <Footer />
            </View>
        </View>
    );
};