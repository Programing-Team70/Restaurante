import MenuItem from "../Model/menu.model.js";

export const createMenuItemService = async (data) => {
    return await MenuItem.create(data);
};

export const updateMenuItemService = async (id, data) => {
    const item = await MenuItem.findOneAndUpdate(
        { _id: id, isActive: true },
        data,
        {
            new: true,
            runValidators: true,
        }
    );
    if (!item) {
        throw new Error("Plato no encontrado o se encuentra desactivado.");
    }
    return item;
};

export const desactivateMenuItemService = async (id) => {
    const item = await MenuItem.findOne({ _id: id, isActive: true });
    if (!item) {
        throw new Error("Plato no encontrado o ya ha sido eliminado.");
    }
    item.isActive = false;
    return await item.save();
};

export const getMenuItemByIdService = async (id) => {
    const item = await MenuItem.findOne({ _id: id, isActive: true }).populate('restaurant', 'restaurantName');
    if (!item) {
        throw new Error("El plato solicitado no existe.");
    }
    return item;
};

export const getMenuByRestaurantService = async (restaurantId, options = {}) => {
    const { limit = 20, skip = 0, type } = options;
    const filter = { 
        restaurant: restaurantId, 
        isActive: true 
    };
    if (type) {
        filter.type = type;
    }
    const [total, items] = await Promise.all([
        MenuItem.countDocuments(filter),
        MenuItem.find(filter)
            .limit(Number(limit))
            .skip(Number(skip))
            .sort({ name: 1 })
    ]);
    return {
        total,
        rows: items
    };
};