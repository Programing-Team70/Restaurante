import { Router } from "express";
import { getTopDishesReport, getPeakHoursReport } from "./report.controller.js";

const router = Router();

router.get("/top-dishes/:restaurantId", getTopDishesReport);
router.get("/peak-hours/:restaurantId", getPeakHoursReport);

export default router;
