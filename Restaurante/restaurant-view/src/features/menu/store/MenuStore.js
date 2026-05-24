import { create } from 'zustand';
import {
    getMenusRequest,
    getMenusByRestaurantRequest,
    createMenuRequest,
    updateMenuRequest,
    deleteMenuRequest,
} from '../../../shared/api';

export const useMenuStore = create((set, get) => ({
    menus: [],
    loading: false,
    error: null,

    getMenus: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await getMenusRequest(id);
            if (id) {
                set({ menus: response.data?.item ? [response.data.item] : [], loading: false });
            } else {
                set({ menus: response.data?.menus || [], loading: false });
            }
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener el menú',
                loading: false,
            });
        }
    },

    getMenusByRestaurant: async (restaurantId) => {
        try {
            set({ loading: true, error: null });
            const response = await getMenusByRestaurantRequest(restaurantId);
            set({ menus: response.data?.menu || [], loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener los platillos del restaurante.',
                loading: false,
            });
        }
    },

    createMenu: async (menuData) => {
        try {
            set({ loading: true, error: null });
            const response = await createMenuRequest(menuData);
            set({ menus: [response.data.data, ...get().menus], loading: false });
        } catch (error) {
            console.log("Error al crear el platillo: ", error.response?.data);
            set({
                error: error.response?.data?.message || 'Error al crear el platillo.',
                loading: false,
            });
            throw error;
        }
    },

    updateMenu: async (id, menuData) => {
        try {
            set({ loading: true, error: null });
            const response = await updateMenuRequest(id, menuData);
            set({
                menus: get().menus.map((menu) => 
                    (menu._id === id || menu.id === id) ? response.data.data : menu
                ),
                loading: false, 
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar el platillo.',
                loading: false,
            });
        }
    },

    deleteMenu: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteMenuRequest(id);
            set({
                menus: get().menus.filter((menu) => 
                    menu._id !== id && menu.id !== id
                ),
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al desactivar el platillo.',
                loading: false,
            });
        }
    },
}));