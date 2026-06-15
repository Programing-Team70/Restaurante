import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Plus } from "lucide-react-native";
import { useReservationStore } from "../store/ReservationStore";
import { ReservationTable } from "../components/ReservationTable.jsx";
import { ReservationModal } from "../components/ReservationModal.jsx";
import { useSaveReservation } from "../hooks/UseReservations.js";

export const ReservationPage = () => {
  const reservations = useReservationStore((state) => state.reservations);
  const loading = useReservationStore((state) => state.loading);
  const error = useReservationStore((state) => state.error);
  const getReservations = useReservationStore((state) => state.getReservations);
  const cancelReservation = useReservationStore(
    (state) => state.cancelReservation,
  );
  const deleteReservation = useReservationStore(
    (state) => state.deleteReservation,
  );
  const { saveReservation } = useSaveReservation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    getReservations();
  }, []);

  const handleOpenCreateModal = () => {
    setSelectedReservation(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleSaveReservation = async (reservationData) => {
    try {
      await saveReservation(reservationData);
      await getReservations();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error al procesar la reservación en Heaven Flavor:", err);
    }
  };

  return (
    <ScrollView className="w-full py-10 px-6 space-y-8">
      <View className="flex-row justify-between items-center border-b border-gray-100 pb-5">
        <View className="space-y-1">
          <Text className="text-3xl font-bold text-[#0a192f]">
            Reservaciones
          </Text>
          <Text className="text-gray-500 italic text-sm">
            Gestión de mesas Heaven Flavor
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleOpenCreateModal}
          className="flex-row items-center gap-2 bg-[#0a192f] px-5 py-3 rounded-lg"
        >
          <Plus size={18} strokeWidth={2.5} color="white" />
          <Text className="text-white font-semibold">Nueva Reservación</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View className="bg-red-50 p-4 rounded-xl border border-red-100">
          <Text className="text-red-600 text-sm font-medium">{error}</Text>
        </View>
      )}

      {loading ? (
        <View className="items-center justify-center py-12">
          <ActivityIndicator size="small" color="#9ca3af" className="mb-3" />
          <Text
            style={{ letterSpacing: 2 }}
            className="text-center text-gray-400 uppercase text-xs"
          >
            Sincronizando con la base de datos Heaven Flavor...
          </Text>
        </View>
      ) : (
        <ReservationTable
          data={reservations}
          onEdit={handleOpenEditModal}
          onCancel={cancelReservation}
          onDelete={deleteReservation}
        />
      )}

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReservation}
        initialData={selectedReservation}
      />
    </ScrollView>
  );
};
