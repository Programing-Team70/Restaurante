import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Plus, Search } from "lucide-react-native";
import { useTableStore } from "../store/TableStore.js";
import { TableContainer } from "../components/TableContainer.jsx";
import { TableContainerModal } from "../components/TableContainerModal.jsx";
import { TableModal } from "../components/TableModal.jsx";
import { useSaveTable } from "../hooks/UseTables.js";

export const TablePage = () => {
  const tables = useTableStore((state) => state.tables);
  const loading = useTableStore((state) => state.loading);
  const error = useTableStore((state) => state.error);
  const getTables = useTableStore((state) => state.getTables);
  const getTablesByRestaurant = useTableStore(
    (state) => state.getTablesByRestaurant,
  );

  const { saveTable } = useSaveTable();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchType, setSearchType] = useState("table");
  const [selectedTable, setSelectedTable] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    if (searchType === "table") {
      await getTables(searchId.trim());
    } else {
      await getTablesByRestaurant(searchId.trim());
    }
  };

  const handleOpenDetail = (table) => {
    setSelectedTable(table);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => {
      setSelectedTable(null);
    }, 200);
  };

  const handleTransformToEdit = () => {
    setIsDetailOpen(false);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setSelectedTable(null);
    setIsModalOpen(true);
  };

  const handleDeleteTable = async (tableToDisable) => {
    try {
      setIsDetailOpen(false);

      await saveTable({
        ...tableToDisable,
        isActive: false,
      });

      if (tableToDisable.restaurant) {
        setSearchType("restaurant");
        setSearchId(tableToDisable.restaurant);
      }

      setTimeout(() => {
        setSelectedTable(null);
      }, 200);
    } catch (err) {
      console.error("Error al desactivar la mesa:", err);
    }
  };

  const handleSaveTable = async (newTableData) => {
    try {
      setIsModalOpen(false);

      await saveTable(newTableData);

      if (newTableData.restaurant) {
        setSearchType("restaurant");
        setSearchId(newTableData.restaurant);
      }

      setTimeout(() => {
        setSelectedTable(null);
      }, 200);
    } catch (err) {
      console.error("Error al procesar la mesa en Heaven Flavor:", err);
    }
  };

  return (
    <ScrollView className="w-full py-10 px-6 space-y-8">
      <View className="flex-row justify-between items-center border-b border-gray-100 pb-5">
        <View className="space-y-1">
          <Text className="text-3xl font-bold text-[#0a192f]">Mesas</Text>
          <Text className="text-gray-500 italic text-sm">
            Gestión de mesas
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleOpenCreateModal}
          className="flex-row items-center mx-6 bg-[#0a192f] px-5 py-3 rounded-lg"
        >
          <Plus size={18} strokeWidth={2.5} color="white" />
          <Text className="text-white font-semibold">Nuevo</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View className="bg-red-50 p-4 rounded-xl border border-red-100">
          <Text className="text-red-600 text-sm font-medium">{error}</Text>
        </View>
      )}

      <View className="bg-white p-4 rounded-2xl border border-gray-100 flex-col gap-2">
        <View className="flex-row bg-gray-100 rounded-xl">
          <TouchableOpacity
            onPress={() => setSearchType("table")}
            className={`flex-1 px-4 py-2 rounded-lg items-center justify-center ${searchType === "table" ? "bg-[#0a192f]" : ""}`}
          >
            <Text
              style={{ letterSpacing: 0.8 }}
              className={`text-xs font-bold uppercase ${searchType === "table" ? "text-white" : "text-gray-500"}`}
            >
              ID Mesa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSearchType("restaurant")}
            className={`flex-1 px-4 py-2 rounded-lg items-center justify-center ${searchType === "restaurant" ? "bg-[#0a192f]" : ""}`}
          >
            <Text
              style={{ letterSpacing: 0.8 }}
              className={`text-xs font-bold uppercase ${searchType === "restaurant" ? "text-white" : "text-gray-500"}`}
            >
              ID Restaurante
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-3.5 z-10">
              <Search size={18} color="#9ca3af" />
            </View>
            <TextInput
              value={searchId}
              onChangeText={setSearchId}
              placeholder={`Buscar por ID ${searchType === "table" ? "de la mesa" : "del restaurante"}...`}
              placeholderTextColor="#9ca3af"
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
            />
          </View>
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-gray-100 px-5 rounded-xl items-center justify-center"
          >
            <Text
              style={{ letterSpacing: 0.8 }}
              className="text-[#0a192f] font-bold text-xs uppercase"
            >
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
          {Array.isArray(tables) &&
          tables.filter((t) => t && (t._id || t.id)).length > 0 ? (
            tables
              .filter((table) => table && (table._id || table.id))
              .map((table) => (
                <View
                  key={table._id || table.id}
                  className="w-[calc(50%-12px)]"
                >
                  <TableContainer
                    table={table}
                    onClick={() => handleOpenDetail(table)}
                  />
                </View>
              ))
          ) : (
            <View className="w-full items-center justify-center py-12">
              <Text className="text-gray-400 text-sm italic text-center px-4">
                {searchId.trim()
                  ? "No se encontraron mesas registradas para esta consulta."
                  : "Ingrese un ID de mesa o de restaurante en el buscador superior para consultar su distribución."}
              </Text>
            </View>
          )}
        </View>
      )}

      <TableContainerModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        selectedTable={selectedTable}
        onEditClick={handleTransformToEdit}
        onDeleteClick={handleDeleteTable}
      />

      <TableModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTable(null);
        }}
        onSave={handleSaveTable}
        initialData={selectedTable}
      />
    </ScrollView>
  );
};
