import { Router } from "express";
import {
  createTable,
  getTablesByRestaurant,
  updateTable,
  deleteTable
} from "./table.controller.js";

const router = Router();
router.post("/", createTable);
router.get("/restaurant/:restaurantId", getTablesByRestaurant);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

export default router;