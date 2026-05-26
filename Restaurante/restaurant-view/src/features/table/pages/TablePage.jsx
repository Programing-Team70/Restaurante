import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useTableStore } from '../store/TableStore.js'; 
import { TableContainer } from '../components/TableContainer.jsx';
import { TableContainerModal } from '../components/TableContainerModal.jsx';
import { TableModal } from '../components/TableModal.jsx';
import { useSaveTable } from '../hooks/UseTables.js';

export const TablePage = () => {
    const tables = useTableStore((state) => state.tables);
    const loading = useTableStore((state) => state.loading);
    const error = useTableStore((state) => state.error);
    const getTables = useTableStore((state) => state.getTables);
    const getTablesByRestaurant = useTableStore((state) => state.getTablesByRestaurant);
    
    const { saveTable } = useSaveTable();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [searchType, setSearchType] = useState('table');
    const [selectedTable, setSelectedTable] = useState(null); 
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!searchId.trim()) return;
        if (searchType === 'table') {
            await getTables(searchId.trim());
        } else {
            await getTablesByRestaurant(searchId.trim());
        }
    };

    const handleOpenDetail = (table) => {
        setSelectedTable(table);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setSelectedTable(null);
        setIsDetailOpen(false);
    };

    const handleTransformToEdit = () => {
        setIsDetailOpen(false);
        setIsModalOpen(true);
    };

    const handleOpenCreateModal = () => {
        setSelectedTable(null);
        setIsModalOpen(true);
    };

    const handleDeleteTable = async (tableToDisable) => {
        try {
            await saveTable({
                ...tableToDisable,
                isActive: false
            });

            if (tableToDisable.restaurant) {
                setSearchType('restaurant');
                setSearchId(tableToDisable.restaurant);
            }

            setIsDetailOpen(false);
            setSelectedTable(null);
        } catch (err) {
            console.error("Error al desactivar la mesa:", err);
        }
    };

    const handleSaveTable = async (newTableData) => {
        try {
            await saveTable(newTableData);
            setIsModalOpen(false);
            setSelectedTable(null);

            if (newTableData.restaurant) {
                setSearchType('restaurant');
                setSearchId(newTableData.restaurant);
            }
        } catch (err) {
            console.error("Error al procesar la mesa en Heaven Flavor:", err);
        }
    };

    return (
        <div className="w-full max-w-8xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center border-b border-gray-100">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-[#0a192f]">Mesas</h2>
                    <p className="text-gray-500 italic text-sm">Gestión de mesas Heaven Flavor</p>
                </div>
                <button 
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-5 rounded-lg font-semibold hover:bg-[#112240] transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 whitespace-nowrap tracking-wide"
                >
                    <Plus size={18} strokeWidth={2.5} /> 
                    <span>Nueva Mesa</span>
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
                        onClick={() => setSearchType('table')}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${searchType === 'table' ? 'bg-[#0a192f] text-white shadow-sm' : 'text-gray-500 hover:text-[#0a192f]'}`}
                    >
                        ID Mesa
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
                            placeholder={`Buscar por ID ${searchType === 'table' ? 'de la mesa' : 'del restaurante'}...`}
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
                    {Array.isArray(tables) && tables.filter(t => t && (t._id || t.id)).length > 0 ? (
                        tables
                            .filter(table => table && (table._id || table.id))
                            .map((table) => (
                                <TableContainer 
                                    key={table._id || table.id}
                                    table={table}
                                    onClick={() => handleOpenDetail(table)}
                                />
                            ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400 text-sm italic">
                            {searchId.trim() 
                            ? "No se encontraron mesas registradas para esta consulta."
                            : "Ingrese un ID de mesa o de restaurante en el buscador superior para consultar su distribución."}
                        </div>
                    )}
                </div>
            )}

            <TableContainerModal 
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
                selectedTable={selectedTable}
                onEditClick={handleTransformToEdit}
                onDeleteClick={handleDeleteTable}
            />

            <TableModal 
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTable(null);
                }}
                onSave={handleSaveTable}
                initialData={selectedTable}
            />
        </div>
    );
};