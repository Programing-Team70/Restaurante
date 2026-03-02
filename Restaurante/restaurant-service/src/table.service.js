import Table from "./table.model.js";

export const createTableService = async (data) => {
    return await Table.create(data);
};

export const getTablesByRestaurantService = async (restaurantId) => {
    return await Table.find({ restaurant: restaurantId });
};

export const updateTableService = async (id, data) => {
    const table = await Table.findById(id);
    if (!table) {
        throw new Error("Mesa no encontrada");
    }
    return await Table.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );
};

export const deleteTableService = async (id) => {
    const table = await Table.findById(id);
    if (!table) {
        throw new Error("Mesa no encontrada");
    }
    table.isActive = false;
    await table.save();
    return table;
};