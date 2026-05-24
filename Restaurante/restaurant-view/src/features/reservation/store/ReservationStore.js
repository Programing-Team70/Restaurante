import { create } from 'zustand';
import {
    getReservationsRequest,
    getReservationsByRestaurantRequest,
    createReservationRequest,
    updateReservationRequest,
    cancelReservationRequest,
    deleteReservationRequest,
} from '../../../shared/api';

export const useReservationStore = create((set, get) => ({
    reservations: [],
    loading: false,
    error: null,

    getReservations: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await getReservationsRequest(id);
            if (id) {
                set({ 
                    reservations: response.data?.reservation || response.data?.data ? [response.data.reservation || response.data.data] : [], 
                    loading: false 
                });
            } else {
                set({ reservations: response.data?.reservations || response.data?.data || [], loading: false });
            }
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener las reservaciones.',
                loading: false,
            });
        }
    },

    getReservationsByRestaurant: async (restaurantId) => {
        try {
            set({ loading: true, error: null });
            const response = await getReservationsByRestaurantRequest(restaurantId);
            set({ reservations: response.data?.reservations || response.data?.data || [], loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener las reservaciones del restaurante.',
                loading: false,
            });
        }
    },

    createReservation: async (reservationData) => {
        try {
            set({ loading: true, error: null });
            const response = await createReservationRequest(reservationData);
            const newReservation = response.data?.reservation || response.data?.data || response.data;
            set({ reservations: [newReservation, ...get().reservations], loading: false });
        } catch (error) {
            console.log("Error al crear la reservacion: ", error.response?.data);
            set({
                error: error.response?.data?.message || 'Error al crear la reservación.',
                loading: false,
            });
            throw error;
        }
    },

    updateReservation: async (id, reservationData) => {
        try {
            set({ loading: true, error: null });
            const response = await updateReservationRequest(id, reservationData);
            const updatedReservation = response.data?.reservation || response.data?.data || response.data;
            set({
                reservations: get().reservations.map((res) => 
                    (res._id === id || res.id === id) ? updatedReservation : res
                ),
                loading: false, 
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar la reservación.',
                loading: false,
            });
        }
    },

    cancelReservation: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await cancelReservationRequest(id);
            const canceledReservation = response.data?.reservation || response.data?.data || response.data;
            set({
                reservations: get().reservations.map((res) => 
                    (res._id === id || res.id === id) ? canceledReservation : res
                ),
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al cancelar la reservación.',
                loading: false,
            });
        }
    },

    deleteReservation: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteReservationRequest(id);
            set({
                reservations: get().reservations.filter((res) => 
                    res._id !== id && res.id !== id
                ),
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al desactivar la reservación.',
                loading: false,
            });
        }
    },
}));