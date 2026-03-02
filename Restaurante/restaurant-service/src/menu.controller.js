import {
  createMenuItemService,
  getMenuByRestaurantService,
  updateMenuItemService,
  deleteMenuItemService
} from "./menu.service.js";

export const createMenuItem = async (req, res) => {
  try {
    const item = await createMenuItemService(req.body);
    return res.status(201).json({
      success: true,
      item
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getMenuByRestaurant = async (req, res) => {
  try {
    const menu = await getMenuByRestaurantService(req.params.restaurantId);
    return res.status(200).json({
      success: true,
      results: menu.length,
      menu
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const updated = await updateMenuItemService(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      success: true,
      item: updated
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const item = await deleteMenuItemService(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Menu item desactivado correctamente.",
      item
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};