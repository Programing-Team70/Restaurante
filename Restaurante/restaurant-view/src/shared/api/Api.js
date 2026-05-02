import axios from "../utils/Axios.js";

const axiosRestaurant = axios.create({
    baseURL: import.meta.env.VITE_RESTAURANT_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});