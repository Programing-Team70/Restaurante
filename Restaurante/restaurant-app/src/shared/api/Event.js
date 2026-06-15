import { axiosEvent } from "./Api";

export const getEventsRequest = async () => {
    return await axiosEvent.get('/event');
};

export const getEventsByRestaurantRequest = async (restaurantId) => {
    return await axiosEvent.get(`event/restaurant/${restaurantId}`);
};

export const createEventRequest = async (eventData) => {
    return await axiosEvent.post('event/', eventData);
};

export const updateEventRequest = async (id, eventData) => {
    return await axiosEvent.put(`event/${id}`, eventData);
};

export const cancelEventRequest = async (id) => {
    return await axiosEvent.patch(`event/${id}/cancel`);
};

export const deleteEventRequest = async (id) => {
    return await axiosEvent.delete(`event/${id}`);
};