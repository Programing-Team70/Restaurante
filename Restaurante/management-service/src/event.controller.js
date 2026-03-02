import Event from "./event.model.js";
import EventService from "./event.service.js";
import EventService from "../services/event.service.js";

export const createEvent = async (req, res) => {
  try {
    const event = await EventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventsByRestaurant = async (req, res) => {
  try {
    const events = await EventService.getEventsByRestaurant(req.params.restaurantId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await EventService.updateEvent(req.params.id, req.body);
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await EventService.deleteEvent(req.params.id);
    res.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignResources = async (req, res) => {
  try {
    const event = await EventService.assignResources(req.params.id, req.body.resources);
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await EventService.getUpcomingEvents(req.params.restaurantId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
