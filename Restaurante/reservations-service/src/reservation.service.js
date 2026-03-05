import Reservation from "./reservation.model.js";

export const createReservationService = async (data) => {
    const reservation = await Reservation.create(data);
    return reservation;
};

export const updateReservationService = async (id, data) => {
    const updated = await Reservation.findOneAndUpdate(
        { _id: id, isActive: true },
        data,
        { new: true }
    );
    return updated;
};

export const cancelReservationService = async (id) => {
    const cancelled = await Reservation.findOneAndUpdate(
        { _id: id, isActive: true },
        { status: "cancelada" },
        { new: true }
    );
    return cancelled;
};

export const deleteReservationService = async (id) => {
    const deleted = await Reservation.findOneAndUpdate(
        { _id: id },
        { isActive: false },
        { new: true }
    );
    return deleted;
};

export const getReservationsByRestaurantService = async (restaurantId) => {
    const reservations = await Reservation.find({
        restaurantId,
        isActive: true
    })
    .populate("tableId")
    .populate("orderId");
    return reservations;
};