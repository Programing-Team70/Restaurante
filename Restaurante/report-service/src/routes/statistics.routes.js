'use strict';

import { Router } from "express";

import {
    createStatistics,
    getStatistics,
    getStatistic,
    updateStatistic,
    deleteStatistic
} from "../controllers/statistics.controller.js";

const router = Router();

router.post("/", createStatistics);

router.get("/", getStatistics);

router.get("/:id", getStatistic);

router.put("/:id", updateStatistic);

router.delete("/:id", deleteStatistic);

export default router;