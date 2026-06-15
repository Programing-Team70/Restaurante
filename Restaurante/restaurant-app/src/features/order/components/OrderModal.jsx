import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { XCircle, FileText, Plus, Trash2, ToggleRight, ToggleLeft} from 'lucide-react-native';

export const OrderModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        restaurantId: '',
        reservationId: '',
        status: 'en preparación',
        notes: '',
        items: []
    });

    const [tempItem, setTempItem] = useState({ menuItemId: '', quantity: 1, price: 0 });

    useEffect(() => {
        if (initialData) {
            setFormData({
                _id: initialData._id || initialData.id,
                customerName: initialData.customerName || '',
                restaurantId: initialData.restaurantId?._id || initialData.restaurantId || '',
                reservationId: initialData.reservationId?._id || initialData.reservationId || '',
                status: initialData.status || 'en preparación',
                notes: initialData.notes || '',
                items: Array.isArray(initialData.items) ? initialData.items.map(i => ({
                    menuItemId: i.menuItemId?._id || i.menuItemId || '',
                    quantity: i.quantity || 1,
                    price: i.price || 0
                })) : [],
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true, 
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
        } else {
            setFormData({
                customerName: '',
                restaurantId: '',
                reservationId: '',
                status: 'en preparación',
                notes: '',
                items: [],
                isAvailable: true,
                isActive: true,
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = () => {
        if (!tempItem.menuItemId.trim() || tempItem.quantity < 1) {
            Alert.alert('Error', 'Ingrese un ID de Platillo válido.');
            return;
        }
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { ...tempItem, quantity: Number(tempItem.quantity), price: Number(tempItem.price) }]
        }));
        setTempItem({ menuItemId: '', quantity: 1, price: 0 });
    };

    const handleRemoveItem = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    const toggleAvailableState = () => {
        setFormData(prev => ({
            ...prev,
            isAvailable: !prev.isAvailable
        }));
    };

    const handleSubmit = async () => {
        if (formData.items.length === 0) {
            Alert.alert('Error', 'Debe registrar al menos un artículo en el pedido.');
            return;
        }
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Error al procesar el pedido: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal visible={isOpen} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-[#0a192f]/40 p-4">
                <Pressable className="absolute inset-0" onPress={onClose} />
                <View className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
                    <View className="bg-[#0a192f] px-10 py-4 flex-row items-center justify-between">
                        <View>
                            <Text className="text-lg font-bold tracking-wide text-white">
                                {initialData ? 'Modificar Pedido' : 'Crear Pedido'}
                            </Text>
                            <Text className="text-xs text-gray-300 font-normal mt-0.5">
                                {initialData ? 'Modifique un pedido' : 'Cree un pedido'}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={onClose} className="p-1.5">
                            <XCircle size={22} color="#d1d5db" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="p-5 space-y-4 flex-2">
                        <View>
                            <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Nombre del Cliente</Text>
                            <TextInput 
                                value={formData.customerName} 
                                onChangeText={(text) => handleChange('customerName', text)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                                placeholder="Ej. Carlos Mendoza"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        <View className="flex-row gap-2">
                            <View className="flex-1">
                                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Restaurante</Text>
                                <TextInput 
                                    value={formData.restaurantId} 
                                    onChangeText={(text) => handleChange('restaurantId', text)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                                    placeholder="ID del restaurante"
                                    placeholderTextColor="#9ca3af"
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Reservación</Text>
                                <TextInput 
                                    value={formData.reservationId} 
                                    onChangeText={(text) => handleChange('reservationId', text)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                                    placeholder="ID de la reservacion"
                                    placeholderTextColor="#9ca3af"
                                />
                            </View>
                        </View>

                        <View className="flex-row gap-2">
                            <View className="flex-1">
                                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Estado</Text>
                                    <TextInput 
                                        value={formData.status} 
                                        onChangeText={(text) => handleChange('status', text)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                                        placeholder="en preparación, listo, entregado, cancelado"
                                        placeholderTextColor="#9ca3af"
                                    />
                            </View>
                            <View className="flex-1">
                                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Notas</Text>
                                <TextInput 
                                    value={formData.notes} 
                                    onChangeText={(text) => handleChange('notes', text)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                                    placeholder="Ej. Sin cebolla, extra aderezo"
                                    placeholderTextColor="#9ca3af"
                                />
                            </View>
                        </View>

                        {initialData && (
                            <View className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-row justify-between items-center">
                                <View className="space-y-0.5">
                                    <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f]">
                                        Disponible
                                    </Text>
                                    <Text className="text-xs text-gray-400">
                                        {formData.isAvailable 
                                            ? "El pedido se encuentra disponible actualmente." 
                                            : "El pedido no se encuentra disponible actualmente."}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={toggleAvailableState}
                                    className={`flex-row items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border ${
                                        formData.isAvailable 
                                            ? 'bg-green-50 border-green-200 text-green-700' 
                                            : 'bg-red-50 border-red-200 text-red-600'
                                    }`}
                                >
                                    {formData.isAvailable ? (
                                        <ToggleRight size={18} color="#16a34a" />
                                    ) : (
                                        <ToggleLeft size={18} color="#dc2626" />
                                    )}
                                    <Text>{formData.isAvailable ? 'Disponible' : 'No Disponible'}</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View className="bg-gray-50/60 p-2 rounded-xl border border-gray-100 space-y-1">
                            <Text className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Platillos</Text>
                            <View className="flex-row gap-2">
                                <TextInput 
                                    placeholder="ID Platillo del Menú" 
                                    value={tempItem.menuItemId} 
                                    onChangeText={(text) => setTempItem(p => ({ ...p, menuItemId: text }))}
                                    className="flex-2 p-2 text-xs rounded-lg border bg-white"
                                    placeholderTextColor="#9ca3af"
                                />
                                <TextInput 
                                    placeholder="Cant." 
                                    value={String(tempItem.quantity)} 
                                    onChangeText={(text) => setTempItem(p => ({ ...p, quantity: text }))}
                                    keyboardType="number-pad"
                                    className="w-20 p-2 text-xs rounded-lg border bg-white"
                                    placeholderTextColor="#9ca3af"
                                />
                                <View className="flex-row space-x-2">
                                    <TextInput 
                                        placeholder="Precio (Q.)" 
                                        value={String(tempItem.price)} 
                                        onChangeText={(text) => setTempItem(p => ({ ...p, price: text }))}
                                        keyboardType="decimal-pad"
                                        className="flex-2 w-20 p-2 text-xs rounded-lg border bg-white"
                                        placeholderTextColor="#9ca3af"
                                    />
                                    <TouchableOpacity onPress={handleAddItem} className="bg-[#0a192f] p-2 rounded-lg">
                                        <Plus size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="space-y-1">
                                {formData.items.map((item, index) => (
                                    <View key={index} className="flex-row justify-between items-center bg-white p-2.5 rounded-lg border border-gray-200">
                                        <Text className="font-mono text-gray-500 flex-1" numberOfLines={1}>{item.menuItemId}</Text>
                                        <Text className="text-gray-700">Cant: <Text className="font-bold">{item.quantity}</Text></Text>
                                        <Text className="text-gray-700">P/U: Q.{Number(item.price).toFixed(2)}</Text>
                                        <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                                            <Trash2 size={14} color="#ef4444" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View className="pt-2 flex-row justify-end space-x-3 border-t border-gray-100">
                            <TouchableOpacity onPress={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200">
                                <Text className="text-sm font-semibold text-gray-600">Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                                className={`px-5 py-2.5 rounded-xl ${
                                    isSubmitting ? 'bg-gray-400' : 'bg-[#0a192f]'
                                }`}
                            >
                                <Text className="text-white text-sm font-semibold">
                                    {isSubmitting ? 'Procesando...' : 'Guardar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};