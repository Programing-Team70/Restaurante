import Table from "../Model/table.model.js";

export const createTableService = async (data) => {
    return await Table.create(data);
};

export const updateTableService = async (id, data) => {
    const table = await Table.findOneAndUpdate(
        { _id: id, isActive: true },
        data,
        { new: true, runValidators: true }
    );
    if (!table) {
        throw new Error("Mesa no encontrada o se encuentra desactivada.");
    }
    return table;
};

export const desactivateTableService = async (id) => {
    const table = await Table.findOne({ _id: id, isActive: true });
    if (!table) {
        throw new Error("Mesa no encontrada o desactivada.");
    }
    table.isActive = false;
    return await table.save();
};

export const getTableByIdService = async (id) => {
    const table = await Table.findOne({ _id: id, isActive: true });
    if (!table) {
        throw new Error("La mesa solicitada no existe.");
    }
    return table;
};

export const getTablesByRestaurantService = async (restaurantId, query = {}) => {
    const { isAvailable, capacity } = query;
    const filter = { 
        restaurant: restaurantId, 
        isActive: true 
    };
    if (isAvailable !== undefined) filter.isAvailable = isAvailable;
    if (capacity) filter.capacity = { $gte: Number(capacity) };
    return await Table.find(filter).sort({ location: 1, capacity: 1 });
};