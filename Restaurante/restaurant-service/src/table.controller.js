import {
  createTableService,
  getTablesByRestaurantService,
  updateTableService,
  deleteTableService,
} from "./table.service.js";

export const createTable = async (req, res) => {
  try {
    const table = await createTableService(req.body);
    return res.status(201).json({
      success: true,
      table,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTablesByRestaurant = async (req, res) => {
  try {
    const tables = await getTablesByRestaurantService(req.params.restaurantId);
    return res.status(200).json({
      success: true,
      results: tables.length,
      tables,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTable = async (req, res) => {
  try {
    const updated = await updateTableService(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      table: updated,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTable = async (req, res) => {
  try {
    const table = await deleteTableService(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Mesa desactivada correctamente",
      table,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
