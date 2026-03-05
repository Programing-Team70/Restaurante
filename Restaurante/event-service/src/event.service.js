'use strict';

import Event from "./event.model.js";

export const createEventService = async (data) => {
    const event = await Event.create(data);
    return event;
};

export const getEventsByRestaurantService = async (restaurantId) => {
    const events = await Event.find({
        restaurantId,
        isActive: true
    })
    .populate("restaurantId", "restaurantName restaurantAddress")
    .populate("resources.specialMenu", "name price type");
    return events;
};

export const updateEventService = async (id, data) => {
    const updatedEvent = await Event.findOneAndUpdate(
        { _id: id, isActive: true },
        data,
        {
            new: true,
            runValidators: true
        }
    );
    return updatedEvent;
};

export const cancelEventService = async (id) => {
    const cancelledEvent = await Event.findOneAndUpdate(
        { _id: id, isActive: true },
        { status: "cancelado" },
        { new: true }
    );
    return cancelledEvent;
};

export const deleteEventService = async (id) => {
    const deletedEvent = await Event.findOneAndUpdate(
        { _id: id },
        { isActive: false },
        { new: true }
    );
    return deletedEvent;
};