'use strict';

import Statistics from "../models/statistics.model.js";

export const createStatisticsService = async (data) => {
    return await Statistics.create(data);
};

export const getStatisticsService = async () => {
    return await Statistics.find();
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