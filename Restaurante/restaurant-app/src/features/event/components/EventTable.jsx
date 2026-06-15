import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Edit3, Trash2, CalendarX } from 'lucide-react-native';

export const EventTable = ({ data, onEdit, onCancel, onDelete }) => {
    
    const handleCancelClick = (event) => {
        const id = event._id || event.id;
        const title = event.title || "Heaven Flavor";
        
        Alert.alert(
            "Cambiar Estado",
            `¿Desea cambiar el estado del evento "${title}" a Cancelado?`,
            [
                { text: "No", style: "cancel" },
                { text: "Sí", onPress: () => onCancel(id) }
            ]
        );
    };

    const handleDeleteClick = (event) => {
        const id = event._id || event.id;
        const title = event.title || "Heaven Flavor";
        
        Alert.alert(
            "Desactivar Evento",
            `¿Desea desactivar el evento "${title}"?`,
            [
                { text: "No", style: "cancel" },
                { text: "Sí", style: "destructive", onPress: () => onDelete(id) }
            ]
        );
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

    const columns = [
        { label: 'ID', width: 'w-24' },
        { label: 'Restaurante', width: 'w-36' },
        { label: 'Título', width: 'w-40' },
        { label: 'Descripción', width: 'w-48' },
        { label: 'Tipo', width: 'w-28' },
        { label: 'Fecha y Hora', width: 'w-44' },
        { label: 'Capacidad', width: 'w-28' },
        { label: 'Estado', width: 'w-28' },
        { label: 'Disponible', width: 'w-32' },
        { label: 'Notas', width: 'w-48' },
        { label: 'Musica', width: 'w-32' },
        { label: 'Decoracion', width: 'w-32' },
        { label: 'Meseros', width: 'w-24' },
        { label: 'Opciones', width: 'w-36' },
    ];

    return (
        <View className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View className="flex-col">
                    
                    <View className="flex-row bg-[#0a192f]">
                        {columns.map((col, idx) => (
                            <View 
                                key={idx} 
                                className={`${col.width} px-6 py-4 border-r border-gray-700 justify-center items-center`}
                            >
                                <Text className="text-white text-xs uppercase tracking-widest font-semibold text-center">
                                    {col.label}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View className="flex-col">
                        {data.map((event, rowIndex) => {
                            const eventId = event._id || event.id;
                            return (
                                <View 
                                    key={eventId} 
                                    className={`flex-row border-b border-gray-100 ${rowIndex % 2 === 1 ? 'bg-gray-50/40' : 'bg-white'}`}
                                >
                                    <View className="w-24 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-xs font-medium text-[#0a192f] text-center">{event._id}</Text>
                                    </View>
                                    <View className="w-36 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center">{event.restaurantId || 'N/A'}</Text>
                                    </View>
                                    <View className="w-40 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center">{event.title}</Text>
                                    </View>
                                    <View className="w-48 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center">{event.description}</Text>
                                    </View>
                                    <View className="w-28 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center capitalize">{event.eventType}</Text>
                                    </View>
                                    <View className="w-44 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center">{formatDate(event.eventDate)}</Text>
                                    </View>
                                    <View className="w-28 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center">{event.capacity} personas</Text>
                                    </View>
                                    <View className="w-28 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <View className={`px-3 py-1 rounded-full ${
                                            event.status === 'activo' ? 'bg-green-100' :
                                            event.status === 'programado' ? 'bg-amber-100' :
                                            event.status === 'finalizado' ? 'bg-blue-100' :
                                            'bg-gray-100'
                                        }`}>
                                            <Text className={`text-[10px] font-bold uppercase text-center ${
                                                event.status === 'activo' ? 'text-green-700' :
                                                event.status === 'programado' ? 'text-amber-700' :
                                                event.status === 'finalizado' ? 'text-blue-700' :
                                                'text-gray-600'
                                            }`}>
                                                {event.status}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <View className="w-32 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <View className={`px-3 py-1 rounded-full ${event.isAvailable ? 'bg-blue-100' : 'bg-red-100'}`}>
                                            <Text className={`text-[10px] font-bold uppercase text-center ${event.isAvailable ? 'text-blue-700' : 'text-red-700'}`}>
                                                {event.isAvailable ? 'Disponible' : 'No Disponible'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="w-48 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-xs font-medium text-[#0a192f] text-center">{event.notes}</Text>
                                    </View>
                                    <View className="w-32 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center">{event.resources?.music}</Text>
                                    </View>
                                    <View className="w-32 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center">{event.resources?.decoration}</Text>
                                    </View>
                                    <View className="w-24 px-6 py-4 border-r border-gray-100 justify-center items-center">
                                        <Text className="text-sm font-medium text-[#0a192f] text-center">{event.resources?.extraStaffNeeded}</Text>
                                    </View>
                                    <View className="w-36 px-6 py-4 justify-center items-center">
                                        <View className="flex-row items-center justify-center space-x-2">
                                            <TouchableOpacity 
                                                onPress={() => onEdit(event)} 
                                                className="p-2 bg-blue-50/60 rounded-xl active:scale-95"
                                            >
                                                <Edit3 size={20} color="#2563eb"/>
                                            </TouchableOpacity>
                                            {event.status !== 'cancelado' && (
                                                <TouchableOpacity 
                                                    onPress={() => handleCancelClick(event)} 
                                                    className="p-2 bg-amber-50/60 rounded-xl active:scale-95"
                                                >
                                                    <CalendarX size={20} color="#d97706"/>
                                                </TouchableOpacity>
                                            )}
                                            <TouchableOpacity 
                                                onPress={() => handleDeleteClick(event)} 
                                                className="p-2 bg-red-50/60 rounded-xl active:scale-95"
                                            >
                                                <Trash2 size={20} color="#dc2626"/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};