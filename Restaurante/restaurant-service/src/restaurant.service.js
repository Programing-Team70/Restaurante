import Restaurant from "./restaurant.model.js";
import cloudinary from "../config/cloudinary.js"; 

export const createRestaurantService = async (fileData, files) => {
    const restaurantData = { ...fileData };
    try {
        if (files && files.length > 0) {
            restaurantData.photos = files.map(file => ({
                url: file.path,
                public_id: file.filename
            }));
        }
        return await Restaurant.create(restaurantData);
    } catch (error) {
        if (files && files.length > 0) {
            await Promise.all(
                files.map(file =>
                    cloudinary.uploader.destroy(file.filename)
                )
            );
        }
        throw error;
    }
};

export const updateRestaurantService = async (id, fileData, files) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
        throw new Error('Restaurante no encontrado.');
    }

    const updateData = { ...fileData };
    if (files && files.length > 0) {
        await Promise.all(
            restaurant.photos.map(photo =>
                cloudinary.uploader.destroy(photo.public_id)
            )
        );
        updateData.photos = files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));
    }
    return await Restaurant.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );
};

export const deleteRestaurantService = async (id) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
        throw new Error('Restaurante no encontrado.');
    }
    await Promise.all(
        restaurant.photos.map(photo =>
            cloudinary.uploader.destroy(photo.public_id)
        )
    );
    restaurant.isActive = false;
    await restaurant.save();
    return restaurant;
};