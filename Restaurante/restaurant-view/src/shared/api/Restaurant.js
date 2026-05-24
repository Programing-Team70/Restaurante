import { axiosRestaurant } from "./Api";

export const getRestaurantsRequest = async () => {
    return await axiosRestaurant.get('/restaurant');
};

export const createRestaurantRequest = async (formData) => {
    return await axiosRestaurant.post('/restaurant', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateRestaurantRequest = async (id, formData) => {
    return await axiosRestaurant.put(`/restaurant/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteRestaurantRequest = async (id) => {
    return await axiosRestaurant.put(`/restaurant/${id}`, { isActive: false });
};

export const getMenusRequest = async (id) => {
    return await axiosRestaurant.get(`/menu/${id}`);
};

export const getMenusByRestaurantRequest = async (id) => {
    return await axiosRestaurant.get(`/menu/restaurant/${id}`);
};

export const createMenuRequest = async (menuData) => {
    return await axiosRestaurant.post('/menu', menuData);
};

export const updateMenuRequest = async (id, menuData) => {
    return await axiosRestaurant.put(`/menu/${id}`, menuData);
};

export const deleteMenuRequest = async (id) => {
    return await axiosRestaurant.delete(`/menu/${id}`);
};

export const getTablesRequest = async (id) => {
    return await axiosRestaurant.get(`/table/${id}`);
};

export const getTablesByRestaurantRequest = async (id) => {
    return await axiosRestaurant.get(`/table/restaurant/${id}`);
};

export const createTablesRequest = async (tableData) => {
    return await axiosRestaurant.post('/table', tableData);
};

export const updateTablesRequest = async (id, tableData) => {
    return await axiosRestaurant.put(`/table/${id}`, tableData);
};

export const deleteTablesRequest = async (id) => {
    return await axiosRestaurant.delete(`/table/${id}`);
};