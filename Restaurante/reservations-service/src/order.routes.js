import { Router } from "express";
import {
  createOrder,
  updateOrderStatus,
  getOrdersByRestaurant
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);
router.get("/restaurant/:restaurantId", getOrdersByRestaurant);

export default router;