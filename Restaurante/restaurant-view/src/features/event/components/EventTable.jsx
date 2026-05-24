import React from 'react';
import { Edit3, Trash2, CalendarX } from 'lucide-react';

export const EventTable = ({ data, onEdit, onCancel, onDelete }) => {
    
    const handleCancelClick = (event) => {
        const id = event._id || event.id;
        const title = event.title || "Heaven Flavor";
        const confirmCancel = window.confirm(
            `¿Desea cambiar el estado del evento "${title}" a Cancelado?`
        );
        if (confirmCancel) {
            onCancel(id);
        }
    };

    const handleDeleteClick = (event) => {
        const id = event._id || event.id;
        const title = event.title || "Heaven Flavor";
        const confirmDelete = window.confirm(
            `¿Desea desactivar el evento "${title}"?`
        );
        if (confirmDelete) {
            onDelete(id);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-GT', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-left min-w-max border-collapse divide-x divide-gray-200">
                <thead className="bg-[#0a192f] text-white">
                    <tr className="divide-x divide-gray-700">
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">ID</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Restaurante</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Título</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Descripción</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Tipo</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Fecha y Hora</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Capacidad</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Estado</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Disponible</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Notas</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Musica</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Decoracion</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Meseros</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((event) => (
                        <tr key={event._id || event.id} className="hover:bg-gray-50/80 transition-colors divide-x divide-gray-100">
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-xs">{event._id}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{event.restaurantId || 'N/A'}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{event.title}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{event.description}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center capitalize text-sm">{event.eventType}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{formatDate(event.eventDate)}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{event.capacity} personas</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                    event.status === 'activo' ? 'bg-green-100 text-green-700' :
                                    event.status === 'programado' ? 'bg-amber-100 text-amber-700' :
                                    event.status === 'finalizado' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    {event.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${event.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                    {event.isAvailable ? 'Disponible' : 'No Disponible'}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-xs">{event.notes}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{event.resources?.music}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{event.resources?.decoration}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{event.resources?.extraStaffNeeded}</td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                                    <button 
                                        type="button"
                                        onClick={() => onEdit(event)} 
                                        className="p-2 text-blue-600 hover:bg-blue-50 hover:scale-105 rounded-xl transition-all duration-200"
                                        title="Editar"
                                    >
                                        <Edit3 size={20}/>
                                    </button>
                                    {event.status !== 'cancelado' && (
                                        <button 
                                            type="button"
                                            onClick={() => handleCancelClick(event)} 
                                            className="p-2 text-amber-600 hover:bg-amber-50 hover:scale-105 rounded-xl transition-all duration-200"
                                            title="Cancelar"
                                        >
                                            <CalendarX size={20}/>
                                        </button>
                                    )}
                                    <button 
                                        type="button"
                                        onClick={() => handleDeleteClick(event)} 
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