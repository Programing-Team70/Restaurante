import React from 'react';
import { Eye } from 'lucide-react';

export const MenuContainer = ({ plate, onClick }) => {
    return (
        <div onClick={onClick} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden h-[220px] text-left">
            <div className="absolute top-3 right-3 bg-blue-50 text-[#0a192f] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {plate.type || 'Plato'}
            </div>

            <div className="space-y-2 mt-4">
                <h3 className="text-base font-bold text-[#0a192f] line-clamp-1 group-hover:text-blue-900 transition-colors">
                    {plate.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {plate.description || 'Sin descripción disponible.'}
                </p>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <span className="text-base font-bold text-[#0a192f] flex items-center">
                    Q.{Number(plate.price).toFixed(2)}
                </span>
                <span className="text-[11px] text-gray-400 font-medium group-hover:text-[#0a192f] flex items-center gap-1 transition-colors">
                    Ver detalles <Eye size={12} />
                </span>
            </div>
        </div>
    );
};