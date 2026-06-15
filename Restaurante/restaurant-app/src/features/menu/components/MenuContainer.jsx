import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Eye } from "lucide-react-native";

export const MenuContainer = ({ plate, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden h-[220px]"
    >
      <View className="absolute top-3 right-3 bg-blue-50 px-2 py-1 rounded-full">
        <Text className="text-[#0a192f] text-[10px] font-bold uppercase">
          {plate.type || "Plato"}
        </Text>
      </View>

      <View className="space-y-1 mt-6">
        <Text className="text-base font-bold text-[#0a192f]">{plate.name}</Text>
        <Text
          className="text-sm text-gray-400 leading-relaxed"
          numberOfLines={3}
        >
          {plate.description || "Sin descripción disponible."}
        </Text>
      </View>

      <View className="pt-4 border-t border-gray-50 flex-row items-center justify-between">
        <Text className="text-base font-bold text-[#0a192f] gap-1.5">
          Q.{Number(plate.price || 0).toFixed(2)}
        </Text>
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
