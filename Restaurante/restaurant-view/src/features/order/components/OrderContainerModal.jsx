import React from 'react';
import { XCircle, Layers, DollarSign, Tag, CheckCircle2, Edit3, Trash2, User, Utensils } from 'lucide-react';

export const OrderContainerModal = ({ isOpen, onClose, selectedOrder, onEditClick, onDeleteClick }) => {
    if (!isOpen || !selectedOrder) return null;

    const handleDelete = () => {
        if (window.confirm(`¿Está seguro de que desea eliminar permanentemente la orden de "${selectedOrder.customerName}"?`)) {
            onDeleteClick(selectedOrder);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="fixed inset-0 bg-[#0a192f]/40 backdrop-blur-sm transition-opacity" onClick={onClose}/>

            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl overflow-hidden transform transition-all z-10 animate-in zoom-in-95 duration-200">
                <div className="bg-[#0a192f] text-white px-8 py-5 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] bg-white/10 text-blue-200 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1 inline-block">
                            Pedido
                        </span>
                        <h3 className="text-xl font-bold tracking-wide flex items-center gap-2">
                            <User size={18} /> {selectedOrder.customerName}
                        </h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-300 hover:text-white"
                    >
                        <XCircle size={22} />
                    </button>
                </div>

                <div className="p-8 space-y-6 text-sm text-left max-h-[70vh] overflow-y-auto">
                    <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                            <Utensils size={13} /> Pedido
                        </span>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl divide-y divide-gray-200/60 overflow-hidden">
                            {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                                selectedOrder.items.map((item, index) => (
                                    <div key={item._id || index} className="p-3.5 flex justify-between items-center bg-white">
                                        <div>
                                            <p className="font-bold text-gray-800">
                                                {item.menuItemId?.name || `Platillo ID: ${item.menuItemId || 'N/A'}`}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {item.quantity} x Q.{Number(item.price || 0).toFixed(2)}
                                            </p>
                                        </div>
                                        <span className="font-bold text-[#0a192f]">
                                            Q.{Number(item.subtotal || (item.quantity * item.price)).toFixed(2)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="p-4 text-xs text-gray-400 italic">No hay platillos en este pedido.</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                            <Layers size={13} /> Observaciones
                        </span>
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 italic">
                            {selectedOrder.notes || "Sin observaciones para este pedido."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 bg-blue-50/50 border border-blue-100/50 p-3.5 rounded-xl">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                <DollarSign size={12} /> Total
                            </span>
                            <p className="text-lg font-black text-[#0a192f]">
                                Q.{Number(selectedOrder.total || 0).toFixed(2)}
                            </p>
                        </div>

                        <div className="space-y-1 bg-gray-50 p-3.5 rounded-xl">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                <Tag size={12} /> Estatus
                            </span>
                            <span className="text-xs font-black uppercase text-[#0a192f] block mt-1.5 tracking-wider">
                                📌 {selectedOrder.status || "en preparación"}
                            </span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-0.5 text-[10px] text-gray-400">
                            <p><strong>ID Pedido:</strong> {String(selectedOrder._id || selectedOrder.id || 'N/A')}</p>
                            <p><strong>ID Reservación:</strong> {String(selectedOrder.reservationId?._id || selectedOrder.reservationId || 'N/A')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-red-200 active:scale-95"
                            >
                                <Trash2 size={14} />
                                <span>Eliminar</span>
                            </button>

                            <button
                                type="button"
                                onClick={onEditClick}
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/10 active:scale-95"
                            >
                                <Edit3 size={14} />
                                <span>Modificar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};