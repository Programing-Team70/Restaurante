import {
  createTableService,
  getTablesByRestaurantService,
  updateTableService,
  desactivateTableService,
  getTableByIdService
} from "../Services/table.service.js";

export const createTable = async (req, res) => {
  try {
    const table = await createTableService(req.body);
    return res.status(201).json({
      success: true,
      message: "Mesa creada correctamente.",
      table,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear la mesa.",
      error: error.message,
    });
  }
};

export const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateTableService(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Mesa actualizada correctamente.",
      table: updated,
    });
  } catch (error) {
    const statusCode = error.message.includes("encontrada") ? 404 : 400;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const desactivateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await desactivateTableService(id);
    return res.status(200).json({
      success: true,
      message: "Mesa desactivada correctamente.",
      table,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTableById = async (req, res) => {
    try {
      const { id } = req.params;
      const table = await getTableByIdService(id);
      return res.status(200).json({
        success: true,
        table
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
};

export const getTablesByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { isAvailable, capacity } = req.query;
    const queryOptions = {
        isAvailable: isAvailable === 'true' ? true : isAvailable === 'false' ? false : undefined,
        capacity: capacity ? parseInt(capacity) : undefined
    };
    const tables = await getTablesByRestaurantService(restaurantId, queryOptions);
    return res.status(200).json({
      success: true,
      results: tables.length,
      tables,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las mesas.",
      error: error.message,
    });
  }
};