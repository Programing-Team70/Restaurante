'use strict';

import Order from "../Model/order.model.js";
import Reservation from "../Model/reservation.model.js";

export const createOrderService = async (orderData) => {
    const reservation = await Reservation.findOne({ 
        _id: orderData.reservationId, 
        isActive: true 
    });
    if (!reservation) {
        throw new Error("No se puede crear la orden: La reservación vinculada no existe o no está activa.");
    }
    const order = await Order.create(orderData);
    return order;
};

export const updateOrderService = async (id, data) => {
    const order = await Order.findOne({ _id: id, isActive: true });
    if (!order) {
        throw new Error("Pedido no encontrado o ya ha sido desactivado.");
    }
    Object.assign(order, data);
    await order.save();
    return order;
};

export const desactivateOrderService = async (id) => {
    const deletedOrder = await Order.findOneAndUpdate(
        { _id: id, isActive: true },
        { isActive: false },
        { new: true }
    );

    if (!deletedOrder) {
        throw new Error("El pedido no existe o ya fue eliminado anteriormente.");
    }

    return deletedOrder;
};

export const getOrderService = async (limit = 20, skip = 0) => {
    const orders = await Order.find({ isActive: true })
        .limit(Number(limit))
        .skip(Number(skip))
        .sort({ createdAt: -1 })
        .populate("restaurantId", "name")
        .populate("reservationId", "date type")
        .lean();
    const total = await Order.countDocuments({ isActive: true });
    return {
        total,
        limit,
        skip,
        orders
    };
};

export const getOrderByRestaurantService = async (restaurantId) => {
    const orders = await Order.find({ restaurantId, isActive: true })
        .sort({ createdAt: -1 })
        .populate("reservationId", "customerName date")
        .lean();
    return orders;
};