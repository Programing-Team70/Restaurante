import { Router } from "express";

import {
  createOrder,
  updateOrderStatus,
  getOrdersByRestaurant,
  deleteOrder
} from "./order.controller.js";

const router = Router();
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);
router.get(
  "/restaurant/:restaurantId",
  getOrdersByRestaurant
);
router.delete("/:id", deleteOrder);

export default router;