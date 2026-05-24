import { create } from 'zustand';
import {
    getEventsRequest,
    getEventsByRestaurantRequest,
    createEventRequest,
    updateEventRequest,
    cancelEventRequest,
    deleteEventRequest,
} from '../../../shared/api';

export const useEventStore = create((set, get) => ({
    events: [],
    loading: false,
    error: null,

    getEvents: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getEventsRequest();
            const fetchedEvents = response.data?.events || response.data?.data || response.data || [];
            set({ 
                events: Array.isArray(fetchedEvents) ? fetchedEvents : [fetchedEvents], 
                loading: false 
            });
        } catch (error) {
            console.log("Error detallado de la petición HTTP:", error.response);

            set({
                error: error.response?.data?.message || 'Error al obtener los eventos globales de Heaven Flavor.',
                loading: false,
            });
        }
    },

    getEventsByRestaurant: async (restaurantId) => {
        try {
            set({ loading: true, error: null });
            const response = await getEventsByRestaurantRequest(restaurantId);
            const fetchedEvents = response.data?.events || response.data?.data || response.data || [];
            set({ 
                events: Array.isArray(fetchedEvents) ? fetchedEvents : [fetchedEvents], 
                loading: false 
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al filtrar los eventos por sucursal.',
                loading: false,
            });
        }
    },

    createEvent: async (eventData) => {
        try {
            set({ loading: true, error: null });
            const response = await createEventRequest(eventData);
            const newEvent = response.data?.event || response.data?.data || response.data;
            set({ 
                events: [newEvent, ...get().events], 
                loading: false 
            });
        } catch (error) {
            console.error("Error al crear evento: ", error.response?.data);
            set({
                error: error.response?.data?.message || 'Error al registrar el nuevo evento.',
                loading: false,
            });
            throw error; 
        }
    },

    updateEvent: async (id, eventData) => {
        try {
            set({ loading: true, error: null });
            const response = await updateEventRequest(id, eventData);
            const updatedEvent = response.data?.event || response.data?.data || response.data;
            set({
                events: get().events.map((event) => 
                    (event._id === id || event.id === id) ? updatedEvent : event
                ),
                loading: false, 
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar la información del evento.',
                loading: false,
            });
        }
    },

    cancelEvent: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await cancelEventRequest(id);
            const canceledEvent = response.data?.event || response.data?.data || response.data;
            set({
                events: get().events.map((event) => 
                    (event._id === id || event.id === id) ? canceledEvent : event
                ),
                loading: false, 
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al intentar cancelar el evento.',
                loading: false,
            });
        }
    },

    deleteEvent: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteEventRequest(id);
            
            set({
                events: get().events.filter((event) => 
                    event._id !== id && event.id !== id
                ),
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al desactivar el evento de la plataforma.',
                loading: false,
            });
        }
    },
}));