import { create } from 'zustand';
import {
    getOrdersRequest,
    getOrdersByRestaurantRequest,
    createOrderRequest,
    updateOrderRequest,
    deleteOrderRequest,
} from '../../../shared/api';

export const useOrderStore = create((set, get) => ({
    orders: [],
    loading: false,
    error: null,

    getOrders: async () => {
    try {
        set({ loading: true, error: null });
        const response = await getOrdersRequest();
        const fetchedOrders = response.data?.orders || response.data?.data || response.data || [];
        
        set({ 
            orders: Array.isArray(fetchedOrders) ? fetchedOrders : [fetchedOrders], 
            loading: false 
        });
    } catch (error) {
        set({
            error: error.response?.data?.message || 'Error al obtener los pedidos en Heaven Flavor.',
            loading: false,
        });
    }
},

    getOrdersByRestaurant: async (restaurantId) => {
        try {
            set({ loading: true, error: null });
            const response = await getOrdersByRestaurantRequest(restaurantId);
            set({ orders: response.data?.orders || response.data?.data || [], loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener los pedidos del restaurante.',
                loading: false,
            });
        }
    },

    createOrder: async (orderData) => {
        try {
            set({ loading: true, error: null });
            const response = await createOrderRequest(orderData);
            const newOrder = response.data?.order || response.data?.data || response.data;
            set({ orders: [newOrder, ...get().orders], loading: false });
        } catch (error) {
            console.error("Error al crear el pedido: ", error.response?.data);
            set({
                error: error.response?.data?.message || 'Error al registrar el pedido.',
                loading: false,
            });
            throw error;
        }
    },

    updateOrder: async (id, orderData) => {
        try {
            set({ loading: true, error: null });
            const response = await updateOrderRequest(id, orderData);
            const updatedOrder = response.data?.order || response.data?.data || response.data;
            set({
                orders: get().orders.map((order) => 
                    (order._id === id || order.id === id) ? updatedOrder : order
                ),
                loading: false, 
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar el estado del pedido.',
                loading: false,
            });
        }
    },

    deleteOrder: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteOrderRequest(id);
            set({
                orders: get().orders.filter((order) => 
                    order._id !== id && order.id !== id
                ),
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al eliminar el pedido del sistema.',
                loading: false,
            });
        }
    },
}));