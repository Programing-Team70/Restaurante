import { Router } from "express";
import {
  createMenuItem,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem
} from "./menu.controller.js";

import mongoose from "mongoose";

const router = Router();

const validateObjectId = (req, res, next) => {
  const id = req.params.id || req.params.restaurantId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID inválido"
    });
  }
  next();
};

router.post("/", createMenuItem);

router.get(
  "/restaurant/:restaurantId",
  validateObjectId,
  getMenuByRestaurant
);

router.put(
  "/:id",
  validateObjectId,
  updateMenuItem
);

router.delete(
  "/:id",
  validateObjectId,
  deleteMenuItem
);

export default router;