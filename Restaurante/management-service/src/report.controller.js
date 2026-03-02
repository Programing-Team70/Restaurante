// src/reports/report.controller.js
import statisticsService from "./statistics.service.js";
import { generatePDF, generateExcel } from "./report.generator.js";

export const getTopDishesReport = async (req, res) => {
  try {
    const topDishes = await statisticsService.getTopDishes(req.params.restaurantId);
    await generatePDF(topDishes, `Top_Dishes_${req.params.restaurantId}`);
    await generateExcel(topDishes, `Top_Dishes_${req.params.restaurantId}`);
    res.status(200).json({ message: "Report generated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPeakHoursReport = async (req, res) => {
  try {
    const peakHours = await statisticsService.getPeakHours(req.params.restaurantId);
    await generatePDF(peakHours, `Peak_Hours_${req.params.restaurantId}`);
    await generateExcel(peakHours, `Peak_Hours_${req.params.restaurantId}`);
    res.status(200).json({ message: "Report generated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
