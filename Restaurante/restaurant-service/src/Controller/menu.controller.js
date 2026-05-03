import {
  createMenuItemService,
  updateMenuItemService,
  desactivateMenuItemService,
  getMenuItemByIdService,
  getMenuByRestaurantService
} from "../Services/menu.service.js";

export const createMenuItem = async (req, res) => {
  try {
    const item = await createMenuItemService(req.body);
    return res.status(201).json({
      success: true,
      message: "Plato creado correctamente.",
      item
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el plato.",
      error: error.message
    });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateMenuItemService(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Plato actualizado correctamente.",
      item: updated
    });
  } catch (error) {
    const statusCode = error.message.includes("encontrado") ? 404 : 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

export const desactivateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await desactivateMenuItemService(id);
    return res.status(200).json({
      success: true,
      message: "Plato del menú desactivado correctamente.",
      item
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getMenuItemByIdService(id);
    return res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { limit, skip, type } = req.query;
    const result = await getMenuByRestaurantService(restaurantId, { limit, skip, type });
    return res.status(200).json({
      success: true,
      total: result.total,
      results: result.rows.length,
      menu: result.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el menú.",
      error: error.message
    });
  }
};