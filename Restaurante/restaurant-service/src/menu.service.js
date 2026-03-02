import MenuItem from "./menu.model.js";

export const createMenuItemService = async (data) => {
    return await MenuItem.create(data);
};

export const getMenuByRestaurantService = async (restaurantId) => {
    return await MenuItem.find({ restaurant: restaurantId });
};

export const updateMenuItemService = async (id, data) => {
    const item = await MenuItem.findById(id);
    if (!item) {
        throw new Error("Plato no encontrado");
    }
    return await MenuItem.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );
};

export const deleteMenuItemService = async (id) => {
    const item = await MenuItem.findById(id);
    if (!item) {
        throw new Error("Plato no encontrado");
    }
    item.isActive = false;
    await item.save();
    return item;
};