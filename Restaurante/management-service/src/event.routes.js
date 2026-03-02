import { Router } from "express";
import {
  createEvent,
  getEventsByRestaurant,
  updateEvent,
  deleteEvent,
  assignResources,
  getUpcomingEvents
} from "./event.controller.js";


const router = Router();

router.post("/", createEvent);
router.get("/restaurant/:restaurantId", getEventsByRestaurant);
router.get("/restaurant/:restaurantId/upcoming", getUpcomingEvents);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id/resources", assignResources); 
export default router;
