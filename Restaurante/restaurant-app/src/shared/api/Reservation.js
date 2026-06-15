import { axiosReservation } from "./Api";

export const getReservationsRequest = async () => {
    return await axiosReservation.get('reservation/');
};

export const getReservationsByRestaurantRequest = async (restaurantId) => {
    return await axiosReservation.get(`reservation/restaurant/${restaurantId}`);
};

export const createReservationRequest = async (reservationData) => {
    return await axiosReservation.post('reservation/', reservationData);
};

export const updateReservationRequest = async (id, reservationData) => {
    return await axiosReservation.put(`reservation/${id}`, reservationData);
};

export const cancelReservationRequest = async (id) => {
    return await axiosReservation.patch(`reservation/${id}/cancel`);
};

export const deleteReservationRequest = async (id) => {
    return await axiosReservation.put(`reservation/${id}`, { isActive: false });
};

export const getOrdersRequest = async () => {
    return await axiosReservation.get('order/');
};

export const getOrdersByRestaurantRequest = async (restaurantId) => {
    return await axiosReservation.get(`order/restaurant/${restaurantId}`);
};

export const createOrderRequest = async (orderData) => {
    return await axiosReservation.post('order/', orderData);
};

export const updateOrderRequest = async (id, orderData) => {
    return await axiosReservation.patch(`order/${id}`, orderData);
};

export const deleteOrderRequest = async (id) => {
    return await axiosReservation.delete(`order/${id}`);
};