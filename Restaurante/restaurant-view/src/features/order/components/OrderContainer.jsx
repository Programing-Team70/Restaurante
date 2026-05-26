import React from 'react';
import { Eye, ClipboardList } from 'lucide-react';

export const OrderContainer = ({ order, onClick }) => {
    const statusColors = {
        "en preparación": "bg-amber-50 text-amber-700 border-amber-200",
        "listo": "bg-blue-50 text-blue-700 border-blue-200",
        "entregado": "bg-green-50 text-green-700 border-green-200",
        "cancelado": "bg-red-50 text-red-700 border-red-200"
    };

    const currentStatus = order.status ? order.status.toLowerCase() : 'en preparación';
    const totalItems = order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <div onClick={onClick} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden h-[220px] text-left">
            <div className={`absolute top-3 right-3 border text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColors[currentStatus] || statusColors["en preparación"]}`}>
                {currentStatus}
            </div>

            <div className="space-y-2 mt-4">
                <h3 className="text-base font-bold text-[#0a192f] line-clamp-1 group-hover:text-blue-900 transition-colors">
                    {order.customerName}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <ClipboardList size={13} />
                    <span>{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} registrados</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed italic">
                    {order.notes ? `"${order.notes}"` : 'Sin observaciones.'}
                </p>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <span className="text-base font-bold text-[#0a192f] flex items-center">
                    Q.{Number(order.total || 0).toFixed(2)}
                </span>
                <span className="text-[11px] text-gray-400 font-medium group-hover:text-[#0a192f] flex items-center gap-1 transition-colors">
                    Ver orden <Eye size={12} />
                </span>
            </div>
        </div>
    );
};