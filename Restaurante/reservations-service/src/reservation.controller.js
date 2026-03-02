import Reservation from "../models/reservation.model.js";

export const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);

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
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const cancelled = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: "cancelada" },
      { new: true }
    );

    res.json({
      message: "Reservación cancelada",
      cancelled
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservationsByRestaurant = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      restaurantId: req.params.restaurantId
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};