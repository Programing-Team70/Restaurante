import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, ScrollView, Alert } from 'react-native';
import { XCircle, Layers, DollarSign, Tag, CheckCircle2, Edit3, Trash2, User, Utensils } from 'lucide-react-native';

export const OrderContainerModal = ({ isOpen, onClose, selectedOrder, onEditClick, onDeleteClick }) => {
    if (!isOpen || !selectedOrder) return null;

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Pedido',
            `¿Está seguro de que desea eliminar permanentemente la orden de "${selectedOrder.customerName}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => onDeleteClick(selectedOrder) }
            ]
        );
    };

    return (
        <Modal visible={isOpen} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/50 p-4">
                <Pressable className="absolute inset-0" onPress={onClose} />
                <View className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl overflow-hidden">
                    <View className="bg-[#0a192f] px-8 py-5 flex-row items-center justify-between">
                        <View>
                            <View className="bg-white/10 px-2.5 py-1 rounded-full mb-1 self-start">
                                <Text className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Pedido</Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <User size={18} color="white" />
                                <Text className="text-xl font-bold text-white">{selectedOrder.customerName}</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                            onPress={onClose}
                            className="p-2"
                        >
                            <XCircle size={22} color="#d1d5db" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="p-5 space-y-4">
                        <View className="space-y-1.5">
                            <View className="flex-row items-center gap-1.5">
                                <Utensils size={13} color="#9ca3af" />
                                <Text className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                    Pedido
                                </Text>
                            </View>
                            <View className="bg-gray-50 border border-gray-100 rounded-xl">
                                {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                                    selectedOrder.items.map((item, index) => (
                                        <View key={item._id || index} className="p-3.5 flex-row justify-between items-center bg-white border-b border-gray-200/60">
                                            <View>
                                                <Text className="font-bold text-gray-800">
                                                    {item.menuItemId?.name || `Platillo ID: ${item.menuItemId || 'N/A'}`}
                                                </Text>
                                                <Text className="text-xs text-gray-400">
                                                    {item.quantity} x Q.{Number(item.price || 0).toFixed(2)}
                                                </Text>
                                            </View>
                                            <Text className="font-bold text-[#0a192f]">
                                                Q.{Number(item.subtotal || (item.quantity * item.price)).toFixed(2)}
                                            </Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text className="p-4 text-xs text-gray-400 italic">No hay platillos en este pedido.</Text>
                                )}
                            </View>
                        </View>

                        <View className="space-y-1.5">
                            <View className="flex-row items-center gap-1.5">
                                <Layers size={13} color="#9ca3af" />
                                <Text className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                    Observaciones
                                </Text>
                            </View>
                            <View className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <Text className="text-gray-600 leading-relaxed italic">
                                    {selectedOrder.notes || "Sin observaciones para este pedido."}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row gap-2">
                            <View className="flex-1 space-y-1 bg-blue-50/50 border border-blue-100/50 p-3.5 rounded-xl">
                                <View className="flex-row items-center gap-1.5">
                                    <DollarSign size={12} color="#9ca3af" />
                                    <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        Total
                                    </Text>
                                </View>
                                <Text className="text-lg font-black text-[#0a192f]">
                                    Q.{Number(selectedOrder.total || 0).toFixed(2)}
                                </Text>
                            </View>

                            <View className="flex-1 space-y-1 bg-gray-50 p-3.5 rounded-xl">
                                <View className="flex-row items-center gap-1.5">
                                    <Tag size={12} color="#9ca3af" />
                                    <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        Estatus
                                    </Text>
                                </View>
                                <Text className="text-xs font-black uppercase text-[#0a192f] mt-1.5 tracking-wider">
                                    📌 {selectedOrder.status || "en preparación"}
                                </Text>
                            </View>
                        </View>

                        <View className="pt-4 border-t border-gray-100 flex-row items-center justify-between gap-4">
                            <View className="flex flex-col gap-0.5">
                                <Text className="text-[10px] text-gray-400"><Text className="font-bold">ID Pedido:</Text> {String(selectedOrder._id || selectedOrder.id || 'N/A')}</Text>
                                <Text className="text-[10px] text-gray-400"><Text className="font-bold">ID Reservación:</Text> {String(selectedOrder.reservationId?._id || selectedOrder.reservationId || 'N/A')}</Text>
                            </View>
                            <View className="flex-row items-center gap-2 mx-5">
                                <TouchableOpacity
                                    onPress={handleDelete}
                                    className="flex-row items-center bg-red-50 px-2 py-2 rounded-xl border border-red-200"
                                >
                                    <Trash2 size={25} color="#dc2626" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onEditClick}
                                    className="flex-row items-center bg-blue-600 px-2 py-2 rounded-xl"
                                >
                                    <Edit3 size={25} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};