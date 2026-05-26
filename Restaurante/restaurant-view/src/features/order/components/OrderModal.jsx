import React, { useState, useEffect } from 'react';
import { XCircle, FileText, Plus, Trash2, ToggleRight, ToggleLeft} from 'lucide-react';

export const OrderModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    if (!isOpen) return null;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        restaurantId: '',
        reservationId: '',
        status: 'en preparación',
        notes: '',
        items: []
    });

    const [tempItem, setTempItem] = useState({ menuItemId: '', quantity: 1, price: 0 });

    useEffect(() => {
        if (initialData) {
            setFormData({
                _id: initialData._id || initialData.id,
                customerName: initialData.customerName || '',
                restaurantId: initialData.restaurantId?._id || initialData.restaurantId || '',
                reservationId: initialData.reservationId?._id || initialData.reservationId || '',
                status: initialData.status || 'en preparación',
                notes: initialData.notes || '',
                items: Array.isArray(initialData.items) ? initialData.items.map(i => ({
                    menuItemId: i.menuItemId?._id || i.menuItemId || '',
                    quantity: i.quantity || 1,
                    price: i.price || 0
                })) : [],
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true, 
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
        } else {
            setFormData({
                customerName: '',
                restaurantId: '',
                reservationId: '',
                status: 'en preparación',
                notes: '',
                items: [],
                isAvailable: true,
                isActive: true,
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = () => {
        if (!tempItem.menuItemId.trim() || tempItem.quantity < 1) return alert("Ingrese un ID de Platillo válido.");
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { ...tempItem, quantity: Number(tempItem.quantity), price: Number(tempItem.price) }]
        }));
        setTempItem({ menuItemId: '', quantity: 1, price: 0 });
    };

    const handleRemoveItem = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    const toggleAvailableState = () => {
        setFormData(prev => ({
            ...prev,
            isAvailable: !prev.isAvailable
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.items.length === 0) return alert("Error: Debe registrar al menos un artículo en el pedido.");
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Error al procesar el pedido: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#0a192f]/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl overflow-hidden transform transition-all z-10 max-h-[90vh] flex flex-col">
                
                <div className="bg-[#0a192f] text-white px-10 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold tracking-wide">
                            {initialData ? 'Modificar Pedido' : 'Crear Pedido'}
                        </h3>
                        <p className="text-xs text-gray-300 font-normal mt-0.5">
                            {initialData ? 'Modifique un pedido Heaven Flavor' : 'Cree un nuevo pedido Heaven Flavor'}
                        </p>
                    </div>
                    <button type="button" onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white">
                        <XCircle size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-5 flex-1 text-left">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Nombre del Cliente</label>
                        <input type="text" required name="customerName" value={formData.customerName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium" placeholder="Ej. Carlos Mendoza" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Restaurante</label>
                            <input type="text" required name="restaurantId" value={formData.restaurantId} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium" placeholder="ID del restaurante" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Reservación</label>
                            <input type="text" required name="reservationId" value={formData.reservationId} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium" placeholder="ID de la reservacion" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Estado</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium bg-white">
                                <option value="en preparación">En preparación</option>
                                <option value="listo">Listo</option>
                                <option value="entregado">Entregado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Notas</label>
                            <input type="text" name="notes" value={formData.notes} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium" placeholder="Ej. Sin cebolla, extra aderezo" />
                        </div>
                    </div>

                    {initialData && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#0a192f]">
                                    Disponible
                                </span>
                                <p className="text-xs text-gray-400">
                                    {formData.isAvailable 
                                        ? "El pedido se encuentra disponible actualmente." 
                                        : "El pedido no se encuentra disponible actualmente."}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={toggleAvailableState}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                                    formData.isAvailable 
                                        ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                                        : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                                }`}
                            >
                                {formData.isAvailable ? (
                                    <>
                                        <ToggleRight size={18} className="text-green-600" />
                                        <span>Disponible</span>
                                    </>
                                ) : (
                                    <>
                                        <ToggleLeft size={18} className="text-red-500" />
                                        <span>No Disponible</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100 space-y-4">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Platillos</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input type="text" placeholder="ID Platillo del Menú" value={tempItem.menuItemId} onChange={(e) => setTempItem(p => ({ ...p, menuItemId: e.target.value }))} className="p-2 text-xs rounded-lg border bg-white" />
                            <input type="number" min="1" placeholder="Cant." value={tempItem.quantity} onChange={(e) => setTempItem(p => ({ ...p, quantity: e.target.value }))} className="p-2 text-xs rounded-lg border bg-white" />
                            <div className="flex gap-2">
                                <input type="number" min="0" step="0.01" placeholder="Precio (Q.)" value={tempItem.price} onChange={(e) => setTempItem(p => ({ ...p, price: e.target.value }))} className="p-2 text-xs rounded-lg border bg-white w-full" />
                                <button type="button" onClick={handleAddItem} className="bg-[#0a192f] text-white p-2 rounded-lg hover:bg-blue-900 transition-colors"><Plus size={16} /></button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            {formData.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-200 text-xs">
                                    <span className="font-mono text-gray-500 max-w-[200px] truncate">{item.menuItemId}</span>
                                    <span className="text-gray-700">Cant: <b>{item.quantity}</b></span>
                                    <span className="text-gray-700">P/U: Q.{Number(item.price).toFixed(2)}</span>
                                    <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end space-x-3 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancelar</button>
                        <button type="submit" disabled={isSubmitting} className={`px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0a192f] hover:bg-[#122b52]'}`}>
                            {isSubmitting ? 'Procesando...' : 'Guardar Comanda'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};