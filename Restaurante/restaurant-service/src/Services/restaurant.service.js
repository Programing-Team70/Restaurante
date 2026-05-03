import Restaurant from "../Model/restaurant.model.js";
import cloudinary from "../../config/cloudinary.js";

export const createRestaurantService = async (fileData, files) => {
    const restaurantData = { ...fileData };
    if (files && files.length > 0) {
        restaurantData.photos = files.map((file) => ({
            url: file.path,
            public_id: file.filename,
        }));
    }
    return await Restaurant.create(restaurantData);
};

export const updateRestaurantService = async (id, fileData, files) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
        throw new Error("Restaurante no encontrado.");
    }
    const updateData = { ...fileData };
    if (files && files.length > 0) {
        if (restaurant.photos && restaurant.photos.length > 0) {
            await Promise.all(
                restaurant.photos.map((photo) => cloudinary.uploader.destroy(photo.public_id))
            );
        }
        updateData.photos = files.map((file) => ({
            url: file.path,
            public_id: file.filename,
        }));
    }
    return await Restaurant.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
};

export const desactivateRestaurantService = async (id) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) throw new Error("Restaurante no encontrado.");
    try {
        if (restaurant.photos && restaurant.photos.length > 0) {
            await Promise.all(
                restaurant.photos.map((photo) => cloudinary.uploader.destroy(photo.public_id))
            );
        }
    } catch (err) {
        console.error("Error al limpiar Cloudinary:", err.message);
    }
    restaurant.isActive = false;
    return await restaurant.save();
};

export const getRestaurantsService = async (query = {}, options = {}) => {
    const { limit = 10, skip = 0 } = options;
    const filter = {
        ...query,
        isActive: true
    };
    const [total, restaurants] = await Promise.all([
        Restaurant.countDocuments(filter),
        Restaurant.find(filter)
            .limit(Number(limit))
            .skip(Number(skip))
            .sort({ createdAt: -1 })
    ]);
    return {
        total,
        rows: restaurants
    };
};