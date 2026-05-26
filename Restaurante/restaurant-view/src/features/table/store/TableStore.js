import { create } from 'zustand';
import {
    getTablesRequest,
    getTablesByRestaurantRequest,
    createTablesRequest,
    updateTablesRequest,
    deleteTablesRequest,
} from '../../../shared/api';

export const useTableStore = create((set, get) => ({
    tables: [],
    loading: false,
    error: null,

    getTables: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await getTablesRequest(id);
            const data = response.data?.tables || (response.data?.table ? [response.data.table] : []);
            set({ tables: data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener las mesas',
                loading: false,
            });
        }
    },

    getTablesByRestaurant: async (restaurantId) => {
        try {
            set({ loading: true, error: null });
            const response = await getTablesByRestaurantRequest(restaurantId);
            set({ tables: response.data?.tables || [], loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener las mesas del restaurante',
                loading: false,
            });
        }
    },

    createTable: async (tableData) => {
        try {
            set({ loading: true, error: null });
            const response = await createTablesRequest(tableData);
            set({ tables: [response.data.data, ...get().tables], loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al crear la mesa.',
                loading: false,
            });
        }
    },

    updateTable: async (id, tableData) => {
        try {
            set({ loading: true, error: null });
            const response = await updateTablesRequest(id, tableData);
            set({
                tables: get().tables.map((table) =>
                    (table._id === id || table.id === id) ? response.data.data : table
                ),
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar la mesa.',
                loading: false,
            });
        }
    },

    deleteTable: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteTablesRequest(id);
            set({
                tables: get().tables.filter((table) =>
                    table._id !== id && table.id !== id
                ),
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al eliminar la mesa.',
                loading: false,
            });
        }
    },
}));