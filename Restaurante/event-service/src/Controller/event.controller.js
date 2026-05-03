'use strict';

import { 
    createEventService, 
    getEventService,
    getEventsByRestaurantService, 
    updateEventService, 
    cancelEventService, 
    desactivateEventService 
} from "../Services/event.service.js";

export const createEvent = async (req, res) => {
    try {
        const data = req.body;
        const event = await createEventService(data);
        return res.status(201).json({
            success: true,
            message: "Evento programado con éxito",
            event
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const { events, total } = await getEventService(Number(skip) || 0, Number(limit) || 10);
        return res.status(200).json({
            success: true,
            total,
            events
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getEventsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const events = await getEventsByRestaurantService(restaurantId);
        return res.status(200).json({
            success: true,
            total: events.length,
            events
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedEvent = await updateEventService(id, data);
        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: "Evento no encontrado o ya ha sido desactivado"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Evento actualizado correctamente",
            event: updatedEvent
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const cancelEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const cancelledEvent = await cancelEventService(id);
        
        if (!cancelledEvent) {
            return res.status(404).json({
                success: false,
                message: "No se pudo encontrar el evento para cancelar."
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Evento cancelado con éxito.",
            event: cancelledEvent
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const desactivateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await desactivateEventService(id);
        if (!deletedEvent) {
            return res.status(404).json({
                success: false,
                message: "Evento no encontrado"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Evento desactivado correctamente.",
            event: deletedEvent
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};