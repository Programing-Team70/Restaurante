import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

export const RestaurantTable = ({ data, onEdit, onDelete }) => {
    
    const handleDeleteClick = (restaurant) => {
        const restaurantId = restaurant._id || restaurant.id;
        const restaurantName = restaurant.restaurantName || "Heaven Flavor";
        const confirmDelete = window.confirm(
            `¿Desea desactivar el restaurante "${restaurantName}"?`
        );
        if (confirmDelete) {
            onDelete(restaurantId);
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-left min-w-max border-collapse divide-x divide-gray-200">
                <thead className="bg-[#0a192f] text-white">
                    <tr className="divide-x divide-gray-700">
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">ID</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Nombre</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Ubicación</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Horario</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Categoría</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Precio</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Teléfono</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Correo</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Disponible</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-semibold text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((res) => (
                        <tr key={res._id || res.id} className="hover:bg-gray-50/80 transition-colors divide-x divide-gray-100">
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res._id}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center">{res.restaurantName}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.restaurantAddress}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.restaurantSchedule}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center">{res.restaurantCategory}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center">Q.{res.averagePrice}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.contact?.phone || 'N/A'}</td>
                            <td className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm">{res.contact?.email || 'N/A'}</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${res.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {res.isAvailable ? 'Disponible' : 'No Disponible'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center space-x-4 whitespace-nowrap">
                                    <button 
                                        type="button"
                                        onClick={() => onEdit(res)} 
                                        className="p-2.5 text-blue-600 hover:bg-blue-50 hover:scale-105 rounded-xl transition-all duration-200"
                                        title="Editar"
                                    >
                                        <Edit3 size={22}/>
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => handleDeleteClick(res)} 
                                        className="p-2.5 text-red-600 hover:bg-red-50 hover:scale-105 rounded-xl transition-all duration-200"
                                        title="Desactivar"
                                    >
                                        <Trash2 size={22}/>
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