'use strict';

import {
    createStatisticsService,
    getStatisticsService,
    getStatisticService,
    updateStatisticService,
    deleteStatisticService
} from "../services/statistics.service.js";

export const createStatistics = async (req, res) => {
    try {
        const statistic = await createStatisticsService(req.body);

        res.status(201).json({
            success: true,
            statistic
        });

    } catch (e) {
        console.log(e);

        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

export const getStatistics = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        const statistics = await getStatisticsService(restaurantId);

        res.json({
            success: true,
            statistics
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

export const getStatistic = async (req, res) => {
    try {
        const statistic = await getStatisticService(req.params.id);

        if (!statistic) {
            return res.status(404).json({
                success: false,
                message: "Estadística no encontrada"
            });
        }

        res.json({
            success: true,
            statistic
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

export const updateStatistic = async (req, res) => {
    try {
        const statistic = await updateStatisticService(
            req.params.id,
            req.body
        );

        if (!statistic) {
            return res.status(404).json({
                success: false,
                message: "Estadística no encontrada"
            });
        }

        res.json({
            success: true,
            statistic
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

export const deleteStatistic = async (req, res) => {
    try {
        const statistic = await deleteStatisticService(req.params.id);

        if (!statistic) {
            return res.status(404).json({
                success: false,
                message: "Estadística no encontrada"
            });
        }

        res.json({
            success: true,
            message: "Estadística eliminada",
            statistic
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};