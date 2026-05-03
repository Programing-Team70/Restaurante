'use strict';

import { Router } from "express";
import {
    createReport,
    getReports,
    getReport,
    deleteReport
} from "../controllers/report.controller.js";

const router = Router();

router.post("/", createReport);
router.get("/", getReports);
router.get("/:id", getReport);
router.delete("/:id", deleteReport);

export default router;