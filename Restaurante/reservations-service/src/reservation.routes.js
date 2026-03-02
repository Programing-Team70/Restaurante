import { Router } from "express";
import {
  createReservation,
  updateReservation,
  cancelReservation,
  getReservationsByRestaurant
} from "../controllers/reservation.controller.js";

const router = Router();

router.post("/", createReservation);
router.put("/:id", updateReservation);
router.patch("/:id/cancel", cancelReservation);
router.get("/restaurant/:restaurantId", getReservationsByRestaurant);

export default router;