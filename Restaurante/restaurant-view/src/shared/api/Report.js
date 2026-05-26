import axios from "axios";

const axiosReport = axios.create({
    baseURL: import.meta.env.VITE_REPORT_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Reports
export const getReports = async () => {
    return await axiosReport.get('/reports');
};

export const getReport = async (id) => {
    return await axiosReport.get(`/reports/${id}`);
};

export const createReport = async (data) => {
    return await axiosReport.post('/reports', data);
};

export const deleteReport = async (id) => {
    return await axiosReport.delete(`/reports/${id}`);
};

// Statistics
export const getStatistics = async (restaurantId) => {
    return await axiosReport.get(
        `/statistics?restaurantId=${restaurantId}`
    );
};

export const getStatistic = async (id) => {
    return await axiosReport.get(`/statistics/${id}`);
};

export const createStatistic = async (data) => {
    return await axiosReport.post('/statistics', data);
};

export const updateStatistic = async (id, data) => {
    return await axiosReport.put(`/statistics/${id}`, data);
};

export const deleteStatistic = async (id) => {
    return await axiosReport.delete(`/statistics/${id}`);
};