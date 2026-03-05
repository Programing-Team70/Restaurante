import { Router } from "express";

import {
  createReservation,
  updateReservation,
  cancelReservation,
  deleteReservation,
  getReservationsByRestaurant
} from "./reservation.controller.js";

const router = Router();
router.post("/", createReservation);
router.put("/:id", updateReservation);
router.patch("/:id/cancel", cancelReservation);
router.delete("/:id", deleteReservation);
router.get(
  "/restaurant/:restaurantId",
  getReservationsByRestaurant
);

export default router;