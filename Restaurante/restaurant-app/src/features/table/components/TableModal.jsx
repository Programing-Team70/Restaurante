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
import {
  XCircle,
  Clock,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react-native";

export const TableModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    restaurant: "",
    capacity: "",
    location: "",
    isAvailable: true,
    isActive: true,
  });

  const [availableHours, setAvailableHours] = useState([
    { start: "12:00", end: "14:00" },
  ]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        restaurant: initialData.restaurant || "",
        capacity: initialData.capacity ? String(initialData.capacity) : "",
        location: initialData.location || "",
        isAvailable:
          initialData.isAvailable !== undefined
            ? initialData.isAvailable
            : true,
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });
      if (
        Array.isArray(initialData.availableHours) &&
        initialData.availableHours.length > 0
      ) {
        setAvailableHours(initialData.availableHours);
      } else {
        setAvailableHours([{ start: "", end: "" }]);
      }
    } else {
      setFormData({
        restaurant: "",
        capacity: "",
        location: "",
        isAvailable: true,
        isActive: true,
      });
      setAvailableHours([{ start: "12:00", end: "14:00" }]);
    }
  }, [initialData, isOpen]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleAvailableState = () => {
    setFormData((prev) => ({
      ...prev,
      isAvailable: !prev.isAvailable,
    }));
  };

  const handleHourChange = (index, field, value) => {
    const updatedHours = [...availableHours];
    updatedHours[index][field] = value;
    setAvailableHours(updatedHours);
  };

  const addHourRange = () => {
    setAvailableHours([...availableHours, { start: "", end: "" }]);
  };

  const removeHourRange = (index) => {
    if (availableHours.length === 1) return;
    setAvailableHours(availableHours.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const validHours = availableHours.filter(
        (hour) => hour.start && hour.end,
      );

      const processedData = {
        ...(initialData || {}),
        ...formData,
        capacity: Number(formData.capacity),
        availableHours: validHours,
      };

      await onSave(processedData);
      onClose();
    } catch (error) {
      console.error("Error al guardar la mesa:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-[#0a192f]/40 p-4">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
          <View className="bg-[#0a192f] px-10 py-4 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-white">
                {initialData ? "Modificar Mesa" : "Crear Mesa"}
              </Text>
              <Text className="text-xs text-gray-300 font-normal mt-0.5">
                Gestione las mesas
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-1.5">
              <XCircle size={22} color="#d1d5db" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-5 space-y-4 flex-2">
            <View>
              <Text
                style={{ letterSpacing: 0.8 }}
                className="text-xs font-bold uppercase text-[#0a192f] mb-2"
              >
                ID del Restaurante
              </Text>
              <TextInput
                value={formData.restaurant}
                onChangeText={(text) => handleChange("restaurant", text)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                placeholder="Ej. ID hexadecimal de 24 caracteres"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text
                  style={{ letterSpacing: 0.8 }}
                  className="text-xs font-bold uppercase text-[#0a192f] mb-2"
                >
                  Capacidad
                </Text>
                <TextInput
                  value={formData.capacity}
                  onChangeText={(text) => handleChange("capacity", text)}
                  keyboardType="number-pad"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="Ej. 4"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View className="flex-1">
                <Text
                  style={{ letterSpacing: 0.8 }}
                  className="text-xs font-bold uppercase text-[#0a192f] mb-2"
                >
                  Ubicación
                </Text>
                <TextInput
                  value={formData.location}
                  onChangeText={(text) => handleChange("location", text)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="Ej. Terraza - Zona Norte, junto a la ventana"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {initialData && (
              <View className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-row items-center justify-between">
                <View className="space-y-0.5 flex-1 pr-4">
                  <Text
                    style={{ letterSpacing: 0.8 }}
                    className="text-xs font-bold uppercase text-[#0a192f]"
                  >
                    Disponible
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {formData.isAvailable
                      ? "La mesa se encuentra disponible actualmente."
                      : "La mesa no se encuentra disponible actualmente."}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={toggleAvailableState}
                  className={`flex-row items-center gap-2 px-4 py-2 rounded-xl border ${
                    formData.isAvailable
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  {formData.isAvailable ? (
                    <View className="flex-row items-center gap-2">
                      <ToggleRight size={18} color="#16a34a" />
                      <Text className="text-green-700 text-xs font-bold">
                        Disponible
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center gap-2">
                      <ToggleLeft size={18} color="#ef4444" />
                      <Text className="text-red-600 text-xs font-bold">
                        No Disponible
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}

            <View className="bg-gray-50/60 p-5 rounded-xl border border-gray-100 space-y-4">
              <View className="flex-row items-center justify-between border-b border-gray-200/60 pb-2">
                <View className="flex-row items-center gap-2">
                  <Clock size={16} color="#9ca3af" />
                  <Text
                    style={{ letterSpacing: 1.2 }}
                    className="text-[11px] font-bold uppercase text-gray-400"
                  >
                    Horarios
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={addHourRange}
                  className="flex-row items-center gap-1"
                >
                  <Plus size={12} strokeWidth={3} color="#0a192f" />
                  <Text className="text-[11px] font-bold text-[#0a192f] uppercase">
                    Añadir Rango
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="space-y-3 max-h-[160px]">
                {availableHours.map((hour, index) => (
                  <View key={index} className="flex-row items-center gap-4">
                    <View className="flex-1 flex-row gap-2">
                      <View className="flex-1">
                        <Text
                          style={{ letterSpacing: 0.8 }}
                          className="text-[10px] font-bold uppercase text-gray-400 mb-2"
                        >
                          Entrada
                        </Text>
                        <TextInput
                          value={hour.start}
                          onChangeText={(text) =>
                            handleHourChange(index, "start", text)
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-800"
                          placeholder="HH:MM"
                          placeholderTextColor="#9ca3af"
                        />
                      </View>
                      <View className="flex-1">
                        <Text
                          style={{ letterSpacing: 0.8 }}
                          className="text-[10px] font-bold uppercase text-gray-400 mb-1"
                        >
                          Salida
                        </Text>
                        <TextInput
                          value={hour.end}
                          onChangeText={(text) =>
                            handleHourChange(index, "end", text)
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-800"
                          placeholder="HH:MM"
                          placeholderTextColor="#9ca3af"
                        />
                      </View>
                    </View>

                    {availableHours.length > 1 && (
                      <TouchableOpacity
                        onPress={() => removeHourRange(index)}
                        className="mt-5 p-2"
                      >
                        <Trash2 size={16} color="#9ca3af" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>

            <View className="pt-6 flex-row justify-end space-x-3 border-t border-gray-100">
              <TouchableOpacity
                onPress={onClose}
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
                  {isSubmitting ? "Procesando..." : "Guardar"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
