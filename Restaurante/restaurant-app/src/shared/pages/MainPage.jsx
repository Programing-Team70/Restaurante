import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Utensils, CalendarDays, ClipboardList } from "lucide-react-native";
import logo from "../../../assets/app-icon.jpeg";

export const MainPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="w-full m-0 p-0 flex-col space-y-5">
      <View className="bg-[#0a192f] min-h-[300px] py-15 px-5 text-white shadow-2xl relative overflow-hidden flex-col items-center justify-center">
        <View className="relative z-10 w-full max-w-4xl flex-col items-center">
          <View className="mb-8 overflow-hidden rounded-full border-2 border-white/10 shadow-xl">
            <Image source={logo} className="w-24 h-24" resizeMode="contain" />
          </View>
          <Text className="text-3xl font-bold tracking-tight text-white text-center">
            Heaven Flavor
          </Text>
          <Text className="mt-6 text-blue-100/80 text-xl font-light italic leading-relaxed text-center max-w-2xl">
            "Pureza y elegancia en cada detalle."
          </Text>
        </View>
        <View className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <View className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
      </View>

      <View className="px-10 rounded-3xl gap-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderTab")}
          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex-col items-center"
        >
          <View className="bg-blue-50 p-4 rounded-full mb-4">
            <ClipboardList size={32} color="#0a192f" />
          </View>
          <Text className="text-xl font-bold text-[#0a192f] text-center">
            Órdenes
          </Text>
          <Text className="text-gray-500 mt-2 text-sm leading-relaxed text-center">
            Monitorea y atiende pedidos en tiempo real.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuTab")}
          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex-col items-center"
        >
          <View className="bg-blue-50 p-4 rounded-full mb-4">
            <Utensils size={32} color="#0a192f" />
          </View>
          <Text className="text-xl font-bold text-[#0a192f] text-center">
            Menú del Día
          </Text>
          <Text className="text-gray-500 mt-2 text-sm leading-relaxed text-center">
            Actualiza platos y precios.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
