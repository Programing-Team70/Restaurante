'use strict';

import Event from "../Model/event.model.js";

export const createEventService = async (data) => {
    try {
        const event = await Event.create(data);
        return event;
    } catch (error) {
        throw new Error(`Error al crear el evento: ${error.message}`);
    }
};

export const getEventService = async (skip = 0, limit = 10) => {
    try {
        const events = await Event.find({ isActive: true })
            .sort({ eventDate: 1 })
            .skip(skip)
            .limit(limit);
        const total = await Event.countDocuments({ isActive: true });
        return { events, total };
    } catch (error) {
        throw new Error(`Error al obtener los eventos: ${error.message}`);
    }
};

export const getEventsByRestaurantService = async (restaurantId) => {
    try {
        return await Event.find({
            restaurantId,
            isActive: true
        }).sort({ eventDate: 1 });
    } catch (error) {
        throw new Error(`Error al obtener eventos del restaurante: ${error.message}`);
    }
};

export const updateEventService = async (id, data) => {
    try {
        return await Event.findOneAndUpdate(
            { _id: id, isActive: true },
            data,
            {
                new: true,
                runValidators: true
            }
        );
    } catch (error) {
        throw new Error(`Error al actualizar el evento: ${error.message}`);
    }
};

export const cancelEventService = async (id) => {
    try {
        return await Event.findOneAndUpdate(
            { _id: id, isActive: true },
            { status: "cancelado", isAvailable: false },
            { new: true }
        );
    } catch (error) {
        throw new Error(`Error al cancelar el evento: ${error.message}`);
    }
};

export const desactivateEventService = async (id) => {
    try {
        return await Event.findOneAndUpdate(
            { _id: id },
            { isActive: false, isAvailable: false },
            { new: true }
        );
    } catch (error) {
        throw new Error(`Error al desactivar el evento: ${error.message}`);
    }
};