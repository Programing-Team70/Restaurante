import {
    createReservationService,
    updateReservationService,
    cancelReservationService,
    desactivateReservationService,
    getReservationService,      
    getReservationByRestaurantService
} from "../Service/reservation.service.js";

export const createReservation = async (req, res, next) => {
    try {
        const reservation = await createReservationService(req.body);
        res.status(201).json({
            success: true,
            message: "Reservación registrada correctamente",
            reservation,
            notification: {
                type: "RESERVATION_CREATED",
                text: `${reservation.customerName}, tu mesa ha sido reservada.`
            }
        });
    } catch (error) {
        next(error);
    }
};

export const updateReservation = async (req, res, next) => {
    try {
        const updated = await updateReservationService(req.params.id, req.body);
        res.json({
            success: true,
            message: "Los datos de la reservación han sido actualizados.",
            updated
        });
    } catch (error) {
        next(error);
    }
};

export const cancelReservation = async (req, res, next) => {
    try {
        const cancelled = await cancelReservationService(req.params.id);
        res.json({
            success: true,
            message: "Reservación cancelada",
            cancelled,
            notification: {
                type: "RESERVATION_CANCELLED",
                text: "Lamentamos que cancelaras. ¡Esperamos verte pronto!"
            }
        });
    } catch (error) {
        next(error);
    }
};

export const desactivateReservation = async (req, res, next) => {
    try {
        await desactivateReservationService(req.params.id);
        res.json({
            success: true,
            message: "Registro eliminado del sistema correctamente."
        });
    } catch (error) {
        next(error);
    }
};

export const getReservations = async (req, res, next) => {
    try {
        const { limit, skip } = req.query;
        const data = await getReservationService(limit, skip);
        res.json({ success: true, ...data });
    } catch (error) {
        next(error);
    }
};

export const getReservationsByRestaurant = async (req, res, next) => {
    try {
        const reservations = await getReservationByRestaurantService(req.params.restaurantId);
        res.json({ success: true, total: reservations.length, reservations });
    } catch (error) {
        next(error);
    }
};