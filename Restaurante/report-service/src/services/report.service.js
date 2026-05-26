'use strict';

import Report from "../models/report.model.js";
import Statistics from "../models/statistics.model.js";
import { generatePDF } from "../../helpers/pdf-generator.js";
import { generateExcel } from "../../helpers/excel-generator.js";
import { uploadBuffer } from "../../helpers/upload-file.js";

export const createReportService = async (data) => {
    const { restaurantId, reportType, startDate, endDate, format } = data;

    const stats = await Statistics.find({
        restaurantId,
        date: { $gte: startDate, $lte: endDate }
    });

    let result = {
        demand: 0,
        topDishes: [],
        peakHours: [],
        totalReservations: 0
    };

    if (!stats.length) {
        throw new Error("No hay estadísticas en ese rango de fechas");
    }

    switch (reportType) {
        case "demanda":
        case "reservaciones":
            result.totalReservations = stats.reduce(
                (acc, s) => acc + (s.demand?.totalReservations || 0),
                0
                );
            result.demand = result.totalReservations;
            break;

        case "platos_populares":
            const dishesMap = {};

            stats.forEach(s => {
                s.topDishes.forEach(d => {
                    if (!dishesMap[d.name]) {
                        dishesMap[d.name] = 0;
                    }
                    dishesMap[d.name] += d.quantitySold;
                });
            });

            result.topDishes = Object.entries(dishesMap).map(([name, qty]) => ({
                name,
                quantitySold: qty
            }));
            break;

        case "horas_pico":
            const hours = {};

            stats.forEach(s => {
                if (s.demand?.peakHour) {
                    hours[s.demand.peakHour] = (hours[s.demand.peakHour] || 0) + 1;
                }
            });

            result.peakHours = Object.entries(hours).map(([hour, count]) => ({
                hour,
                reservations: count
            }));
            break;

        case "desempeño":
            const total = stats.length || 1;

            result.performance = {
                totalIncome: avg(stats, s => s.performance.totalIncome, total),
                averageOccupancy: avg(stats, s => s.performance.averageOccupancy, total),
                ordersPerDay: avg(stats, s => s.performance.ordersPerDay, total),
                customerSatisfaction: avg(stats, s => s.performance.customerSatisfaction, total)
            };
            break;
    }

    const report = await Report.create({
        ...data,
        data: result,
        status: "pendiente"
    });

    let buffer;

    if (format === "pdf") {
        buffer = await generatePDF(report);
    }

    if (format === "excel") {
        buffer = await generateExcel(report);
    }

    if (format === "json") {
        buffer = Buffer.from(
            JSON.stringify(report, null, 2)
        );
    }

    let fileUrl = null;

    if (buffer) {
        const extension =
            format === "excel"
                ? "xlsx"
                : format;

        fileUrl = await uploadBuffer(
            buffer,
            "reports",
            extension
        );
    }

    report.fileUrl = fileUrl;
    report.status = "generado";

    await report.save();

    return report;
};

const avg = (arr, fn, total) =>
    arr.reduce((acc, el) => acc + fn(el), 0) / total;

export const getReportsService = () => Report.find();
export const getReportService = (id) => Report.findById(id);
export const deleteReportService = (id) =>
    Report.findByIdAndUpdate(id, { isActive: false }, { new: true });