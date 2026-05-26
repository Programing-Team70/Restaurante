'use strict';

import {
    createReportService,
    getReportsService,
    getReportService,
    deleteReportService
} from "../services/report.service.js";

export const createReport = async (req, res) => {
    try {
        const report = await createReportService(req.body);
        res.status(201).json(report);
    } catch (e) {
        console.error(e);

        res.status(500).json({
            message: e.message,
            stack: e.stack
        });
    }
};

export const getReports = async (req, res) => {
    const data = await getReportsService();
    res.json(data);
};

export const getReport = async (req, res) => {
    const data = await getReportService(req.params.id);
    res.json(data);
};

export const deleteReport = async (req, res) => {
    const data = await deleteReportService(req.params.id);
    res.json(data);
};