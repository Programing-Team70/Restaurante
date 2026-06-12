import axios from '../utils/Axios.js';

export const axiosRestaurant = axios.create({
    baseURL: import.meta.env.VITE_RESTAURANT_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosReservation = axios.create({
    baseURL: import.meta.env.VITE_RESERVATION_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosEvent = axios.create({
    baseURL: import.meta.env.VITE_EVENT_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
