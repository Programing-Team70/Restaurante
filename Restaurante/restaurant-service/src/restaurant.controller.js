import {
  createRestaurantService,
  updateRestaurantService,
  deleteRestaurantService
} from "./restaurant.service.js";

export const createRestaurant = async (req, res) => {
    try {
    const restaurant = await createRestaurantService(
      req.body,
      req.files
    );
    return res.status(201).json({
      success: true,
      restaurant
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await updateRestaurantService(
      req.params.id,
      req.body,
      req.files
    );
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado"
      });
    }
    return res.status(200).json({
      success: true,
      restaurant
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await deleteRestaurantService(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Restaurante desactivado correctamente.",
      restaurant
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};