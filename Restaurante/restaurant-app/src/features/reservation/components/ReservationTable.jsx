import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Edit3, Trash2, CalendarX } from "lucide-react-native";

export const ReservationTable = ({ data, onEdit, onCancel, onDelete }) => {
  const handleCancelClick = (res) => {
    const id = res._id || res.id;
    const name = res.customerName || "Heaven Flavor";
    Alert.alert(
      "Cancelar Reservación",
      `¿Desea cambiar el estado de la reservación de "${name}" a Cancelada?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: () => onCancel(id),
        },
      ],
    );
  };

  const handleDeleteClick = (res) => {
    const id = res._id || res.id;
    const name = res.customerName || "Heaven Flavor";
    Alert.alert(
      "Desactivar Reservación",
      `¿Desea desactivar la reservación de "${name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Desactivar",
          style: "destructive",
          onPress: () => onDelete(id),
        },
      ],
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-GT", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <View className="bg-[#0a192f] px-6 py-4 flex-row">
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          ID
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          Cliente
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          Teléfono
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          Tipo
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          Fecha y Hora
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          Personas
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          ID Restaurante
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          ID Mesa
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          Estado
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          Disponible
        </Text>
        <Text className="text-white text-xs uppercase tracking-widest font-semibold flex-1 text-center">
          Opciones
        </Text>
      </View>
      {data.map((res) => {
        const statusColor =
          res.status === "confirmada" || res.status === "completada"
            ? "bg-green-100 text-green-700"
            : res.status === "pendiente" || res.status === "en curso"
              ? "bg-amber-100 text-amber-700"
              : "bg-gray-100 text-gray-600";
        return (
          <View
            key={res._id || res.id}
            className="border-b border-gray-100 px-6 py-4 flex-row items-center"
          >
            <Text className="font-medium text-[#0a192f] text-center text-xs flex-1">
              {res._id}
            </Text>
            <Text className="font-medium text-[#0a192f] text-center text-sm flex-1">
              {res.customerName}
            </Text>
            <Text className="font-medium text-[#0a192f] text-center text-sm flex-1">
              {res.customerPhone}
            </Text>
            <Text className="font-medium text-[#0a192f] text-center capitalize text-sm flex-1">
              {res.type}
            </Text>
            <Text className="font-medium text-[#0a192f] text-center text-sm flex-1">
              {formatDate(res.date)}
            </Text>
            <Text className="font-medium text-[#0a192f] text-center text-sm flex-1">
              {res.guests}
            </Text>
            <Text className="font-medium text-[#0a192f] text-center text-sm flex-1">
              {res.restaurantId || "N/A"}
            </Text>
            <Text className="font-medium text-[#0a192f] text-center text-sm flex-1">
              {res.tableId || "Fijado por Restaurante"}
            </Text>
            <View
              className={`px-3 py-1 rounded-full flex-1 self-center ${statusColor}`}
            >
              <Text
                className={`text-[10px] font-bold uppercase ${statusColor}`}
              >
                {res.status}
              </Text>
            </View>
            <View
              className={`px-3 py-1 rounded-full flex-1 self-center ${res.isAvalible ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}
            >
              <Text
                className={`text-[10px] font-bold uppercase ${res.isAvalible ? "text-blue-700" : "text-red-700"}`}
              >
                {res.isAvalible ? "Disponible" : "No Disponible"}
              </Text>
            </View>
            <View className="flex-row items-center justify-center gap-2 flex-1">
              <TouchableOpacity onPress={() => onEdit(res)} className="p-2">
                <Edit3 size={20} color="#2563eb" />
              </TouchableOpacity>
              {res.status !== "cancelada" && (
                <TouchableOpacity
                  onPress={() => handleCancelClick(res)}
                  className="p-2"
                >
                  <CalendarX size={20} color="#d97706" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => handleDeleteClick(res)}
                className="p-2"
              >
                <Trash2 size={20} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};
