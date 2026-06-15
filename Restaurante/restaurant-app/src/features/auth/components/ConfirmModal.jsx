import React from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { useUIStore } from "../store/uiStore";
import toast from "react-native-toast-message";

export const UiConfirmHost = () => {
  const confirm = useUIStore((s) => s.confirm);
  const closeConfirm = useUIStore((s) => s.closeConfirm);

  if (!confirm) return null;

  const handleCancel = () => {
    confirm.onCancel?.();
    closeConfirm();
  };

  const handleConfirm = async () => {
    try {
      await Promise.resolve(confirm.onConfirm?.());
    } finally {
      closeConfirm();
    }
  };

  return (
    <Modal visible={!!confirm} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <Pressable className="absolute inset-0" onPress={handleCancel} />
        <View className="bg-white p-6 rounded-xl w-full max-w-md text-center shadow-lg border border-gray-200">
          <Text className="text-xl font-bold mb-2">{confirm.title}</Text>
          <Text className="mb-4 text-gray-600">{confirm.message}</Text>
          <View className="flex justify-center gap-4 mt-4">
            <TouchableOpacity
              onPress={handleCancel}
              className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium"
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium"
            >
              <Text>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const showConfirmToast = ({ title, message, onConfirm }) => {
  toast.custom((t) => (
    <View className="bg-white p-6 rounded-xl w-96 text-center shadow-lg border border-gray-200">
      <Text className="text-xl font-bold mb-2">{title}</Text>
      <Text className="mb-4">{message}</Text>
      <View className="flex justify-center gap-4 mt-4">
        <TouchableOpacity
          onPress={() => toast.dismiss(t.id)}
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium"
        >
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onConfirm?.();
            toast.dismiss(t.id);
          }}
          className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium"
        >
          <Text>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  ));
};
