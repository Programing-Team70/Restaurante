import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useOrderStore } from '../store/OrderStore.js'; 
import { OrderContainer } from '../components/OrderContainer.jsx';
import { OrderContainerModal } from '../components/OrderContainerModal.jsx';
import { OrderModal } from '../components/OrderModal.jsx';
import { useSaveOrder } from '../hooks/useOrder.js';

export const OrderPage = () => {
    const orders = useOrderStore((state) => state.orders);
    const loading = useOrderStore((state) => state.loading);
    const error = useOrderStore((state) => state.error);
    const getOrders = useOrderStore((state) => state.getOrders);
    const getOrdersByRestaurant = useOrderStore((state) => state.getOrdersByRestaurant);
    const { saveOrder } = useSaveOrder();
    
    const [searchId, setSearchId] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!searchId.trim()) {
            await getOrders();
            return;
        }
        await getOrdersByRestaurant(searchId.trim());
    };

    const handleOpenDetail = (order) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setSelectedOrder(null);
        setIsDetailOpen(false);
    };

    const handleTransformToEdit = () => {
        setIsDetailOpen(false); 
        setIsModalOpen(true);   
    };

    const handleOpenCreateModal = () => {
        setSelectedOrder(null); 
        setIsModalOpen(true);
    };

    const handleDeleteOrder = async (orderToDisable) => {
        try {
            await saveOrder({
                ...orderToDisable,
                isActive: false
            });
            if (searchId.trim()) {
                await getOrdersByRestaurant(searchId.trim());
            } else {
                await getOrders();
            }
            setIsDetailOpen(false);
            setSelectedOrder(null);
        } catch (err) {
            console.error("Error al desactivar el pedido:", err);
        }
    };

    const handleSaveOrder = async (newOrderData) => {
        try {
            await saveOrder(newOrderData);
            if (searchId.trim()) {
                await getOrdersByRestaurant(searchId.trim());
            } else {
                await getOrders();
            }
            setIsModalOpen(false); 
            setSelectedOrder(null); 
        } catch (err) {
            console.error("Error al procesar el pedido en Heaven Flavor:", err);
        }
    };

    return (
        <div className="w-full max-w-8xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center border-b border-gray-100 pb-5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-[#0a192f]">Pedidos</h2>
                    <p className="text-gray-500 italic text-sm">Gestión de pedidos Heaven Flavor</p>
                </div>
                <button 
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#112240] transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 whitespace-nowrap tracking-wide"
                >
                    <Plus size={18} strokeWidth={2.5} /> 
                    <span>Nuevo Pedido</span>
                </button>
            </header>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 text-left">
                    {error}
                </div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <form onSubmit={handleSearch} className="flex gap-3 w-full max-w-3xl mx-auto">
                    <div className="relative w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            placeholder="Buscar por ID del restaurante..."
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-100 text-[#0a192f] px-6 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors whitespace-nowrap"
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
                    {Array.isArray(orders) && orders.filter(order => order && (order._id || order.id)).length > 0 ? (
                        orders
                            .filter(order => order && (order._id || order.id))
                            .map((order) => (
                                <OrderContainer 
                                    key={order._id || order.id}
                                    order={order}
                                    onClick={() => handleOpenDetail(order)}
                                />
                            ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400 text-sm italic">
                            {searchId.trim() 
                            ? "No se encontraron pedidos registradas para esta consulta."
                            : "Ingrese un ID del pedido en el buscador superior para consultar su distribución."}
                        </div>
                    )}
                </div>
            )}

            <OrderContainerModal 
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
                selectedOrder={selectedOrder}
                onEditClick={handleTransformToEdit}
                onDeleteClick={handleDeleteOrder}
            />

            <OrderModal 
                isOpen={isModalOpen}
                onClose={() => {setIsModalOpen(false); setSelectedOrder(null);}}
                onSave={handleSaveOrder}
                initialData={selectedOrder} 
            />
        </div>
    );
};