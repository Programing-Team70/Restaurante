import { create } from 'zustand';
import {
    getRestaurantsRequest,
    createRestaurantRequest,
    updateRestaurantRequest,
    deleteRestaurantRequest,
} from '../../../shared/api';

export const useRestaurantStore = create((set, get) => ({
    restaurants: [],
    loading: false,
    error: null,

    getRestaurants: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getRestaurantsRequest();
            set({ restaurants: response.data?.restaurants, loading: false });
        } catch (error) {
        set({
            error: error.response?.data?.message || 'Error al obtener los restaurantes',
            loading: false,
        });
        }
    },

    createRestaurant: async (formData) => {
        try {
            set({ loading: true, error: null });
            const response = await createRestaurantRequest(formData);
            const newRestaurant = response.data?.restaurant || response.data?.data || response.data;
            set({ restaurants: [newRestaurant, ...get().restaurants], loading: false });
        } catch (error) {
            console.log("Error al crear restaurante: ", error.response?.data);
            set({
                error: error.response?.data?.message || 'Error al crear el restaurante.',
                loading: false,
            });
            throw error; 
        }
    },

    updateRestaurant: async (id, formData) => {
        try {
            set({ loading: true, error: null });
            const response = await updateRestaurantRequest(id, formData);
            const updatedRestaurant = response.data?.restaurant || response.data?.data || response.data;
            set({
                restaurants: get().restaurants.map((restaurant) => 
                    (restaurant._id === id || restaurant.id === id) ? updatedRestaurant : restaurant
                ),
                loading: false, 
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar el restaurante.',
                loading: false,
            });
        }
    },

    deleteRestaurant: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteRestaurantRequest(id);
            set({
                restaurants: get().restaurants.filter((restaurant) => 
                restaurant._id !== id && restaurant.id !== id
                ),
                loading: false,
            });
        } catch (error) {
        set({
            error: error.response?.data?.message || 'Error al desactivar el restaurante.',
            loading: false,
        });
        }
    },
}));