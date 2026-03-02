import { Router } from "express";
import { uploadImages } from "../middlewares/file-uploader.js";
import {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from "./restaurant.controller.js";

const router = Router();

router.post(
  "/",
  uploadImages.array("photos", 5),
  createRestaurant
);

router.put(
  "/:id",
  uploadImages.array("photos", 5),
  updateRestaurant
);

router.delete("/:id", deleteRestaurant);

export default router;