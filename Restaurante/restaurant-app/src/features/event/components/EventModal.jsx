import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { XCircle } from "lucide-react-native";

export const EventModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  if (!isOpen) return null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    restaurantId: "",
    title: "",
    description: "",
    eventType: "cena temática",
    eventDate: "",
    capacity: 1,
    status: "programado",
    notes: "",
    resources: {
      music: "No requerida",
      decoration: "No requerida",
      extraStaffNeeded: 0,
      specialMenuItems: [],
    },
    isAvailable: true,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      let formattedDate = "";
      if (initialData.eventDate) {
        const d = new Date(initialData.eventDate);
        formattedDate = d.toISOString().slice(0, 16);
      }

      setFormData({
        restaurantId: initialData.restaurantId || "",
        title: initialData.title || "",
        description: initialData.description || "",
        eventType: initialData.eventType || "cena temática",
        eventDate: formattedDate,
        capacity: initialData.capacity || 1,
        status: initialData.status || "programado",
        notes: initialData.notes || "",
        resources: {
          music: initialData.resources?.music || "No requerida",
          decoration: initialData.resources?.decoration || "No requerida",
          extraStaffNeeded: initialData.resources?.extraStaffNeeded || 0,
          specialMenuItems: initialData.resources?.specialMenuItems || [],
        },
        isAvailable:
          initialData.isAvailable !== undefined
            ? initialData.isAvailable
            : true,
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });
    } else {
      setFormData({
        restaurantId: "",
        title: "",
        description: "",
        eventType: "cena temática",
        eventDate: "",
        capacity: 1,
        status: "programado",
        notes: "",
        resources: {
          music: "No requerida",
          decoration: "No requerida",
          extraStaffNeeded: 0,
          specialMenuItems: [],
        },
        isAvailable: true,
        isActive: true,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      resources: {
        ...prev.resources,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const payload = isEditMode
        ? { ...formData, _id: initialData._id || initialData.id }
        : formData;

      await onSave(payload);
      onClose();
    } catch (error) {
      console.error("Error al procesar el evento Heaven Flavor: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-[#0a192f]/40 p-4">
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-h-[85%] overflow-hidden z-10 flex flex-col">
          <View className="bg-[#0a192f] px-6 py-4 flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-bold text-white tracking-wide">
                {isEditMode ? "Modificar Evento" : "Crear Evento"}
              </Text>
              <Text className="text-xs text-gray-300 font-normal mt-0.5">
                {isEditMode
                  ? "Modifique un evento Heaven Flavor"
                  : "Cree un nuevo evento Heaven Flavor"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              disabled={isSubmitting}
              className="p-1.5 rounded-lg active:opacity-70"
            >
              <XCircle size={22} color="#d1d5db" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="p-6 flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View className="space-y-4">
              <View className="mb-4">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Nombre del Evento
                </Text>
                <TextInput
                  value={formData.title}
                  onChangeText={(val) =>
                    handleChange({ target: { name: "title", value: val } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="Ej. Festival del Marisco 2026"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View className="mb-4">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Restaurante
                </Text>
                <TextInput
                  value={formData.restaurantId}
                  onChangeText={(val) =>
                    handleChange({
                      target: { name: "restaurantId", value: val },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="ID del restaurante asignado"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View className="mb-4">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Descripción
                </Text>
                <TextInput
                  value={formData.description}
                  onChangeText={(val) =>
                    handleChange({
                      target: { name: "description", value: val },
                    })
                  }
                  multiline
                  numberOfLines={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white text-top"
                  placeholder="Describa el objetivo del evento..."
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View className="mb-4">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Tipo
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {[
                    "cena temática",
                    "promoción",
                    "degustación",
                    "festival",
                    "privado",
                  ].map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() =>
                        handleChange({
                          target: { name: "eventType", value: type },
                        })
                      }
                      className={`px-3 py-2 rounded-xl border ${
                        formData.eventType === type
                          ? "bg-[#0a192f] border-[#0a192f]"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold capitalize ${
                          formData.eventType === type
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Fecha y Hora
                </Text>
                <TextInput
                  value={formData.eventDate}
                  onChangeText={(val) =>
                    handleChange({ target: { name: "eventDate", value: val } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                  placeholder="AAAA-MM-DD HH:MM"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View className="mb-4">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Capacidad
                </Text>
                <TextInput
                  value={String(formData.capacity)}
                  onChangeText={(val) =>
                    handleChange({
                      target: { name: "capacity", value: Number(val) || 0 },
                    })
                  }
                  keyboardType="numeric"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white"
                />
              </View>

              <View className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-4">
                <Text className="text-xs font-bold tracking-widest text-blue-900 uppercase border-b border-gray-200 pb-2 mb-3">
                  Recursos y Logística del Evento
                </Text>

                <View className="space-y-3">
                  <View className="mb-2">
                    <Text className="text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Música
                    </Text>
                    <TextInput
                      value={formData.resources.music}
                      onChangeText={(val) =>
                        handleResourceChange({
                          target: { name: "music", value: val },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-800 bg-white"
                      placeholder="Ej. Banda en vivo o Enlatada"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>

                  <View className="mb-2">
                    <Text className="text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Estilo
                    </Text>
                    <TextInput
                      value={formData.resources.decoration}
                      onChangeText={(val) =>
                        handleResourceChange({
                          target: { name: "decoration", value: val },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-800 bg-white"
                      placeholder="Ej. Mantelería Imperial Azul"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>

                  <View className="mb-2">
                    <Text className="text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Meseros
                    </Text>
                    <TextInput
                      value={String(formData.resources.extraStaffNeeded)}
                      onChangeText={(val) =>
                        handleResourceChange({
                          target: {
                            name: "extraStaffNeeded",
                            value: Number(val) || 0,
                          },
                        })
                      }
                      keyboardType="numeric"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-800 bg-white"
                    />
                  </View>
                </View>
              </View>

              {isEditMode && (
                <View className="bg-blue-50/40 p-4 rounded-xl border border-blue-100/60 mb-4 space-y-3">
                  <View>
                    <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                      Estado del Evento
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {["programado", "activo", "finalizado", "cancelado"].map(
                        (statusOption) => (
                          <TouchableOpacity
                            key={statusOption}
                            onPress={() =>
                              handleChange({
                                target: { name: "status", value: statusOption },
                              })
                            }
                            className={`px-3 py-1.5 rounded-lg border ${
                              formData.status === statusOption
                                ? "bg-[#0a192f] border-[#0a192f]"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <Text
                              className={`text-xs font-medium capitalize ${
                                formData.status === statusOption
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            >
                              {statusOption}
                            </Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  </View>

                  <View className="pt-2 flex-row justify-start">
                    <TouchableOpacity
                      onPress={() =>
                        handleChange({
                          target: {
                            name: "isAvailable",
                            type: "checkbox",
                            checked: !formData.isAvailable,
                          },
                        })
                      }
                      className="flex-row items-center space-x-2"
                    >
                      <View
                        className={`w-5 h-5 rounded border flex items-center justify-center mr-2 ${formData.isAvailable ? "bg-[#0a192f] border-[#0a192f]" : "bg-white border-gray-300"}`}
                      >
                        {formData.isAvailable && (
                          <Text className="text-white text-[10px] font-bold">
                            ✓
                          </Text>
                        )}
                      </View>
                      <Text className="text-sm font-semibold text-[#0a192f]">
                        Disponible
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View className="mb-4">
                <Text className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                  Notas
                </Text>
                <TextInput
                  value={formData.notes}
                  onChangeText={(val) =>
                    handleChange({ target: { name: "notes", value: val } })
                  }
                  multiline
                  numberOfLines={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 bg-white text-top"
                  placeholder="Ej. Coordinar con cocina los requerimientos para alérgenos alimentarios..."
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>
          </ScrollView>

          <View className="p-4 flex-row justify-end space-x-3 border-t border-gray-100 bg-white">
            <TouchableOpacity
              onPress={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-gray-200 mr-2"
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
                    ? "Modificar"
                    : "Guardar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
