import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Plus, Search } from "lucide-react-native";
import { useMenuStore } from "../store/MenuStore.js";
import { MenuContainer } from "../components/MenuContainer.jsx";
import { MenuContainerModal } from "../components/MenuContainerModal.jsx";
import { MenuModal } from "../components/MenuModal.jsx";
import { useSaveMenu } from "../hooks/UseMenu.js";

export const MenuPage = () => {
  const menus = useMenuStore((state) => state.menus);
  const loading = useMenuStore((state) => state.loading);
  const error = useMenuStore((state) => state.error);
  const getMenus = useMenuStore((state) => state.getMenus);
  const getMenusByRestaurant = useMenuStore(
    (state) => state.getMenusByRestaurant,
  );
  const { saveMenu } = useSaveMenu();

  const [searchId, setSearchId] = useState("");
  const [searchType, setSearchType] = useState("menu");
  const [selectedPlate, setSelectedPlate] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    if (searchType === "menu") {
      await getMenus(searchId.trim());
    } else {
      await getMenusByRestaurant(searchId.trim());
    }
  };

  const handleOpenDetail = (plate) => {
    setSelectedPlate(plate);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedPlate(null);
    setIsDetailOpen(false);
  };

  const handleTransformToEdit = () => {
    setIsDetailOpen(false);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setSelectedPlate(null);
    setIsModalOpen(true);
  };

  const handleDeletePlate = async (plateToDisable) => {
    try {
      await saveMenu({ ...plateToDisable, isActive: false });
      if (plateToDisable.restaurant) {
        setSearchType("restaurant");
        setSearchId(plateToDisable.restaurant);
      }
      setIsDetailOpen(false);
      setSelectedPlate(null);
    } catch (err) {
      console.error("Error al desactivar el platillo:", err);
    }
  };

  const handleSaveMenu = async (newMenuData) => {
    try {
      await saveMenu(newMenuData);
      if (newMenuData.restaurant) {
        setSearchType("restaurant");
        setSearchId(newMenuData.restaurant);
      }
      setIsModalOpen(false);
      setSelectedPlate(null);
    } catch (err) {
      console.error("Error al procesar el platillo en Heaven Flavor:", err);
    }
  };

  return (
    <ScrollView className="w-full py-10 px-6 space-y-8">
      <View className="flex-row justify-between items-center border-b border-gray-100 pb-4">
        <View className="space-y-1">
          <Text className="text-3xl font-bold text-[#0a192f]">Menú</Text>
          <Text className="text-gray-500 italic text-sm">
            Gestión de platillos
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleOpenCreateModal}
          className="flex-row items-center mx-6 bg-[#0a192f] px-5 py-3 rounded-lg"
        >
          <Plus size={18} strokeWidth={2.5} color="white" />
          <Text className="text-white font-semibold tracking-wide">
            Nuevo
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View className="bg-red-50 p-4 rounded-xl border border-red-100">
          <Text className="text-red-600 text-sm font-medium text-left">
            {error}
          </Text>
        </View>
      )}

      <View className="bg-white p-4 rounded-2xl border border-gray-100 flex-col gap-2">
        <View className="flex-row bg-gray-100 rounded-xl">
          <TouchableOpacity
            onPress={() => setSearchType("menu")}
            className={`flex-1 px-4 py-2 rounded-lg items-center ${searchType === "menu" ? "bg-[#0a192f]" : ""}`}
          >
            <Text
              className={`text-xs font-bold uppercase ${searchType === "menu" ? "text-white" : "text-gray-500"}`}
            >
              ID Menú
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSearchType("restaurant")}
            className={`flex-1 px-4 py-2 rounded-lg items-center ${searchType === "restaurant" ? "bg-[#0a192f]" : ""}`}
          >
            <Text
              className={`text-xs font-bold uppercase ${searchType === "restaurant" ? "text-white" : "text-gray-500"}`}
            >
              ID Restaurante
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-3 w-full items-center">
          <View className="relative flex-1 justify-center">
            <Search
              className="absolute left-3.5 text-gray-400 z-10"
              size={18}
            />
            <TextInput
              value={searchId}
              onChangeText={(text) => setSearchId(text)}
              placeholder={`Buscar por ID del ${searchType === "menu" ? "platillo" : "restaurante"}...`}
              placeholderTextColor="#9ca3af"
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
            />
          </View>
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-gray-100 px-5 py-3 rounded-xl justify-center items-center"
          >
            <Text className="text-[#0a192f] font-bold text-xs uppercase">
              Buscar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View className="items-center justify-center py-12">
          <ActivityIndicator size="small" color="#9ca3af" className="mb-3" />
          <Text
            style={{ letterSpacing: 2.0 }}
            className="text-center text-gray-400 uppercase text-[10px] px-4 font-semibold"
          >
            Sincronizando con la base de datos Heaven Flavor...
          </Text>
        </View>
      ) : (
        <View className="flex-row flex-wrap gap-6">
          {Array.isArray(menus) &&
          menus.filter((plate) => plate && (plate._id || plate.id)).length >
            0 ? (
            menus
              .filter((plate) => plate && (plate._id || plate.id))
              .map((plate) => (
                <View
                  key={plate._id || plate.id}
                  className="w-[calc(50%-12px)]"
                >
                  <MenuContainer
                  plate={plate}
                  onClick={() => handleOpenDetail(plate)}
                  />
                </View>
              ))
          ) : (
            <View className="w-full py-12 items-center">
              <Text className="text-gray-400 text-sm italic text-center">
                {searchId.trim()
                  ? "No se encontraron platillos registrados para esta consulta."
                  : "Ingrese un ID de platillo o de restaurante en el buscador superior para consultar su distribución."}
              </Text>
            </View>
          )}
        </View>
      )}

      <MenuContainerModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        selectedPlate={selectedPlate}
        onEditClick={handleTransformToEdit}
        onDeleteClick={handleDeletePlate}
      />

      <MenuModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlate(null);
        }}
        onSave={handleSaveMenu}
        initialData={selectedPlate}
      />
    </ScrollView>
  );
};
