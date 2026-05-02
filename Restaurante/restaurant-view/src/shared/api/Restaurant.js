import { axiosRestaurant } from "./Api";

export const getRestaurants = async () => {
    return await axiosRestaurant.get('/restaurant');
}