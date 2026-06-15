import axios from "../utils/Axios.js";
import { ENDPOINTS } from "./endpoinst.js";

export const axiosRestaurant = axios.create({
    baseURL: ENDPOINTS.RESTAURANT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosReservation = axios.create({
    baseURL: ENDPOINTS.RESERVATION,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosEvent = axios.create({
    baseURL: ENDPOINTS.EVENT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosAuth = axios.create({
    baseURL: ENDPOINTS.AUTH,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosReport = axios.create({
    baseURL: ENDPOINTS.REPORT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});