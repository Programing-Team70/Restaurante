import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Eye, Users, MapPin } from "lucide-react-native";

export const TableContainer = ({ table, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden h-[220px]"
    >
      <View className="absolute top-3 right-3 flex-row items-center gap-1.5">
        <View
          className={`px-2.5 py-1 rounded-full border ${
            table?.isAvailable
              ? "bg-green-50 border-green-100"
              : "bg-red-50 border-red-100"
          }`}
        >
          <Text
            style={{ letterSpacing: 1.2 }}
            className={`text-[10px] font-bold uppercase ${table?.isAvailable ? "text-green-700" : "text-red-700"}`}
          >
            {table?.isAvailable ? "Disponible" : "No Disponible"}
          </Text>
        </View>
      </View>

      <View className="space-y-2 mt-6">
        <View className="flex-row items-center gap-2">
          <MapPin size={16} color="#9ca3af" />
          <Text
            style={{ letterSpacing: 0.8 }}
            className="text-xs font-bold uppercase text-gray-400"
          >
            Ubicación
          </Text>
        </View>

        <Text className="text-base font-bold text-[#0a192f] leading-snug">
          {String(table?.location || "Área no especificada")}
        </Text>
      </View>

      <View className="pt-4 border-t border-gray-50 flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Users size={16} color="#6b7280" />
          <Text className="text-sm font-black text-[#0a192f]">
            Capacidad: {Number(table?.capacity || 0)}
          </Text>
        </View>
        <View className="flex-row items-center gap-1 px-2">
          <Text className="text-[11px] text-gray-400 font-medium">
            Ver detalles
          </Text>
          <Eye size={12} color="#9ca3af" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
