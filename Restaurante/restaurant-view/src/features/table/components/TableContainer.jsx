import React from 'react';
import { Eye, Users, MapPin } from 'lucide-react';

export const TableContainer = ({ table, onClick }) => {
    return (
        <div 
            onClick={onClick} 
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden h-[220px] text-left"
        >
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    table.isAvailable 
                        ? 'bg-green-50 text-green-700 border border-green-100' 
                        : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                    {table.isAvailable ? 'Disponible' : 'No Disponible'}
                </span>
            </div>

            <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#0a192f] transition-colors">
                    <MapPin size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Ubicación</span>
                </div>
                
                <h3 className="text-base font-bold text-[#0a192f] line-clamp-2 leading-snug">
                    {String(table.location || 'Área no especificada')}
                </h3>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-[#0a192f]">
                    <Users size={16} className="text-gray-500 group-hover:text-[#0a192f] transition-colors" />
                    <span className="text-sm font-black">
                        Capacidad: {Number(table.capacity || 0)}
                    </span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium group-hover:text-[#0a192f] flex items-center gap-1 transition-colors">
                    Ver detalles <Eye size={12} />
                </span>
            </div>
        </div>
    );
};