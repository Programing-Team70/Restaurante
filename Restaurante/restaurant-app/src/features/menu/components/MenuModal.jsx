import React, { useState, useEffect } from "react";
import RNPickerSelect from 'react-native-picker-select';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet
} from "react-native";
import {
  XCircle,
  FileText,
  ToggleLeft,
  ToggleRight,
} from "lucide-react-native";

export const MenuModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    restaurant: "",
    type: "",
    ingredients: "",
    isAvailable: true,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id || initialData.id,
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price ? String(initialData.price) : "",
        restaurant: initialData.restaurant || "",
        type: initialData.type || "",
        ingredients: Array.isArray(initialData.ingredients)
          ? initialData.ingredients.join(", ")
          : "",
        isAvailable:
          initialData.isAvailable !== undefined
            ? initialData.isAvailable
            : true,
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        restaurant: "",
        type: "",
        ingredients: "",
        isAvailable: true,
        isActive: true,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const toggleAvailableState = () => {
    setFormData((prev) => ({ ...prev, isAvailable: !prev.isAvailable }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const processedData = {
        ...formData,
        price: Number(formData.price) || 0,
        ingredients: formData.ingredients
          ? formData.ingredients.split(",").map((ing) => ing.trim())
          : [],
      };
      await onSave(processedData);
      onClose();
    } catch (error) {
      console.error("Error al procesar el platillo: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-[#0a192f]/40 p-4">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl overflow-hidden max-h-[75vh] flex flex-col">
          <View className="bg-[#0a192f] px-10 py-4 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-white">
                {initialData ? "Modificar Platillo" : "Crear Platillo"}
              </Text>
              <Text className="text-xs text-gray-300 font-normal mt-0.5">
                {initialData
                  ? "Modificar platillo"
                  : "Crear platillo"}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-1.5">
              <XCircle size={22} color="#d1d5db" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="p-5 space-y-4 flex-2"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <View>
              <Text className="text-xs font-bold uppercase text-[#0a192f] mb-2">
                Nombre del Platillo
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                placeholder="Ej. Fettuccine Alfredo con Pollo"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View>
              <Text className="text-xs font-bold uppercase text-[#0a192f] mb-2">
                Descripción
              </Text>
              <TextInput
                value={formData.description}
                onChangeText={(text) => handleChange("description", text)}
                multiline
                numberOfLines={3}
                style={{ textAlignVertical: "top" }}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                placeholder="Ej. Pasta artesanal bañada en una cremosa salsa Alfredo..."
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text className="text-xs font-bold uppercase text-[#0a192f] mb-2">
                  Precio
                </Text>
                <TextInput
                  value={formData.price}
                  onChangeText={(text) => handleChange("price", text)}
                  keyboardType="decimal-pad"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="Ej. 0.00"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View className="flex-1">
                <Text className="text-xs font-bold uppercase text-[#0a192f] mb-2">
                  Restaurante
                </Text>
                <TextInput
                  value={formData.restaurant}
                  onChangeText={(text) => handleChange("restaurant", text)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="ID del restaurante"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold uppercase text-[#0a192f] mb-2">
                Tipo
              </Text>
              <View className="w-full px-4 rounded-xl border border-gray-200 bg-white">
                <RNPickerSelect
                  value={formData.type}
                  onValueChange={(value) => handleChange("type", value)}
                  placeholder={{ label: "Selecciona un tipo...", value: null, color: '#9ca3af' }}
                  items={[
                    { label: 'Entrada', value: 'entrada' },
                    { label: 'Plato fuerte', value: 'plato fuerte' },
                    { label: 'Postre', value: 'postre' },
                    { label: 'Bebida', value: 'bebida' },
                    { label: 'Acompañamiento', value: 'acompañamiento' },
                    { label: 'Combo', value: 'combo' },
                    { label: 'Otro', value: 'otro' },
                  ]}
                  style={pickerSelectStyles}
                />
              </View>
            </View>

            {initialData && (
              <View className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-row justify-between items-center">
                <View className="space-y-0.5">
                  <Text className="text-xs font-bold uppercase textPollo con caca-[#0a192f]">
                    Disponible
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {formData.isAvailable
                      ? "El platillo se encuentra disponible actualmente."
                      : "El platillo no se encuentra disponible actualmente."}
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
                    <ToggleRight size={18} color="#16a34a" />
                  ) : (
                    <ToggleLeft size={18} color="#dc2626" />
                  )}
                  <Text
                    className={`text-xs font-bold ${formData.isAvailable ? "text-green-700" : "text-red-600"}`}
                  >
                    {formData.isAvailable ? "Disponible" : "No Disponible"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View className="bg-gray-50/60 p-5 rounded-xl border border-gray-100 space-y-3">
              <View className="flex-row items-center gap-2 mb-1">
                <FileText size={16} color="#9ca3af" />
                <Text className="text-[11px] font-bold uppercase text-gray-400">
                  Detalles
                </Text>
              </View>
              <View>
                <Text className="text-[10px] font-bold uppercase text-gray-500 mb-1">
                  Ingredientes (Separados por comas)
                </Text>
                <TextInput
                  value={formData.ingredients}
                  onChangeText={(text) => handleChange("ingredients", text)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-800"
                  placeholder="Ej. Pasta fettuccine, Crema, Queso parmesano"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View className="pt-2 flex-row justify-end space-x-3 border-t border-gray-100">
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
                className={`px-5 py-2.5 rounded-xl ${isSubmitting ? "bg-gray-400" : "bg-[#0a192f]"}`}
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#1f2937',
    paddingRight: 20, 
  },
  inputAndroid: {
    color: '#1f2937', 
    paddingRight: 20,
  },
  placeholder: {
    color: '#9ca3af',
  },
});