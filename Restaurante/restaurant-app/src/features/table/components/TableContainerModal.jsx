import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import {
  XCircle,
  Users,
  MapPin,
  Tag,
  CheckCircle2,
  Clock,
  Edit3,
  Trash2,
} from "lucide-react-native";

export const TableContainerModal = ({
  isOpen,
  onClose,
  selectedTable,
  onEditClick,
  onDeleteClick,
}) => {
  if (!selectedTable) return null;

  const handleDelete = () => {
    Alert.alert(
      "Eliminar Mesa",
      `¿Está seguro de que desea eliminar la mesa ubicada en "${selectedTable?.location || "Sin ubicación"}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onDeleteClick(selectedTable),
        },
      ],
    );
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl overflow-hidden">
          <View className="bg-[#0a192f] px-8 py-5 flex-row items-center justify-between">
            <View>
              <View className="bg-white/10 px-2.5 py-1 rounded-full mb-1 self-start">
                <Text
                  style={{ letterSpacing: 1.2 }}
                  className="text-[10px] text-blue-200 font-bold uppercase"
                >
                  Mesa
                </Text>
              </View>
              <Text className="text-xl font-bold text-white px-1">
                {selectedTable
                  ? selectedTable.location || "Mesa del Establecimiento"
                  : "Mesa del Establecimiento"}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-2">
              <XCircle size={22} color="#d1d5db" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-5 space-y-4">
            <View className="space-y-1.5">
              <View className="flex-row items-center gap-1.5">
                <MapPin size={13} color="#9ca3af" />
                <Text
                  style={{ letterSpacing: 1.2 }}
                  className="text-[11px] font-bold uppercase text-gray-400"
                >
                  Ubicación
                </Text>
              </View>
              <View className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <Text className="text-gray-600 leading-relaxed font-medium">
                  {selectedTable
                    ? selectedTable.location ||
                      "No se ha ingresado una localización para esta mesa."
                    : "No se ha ingresado una localización para esta mesa."}
                </Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1 bg-blue-50/50 border border-blue-100/50 p-3.5 rounded-xl">
                <View className="flex-row items-center gap-1.5">
                  <Users size={12} color="#9ca3af" />
                  <Text
                    style={{ letterSpacing: 1.2 }}
                    className="text-[10px] font-bold uppercase text-gray-400"
                  >
                    Capacidad
                  </Text>
                </View>
                <Text className="text-lg font-black text-[#0a192f] mt-1">
                  {selectedTable ? Number(selectedTable.capacity || 0) : 0}{" "}
                  Comensales
                </Text>
              </View>

              <View className="flex-1 bg-gray-50 p-3.5 rounded-xl">
                <View className="flex-row items-center gap-1.5">
                  <Tag size={12} color="#9ca3af" />
                  <Text
                    style={{ letterSpacing: 1.2 }}
                    className="text-[10px] font-bold uppercase text-gray-400"
                  >
                    Estado
                  </Text>
                </View>
                <View className="flex-row items-center gap-1.5 mt-1">
                  {selectedTable && selectedTable.isAvailable ? (
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
              <View className="flex-row items-center gap-1.5">
                <Clock size={13} color="#9ca3af" />
                <Text
                  style={{ letterSpacing: 1.2 }}
                  className="text-[11px] font-bold uppercase text-gray-400"
                >
                  Horarios
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {selectedTable &&
                Array.isArray(selectedTable.availableHours) &&
                selectedTable.availableHours.length > 0 ? (
                  selectedTable.availableHours.map((hour, index) => (
                    <View
                      key={index}
                      className="bg-gray-100 flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200/60"
                    >
                      <View className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <Text className="text-gray-700 text-xs font-semibold">
                        {hour?.start} - {hour?.end}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-xs text-gray-400 italic">
                    No hay horarios programados para esta mesa.
                  </Text>
                )}
              </View>
            </View>

            <View className="pt-4 border-t border-gray-100 flex-row items-center justify-between gap-4">
              <View className="flex-col gap-0.5">
                <Text className="text-[10px] text-gray-400">
                  <Text className="font-bold">ID Mesa:</Text>{" "}
                  {selectedTable
                    ? String(selectedTable._id || selectedTable.id || "N/A")
                    : "N/A"}
                </Text>
                <Text className="text-[10px] text-gray-400">
                  <Text className="font-bold">ID Relación:</Text>{" "}
                  {selectedTable
                    ? String(selectedTable.restaurant || "No asignado")
                    : "No asignado"}
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
