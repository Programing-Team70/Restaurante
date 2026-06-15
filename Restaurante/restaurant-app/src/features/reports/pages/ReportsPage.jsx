import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import { useReportStore } from "../store/ReportStore";
import { ReportTable } from "../components/ReportTable";
import { CreateReportModal } from "../components/CreateReportModal";
import { RefreshCw, Plus, Trash2, Download } from 'lucide-react-native';

export const ReportsPage = () => {
    const { reports, fetchReports, selectedReport, fetchReport, loading, restaurants, fetchRestaurants, selectedRestaurantId, setSelectedRestaurantId } = useReportStore();

    const [showModal, setShowModal] = useState(false);
    const [activeReportId, setActiveReportId] = useState(null);

    useEffect(() => {
        fetchReports();
        fetchRestaurants();
    }, []);

    const handleSelectReport = async (id) => {
        if (activeReportId === id) {
            setActiveReportId(null);
            return;
        }
        setActiveReportId(id);
        await fetchReport(id);
    };

    return (
        <ScrollView className="w-full py-10 px-6 space-y-8">
            <View className="flex-row justify-between items-center border-b border-gray-100">
                <View className="space-y-1">
                    <Text className="text-3xl font-bold text-[#0a192f]">Reportes</Text>
                    <Text className="text-gray-500 italic text-sm">Gestión de eventos Heaven Flavor</Text>
                </View>
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                        onPress={fetchReports}
                        disabled={loading}
                        className="p-2"
                    >
                        <RefreshCw size={20} color="#6b7280" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        className="flex-row items-center gap-2 bg-[#0a192f] px-5 py-3 rounded-lg"
                    >
                        <Plus size={18} strokeWidth={2.5} color="white" /> 
                        <Text className="text-white font-semibold">Nuevo Reporte</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-white p-6 rounded-2xl border border-gray-100 flex-row gap-4 items-center justify-between">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f]">
                    Restaurante
                </Text>
                <View className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white">
                    <TextInput
                        value={selectedRestaurantId}
                        onChangeText={setSelectedRestaurantId}
                        placeholder="Selecciona un restaurante"
                        placeholderTextColor="#9ca3af"
                        className="text-sm font-medium text-gray-800"
                    />
                </View>
            </View>

            {loading && !reports.length ? (
                <View className="items-center justify-center py-12">
                    <ActivityIndicator size="small" color="#9ca3af" className="mb-3" />
                    <Text className="text-center text-gray-400 tracking-[0.2em] uppercase text-xs">
                        Sincronizando con la base de datos Heaven Flavor...
                    </Text>
                </View>
            ) : (
                <View>
                    {reports.length > 0 && (
                        <Text className="text-xs text-gray-400 mb-2">
                            Selecciona el reporte para ver su grafica.
                        </Text>
                    )}

                    <View className="w-full bg-white rounded-2xl shadow-sm border border-gray-100">
                        <View className="bg-[#0a192f] px-6 py-4 flex-row">
                            <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">Título</Text>
                            <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">Tipo</Text>
                            <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">Desde</Text>
                            <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">Hasta</Text>
                            <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">Formato</Text>
                            <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">Estado</Text>
                            <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">Acciones</Text>
                        </View>
                        {reports.map((report) => (
                            <ReportRow
                                key={report._id}
                                report={report}
                                isActive={activeReportId === report._id}
                                onSelect={() => handleSelectReport(report._id)}
                            />
                        ))}
                    </View>
                </View>
            )}

            {activeReportId && selectedReport && (
                <View className="bg-white p-6 rounded-2xl border border-gray-100">
                    <Text className="text-2xl font-bold text-[#0a192f]">
                        {selectedReport.title}
                    </Text>
                    <Text className="text-gray-500 italic text-sm">
                        {new Date(selectedReport.startDate).toLocaleDateString("es-GT")} —{" "}
                        {new Date(selectedReport.endDate).toLocaleDateString("es-GT")}
                    </Text>
                </View>
            )}

            {showModal && (
                <CreateReportModal
                    onClose={() => setShowModal(false)}
                    restaurantId={selectedRestaurantId}
                />
            )}
        </ScrollView>
    );
};

const ReportRow = ({ report, isActive, onSelect }) => {
    const { removeReport, loading } = useReportStore();

    const reportTypeLabel = {
        demanda: "Demanda",
        reservaciones: "Reservaciones",
        platos_populares: "Platos Populares",
        horas_pico: "Horas Pico",
        desempeño: "Desempeño",
    };

    const statusColor = {
        pendiente: { bg: "bg-yellow-100", text: "text-yellow-700" },
        generado: { bg: "bg-green-100", text: "text-green-700" },
        error: { bg: "bg-red-100", text: "text-red-700" },
    };
    const colors = statusColor[report.status] || statusColor.pendiente;

    return (
        <TouchableOpacity
            onPress={onSelect}
            className={`flex-row border-b border-gray-100 ${isActive ? "bg-blue-50" : ""}`}
        >
            <Text className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm flex-1">{report.title}</Text>
            <Text className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm flex-1">
                {reportTypeLabel[report.reportType] ?? report.reportType}
            </Text>
            <Text className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm flex-1">
                {new Date(report.startDate).toLocaleDateString("es-GT")}
            </Text>
            <Text className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm flex-1">
                {new Date(report.endDate).toLocaleDateString("es-GT")}
            </Text>
            <Text className="px-6 py-4 font-medium text-[#0a192f] text-center text-sm flex-1">{report.format}</Text>
            <View className="px-6 py-4 flex-1">
                <View className={`px-2 py-1 rounded-full ${colors.bg} self-center`}>
                    <Text className={`text-xs font-medium ${colors.text} text-center`}>{report.status}</Text>
                </View>
            </View>
            <View className="px-6 py-4 flex-1 flex-row items-center justify-center gap-4">
                {report.status === "generado" && report.fileUrl && (
                    <TouchableOpacity>
                        <Download size={22} color="#3b82f6" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Eliminar Reporte',
                            '¿Está seguro de eliminar este reporte?',
                            [
                                { text: 'Cancelar', style: 'cancel' },
                                { text: 'Eliminar', style: 'destructive', onPress: () => removeReport(report._id) }
                            ]
                        );
                    }}
                    disabled={loading}
                    className="p-2.5"
                >
                    <Trash2 size={22} color="#dc2626" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};