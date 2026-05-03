'use strict';

import Reservation from "../Model/reservation.model.js";

export const createReservationService = async (data) => {
    if (data.type === "mesa" && data.tableId) {
        const existReservation = await Reservation.findOne({
            tableId: data.tableId,
            date: data.date,
            status: { $ne: "cancelada" },
            isActive: true
        });
        if (existReservation) {
            throw new Error("La mesa ya tiene una reservación activa para esta fecha y hora.");
        }
    }
    const reservation = await Reservation.create(data);
    return reservation;
};

export const updateReservationService = async (id, data) => {
    const reservation = await Reservation.findOneAndUpdate(
        { _id: id, isActive: true },
        data,
        { new: true, runValidators: true }
    )
    if (!reservation) {
        throw new Error("No se encontró la reservación o ya no está activa.");
    }
    return reservation;
};

export const cancelReservationService = async (id) => {
    const reservation = await Reservation.findOneAndUpdate(
        { _id: id, isActive: true, status: { $ne: "cancelada" } },
        { status: "cancelada" },
        { new: true }
    );
    if (!reservation) {
        throw new Error("La reservación no existe, ya está cancelada o no está activa.");
    }
    return reservation;
};

export const desactivateReservationService = async (id) => {
    const reservation = await Reservation.findOneAndUpdate(
        { _id: id, isActive: true },
        { isActive: false },
        { new: true }
    );
    if (!reservation) {
        throw new Error("No se pudo eliminar: La reservación no existe o ya fue eliminada.");
    }
    return reservation;
};

export const getReservationService = async (limit = 20, skip = 0) => {
    try {
        const reservations = await Reservation.find({ isActive: true })
            .limit(Number(limit))
            .skip(Number(skip))
            .sort({ date: -1 }) 
            .populate("restaurantId", "name location")
            .populate("tableId", "number")
            .lean();
        const total = await Reservation.countDocuments({ isActive: true });
        return {
            total,
            limit,
            skip,
            reservations
        };
    } catch (error) {
        throw new Error("Error al obtener el listado general de reservaciones: " + error.message);
    }
};

export const getReservationByRestaurantService = async (restaurantId) => {
    const reservations = await Reservation.find({
        restaurantId,
        isActive: true
    })
    .sort({ date: 1 }) 
    .populate("tableId", "number capacity position") 
    .lean();
    return reservations;
};