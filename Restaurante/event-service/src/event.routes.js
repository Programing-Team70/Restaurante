'use strict';

import { Router } from "express";

import { 
    createEvent, 
    getEventsByRestaurant, 
    updateEvent, 
    deleteEvent 
} from "./event.controller.js";

const router = Router();

router.post(
    "/",
    createEvent
);
router.get(
    "/event/:restaurantId",
    getEventsByRestaurant
);
router.put(
    "/:id",
    updateEvent
);

router.delete(
    "/:id",
    deleteEvent
);

export default router;