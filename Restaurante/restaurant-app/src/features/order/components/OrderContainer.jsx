import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Eye, ClipboardList } from 'lucide-react-native';

export const OrderContainer = ({ order, onClick }) => {
    const statusColors = {
        "en preparación": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
        "listo": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
        "entregado": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
        "cancelado": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" }
    };

    const currentStatus = order.status ? order.status.toLowerCase() : 'en preparación';
    const totalItems = order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const colors = statusColors[currentStatus] || statusColors["en preparación"];

    return (
        <TouchableOpacity onPress={onClick} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden h-[220px]">
            <View className={`absolute top-3 right-3 border font-row uppercase tracking-widest px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} ${colors.border}`}>
                <Text className={`text-[10px] font-bold uppercase tracking-widest ${colors.text}`}>{currentStatus}</Text>
            </View>

            <View className="space-y-2 mt-6">
                <Text className="text-base font-bold text-[#0a192f]">
                    {order.customerName}
                </Text>
                <View className="flex-row items-center">
                    <ClipboardList size={13} color="#9ca3af" />
                    <Text className="text-xs text-gray-400">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} registrados</Text>
                </View>
                <Text className="text-xs text-gray-400 leading-relaxed italic" numberOfLines={2}>
                    {order.notes ? `"${order.notes}"` : 'Sin observaciones.'}
                </Text>
            </View>

            <View className="pt-4 border-t border-gray-50 flex-row items-center justify-between">
                <Text className="text-base font-bold text-[#0a192f]">
                    Q.{Number(order.total || 0).toFixed(2)}
                </Text>
                <View className="flex-row items-center gap-1">
                    <Text className="text-[11px] text-gray-400 font-medium">Ver orden</Text>
                    <Eye size={12} color="#9ca3af" />
                </View>
            </View>
        </TouchableOpacity>
    );
};