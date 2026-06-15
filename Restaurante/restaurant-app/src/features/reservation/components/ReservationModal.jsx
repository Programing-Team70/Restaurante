import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { XCircle } from "lucide-react-native";

export const ReservationModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    restaurantId: "",
    tableId: "",
    customerName: "",
    customerPhone: "",
    type: "mesa",
    date: "",
    guests: 1,
    status: "pendiente",
    notes: "",
    isAvalible: true,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      let formattedDate = "";
      if (initialData.date) {
        const d = new Date(initialData.date);
        formattedDate = d.toISOString().slice(0, 16);
      }

      setFormData({
        restaurantId: initialData.restaurantId || "",
        tableId: initialData.tableId || "",
        customerName: initialData.customerName || "",
        customerPhone: initialData.customerPhone || "",
        type: initialData.type || "mesa",
        date: formattedDate,
        guests: initialData.guests || 1,
        status: initialData.status || "pendiente",
        notes: initialData.notes || "",
        isAvalible:
          initialData.isAvalible !== undefined ? initialData.isAvalible : true,
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });
    } else {
      setFormData({
        restaurantId: "",
        tableId: "",
        customerName: "",
        customerPhone: "",
        type: "mesa",
        date: "",
        guests: 1,
        status: "pendiente",
        notes: "",
        isAvalible: true,
        isActive: true,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Aseguramos que 'guests' viaje como un tipo numérico entero
      const normalizedPayload = {
        ...formData,
        guests: parseInt(formData.guests, 10) || 1,
      };

      const payload = isEditMode
        ? { ...normalizedPayload, _id: initialData._id || initialData.id }
        : normalizedPayload;

      await onSave(payload);
      onClose();
    } catch (error) {
      console.error("Error al procesar la reservación: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-[#0a192f]/40 p-4">
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
          <View className="bg-[#0a192f] px-10 py-4 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold tracking-wide text-white">
                {isEditMode ? "Modificar Reservación" : "Crear Reservación"}
              </Text>
              <Text className="text-xs text-gray-300 font-normal mt-0.5">
                {isEditMode
                  ? "Modifique una reservación Heaven Flavor"
                  : "Cree una nueva reservación Heaven Flavor"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              disabled={isSubmitting}
              className="p-1.5"
            >
              <XCircle size={22} color="#d1d5db" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-10 space-y-5 flex-1">
            <View className="flex-row gap-6">
              <View className="flex-1">
                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Nombre del Cliente
                </Text>
                <TextInput
                  value={formData.customerName}
                  onChangeText={(text) => handleChange("customerName", text)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="Ej. Carlos Mendoza"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              <View className="flex-1">
                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Teléfono
                </Text>
                <TextInput
                  value={formData.customerPhone}
                  onChangeText={(text) => handleChange("customerPhone", text)}
                  keyboardType="number-pad"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="Ej. 45892311"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View className="flex-row gap-6">
              <View className="flex-1">
                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Tipo
                </Text>
                <View className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white">
                  <TextInput
                    value={formData.type}
                    onChangeText={(text) => handleChange("type", text)}
                    className="text-sm font-medium text-gray-800"
                    placeholder="mesa, domicilio, para llevar"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
              <View className="flex-1">
                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Fecha y Hora
                </Text>
                <TextInput
                  value={formData.date}
                  onChangeText={(text) => handleChange("date", text)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="YYYY-MM-DDTHH:MM"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              <View className="flex-1">
                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Comensales
                </Text>
                <TextInput
                  value={String(formData.guests)}
                  onChangeText={(text) => handleChange("guests", text)}
                  keyboardType="number-pad"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View className="flex-row gap-6">
              <View className="flex-1">
                <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Restaurante
                </Text>
                <TextInput
                  value={formData.restaurantId}
                  onChangeText={(text) => handleChange("restaurantId", text)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 bg-white"
                  placeholder="ID del restaurante"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              {formData.type === "mesa" && (
                <View className="flex-1">
                  <Text className="block text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                    Mesa
                  </Text>
                  <TextInput
                    value={formData.tableId}
                    onChangeText={(text) => handleChange("tableId", text)}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50/20 text-xs font-mono text-gray-800"
                    placeholder="ID de la mesa"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              )}
            </View>

            {isEditMode && (
              <View className="flex-row gap-6 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-1">
                  <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                    Estado
                  </Text>
                  <View className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white">
                    <TextInput
                      value={formData.status}
                      onChangeText={(text) => handleChange("status", text)}
                      className="text-sm font-medium text-gray-800"
                      placeholder="pendiente, confirmada, en curso, completada, cancelada"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                </View>
                <View className="flex-row gap-2 pt-4">
                  <TouchableOpacity
                    onPress={() =>
                      handleChange("isAvalible", !formData.isAvalible)
                    }
                    className={`px-3 py-1.5 rounded-lg ${formData.isAvalible ? "bg-green-100" : "bg-red-100"}`}
                  >
                    <Text
                      className={`text-sm font-semibold ${formData.isAvalible ? "text-green-700" : "text-red-700"}`}
                    >
                      {formData.isAvalible ? "Disponible" : "No Disponible"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View>
              <Text className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                Notas
              </Text>
              <TextInput
                value={formData.notes}
                onChangeText={(text) => handleChange("notes", text)}
                multiline
                numberOfLines={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white text-top"
                placeholder="Ej. El cliente solicita mesa cerca de la ventana y es alérgico a los mariscos."
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="pt-6 flex-row justify-end space-x-3 border-t border-gray-100">
              <TouchableOpacity
                onPress={onClose}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl border border-gray-200"
              >
                <Text className="text-sm font-semibold text-gray-600">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                className={`px-5 py-2.5 rounded-xl ${
                  isSubmitting ? "bg-gray-400" : "bg-[#0a192f]"
                }`}
              >
                <Text className="text-white text-sm font-semibold">
                  {isSubmitting
                    ? "Procesando..."
                    : isEditMode
                      ? "Actualizar"
                      : "Guardar"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
