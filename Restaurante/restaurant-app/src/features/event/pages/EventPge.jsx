import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Plus } from "lucide-react-native";
import { useEventStore } from "../store/EventStore.js";
import { EventTable } from "../components/EventTable.jsx";
import { EventModal } from "../components/EventModal.jsx";
import { useSaveEvent } from "../hooks/UseEvent.js";

export const EventPage = () => {
  const events = useEventStore((state) => state.events);
  const loading = useEventStore((state) => state.loading);
  const error = useEventStore((state) => state.error);
  const getEvents = useEventStore((state) => state.getEvents);
  const cancelEvent = useEventStore((state) => state.cancelEvent);
  const deleteEvent = useEventStore((state) => state.deleteEvent);
  const { saveEvent } = useSaveEvent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);

  const handleOpenCreateModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      await saveEvent(eventData);
      await getEvents();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error al procesar el evento en Heaven Flavor:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="w-full py-6 px-4 space-y-6">
          <View className="flex-row justify-between items-center border-b border-gray-100 pb-5">
            <View className="space-y-1 flex-1 mr-3">
              <Text className="text-2xl font-bold text-[#0a192f]">Eventos</Text>
              <Text className="text-gray-500 italic text-sm">
                Gestión de eventos Heaven Flavor
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleOpenCreateModal}
              activeOpacity={0.7}
              className="flex-row items-center gap-2 bg-[#0a192f] px-4 py-3 rounded-lg shadow-lg"
            >
              <Plus size={18} strokeWidth={2.5} color="#ffffff" />
              <Text className="text-white font-semibold tracking-wide text-sm whitespace-nowrap">
                Nuevo Evento
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

          {loading ? (
            <View className="items-center justify-center py-12">
              <ActivityIndicator
                size="small"
                color="#9ca3af"
                className="mb-3"
              />
              <Text
                style={{ letterSpacing: 2 }}
                className="text-center text-gray-400 uppercase text-xs"
              >
                Sincronizando con la base de datos Heaven Flavor...
              </Text>
            </View>
          ) : (
            <EventTable
              data={events}
              onEdit={handleOpenEditModal}
              onCancel={cancelEvent}
              onDelete={deleteEvent}
            />
          )}

          <EventModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedEvent(null);
            }}
            onSave={handleSaveEvent}
            initialData={selectedEvent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
