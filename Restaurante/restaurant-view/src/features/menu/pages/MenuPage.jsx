import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useMenuStore } from '../store/MenuStore.js'; 
import { MenuContainer } from '../components/MenuContainer.jsx';
import { MenuContainerModal } from '../components/MenuContainerModal.jsx';
import { MenuModal } from '../components/MenuModal.jsx';
import { useSaveMenu } from '../hooks/UseMenu.js';

export const MenuPage = () => {
    const menus = useMenuStore((state) => state.menus);
    const loading = useMenuStore((state) => state.loading);
    const error = useMenuStore((state) => state.error);
    const getMenus = useMenuStore((state) => state.getMenus);
    const getMenusByRestaurant = useMenuStore((state) => state.getMenusByRestaurant);
    const { saveMenu } = useSaveMenu();
    
    const [searchId, setSearchId] = useState('');
    const [searchType, setSearchType] = useState('menu');
    const [selectedPlate, setSelectedPlate] = useState(null); 
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!searchId.trim()) return;
        if (searchType === 'menu') {
            await getMenus(searchId.trim());
        } else {
            await getMenusByRestaurant(searchId.trim());
        }
    };

    const handleOpenDetail = (plate) => {
        setSelectedPlate(plate);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setSelectedPlate(null);
        setIsDetailOpen(false);
    };

    const handleTransformToEdit = () => {
        setIsDetailOpen(false); 
        setIsModalOpen(true);   
    };

    const handleOpenCreateModal = () => {
        setSelectedPlate(null); 
        setIsModalOpen(true);
    };

    const handleDeletePlate = async (plateToDisable) => {
        try {
            await saveMenu({
                ...plateToDisable,
                isActive: false
            });
            if (plateToDisable.restaurant) {
                setSearchType('restaurant');
                setSearchId(plateToDisable.restaurant);
            }
            setIsDetailOpen(false);
            setSelectedPlate(null);
        } catch (err) {
            console.error("Error al desactivar el platillo:", err);
        }
    };

    const handleSaveMenu = async (newMenuData) => {
        try {
            await saveMenu(newMenuData);
            if (newMenuData.restaurant) {
                setSearchType('restaurant');
                setSearchId(newMenuData.restaurant);
            }
            setIsModalOpen(false); 
            setSelectedPlate(null); 
        } catch (err) {
            console.error("Error al procesar el platillo en Heaven Flavor:", err);
        }
    };

    return (
        <div className="w-full max-w-8xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center border-b border-gray-100">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-[#0a192f]">Menú</h2>
                    <p className="text-gray-500 italic text-sm">Gestión de platillos Heaven Flavor</p>
                </div>
                <button 
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-5 rounded-lg font-semibold hover:bg-[#112240] transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 whitespace-nowrap tracking-wide"
                >
                    <Plus size={18} strokeWidth={2.5} /> 
                    <span>Nuevo Platillo</span>
                </button>
            </header>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 text-left">
                    {error}
                </div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
                    <button
                        type="button"
                        onClick={() => setSearchType('menu')}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${searchType === 'menu' ? 'bg-[#0a192f] text-white shadow-sm' : 'text-gray-500 hover:text-[#0a192f]'}`}
                    >
                        ID Menú
                    </button>
                    <button
                        type="button"
                        onClick={() => setSearchType('restaurant')}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${searchType === 'restaurant' ? 'bg-[#0a192f] text-white shadow-sm' : 'text-gray-500 hover:text-[#0a192f]'}`}
                    >
                        ID Restaurante
                    </button>
                </div>
                <form onSubmit={handleSearch} className="flex gap-3 w-full md:flex-1 max-w-2xl">
                    <div className="relative w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            placeholder={`Buscar por ID del ${searchType === 'menu' ? 'platillo' : 'restaurante'}...`}
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-100 text-[#0a192f] px-5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-400 tracking-[0.2em] uppercase text-xs animate-pulse">
                    Sincronizando con la base de datos Heaven Flavor...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.isArray(menus) && menus.filter(plate => plate && (plate._id || plate.id)).length > 0 ? (
                        menus
                            .filter(plate => plate && (plate._id || plate.id))
                            .map((plate) => (
                                <MenuContainer 
                                    key={plate._id || plate.id}
                                    plate={plate}
                                    onClick={() => handleOpenDetail(plate)}
                                />
                            ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400 text-sm italic">
                            {searchId.trim() 
                            ? "No se encontraron platillos registradas para esta consulta."
                            : "Ingrese un ID de platillo o de restaurante en el buscador superior para consultar su distribución."}
                        </div>
                    )}
                </div>
            )}

            <MenuContainerModal 
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
                selectedPlate={selectedPlate}
                onEditClick={handleTransformToEdit}
                onDeleteClick={handleDeletePlate}
            />

            <MenuModal 
                isOpen={isModalOpen}
                onClose={() => {setIsModalOpen(false); setSelectedPlate(null);}}
                onSave={handleSaveMenu}
                initialData={selectedPlate} 
            />
        </div>
    );
};