import {
  createReservationService,
  updateReservationService,
  cancelReservationService,
  deleteReservationService,
  getReservationsByRestaurantService
} from "./reservation.service.js";

export const createReservation = async (req, res) => {
  try {
    const reservation = await createReservationService(req.body);
    res.status(201).json({
      message: "Reservación creada correctamente",
      reservation,
      notification: {
        type: "RESERVATION_CREATED",
        text: "Tu reservación ha sido registrada"
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const updated = await updateReservationService(
      req.params.id,
      req.body
    );
    res.json({
      message: "Reservación actualizada",
      updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const cancelled = await cancelReservationService(req.params.id);
    res.json({
      message: "Reservación cancelada",
      cancelled,
      notification: {
        type: "RESERVATION_CANCELLED",
        text: "Tu reservación ha sido cancelada"
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const deleted = await deleteReservationService(req.params.id);
    res.json({
      message: "Reservación eliminada correctamente",
      deleted
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservationsByRestaurant = async (req, res) => {
  try {
    const reservations = await getReservationsByRestaurantService(
      req.params.restaurantId
    );
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};