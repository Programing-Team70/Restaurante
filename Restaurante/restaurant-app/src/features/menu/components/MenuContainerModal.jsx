import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import {
  XCircle,
  Layers,
  DollarSign,
  Tag,
  CheckCircle2,
  Edit3,
  Trash2,
} from "lucide-react-native";

export const MenuContainerModal = ({
  isOpen,
  onClose,
  selectedPlate,
  onEditClick,
  onDeleteClick,
}) => {
  if (!isOpen || !selectedPlate) return null;

  const handleDelete = () => {
    Alert.alert(
      "Eliminar Platillo",
      `¿Está seguro de que desea eliminar "${selectedPlate.name}" de Heaven Flavor?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onDeleteClick(selectedPlate),
        },
      ],
    );
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl overflow-hidden">
          <View className="bg-[#0a192f] px-8 py-5 flex-row items-center justify-between">
            <View>
              <View className="bg-white/10 px-2.5 py-1 rounded-full mb-1 self-start">
                <Text className="text-blue-200 text-[10px] font-bold uppercase">
                  {selectedPlate.type || "Platillo"}
                </Text>
              </View>
              <Text className="text-xl font-bold text-white px-1">
                {selectedPlate.name}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-2">
              <XCircle size={22} color="#d1d5db" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-5 space-y-4">
            <View className="space-y-1.5">
              <View className="flex-row items-center gap-1.5">
                <Layers size={13} color="#9ca3af" />
                <Text className="text-[11px] font-bold uppercase text-gray-400">
                  Descripción
                </Text>
              </View>
              <View className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Text className="text-gray-600 leading-relaxed">
                  {selectedPlate.description ||
                    "Este platillo no cuenta con una descripción."}
                </Text>
              </View>
            </View>

            <View className="flex-row gap-2">
              <View className="flex-1 space-y-1 bg-blue-50/50 border border-blue-100/50 p-3.5 rounded-xl">
                <View className="flex-row items-center gap-1.5">
                  <DollarSign size={12} color="#9ca3af" />
                  <Text className="text-[10px] font-bold uppercase text-gray-400">
                    Precio
                  </Text>
                </View>
                <Text className="text-lg font-black text-[#0a192f]">
                  Q.{Number(selectedPlate.price || 0).toFixed(2)}
                </Text>
              </View>

              <View className="flex-1 space-y-1 bg-gray-50 p-3.5 rounded-xl">
                <View className="flex-row items-center gap-1.5">
                  <Tag size={12} color="#9ca3af" />
                  <Text className="text-[10px] font-bold uppercase text-gray-400">
                    Estado
                  </Text>
                </View>
                <View className="flex-row items-center gap-1.5 mt-1">
                  {selectedPlate.isAvailable ? (
                    <View className="flex-row items-center gap-1">
                      <CheckCircle2 size={14} color="#16a34a" />
                      <Text className="text-green-700 text-xs font-bold">
                        Disponible
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center gap-1">
                      <XCircle size={14} color="#dc2626" />
                      <Text className="text-red-700 text-xs font-bold">
                        No Disponible
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View className="space-y-2">
              <Text className="text-[11px] font-bold uppercase text-gray-400">
                Ingredientes
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {Array.isArray(selectedPlate.ingredients) &&
                selectedPlate.ingredients.length > 0 ? (
                  selectedPlate.ingredients.map((ing, index) => (
                    <View
                      key={index}
                      className="bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200/60"
                    >
                      <Text className="text-gray-700 text-xs font-medium">
                        {ing}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-xs text-gray-400 italic">
                    No se especificaron ingredientes para esta receta.
                  </Text>
                )}
              </View>
            </View>

            <View className="pt-4 border-t border-gray-100 flex-row items-center justify-between gap-4">
              <View className="flex flex-col gap-0.5">
                <Text className="text-[10px] text-gray-400">
                  <Text className="font-bold">ID Menú:</Text>{" "}
                  {String(selectedPlate._id || selectedPlate.id || "N/A")}
                </Text>
                <Text className="text-[10px] text-gray-400">
                  <Text className="font-bold">ID Relación:</Text>{" "}
                  {String(selectedPlate.restaurant || "Global")}
                </Text>
              </View>

              <View className="flex-row items-center gap-2 mx-5">
                <TouchableOpacity
                  onPress={handleDelete}
                  className="flex-row items-center bg-red-50 px-2 py-2 rounded-xl border border-red-200"
                >
                  <Trash2 size={25} color="#dc2626" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onEditClick}
                  className="flex-row items-center bg-blue-600 px-2 py-2 rounded-xl"
                >
                  <Edit3 size={25} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
