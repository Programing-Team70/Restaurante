import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Trash, Download } from 'lucide-react-native';
import { useReportStore } from "../store/ReportStore";

export const ReportTable = () => {
    const { reports, removeReport, loading } = useReportStore();

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

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("es-GT", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    if (!reports.length) {
        return (
            <View className="items-center justify-center py-16">
                <Text className="text-gray-400 text-lg">No hay reportes generados aún.</Text>
            </View>
        );
    }

    return (
        <ScrollView className="rounded-xl border border-gray-200">
            <View className="bg-gray-50 px-4 py-3 flex-row">
                <Text className="text-gray-600 uppercase text-xs flex-1">Título</Text>
                <Text className="text-gray-600 uppercase text-xs flex-1">Tipo</Text>
                <Text className="text-gray-600 uppercase text-xs flex-1">Desde</Text>
                <Text className="text-gray-600 uppercase text-xs flex-1">Hasta</Text>
                <Text className="text-gray-600 uppercase text-xs flex-1">Formato</Text>
                <Text className="text-gray-600 uppercase text-xs flex-1">Estado</Text>
                <Text className="text-gray-600 uppercase text-xs flex-1">Acciones</Text>
            </View>
            {reports.map((report) => {
                const colors = statusColor[report.status] || statusColor.pendiente;
                return (
                    <View key={report._id} className="border-b border-gray-100 px-4 py-3 flex-row items-center">
                        <Text className="font-medium text-gray-800 flex-1 text-sm">
                            {report.title}
                        </Text>
                        <Text className="text-gray-600 flex-1 text-sm">
                            {reportTypeLabel[report.reportType] ?? report.reportType}
                        </Text>
                        <Text className="text-gray-500 flex-1 text-sm">
                            {formatDate(report.startDate)}
                        </Text>
                        <Text className="text-gray-500 flex-1 text-sm">
                            {formatDate(report.endDate)}
                        </Text>
                        <Text className="uppercase text-gray-500 flex-1 text-sm">
                            {report.format}
                        </Text>
                        <View className={`px-2 py-1 rounded-full ${colors.bg} flex-1`}>
                            <Text className={`text-xs font-medium ${colors.text}`}>{report.status}</Text>
                        </View>
                        <View className="flex-row items-center gap-2 flex-1">
                            {report.fileUrl && (
                                <TouchableOpacity className="text-blue-500">
                                    <Download size={20} color="#3b82f6" />
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
                            >
                                <Trash size={20} color="#f87171" />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};