import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { LogOut } from "lucide-react-native";
import { useAuthStore } from "../../../features/auth/store/AuthStore";
import logo from "../../../assets/img/app-logo.jpeg";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const logout = useAuthStore((state) => state.logout);

  const items = [
    { label: "Principal", screen: "MainTab" },
    { label: "Mesas", screen: "TableTab" },
    { label: "Menu", screen: "MenuTab" },
    { label: "Ordenes", screen: "OrderTab" }
  ];

  return (
    <>
      <TouchableOpacity
        className="absolute left-5 top-5 z-50 bg-[#0a192f] border border-[#3b82f6] rounded p-4"
        onPress={toggleSidebar}
      >
        <Text className="text-white">{isOpen ? "✕" : "☰"}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View className="absolute left-0 top-0 bottom-0 w-64 bg-[#0a192f] z-40 p-8 flex flex-col">
          <View className="w-full justify-center items-center pb-8 mb-4 border-b border-[#112240]">
            <Image source={logo} className="w-32 h-32" resizeMode="contain" />
          </View>
          <ScrollView className="flex-1">
            <View className="space-y-2">
              {items.map((item) => (
                <TouchableOpacity
                  key={item.screen}
                  className="p-3 mb-2 rounded bg-[#112240]"
                  onPress={() => {}}
                >
                  <Text className="text-white text-base">{item.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={logout}
                className="p-3 mb-2 rounded bg-red-900/30 flex-row items-center gap-2"
              >
                <LogOut size={18} color="#ef4444" />
                <Text className="text-red-400 text-base">Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};
