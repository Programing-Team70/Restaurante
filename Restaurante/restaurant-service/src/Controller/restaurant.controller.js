import {
  createRestaurantService,
  updateRestaurantService,
  desactivateRestaurantService,
  getRestaurantsService,
} from "../Services/restaurant.service.js";

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = await createRestaurantService(req.body, req.files);
    return res.status(201).json({
      success: true,
      message: "Restaurante creado correctamente.",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el restaurante.",
      error: error.message,
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
    return res.status(200).json({
      success: true,
      message: "Restaurante actualizado correctamente.",
      restaurant,
    });
  } catch (error) {
    const statusCode = error.message === "Restaurante no encontrado." ? 404 : 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const desactivateRestaurant = async (req, res) => {
  try {
    const restaurant = await desactivateRestaurantService(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Restaurante desactivado correctamente.",
      restaurant,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const { limit, skip, ...query } = req.query;
    const result = await getRestaurantsService(query, { limit, skip });
    return res.status(200).json({
      success: true,
      total: result.total,
      restaurants: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al mostrar los restaurantes.",
      error: error.message,
    });
  }
};