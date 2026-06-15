import React from "react";
import { View, Text } from "react-native";

export const RestaurantContainer = ({ data }) => {
  return (
    <View className="w-full space-y-4">
      {data.map((res) => (
        <View
          key={res._id || res.id}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden h-[240px] mb-4"
        >
          <View className="absolute top-3 right-3 flex-row items-center gap-2">
            <View className="bg-blue-50 px-2 py-1 rounded-full">
              <Text className="text-[#0a192f] text-[10px] font-bold uppercase">
                {res.restaurantCategory || "General"}
              </Text>
            </View>
            <View 
              className={`px-2 py-1 rounded-full ${
                res.isAvailable ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <Text 
                className={`text-[10px] font-bold uppercase ${
                  res.isAvailable ? "text-green-700" : "text-red-700"
                }`}
              >
                {res.isAvailable ? "Disponible" : "No Disponible"}
              </Text>
            </View>
          </View>

          <View className="space-y-1 mt-4">
            <Text className="text-base font-bold text-[#0a192f]">
              {res.restaurantName}
            </Text>
            <Text className="text-[11px] text-gray-400 font-medium">
              ID: {res._id || res.id}
            </Text>
            <Text className="text-xs text-gray-400 font-medium pt-0.5">
              Horario: {res.restaurantSchedule}
            </Text>
            <Text 
              className="text-sm text-gray-500 leading-relaxed mt-1"
              numberOfLines={2}
            >
              {res.restaurantAddress}
            </Text>
            <Text className="text-[11px] text-gray-400 mt-1">
              Tel: {res.contact?.phone || "N/A"} | {res.contact?.email || "N/A"}
            </Text>
          </View>

          <View className="pt-4 border-t border-gray-50 flex-row items-center justify-between">
            <View className="flex-col">
              <Text className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Precio Promedio
              </Text>
              <Text className="text-base font-bold text-[#0a192f]">
                Q.{Number(res.averagePrice || 0).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};