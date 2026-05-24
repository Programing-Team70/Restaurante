import React from 'react';
import { Edit3, Trash2, CalendarX } from 'lucide-react';

export const ReservationTable = ({ data, onEdit, onCancel, onDelete }) => {
    
    const handleCancelClick = (res) => {
        const id = res._id || res.id;
        const name = res.customerName || "Heaven Flavor";
        const confirmCancel = window.confirm(
            `¿Desea cambiar el estado de la reservación de "${name}" a Cancelada?`
        );
        if (confirmCancel) {
            onCancel(id);
        }
    };

    const handleDeleteClick = (res) => {
        const id = res._id || res.id;
        const name = res.customerName || "Heaven Flavor";
        const confirmDelete = window.confirm(
            `¿Desea desactivar la reservación de "${name}"?`
        );
        if (confirmDelete) {
            onDelete(id);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-GT', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-left min-w-max border-collapse divide-x divide-gray-200">
                <thead className="bg-[#0a192f] text-white">
                    <tr className="divide-x divide-gray-700">
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">ID</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Cliente</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Teléfono</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Tipo</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Fecha y Hora</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Personas</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">ID Restaurante</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">ID Mesa</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Estado</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Disponible</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((res) => (
                        <tr key={res._id || res.id} className="hover:bg-gray-50/80 transition-colors divide-x divide-gray-100">
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-xs">{res._id}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.customerName}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.customerPhone}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center capitalize text-sm">{res.type}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{formatDate(res.date)}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.guests}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.restaurantId || 'N/A'}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.tableId || 'Fijado por Restaurante'}</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                    res.status === 'confirmada' || res.status === 'completada' ? 'bg-green-100 text-green-700' :
                                    res.status === 'pendiente' || res.status === 'en curso' ? 'bg-amber-100 text-amber-700' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    {res.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${res.isAvalible ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                    {res.isAvalible ? 'Disponible' : 'No Disponible'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                                    <button 
                                        type="button"
                                        onClick={() => onEdit(res)} 
                                        className="p-2 text-blue-600 hover:bg-blue-50 hover:scale-105 rounded-xl transition-all duration-200"
                                        title="Editar"
                                    >
                                        <Edit3 size={20}/>
                                    </button>
                                    {res.status !== 'cancelada' && (
                                        <button 
                                            type="button"
                                            onClick={() => handleCancelClick(res)} 
                                            className="p-2 text-amber-600 hover:bg-amber-50 hover:scale-105 rounded-xl transition-all duration-200"
                                            title="Cancelar"
                                        >
                                            <CalendarX size={20}/>
                                        </button>
                                    )}
                                    <button 
                                        type="button"
                                        onClick={() => handleDeleteClick(res)} 
                                        className="p-2 text-red-600 hover:bg-red-50 hover:scale-105 rounded-xl transition-all duration-200"
                                        title="Desactivar"
                                    >
                                        <Trash2 size={20}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};