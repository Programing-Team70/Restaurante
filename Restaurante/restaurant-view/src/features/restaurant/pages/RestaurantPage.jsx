import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useRestaurantStore } from '../store/RestaurantStore'; 
import { RestaurantTable } from '../components/RestaurantTable.jsx';
import { RestaurantModal } from '../components/RestaurantModal.jsx'; 
import { useSaveRestaurant } from '../hooks/UseRestaurants.js';

export const RestaurantsPage = () => {
    const restaurants = useRestaurantStore((state) => state.restaurants);
    const loading = useRestaurantStore((state) => state.loading);
    const error = useRestaurantStore((state) => state.error);
    const getRestaurants = useRestaurantStore((state) => state.getRestaurants);
    const deleteRestaurant = useRestaurantStore((state) => state.deleteRestaurant);
    const { saveRestaurant } = useSaveRestaurant();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    useEffect(() => {
        getRestaurants();
    }, []);

    const handleOpenCreateModal = () => {
        setSelectedRestaurant(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
    };

    const handleSaveRestaurant = async (restaurantData) => {
        try {
            await saveRestaurant(restaurantData);
            await getRestaurants(); 
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error al procesar el restaurante en Heaven Flavor:", err);
        }
    };

    return (
        <div className="w-full max-w-8xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center border-b border-gray-100">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-[#0a192f]">Restaurantes</h2>
                    <p className="text-gray-500 italic text-sm">Gestión de restaurantes Heaven Flavor</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-5 rounded-lg font-semibold hover:bg-[#112240] transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 whitespace-nowrap tracking-wide"
                >
                    <Plus size={18} strokeWidth={2.5} /> 
                    <span>Nuevo Restaurante</span>
                </button>
            </header>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 text-left">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-400 tracking-[0.2em] uppercase text-xs animate-pulse">
                    Sincronizando con la base de datos Heaven Flavor...
                </div>
            ) : (
                <RestaurantTable 
                    data={restaurants} 
                    onEdit={handleOpenEditModal}
                    onDelete={deleteRestaurant} 
                />
            )}

            <RestaurantModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRestaurant}
                initialData={selectedRestaurant}
            />
        </div>
    );
};