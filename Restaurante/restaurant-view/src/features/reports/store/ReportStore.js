import { create } from "zustand";
import {
    getReports,
    getReport,
    createReport,
    deleteReport,
    getStatistics,
    createStatistic,
    updateStatistic,
    deleteStatistic,
    getRestaurantsRequest,
} from "../../../shared/api";

export const useReportStore = create((set, get) => ({

    reports: [],
    selectedReport: null,
    statistics: [],
    loading: false,
    error: null,
    restaurants: [],
    selectedRestaurantId:"",

    fetchReports: async (restaurantId) => {
        set({ loading: true, error: null });
        try {
            const res = await getReports();
            set({ reports: res.data });
        } catch (e) {
            set({ error: e.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchRestaurants: async () => {
        set({ loading: true, error: null });

        try {
            const res = await getRestaurantsRequest();

            set({
                restaurants: res.data.restaurants,
            });
        } catch (e) {
            set({ error: e.message });
        } finally {
            set({ loading: false });
        }
    },

    setSelectedRestaurantId: (id) =>
        set({ selectedRestaurantId: id }),

    fetchReport: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await getReport(id);
            set({ selectedReport: res.data });
        } catch (e) {
            set({ error: e.message });
        } finally {
            set({ loading: false });
        }
    },

    addReport: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await createReport(data);
            set((state) => ({ reports: [res.data, ...state.reports] }));
            return res.data;
        } catch (e) {
            set({ error: e.message });
            throw e;
        } finally {
            set({ loading: false });
        }
    },

    removeReport: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteReport(id);
            set((state) => ({
                reports: state.reports.filter((r) => r._id !== id),
            }));
        } catch (e) {
            set({ error: e.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchStatistics: async (restaurantId) => {
        set({ loading: true, error: null });

        try {
            const res = await getStatistics(restaurantId);

            set({
                statistics: res.data.statistics,
            });

        } catch (e) {
            set({ error: e.message });

        } finally {
            set({ loading: false });
        }
    },

    addStatistic: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await createStatistic(data);
            set((state) => ({
                statistics: [res.data.statistic, ...state.statistics],
            }));
            return res.data.statistic;
        } catch (e) {
            set({ error: e.message });
            throw e;
        } finally {
            set({ loading: false });
        }
    },

    editStatistic: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const res = await updateStatistic(id, data);
            set((state) => ({
                statistics: state.statistics.map((s) =>
                    s._id === id ? res.data.statistic : s
                ),
            }));
        } catch (e) {
            set({ error: e.message });
        } finally {
            set({ loading: false });
        }
    },

    removeStatistic: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteStatistic(id);
            set((state) => ({
                statistics: state.statistics.filter((s) => s._id !== id),
            }));
        } catch (e) {
            set({ error: e.message });
        } finally {
            set({ loading: false });
        }
    },

}));