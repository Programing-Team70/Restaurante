import Event from "../models/event.model.js";
import Restaurant from "../models/restaurant.model.js";

class EventService {
  async createEvent(eventData) {
    // Validar que el restaurante existe
    const restaurant = await Restaurant.findById(eventData.restaurant);
    if (!restaurant) throw new Error("Restaurante no encontrado");

    // Validar que los items del menú existen
    if (eventData.menu) {

    }

    return await Event.create(eventData);
  }

  async getEventsByRestaurant(restaurantId) {
    return await Event.find({ restaurant: restaurantId })
      .populate("menu")
      .sort({ date: 1 });
  }

  async updateEvent(eventId, updateData) {
    return await Event.findByIdAndUpdate(eventId, updateData, { new: true });
  }

  async deleteEvent(eventId) {
    return await Event.findByIdAndDelete(eventId);
  }

  async assignResources(eventId, resources) {
    return await Event.findByIdAndUpdate(
      eventId,
      { $set: { resources } },
      { new: true }
    );
  }

  async getUpcomingEvents(restaurantId) {
    const today = new Date();
    return await Event.find({
      restaurant: restaurantId,
      date: { $gte: today },
      status: { $ne: "cancelado" }
    }).sort({ date: 1 });
  }
}

export default new EventService();
