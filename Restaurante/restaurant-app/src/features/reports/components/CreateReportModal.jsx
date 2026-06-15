import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { XCircle } from 'lucide-react-native';
import { useReportStore } from "../store/ReportStore";

export const CreateReportModal = ({ onClose, restaurantId }) => {
    const { addReport, loading } = useReportStore();
    const [formData, setFormData] = useState({
        title: '',
        reportType: '',
        startDate: '',
        endDate: '',
        format: 'json'
    });

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async () => {
        if (!formData.title || !formData.reportType || !formData.startDate || !formData.endDate) {
            Alert.alert('Error', 'Complete todos los campos requeridos');
            return;
        }
        try {
            await addReport({
                ...formData,
                restaurantId,
            });
            Alert.alert('Éxito', 'Reporte generado correctamente');
            onClose();
        } catch (e) {
            Alert.alert('Error', e?.response?.data?.message ?? "Error al generar el reporte");
        }
    };

    return (
        <Modal visible transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-[#0a192f]/40 p-4">
                <Pressable className="absolute inset-0" onPress={onClose} />
            
                <View className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
                    <View className="bg-[#0a192f] px-10 py-4 flex-row items-center justify-between">
                        <View>
                            <Text className="text-lg font-bold tracking-wide text-white">
                                Crear Reporte
                            </Text>
                        </View>
                        <TouchableOpacity 
                            onPress={onClose} 
                            className="p-1.5"
                        >
                            <XCircle size={22} color="#d1d5db" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="p-10 space-y-5 flex-1">
                        <View>
                            <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Título
                            </Text>
                            <TextInput
                                placeholder="Ej: Reporte semanal de demanda"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                                placeholderTextColor="#9ca3af"
                                value={formData.title}
                                onChangeText={(text) => handleChange('title', text)}
                            />
                        </View>

                        <View>
                            <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Tipo de Reporte
                            </Text>
                            <View className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white">
                                <TextInput
                                    className="text-sm font-medium text-gray-800"
                                    placeholder="demanda, reservaciones, platos_populares, horas_pico, desempeño"
                                    placeholderTextColor="#9ca3af"
                                    value={formData.reportType}
                                    onChangeText={(text) => handleChange('reportType', text)}
                                />
                            </View>
                        </View>

                        <View className="flex-row gap-4">
                            <View className="flex-1">
                                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                    Fecha Inicio
                                </Text>
                                <TextInput
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor="#9ca3af"
                                    value={formData.startDate}
                                    onChangeText={(text) => handleChange('startDate', text)}
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                    Fecha Fin
                                </Text>
                                <TextInput
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor="#9ca3af"
                                    value={formData.endDate}
                                    onChangeText={(text) => handleChange('endDate', text)}
                                />
                            </View>
                        </View>

                        <View>
                            <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Formato de salida
                            </Text>
                            <View className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white">
                                <TextInput
                                    className="text-sm font-medium text-gray-800"
                                    placeholder="json, pdf, excel"
                                    placeholderTextColor="#9ca3af"
                                    value={formData.format}
                                    onChangeText={(text) => handleChange('format', text)}
                                />
                            </View>
                        </View>

                        <View className="flex-row justify-end gap-3 pt-2">
                            <TouchableOpacity
                                onPress={onClose}
                                className="px-5 py-2.5 rounded-xl border border-gray-200"
                            >
                                <Text className="text-sm font-semibold text-gray-600">Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onSubmit}
                                disabled={loading}
                                className={`px-5 py-2.5 rounded-xl ${loading ? 'bg-gray-400' : 'bg-[#0a192f]'}`}
                            >
                                <Text className="text-white text-sm font-semibold">
                                    {loading ? "Generando..." : "Guardar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};