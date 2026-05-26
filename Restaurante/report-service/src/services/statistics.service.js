'use strict';

import Statistics from "../models/statistics.model.js";

export const createStatisticsService = async (data) => {
    return await Statistics.create(data);
};

export const getStatisticsService = async (restaurantId) => {
    return await Statistics.find({
        restaurantId
    }).sort({ date: -1 });
};

export const getStatisticService = async (id) => {
    return await Statistics.findById(id);
};

export const updateStatisticService = async (id, data) => {
    return await Statistics.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteStatisticService = async (id) => {
    return await Statistics.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );
};